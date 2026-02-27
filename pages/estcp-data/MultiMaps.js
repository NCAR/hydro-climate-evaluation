import React, { useMemo } from "react";
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

// ---------- helpers ----------
function quantile(sorted, q) {
    const n = sorted.length;
  if (!n) return NaN;
  const pos = (n - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  if (lo === hi) return sorted[lo];
  const t = pos - lo;
  return sorted[lo] * (1 - t) + sorted[hi] * t;
}

function globalRange(datasets, mode = "robust") {
  const all = [];
  for (const ds of datasets) {
        for (const p of ds) {
                const v = p?.v;
      if (Number.isFinite(v)) all.push(v);
    }
  }

  all.sort((a, b) => a - b);
  if (!all.length) return { zmin: 0, zmax: 1 };

  if (mode === "minmax") {
    return { zmin: all[0], zmax: all[all.length - 1] };
  }

  const zmin = quantile(all, 0.02);
  const zmax = quantile(all, 0.98);

  if (!Number.isFinite(zmin) || !Number.isFinite(zmax) || zmin === zmax) {
    return { zmin: all[0], zmax: all[all.length - 1] };
  }

  return { zmin, zmax };
}

function gridFromXYZ(points) {
  const xs = Array.from(new Set(points.map((p) => p.x))).sort((a, b) => a - b);
  const ys = Array.from(new Set(points.map((p) => p.y))).sort((a, b) => a - b);

  const xi = new Map(xs.map((x, i) => [x, i]));
  const yi = new Map(ys.map((y, i) => [y, i]));

  const z = Array.from({ length: ys.length }, () =>
    Array.from({ length: xs.length }, () => null)
  );

  for (const p of points) {
    const i = yi.get(p.y);
    const j = xi.get(p.x);
    if (i != null && j != null && Number.isFinite(p.v)) {
      z[i][j] = p.v;
    }
  }

  return { xs, ys, z };
}

function axisName(prefix, k) {
  return k === 0 ? prefix : `${prefix}${k + 1}`;
}

function makeDomains(n, gap = 0.03) {
  const totalGap = gap * (n - 1);
  const panelWidth = (1 - totalGap) / n;

  return Array.from({ length: n }, (_, i) => {
    const start = i * (panelWidth + gap);
    const end = start + panelWidth;
    return [start, end];
  });
}

// ---------- plotting component ----------
export function MultiMaps({ datasets, title, titles, fig_label, caption }) {
  const n = datasets?.length ?? 0;

  if (n < 3 || n > 4) {
    return (
      <div style={{ color: "#000" }}>
        MultiMaps expects 3 or 4 datasets, got {n}.
      </div>
    );
  }

  const { zmin, zmax } = useMemo(
    () => globalRange(datasets, "robust"),
    [datasets]
  );

  const grids = useMemo(() => datasets.map(gridFromXYZ), [datasets]);

  const extent = useMemo(() => {
    const allX = grids.flatMap((g) => g.xs);
    const allY = grids.flatMap((g) => g.ys);
    return {
            xmin: Math.min(...allX),
      xmax: Math.max(...allX),
      ymin: Math.min(...allY),
      ymax: Math.max(...allY),
    };
  }, [grids]);

  const domains = useMemo(() => makeDomains(n, 0.03), [n]);

  const traces = grids.map((g, k) => ({
    type: "heatmap",
    x: g.xs,
    y: g.ys,
    z: g.z,
    zmin,
    zmax,
    colorscale: "RdBu",
    reversescale: false,
    showscale: k === n - 1,
    colorbar:
      k === n - 1
        ? {
                      title: "v",
            len: 0.85,
            y: 0.5,
            x: 1.03,
            thickness: 16,
          }
        : undefined,
    xaxis: axisName("x", k),
    yaxis: axisName("y", k),
    hovertemplate:
      "lon=%{x}<br>lat=%{y}<br>v=%{z}<extra>" +
      (titles?.[k] ?? `Map ${k + 1}`) +
      "</extra>",
  }));

  const layout = {
    title: { text: title, x: 0.5, xanchor: "center" },
    margin: { l: 70, r: 90, t: 70, b: 90 },
    paper_bgcolor: "white",
    plot_bgcolor: "white",
    font: { color: "#000" },
    height: 520,
    dragmode: "pan",
    uirevision: "sync-maps",
    annotations: domains.map((domain, k) => ({
      text: titles?.[k] ?? `fig ${k + 1}`,
      xref: "paper",
      yref: "paper",
      x: (domain[0] + domain[1]) / 2,
      y: 1.08,
      showarrow: false,
      font: { size: 14 },
    })),
  };

  for (let k = 0; k < n; k++) {
    const xname = axisName("xaxis", k);
    const yname = axisName("yaxis", k);

    layout[xname] = {
      domain: domains[k],
      title: { text: "Longitude" },
      range: [extent.xmin, extent.xmax],
      automargin: true,
      ...(k > 0 ? { matches: "x" } : {}),
    };

    layout[yname] = {
      title: k === 0 ? { text: "Latitude" } : { text: "" },
      range: [extent.ymin, extent.ymax],
      automargin: true,
      ...(k === 0
        ? { scaleanchor: "x", scaleratio: 1 }
        : { matches: "y", showticklabels: false }),
    };
  }

  return (
    <>
      <Plot
        data={traces}
        layout={layout}
        style={{ width: "100%", height: 520 }}
        useResizeHandler={true}
        config={{ responsive: true, scrollZoom: true, displayModeBar: true }}
      />
      <div
        style={{
          marginTop: 10,
          fontSize: 13,
          lineHeight: 1.35,
          color: "#111",
        }}
      >
        <strong>Figure {fig_label}:</strong> {caption}
      </div>
    </>
  );
}
