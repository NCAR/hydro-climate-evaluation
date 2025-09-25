      // 'wt_day_to_day',
      // 'wt_clim',

export const settings = {
  lat: 38,
  lon: -97,
  zoom: 4,
  climateSignal: true,
  dif: true,
  observation: true,
  bucket: 'https://hydro.rap.ucar.edu/hydro-climate-eval/data/refactor/',

  variables: [
      'n34pr',
      'n34t',
      'pr90',
      'pr99',
      't90',
      't99',
      'djf_t',
      'djf_p',
      'mam_t',
      'mam_p',
      'jja_t',
      'jja_p',
      'son_t',
      'son_p',
      'ann_t',
      'ann_p',
      'ann_snow',
      'freezethaw',
      'drought_1yr',
      'drought_2yr',
      'drought_5yr',
      'tpcorr',
  ],
  variables_trend: ['ptrend', 'ttrend'],

  obs_lev1_title: "Dataset",
  obs_lev1: {
      'conus404': 'Conus404',
      'gmet': 'GMET',
      'gridmet': 'gridMET',
      'livneh': 'Livneh',
      'nclimgrid': 'nClimGrid',
      'nldas': 'NLDAS',
      'prism': 'PRISM',
  },

  past_eras: {
      '1981_2004': '1981-2004'
  },
  future_eras: {
      '2036_2059': '2036-2059',
      '2056_2079': '2056-2079',
      '2076_2099': '2076-2099'
  },

  obs_lev2_title: null,
  obs_lev2: null,

  downscaling_title: "Downscaling Method",
  downscaling_past: {
      'icar':'ICAR',
      'icarwest':'ICAR West',
      'loca_8th':'LOCA_8th',
      'maca':'MACA',
      'nasa_nex':'NASA-NEX',
  },
  tmp_ds_past: {
      'gard_r2':'GARD_r2',
      'gard_r3':'GARD_r3',},


  downscaling_future: {
      'icar':'ICAR',
      'icarwest':'ICAR West',
      'loca_8th':'LOCA_8th',
      'maca':'MACA',
      'nasa_nex':'NASA-NEX',
  },

  model: {loca_8th: {access1_3: "ACCESS1-3", canesm2: "CanESM2", ccsm4: "CCSM4", miroc5: "MIROC5",
      mri_cgcm3: "MRI-CGCM3", noresm1_m: "NorESM1-M"}, icar: {access1_3: "ACCESS1-3",
      canesm2: "CanESM2", ccsm4: "CCSM4", miroc5: "MIROC5", mri_cgcm3: "MRI-CGCM3",
      noresm1_m: "NorESM1-M"}, gard_r3: {access1_3: "ACCESS1-3", canesm2: "CanESM2",
      ccsm4: "CCSM4", miroc5: "MIROC5", mri_cgcm3: "MRI-CGCM3", noresm1_m: "NorESM1-M"},
      gard_r2: {access1_3: "ACCESS1-3", canesm2: "CanESM2", ccsm4: "CCSM4", miroc5: "MIROC5",
      mri_cgcm3: "MRI-CGCM3", noresm1_m: "NorESM1-M"}, maca: {canesm2: "CanESM2",
      ccsm4: "CCSM4", miroc5: "MIROC5", mri_cgcm3: "MRI-CGCM3", noresm1_m: "NorESM1-M"},
      nasa_nex: {canesm2: "CanESM2", miroc5: "MIROC5", mri_cgcm3: "MRI-CGCM3", noresm1_m: "NorESM1-M"},
      icarwest: {canesm2: "CanESM2", ccsm4: "CCSM4", miroc5: "MIROC5", mri_cgcm3: "MRI-CGCM3"}
  },

  downscaling_climateSignal: {
      icar: 'ICAR',
      icarwest: 'ICAR West',
      loca_8th: 'LOCA_8th',
      maca: 'MACA',
      nasa_nex: 'NASA_NEX',
  },
  tmp: {
      gard_r2: 'GARD_R2',
      gard_r3: 'GARD_R3',
  },

  model_climateSignal: {
    icar: {access1_3: "ACCESS1-3", canesm2: "CanESM2", ccsm4: "CCSM4",
           miroc5: "MIROC5", mri_cgcm3: "MRI-CGCM3", noresm1_m: "NorESM1-M"},
    gard_r2: {access1_3: "ACCESS1-3", canesm2: "CanESM2", ccsm4: "CCSM4",
              miroc5: "MIROC5",
              mri_cgcm3: "MRI-CGCM3", noresm1_m: "NorESM1-M"},
    gard_r3: {access1_3: "ACCESS1-3",
              canesm2: "CanESM2", ccsm4: "CCSM4", miroc5: "MIROC5",
              mri_cgcm3: "MRI-CGCM3",
              noresm1_m: "NorESM1-M"},
    loca_8th: {access1_3: "ACCESS1-3", canesm2: "CanESM2",
               ccsm4: "CCSM4", miroc5: "MIROC5", mri_cgcm3: "MRI-CGCM3",
               noresm1_m: "NorESM1-M"},
    icarwest: {canesm2: "CanESM2", ccsm4: "CCSM4", miroc5: "MIROC5",
               mri_cgcm3: "MRI-CGCM3"},
    maca: {canesm2: "CanESM2", ccsm4: "CCSM4", miroc5: "MIROC5",
           mri_cgcm3: "MRI-CGCM3",
           noresm1_m: "NorESM1-M"},
    nasa_nex: {canesm2: "CanESM2", miroc5: "MIROC5", mri_cgcm3: "MRI-CGCM3",
               noresm1_m: "NorESM1-M"}
  },



  metricRegions: {
    desertsouthwest: 'Desert Southwest',
    greatlakes: 'Great Lakes',
    gulfcoast: 'Gulf Coast',
    midatlantic: 'Mid-Atlantic',
    mountainwest: 'Mountain West',
    northatlantic: 'North Atlantic',
    northernplains: 'Northern Plains',
    pacificnorthwest: 'Pacific Northwest',
    pacificsouthwest: 'Pacific Southwest',
  },

  metrics: {
    desertsouthwest: {

    },
  },


  show_ensemble: false,
  ensemble: null
};
