import { useMemo } from "react";
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

function median(arr) {
  if (!arr.length) return null;
  const s = [...arr].sort((a, b) => a - b);
  const n = s.length;
  const mid = Math.floor(n / 2);
  return n % 2 === 0 ? (s[mid - 1] + s[mid]) / 2 : s[mid];
}

export function AnnualFrostDaysPlot({
  seriesArrays,
  legendNames,
  title,
}) {
  console.log("seriesa", seriesArrays)
  const startYear = 1985;
  const traces = useMemo(() => {
    if (!Array.isArray(seriesArrays) || seriesArrays.length === 0) return [];

    const maxLen = Math.max(...seriesArrays.map((a) => a.length));
    const years = Array.from({ length: maxLen }, (_, i) => startYear + i);

    console.log(years)
    const minVals = [];
    const medianVals = [];
    const maxVals = [];

    for (let i = 0; i < maxLen; i++) {
      const valsAtYear = seriesArrays
        .map((arr) => arr[i])
        .filter((v) => Number.isFinite(v));

      minVals.push(valsAtYear.length ? Math.min(...valsAtYear) : null);
      medianVals.push(valsAtYear.length ? median(valsAtYear) : null);
      maxVals.push(valsAtYear.length ? Math.max(...valsAtYear) : null);
    }

    const lineTraces = seriesArrays.map((arr, idx) => ({
      type: "scatter",
      mode: "lines",
      x: years.slice(0, arr.length),
      y: arr,
      name: legendNames[idx],
      opacity: 0.35,
      line: { width: 1.5 },
      hovertemplate: `Series ${idx + 1}<br>Year=%{x}<br>Days=%{y}<extra></extra>`,
    }));

    const summaryTraces = [
      {
        type: "scatter",
        mode: "lines",
        x: years,
        y: minVals,
        name: "Min",
        line: { width: 0 },
        hovertemplate: "Min<br>Year=%{x}<br>Days=%{y}<extra></extra>",
        showlegend: false,
      },
      {
        type: "scatter",
        mode: "lines",
        x: years,
        y: maxVals,
        name: "Min–Max range",
        fill: "tonexty",
        line: { width: 0 },
        hovertemplate: "Max<br>Year=%{x}<br>Days=%{y}<extra></extra>",
      },
      {
        type: "scatter",
        mode: "lines",
        x: years,
        y: medianVals,
        name: "Median",
        line: { width: 3 },
        hovertemplate: "Median<br>Year=%{x}<br>Days=%{y}<extra></extra>",
      },
    ];

    return [...lineTraces, ...summaryTraces];
  }, [seriesArrays, startYear]);

  const layout = {
    title: { text: title, x: 0.5 },
    paper_bgcolor: "white",
    plot_bgcolor: "white",
    font: { color: "#000" },
    height: 520,
    hovermode: "x unified",
    xaxis: { title: { text: "Year" } },
    yaxis: { title: { text: "Days" } },
    margin: { l: 70, r: 20, t: 50, b: 60 },
  };

  return (
    <Plot
      data={traces}
      layout={layout}
      config={{ responsive: true, scrollZoom: true, displayModeBar: true }}
      style={{ width: "100%", height: "240px" }}
      useResizeHandler={true}
    />
  );
}
