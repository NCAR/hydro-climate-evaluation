import { useState, Fragment } from 'react';
import { Box, Flex } from 'theme-ui';
import { useCallback, useEffect } from 'react';
import { Button, Filter, Table, Tag, Slider, Badge, Toggle, Select, Link } from '@carbonplan/components';
import { ArrowThin, RotatingArrow } from '@carbonplan/icons';
import Colorbar from './colorbar';
// import { colormaps } from '@carbonplan/colormaps';
import { colormaps } from '../colormaps/src';
import { getData } from './getData';

const sx = {
  label: {
    fontFamily: 'mono',
    letterSpacing: 'mono',
    textTransform: 'uppercase',
    fontSize: [1, 1, 1, 2],
    mt: [3],
  },
};

const readmeUrl =
  'https://github.com/NCAR/hydro-climate-evaluation?readme-ov-file#hydro-climate-evaluation-map';
const precipDif = 1.0;
const tempDif = 0.1;

const Scale_Values = {
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
};


const Clim_Ranges = {
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
};

const precip_colormap = 'blueprecip';
const temp_colormap = 'BuYlRd';
const dif_temp_colormap = 'difbluered';
const dif_precip_colormap = 'difbrowngreen';
const Default_Colormaps = {
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
};


const ParameterControls = ({ getters, setters, bucket, fname }) => {
  const { display, reload, debug, opacity, clim, month,
          band, colormapName, colormap,
          downscaling, model, metric, yearRange, mapSource, chartSource,
          downscalingDif, modelDif, yearRangeDif, obs, obsDif,
          mapSourceDif, chartSourceDif, scaleDif,
          chartHeight, computeChoice,
          showClimateChange, showRegionPlot, bucketRes,
          showStates, showRivers, showHuc2, sideBySide
        } = getters;
  const {
    setDisplay,
    setReload,
    setDebug,
    setOpacity,
    setClim,
    setMonth,
    setMetric,
    setBand,
    setColormapName,
    setDownscaling,
    setModel,
    setYearRange,
    setMapSource,
    setChartSource,
    setDownscalingDif,
    setModelDif,
    setYearRangeDif,
    setObs,
    setObsDif,
    setMapSourceDif,
    setChartSourceDif,
    setScaleDif,
    setChartHeight,
    setChartData,
    setComputeChoice,
    setShowClimateChange,
    setShowRegionPlot,
    setBucketRes,
    setStates,
    setRivers,
    setHuc2,
    setSideBySide
  } = setters;

  // 'https://hydro.rap.ucar.edu/hydro-climate-eval/data/',
  // 'https://hydro.rap.ucar.edu/hydro-climate-eval/data/'});

  // const [filterValues, setFilterValues] = useState({'Ave.': true, 'Dif.': false});

  const [chartToggle, setChartToggle] = useState(false);

  const [units, setUnits] = useState('°C');

  const [baseDir, setBaseDir] = useState('map/');


  const [metricMethod, setMetricMethod] = useState({'RMSE': true,
                                                    'Std. Dev.': false,
                                                    'Correlation': false});
  const [metricMethod1, setMetricMethod1] = useState({'RMSE': true,
                                                      'Std. Dev.': false});
  const [metricMethod2, setMetricMethod2] = useState({'Correlation': false});



  // const [computeChoice, setComputeChoice] = useState({
  //     'Ave.': true,
  //     'Dif.': false,
  //     'Climate Signal': false,
  // });

  // const handleComputeChoice = (e) => {
  //   setComputeChoice(e);
  //   console.log("HANDLE COMPUTE CHOICE e =",e);
  //   if (['Climate Signal']) {
  //     setBaseDir('climateSignal/');
  //   } else {
  //     setBaseDir('map/');
  //   }
  // };

  const getRCPString = (value) => {
      if (value === "8.5") {
        return "rcp85";
      } else if (value === "4.5") {
        return "rcp45";
      }
    return null;
  };

  const getRCPKey = (obj) => {
    for (const [key, value] of Object.entries(obj)) {
      if (value === true) {
        return getRCPString(key);
      }
    }
    return null;
  };

  const [rcpValues, setRCPValues] = useState({'4.5': true,
                                              '8.5': false
                                             });

  const [computeClimateSignal, setComputeClimateSignal] =
          useState({'COMPUTE': false});

  const [numClimateSignalSets, setNumClimateSignalSets] = useState(2);

  const flipReload = () => {
    if (reload) {
      setReload(false);
    } else {
      setReload(true);
    }
  };

  const setMetricLabel = () => {
    let link = 'https://github.com/NCAR/hydro-climate-evaluation?readme-ov-file#metrics';
    let label = 'n34pr';
    let description  = ['further description'];
    if (metric === 'n34pr') {
      label = 'n34pr';
      description =
            ['Niño3.4 precipitation',
             'teleconnection patterns',
             'spatial correlation'];
    } else if (metric === 'n34t') {
      label = 'n34t';
      description =
            ['Niño3.4 temperature',
             'teleconnection patterns',
             'spatial correlation'];
    }  else if (metric === 'ptrend') {
      label = 'ptrend';
      description =
            ['Precipitation',
             'trend'];
    }  else if (metric === 'ttrend') {
      label = 'ttrend';
      description =
            ['Temperature',
             'trend'];
    }  else if (metric === 'pr90') {
      label = 'pr90';
      description =
            ['Precipitation',
             'extremes',
             '90th percentile'];
    }  else if (metric === 'pr99') {
      label = 'pr99';
      description =
            ['Precipitation',
             'extremes',
             '99th percentile'];
    }  else if (metric === 't90') {
      label = 't90';
      description =
            ['Temperature',
             'extremes',
             '90th percentile'];
    }  else if (metric === 't99') {
      label = 't99';
      description =
            ['Temperature',
             'extremes',
             '99th percentile'];
    }  else if (metric === 'djf_t') {
      label = 'djf_t';
      description =
            ['Seasonal mean',
             'temperature',
             'Dec/Jan/Feb'];
    }  else if (metric === 'djf_p') {
      label = 'djf_p';
      description =
            ['Seasonal mean',
             'precipitation',
             'Dec/Jan/Feb'];
    }  else if (metric === 'mam_t') {
      label = 'mam_t';
      description =
            ['Seasonal mean',
             'temperature',
             'Mar/Apr/May'];
    }  else if (metric === 'mam_p') {
      label = 'mam_p';
      description =
            ['Seasonal mean',
             'precipitation',
             'Mar/Apr/May'];
    }  else if (metric === 'jja_t') {
      label = 'jja_t';
      description =
            ['Seasonal mean',
             'temperature',
             'Jun/Jul/Aug'];
    }  else if (metric === 'jja_p') {
      label = 'jja_p';
      description =
            ['Seasonal mean',
             'precipitation',
             'Jun/Jul/Aug'];
    }  else if (metric === 'son_t') {
      label = 'son_t';
      description =
            ['Seasonal mean',
             'temperature',
             'Sep/Oct/Nov'];
    }  else if (metric === 'son_p') {
      label = 'son_p';
      description =
            ['Seasonal mean',
             'precipitation',
             'Sep/Oct/Nov'];

    }  else if (metric === 'ann_p') {
      label = 'ann_p';
      description =
            ['Mean annual',
             'total',
             'precipitation'];
    }  else if (metric === 'ann_t') {
      label = 'ann_t';
      description =
            ['Annual mean',
             'temperature',
             ''];
    }  else if (metric === 'ann_snow') {
      label = 'ann_snow';
      description =
            ['Annual mean',
             'total',
             'snow'];
    }  else if (metric === 'freezethaw') {
      label = 'fzth';
      description =
            ['Annual mean',
             'freeze-thaw',
             'cycle'];
     } else {
       label = 'label undefined';
       description = ['description undefined','',''];
     }

    return(
      <Box sx={{ ...sx.label, mt: [4] }}>
        <Link href={link}
         target="_blank"
         rel="noopener noreferrer">
          {label}
        </Link>:<br />
        {description.map((line, index) => (
           <Fragment key={index}> {line} <br /> </Fragment>))
        }
      </Box>
    );
  };


  const MetricBox = () => {
    if (metricMethod['RMSE']) {
      return(
      <>
      <Box sx={{ ...sx.label, mt: [4] }}>2. Select Metrics</Box>
      <Filter
        values={RMSEMetrics}
        setValues={handleRMSEMetricsChange}
      />
      <Filter values={RMSEMetrics1} setValues={setRMSEMetrics1} multiSelect={true} />
      <Filter values={RMSEMetrics2} setValues={setRMSEMetrics2} multiSelect={true} />
      </>
      );
      }
    else if (metricMethod['Std. Dev.']) {
      return(
      <>
      <Box sx={{ ...sx.label, mt: [4] }}>2. Select Metrics</Box>
      <Filter
        values={stdDevMetrics}
        setValues={handleStdDevMetricsChange}
      />
      <Filter values={stdDevMetrics1} setValues={setStdDevMetrics1} multiSelect={true} />
      <Filter values={stdDevMetrics2} setValues={setStdDevMetrics2} multiSelect={true} />
      </>
      );
      }
    else if (metricMethod['Correlation']) {
      return(
      <>
      <Box sx={{ ...sx.label, mt: [4] }}>2. Select Metrics</Box>
      <Filter
        values={metrics}
        setValues={setMetrics}
        setValues={handleClimateMetricsChange}
      />
      <Filter values={metrics1} setValues={setMetrics1} multiSelect={true} />
      <Filter values={metrics2} setValues={setMetrics2} multiSelect={true} />
      <Filter values={metrics3} setValues={setMetrics3} multiSelect={true} />
      <Filter values={metrics4} setValues={setMetrics4} multiSelect={true} />
      </>
      );
    }
   };


  // NOTE: Chart sources have not been created with yearRange yet
  // TODO: fixed Clim_Ranges[band]
  // const handleFilterAndSetClimColormapName = (e) => {
  //   const filterVals = e;
  //   if (filterVals['Ave.']) {
  //     setComputeChoice({'Ave.': true, 'Dif.': false});
  //     setClim([Clim_Ranges[metric].min, Clim_Ranges[metric].max]);
  //     setColormapName(Default_Colormaps[metric]);
  //   } else if (filterVals['Dif.']) {
  //     setFilterValues({'Ave.': false, 'Dif.': true});
  //     setScaleDif(Scale_Values['dif_'+metric]);
  //     setClim([Clim_Ranges['dif_'+metric].min, Clim_Ranges['dif_'+metric].max]);
  //     setColormapName(Default_Colormaps['dif_'+metric]);
  //   }
  // };

  const handleBandChange = useCallback((e) => {
    const band = e.target.value;
    setBand(band);
    // handleFilterAndSetClimColormapName(filterValues);
    // setMapSource([bucket+'map/'+downscaling+'/'+model+'/'+yearRange+'/'+fname]);
    // // setChartSource(bucket+'/chart/'+downscaling+'/'+model+'/'+yearRange+'/'+band);
    // setChartSource(bucket+'/chart/'+downscaling+'/'+model+'/'+band);
    // getData({chartSource}, setChartData);
  });

  const handleYearChange = useCallback((e) => {
    let yearRange = e.target.value;
    setYearRange(yearRange);
    if (yearRange === '2070_2100') {
      yearRange = getRCPKey(rcpValues);
    }

    setMapSource([bucket+baseDir+downscaling+'/'+model+'/'+yearRange+'/'+fname]);
    // setChartSource(bucket+'/chart/'+downscaling+'/'+model+'/'+yearRange+'/'+band);
    // setChartSource(bucket+'/chart/'+downscaling+'/'+model+'/'+band);
  });

  const handleYearDifChange = useCallback((e) => {
    const yearRangeDif = e.target.value;
    setYearRangeDif(yearRangeDif);
    console.log("yearRange =", e.target.value);
    setMapSourceDif([bucket+baseDir+downscalingDif+'/'+modelDif+'/'+yearRangeDif+'/'+fname]);
    // setChartSourceDif(bucket+'/chart/'+downscalingDif+'/'+modelDif+'/'+yearRangeDif+'/'+band);
  });

  const handleDownscalingChange = useCallback((e) => {
    const downscaling = e.target.value;
    setDownscaling(downscaling);
    let safemodel = model;
    if (downscaling === 'maca') {
      if (model === 'access1_3') {
        setModel('noresm1_m');
        safemodel = 'noresm1_m';
      }
    }
    if (downscaling === 'nasa_nex') {
      if (model === 'access1_3' || model === 'ccsm4') {
        setModel('noresm1_m');
        safemodel = 'noresm1_m';
      }
    }

    let timeRange = yearRange
    if (computeChoice['Climate Signal']) {
      timeRange = getRCPKey(rcpValues);
    }
    if (yearRange === '2070_2100') {
      timeRange = getRCPKey(rcpValues);
    }

    setMapSource([bucket+baseDir+downscaling+'/'+safemodel+'/'+timeRange+'/'+fname]);
  });

  const handleDownscalingDifChange = useCallback((e) => {
    const downscalingDif = e.target.value;
    setDownscalingDif(downscalingDif);

    let safemodel = modelDif;
    if (downscaling === 'maca') {
      if (modelDif === 'access1_3') {
        setModelDif('noresm1_m');
        safemodel = 'noresm1_m';
      }
    }
    if (downscalingDif === 'nasa_nex') {
      if (model === 'access1_3' || model === 'ccsm4') {
        setModelDif('noresm1_m');
        safemodel = 'noresm1_m';
      }
    }

    let timeRange = yearRangeDif
    if (computeChoice['Climate Signal']) {
      timeRange = getRCPKey(rcpValues);
    }
    if (yearRangeDif === '2070_2100') {
      timeRange = getRCPKey(rcpValues);
    }

    setMapSourceDif(bucket+baseDir+downscalingDif+'/'+safemodel+'/'+timeRange+'/'+fname);
  });

  const handleModelChange = useCallback((e) => {
    const model = e.target.value;
    setModel(model);
    console.log("model e =", e.target.value);
    console.log("model =", bucket+baseDir+'/'+downscaling+'/'+model+'/');

    let timeRange = yearRange
    if (computeChoice['Climate Signal']) {
      timeRange = getRCPKey(rcpValues)
    }
    if (yearRange === '2070_2100') {
      timeRange = getRCPKey(rcpValues);
    }


    setMapSource([bucket+baseDir+downscaling+'/'+model+'/'+timeRange+'/'+fname]);
    // setChartSource(bucket+'/chart/'+downscaling+'/'+model+'/'+yearRange+'/'+band);
    // setChartSource(bucket+'/chart/'+downscaling+'/'+model+'/'+band);
    // getData({chartSource}, setChartData);
  });

  const handleMetricsChange = useCallback((e) => {
    const metric = e.target.value;
    setMetric(metric);
    console.log("metric e =", e.target.value);
    // console.log("model =", bucket+'/'+downscaling+'/'+model+'/');
    // setMapSource(bucket+'map/'+downscaling+'/'+model+'/'+yearRange+'/'+fname);
    // // setChartSource(bucket+'/chart/'+downscaling+'/'+model+'/'+yearRange+'/'+band);
    // setChartSource(bucket+'/chart/'+downscaling+'/'+model+'/'+band);
    // getData({chartSource}, setChartData);
    if (metric === 'n34pr') {
      setBand('n34p');
      setUnits('correlation');
    } else if (metric === 'n34t') {
      setBand('n34t');
      setUnits('correlation');
    }  else if (metric === 'ptrend') {
      setBand('ptre');
      setUnits('mm per year');
    }  else if (metric === 'ttrend') {
      setBand('ttre');
      setUnits('°C per year');
    }  else if (metric === 'pr90') {
      setBand('pr90');
      setUnits('mm');
    }  else if (metric === 'pr99') {
      setBand('pr99');
      setUnits('mm');
    }  else if (metric === 't90') {
      setBand('t90_');
      setUnits('°C');
    }  else if (metric === 't99') {
      setBand('t99_');
      setUnits('°C');
    }  else if (metric === 'djf_t') {
      setBand('djft');
      setUnits('°C');
    }  else if (metric === 'djf_p') {
      setBand('djfp');
      setUnits('mm');
    }  else if (metric === 'mam_t') {
      setBand('mamt');
      setUnits('°C');
    }  else if (metric === 'mam_p') {
      setBand('mamp');
      setUnits('mm');
    }  else if (metric === 'jja_t') {
      setBand('jjat');
      setUnits('°C');
    }  else if (metric === 'jja_p') {
      setBand('jjap');
      setUnits('mm');
    }  else if (metric === 'son_t') {
      setBand('sont');
      setUnits('°C');
    }  else if (metric === 'son_p') {
      setBand('sonp');
      setUnits('mm');
    }  else if (metric === 'ann_t') {
      setBand('annt');
      setUnits('°C');
    }  else if (metric === 'ann_p') {
      setBand('annp');
      setUnits('mm');
    }  else if (metric === 'ann_snow') {
      setBand('anns');
      setUnits('mm');
    }  else if (metric === 'freezethaw') {
      setBand('fzth');
      setUnits('num. of days');
    }


    if (computeChoice['Dif.'] || computeChoice['Climate Signal']) {
      setClim([Clim_Ranges['dif_'+metric].min, Clim_Ranges['dif_'+metric].max]);
      setColormapName(Default_Colormaps['dif_'+metric]);
      setScaleDif(Scale_Values['dif_'+metric]);
    } else if (computeChoice['Ave.']) {
      setClim([Clim_Ranges[metric].min, Clim_Ranges[metric].max]);
      setColormapName(Default_Colormaps[metric]);
    }
  });

  const maxStdDevNumMetrics = 8;
  const maxNumMetrics = 16;
  const [allMetrics, setAllMetrics] =
    useState({
      tavg: false,
      n34t: false,
      ttrend: false,
      t90: false,
      t99: false,
      djf_t: false,
      mam_t: false,
      jja_t: false,
      son_t: false,
      prec: false,
      n34pr: false,
      ptrend: false,
      pr90: false,
      pr99: false,
      djf_p: false,
      mam_p: false,
      jja_p: false,
      son_p: false,});


  const [numMetrics, setNumMetrics] = useState(0);
  const [topCombination, setTopCombination] = useState("Select Metrics");
  const [topDownscaling, setTopDownscaling] = useState("None");
  const [topModel, setTopModel] = useState("None");
  const [topCombination2, setTopCombination2] = useState("None");
  const [topDownscaling2, setTopDownscaling2] = useState("None");
  const [topModel2, setTopModel2] = useState("None");

  const [aveChoice, setAveChoice] = useState({ 'Modeling': true, 'Observation': false, });

  const [metricPerformance, setMetricPerformance] = //useState(true);
          useState({ "Metric Performance": false });
  const [methodAndModel, setMethodAndModel] = //useState(false);
          useState({ "Method & Model": true });

  const [differenceChoice, setDifferenceChoice] =
          useState({ "Minuend": true, "Subtrahend": false });
  const [difObsOrDataChoice1, setObsOrDataChoice1] =
          useState({ "Model": true, "Observation": false });
  const [difObsOrDataChoice2, setObsOrDataChoice2] =
          useState({ "Model": true, "Observation": false });
          // useState({ "Model": false, "Observation": true });


  const [metrics, setMetrics] = useState({ all: false, clear: false, clearall: false});

  const [metrics1, setMetrics1] = useState({ n34t: false,
                                             n34pr: false,
                                             ttrend: false,
                                             ptrend: false,});
  const [metrics2, setMetrics2] = useState({ t90: false,
                                             t99: false,
                                             pr90: false,
                                             pr99: false,});
  const [metrics3, setMetrics3] = useState({ djf_t: false,
                                             mam_t: false,
                                             jja_t: false,
                                             son_t: false,});
  const [metrics4, setMetrics4] = useState({ djf_p: false,
                                             mam_p: false,
                                             jja_p: false,
                                             son_p: false,});

  const [stdDevMetrics, setStdDevMetrics] = useState({ all: false, clear: false,
                                                       clearall: false});
  const [stdDevMetrics1, setStdDevMetrics1] = useState({ djf_t: false,
                                                         mam_t: false,
                                                         jja_t: false,
                                                         son_t: false,});
  const [stdDevMetrics2, setStdDevMetrics2] = useState({ djf_p: false,
                                                         mam_p: false,
                                                         jja_p: false,
                                                         son_p: false,});

  const [RMSEMetrics, setRMSEMetrics] = useState({ all: false, clear: false,
                                                   clearall: false});
  const [RMSEMetrics1, setRMSEMetrics1] = useState({ n34t: false,
                                                     ttrend: false,
                                                     t90: false,
                                                     t99: false,});
  const [RMSEMetrics2, setRMSEMetrics2] = useState({ n34pr: false,
                                                     ptrend: false,
                                                     pr90: false,
                                                     pr99: false,});


  const countNumMetrics = () => {
    let count = 0;
    if (metricMethod['RMSE']) {
      for (const key in RMSEMetrics1) { RMSEMetrics1[key] === true && count++; }
      for (const key in RMSEMetrics2) { RMSEMetrics2[key] === true && count++; }
    }
    if (metricMethod['Std. Dev.']) {
      for (const key in stdDevMetrics1) { stdDevMetrics1[key] === true && count++; }
      for (const key in stdDevMetrics2) { stdDevMetrics2[key] === true && count++; }
    }
    if (metricMethod['Correlation']) {
      for (const key in metrics1) { metrics1[key] === true && count++; }
      for (const key in metrics2) { metrics2[key] === true && count++; }
      for (const key in metrics3) { metrics3[key] === true && count++; }
      for (const key in metrics4) { metrics4[key] === true && count++; }
    }
    return count;
  };

  const diffInMetrics = (array1, array2) => {
    for (const key in array1) {
      if (array1[key] != array2[key]) {
        if (array2[key] == true) {
          return 1;
        } else {
          return -1;
        }
      }
    }
  };

  // 13 = combinations
  const combinations =
        [
          "ICAR with ACCESS1-3",
          "ICAR with CanESM2",
          "ICAR with CCSM4",
          "ICAR with MIROC5",
          "ICAR with NorESM1-M",
          "GARD_r2 with ACCESS1-3",
          "GARD_r2 with CanESM2",
          "GARD_r2 with CCSM4",
          "GARD_r2 with MIROC5",
          "GARD_r2 with NorESM1-M",
          "GARD_r3 with ACCESS1-3",
          "GARD_r3 with CanESM2",
          "GARD_r3 with CCSM4",
          "GARD_r3 with MIROC5",
          "GARD_r3 with NorESM1-M",
          "LOCA_8th with ACCESS1-3",
          "LOCA_8th with CanESM2",
          "LOCA_8th with CCSM4",
          "LOCA_8th with MIROC5",
          "LOCA_8th with NorESM1-M",
          "MACA with CanESM2",
          "MACA with CCSM4",
          "MACA with MIROC5",
          "MACA with NorESM1-M",
          "NASA-NEX with CanESM2",
          "NASA-NEX with MIROC5",
          "NASA-NEX with NorESM1-M",
        ];

  const combinations_downscaling =
        [
          "icar",
          "icar",
          "icar",
          "icar",
          "icar",
          "gard_r2",
          "gard_r2",
          "gard_r2",
          "gard_r2",
          "gard_r2",
          "gard_r3",
          "gard_r3",
          "gard_r3",
          "gard_r3",
          "gard_r3",
          "loca_8th",
          "loca_8th",
          "loca_8th",
          "loca_8th",
          "loca_8th",
          "maca",
          "maca",
          "maca",
          "maca",
          "nasa_nex",
          "nasa_nex",
          "nasa_nex",
        ];

  const combinations_model =
        [
          "access1_3",
          "canesm2",
          "ccsm4",
          "miroc5",
          "noresm1_m",
          "access1_3",
          "canesm2",
          "ccsm4",
          "miroc5",
          "noresm1_m",
          "access1_3",
          "canesm2",
          "ccsm4",
          "miroc5",
          "noresm1_m",
          "access1_3",
          "canesm2",
          "ccsm4",
          "miroc5",
          "noresm1_m",
          "canesm2",
          "ccsm4",
          "miroc5",
          "noresm1_m",
          "canesm2",
          "miroc5",
          "noresm1_m",
        ];
  // metric scores: future, read in from dataset
  // const jja_t_std_score = [13, 2, 1, 22, 5, 14, 9, 4, 25, 11, 15, 8, 3, 24,
  //                          10, 23, 18, 16, 26, 20, 19, 17, 27, 21, 6, 12, 7];
  // const jja_t_r_score = [16, 12, 13, 21, 19, 11, 24, 22, 17, 18, 10, 23,
  //                        20, 15, 14, 9, 5, 4, 8, 6, 1, 2, 7, 3, 26, 25, 27];
  // gard between 4 and 15, 10 gar models
  const gadd = 999;
  const djf_t_std_score = [8, 9, 1, 15, 14,
                           7+gadd, 5+gadd, 3+gadd, 11+gadd, 13+gadd, 6+gadd, 4+gadd, 2+gadd, 10+gadd, 12+gadd,
                           18, 23, 16, 26, 24, 22, 17, 27, 25, 19, 21, 20];
  const mam_t_std_score = [7, 4, 1, 27, 17,
                           9+gadd, 6+gadd, 3+gadd, 16+gadd, 19+gadd, 8+gadd, 5+gadd, 2+gadd, 15+gadd, 18+gadd,
                           20, 24, 12, 21, 26, 23, 14, 22, 25, 11, 10, 13];
  const jja_t_std_score = [13, 2, 1, 22, 5,
                           14+gadd, 9+gadd, 4+gadd, 25+gadd, 11+gadd, 15+gadd, 8+gadd, 3+gadd, 24+gadd, 10+gadd,
                           23, 18, 16, 26, 20, 19, 17, 27, 21, 6, 12, 7];
  const son_t_std_score = [5, 3, 1, 17, 2,
                           21+gadd, 12+gadd, 8+gadd, 26+gadd, 10+gadd, 23+gadd, 18+gadd, 9+gadd, 27+gadd, 14+gadd,
                           19, 22, 13, 25, 16, 20, 15, 24, 11, 6, 7, 4];
  const djf_p_std_score = [2, 1, 3, 7, 4,
                           15+gadd, 9+gadd, 11+gadd, 13+gadd, 10+gadd, 21+gadd, 12+gadd, 18+gadd, 16+gadd, 14+gadd,
                           23, 27, 25, 26, 19, 24, 20, 22, 17, 8,  6, 5];
  const mam_p_std_score = [23, 24, 26, 25, 27,
                           1+gadd, 7+gadd, 14+gadd, 3+gadd, 15+gadd, 9+gadd, 17+gadd, 19+gadd, 5+gadd, 22+gadd,
                           13, 21, 8, 11, 18, 20, 10, 6, 16, 12,  2, 4];
  const jja_p_std_score = [25, 24, 26, 23, 27,
                           4+gadd, 2+gadd, 8+gadd, 1+gadd, 17+gadd, 20+gadd, 14+gadd, 21+gadd, 18+gadd, 22+gadd,
                           3, 7, 5, 6, 11, 12, 10, 9, 13, 16, 15, 19];
  const son_p_std_score = [1, 3, 2, 4, 8,
                           7+gadd, 16+gadd, 9+gadd, 15+gadd, 12+gadd, 6+gadd, 17+gadd, 11+gadd, 18+gadd, 13+gadd,
                           19, 23, 27, 25, 22, 20, 26, 24, 21, 5, 14, 10];

  const n34t_r_score = [1, 5, 8, 6, 7,
                        4+gadd, 16+gadd, 21+gadd, 23+gadd, 24+gadd, 3+gadd, 13+gadd, 20+gadd, 22+gadd, 25+gadd,
                        2, 12, 15, 27, 19, 10, 17, 14, 9, 11, 26, 18];
  const ttrend_r_score = [27, 8, 10, 19, 5,
                          15+gadd, 14+gadd, 2+gadd, 18+gadd, 1+gadd, 16+gadd, 12+gadd, 4+gadd, 21+gadd, 3+gadd,
                          26, 25, 6, 23, 13, 20, 9, 24, 7, 17, 22, 11];
  const t90_r_score = [19, 13, 12, 24, 15,
                       11+gadd, 23+gadd, 21+gadd, 16+gadd, 18+gadd, 10+gadd, 22+gadd, 20+gadd, 14+gadd, 17+gadd,
                       9, 6, 4, 8, 5, 2, 3, 7, 1, 26, 25, 27];
  const t99_r_score = [22, 19, 12, 24, 23,
                       11+gadd, 21+gadd, 18+gadd, 15+gadd, 16+gadd, 10+gadd, 20+gadd, 17+gadd, 13+gadd, 14+gadd,
                       7, 9, 8, 3, 4, 5, 6, 2, 1, 26, 25, 27];
  const djf_t_r_score = [16, 20, 24, 17, 23,
                         11+gadd, 15+gadd, 22+gadd, 13+gadd, 19+gadd, 10+gadd, 14+gadd, 21+gadd, 12+gadd, 18+gadd,
                         1, 9, 4, 7, 5, 8, 3, 6, 2, 25, 26, 27];
  const mam_t_r_score = [24, 21, 16, 22, 23,
                         20+gadd, 14+gadd, 11+gadd, 15+gadd, 18+gadd, 19+gadd, 12+gadd, 10+gadd, 13+gadd, 17+gadd,
                         8, 4, 3, 6, 9, 2, 1, 5, 7, 25, 26, 27];
  const jja_t_r_score = [16, 12, 13, 21, 19,
                         11+gadd, 24+gadd, 22+gadd, 17+gadd, 18+gadd, 10+gadd, 23+gadd, 20+gadd, 15+gadd, 14+gadd,
                         9, 5, 4, 8, 6, 1, 2, 7, 3, 26, 25, 27];
  const son_t_r_score = [10, 15, 16, 18, 23,
                         12+gadd, 17+gadd, 21+gadd, 14+gadd, 24+gadd, 11+gadd, 19+gadd, 20+gadd, 13+gadd, 22+gadd,
                         8, 5, 6, 9, 4, 2, 3, 7, 1, 26, 25, 27];
  const n34pr_r_score = [14, 21, 15, 16, 6,
                         19+gadd, 23+gadd, 18+gadd, 20+gadd, 17+gadd, 25+gadd, 27+gadd, 26+gadd, 24+gadd, 22+gadd,
                         12, 13, 8, 3, 5, 9, 11, 2, 1, 10, 4, 7];
  const ptrend_r_score = [10, 9, 14, 25, 7,
                          20+gadd, 17+gadd, 13+gadd, 23+gadd, 11+gadd, 18+gadd, 16+gadd, 8+gadd, 22+gadd, 19+gadd,
                          21, 6, 4, 24, 5, 15, 3, 27, 1, 12, 26, 2];
  const pr90_r_score = [13, 10, 12, 14, 11,
                        21+gadd, 15+gadd, 20+gadd, 22+gadd, 17+gadd, 24+gadd, 16+gadd, 19+gadd, 23+gadd, 18+gadd,
                        3, 4, 5, 2, 1, 6, 7, 9, 8, 25, 27, 26];
  const pr99_r_score = [21, 10, 17, 24, 13,
                        19+gadd, 14+gadd, 15+gadd, 23+gadd, 11+gadd, 20+gadd, 18+gadd, 12+gadd, 22+gadd, 16+gadd,
                        5, 3, 2, 4, 1, 8, 6, 9, 7, 27, 25, 26];
  const djf_p_r_score = [25, 21, 26, 24, 27,
                         15+gadd, 16+gadd, 18+gadd, 17+gadd, 19+gadd, 12+gadd, 10+gadd, 11+gadd, 13+gadd, 14+gadd,
                         5, 2, 1, 4, 3, 6, 7, 8, 9, 20, 22, 23];
  const mam_p_r_score = [26, 22, 21, 25, 27,
                         20+gadd, 14+gadd, 10+gadd, 15+gadd, 13+gadd, 18+gadd, 12+gadd, 11+gadd, 17+gadd, 16+gadd,
                         5, 4, 2, 3, 1, 8, 7, 9, 6, 23, 24, 19];
  const jja_p_r_score = [24, 26, 25, 27, 23,
                         18+gadd, 22+gadd, 20+gadd, 19+gadd, 21+gadd, 13+gadd, 17+gadd, 15+gadd, 16+gadd, 14+gadd,
                         2, 6, 4, 3, 1, 9, 7, 8, 5, 11, 12, 10];
  const son_p_r_score = [24, 25, 26, 23, 27,
                         17+gadd, 21+gadd, 18+gadd, 15+gadd, 12+gadd, 16+gadd, 14+gadd, 10+gadd, 13+gadd, 11+gadd,
                         4, 1, 3, 5, 2, 8, 7, 9, 6, 20, 19, 22];

  const n34t_rmse_score = [1, 8, 26, 5, 15,
                           7+gadd, 4+gadd, 25+gadd, 10+gadd, 19+gadd, 6+gadd, 3+gadd, 24+gadd, 12+gadd, 18+gadd,
                           2, 13, 23, 11, 16, 22, 27, 14, 20, 21, 9, 17];
  const ttrend_rmse_score = [8, 15, 13, 26, 17,
                             6+gadd, 18+gadd, 9+gadd, 24+gadd, 12+gadd, 5+gadd, 19+gadd, 10+gadd, 23+gadd, 11+gadd,
                             16, 14, 7, 22, 3, 20, 21, 27, 2, 4, 25, 1];
  const t90_rmse_score = [25, 26, 27, 20, 22,
                          11+gadd, 16+gadd, 19+gadd, 12+gadd, 15+gadd, 10+gadd, 17+gadd, 18+gadd, 13+gadd, 14+gadd,
                          1, 7, 4, 2, 5, 8, 6, 9, 3, 23, 21, 24];
  const t99_rmse_score = [22, 23, 26, 21, 20,
                          11+gadd, 16+gadd, 19+gadd, 12+gadd, 15+gadd, 10+gadd, 17+gadd, 18+gadd, 13+gadd, 14+gadd,
                          5, 8, 4, 2, 1, 6, 9, 7, 3, 25, 24, 27];
  const n34pr_rmse_score = [4, 25, 23, 14, 5,
                            17+gadd, 22+gadd, 20+gadd, 15+gadd, 12+gadd, 24+gadd, 26+gadd, 27+gadd, 19+gadd, 21+gadd,
                            3, 8, 16, 11, 9, 1, 18, 7, 6, 2, 10, 13];
  const ptrend_rmse_score = [8, 12, 17, 27, 7,
                             16+gadd, 24+gadd, 6+gadd, 26+gadd, 5+gadd, 13+gadd, 22+gadd, 11+gadd, 25+gadd, 10+gadd,
                             15, 9, 19, 14, 4, 20, 23, 21, 2, 3, 18, 1];
  const pr90_rmse_score = [13, 10, 11, 14, 12,
                           21+gadd, 16+gadd, 20+gadd, 22+gadd, 19+gadd, 24+gadd, 15+gadd, 17+gadd, 23+gadd, 18+gadd,
                           5, 1, 3, 4, 2, 6, 7, 9, 8, 27, 26, 25];
  const pr99_rmse_score = [14, 2, 13, 15, 12,
                           8+gadd, 4+gadd, 5+gadd, 11+gadd, 1+gadd, 9+gadd, 7+gadd, 3+gadd, 10+gadd, 6+gadd,
                           25, 21, 22, 24, 23, 19, 17, 20, 18, 27, 16, 26];


  function addScores(a,b){
        return a.map((e,i) => e + b[i]);
  };

  useEffect(() => {
    let currentScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (metricMethod['Correlation']) {
    if (metrics1['n34t']) {
      currentScore = addScores(currentScore, n34t_r_score);
    }
    if (metrics1['n34pr']) {
      currentScore = addScores(currentScore, n34pr_r_score);
    }
    if (metrics1['ttrend']) {
      currentScore = addScores(currentScore, ttrend_r_score);
    }
    if (metrics1['ptrend']) {
      currentScore = addScores(currentScore, ptrend_r_score);
    }
    if (metrics2['t90']) {
      currentScore = addScores(currentScore, t90_r_score);
    }
    if (metrics2['t99']) {
      currentScore = addScores(currentScore, t99_r_score);
    }
    if (metrics2['pr90']) {
      currentScore = addScores(currentScore, pr90_r_score);
    }
    if (metrics2['pr99']) {
      currentScore = addScores(currentScore, pr99_r_score);
    }
    if (metrics3['djf_t']) {
      currentScore = addScores(currentScore, djf_t_r_score);
    }
    if (metrics3['mam_t']) {
      currentScore = addScores(currentScore, mam_t_r_score);
    }
    if (metrics3['jja_t']) {
      currentScore = addScores(currentScore, jja_t_r_score);
    }
    if (metrics3['son_t']) {
      currentScore = addScores(currentScore, son_t_r_score);
    }
    if (metrics4['djf_p']) {
      currentScore = addScores(currentScore, djf_p_r_score);
    }
    if (metrics4['mam_p']) {
      currentScore = addScores(currentScore, mam_p_r_score);
    }
    if (metrics4['jja_p']) {
      currentScore = addScores(currentScore, jja_p_r_score);
    }
    if (metrics4['son_p']) {
      currentScore = addScores(currentScore, son_p_r_score);
    }
    }

    if (metricMethod['Std. Dev.']) {
    if (stdDevMetrics1['djf_t']) {
      currentScore = addScores(currentScore, djf_t_std_score);
    }
    if (stdDevMetrics1['mam_t']) {
      currentScore = addScores(currentScore, mam_t_std_score);
    }
    if (stdDevMetrics1['jja_t']) {
      currentScore = addScores(currentScore, jja_t_std_score);
    }
    if (stdDevMetrics1['son_t']) {
      currentScore = addScores(currentScore, son_t_std_score);
    }
    if (stdDevMetrics2['djf_p']) {
      currentScore = addScores(currentScore, djf_p_std_score);
    }
    if (stdDevMetrics2['mam_p']) {
      currentScore = addScores(currentScore, mam_p_std_score);
    }
    if (stdDevMetrics2['jja_p']) {
      currentScore = addScores(currentScore, jja_p_std_score);
    }
    if (stdDevMetrics2['son_p']) {
      currentScore = addScores(currentScore, son_p_std_score);
    }
    }

    if (metricMethod['RMSE']) {
    if (RMSEMetrics1['n34t']) {
      currentScore = addScores(currentScore, n34t_rmse_score);
    }
    if (RMSEMetrics1['ttrend']) {
      currentScore = addScores(currentScore, ttrend_rmse_score);
    }
    if (RMSEMetrics1['t90']) {
      currentScore = addScores(currentScore, t90_rmse_score);
    }
    if (RMSEMetrics1['t99']) {
      currentScore = addScores(currentScore, t99_rmse_score);
    }
    if (RMSEMetrics2['n34pr']) {
      currentScore = addScores(currentScore, n34pr_rmse_score);
    }
    if (RMSEMetrics2['ptrend']) {
      currentScore = addScores(currentScore, ptrend_rmse_score);
    }
    if (RMSEMetrics2['pr90']) {
      currentScore = addScores(currentScore, pr90_rmse_score);
    }
    if (RMSEMetrics2['pr99']) {
      currentScore = addScores(currentScore, pr99_rmse_score);
    }
    }



    if (numMetrics === 0) {
      setTopCombination("Select Metrics");
      setTopDownscaling("None");
      setTopModel("None");
      setTopCombination2("None");
      setTopDownscaling2("None");
      setTopModel2("None");
    } else {
      let combo = [];
      let downscaling = [];
      let model = [];

      for (let n = 0; n < numClimateSignalSets; n++) {
        let i = currentScore.indexOf(Math.min(...currentScore));
        console.log(n, "SCORE =", currentScore, "and i", i);
        console.log(n, "best combination =", combinations[i]);
        // if this is true it is a GARD model, with no future runs and data yet
        // if (i > 4 && i < 15) {
        //   console.log("best combo a GARD model, removing");
        //   currentScore[i] = 9999;
        //   continue;
        // }
        combo.push(combinations[i]);
        downscaling.push(combinations_downscaling[i]);
        model.push(combinations_model[i]);
        currentScore[i] = 9999;
      }
      setTopCombination(combo);
      setTopDownscaling(downscaling);
      setTopModel(model);
    }
  }, [numMetrics,
      setMetrics1, setMetrics2, setMetrics3, setMetrics4,
      stdDevMetrics1, stdDevMetrics2,
      RMSEMetrics1, RMSEMetrics2,
      numClimateSignalSets,
      metricMethod,
     ]);


  useEffect(() => {
      if (difObsOrDataChoice1['Model']) {
          const url = [bucket+baseDir+downscaling+'/'+model+'/'+yearRange+'/'+fname];
          setMapSource(url);
      } else {
          const url=[bucket+'/obs/'+obs+'/'+yearRange+'/'+fname];
          setMapSource(url);
      }
  }, [difObsOrDataChoice1]);

  // difference options
  useEffect(() => {
      if (difObsOrDataChoice2['Model']) {
          const url=[bucket+baseDir+downscalingDif+'/'+modelDif+'/'+yearRangeDif+'/'+fname];
          console.log("dif model url =", url);
          setMapSourceDif(url);
      } else {
          const url=[bucket+'/obs/'+obsDif+'/'+yearRangeDif+'/'+fname];
          console.log("dif obs  url =", url);
          setMapSourceDif(url);
      }
  }, [difObsOrDataChoice2]);

  const handleRCPValues = useCallback((e) => {
    const choice = e;
    console.log("RCP VALUES e =", e);
    setRCPValues(choice);
    if (methodAndModel["Method & Model"]) {
      const rcp = getRCPKey(choice)
      let url = [bucket+baseDir+downscaling+'/'+model+'/'+rcp+'/'+fname];
      setMapSource(url);
      console.log("RCP RESET URL =", url)
    }
  });

  const [shouldUpdateMapSource, setShouldUpdateMapSource] = useState(false);

  const handleAveChange = useCallback((e) => {
    const choice =e
    console.log("AVECHOIE =", choice);
    if (choice['Modeling']) {
      // setAveChoice({ 'Modeling': true, 'Observation': false, });
      setAveChoice(choice);
      let yearRange_l = yearRange;
      if (yearRange === '2070_2100') {
        yearRange_l = getRCPKey(rcpValues);
      }
      setMapSource([bucket+baseDir+downscaling+'/'+model+'/'+yearRange_l+'/'+fname]);
    } else if (choice['Observation']) {
      setAveChoice(choice);
      // setAveChoice({ 'Modeling': false, 'Observation': true, }); //
      const obs_l = obs
      setMapSource([bucket+'/obs/'+obs_l+'/'+yearRangeDif+'/'+fname]);
    }
  });

  const handleSignalChoice = useCallback((e) => {
    const choice = e;
    console.log("metric per", metricPerformance);
    console.log("method and model", methodAndModel);
    setMetricPerformance(prev =>
                         ({"Metric Performance": !prev["Metric Performance"]}));
    setMethodAndModel(prev =>
                      ({"Method & Model": !prev["Method & Model"]}));
    if (choice["Method & Model"]) {
    // if (methodAndModel["Method & Model"]) {
      const rcp = getRCPKey(rcpValues);
      let url = [bucket+baseDir+downscaling+'/'+model+'/'+rcp+'/'+fname];
      setMapSource(url);
    }

  });

  const handleNumClimateSignalSets = useCallback((e) => {
    const numSets = parseInt(e.target.value);
    setNumClimateSignalSets(numSets);
  });

  const handleClimateSignal = useCallback((e) => {
    if (numMetrics === 0) {
      return;
    }
    setComputeClimateSignal({'COMPUTE': true});
    setShowRegionPlot(false);
    setShouldUpdateMapSource(true);
  });

  useEffect(() => {
    if (!showRegionPlot && shouldUpdateMapSource) {
      console.log("ARTLESS top combination =", topCombination);
      let downscaling_l = topDownscaling[0];
      let model_l = topModel[0];
      const rcp = getRCPKey(rcpValues);
      let url = [bucket+baseDir+downscaling_l+'/'+model_l+'/'+rcp+'/'+fname];
      const numClimateSignalSets_i = parseInt(numClimateSignalSets, 10);

      setMapSource(url);
      setDownscaling(downscaling_l);
      setModel(model_l);
      setShouldUpdateMapSource(false); // Reset the flag
      // const local_filterValue = {'Ave.': false, 'Dif.': true,
      //                            'Climate Signal': false};
      // handleFilterAndSetClimColormapName(local_filterValue);

      for (let i=1; i<numClimateSignalSets_i; i++) {
        downscaling_l = topDownscaling[i];
        model_l = topModel[i];
        url = bucket+baseDir+downscaling_l+'/'+model_l+'/'+rcp+'/'+fname;
        setMapSource((prevSources) => [...prevSources, url]);;
      }
    }
  }, [showRegionPlot, shouldUpdateMapSource]);

  useEffect(() => {
    const numSelected = countNumMetrics();
    setNumMetrics(numSelected);
  }, [metrics1, metrics2, metrics3, metrics4,
      stdDevMetrics1, stdDevMetrics2,
      RMSEMetrics1, RMSEMetrics2,
      metricMethod,
      ]);

  useEffect(() => {
    if (metricMethod1['RMSE']) {
      setMetricMethod({'RMSE': true, 'Std. Dev.': false, 'Correlation': false});
      setMetricMethod2({'Correlation': false});
    }
    else if (metricMethod1['Std. Dev.']) {
      setMetricMethod({'RMSE': false, 'Std. Dev.': true, 'Correlation': false});
      setMetricMethod2({'Correlation': false});
    }
  }, [metricMethod1]);

  useEffect(() => {
    if (metricMethod2['Correlation']) {
      setMetricMethod({'RMSE': false, 'Std. Dev.': false, 'Correlation': true});
      setMetricMethod1({'RMSE': false, 'Std. Dev.': false});
    }
  }, [metricMethod2]);

  // const handleMetrics = useCallback((e) => {
  //   const choice = e;
  //   const keys = JSON.stringify(Object.keys(e));
  //   if (keys === '["n34t","n34pr","ttrend","ptrend"]') {
  //     setMetrics1(e);
  //   } else if (keys === '["t90","t99","pr90","pr99"]') {
  //     setMetrics2(e);
  //   } else if (keys === '["djf_t","mam_t","jja_t","son_t"]') {
  //     setMetrics3(e);
  //   } else if (keys === '["prec","n34pr","ptrend"]') {
  //     setMetrics4(e);
  //   } else if (keys === '["pr90","pr99","djf_p"]') {
  //     // setMetrics5(e);
  //   } else if (keys === '["mam_p","jja_p","son_p"]') {
  //     // setMetrics6(e);
  //   }
  // });

  const handleStdDevMetrics = useCallback((e) => {
    const choice = e;
    const keys = JSON.stringify(Object.keys(e));
    if (keys === '["tavg","n34t","ttrend"]') {
      setMetrics1(e);
    } else if (keys === '["t90","t99","djf_t"]') {
      setMetrics2(e);
    } else if (keys === '["mam_t","jja_t","son_t"]') {
      setMetrics3(e);
    } else if (keys === '["prec","n34pr","ptrend"]') {
      setMetrics4(e);
    } else if (keys === '["pr90","pr99","djf_p"]') {
      // setMetrics5(e);
    } else if (keys === '["mam_p","jja_p","son_p"]') {
      // setMetrics6(e);
    }
  });

  const handleRMSEMetricsChange = useCallback((e) => {
    const all = e.all;
    const clear = e.clear;
    const clearall = e.clearall;

    if (all) {
      setRMSEMetrics({all: true, clear: false, clearall: false});
      setRMSEMetrics1({n34t: true, ttrend: true, t90: true, t99: true,});
      setRMSEMetrics2({n34pr: true, ptrend: true, pr90: true, pr99: true,});
    } else if (clear) {
      setRMSEMetrics({all: false, clear: false, clearall: false});
      setRMSEMetrics1({n34t: false, ttrend: false, t90: false, t99: false,});
      setRMSEMetrics2({n34pr: false, ptrend: false, pr90: false, pr99: false,});
    } else if (clearall) {
      setRMSEMetrics({all: false, clear: false, clearall: false});
      setRMSEMetrics1({n34t: false, ttrend: false, t90: false, t99: false,});
      setRMSEMetrics2({n34pr: false, ptrend: false, pr90: false, pr99: false,});
      setStdDevMetrics({all: false, clear: false, clearall: false});
      setStdDevMetrics1({djf_t: false, mam_t: false, jja_t: false, son_t: false,});
      setStdDevMetrics2({djf_p: false, mam_p: false, jja_p: false, son_p: false,});
      setMetrics({all: false, clear: false, clearall: false});
      setMetrics1({n34t: false, n34pr: false, ttrend: false, ptrend: false,});
      setMetrics2({t90: false, t99: false, pr90: false, pr99: false,});
      setMetrics3({djf_t: false, mam_t: false, jja_t: false, son_t: false,});
      setMetrics4({djf_p: false, mam_p: false, jja_p: false, son_p: false,});
    }
  });

  const handleStdDevMetricsChange = useCallback((e) => {
    const all = e.all;
    const clear = e.clear;
    const clearall = e.clearall;

    if (all) {
      setStdDevMetrics({all: true, clear: false, clearall: false});
      setStdDevMetrics1({djf_t: true, mam_t: true, jja_t: true, son_t: true,});
      setStdDevMetrics2({djf_p: true, mam_p: true, jja_p: true, son_p: true,});
    } else if (clear) {
      setStdDevMetrics({all: false, clear: false, clearall: false});
      setStdDevMetrics1({djf_t: false, mam_t: false, jja_t: false, son_t: false,});
      setStdDevMetrics2({djf_p: false, mam_p: false, jja_p: false, son_p: false,});
    } else if (clearall) {
      setRMSEMetrics({all: false, clear: false, clearall: false});
      setRMSEMetrics1({n34t: false, ttrend: false, t90: false, t99: false,});
      setRMSEMetrics2({n34pr: false, ptrend: false, pr90: false, pr99: false,});
      setStdDevMetrics({all: false, clear: false, clearall: false});
      setStdDevMetrics1({djf_t: false, mam_t: false, jja_t: false, son_t: false,});
      setStdDevMetrics2({djf_p: false, mam_p: false, jja_p: false, son_p: false,});
      setMetrics({all: false, clear: false, clearall: false});
      setMetrics1({n34t: false, n34pr: false, ttrend: false, ptrend: false,});
      setMetrics2({t90: false, t99: false, pr90: false, pr99: false,});
      setMetrics3({djf_t: false, mam_t: false, jja_t: false, son_t: false,});
      setMetrics4({djf_p: false, mam_p: false, jja_p: false, son_p: false,});
    }
  });

  const handleClimateMetricsChange = useCallback((e) => {
    const all = e.all;
    const clear = e.clear;
    const clearall = e.clearall;

    if (all) {
      setMetrics({all: true, clear: false, clearall: false});
      setMetrics1({n34t: true, n34pr: true, ttrend: true, ptrend: true,});
      setMetrics2({t90: true, t99: true, pr90: true, pr99: true,});
      setMetrics3({djf_t: true, mam_t: true, jja_t: true, son_t: true,});
      setMetrics4({djf_p: true, mam_p: true, jja_p: true, son_p: true,});
    } else if (clear) {
      setMetrics({all: false, clear: false, clearall: false});
      setMetrics1({n34t: false, n34pr: false, ttrend: false, ptrend: false,});
      setMetrics2({t90: false, t99: false, pr90: false, pr99: false,});
      setMetrics3({djf_t: false, mam_t: false, jja_t: false, son_t: false,});
      setMetrics4({djf_p: false, mam_p: false, jja_p: false, son_p: false,});
    } else if (clearall) {
      setRMSEMetrics({all: false, clear: false, clearall: false});
      setRMSEMetrics1({n34t: false, ttrend: false, t90: false, t99: false,});
      setRMSEMetrics2({n34pr: false, ptrend: false, pr90: false, pr99: false,});
      setStdDevMetrics({all: false, clear: false, clearall: false});
      setStdDevMetrics1({djf_t: false, mam_t: false, jja_t: false, son_t: false,});
      setStdDevMetrics2({djf_p: false, mam_p: false, jja_p: false, son_p: false,});
      setMetrics({all: false, clear: false, clearall: false});
      setMetrics1({n34t: false, n34pr: false, ttrend: false, ptrend: false,});
      setMetrics2({t90: false, t99: false, pr90: false, pr99: false,});
      setMetrics3({djf_t: false, mam_t: false, jja_t: false, son_t: false,});
      setMetrics4({djf_p: false, mam_p: false, jja_p: false, son_p: false,});
    }
  });


  const handleModelDifChange = useCallback((e) => {
    const modelDif = e.target.value;
    setModelDif(modelDif);
    setMapSourceDif([bucket+baseDir+downscalingDif+'/'+modelDif+'/'+yearRangeDif+'/'+fname]);
    // setChartSourceDif(bucket+'/chart/'+downscalingDif+'/'+modelDif+'/'+yearRangeDif+'/'+band);
    // getData({chartSourceDif}, setChartDataDif);
  });


  const handleChartChange = useCallback((e) => {
    const model = e.target.value;
    setChartHeight('20%');
  });

  const RiversTag = () => {
    return(
    <Box>
    <Tag value={showRivers} onClick={() => setRivers((prev) => !prev)}>
      Rivers
    </Tag>
    </Box>
    );
  };

  const StatesTag = () => {
    return(
      // <Toggle value={showStates} onClick={() => setStates(!showStates)} />
    <Box>
    <Tag value={showStates} onClick={() => setStates((prev) => !prev)}>
      State Lines
    </Tag>
    </Box>
    );
  };

  const Huc2Tag = () => {
    return(
    <Box>
    <Tag value={showHuc2} onClick={() => setHuc2((prev) => !prev)}>
      Huc 2
    </Tag>
    </Box>
    );
  };

  const SideBySideTag = () => {
    return(
    <Box>
    <Tag value={sideBySide} onClick={() => setSideBySide((prev) => !prev)}>
      Side By Side
    </Tag>
    </Box>
    );
  };

  const README = () => {
    return (
      <Box style={{ marginTop: '8px' }}>
      <Button
        href={readmeUrl}
        target="_blank"
        rel="noopener noreferrer"
        prefix={<RotatingArrow />}
      >
        HELP
      </Button>
      </Box>
    );
  };

  const LocalColorbar = () => {
    return (
      <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Colorbar
        colormap={colormap}
        label={units}
        clim={clim}
        setClim={setClim}
        filterValues={computeChoice}
        band={band}
        scaleDif={scaleDif}
      />
      </Box>
      <Box sx={{ mt: [2], justifyContent: 'center'}}>
      drag range
      </Box>
      </>
    );
  };

  const DifYearChoices = () => {
    if (yearRange === '1980_2010') {
      setYearRangeDif('1980_2010');
      return(
        [<option value='1980_2010'>1980-2010</option>,
         <option value='2070_2100'>2006-2099</option>]
      );
    } else {
      setYearRangeDif('1980_2010');
      return(
        <option value='1980_2010'>1980-2010</option>
      );
    }
  };

  const DifDownscalingChoices = () => {
    if (yearRange === '1980_2010') {
      setDownscalingDif('icar');
      return(
        [ <option value='icar'>ICAR</option>,
          <option value='gard'>GARD</option>,
          <option value='loca'>LOCA</option>,
          <option value='bcsd'>BCSD</option>]
      );
    } else {
    if (downscaling === 'icar') {
      setDownscalingDif('icar');
      return(<option value='icar'>ICAR</option>);
    }
    else if (downscaling === 'gard') {
      setDownscalingDif('gard');
      return(<option value='gard'>GARD</option>);
    }
    else if (downscaling === 'loca') {
      setDownscalingDif('loca');
      return(<option value='loca'>LOCA</option>);
    }
    else if (downscaling === 'bcsd'){
      setDownscalingDif('bcsd');
      return(<option value='bcsd'>BCSD</option>);
    }
   }
  };

  const DifModelChoices = () => {
    if (yearRange === '1980_2010') {
      setModelDif('noresm')
      return(
        [ <option value='noresm'>NorESM</option>,
          <option value='cesm'>CESM</option>,
          <option value='gfdl'>GFDL</option>,
          <option value='miroc5'>MIROC5</option>]
      );
    } else {
    if (model === 'noresm') {
      setModelDif('noresm')
      return(<option value='noresm'>NorESM</option>);
    }
    else if (model === 'cesm') {
      setModelDif('cesm')
      return(<option value='cesm'>CESM</option>);
    }
    else if (model === 'gfdl') {
      setModelDif('gfdl')
      return(<option value='gfdl'>GFDL</option>);
    }
    else if (model === 'miroc5'){
      setModelDif('miroc5')
      return(<option value='miroc5'>MIROC5</option>);
    }
   }
  };

  const DifSourceChoices = () => {
    return (
    <>
    <Box sx={{ ...sx.label, mt: [2] }}>
      Year Range
    </Box>
    <Select
      sxSelect={{ bg: 'transparent' }}
      size='xs'
      onChange={handleYearDifChange}
      sx={{ mt: [0] }}
      value={yearRangeDif}
    >
      {/* DifYearChoices() */}
      <option value='1980_2010'>1980-2010</option>
      <option value='2070_2100'>2006-2099</option>
    </Select>

    <Box sx={{ ...sx.label, mt: [3] }}>
      Downscaling
    </Box>
    <Box sx={{ ...sx.label, mt: [0] }}>
      Method
    </Box>
    <Select
      sxSelect={{ bg: 'transparent' }}
      size='xs'
      onChange={handleDownscalingDifChange}
      sx={{ mt: [1] }}
      value={downscalingDif}
    >
      {/* DifDownscalingChoices() */}
      <option value='icar'>ICAR</option>
      <option value='gard'>GARD</option>
      <option value='loca'>LOCA</option>
      <option value='bcsd'>BCSD</option>
    </Select>
    <Box sx={{ ...sx.label, mt: [3] }}>Climate</Box>
    <Box sx={{ ...sx.label, mt: [0] }}>Model</Box>
      <Select
      sxSelect={{ bg: 'transparent' }}
      size='xs'
      onChange={handleModelDifChange}
      sx={{ mt: [1] }}
      value={modelDif}
      >
      {/* DifModelChoices() */}
        <option value='noresm'>NorESM</option>
        <option value='cesm'>CESM</option>
        <option value='gfdl'>GFDL</option>
        <option value='miroc5'>MIROC5</option>
      </Select>
    </>
    );
  };



  const handleObsChange = useCallback((e) => {
    const obs_l = e.target.value;
    setObs(obs_l);
    setMapSource([bucket+'/obs/'+obs_l+'/'+yearRangeDif+'/'+fname]);
  });
  const handleObsDifChange = useCallback((e) => {
    const obs_l = e.target.value;
    setObsDif(obs_l);
    setMapSourceDif(bucket+'/obs/'+obs_l+'/'+yearRangeDif+'/'+fname);
  });

  const ObsChoicesBox = ({onChange, value, label='Dataset'}) => {
    return (
      <>
      <Box sx={{ ...sx.label, mt: [3] }}>{label}</Box>
      <Select
        sxSelect={{ bg: 'transparent' }}
        size='xs'
        onChange={onChange}
        sx={{ mt: [1] }}
        value={value}
      >
        <option value='conus404'>Conus404</option>
        <option value='gmet'>GMET</option>
        <option value='gridmet'>gridMET</option>
        <option value='livneh'>Livneh</option>
        <option value='maurer'>Maurer</option>
        <option value='nclimgrid'>nClimGrid</option>
        <option value='nldas'>NLDAS</option>
        <option value='prism'>PRISM</option>
      </Select>
      <VariableChoiceBox />
      {setMetricLabel()}
      </>
    );
  };

  const ComputeChoiceFilter = () => {
    const handleComputeChoiceChange = (newValues) => {
      setComputeChoice(newValues);
      // handle baseDir
      let baseDir_l;
      if (newValues['Climate Signal']) {
        baseDir_l = 'climateSignal/';
      } else {
        baseDir_l = 'map/';
      }
      setBaseDir(baseDir_l);

      if (!newValues['Climate Signal']) {
        // handleFilterAndSetClimColormapName(newValues);
        // above func handled below
        let yearRange_l = yearRange;
        if (yearRange === '2070_2100') {
          yearRange_l= getRCPKey(rcpValues);
        }

        if (newValues['Ave.']) {
          setClim([Clim_Ranges[metric].min, Clim_Ranges[metric].max]);
          setColormapName(Default_Colormaps[metric]);
        }
        if (newValues['Dif.']) {
          yearRange_l = '1981_2004';
          setYearRange(yearRange_l);
          setScaleDif(Scale_Values['dif_'+metric]);
          setClim([Clim_Ranges['dif_'+metric].min, Clim_Ranges['dif_'+metric].max]);
          setColormapName(Default_Colormaps['dif_'+metric]);
        }
        setMapSource([bucket+baseDir_l+downscaling+'/'+model+'/'+yearRange_l+'/'+fname]);
      }

      if (newValues['Climate Signal']) {
        console.log("CLIMATE SIGNAL SELECTED")
        const rcp = getRCPKey(rcpValues);
        let url = [bucket+baseDir_l+downscaling+'/'+model+'/'+rcp+'/'+fname];
        console.log("SIGNAL URL =", url)
        setMapSource(url);
        // TODO this fix scaling but turn on dif in maps
        // setFilterValues({'Ave.': false, 'Dif.': true});
        setScaleDif(Scale_Values['dif_'+metric]);
        setClim([Clim_Ranges['dif_'+metric].min, Clim_Ranges['dif_'+metric].max]);
        setColormapName(Default_Colormaps['dif_'+metric]);
        // setShouldUpdateMapSource(true);
        // setComputeClimateSignal({'COMPUTE': true});
      }
    };

    if (computeChoice['Ave.']) {
      return (
        <>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Filter
          values={computeChoice}
          setValues={handleComputeChoiceChange}
          multiSelect={false}
        />
        </Box>
        <AveChoiceBox />
        </>
      );
    }
    else if (computeChoice['Dif.']) {


      return (
        <>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Filter
          values={computeChoice}
          setValues={handleComputeChoiceChange}
          multiSelect={false}
        />
        </Box>
        <DifferenceBox />
        </>
      );
    }
    else if (computeChoice['Climate Signal']) {
      return (
        <>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Filter
          values={computeChoice}
          setValues={handleComputeChoiceChange}
          multiSelect={false}
        />
        </Box>
        <ClimateSignalBox numMetrics={numMetrics} />
        </>
      );
    };
  }; // end ComputeChoiceFilter


  const ClimateSignalChoices = () => {
    if (yearRange === '1980_2010') {
      setYearRangeDif('1980_2010');
      return(
        [<option value='1980_2010'>1980-2010</option>,
         <option value='2070_2100'>2006-2099</option>]
      );
    } else {
      setYearRangeDif('1980_2010');
      return(
        <option value='1980_2010'>1980-2010</option>
      );
    }
  };

  const NumDatasetsBox = () => {
    if (numClimateSignalSets === 1){
      return(
      <>
      <Box>4. TOP DATASET</Box>
      </>
      );
    } else {
      return(
      <>
      <Box>4. TOP {numClimateSignalSets} DATASETS</Box>
      </>
      );
    }
  };

  const NumClimateSignalDatasetsButton = () => {
    return(
      <>
      <NumDatasetsBox />
      <Slider
        value={numClimateSignalSets}
        min={1}
        max={10} // or combinations.length later
        step={1}
        onChange={handleNumClimateSignalSets}
        sx={{mb:4}}
      />
      </>
    );
  };

  const ClimateSignalComputeButton = () => {
    return(
      <>
      <Box>5. COMPUTE CLIMATE SIGNAL</Box>
      <BestPerformingBox topCombination={topCombination}/>
      <Filter
       values={computeClimateSignal}
       setValues={handleClimateSignal}
       multiSelect={false}
      />
      </>
    );
  };

  const VariableChoiceBox = ({showPlotLabel=false}) => {
    return(
      <>
      { showPlotLabel && <Box sx={{ ...sx.label, mt: [4] }}>Plot Metric</Box> }
      { !showPlotLabel && <Box sx={{ ...sx.label, mt: [4] }}>Metrics</Box> }

      <Select
        sxSelect={{ bg: 'transparent' }}
        size='xs'
        onChange={handleMetricsChange}
        sx={{ mt: [1] }}
        value={metric}
      >
        <option value='n34pr'>n34pr</option>
        <option value='n34t'>n34t</option>
        <option value='ptrend'>ptrend</option>
        <option value='ttrend'>ttrend</option>
        <option value='pr90'>pr90</option>
        <option value='pr99'>pr99</option>
        <option value='t90'>t90</option>
        <option value='t99'>t99</option>
        <option value='djf_t'>djf_t</option>
        <option value='djf_p'>djf_p</option>
        <option value='mam_t'>mam_t</option>
        <option value='mam_p'>mam_p</option>
        <option value='jja_t'>jja_t</option>
        <option value='jja_p'>jja_p</option>
        <option value='son_t'>son_t</option>
        <option value='son_p'>son_p</option>
        <option value='ann_t'>ann_t</option>
        <option value='ann_p'>ann_p</option>
        <option value='ann_snow'>ann_snow</option>
        <option value='freezethaw'>freezethaw</option>
      </Select>
    </>
    );
  };


  const BestPerformingBox = ({topCombination}) => {
    let combinationBox;
    if (topCombination === "Select Metrics") {
        combinationBox = <Box> {topCombination} </Box>
    } else {
        combinationBox = topCombination.map((item) => (<Box> {item} </Box>))
    }
    return (combinationBox);
  };

  const DifYearRangeBox = () => {
    return(
      <>
      <Box sx={{ ...sx.label, mt: [3] }}>Year Range</Box>
      <Select
          sxSelect={{ bg: 'transparent' }}
          size='xs'
          sx={{ mt: [1] }}
          value={'1981_2004'}
       >
          <option value='1981_2004'>1981-2004</option>
     </Select>
     </>
    );
  };

  const YearRangeBox = () => {
    return(
      <>
      <Box sx={{ ...sx.label, mt: [3] }}>Year Range</Box>
      <Select
          sxSelect={{ bg: 'transparent' }}
          size='xs'
          onChange={handleYearChange}
          sx={{ mt: [1] }}
          value={yearRange}
        >
          <option value='1981_2004'>1981-2004</option>
          {(downscaling != 'gard_r2' &&
            downscaling != 'gard_r3') && (
            <>
            <option value='2070_2100'>2006-2099</option>
            </>
          )}
{/*       <option value='1980_2010'>1980-2010</option>
          <option value='2070_2100'>2006-2099</option>*/}
     </Select>
     </>
    );
  };


  const MapChoicesBox = ({dif=false}) => {
    var downscalingChange;
    var downscalingVar;
    if (!dif) {
      downscalingChange = handleDownscalingChange;
      downscalingVar = downscaling
console.log("DIF IS TRUE");
    } else {
      downscalingChange = handleDownscalingDifChange;
      downscalingVar = downscalingDif
console.log("DIF IS FALSE");
    }

    return(
      <>
      {/* <Box sx={{ position: 'absolute', top: 20, left: 20 }}>*/}

      {computeChoice['Ave.'] && <YearRangeBox />}

      <Box sx={{ ...sx.label, mt: [4] }}>Downscaling Method</Box>
      <Select
        sxSelect={{ bg: 'transparent' }}
        size='xs'
        onChange={downscalingChange}
        sx={{ mt: [1] }}
        value={downscalingVar}
      >
        <option value='icar'>ICAR</option>
        {yearRange === '1981_2004' && (
        <>
        <option value='gard_r2'>GARD_r2</option>
        <option value='gard_r3'>GARD_r3</option>
        </>
        )}
        <option value='loca_8th'>LOCA_8th</option>
        <option value='maca'>MACA</option>
        <option value='nasa_nex'>NASA-NEX</option>
      </Select>

      <Box sx={{ ...sx.label, mt: [4] }}>Climate Model</Box>
      <Select
        sxSelect={{ bg: 'transparent' }}
        size='xs'
        onChange={handleModelChange}
        sx={{ mt: [1] }}
        value={model}
      >

       {downscalingVar === 'icar' && (
         <>
         <option value='noresm1_m'>NorESM-M</option>
         <option value='access1_3'>ACCESS1-3</option>
         <option value='canesm2'>CanESM2</option>
         <option value='ccsm4'>CCSM4</option>
         <option value='miroc5'>MIROC5</option>
         </>
       )}
       {downscalingVar === 'gard_r2' && (
         <>
         <option value='noresm1_m'>NorESM-M</option>
         <option value='access1_3'>ACCESS1-3</option>
         <option value='canesm2'>CanESM2</option>
         <option value='ccsm4'>CCSM4</option>
         <option value='miroc5'>MIROC5</option>
         </>
       )}
       {downscalingVar === 'gard_r3' && (
         <>
         <option value='noresm1_m'>NorESM-M</option>
         <option value='access1_3'>ACCESS1-3</option>
         <option value='canesm2'>CanESM2</option>
         <option value='ccsm4'>CCSM4</option>
         <option value='miroc5'>MIROC5</option>
         </>
       )}
       {downscalingVar === 'loca_8th' && (
         <>
         <option value='noresm1_m'>NorESM-M</option>
         <option value='access1_3'>ACCESS1-3</option>
         <option value='canesm2'>CanESM2</option>
         <option value='ccsm4'>CCSM4</option>
         <option value='miroc5'>MIROC5</option>
         </>
       )}
      {downscalingVar === 'maca' && (
        <>
        <option value='noresm1_m'>NorESM-M</option>
        <option value='canesm2'>CanESM2</option>
        <option value='ccsm4'>CCSM4</option>
        <option value='miroc5'>MIROC5</option>
        </>
      )}
      {downscalingVar === 'nasa_nex' && (
        <>
        <option value='noresm1_m'>NorESM-M</option>
        <option value='canesm2'>CanESM2</option>
        <option value='miroc5'>MIROC5</option>
        </>
      )}
      </Select>

      <VariableChoiceBox />
      {(!computeChoice['Climate Signal'] &&
        yearRange === '1981_2004')
       && setMetricLabel()}
      {/* </Box> */}
    </>
  ); // end of MapChoicesBox return statement
  };

  const AveChoiceBox = () => {
    if (aveChoice['Modeling']) {
      // setMapSource([bucket+baseDir+downscaling+'/'+model+'/'+yearRange+'/'+fname]);
      return (
        <>
        <Filter
          values={aveChoice}
          setValues={handleAveChange}
          sx={{mt:3}}
        />
        <MapChoicesBox />
        <RcpBox />
        </>
      );
    } else if (aveChoice['Observation']) {
      // setMapSource([bucket+'/obs/'+obs+'/'+yearRangeDif+'/'+fname]);
      return (
        <>
        <Filter
          values={aveChoice}
          setValues={handleAveChange}
          sx={{mt:3}}
        />
      <Box sx={{ ...sx.label, mt: [3] }}>Year Range</Box>
      <Select
          sxSelect={{ bg: 'transparent' }}
          size='xs'
          sx={{ mt: [1] }}
          value={'1981_2004'}
       >
          <option value='1981_2004'>1981-2004</option>
     </Select>

        <ObsChoicesBox onChange={handleObsChange} value={obs} />
        </>
      );
    }
  };

  const DifferenceChoiceBox = ({obsOrDataChoice, setObsOrDataChoice}) => {
    return (
      <>
      <Filter
        values={differenceChoice}
        setValues={setDifferenceChoice}
        sx={{mt:3}}
      />
      <Filter
        values={obsOrDataChoice}
        setValues={setObsOrDataChoice}
        sx={{mt:3}}
      />
      </>
    );
  };

  const ClimateSignalChoiceBox = () => {
    return (
      <>
      {/*
      <Box sx={{ ...sx.label, mt: [3] }}>0. Compare By</Box>
      */}
      <Filter
        values={methodAndModel}
        setValues={handleSignalChoice}
        sx={{mt:3}}
      />
      <Filter
        values={metricPerformance}
        setValues={handleSignalChoice}
      />
      <Box sx={{ ...sx.label, mt: [2] }}>
        Year Range
      </Box>
      <Select
          sxSelect={{ bg: 'transparent' }}
          size='xs'
          sx={{ mt: [1] }}
          value={'2070_2100'}
       >
          <option value='2070_2100'>2006-2099</option>
      </Select>
      </>
    );
  };

  const RcpBox = () => {
    if (yearRange === '2070_2100') {
      return(
      <>
      <Box sx={{mt:4}}>RCP SCENARIO</Box>
      <Filter
        values={rcpValues}
        setValues={handleRCPValues}
        multiSelect={false}
      />
      </>
      );
    } else {
      return(
       <> </>
      );
    }
  };

  const ClimateSignalBox = ({numMetrics}) => {
    if (metricPerformance["Metric Performance"]) {
      return(
        <>
          <ClimateSignalChoiceBox />
          <ClimateSignalBoxMetrics />
        </>
      );
    } else { // method and model
      return(
        <>
          <ClimateSignalChoiceBox />
          <MapChoicesBox />
          <Box sx={{mt:4}}>RCP SCENARIO</Box>
          <Filter
           values={rcpValues}
           setValues={handleRCPValues}
           multiSelect={false}
          />
        </>
      );
    }
  };

  /* TODO */
  /* add arguments to mapchoicesbox */
  const DifferenceBox = ({numMetrics}) => {
    if (differenceChoice["Minuend"]) {
      return(
        <>
          <DifferenceChoiceBox
             obsOrDataChoice={difObsOrDataChoice1}
             setObsOrDataChoice={setObsOrDataChoice1} />
          <DifYearRangeBox />
          {difObsOrDataChoice1['Model'] ? <MapChoicesBox
                                           /> :
                                          <ObsChoicesBox
                                           onChange={handleObsChange}
                                           value={obs} />
          }
        </>
      );
    } else { // subtrahend
      return(
        <>
          <DifferenceChoiceBox
             obsOrDataChoice={difObsOrDataChoice2}
             setObsOrDataChoice={setObsOrDataChoice2} />
          <DifYearRangeBox />
          {difObsOrDataChoice2['Model'] ? <MapChoicesBox dif={true} /> :
                                          <ObsChoicesBox
                                           onChange={handleObsDifChange}
                                           value={obsDif} />
          }
        </>
      );
    }
  };

  const ClimateSignalBoxMetrics = ({numMetrics}) => {
    return(
      <>

      <Box sx={{ ...sx.label, mt: [4] }}>1. Analysis Method</Box>
      <Filter
        values={metricMethod1}
        setValues={setMetricMethod1}
      />
      <Filter
        values={metricMethod2}
        setValues={setMetricMethod2}
      />

      <MetricBox />

      <Box sx={{mt:4}}>3. FUTURE RCP SCENARIO</Box>
      <Filter
        values={rcpValues}
        setValues={handleRCPValues}
        multiSelect={false}
        sx={{mb:4, ml:3}}
      />

      <NumClimateSignalDatasetsButton />
      <ClimateSignalComputeButton />
      <VariableChoiceBox showPlotLabel={true} />
      </>

    );
  }; {/* end of ClimateSignalBox */}


  return (
    <>
    <Box
      sx={{ position: 'absolute', top: 20, right: 20,
            backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '10px',
            borderRadius: '5px'}}
    >
      <LocalColorbar />
    </Box>;


    <Box
      sx={{ position: 'absolute', top: 20, left: 20,
            backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '10px',
            borderRadius: '5px'}}
    >
      <ComputeChoiceFilter/>
    </Box>;
    {/* !showRegionPlot && <MapChoicesBox /> */}
    {/* showRegionPlot && <ClimateSignalBox numMetrics={numMetrics} /> */}

    <Box sx={{ position: 'absolute',
               bottom: 20,
               left: 20,
               '@media screen and (max-height: 850px)': {
                 left: 'auto',
                 right: 20, // Move to the right if the window is too small
               },
            }}
    >
      <RiversTag />
      <StatesTag />
      <Huc2Tag />
      <SideBySideTag />
      <README />
    </Box>
    </>
  );
};

export default ParameterControls
