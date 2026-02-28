import React from "react";
import { AnnualFrostDaysPlot } from "../../components/figures/AnnualFrostDays"; // adjust path if needed
import  OLM_Livneh from "../../data_json/fig6/OLM_Livneh.json"
import  OLM_gridMET from "../../data_json/fig6/OLM_gridMET.json"
import  OLM_station from "../../data_json/fig6/OLM_station.json"
import  OLM_nClimGrid from "../../data_json/fig6/OLM_nClimGrid.json"
import  SEA_Livneh from "../../data_json/fig6/SEA_Livneh.json"
import  SEA_gridMET from "../../data_json/fig6/SEA_gridMET.json"
import  SEA_station from "../../data_json/fig6/SEA_station.json"
import  SEA_nClimGrid from "../../data_json/fig6/SEA_nClimGrid.json"
import  TCM_Livneh from "../../data_json/fig6/TCM_Livneh.json"
import  TCM_gridMET from "../../data_json/fig6/TCM_gridMET.json"
import  TCM_station from "../../data_json/fig6/TCM_station.json"
import  TCM_nClimGrid from "../../data_json/fig6/TCM_nClimGrid.json"
// import  GRF_nClimGrid from "../../data_json/fig6/GRF_nClimGrid.json"
// import  GRF_gridMET from "../../data_json/fig6/GRF_gridMET.json"
// import  GRF_Livneh from "../../data_json/fig6/GRF_Livneh.json"
// import  GRF_station from "../../data_json/fig6/GRF_station.json"
// import  TIW_gridMET from "../../data_json/fig6/TIW_gridMET.json"
// import  TIW_nClimGrid from "../../data_json/fig6/TIW_nClimGrid.json"
// import  TIW_Livneh from "../../data_json/fig6/TIW_Livneh.json"
// import  TIW_station from "../../data_json/fig6/TIW_station.json"

const PlotNote = () => (
  <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.35, color: "#111" }}>
   Annual Frost Days (1985–2014) at three station locations (TCM, OLM, SEA).
   Each series shows the ensemble mean and min/max range.
  </div>
);


export default function Fig6() {
  const OLM = [OLM_nClimGrid, OLM_gridMET, OLM_Livneh, OLM_station];
  const SEA = [SEA_nClimGrid, SEA_gridMET, SEA_Livneh, SEA_station];
  const TCM = [TCM_nClimGrid, TCM_gridMET, TCM_Livneh, TCM_station];

  // These two are not plotted in the paper's figure 6
  // const GRF = [GRF_nClimGrid, GRF_gridMET, GRF_Livneh, GRF_station];
  // const TIW = [TIW_nClimGrid, TIW_gridMET, TIW_Livneh, TIW_station];
  // <AnnualFrostDaysPlot title={'GRF'} seriesArrays={GRF} legendNames={legendNames} />
  // <AnnualFrostDaysPlot title={'TIW'} seriesArrays={TIW} legendNames={legendNames} />

  const legendNames = ['nClimGrid', 'gridMET', 'Livneh', 'station'];

  return (
      <div style={{ padding: 16, background: "white" }}>
      <div
    style={{
      border: "1px solid #ddd",
      borderRadius: 12,
      padding: 12,
      background: "white",
    }}
      >
      <AnnualFrostDaysPlot title={'TCM'} seriesArrays={TCM} legendNames={legendNames} />
      <AnnualFrostDaysPlot title={'OLM'} seriesArrays={OLM} legendNames={legendNames} />
      <AnnualFrostDaysPlot title={'SEA'} seriesArrays={SEA} legendNames={legendNames} />
      <PlotNote />
      </div>
      </div>
  );
}
