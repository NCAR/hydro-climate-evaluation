import { MultiMaps } from "../../components/estcp-data/MultiMaps";

import fig3aa from "../../data_json/fig3/fig3aa_star_points.json";
import fig3ab from "../../data_json/fig3/fig3ab_loca_points.json";
import fig3ac from "../../data_json/fig3/fig3ac_bcsdd_points.json";
import fig3ba from "../../data_json/fig3/fig3ba_star_minus_nclimgrid_points.json";
import fig3bb from "../../data_json/fig3/fig3bb_loca_minus_livneh_points.json";
import fig3bc from "../../data_json/fig3/fig3bc_ish_nex_minus_gddp_minus_cmip6_minus_gmfd_points.json";


// ---------- example page ----------
export default function App() {
  // Replace these with your real arrays: foo1, foo2, foo3
  // Each must be [{x, y, v}, ...]
  // const foo1 = window.foo1 ?? []; // or import foo1 from './foo1.json'
  // const foo2 = window.foo2 ?? [];
  // const foo3 = window.foo3 ?? [];
  const ds1 = fig3aa
  const ds2 = fig3ab
  const ds3 = fig3ac
  const ds4 = fig3ba
  const ds5 = fig3bb
  const ds6 = fig3bc
  const fig_a_data = [ds1, ds2, ds3];
  const fig_b_data = [ds4, ds5, ds6];
  const fig_a_titles = ["STAR", "LOCA2", "BCSDd"];
  const fig_b_titles = ["STAR minus nClimGrid", "LOCA2 minus Livneh", "NEX-GDDP-CMIP6-GMFD"];
  const fig_a_title = ""
  const fig_b_title = ""
  const fig_a_caption = "16 GCM (Table 2) ensemble mean daily minimum temperature (Tmin), averaged over meteorological winter (DJF) for STAR, LOCA2, and BCSDd, from 1985-2014.";
  const fig_b_caption = "Average of model biases compared to the training data used in the respective BSD workflow, for average DJF Tmin over 1985-2014.";

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
        fig_label="3a" caption={fig_a_caption}/>
      <MultiMaps datasets={fig_b_data} title={fig_b_title} titles={fig_b_titles}
        fig_label="3b"caption={fig_b_caption}/>
      </div>
      </div>
  );
}
//
