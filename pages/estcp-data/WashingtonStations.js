// This is the React component, so name it Plot
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export function WashingtonStationsPlot({ lats, lons, stationNames, shortNames,
                                         title, height }) {
    const data = [
          {
      type: "scattermap",
      mode: "markers+text",
      lat: lats,
      lon: lons,
      text: shortNames,
      customdata: stationNames,
      textposition: "top right",
      hovertemplate:
        "<b>%{customdata}</b><br>" +
        "Lat: %{lat:.3f}<br>" +
        "Lon: %{lon:.3f}<extra></extra>",
      marker: {
        size: 12,
        color: "mediumblue",
        opacity: 0.9,
      },
    },
  ];

  const layout = {
    title: { text: title, x: 0.0 },
    // margin: { l: 10, r: 10, t: 50, b: 10 },
    margin: { l: 0, r: 0, t: 40, b: 0 },
    font: { color: "#000" },
    // height: 400,
    map: {
      style: "white-bg",
      center: { lat: 47.15, lon: -122.483 }, // TCM lat/lon
      zoom: 5.9,
      layers: [
        {
          below: "traces",
          sourcetype: "raster",
          // sourceattribution: "USGS The National Map",
          source: [
            "https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}"
          ]
        }
      ]
    }
  };

  const config = {
    responsive: true,
    displayModeBar: true,
  };

  return (
    <Plot
      data={data}
      layout={layout}
      config={config}
      style={{ width: "100%", height: height.height }}
      useResizeHandler={true}
    />
  );
}


import { settings } from "../../initialConditions/estcp-test";
// import { WashingtonStationsPlot } from "./WashingtonStations";

export default function WashingtonStations(height) {
  const plotHeight = height ?? "100%";
  const lats = Object.values(settings.stationData.sites).map((site) => site.lat);
  const lons = Object.values(settings.stationData.sites).map((site) => site.lon);
  const stationNames = Object.values(settings.stationData.sites).map((site) => site.name);
  const shortNames = Object.values(settings.stationData.sites).map((site) => site.shortName);

  console.log("stationNames", stationNames)


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
        <WashingtonStationsPlot
          lats={lats}
          lons={lons}
          stationNames={stationNames}
          shortNames = {shortNames}
          title="Station Locations"
          height = {plotHeight}
        />
      </div>
    </div>
  );
}
