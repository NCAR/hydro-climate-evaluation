export const settings = {
  lat: 38,
  lon: -37,
  zoom: 1.5,
  climateSignal: false,
  dif: false,
  observation: false,
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
  },


    show_ensemble: true,
    ensemble: {
        ccsm4: ['r1i2p2', 'r1i2p1', 'r3i1p1', 'r4i1p1', 'r6i1p1', 'r2i1p1', 'r5i1p1', 'r1i1p1'],
        cesm1_bgc: ['r1i1p1'],
        mpi_esm_mr: ['r2i1p1', 'r3i1p1', 'r1i1p1'],
        bnu_esm: ['r1i1p1'],
        giss_e2_r_cc: ['r1i1p1'],
        ipsl_cm5a_lr: ['r3i1p1', 'r4i1p1', 'r6i1p1', 'r2i1p1', 'r5i1p1', 'r1i1p1'],
        fgoals_s2: ['r2i1p1', 'r3i1p1'],
        cancm4: ['r3i1p1', 'r4i1p1', 'r6i1p1', 'r8i1p1', 'r7i1p1', 'r9i1p1', 'r2i1p1', 'r5i1p1', 'r1i1p1', 'r10i1p1'],
        cnrm_cm5_2: ['r1i1p1'],
        mpi_esm_lr: ['r2i1p1', 'r3i1p1', 'r1i1p1'],
        gfdl_esm2m: ['r1i1p1'],
        cesm1_cam5_1_fv2: ['r2i1p1', 'r4i1p1', 'r3i1p1', 'r1i1p1'],
        access1_0: ['r2i1p1', 'r3i1p1', 'r1i1p1'],
        miroc5: ['r3i1p1', 'r4i1p1', 'r2i1p1', 'r5i1p1', 'r1i1p1'],
        ec_earth: ['r12i1p1', 'r6i1p1', 'r8i1p1', 'r9i1p1', 'r2i1p1'],
        cesm1_cam5: ['r2i1p1', 'r3i1p1', 'r1i1p1'],
        fgoals_g2: ['r3i1p1', 'r4i1p1', 'r2i1p1', 'r5i1p1', 'r1i1p1'],
        csiro_mk3l_1_2: ['r2i2p1', 'r1i2p1', 'r3i2p1'],
        hadgem2_cc: ['r2i1p1', 'r3i1p1', 'r1i1p1'],
        cesm1_waccm: ['r3i1p1', 'r4i1p1', 'r6i1p1', 'r7i1p1', 'r2i1p1', 'r5i1p1', 'r1i1p1'],
        giss_e2_r: ['r6i1p3', 'r1i1p127', 'r3i1p3', 'r2i1p1', 'r4i1p3', 'r1i1p1', 'r5i1p3', 'r3i1p1', 'r3i1p2', 'r1i1p123', 'r1i1p126', 'r1i1p124', 'r6i1p2', 'r1i1p121', 'r5i1p1', 'r1i1p128', 'r4i1p1', 'r4i1p2', 'r6i1p1', 'r1i1p3', 'r2i1p2', 'r5i1p2', 'r2i1p3', 'r1i1p122', 'r1i1p125', 'r1i1p2'],
        giss_e2_h: ['r5i1p3', 'r3i1p1', 'r3i1p2', 'r4i1p1', 'r4i1p2', 'r3i1p3', 'r1i1p2', 'r1i1p3', 'r2i1p2', 'r6i1p2', 'r2i1p1', 'r5i1p2', 'r4i1p3', 'r2i1p3', 'r1i1p1', 'r5i1p1'],
        cmcc_cms: ['r1i1p1'],
        hadgem2_es: ['r3i1p1', 'r4i1p1', 'r2i1p1', 'r5i1p1', 'r1i1p1'],
        hadcm3: ['r3i1p1', 'r4i1p1', 'r6i1p1', 'r8i1p1', 'r7i1p1', 'r9i1p1', 'r2i1p1', 'r5i1p1', 'r1i1p1', 'r10i1p1'],
        cmcc_cm: ['r1i1p1'],
        canesm2: ['r3i1p1', 'r4i1p1', 'r2i1p1', 'r5i1p1', 'r1i1p1'],
        ipsl_cm5b_lr: ['r1i1p1'],
        ipsl_cm5a_mr: ['r2i1p1', 'r3i1p1', 'r1i1p1'],
        access1_3: ['r2i1p1', 'r3i1p1', 'r1i1p1'],
        cmcc_cesm: ['r1i1p1'],
        noresm1_m: ['r2i1p1', 'r3i1p1', 'r1i1p1'],
        miroc4h: ['r2i1p1', 'r3i1p1', 'r1i1p1'],
        csiro_mk3_6_0: ['r3i1p1', 'r4i1p1', 'r6i1p1', 'r8i1p1', 'r7i1p1', 'r9i1p1', 'r2i1p1', 'r5i1p1', 'r1i1p1', 'r10i1p1'],
        giss_e2_h_cc: ['r1i1p1'],
        gfdl_cm3: ['r3i1p1', 'r4i1p1', 'r2i1p1', 'r5i1p1', 'r1i1p1'],
        fio_esm: ['r2i1p1', 'r3i1p1', 'r1i1p1'],
        cesm1_fastchem: ['r2i1p1', 'r3i1p1', 'r1i1p1'],
        mri_cgcm3: ['r3i1p1', 'r4i1p2', 'r2i1p1', 'r5i1p2', 'r1i1p1'],
        miroc_esm: ['r2i1p1', 'r3i1p1', 'r1i1p1'],
        gfdl_cm2p1: ['r3i1p1', 'r4i1p1','r6i1p1', 'r8i1p1', 'r7i1p1', 'r9i1p1', 'r2i1p1', 'r5i1p1', 'r1i1p1', 'r10i1p1'],
        miroc_esm_chem: ['r1i1p1'],
        hadgem2_ao: ['r1i1p1'],
        cnrm_cm5: ['r3i1p1', 'r4i1p1', 'r6i1p1', 'r8i1p1', 'r7i1p1', 'r9i1p1', 'r2i1p1', 'r5i1p1', 'r1i1p1', 'r10i1p1'],
        gfdl_esm2g: ['r1i1p1'],
        mri_esm1: ['r1i1p1'],
        mpi_esm_p: ['r2i1p1', 'r1i1p1']
    },

};
