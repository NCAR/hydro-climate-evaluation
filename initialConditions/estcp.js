export const settings = {
  lat: 38,
  lon: -97,
  zoom: 2.25,
  signalToNoise: true,
  agreement: true,
  climateSignal: false,
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
  missing_variables: [
      'wt_clim',
      'wt_day_to_day',
  ],
  agreement_variables: [
      'mean_tasmax',
      'mean_jja_tasmax',
      'q95_tasmax',
      'std_pr',
      'q95_pr',
      'sum_pr',
      'mean_jja_pr',
      'mean_pr',
  ],

  agreement_variables_test: [
      'mean_pr',
      'mean_jja_pr',
      'sum_pr',
      'q95_pr',
      'std_pr',
      '2yr_pr',
      '5yr_pr',
      'gcm',
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

  obs_lev2_title: null,
  obs_lev2: null,

  downscaling_title: "Downscaling Method",
  downscaling_past: {
      'icar':'ICAR',
      'icarwest':'ICAR West',
      'gard_r2':'GARD_r2',
      'gard_r3':'GARD_r3',
      'loca_8th':'LOCA_8th',
      'maca':'MACA',
      'nasa_nex':'NASA-NEX',
  },
  tmp_ds_past: {
},


  downscaling_future: {
      'icar':'ICAR',
      'icarwest':'ICAR West',
      'gard_r2':'GARD_r2',
      'gard_r3':'GARD_r3',
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
      gard_r2: 'GARD_R2',
      gard_r3: 'GARD_R3',
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

  cmip: {
    cmip5: 'CMIP5',
    cmip6: 'CMIP6',
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
  ensemble: null,

  stationData: {
    sites: {
      TCM: {
          lon: -122.483, lat: 47.15,
          shortName: 'TCM',
          name: 'McChord Air Force Base Airfield',
          data: '',
      },
      GRF: {
          lon: -122.583, lat: 47.083,
          shortName: 'GRF',
          name: 'Gray Army Air Field',
          data: '',
      },
      TIW:  {
          lon:  -122.576, lat: 47.267,
          shortName: 'TIW',
          name: 'Tacoma Narrows Airport',
          data: '',
      },
      OLM: {
          lon:  -122.905 , lat: 46.974,
          shortName: 'OLM',
          name: 'Olympia Station',
          data: '',
      },
      SEA: {
          lon: -122.314, lat: 47.45,
          shortName: 'SEA',
          name: 'Seattle-Tacoma Airport',
          data: '',
      },
    }
  },


  siteData: {
    sites: {
      fortLiberty: {
          lon: -78.9991667, lat: 35.1391667,
          name: 'Fort Liberty, NC',
          data: "../data_json/tasminAvg_seas_points.json"
      },
      jblm:  {
          lon: -122.564444, lat: 47.105833,
          name: 'Joint Base Lewis–McChord, WA',
          data: "../data_json/tasminAvg_seas_points.json"
      },
      jbphh: {
          lon: -157.943889, lat: 21.349167,
          name: 'Joint Base Pearl Harbor-Hickham, HI',
          data: "../data_json/tasminAvg_seas_points.json"
      },
      fort_wainwright: {
          lon: -147.642778, lat: 64.827778,
          name: 'Fort Wainwright, AK',
          data: "../data_json/tasminAvg_seas_points.json"
      },
    }
  },
};
