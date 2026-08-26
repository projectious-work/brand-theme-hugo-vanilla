(() => {
  function renderJSXGraph(figure) {
    const host = figure.querySelector(".jxgbox");
    const config = JSON.parse(figure.querySelector(".domain-graphic__source").textContent);
    const board = JXG.JSXGraph.initBoard(host.id, {
      boundingbox: config.boundingBox || [-5, 5, 5, -5],
      axis: config.axis ?? true,
      showCopyright: false,
      showNavigation: config.navigation ?? false,
      ...(config.board || {}),
    });
    const elements = new Map();
    (config.elements || []).forEach((definition) => {
      const parents = (definition.parents || []).map((parent) =>
        typeof parent === "string" && elements.has(parent)
          ? elements.get(parent) : parent);
      const element = board.create(
        definition.type,
        parents,
        definition.attributes || {},
      );
      if (definition.id) elements.set(definition.id, element);
    });
  }

  function renderSmiles(figure) {
    const svg = figure.querySelector("svg");
    const width = Math.max(320, figure.clientWidth || 640);
    svg.setAttribute("width", width);
    svg.setAttribute("height", figure.dataset.height || "320");
    SmilesDrawer.parse(figure.dataset.smiles, (tree) => {
      const drawer = new SmilesDrawer.SvgDrawer({ width, height: 320 });
      drawer.draw(tree, svg, "light", false);
    }, (error) => {
      figure.dataset.renderError = error.message;
      console.error("SMILES rendering failed", error);
    });
  }

  document.querySelectorAll("[data-jsxgraph]").forEach(renderJSXGraph);
  // WaveDrom.ProcessAll scans every DOM element and assumes any `type`
  // property is a string. Inline SVG elements can expose SVGAnimatedString
  // values instead, so render only the theme-owned WaveDrom sources.
  if (window.WaveDrom) {
    document.querySelectorAll('[data-wavedrom] script[type="WaveDrom"]')
      .forEach((source, index) => {
        source.id = `InputJSON_${index}`;
        const display = document.createElement("div");
        display.id = `WaveDrom_Display_${index}`;
        source.before(display);
        WaveDrom.RenderWaveForm(
          index,
          WaveDrom.eva(source.id),
          "WaveDrom_Display_",
          false,
        );
      });
  }
  document.querySelectorAll("[data-smiles]").forEach(renderSmiles);
  document.querySelectorAll("[data-pseudocode]").forEach((figure) => {
    pseudocode.renderElement(figure.querySelector(".domain-graphic__source"), {
      lineNumber: true,
    });
  });
})();
