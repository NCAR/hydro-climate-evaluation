export const settings = {
  lat: 38,
  lon: -97,
  zoom: 4,
  climateSignal: true,
  dif: true,
  observation: true,
  bucket: 'https://hydro.rap.ucar.edu/hydro-climate-eval/data/refactor/',
  // bucket: 'http://localhost:8080/hydro-climate-eval/data/refactor/',

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
  missing_variables: [
      'wt_clim',
      'wt_day_to_day',
  ],

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
  eras: {
      cmip5: {
          '1981_2004': '1981-2004',
          '2036_2059': '2036-2059',
          '2056_2079': '2056-2079',
          '2076_2099': '2076-2099',
      },
      cmip6: {
          '1981_2014': '1981-2014',
          '2024_2059': '2024-2059',
          '2064_2099': '2064-2099',
      },
  },

  scenarios: {
      cmip5: {
          'rcp45': 'RCP-4.5',
          'rcp85': 'RCP-8.5',
      },
      cmip6: {
          'ssp245': 'SSP2-4.5',
          'ssp370': 'SSP3-7.0',
          'ssp585': 'SSP5-8.5',
      }
  },

  obs_lev2_title: null,
  obs_lev2: null,

  downscaling_title: "Downscaling Method",
  downscaling_past: {
      cmip5: {
      'icar':'ICARv1',
      'icarwest':'ICARv2',
      'gard_r2':'GARD_r2',
      'gard_r3':'GARD_r3',
      'loca_8th':'LOCA',
      'maca':'MACA',
      'nasa_nex':'NASA-NEX',
      },
      cmip6: {
      'loca2':'LOCA2',
      'star_esdm':'NASA-NEX',
      }
  },
  tmp_ds_past: {
},

  downscaling_future: {
      cmip5: {
      'icar':'ICARv1',
      'icarwest':'ICARv2',
      'gard_r2':'GARD_r2',
      'gard_r3':'GARD_r3',
      'loca_8th':'LOCA',
      'maca':'MACA',
      'nasa_nex':'NASA-NEX',
      },
      cmip6: {
          'loca2':'LOCA2',
          'star_esdm':'NASA-NEX',
      }
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
      icarwest: {canesm2: "CanESM2", ccsm4: "CCSM4", miroc5: "MIROC5", mri_cgcm3: "MRI-CGCM3"},
      loca2: {access_cm2: "ACCESS-cm2", access_esm1_5: "ACCESS-ESM1-5"},
      star_esdm: {access_cm2: "ACCESS-cm2"},
  },

  downscaling_climateSignal: {
      icar: 'ICARv1',
      icarwest: 'ICARv2',
      gard_r2: 'GARD_R2',
      gard_r3: 'GARD_R3',
      loca_8th: 'LOCA',
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
