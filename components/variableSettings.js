// Scale Values
const precipDif = 1.0;
const tempDif = 0.1;
export const Scale_Values = Object.freeze({
  // diference colormap
  dif: 0.11,
  dift: tempDif,
  difp: precipDif,

  // temperature variables
  dif_tavg: tempDif,
  dif_n34t: tempDif,
  dif_ttrend: 0.1,
  dif_t90: tempDif,
  dif_t99: tempDif,
  dif_djf_t: tempDif,
  dif_mam_t: tempDif,
  dif_jja_t: tempDif,
  dif_son_t: tempDif,

  // precip variables
  dif_prec: precipDif,
  dif_n34pr: precipDif,
  dif_ptrend: 0.1,
  dif_pr90: 0.1,
  dif_pr99: 0.1,
  dif_djf_p: precipDif,
  dif_mam_p: precipDif,
  dif_jja_p: precipDif,
  dif_son_p: precipDif,
});

export const Clim_Ranges = Object.freeze({
  dift: { max: 2, min: -2},
  difp: { max: 40, min: -40},
  // temperature variables
  tavg: { max: 37, min: 0 },
  n34t: { max: 1, min: -1 },
  ttrend: { max: 0.1, min: -0.1 },
  t90: { max: 30, min: 0 },
  t99: { max: 30, min: 0 },
  djf_t: { max: 15, min: -10 },
  mam_t: { max: 30, min: 0 },
  jja_t: { max: 30, min: 0 },
  son_t: { max: 30, min: 0 },
  ann_t: { max: 30, min: 0 },
  dif_tavg: { max: 4, min: -4 },
  dif_n34t: { max: 1, min: -1 },
  dif_ttrend: { max: 1.0, min: -1.0 },
  dif_t90: { max: 4, min: -4 },
  dif_t99: { max: 4, min: -4 },
  dif_djf_t: { max: 4, min: -4 },
  dif_mam_t: { max: 4, min: -4 },
  dif_jja_t: { max: 4, min: -4 },
  dif_son_t: { max: 4, min: -4 },
  dif_ann_t: { max: 4, min: -4 },

  // precip variables
  prec: { max: 70, min: 0 },
  n34pr: { max: 1, min: -1 },
  ptrend: { max: 3, min: -3 },
  pr90: { max: 70, min: 0 },
  pr99: { max: 70, min: 0 },
  djf_p: { max: 80, min: 0 },
  mam_p: { max: 70, min: 0 },
  jja_p: { max: 70, min: 0 },
  son_p: { max: 70, min: 0 },
  ann_p: { max: 2000, min: 0 },
  dif_prec: { max: 50, min: -50 },
  dif_n34pr: { max: 1, min: -1 },
  dif_ptrend: { max: 20, min: -20 },
  dif_pr90: { max: 10, min: -10 },
  dif_pr99: { max: 20, min: -20 },
  dif_djf_p: { max: 60, min: -60 },
  dif_mam_p: { max: 50, min: -50 },
  dif_jja_p: { max: 50, min: -50 },
  dif_son_p: { max: 50, min: -50 },
  dif_ann_p: { max: 50, min: -50 },

  // misc
  ann_snow: { max: 250, min: 0 },
  freezethaw: { max: 250, min: 0 },
  dif_ann_snow: { max: 50, min: -50 },
  dif_freezethaw: { max: 50, min: -50 },
});



const precip_colormap = 'blueprecip';
const temp_colormap = 'BuYlRd';
const dif_temp_colormap = 'difbluered';
const dif_precip_colormap = 'difbrowngreen';
export const Default_Colormaps = Object.freeze({
  // temperature variables
  tavg: temp_colormap,
  n34t: temp_colormap,
  ttrend: temp_colormap,
  t90: temp_colormap,
  t99: temp_colormap,
  djf_t: temp_colormap,
  mam_t: temp_colormap,
  jja_t: temp_colormap,
  son_t: temp_colormap,
  ann_t: temp_colormap,

  // precip variables
  prec: 'browngreen',
  n34pr: 'browngreen',
  ptrend: 'browngreen',
  pr90: precip_colormap,
  pr99: precip_colormap,
  djf_p: precip_colormap,
  mam_p: precip_colormap,
  jja_p: precip_colormap,
  son_p: precip_colormap,
  ann_p: precip_colormap,

  // snow
  ann_snow: precip_colormap,
  freezethaw: precip_colormap,

  // difference colormap
  dif: 'difredblue',
  dift: dif_temp_colormap,
  difp: dif_precip_colormap,

  // temperature variables
  dif_tavg: dif_temp_colormap,
  dif_n34t: dif_temp_colormap,
  dif_ttrend: dif_temp_colormap,
  dif_t90: dif_temp_colormap,
  dif_t99: dif_temp_colormap,
  dif_djf_t: dif_temp_colormap,
  dif_mam_t: dif_temp_colormap,
  dif_jja_t: dif_temp_colormap,
  dif_son_t: dif_temp_colormap,
  dif_ann_t: dif_temp_colormap,

  // precip variables
  dif_prec: dif_precip_colormap,
  dif_n34pr: dif_precip_colormap,
  dif_ptrend: dif_precip_colormap,
  dif_pr90: dif_precip_colormap,
  dif_pr99: dif_precip_colormap,
  dif_djf_p: dif_precip_colormap,
  dif_mam_p: dif_precip_colormap,
  dif_jja_p: dif_precip_colormap,
  dif_son_p: dif_precip_colormap,
  dif_ann_p: dif_precip_colormap,

  // snow
  dif_ann_snow: dif_precip_colormap,
  dif_freezethaw: dif_precip_colormap,
});
