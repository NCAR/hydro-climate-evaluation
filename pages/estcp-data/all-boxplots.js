// pages/annual-frost-days-all-sites.js
import dynamic from "next/dynamic";

// IMPORTANT: react-plotly must be client-side only
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

// Assumes each of these modules exports:
//   station, gridMET, nClimGrid, Livneh, station_name
import * as tcm from "../../data_json/tcm_annual_frost_days";
import * as grf from "../../data_json/grf_annual_frost_days";
import * as olm from "../../data_json/olm_annual_frost_days";
import * as sea from "../../data_json/sea_annual_frost_days";
import * as tiw from "../../data_json/tiw_annual_frost_days";

const BoxplotNoteAll = () => (
    <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.35, color: "#111" }}>
    Annual count of Frost Days for five stations during the
    historical time period (1985-2014).
    Boxplots show the median value in the orange line, the interquartile range within
    the blue box. Whiskers extend to 1.5 times the interquartile range (IQR) or to the
    most extreme value in that direction, if none reaches the 1.5X level. Dots are years
    outside the 1.5xIQR range.
  </div>
);

export default function AnnualFrostDaysAllSitesBoxPlot() {
    const clean = (arr) =>
    (arr ?? []).filter((v) => v != null && Number.isFinite(v));

  const sites = [
    { key: "TCM", station_name: tcm.station_name, ...tcm },
    { key: "GRF", station_name: grf.station_name, ...grf },
    { key: "OLM", station_name: olm.station_name, ...olm },
    { key: "SEA", station_name: sea.station_name, ...sea },
    { key: "TIW", station_name: tiw.station_name, ...tiw },
  ];

  // Optional: if station_name is missing in a file, fall back to its short key
  const siteLabel = (s) => (s.station_name ? String(s.station_name) : s.key);

  // Build ONE trace per dataset, with y being the site label.
  // Plotly will create one box per unique y value in each trace.
  const datasetDefs = [
    { name: "Livneh", field: "Livneh" },
    { name: "gridMET", field: "gridMET" },
    { name: "nClimGrid", field: "nClimGrid" },
    { name: "Station", field: "station" },
  ];

  const traces = datasetDefs.map((d) => {
    const x = [];
    const y = [];

    for (const s of sites) {
            const vals = clean(s[d.field]);
      if (!vals.length) continue;

      x.push(...vals);
      y.push(...Array(vals.length).fill(siteLabel(s)));
    }

    return {
      type: "box",
      orientation: "h",
      name: d.name,
      x,
      y,
      boxpoints: "outliers",
      jitter: 0.25,
      pointpos: 0,
      width: 0.7,
    };
  });

  const height = 220 + sites.length * 90; // scales nicely as you add sites

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
            title: {
                            text: "Annual Frost Days comparison (all sites)",
              x: 0.5,
              xanchor: "center",
            },
            margin: { l: 200, r: 20, t: 50, b: 80 },
            height,
            font: { color: "#000" },
            xaxis: {
              title: {
                                text: "Annual Frost Days",
                standoff: 25,
                font: { color: "#000", size: 14 },
              },
              zeroline: false,
            },
            yaxis: {
              title: "",
              automargin: true,
            },
            boxmode: "group", // groups Livneh/gridMET/nClimGrid/Station at each site
            dragmode: "pan",
            legend: { orientation: "h", y: -0.2, x: 0.0 },
          }}
          style={{ width: "100%", height }}
          useResizeHandler={true}
          config={{ responsive: true, scrollZoom: true, displayModeBar: true }}
        />
        <BoxplotNoteAll />
      </div>
    </div>
  );
}
