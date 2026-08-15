# {{ .Title }}
{{ with .Description }}
> {{ . }}
{{ end }}
{{ .RawContent }}

---
{{ i18n "source" }}: {{ .Permalink }}
