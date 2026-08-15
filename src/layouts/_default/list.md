# {{ .Title }}
{{ with .Description }}
> {{ . }}
{{ end }}
{{ .RawContent }}
{{ range .Pages.ByWeight }}
- [{{ .LinkTitle }}]({{ .Permalink }}){{ with .Description }} — {{ . }}{{ end }}
{{- end }}
