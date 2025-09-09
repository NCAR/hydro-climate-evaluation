export const settings = {
  lat: 38,
  lon: -37,
  zoom: 1.5,
  climateSignal: false,
  dif: false,
  observation: true,
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

  obs_lev1_title: "Dataset",
  obs_lev1: {
      'cru': "CRU",
      'era_5': "ERA-5",
      'udel': "UDel",
  },

  obs_lev2_title: "Region",
  obs_lev2: {
    'global': 'Global',
  },
  obs_lev2_full: {
    'global': 'Global',
    'midwest': 'Midwest',
    'northeast':'Northeast',
    'northwest':'Northwest',
    'southeast':'Southeast',
    'southwest':'Southwest',
    'northerngreatplains':'Northern Great Plains',
    'southerngreatplains':'Southern Great Plains',
  },

  obs_lev1_title_tmp: "Region",
  obs_lev1_tmp: {
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

  obs_eras_test: {1850_2100: '1850_2100'},
  obs_eras: '1850_2100',

  past_eras: {
      '1850_2005': '1850_2005'
  },
  future_eras: {
  },

  downscaling_title: "CMIP",
  downscaling_past: {
      cmip5:'CMIP5',
      cmip6:'CMIP6',
  },
  downscaling_future: {
      cmip5:'CMIP5',
      cmip6:'CMIP6',
  },

  model: {
    cmip5: {"access1_0": "access1_0", "access1_3": "access1_3", "bnu_esm": "bnu_esm",
    "cancm4": "cancm4", "canesm2": "canesm2", "ccsm4": "ccsm4", "cesm1_bgc": "cesm1_bgc",
    "cesm1_cam5": "cesm1_cam5", "cesm1_cam5_1_fv2": "cesm1_cam5_1_fv2", "cesm1_fastchem": "cesm1_fastchem",
    "cesm1_waccm": "cesm1_waccm", "cmcc_cesm": "cmcc_cesm", "cmcc_cm": "cmcc_cm",
    "cmcc_cms": "cmcc_cms", "cnrm_cm5": "cnrm_cm5", "cnrm_cm5_2": "cnrm_cm5_2", "csiro_mk3_6_0": "csiro_mk3_6_0",
    "csiro_mk3l_1_2": "csiro_mk3l_1_2", "ec_earth": "ec_earth", "fgoals_g2": "fgoals_g2",
    "fgoals_s2": "fgoals_s2", "fio_esm": "fio_esm", "gfdl_cm2p1": "gfdl_cm2p1", "gfdl_cm3": "gfdl_cm3",
    "gfdl_esm2g": "gfdl_esm2g", "gfdl_esm2m": "gfdl_esm2m", "giss_e2_h": "giss_e2_h",
    "giss_e2_h_cc": "giss_e2_h_cc", "giss_e2_r": "giss_e2_r", "giss_e2_r_cc": "giss_e2_r_cc",
    "hadcm3": "hadcm3", "hadgem2_ao": "hadgem2_ao", "hadgem2_cc": "hadgem2_cc", "hadgem2_es": "hadgem2_es",
    "ipsl_cm5a_lr": "ipsl_cm5a_lr", "ipsl_cm5a_mr": "ipsl_cm5a_mr", "ipsl_cm5b_lr": "ipsl_cm5b_lr",
    "miroc4h": "miroc4h", "miroc5": "miroc5", "miroc_esm": "miroc_esm", "miroc_esm_chem": "miroc_esm_chem",
    "mpi_esm_lr": "mpi_esm_lr", "mpi_esm_mr": "mpi_esm_mr", "mpi_esm_p": "mpi_esm_p",
    "mri_cgcm3": "mri_cgcm3", "mri_esm1": "mri_esm1", "noresm1_m": "noresm1_m"},
    cmip6: {"access_cm2": "access_cm2", "access_esm1_5": "access_esm1_5", "awi_cm_1_1_mr": "awi_cm_1_1_mr",
    "awi_esm_1_1_lr": "awi_esm_1_1_lr", "bcc_csm2_mr": "bcc_csm2_mr", "bcc_esm1": "bcc_esm1",
    "cams_csm1_0": "cams_csm1_0", "canesm5": "canesm5", "canesm5_1": "canesm5_1",
    "canesm5_canoe": "canesm5_canoe", "cas_esm2_0": "cas_esm2_0", "cesm2": "cesm2",
    "cesm2_fv2": "cesm2_fv2", "cesm2_waccm": "cesm2_waccm", "cesm2_waccm_fv2": "cesm2_waccm_fv2",
    "ciesm": "ciesm", "cmcc_cm2_hr4": "cmcc_cm2_hr4", "cmcc_cm2_sr5": "cmcc_cm2_sr5",
    "cmcc_esm2": "cmcc_esm2", "cnrm_cm6_1": "cnrm_cm6_1", "cnrm_cm6_1_hr": "cnrm_cm6_1_hr",
    "cnrm_esm2_1": "cnrm_esm2_1", "e3sm_1_0": "e3sm_1_0", "e3sm_1_1": "e3sm_1_1",
    "e3sm_1_1_eca": "e3sm_1_1_eca", "e3sm_2_0": "e3sm_2_0", "ec_earth3": "ec_earth3",
    "ec_earth3_aerchem": "ec_earth3_aerchem", "ec_earth3_cc": "ec_earth3_cc", "ec_earth3_veg": "ec_earth3_veg",
    "ec_earth3_veg_lr": "ec_earth3_veg_lr", "fgoals_f3_l": "fgoals_f3_l", "fgoals_g3": "fgoals_g3",
    "fio_esm_2_0": "fio_esm_2_0", "gfdl_cm4": "gfdl_cm4", "gfdl_esm4": "gfdl_esm4",
    "giss_e2_1_g": "giss_e2_1_g", "giss_e2_1_g_cc": "giss_e2_1_g_cc", "giss_e2_1_h": "giss_e2_1_h",
    "giss_e2_2_g": "giss_e2_2_g", "giss_e2_2_h": "giss_e2_2_h", "giss_e3_g": "giss_e3_g",
    "hadgem3_gc31_ll": "hadgem3_gc31_ll", "hadgem3_gc31_mm": "hadgem3_gc31_mm", "iitm_esm": "iitm_esm",
    "inm_cm4_8": "inm_cm4_8", "inm_cm5_0": "inm_cm5_0", "ipsl_cm5a2_inca": "ipsl_cm5a2_inca",
    "ipsl_cm6a_lr": "ipsl_cm6a_lr", "ipsl_cm6a_lr_inca": "ipsl_cm6a_lr_inca", "kace_1_0_g": "kace_1_0_g",
    "kiost_esm": "kiost_esm", "mcm_ua_1_0": "mcm_ua_1_0", "miroc6": "miroc6", "miroc_es2l": "miroc_es2l",
    "mpi_esm1_2_hr": "mpi_esm1_2_hr", "mpi_esm1_2_lr": "mpi_esm1_2_lr", "mpi_esm_1_2_ham": "mpi_esm_1_2_ham",
    "mri_esm2_0": "mri_esm2_0", "nesm3": "nesm3", "noresm2_lm": "noresm2_lm", "noresm2_mm": "noresm2_mm",
    "sam0_unicon": "sam0_unicon", "taiesm1": "taiesm1", "ukesm1_0_ll": "ukesm1_0_ll",
    "ukesm1_1_ll": "ukesm1_1_ll"},

  },


    show_ensemble: true,
    ensemble: {
      cmip5: {
        "access1_0": ["r1i1p1", "r2i1p1", "r3i1p1"], "access1_3": ["r1i1p1",
      "r2i1p1", "r3i1p1"], "bnu_esm": ["r1i1p1"], "cancm4": ["r10i1p1", "r1i1p1",
      "r2i1p1", "r3i1p1", "r4i1p1", "r5i1p1", "r6i1p1", "r7i1p1", "r8i1p1", "r9i1p1"],
    "canesm2": ["r1i1p1", "r2i1p1", "r3i1p1", "r4i1p1", "r5i1p1"], "ccsm4": ["r1i1p1",
      "r1i2p1", "r1i2p2", "r2i1p1", "r3i1p1", "r4i1p1", "r5i1p1", "r6i1p1"], "cesm1_bgc": [
              "r1i1p1"], "cesm1_cam5": ["r1i1p1", "r2i1p1", "r3i1p1"], "cesm1_cam5_1_fv2": [
      "r1i1p1", "r2i1p1", "r3i1p1", "r4i1p1"], "cesm1_fastchem": ["r1i1p1", "r2i1p1",
      "r3i1p1"], "cesm1_waccm": ["r1i1p1", "r2i1p1", "r3i1p1", "r4i1p1", "r5i1p1",
      "r6i1p1", "r7i1p1"], "cmcc_cesm": ["r1i1p1"], "cmcc_cm": ["r1i1p1"], "cmcc_cms": [
      "r1i1p1"], "cnrm_cm5": ["r10i1p1", "r1i1p1", "r2i1p1", "r3i1p1", "r4i1p1", "r5i1p1",
      "r6i1p1", "r7i1p1", "r8i1p1", "r9i1p1"], "cnrm_cm5_2": ["r1i1p1"], "csiro_mk3_6_0": [
      "r10i1p1", "r1i1p1", "r2i1p1", "r3i1p1", "r4i1p1", "r5i1p1", "r6i1p1", "r7i1p1",
      "r8i1p1", "r9i1p1"], "csiro_mk3l_1_2": ["r1i2p1", "r2i2p1", "r3i2p1"], "ec_earth": [
      "r12i1p1", "r2i1p1", "r6i1p1", "r8i1p1", "r9i1p1"], "fgoals_g2": ["r1i1p1",
      "r2i1p1", "r3i1p1", "r4i1p1", "r5i1p1"], "fgoals_s2": ["r2i1p1", "r3i1p1"],
    "fio_esm": ["r1i1p1", "r2i1p1", "r3i1p1"], "gfdl_cm2p1": ["r10i1p1", "r1i1p1",
      "r2i1p1", "r3i1p1", "r4i1p1", "r5i1p1", "r6i1p1", "r7i1p1", "r8i1p1", "r9i1p1"],
    "gfdl_cm3": ["r1i1p1", "r2i1p1", "r3i1p1", "r4i1p1", "r5i1p1"], "gfdl_esm2g": [
      "r1i1p1"], "gfdl_esm2m": ["r1i1p1"], "giss_e2_h": ["r1i1p1", "r1i1p2", "r1i1p3",
      "r2i1p1", "r2i1p2", "r2i1p3", "r3i1p1", "r3i1p2", "r3i1p3", "r4i1p1", "r4i1p2",
      "r4i1p3", "r5i1p1", "r5i1p2", "r5i1p3", "r6i1p2"], "giss_e2_h_cc": ["r1i1p1"],
    "giss_e2_r": ["r1i1p1", "r1i1p121", "r1i1p122", "r1i1p123", "r1i1p124", "r1i1p125",
      "r1i1p126", "r1i1p127", "r1i1p128", "r1i1p2", "r1i1p3", "r2i1p1", "r2i1p2",
      "r2i1p3", "r3i1p1", "r3i1p2", "r3i1p3", "r4i1p1", "r4i1p2", "r4i1p3", "r5i1p1",
      "r5i1p2", "r5i1p3", "r6i1p1", "r6i1p2", "r6i1p3"], "giss_e2_r_cc": ["r1i1p1"],
    "hadcm3": ["r10i1p1", "r1i1p1", "r2i1p1", "r3i1p1", "r4i1p1", "r5i1p1", "r6i1p1",
      "r7i1p1", "r8i1p1", "r9i1p1"], "hadgem2_ao": ["r1i1p1"], "hadgem2_cc": ["r1i1p1",
      "r2i1p1", "r3i1p1"], "hadgem2_es": ["r1i1p1", "r2i1p1", "r3i1p1", "r4i1p1",
      "r5i1p1"], "ipsl_cm5a_lr": ["r1i1p1", "r2i1p1", "r3i1p1", "r4i1p1", "r5i1p1",
      "r6i1p1"], "ipsl_cm5a_mr": ["r1i1p1", "r2i1p1", "r3i1p1"], "ipsl_cm5b_lr": [
      "r1i1p1"], "miroc4h": ["r1i1p1", "r2i1p1", "r3i1p1"], "miroc5": ["r1i1p1", "r2i1p1",
      "r3i1p1", "r4i1p1", "r5i1p1"], "miroc_esm": ["r1i1p1", "r2i1p1", "r3i1p1"],
    "miroc_esm_chem": ["r1i1p1"], "mpi_esm_lr": ["r1i1p1", "r2i1p1", "r3i1p1"], "mpi_esm_mr": [
      "r1i1p1", "r2i1p1", "r3i1p1"], "mpi_esm_p": ["r1i1p1", "r2i1p1"], "mri_cgcm3": [
      "r1i1p1", "r2i1p1", "r3i1p1", "r4i1p2", "r5i1p2"], "mri_esm1": ["r1i1p1"], "noresm1_m": [
      "r1i1p1", "r2i1p1", "r3i1p1"]},
    cmip6: {
      "access_cm2": ["r10i1p1f1", "r1i1p1f1", "r2i1p1f1", "r3i1p1f1", "r4i1p1f1",
      "r5i1p1f1", "r6i1p1f1", "r7i1p1f1", "r8i1p1f1", "r9i1p1f1"], "access_esm1_5": [
              "r10i1p1f1", "r11i1p1f1", "r12i1p1f1", "r13i1p1f1", "r14i1p1f1", "r15i1p1f1",
      "r16i1p1f1", "r17i1p1f1", "r18i1p1f1", "r19i1p1f1", "r1i1p1f1", "r20i1p1f1",
      "r21i1p1f1", "r22i1p1f1", "r23i1p1f1", "r24i1p1f1", "r25i1p1f1", "r26i1p1f1",
      "r27i1p1f1", "r28i1p1f1", "r29i1p1f1", "r2i1p1f1", "r30i1p1f1", "r31i1p1f1",
      "r32i1p1f1", "r33i1p1f1", "r34i1p1f1", "r35i1p1f1", "r36i1p1f1", "r37i1p1f1",
      "r38i1p1f1", "r39i1p1f1", "r3i1p1f1", "r40i1p1f1", "r4i1p1f1", "r5i1p1f1", "r6i1p1f1",
      "r7i1p1f1", "r8i1p1f1", "r9i1p1f1"], "awi_cm_1_1_mr": ["r1i1p1f1", "r2i1p1f1",
      "r3i1p1f1", "r4i1p1f1", "r5i1p1f1"], "awi_esm_1_1_lr": ["r1i1p1f1"], "bcc_csm2_mr": [
      "r1i1p1f1", "r2i1p1f1", "r3i1p1f1"], "bcc_esm1": ["r1i1p1f1", "r2i1p1f1", "r3i1p1f1"],
    "cams_csm1_0": ["r1i1p1f1", "r1i1p1f2", "r2i1p1f1"], "canesm5": ["r10i1p1f1",
      "r10i1p2f1", "r11i1p1f1", "r11i1p2f1", "r12i1p1f1", "r12i1p2f1", "r13i1p1f1",
      "r13i1p2f1", "r14i1p1f1", "r14i1p2f1", "r15i1p1f1", "r15i1p2f1", "r16i1p1f1",
      "r16i1p2f1", "r17i1p1f1", "r17i1p2f1", "r18i1p1f1", "r18i1p2f1", "r19i1p1f1",
      "r19i1p2f1", "r1i1p1f1", "r1i1p2f1", "r20i1p1f1", "r20i1p2f1", "r21i1p1f1",
      "r21i1p2f1", "r22i1p1f1", "r22i1p2f1", "r23i1p1f1", "r23i1p2f1", "r24i1p1f1",
      "r24i1p2f1", "r25i1p1f1", "r25i1p2f1", "r26i1p2f1", "r27i1p2f1", "r28i1p2f1",
      "r29i1p2f1", "r2i1p1f1", "r2i1p2f1", "r30i1p2f1", "r31i1p2f1", "r32i1p2f1",
      "r33i1p2f1", "r34i1p2f1", "r35i1p2f1", "r36i1p2f1", "r37i1p2f1", "r38i1p2f1",
      "r39i1p2f1", "r3i1p1f1", "r3i1p2f1", "r40i1p2f1", "r4i1p1f1", "r4i1p2f1", "r5i1p1f1",
      "r5i1p2f1", "r6i1p1f1", "r6i1p2f1", "r7i1p1f1", "r7i1p2f1", "r8i1p1f1", "r8i1p2f1",
      "r9i1p1f1", "r9i1p2f1"], "canesm5_1": ["r10i1p1f1", "r10i1p2f1", "r11i1p1f1",
      "r11i1p2f1", "r12i1p1f1", "r12i1p2f1", "r13i1p1f1", "r13i1p2f1", "r14i1p1f1",
      "r14i1p2f1", "r15i1p1f1", "r15i1p2f1", "r16i1p1f1", "r16i1p2f1", "r17i1p1f1",
      "r17i1p2f1", "r18i1p1f1", "r18i1p2f1", "r19i1p1f1", "r19i1p2f1", "r1i1p1f1",
      "r1i1p2f1", "r20i1p1f1", "r20i1p2f1", "r21i1p2f1", "r22i1p1f1", "r22i1p2f1",
      "r23i1p2f1", "r24i1p1f1", "r24i1p2f1", "r25i1p1f1", "r25i1p2f1", "r26i1p1f1",
      "r27i1p1f1", "r28i1p1f1", "r29i1p1f1", "r2i1p1f1", "r2i1p2f1", "r30i1p1f1",
      "r31i1p1f1", "r32i1p1f1", "r33i1p1f1", "r34i1p1f1", "r35i1p1f1", "r36i1p1f1",
      "r37i1p1f1", "r38i1p1f1", "r39i1p1f1", "r3i1p1f1", "r3i1p2f1", "r41i1p1f1",
      "r42i1p1f1", "r43i1p1f1", "r44i1p1f1", "r45i1p1f1", "r46i1p1f1", "r47i1p1f1",
      "r48i1p1f1", "r49i1p1f1", "r4i1p1f1", "r4i1p2f1", "r50i1p1f1", "r5i1p1f1", "r5i1p2f1",
      "r6i1p1f1", "r6i1p2f1", "r7i1p1f1", "r7i1p2f1", "r8i1p1f1", "r8i1p2f1", "r9i1p1f1",
      "r9i1p2f1"], "canesm5_canoe": ["r1i1p2f1", "r2i1p2f1", "r3i1p2f1"], "cas_esm2_0": [
      "r1i1p1f1", "r2i1p1f1", "r3i1p1f1", "r4i1p1f1"], "cesm2": ["r10i1p1f1", "r11i1p1f1",
      "r1i1p1f1", "r2i1p1f1", "r3i1p1f1", "r4i1p1f1", "r5i1p1f1", "r6i1p1f1", "r7i1p1f1",
      "r8i1p1f1", "r9i1p1f1"], "cesm2_fv2": ["r1i1p1f1", "r2i1p1f1", "r3i1p1f1"],
    "cesm2_waccm": ["r1i1p1f1", "r2i1p1f1", "r3i1p1f1"], "cesm2_waccm_fv2": ["r1i1p1f1",
      "r2i1p1f1", "r3i1p1f1"], "ciesm": ["r1i1p1f1", "r2i1p1f1", "r3i1p1f1"], "cmcc_cm2_hr4": [
              "r1i1p1f1"], "cmcc_cm2_sr5": ["r10i1p2f1", "r11i1p2f1", "r1i1p1f1", "r2i1p2f1",
      "r3i1p2f1", "r4i1p2f1", "r5i1p2f1", "r6i1p2f1", "r7i1p2f1", "r8i1p2f1", "r9i1p2f1"],
    "cmcc_esm2": ["r1i1p1f1"], "cnrm_cm6_1": ["r10i1p1f2", "r11i1p1f2", "r12i1p1f2",
      "r13i1p1f2", "r14i1p1f2", "r15i1p1f2", "r16i1p1f2", "r17i1p1f2", "r18i1p1f2",
      "r19i1p1f2", "r1i1p1f2", "r20i1p1f2", "r21i1p1f2", "r22i1p1f2", "r24i1p1f2",
      "r25i1p1f2", "r26i1p1f2", "r27i1p1f2", "r28i1p1f2", "r29i1p1f2", "r2i1p1f2",
      "r30i1p1f2", "r3i1p1f2", "r4i1p1f2", "r5i1p1f2", "r6i1p1f2", "r7i1p1f2", "r8i1p1f2",
      "r9i1p1f2"], "cnrm_cm6_1_hr": ["r1i1p1f2"], "cnrm_esm2_1": ["r10i1p1f2", "r11i1p1f2",
      "r1i1p1f2", "r2i1p1f2", "r3i1p1f2", "r4i1p1f2", "r5i1p1f2", "r6i1p1f2", "r7i1p1f2",
      "r8i1p1f2", "r9i1p1f2"], "e3sm_1_0": ["r1i1p1f1", "r2i1p1f1", "r3i1p1f1", "r4i1p1f1",
      "r5i1p1f1"], "e3sm_1_1": ["r1i1p1f1"], "e3sm_1_1_eca": ["r1i1p1f1"], "e3sm_2_0": [
      "r1i1p1f1", "r2i1p1f1", "r3i1p1f1", "r4i1p1f1", "r5i1p1f1"], "ec_earth3": [
      "r10i1p1f1", "r11i1p1f1", "r12i1p1f1", "r13i1p1f1", "r14i1p1f1", "r15i1p1f1",
      "r16i1p1f1", "r17i1p1f1", "r18i1p1f1", "r19i1p1f1", "r1i1p1f1", "r21i1p1f1",
      "r22i1p1f1", "r23i1p1f1", "r24i1p1f1", "r25i1p1f1", "r2i1p1f1", "r3i1p1f1",
      "r4i1p1f1", "r6i1p1f1", "r7i1p1f1", "r9i1p1f1"], "ec_earth3_aerchem": ["r1i1p1f1",
      "r3i1p1f1", "r4i1p1f1"], "ec_earth3_cc": ["r10i1p1f1", "r11i1p1f1", "r12i1p1f1",
      "r13i1p1f1", "r1i1p1f1", "r4i1p1f1", "r6i1p1f1", "r7i1p1f1", "r8i1p1f1", "r9i1p1f1"],
    "ec_earth3_veg": ["r10i1p1f1", "r12i1p1f1", "r14i1p1f1", "r1i1p1f1", "r2i1p1f1",
      "r3i1p1f1", "r4i1p1f1", "r6i1p1f1"], "ec_earth3_veg_lr": ["r1i1p1f1", "r2i1p1f1",
      "r3i1p1f1"], "fgoals_f3_l": ["r1i1p1f1", "r2i1p1f1", "r3i1p1f1"], "fgoals_g3": [
      "r1i1p1f1", "r2i1p1f1", "r3i1p1f1", "r4i1p1f1", "r5i1p1f1", "r6i1p1f1"], "fio_esm_2_0": [
      "r1i1p1f1", "r2i1p1f1", "r3i1p1f1"], "gfdl_cm4": ["r1i1p1f1"], "gfdl_esm4": [
      "r1i1p1f1", "r2i1p1f1", "r3i1p1f1"], "giss_e2_1_g": ["r101i1p1f1", "r102i1p1f1",
      "r10i1p1f1", "r10i1p1f2", "r10i1p3f1", "r10i1p5f1", "r11i1p1f2", "r1i1p1f1",
      "r1i1p1f2", "r1i1p1f3", "r1i1p3f1", "r1i1p5f1", "r2i1p1f1", "r2i1p1f2", "r2i1p1f3",
      "r2i1p3f1", "r2i1p5f1", "r3i1p1f1", "r3i1p1f2", "r3i1p1f3", "r3i1p3f1", "r3i1p5f1",
      "r4i1p1f1", "r4i1p1f2", "r4i1p1f3", "r4i1p3f1", "r4i1p5f1", "r5i1p1f1", "r5i1p1f2",
      "r5i1p1f3", "r5i1p3f1", "r6i1p1f1", "r6i1p1f2", "r6i1p3f1", "r6i1p5f1", "r7i1p1f1",
      "r7i1p1f2", "r7i1p3f1", "r7i1p5f1", "r8i1p1f1", "r8i1p1f2", "r8i1p3f1", "r8i1p5f1",
      "r9i1p1f1", "r9i1p1f2", "r9i1p3f1", "r9i1p5f1"], "giss_e2_1_g_cc": ["r1i1p1f1"],
    "giss_e2_1_h": ["r10i1p1f1", "r1i1p1f1", "r1i1p1f2", "r1i1p3f1", "r1i1p5f1", "r2i1p1f1",
      "r2i1p1f2", "r2i1p3f1", "r2i1p5f1", "r3i1p1f1", "r3i1p1f2", "r3i1p3f1", "r3i1p5f1",
      "r4i1p1f1", "r4i1p1f2", "r4i1p3f1", "r4i1p5f1", "r5i1p1f1", "r5i1p1f2", "r5i1p3f1",
      "r5i1p5f1", "r6i1p1f1", "r7i1p1f1", "r8i1p1f1", "r9i1p1f1"], "giss_e2_2_g": [
      "r1i1p1f1", "r1i1p3f1", "r2i1p1f1", "r2i1p3f1", "r3i1p1f1", "r3i1p3f1", "r4i1p1f1",
      "r4i1p3f1", "r5i1p1f1", "r5i1p3f1", "r6i1p1f1"], "giss_e2_2_h": ["r1i1p1f1",
      "r2i1p1f1", "r3i1p1f1", "r4i1p1f1", "r5i1p1f1"], "giss_e3_g": ["r1i1p1f1"],
    "hadgem3_gc31_ll": ["r1i1p1f3", "r2i1p1f3", "r3i1p1f3", "r4i1p1f3", "r5i1p1f3"],
    "hadgem3_gc31_mm": ["r1i1p1f3", "r2i1p1f3", "r3i1p1f3", "r4i1p1f3"], "iitm_esm": [
            "r1i1p1f1"], "inm_cm4_8": ["r1i1p1f1"], "inm_cm5_0": ["r10i1p1f1", "r1i1p1f1",
      "r2i1p1f1", "r3i1p1f1", "r4i1p1f1", "r5i1p1f1", "r6i1p1f1", "r7i1p1f1", "r8i1p1f1",
      "r9i1p1f1"], "ipsl_cm5a2_inca": ["r1i1p1f1"], "ipsl_cm6a_lr": ["r10i1p1f1",
      "r11i1p1f1", "r12i1p1f1", "r13i1p1f1", "r14i1p1f1", "r15i1p1f1", "r16i1p1f1",
      "r17i1p1f1", "r18i1p1f1", "r19i1p1f1", "r1i1p1f1", "r20i1p1f1", "r21i1p1f1",
      "r22i1p1f1", "r23i1p1f1", "r24i1p1f1", "r25i1p1f1", "r26i1p1f1", "r27i1p1f1",
      "r28i1p1f1", "r29i1p1f1", "r2i1p1f1", "r30i1p1f1", "r31i1p1f1", "r32i1p1f1",
      "r33i1p1f1", "r3i1p1f1", "r4i1p1f1", "r5i1p1f1", "r6i1p1f1", "r7i1p1f1", "r8i1p1f1",
      "r9i1p1f1"], "ipsl_cm6a_lr_inca": ["r1i1p1f1"], "kace_1_0_g": ["r1i1p1f1", "r2i1p1f1",
      "r3i1p1f1"], "kiost_esm": ["r1i1p1f1"], "mcm_ua_1_0": ["r1i1p1f1", "r1i1p1f2"],
    "miroc6": ["r10i1p1f1", "r11i1p1f1", "r12i1p1f1", "r13i1p1f1", "r14i1p1f1", "r15i1p1f1",
      "r16i1p1f1", "r17i1p1f1", "r18i1p1f1", "r19i1p1f1", "r1i1p1f1", "r20i1p1f1",
      "r21i1p1f1", "r22i1p1f1", "r23i1p1f1", "r24i1p1f1", "r25i1p1f1", "r26i1p1f1",
      "r27i1p1f1", "r28i1p1f1", "r29i1p1f1", "r2i1p1f1", "r30i1p1f1", "r31i1p1f1",
      "r32i1p1f1", "r33i1p1f1", "r34i1p1f1", "r35i1p1f1", "r36i1p1f1", "r37i1p1f1",
      "r38i1p1f1", "r39i1p1f1", "r3i1p1f1", "r40i1p1f1", "r41i1p1f1", "r42i1p1f1",
      "r43i1p1f1", "r44i1p1f1", "r45i1p1f1", "r46i1p1f1", "r47i1p1f1", "r48i1p1f1",
      "r49i1p1f1", "r4i1p1f1", "r50i1p1f1", "r5i1p1f1", "r6i1p1f1", "r7i1p1f1", "r8i1p1f1",
      "r9i1p1f1"], "miroc_es2l": ["r10i1p1f2", "r11i1p1f2", "r12i1p1f2", "r13i1p1f2",
      "r14i1p1f2", "r15i1p1f2", "r16i1p1f2", "r17i1p1f2", "r18i1p1f2", "r19i1p1f2",
      "r1i1000p1f2", "r1i1p1f2", "r20i1p1f2", "r21i1p1f2", "r22i1p1f2", "r23i1p1f2",
      "r24i1p1f2", "r25i1p1f2", "r26i1p1f2", "r27i1p1f2", "r28i1p1f2", "r29i1p1f2",
      "r2i1p1f2", "r30i1p1f2", "r3i1p1f2", "r4i1p1f2", "r5i1p1f2", "r6i1p1f2", "r7i1p1f2",
      "r8i1p1f2", "r9i1p1f2"], "mpi_esm1_2_hr": ["r10i1p1f1", "r1i1p1f1", "r2i1p1f1",
      "r3i1p1f1", "r4i1p1f1", "r5i1p1f1", "r6i1p1f1", "r7i1p1f1", "r8i1p1f1", "r9i1p1f1"],
    "mpi_esm1_2_lr": ["r10i1p1f1", "r11i1p1f1", "r12i1p1f1", "r13i1p1f1", "r14i1p1f1",
      "r15i1p1f1", "r16i1p1f1", "r17i1p1f1", "r18i1p1f1", "r19i1p1f1", "r1i1p1f1",
      "r1i2000p1f1", "r20i1p1f1", "r21i1p1f1", "r22i1p1f1", "r23i1p1f1", "r24i1p1f1",
      "r25i1p1f1", "r26i1p1f1", "r27i1p1f1", "r28i1p1f1", "r29i1p1f1", "r2i1p1f1",
      "r30i1p1f1", "r3i1p1f1", "r4i1p1f1", "r5i1p1f1", "r6i1p1f1", "r7i1p1f1", "r8i1p1f1",
      "r9i1p1f1"], "mpi_esm_1_2_ham": ["r1i1p1f1", "r2i1p1f1", "r3i1p1f1"], "mri_esm2_0": [
      "r10i1p1f1", "r1i1000p1f1", "r1i1p1f1", "r1i2p1f1", "r2i1p1f1", "r3i1p1f1",
      "r4i1p1f1", "r5i1p1f1", "r6i1p1f1", "r7i1p1f1", "r8i1p1f1", "r9i1p1f1"], "nesm3": [
      "r1i1p1f1", "r2i1p1f1", "r3i1p1f1", "r4i1p1f1", "r5i1p1f1"], "noresm2_lm": [
      "r1i1p1f1", "r2i1p1f1", "r3i1p1f1"], "noresm2_mm": ["r1i1p1f1", "r2i1p1f1",
      "r3i1p1f1"], "sam0_unicon": ["r1i1p1f1"], "taiesm1": ["r1i1p1f1", "r2i1p1f1"],
    "ukesm1_0_ll": ["r10i1p1f2", "r11i1p1f2", "r12i1p1f2", "r13i1p1f2", "r14i1p1f2",
      "r15i1p1f2", "r16i1p1f2", "r17i1p1f2", "r18i1p1f2", "r19i1p1f2", "r1i1p1f2",
      "r2i1p1f2", "r3i1p1f2", "r4i1p1f2", "r5i1p1f3", "r6i1p1f3", "r7i1p1f3", "r8i1p1f2",
      "r9i1p1f2"], "ukesm1_1_ll": ["r1i1p1f2"]}
    },

};
