import dynamic from "next/dynamic";
import {
  station,
  gridMET,
  nClimGrid,
  Livneh,
  station_name,
} from "../../data_json/sea_annual_frost_days";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const BoxplotNote = ({ station_name }) => (
  <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.35, color: "#111" }}>
    Annual count of Frost Days for {station_name} for the
    historical time period (1985-2014).
    Boxplots show the median value in the orange line, the interquartile range within
    the blue box. Whiskers extend to 1.5 times the interquartile range (IQR) or to the
    most extreme value in that direction, if none reaches the 1.5X level. Dots are years
    outside the 1.5xIQR range.
  </div>
);


export function SeaBoxPlot() {
  const n = Math.max(
    station.length,
    gridMET.length,
    nClimGrid.length,
    Livneh.length
  );
  const x = Array.from({ length: n }, (_, i) => i + 1); // 1..N

  const datasets = [
    { name: "Livneh", vals: Livneh },
    { name: "gridMET", vals: gridMET },
    { name: "nClimGrid", vals: nClimGrid },
    { name: "Station", vals: station },
  ];

  const clean = (arr) => arr.filter((v) => v != null && Number.isFinite(v));

  const traces = datasets.map((d) => {
    const x = clean(d.vals);
    return {
      type: "box",
      orientation: "h",
      name: d.name,
      x,                                // <-- numeric data on x-axis
      y: Array(x.length).fill(d.name),   // <-- category label on y-axis
      width: 0.8,           // <-- taller boxes (try 0.6–1.0)
      boxpoints: "outliers",
      jitter: 0.25,
      pointpos: 0,
      showlegend: false,                // names already on y-axis
    };
  });

  return (
      <div style={{ padding: 16 }}>
      <div
    style={{
      border: "1px solid #ddd",
      borderRadius: 12,
      padding: 12,
      background: "white",
    }}
      >
      <Plot
    data={traces}
    layout={{
      title: { text: `${station_name} comparison (box plots)`, x: 0.5, xanchor: "center" },
      margin: { l: 110, r: 20, t: 50, b: 80 },
      height: 520,
      // margin: { l: 110, r: 20, t: 50, b: 120 },
      font: { color: "#000" }, // force black text
      xaxis: {
        title: { text: "Annual Frost Days", standoff: 25, font: { color: "#000", size: 14 } },
      },
      yaxis: { title: "" },
      boxmode: "group",
      dragmode: "pan",
    }}
    style={{ width: "100%", height: 600 }}
    useResizeHandler={true}
    config={{ responsive: true, scrollZoom: true, displayModeBar: true }}
      />
      <BoxplotNote station_name={station_name} />
      </div>
      </div>


  );
}
export default SeaBoxPlot;
