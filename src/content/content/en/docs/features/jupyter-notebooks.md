+++
title = "Jupyter notebooks"
description = "Convert and publish reproducible notebook output."
weight = 80
icon = "notebook"
+++

[Jupyter notebooks](https://jupyter.org/) combine prose, executable code, and
output in `.ipynb` JSON files. The theme converts them before Hugo builds, so the
published page contains ordinary Markdown and images rather than executable code.

{{< notebook "theme-demo" >}}

```md
{{</* notebook "theme-demo" */>}}
```

Create an isolated conversion environment and convert every notebook:

```sh
python3 -m venv .venv
. .venv/bin/activate
pip install -r scripts/requirements.txt
./scripts/notebooks.sh
```

The pinned `nbconvert` environment makes conversion reproducible and keeps the
tools outside the system Python installation. Embed the converted result with
`{{</* notebook "theme-demo" */>}}`. The shortcode accepts a converted file; it
cannot execute or contain an inline notebook. See
[Notebook conversion](../configuration/site-wide.md#notebook-conversion) for lookup paths.
