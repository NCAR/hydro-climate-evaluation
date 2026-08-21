// Scale Values
const precipDif = 1.0;
const tempDif = 0.1;
export const Scale_Values = Object.freeze({
  // diference colormap
  dif: 0.11,
  dift: tempDif,
  difp: precipDif,

  pr: precipDif,
  tasmax: tempDif,
  dif_pr: precipDif,
  dif_tasmax: tempDif,

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
  dif_ann_t: tempDif,

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
  dif_ann_p: precipDif,


  dif_pr: precipDif,
  dif_tasmax: tempDif,


  // drought
  dif_drought_1yr: 0.1,
  dif_drought_2yr: 0.1,
  dif_drought_5yr: 0.1,

  // new metrics
  dif_tpcorr: 0.1,
  dif_wt_clim: 0.1,
  dif_wt_day_to_day: 0.1,

  // CMIP6-only metrics
  'dif_pr_gev-20yr': precipDif,
  'dif_pr_gev-50yr': precipDif,
  'dif_pr_gev-100yr': precipDif,
  dif_djf_t_iav: tempDif,
  dif_mam_t_iav: tempDif,
  dif_jja_t_iav: tempDif,
  dif_son_t_iav: tempDif,
  dif_ann_t_iav: tempDif,
  dif_djf_p_iav: precipDif,
  dif_mam_p_iav: precipDif,
  dif_jja_p_iav: precipDif,
  dif_son_p_iav: precipDif,
  dif_ann_p_iav: precipDif,
  dif_ann_snow_iav: precipDif,
  dif_wet_day_frac: 0.01,

  // this does nothing, change in colorbar.js
  tpcorr: 0.1,

  // agreement
  std_pr: 0.1,

  // new cmip variables
  eli_t: 0.1,
  eli_p: 0.1,
});

