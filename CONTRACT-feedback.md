# Feedback endpoint contract

`params.feedbackEndpoint` receives one POST per vote. Client-side throttling is a
courtesy, **not** protection — anyone can post directly. Treat this as an
unauthenticated public endpoint and implement all of the server-side requirements.

## Request

```http
POST /feedback HTTP/1.1
Content-Type: application/json

{ "path": "/docs/getting-started/", "value": "up", "title": "Getting started", "lang": "en" }
```

Sent with `navigator.sendBeacon` where available (fire-and-forget, no response
read), falling back to `fetch` with `keepalive: true`.

| Field | Type | Notes |
|---|---|---|
| `path` | string | Site-relative path; validate against your own page list |
| `value` | `"up"` \| `"down"` | Reject anything else |
| `title` | string | Untrusted; for triage only, never render unescaped |
| `lang` | string | BCP 47 tag from `<html lang>` |

## Response

Any 2xx. The body is never read, so return `204 No Content`. The widget's UI state
comes from localStorage and does not depend on the response — a failing endpoint
degrades to a purely local vote.

## Server requirements

1. **Rate limit** per IP — 10/minute is generous for a human reader.
2. **Origin allow-list**; reject cross-origin posts.
3. **Path allow-list** from your sitemap; reject unknown paths rather than storing
   arbitrary strings.
4. **Cap body size** (1 KB) and reject non-JSON content types.
5. **Store no PII.** No IP, no user agent, no cookie. The vote plus the path is the
   whole record.
6. **Preflight**: answer `OPTIONS` with `Access-Control-Allow-Origin` for your site
   origin only.

## Minimal reference

```js
// Cloudflare Worker
export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") return cors(new Response(null, { status: 204 }));
    if (req.method !== "POST") return new Response(null, { status: 405 });
    if (req.headers.get("origin") !== env.SITE_ORIGIN) return new Response(null, { status: 403 });
    if ((req.headers.get("content-length") | 0) > 1024) return new Response(null, { status: 413 });

    const { path, value } = await req.json();
    if (!["up", "down"].includes(value)) return new Response(null, { status: 400 });
    if (!(await env.PAGES.get(path))) return new Response(null, { status: 400 });

    const key = `c:${path}:${value}`;
    await env.VOTES.put(key, String(((+(await env.VOTES.get(key))) || 0) + 1));
    return cors(new Response(null, { status: 204 }));
  }
};
```
