#!/usr/bin/env node
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync,
  statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const contentRoot = join(root, "src", "content", "content");
const assetsRoot = join(root, "src", "content", "assets");
const outputRoot = join(root, "src", "content", "static", "_generated", "graphics");
const listOnly = process.argv.includes("--list");
const watch = process.argv.includes("--watch");
const backends = {
  d2: { command: "d2", extension: ".d2", args: (src, out) => [src, out] },
  dot: { command: "dot", extension: ".dot", args: (src, out) => ["-Tsvg", src, "-o", out] },
  typst: { command: "typst", extension: ".typ", args: (src, out) => ["compile", "--format", "svg", src, out] },
};

function files(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  });
}

function hash(source) {
  return createHash("sha256").update(source).digest("hex");
}

function fencedJobs(markdown, origin) {
  const lines = markdown.split(/(?<=\n)/);
  const jobs = [];
  let outer = 0;
  for (let index = 0; index < lines.length; index += 1) {
    const opening = lines[index].match(/^(`{3,})([^\s{]+)?/);
    if (!opening) continue;
    const ticks = opening[1].length;
    if (outer) {
      const trimmed = lines[index].trim();
      if (/^`+$/.test(trimmed) && trimmed.length >= outer) outer = 0;
      continue;
    }
    if (ticks > 3) { outer = ticks; continue; }
    const backend = opening[2];
    if (!backends[backend]) continue;
    let source = "";
    for (index += 1; index < lines.length; index += 1) {
      if (/^```\s*$/.test(lines[index].trimEnd())) break;
      source += lines[index];
    }
    jobs.push({ backend, source: source.replace(/\n$/, ""), origin });
  }
  return jobs;
}

async function discover() {
  const jobs = [];
  for (const path of files(contentRoot).filter((file) => file.endsWith(".md"))) {
    const markdown = readFileSync(path, "utf8");
    jobs.push(...fencedJobs(markdown, relative(root, path)));
    const shortcode = /{{[<%]\s*diagram\s+([^}]*)[>%]}}/g;
    for (const match of markdown.matchAll(shortcode)) {
      const attributes = Object.fromEntries(
        [...match[1].matchAll(/([\w-]+)="([^"]+)"/g)]
          .map((entry) => [entry[1], entry[2]]),
      );
      if (!attributes.url) continue;
      const backend = attributes.renderer || attributes.type;
      if (!backends[backend]) continue;
      const response = await fetch(attributes.url);
      if (!response.ok) {
        throw new Error(
          `Cannot fetch remote ${backend} source ${attributes.url}: ` +
          `${response.status} ${response.statusText}`,
        );
      }
      jobs.push({ backend, source: await response.text(), origin: attributes.url });
    }
  }
  for (const path of files(assetsRoot)) {
    const entry = Object.entries(backends).find(([, value]) => path.endsWith(value.extension));
    if (entry) jobs.push({
      backend: entry[0], source: readFileSync(path, "utf8"),
      sourcePath: path, origin: relative(root, path),
    });
  }
  const unique = new Map();
  for (const job of jobs) unique.set(`${job.backend}:${hash(job.source)}`, job);
  return [...unique.values()];
}

function available(command) {
  return spawnSync(command, ["--version"], { stdio: "ignore" }).status === 0;
}

function render(job) {
  const digest = hash(job.source);
  const output = join(outputRoot, `${digest}.svg`);
  if (listOnly) {
    console.log(`${job.backend}\t${digest}\t${job.origin}`);
    return;
  }
  if (existsSync(output)) return;
  const backend = backends[job.backend];
  if (!available(backend.command)) {
    throw new Error(
      `Cannot render ${job.backend} source in ${job.origin}: ` +
      `the ${backend.command} executable is not installed and no cached SVG exists.`,
    );
  }
  mkdirSync(outputRoot, { recursive: true });
  const temporary = join(outputRoot, `.${digest}${backend.extension}`);
  const input = job.sourcePath || temporary;
  if (!job.sourcePath) writeFileSync(temporary, job.source);
  const result = spawnSync(backend.command, backend.args(input, output), {
    cwd: job.sourcePath ? dirname(job.sourcePath) : root,
    encoding: "utf8",
  });
  if (!job.sourcePath) rmSync(temporary, { force: true });
  if (result.status !== 0 || !existsSync(output)) {
    throw new Error(
      `Failed to render ${job.backend} source in ${job.origin}:\n` +
      (result.stderr || result.stdout || `exit ${result.status}`),
    );
  }
}

async function run() {
  mkdirSync(outputRoot, { recursive: true });
  for (const job of await discover()) render(job);
}

await run();
if (watch) {
  let fingerprint = "";
  setInterval(async () => {
    const next = files(contentRoot).concat(files(assetsRoot))
      .filter((path) => /\.(md|d2|dot|typ)$/.test(path))
      .map((path) => `${path}:${statSync(path).mtimeMs}`).join("|");
    if (next !== fingerprint) {
      fingerprint = next;
      try { await run(); } catch (error) { console.error(`graphics: ${error.message}`); }
    }
  }, 500);
}
