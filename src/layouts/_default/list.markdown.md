---
title: {{ .Title | jsonify }}
url: {{ .Permalink | jsonify }}
{{ with .Params.description }}description: {{ . | jsonify }}{{ end }}
---

{{ .RawContent }}

{{ range .RegularPages.ByWeight }}- [{{ .Title }}]({{ .RelPermalink }})
{{ end }}
