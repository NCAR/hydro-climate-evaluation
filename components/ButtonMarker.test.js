import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useMapbox } from "../maps/src/mapbox";

function pointsToGrid(points, { wrapLon = true } = {}) {
    const pts = wrapLon
    ? points.map((p) => ({ ...p, x: p.x > 180 ? p.x - 360 : p.x }))
    : points;

  const xs = [...new Set(pts.map((p) => p.x))].sort((a, b) => a - b);
  const ys = [...new Set(pts.map((p) => p.y))].sort((a, b) => a - b);

  const xIndex = new Map(xs.map((v, i) => [v, i]));
  const yIndex = new Map(ys.map((v, i) => [v, i]));

  const z = Array.from({ length: ys.length }, () => Array(xs.length).fill(null));
  for (const p of pts) {
        const i = yIndex.get(p.y);
    const j = xIndex.get(p.x);
    if (i !== undefined && j !== undefined) z[i][j] = p.v;
  }

  return { xs, ys, z };
}

// Load points from either an imported array OR a module path string
async function loadPoints(json_data) {
  if (Array.isArray(json_data)) return json_data;
  throw new Error("json_data must be a points array or a module path string");
}

async function renderPlotlyHeatmap(containerDiv, points, title) {
  const PlotlyMod = await import("plotly.js-dist-min");
  const Plotly = PlotlyMod.default ?? PlotlyMod;
  const { xs, ys, z } = pointsToGrid(points, { wrapLon: true });
  containerDiv.innerHTML = "";
  const plotDiv = document.createElement("div");
  // plotDiv.style.width = "50%";
  // plotDiv.style.height = "50%";
  plotDiv.style.width = "90%";
  plotDiv.style.height = "90%";
  // plotDiv.style.width = "520px";
  // plotDiv.style.height = "420px";
  // plotDiv.style.width = "100%";
  // plotDiv.style.height = "100%";

  containerDiv.appendChild(plotDiv);
  const data = [
    {
      type: "heatmap",
      x: xs,
      y: ys,
      z,
      colorbar: { title: "v" },
      hovertemplate: "lon=%{x}<br>lat=%{y}<br>v=%{z}<extra></extra>",
    },
  ];

  const layout = {
    title: title ? { text: title, x: 0.5, xanchor: "center" } : undefined,
    // height: containerDiv.clientHeight - 10,  // or just 260
    margin: { l: 55, r: 20, t: 20, b: 45 },  // smaller top margin since title is outside
    // margin: { l: 55, r: 20, t: 40, b: 45 },
    xaxis: { title: "lon" },
    yaxis: {
            title: "lat",
      // autorange: "reversed", // comment out if you don't want the flip
    },
    paper_bgcolor: "white",
    plot_bgcolor: "white",
    dragmode: "pan",
  };

  await Plotly.newPlot(plotDiv, data, layout, {
    displayModeBar: true,
    responsive: true,
  });

  return () => {
    try {
      Plotly.purge(plotDiv);
    } catch {}
  };
}

export default function ButtonMarker({
  lng,
  lat,
  json_data,
  site,
  size = 18,
  color = "#007aff",
  borderColor = "#fff",
  borderWidth = 2,
}) {
  const { map } = useMapbox();
  const popupRef = useRef(null); // { popup, cleanup }

  useEffect(() => {
    if (!map) return;

    const el = document.createElement("div");
    Object.assign(el.style, {
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      background: color,
      border: `${borderWidth}px solid ${borderColor}`,
      boxShadow: "0 1px 4px rgba(0,0,0,.35)",
      cursor: "pointer",
      outline: "none",
    });

    const createPopup = async () => {
      const box = document.createElement("div");
        Object.assign(box.style, {
            fontFamily: "system-ui, sans-serif",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "560px",          // overall popup content width
        });
        // box.style.fontFamily = "system-ui, sans-serif";

      const title = document.createElement("div");
      title.textContent = String(site ?? "site");
      // title.textContent = "FOOBAR"
      Object.assign(title.style, {
            color: "#000",
            fontSize: "14px",
            fontWeight: "700",
            lineHeight: "1.2",
            padding: "6px 2px",
            margin: "0",
            zIndex: 1,
        });
      // Object.assign(title.style, { fontSize: "14px", fontWeight: "600", marginBottom: "8px" });

      const plotContainer = document.createElement("div");
      Object.assign(plotContainer.style, {
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "8px",
        background: "white",
        width: "520px",
        height: "420px",
      });
      plotContainer.innerHTML = `<div style="padding:10px;font-size:13px;">Loading…</div>`;

      box.appendChild(title);
      box.appendChild(plotContainer);

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        anchor: "top",
        offset: 10,
        maxWidth: "800px",
      })
        .setLngLat([lng, lat])
        .setDOMContent(box)
        .addTo(map);

      // let cleanup = null;
      // try {
      //   const pts = await loadPoints(json_data);     // <-- no fetch, module import
      //   if (!pts || pts.length === 0) {
      //     plotContainer.innerHTML = `<div style="padding:10px;font-size:13px;">No data for this site.</div>`;
      //   } else{
      //     cleanup = await renderPlotlyHeatmap(plotContainer, pts, null);
      //   }
      // } catch (e) {
      //   plotContainer.innerHTML = `<div style="padding:10px;font-size:13px;">Failed to load plot.</div>`;
      //   console.error(e);
      // }

      let cleanup = null;
      try {
          const pts = await loadPoints(json_data);
          if (!pts || pts.length === 0) {
              cleanup = () => {plotContainer.innerHTML = "";};
          } else {
              cleanup = await renderPlotlyHeatmap(plotContainer, pts, null);
          }
      } catch (e) {
          plotContainer.innerHTML = <div style="padding:10px;font-size:13px;">Failed to load plot.</div>;
          console.error(e);
      }

      popup.on("close", () => {
        if (popupRef.current?.popup === popup) {
                    popupRef.current?.cleanup?.();
          popupRef.current = null;
        }
      });

      popupRef.current = { popup, cleanup };
    };

    const togglePopup = () => {
      if (popupRef.current) {
        popupRef.current.cleanup?.();
        popupRef.current.popup.remove();
        popupRef.current = null;
      } else {
        createPopup();
      }
    };

    const handleClick = (e) => {
      e.stopPropagation();
      togglePopup();
    };

    el.addEventListener("click", handleClick);

    const marker = new mapboxgl.Marker({ element: el, anchor: "center" })
      .setLngLat([lng, lat])
      .addTo(map);

    return () => {
      popupRef.current?.cleanup?.();
      popupRef.current?.popup?.remove();
      popupRef.current = null;

      el.removeEventListener("click", handleClick);
      marker.remove();
    };
  }, [map, lng, lat, site, json_data, size, color, borderColor, borderWidth]);

  return null;
}