// Defaults cover the rounded 1st-99th percentile of the CONUS coarse Zarr
// pyramids. Difference ranges are symmetric so zero stays at the color midpoint.
export const Clim_Ranges = Object.freeze({
  dift: { max: 2, min: -2},
  difp: { max: 40, min: -40},
  // temperature variables
  tavg: { max: 37, min: 0 },
  n34t: { max: 1, min: -1 },
  ttrend: { max: 1.2, min: -0.3 },
  t90: { max: 40, min: 10 },
  t99: { max: 45, min: 15 },
  djf_t: { max: 20, min: -15 },
  mam_t: { max: 25, min: 0 },
  jja_t: { max: 35, min: 10 },
  son_t: { max: 30, min: 0 },
  ann_t: { max: 25, min: 0 },
  dif_tavg: { max: 4, min: -4 },
  dif_n34t: { max: 1, min: -1 },
  dif_ttrend: { max: 1.2, min: -1.2 },
  dif_t90: { max: 10, min: -10 },
  dif_t99: { max: 10, min: -10 },
  dif_djf_t: { max: 7, min: -7 },
  dif_mam_t: { max: 6, min: -6 },
  dif_jja_t: { max: 10, min: -10 },
  dif_son_t: { max: 8, min: -8 },
  dif_ann_t: { max: 7, min: -7 },

  // signal to noise
  pr: { max: 4, min: 0 },
  tasmax: { max: 6, min: 0 },
  dif_pr: { max: 4, min: -4 },
  dif_tasmax: { max: 6, min: -6 },


  // precip variables
  prec: { max: 70, min: 0 },
  n34pr: { max: 1, min: -1 },
  ptrend: { max: 150, min: -150 },
  pr90: { max: 20, min: 0 },
  pr99: { max: 130, min: 0 },
  djf_p: { max: 1000, min: 0 },
  mam_p: { max: 550, min: 0 },
  jja_p: { max: 650, min: 0 },
  son_p: { max: 550, min: 0 },
  ann_p: { max: 2100, min: 0 },
  dif_prec: { max: 50, min: -50 },
  dif_n34pr: { max: 1, min: -1 },
  dif_ptrend: { max: 225, min: -225 },
  dif_pr90: { max: 4, min: -4 },
  dif_pr99: { max: 35, min: -35 },
  dif_djf_p: { max: 300, min: -300 },
  dif_mam_p: { max: 200, min: -200 },
  dif_jja_p: { max: 325, min: -325 },
  dif_son_p: { max: 175, min: -175 },
  dif_ann_p: { max: 400, min: -400 },


  // misc
  ann_snow: { max: 700, min: 0 },
  freezethaw: { max: 200, min: 0 },
  dif_ann_snow: { max: 550, min: -550 },
  dif_freezethaw: { max: 200, min: -200 },

  // CMIP6-only metrics
  'pr_gev-20yr': { max: 225, min: 0 },
  'pr_gev-50yr': { max: 275, min: 0 },
  'pr_gev-100yr': { max: 350, min: 0 },
  'dif_pr_gev-20yr': { max: 75, min: -75 },
  'dif_pr_gev-50yr': { max: 125, min: -125 },
  'dif_pr_gev-100yr': { max: 175, min: -175 },
  djf_t_iav: { max: 3.5, min: 0 },
  mam_t_iav: { max: 2, min: 0 },
  jja_t_iav: { max: 2, min: 0 },
  son_t_iav: { max: 2.5, min: 0 },
  ann_t_iav: { max: 1.6, min: 0 },
  dif_djf_t_iav: { max: 1, min: -1 },
  dif_mam_t_iav: { max: 0.5, min: -0.5 },
  dif_jja_t_iav: { max: 0.7, min: -0.7 },
  dif_son_t_iav: { max: 0.9, min: -0.9 },
  dif_ann_t_iav: { max: 0.7, min: -0.7 },
  djf_p_iav: { max: 325, min: 0 },
  mam_p_iav: { max: 180, min: 0 },
  jja_p_iav: { max: 175, min: 0 },
  son_p_iav: { max: 225, min: 0 },
  ann_p_iav: { max: 425, min: 0 },
  dif_djf_p_iav: { max: 65, min: -65 },
  dif_mam_p_iav: { max: 55, min: -55 },
  dif_jja_p_iav: { max: 60, min: -60 },
  dif_son_p_iav: { max: 65, min: -65 },
  dif_ann_p_iav: { max: 125, min: -125 },
  ann_snow_iav: { max: 175, min: 0 },
  dif_ann_snow_iav: { max: 150, min: -150 },
  wet_day_frac: { max: 1, min: 0 },
  dif_wet_day_frac: { max: 0.25, min: -0.25 },

  // new vars
  tpcorr: { max: 1, min: -1},
  wt_clim: { max: 1, min: 0},
  wt_day_to_day: { max: 1, min: 0},
  dif_tpcorr: { max: 1, min: -1},
  dif_wt_clim: { max: 10, min: -10},
  dif_wt_day_to_day: { max: 10, min: -10},

  // agreement vars
  sum_pr: {max: 2000, min:0},
  std_pr: {max: 1, min:-1},



  // drought
  drought_1yr: { max: 30, min: 0 },
  drought_2yr: { max: 35, min: 0 },
  drought_5yr: { max: 40, min: 0 },
  dif_drought_1yr: { max: 20, min: -20 },
  dif_drought_2yr: { max: 25, min: -25 },
  dif_drought_5yr: { max: 35, min: -35 },

  // new cmip variables
  eli_t: { max: 1, min: -1 },
  eli_p: { max: 1, min: -1 },
  dif_eli_t: { max: 1, min: -1 },
  dif_eli_p: { max: 1, min: -1 },

  // Sam's variables
  '2yr_pr': { max: 10, min: -10 },
  '5yr_pr': { max: 20, min: -20 },
  mean_jja_pr: { max: 1, min: -1 },
  mean_pr: { max: 1, min: -1 },
  q95_pr: { max: 2, min: -2 },
  std_pr: { max: 1, min: -1 },
  sum_pr: { max: 1000, min: -1000 },
  mean_jja_tasmax: { max: 6, min: 0 },
  mean_tasmax: { max: 6, min: 0 },
  q95_tasmax: { max: 6, min: 0 },
  mean_djf_tasmin: { max: 4, min: 0 },
  mean_tasmin: { max: 4, min: 0 },
  max_tasmin: { max: 4, min: 0 },
  q95_tasmin: { max: 4, min: 0 },
  std_tasmin: { max: 2, min: -2 },
  '2yr_tasmin': { max: 2, min: -2 },
});

// The current CMIP6 drought stores use a sub-two scale, while the CMIP5 and
// observational stores contain count-sized values. Other metrics share the
// robust defaults above so comparisons retain a consistent color scale.
const Cmip6_Clim_Range_Overrides = Object.freeze({
  drought_1yr: { max: 1.2, min: 0 },
  drought_2yr: { max: 1.3, min: 0 },
  drought_5yr: { max: 1.5, min: 0 },
  dif_drought_1yr: { max: 0.6, min: -0.6 },
  dif_drought_2yr: { max: 0.75, min: -0.75 },
  dif_drought_5yr: { max: 1.1, min: -1.1 },
});

export const getClimRange = (metric, cmip = 'cmip5') =>
  (cmip === 'cmip6' && Cmip6_Clim_Range_Overrides[metric]) ||
  Clim_Ranges[metric];



