export const settings = {
  lat: 38,
  lon: -97,
  zoom: 4,

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
      'freezethaw'
  ],
  variables_trend: ['ptrend', 'ttrend'],

  obs: {
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
  past_eras_old_one: {
      '1981_2004': '1981-2004'
  },
  future_eras: {
      '2070_2100': '2076-2099'
  },

  downscaling_past: {
      'icar':'ICAR',
      'gard_r2':'GARD_r2',
      'gard_r3':'GARD_r3',
      'loca_8th':'LOCA_8th',
      'maca':'MACA',
      'nasa_nex':'NASA-NEX',
  },

  downscaling_future: {
      'icar':'ICAR',
      'loca_8th':'LOCA_8th',
      'maca':'MACA',
      'nasa_nex':'NASA-NEX',
  },

  model: {
      icar: {
          noresm1_m: 'NorESM-M',
          access1_3: 'ACCESS1-3',
          canesm2: 'CanESM2',
          ccsm4: 'CCSM4',
          miroc5: 'MIROC5',
      },
      gard_r2: {
          noresm1_m: 'NorESM-M',
          access1_3: 'ACCESS1-3',
          canesm2: 'CanESM2',
          ccsm4: 'CCSM4',
          miroc5: 'MIROC5',
      },
      gard_r3: {
          noresm1_m: 'NorESM-M',
          access1_3: 'ACCESS1-3',
          canesm2: 'CanESM2',
          ccsm4: 'CCSM4',
          miroc5: 'MIROC5',
      },
      loca_8th: {
          noresm1_m: 'NorESM-M',
          access1_3: 'ACCESS1-3',
          canesm2: 'CanESM2',
          ccsm4: 'CCSM4',
          miroc5: 'MIROC5',
      },
      maca: {
          noresm1_m: 'NorESM-M',
          canesm2: 'CanESM2',
          ccsm4: 'CCSM4',
          miroc5: 'MIROC5',
      },
      nasa_nex: {
          noresm1_m: 'NorESM-M',
          canesm2: 'CanESM2',
          miroc5: 'MIROC5',
      },
  }



};
