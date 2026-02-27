// import ThreeMaps from './plot-three-maps'
import { MultiMaps } from "./MultiMaps";

import fig2aa from "../../data_json/fig2/fig2aa_gridmet_djf_points.json"
import fig2ab from "../../data_json/fig2/fig2ab_nclimgrid_djf_points.json"
import fig2ac from "../../data_json/fig2/fig2ac_livneh_djf_points.json"
import fig2ad from "../../data_json/fig2/fig2ad_gmfd_djf_points.json"
import fig2ba from "../../data_json/fig2/fig2ba_gridmet_djf_points.json"
import fig2bb from "../../data_json/fig2/fig2bb_nclimgrid_djf_points.json"
import fig2bc from "../../data_json/fig2/fig2bc_livneh_djf_points.json"
import fig2bd from "../../data_json/fig2/fig2bd_gmfd_djf_points.json"


// ---------- example page ----------
export default function App() {
  const dsaa = fig2aa;
  const dsab = fig2ab;
  const dsac = fig2ac;
  const dsad = fig2ad;
  const dsba = fig2ba;
  const dsbb = fig2bb;
  const dsbc = fig2bc;
  const dsbd = fig2bd;

  const fig_a_data = [dsaa, dsab, dsac, dsad];
  const fig_b_data = [dsba, dsbb, dsbc, dsbd];
  const fig_a_titles = ["gridMET", "nClimGrid", "Livneh", "GMFD"]
  const fig_b_titles = ["", "", "", ""];
  const fig_a_title = "";
  const fig_b_title = "";
  const fig_a_caption = "Daily minimum temperature (Tmin), averaged over meteorological winter (DJF) fom 1985-2014, with grid cell resolution for each OBGD";
  const fig_b_caption = "Daily maximum temperature (Tmax), averaged over meteorological summer (JJA) fom 1985-2014, with grid cell resolution for each OBGD";
  const fig_a_label = "2a";
  const fig_b_label = "2b";

  return (
      <div style={{ padding: 16, fontFamily: "system-ui, sans-serif" }}>
      <div
    style={{
      border: "1px solid #ddd",
      borderRadius: 12,
      padding: 12,
      background: "white",
      color: "black",
    }}
      >
      <MultiMaps datasets={fig_a_data} title={fig_a_title} titles={fig_a_titles}
        fig_label={fig_a_label} caption={fig_a_caption}/>
      <MultiMaps datasets={fig_b_data} title={fig_b_title} titles={fig_b_titles}
        fig_label={fig_b_label} caption={fig_b_caption}/>
      </div>
      </div>
  );
}
//