// const precip_colormap = 'blueprecip';
const precip_colormap = 'BrBG';
const temp_colormap = 'BuYlRd';
const dif_temp_colormap = 'seismic';
const dif_precip_colormap = 'seismic';
export const Default_Colormaps = Object.freeze({
  // temperature variables
  tavg: temp_colormap,
  ttrend: temp_colormap,
  t90: temp_colormap,
  t99: temp_colormap,
  djf_t: temp_colormap,
  mam_t: temp_colormap,
  jja_t: temp_colormap,
  son_t: temp_colormap,
  ann_t: temp_colormap,

  // signal-to-noise red -> blue
  // pr: 'redblue',
  // tasmax: 'redblue',
  pr: 'difredblue',
  tasmax: 'difredblue',


  // precip variables
  prec: 'browngreen',
  ptrend: 'browngreen',
  pr90: precip_colormap,
  pr99: precip_colormap,
  djf_p: precip_colormap,
  mam_p: precip_colormap,
  jja_p: precip_colormap,
  son_p: precip_colormap,
  ann_p: precip_colormap,

  // CMIP6-only metrics
  'pr_gev-20yr': precip_colormap,
  'pr_gev-50yr': precip_colormap,
  'pr_gev-100yr': precip_colormap,
  djf_t_iav: temp_colormap,
  mam_t_iav: temp_colormap,
  jja_t_iav: temp_colormap,
  son_t_iav: temp_colormap,
  ann_t_iav: temp_colormap,
  djf_p_iav: precip_colormap,
  mam_p_iav: precip_colormap,
  jja_p_iav: precip_colormap,
  son_p_iav: precip_colormap,
  ann_p_iav: precip_colormap,
  ann_snow_iav: precip_colormap,
  wet_day_frac: precip_colormap,

  // precip agreement
  '2yr_pr': precip_colormap,
  '5yr_pr': precip_colormap,
  mean_jja_pr: precip_colormap,
  mean_pr: precip_colormap,
  sum_pr: precip_colormap,
  std_pr: dif_precip_colormap,
  q95_pr: dif_precip_colormap,
  mean_jja_tasmax: precip_colormap,
  mean_tasmax: precip_colormap,
  q95_tasmax: dif_precip_colormap,
  sum_tasmax: precip_colormap,
  std_tasmax: dif_precip_colormap,

  mean_djf_tasmin: precip_colormap,
  mean_tasmin: precip_colormap,
  max_tasmin: precip_colormap,
  q95_tasmin: precip_colormap,
  std_tasmin: precip_colormap,
  '2yr_tasmin': precip_colormap,

  // snow
  ann_snow: precip_colormap,
  freezethaw: precip_colormap,

  // drought
  drought_1yr: precip_colormap,
  drought_2yr: precip_colormap,
  drought_5yr: precip_colormap,

  // difference colormap
  dif: 'difredblue',
  dift: dif_temp_colormap,
  difp: dif_precip_colormap,

  // temperature variables
  dif_tavg: dif_temp_colormap,
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
  dif_ptrend: dif_precip_colormap,
  dif_pr90: dif_precip_colormap,
  dif_pr99: dif_precip_colormap,
  dif_djf_p: dif_precip_colormap,
  dif_mam_p: dif_precip_colormap,
  dif_jja_p: dif_precip_colormap,
  dif_son_p: dif_precip_colormap,
  dif_ann_p: dif_precip_colormap,

  // CMIP6-only metric differences
  'dif_pr_gev-20yr': dif_precip_colormap,
  'dif_pr_gev-50yr': dif_precip_colormap,
  'dif_pr_gev-100yr': dif_precip_colormap,
  dif_djf_t_iav: dif_temp_colormap,
  dif_mam_t_iav: dif_temp_colormap,
  dif_jja_t_iav: dif_temp_colormap,
  dif_son_t_iav: dif_temp_colormap,
  dif_ann_t_iav: dif_temp_colormap,
  dif_djf_p_iav: dif_precip_colormap,
  dif_mam_p_iav: dif_precip_colormap,
  dif_jja_p_iav: dif_precip_colormap,
  dif_son_p_iav: dif_precip_colormap,
  dif_ann_p_iav: dif_precip_colormap,
  dif_ann_snow_iav: dif_precip_colormap,
  dif_wet_day_frac: dif_precip_colormap,

  // snow
  dif_ann_snow: dif_precip_colormap,
  dif_freezethaw: dif_precip_colormap,

  // drought
  dif_drought_1yr: dif_precip_colormap,
  dif_drought_2yr: dif_precip_colormap,
  dif_drought_5yr: dif_precip_colormap,

  wt_clim: precip_colormap,
  wt_day_to_day: precip_colormap,

  // new cmip variables
  eli_t: temp_colormap,
  eli_p: precip_colormap,
  dif_eli_t: dif_temp_colormap,
  dif_eli_p: dif_precip_colormap,

  // new variables
  dif_wt_clim: dif_precip_colormap,
  dif_wt_day_to_day: dif_precip_colormap,

  // correlation
  n34t: 'seismic',
  dif_n34t: 'seismic',
  n34pr: 'seismic',
  dif_n34pr: 'seismic',
  tpcorr: 'seismic',
  dif_tpcorr: 'seismic',

});

export const readmeUrl =
  'https://github.com/NCAR/hydro-climate-evaluation?readme-ov-file#hydro-climate-evaluation-map';
