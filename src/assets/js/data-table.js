(function () {
  "use strict";

  function typedValue(cell) {
    var value = cell.dataset.value || "";
    var type = cell.dataset.type;
    if (type === "int" || type === "float") return Number(value);
    if (type === "bool") return /^(true|1|yes|on)$/i.test(value) ? 1 : 0;
    if (type === "date") return Date.parse(value) || 0;
    return value.toLocaleLowerCase();
  }

  function enhance(root) {
    var table = root.querySelector("table");
    var body = table.tBodies[0];
    var rows = Array.from(body.rows);
    var controls = root.querySelector("[data-table-controls]");
    var search = root.querySelector("[data-table-search]");
    var count = root.querySelector("[data-table-count]");
    var sortState = { key: "", direction: "none" };

    controls.hidden = false;
    root.querySelectorAll("[data-filter-options]").forEach(function (select) {
      var key = select.closest("[data-column]").dataset.column;
      var values = new Set(rows.map(function (row) {
        return row.querySelector('[data-column="' + CSS.escape(key) + '"]').dataset.value;
      }));
      Array.from(values).sort().forEach(function (value) {
        var option = document.createElement("option");
        option.value = value.toLocaleLowerCase();
        option.textContent = value;
        select.append(option);
      });
    });

    function matchesFilters(row) {
      return Array.from(root.querySelectorAll("[data-table-filter]")).every(function (filter) {
        var cell = row.querySelector('[data-column="' + CSS.escape(filter.dataset.column) + '"]');
        var value = typedValue(cell);
        var raw = (cell.dataset.value || "").toLocaleLowerCase();
        var exact = filter.querySelector("[data-filter-value]");
        var minimum = filter.querySelector("[data-filter-min]");
        var maximum = filter.querySelector("[data-filter-max]");
        if (exact && exact.value) {
          var wanted = exact.value.toLocaleLowerCase();
          if (filter.dataset.tableFilter === "text") {
            return cell.textContent.toLocaleLowerCase().includes(wanted);
          }
          return raw === wanted;
        }
        if (minimum && minimum.value && value < (cell.dataset.type === "date"
          ? Date.parse(minimum.value) : Number(minimum.value))) return false;
        if (maximum && maximum.value && value > (cell.dataset.type === "date"
          ? Date.parse(maximum.value) : Number(maximum.value))) return false;
        return true;
      });
    }

    function update() {
      var query = search ? search.value.trim().toLocaleLowerCase() : "";
      var visible = 0;
      rows.forEach(function (row) {
        var searchable = Array.from(row.cells).filter(function (cell) {
          var heading = table.querySelector('th[data-column="'
            + CSS.escape(cell.dataset.column) + '"]');
          return heading.dataset.searchable !== "false";
        });
        var matchesSearch = !query || searchable.some(function (cell) {
          return cell.textContent.toLocaleLowerCase().includes(query);
        });
        row.hidden = !(matchesSearch && matchesFilters(row));
        if (!row.hidden) visible += 1;
      });
      count.textContent = visible + " of " + rows.length + " rows";
    }

    root.addEventListener("input", update);
    root.addEventListener("change", update);
    root.querySelectorAll("[data-table-sort]").forEach(function (button) {
      button.hidden = false;
      button.previousElementSibling.hidden = true;
      button.addEventListener("click", function () {
        var heading = button.closest("th");
        var key = heading.dataset.column;
        sortState.direction = sortState.key !== key || sortState.direction === "descending"
          ? "ascending" : "descending";
        sortState.key = key;
        root.querySelectorAll("th[aria-sort]").forEach(function (th) {
          th.removeAttribute("aria-sort");
        });
        heading.setAttribute("aria-sort", sortState.direction);
        var multiplier = sortState.direction === "ascending" ? 1 : -1;
        rows.sort(function (a, b) {
          var av = typedValue(a.querySelector('[data-column="' + CSS.escape(key) + '"]'));
          var bv = typedValue(b.querySelector('[data-column="' + CSS.escape(key) + '"]'));
          return (typeof av === "string" ? av.localeCompare(bv) : av - bv) * multiplier;
        }).forEach(function (row) { body.append(row); });
      });
    });
    root.querySelector("[data-table-clear]").addEventListener("click", function () {
      root.querySelectorAll("input, select").forEach(function (control) {
        control.value = "";
      });
      rows.sort(function (a, b) {
        return Number(a.dataset.originalIndex) - Number(b.dataset.originalIndex);
      }).forEach(function (row) { body.append(row); });
      root.querySelectorAll("th[aria-sort]").forEach(function (th) {
        th.removeAttribute("aria-sort");
      });
      sortState = { key: "", direction: "none" };
      update();
    });
    update();
  }

  document.querySelectorAll("[data-data-table].data-table--interactive")
    .forEach(enhance);
}());
