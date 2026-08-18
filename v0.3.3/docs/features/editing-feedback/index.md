# Editing and feedback

> Connect pages to their source files and optionally collect useful reader votes.


## Edit this page

`params.editURL` is the repository URL prefix containing the site's Markdown
files. For a page at `content/docs/install.md`, this configuration creates a link
to `https://github.com/org/repo/edit/main/content/docs/install.md`:

```toml
[params]
  editURL = "https://github.com/org/repo/edit/main/content/"
```

Use a language map when each language has its own content root:

```toml
[params.editURL]
  default = "https://github.com/org/repo/edit/main/content/en/"
  de = "https://github.com/org/repo/edit/main/content/de/"
  fr = "https://github.com/org/repo/edit/main/content/fr/"
```

The control is omitted when `editURL` is unset or the page has no source file.

## Page feedback

The Yes/No control works locally by remembering one vote per page in browser
storage. Set `params.feedback = false` to hide it. To collect votes centrally,
set `params.feedbackEndpoint` to an HTTPS endpoint. The browser sends:

```json
{"path":"/docs/install/","value":"up","title":"Install","lang":"en"}
```

The browser avoids repeated submissions from the same browser—at most one network
request per page per hour and ten per tab session. This is only interface behavior:
a caller can bypass JavaScript and send arbitrary requests. The receiving service
must therefore reject unexpected origins and paths, validate the JSON fields,
limit request rates by an appropriate server-side identity, cap body size and
avoid logging sensitive headers. `CONTRACT-feedback.md` contains the endpoint
contract and a reference Worker implementation.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.3/docs/features/editing-feedback/index.md
