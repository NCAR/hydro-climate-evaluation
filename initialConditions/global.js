export const settings = {
  lat: 38,
  lon: -37,
  zoom: 1.5,
  climateSignal: false,
  dif: false,
  bucket: 'https://hydro.rap.ucar.edu/hydro-climate-eval/data/global/',

  variables: [
      'n34pr',
      'n34t',
      'eli_t',
      'eli_p',
      'djf_t',
      'djf_p',
      'mam_t',
      'mam_p',
      'jja_t',
      'jja_p',
      'son_t',
      'son_p',
  ],
  variables_trend: [],


  obs_lev1_title: "Region",
  obs_lev1: {
    global: "Global",
    midwest: "Midwest",
    northeast: "Northeast",
    northerngreatplains: "Northern Great Plains",
    southerngreatplains: "Southern Great Plains",
  },

  obs: {
    "global": "global",
    "midwest": "midwest",
    "northeast": "northeast",
    "northerngreatplains": "northerngreatplains",
    "southerngreatplains": "southerngreatplains"
  },

    region: {
        "global": "global",
        "midwest": "midwest",
        "northeast": "northeast",
        "northerngreatplains": "northerngreatplains",
        "southerngreatplains": "southerngreatplains"
    },
    region_obs: {
        "global": {
            "cru": "cru",
            "era_5": "era_5",
            "udel": "udel"
        },
        "midwest": {
            "cru": "cru",
            "era_5": "era_5",
            "livneh": "livneh",
            "prism": "prism",
            "udel": "udel"
        },
        "northeast": {
            "cru": "cru",
            "era_5": "era_5",
            "livneh": "livneh",
            "prism": "prism",
            "udel": "udel"
        },
        "northerngreatplains": {
            "cru": "cru"
        },
        "southerngreatplains": {
            "cru": "cru",
            "era_5": "era_5",
            "livneh": "livneh",
            "prism": "prism",
            "udel": "udel"
        }
    },



  obs_eras_test: {1850_2100: '1850-2100'},
  obs_eras: '1850_2100',

  past_eras: {
      1850_2005: '1850-2005'
  },
  future_eras: {
  },

  downscaling_title: "CMIP",
  downscaling_past: {
      cmip5:'CMIP5',
  },
  downscaling_future: {
      cmip5:'CMIP5',
  },

  model: {
      cmip5: {
          access1_0: 'access1_0',
          canesm2: 'canesm2',
          cesm1_cam5_1_fv2: 'cesm1_cam5_1_fv2',
          cmcc_cm: 'cmcc_cm',
          csiro_mk3_6_0: 'csiro_mk3_6_0',
          fgoals_s2: 'fgoals_s2',
          gfdl_esm2g: 'gfdl_esm2g',
          giss_e2_r: 'giss_e2_r',
          hadgem2_cc: 'hadgem2_cc',
          ipsl_cm5b_lr: 'ipsl_cm5b_lr',
          miroc_esm_chem: 'miroc_esm_chem',
          mri_cgcm3: 'mri_cgcm3',
          access1_3: 'access1_3',
          ccsm4: 'ccsm4',
          cesm1_fastchem: 'cesm1_fastchem',
          cmcc_cms: 'cmcc_cms',
          csiro_mk3l_1_2: 'csiro_mk3l_1_2',
          fio_esm: 'fio_esm',
          gfdl_esm2m: 'gfdl_esm2m',
          giss_e2_r_cc: 'giss_e2_r_cc',
          hadgem2_es: 'hadgem2_es',
          miroc4h: 'miroc4h',
          mpi_esm_lr: 'mpi_esm_lr',
          mri_esm1: 'mri_esm1',
          bnu_esm: 'bnu_esm',
          cesm1_bgc: 'cesm1_bgc',
          cesm1_waccm: 'cesm1_waccm',
          cnrm_cm5: 'cnrm_cm5',
          ec_earth: 'ec_earth',
          gfdl_cm2p1: 'gfdl_cm2p1',
          giss_e2_h: 'giss_e2_h',
          hadcm3: 'hadcm3',
          ipsl_cm5a_lr: 'ipsl_cm5a_lr',
          miroc5: 'miroc5',
          mpi_esm_mr: 'mpi_esm_mr',
          noresm1_m: 'noresm1_m',
          cancm4: 'cancm4',
          cesm1_cam5: 'cesm1_cam5',
          cmcc_cesm: 'cmcc_cesm',
          cnrm_cm5_2: 'cnrm_cm5_2',
          fgoals_g2: 'fgoals_g2',
          gfdl_cm3: 'gfdl_cm3',
          giss_e2_h_cc: 'giss_e2_h_cc',
          hadgem2_ao: 'hadgem2_ao',
          ipsl_cm5a_mr: 'ipsl_cm5a_mr',
          miroc_esm: 'miroc_esm',
          mpi_esm_p: 'mpi_esm_p',
      },
  }





};
