import { useState, Fragment } from 'react';
import { Box, Flex } from 'theme-ui';
import { useCallback, useEffect } from 'react';
import { useMapbox } from '../maps/src/mapbox';
import { Button, Filter, Table, Tag, Slider, Badge, Toggle, Select, Link } from '@carbonplan/components';
import { Right, Reset } from '@carbonplan/icons';
import Colorbar from './colorbar';
// import { colormaps } from '@carbonplan/colormaps';
import { colormaps } from '../colormaps/src';
import { openGroup } from "zarr";
// local imports
import { Scale_Values, Clim_Ranges} from './variableSettings';
import { Default_Colormaps, readmeUrl } from './variableSettings';
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

const dif_t = true;

const ParameterControls = ({ getters, setters, bucket, fname, settings }) => {
  const { display, reload, debug, opacity, clim, month,
          band, colormapName, colormap,
          downscaling, model, metric, yearRange, mapSource, chartSource,
          downscalingDif, modelDif, yearRangeDif, obs, obsDif,
          mapSourceDif, chartSourceDif, scaleDif,
          chartHeight, computeChoice,
          showClimateChange, showRegionPlot, bucketRes,
          showStates, showRivers, showHuc2, sideBySide, mapVal, ensemble,
          region
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
    setSideBySide,
    setEnsemble,
    setRegion,
  } = setters;


  const [chartToggle, setChartToggle] = useState(false);

  const [units, setUnits] = useState('°C');

  const [baseDir, setBaseDir] = useState('map/');


  const [metricMethod, setMetricMethod] = useState({'RMSE': true,
                                                    'Std. Dev.': false,
                                                    'Correlation': false});
  const [metricMethod1, setMetricMethod1] = useState({'RMSE': true,
                                                      'Std. Dev.': false});
  const [metricMethod2, setMetricMethod2] = useState({'Correlation': false});

  function setUrl(baseDir, downscaling, model, yearRange, ensemble, dif=false, rcp=null) {
    const time = getYearRangeString(yearRange, rcp);
    const url = `${bucket}${baseDir}${downscaling}/${model}/${time}/${ensemble}/${fname}`;
    if (dif) {
      setMapSourceDif([url]);
    } else {
      setMapSource([url]);
    }
  };

  function addUrlArrayMember(downscaling, model, yearRange, ensemble) {
    const time = getYearRangeString(yearRange);
    const url = `${bucket}${baseDir}${downscaling}/${model}/${time}/${ensemble}/${fname}`;
    setMapSource((prevSources) => [...prevSources, url]);
  };


  const dif_false = false;
  const dif_true = true;
  function setObsUrl(obs, yearRange, dif=false, region_l=null) {
    let time = getYearRangeString(yearRange);
    if (settings.obs_eras !== undefined) {
      time = 'hist.'+settings.obs_eras;
      setYearRange(time);
    }

    let url;
    if (region_l == null) {
      url= `${bucket}/obs/${obs}/${time}/${fname}`;
    } else {
      url= `${bucket}/obs/${region_l}/${obs}/${time}/${fname}`;
    }

    if (dif) {
      setMapSourceDif([url]);
    } else {
      setMapSource([url]);
    }
  };



  // Testing opening zarr array
  const [annPRValues, setAnnPRValues] = useState([])
  useEffect(() => {
  async function loadAnnPR() {
    const store = "https://hydro.rap.ucar.edu/hydro-climate-eval/data/test_netcdf/bar_v2.zarr";

    // openGroup works for consolidated metadata (zarr_format:3 + inline)
    const group = await openGroup(store);

    // get array by name
    const annPR = await group.getItem("ann_p_r");
    const data = await annPR.get();
    const val = Object.values(data.data);

    setAnnPRValues(val); // Convert to normal JS array
    console.log("ann_p_r:", val);
    // setAnnPRValues(data);
  }

  loadAnnPR();
  }, []);

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

  const getYearRangeString = (yearRange, rcp_in=null) => {
    let yearRange_s = "hist." + yearRange;
    if (Object.keys(settings.future_eras).includes(yearRange)) {
      const rcpValues_l = rcp_in ?? rcpValues;
      console.log("getyearrangestirng rcip_in", rcpValues_l)
      yearRange_s = getRCPKey(rcpValues_l) + "." + yearRange
    }
    return yearRange_s;
  }

  const [rcpValues, setRCPValues] = useState({'4.5': true,
                                              '8.5': false});

  const [rcpValuesDif, setRCPValuesDif] = useState({'4.5': true,
                                                    '8.5': false});


  const [computeClimateSignal, setComputeClimateSignal] =
          useState({'COMPUTE': false});

  const [numClimateSignalSets, setNumClimateSignalSets] = useState(2);

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
    }  else if (metric === 'eli_t') {
      label = 'eli_t';
      description =
            ['Temperature',
             'ENSO Longitude',
             'Index'];
    }  else if (metric === 'eli_p') {
      label = 'eli_p';
      description =
            ['Precip',
             'ENSO Longitude',
             'Index'];
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
    }  else if (metric === 'drought_1yr') {
      label = 'drought_1yr';
      description =
            ['Drought',
             '1 year',
             'trend'];
    }  else if (metric === 'drought_2yr') {
      label = 'drought_2yr';
      description =
            ['Drought',
             '2 year',
             'trend'];
    }  else if (metric === 'drought_5yr') {
      label = 'drought_5yr';
      description =
            ['Drought',
             '5 year',
             'trend'];
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


  const handleBandChange = useCallback((e) => {
    const band = e.target.value;
    setBand(band);
  });

  const { map } = useMapbox()

  const resetLatLon = () => {
    if (map) {
      map.jumpTo({
        center: [-97, 38],
        zoom: 4,
      });
    }
  };

  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState(null);
  const [val, setVal] = useState(null);

  const MapValueBox = ({ map }) => {
    useEffect(() => {
      if (!map) return
      // console.log("layers =", map.getStyle().layers)
      const onMouseMove = (e) => {
      try{
        const { lng, lat } = e.lngLat;
        const lng_fixed = ((lng + 180) % 360 + 360) % 360 - 180;
        const x = e.point.x;
        const y = e.point.y;
        setLon(lng_fixed);
        setLat(lat);
        } catch (err) {
          console.error('🔥 onMouseMove error:', err.message);
        }
      };


    map.on('mousemove', onMouseMove);
    return () => {
      map.off('mousemove', onMouseMove)
    }
    }, [map])
    return(
      <Box sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '10px',
          borderRadius: '5px',
          width: '110px',
          alignSelf: 'flex-end',
          textAlign: 'left',
       }}>
      <Box> Lat: {lat !== null ? lat.toFixed(2) : '–'} </Box>
      <Box> Lon: {lon !== null ? lon.toFixed(2) : '–'} </Box>
      <Box> Val: {mapVal !== null ? mapVal.toFixed(2) : '–'} </Box>
      </Box>
    );
  };


  const ResetZoomButton = () => {
    return(
      <Box sx={{ mt: 2, display: 'flex'}}>
      <Button prefix={<Reset/>} onClick={resetLatLon} sx={{ color: "black"}}>
      Reset Zoom
      </Button>
      </Box>
    );
  };

  const resetColorbar = () => {
    if (computeChoice['Dif.'] || computeChoice['Climate Signal']) {
      setClim([Clim_Ranges['dif_'+metric].min, Clim_Ranges['dif_'+metric].max]);
    } else if (computeChoice['Ave.']) {
      setClim([Clim_Ranges[metric].min, Clim_Ranges[metric].max]);
    }
  };


  const handleEnsembleChange = useCallback((e) => {
    let ensemble = e.target.value;
    setEnsemble(ensemble);
    setUrl(baseDir, downscaling, model, yearRange, ensemble);
  });

  const handleYearChange = useCallback((e) => {
    let yearRange = e.target.value;
    setYearRange(yearRange);
    setUrl(baseDir, downscaling, model, yearRange, ensemble);
  });

  const handleYearDifChange = useCallback((e) => {
    let yearRangeDif = e.target.value;
    const dif = true
    setYearRangeDif(yearRangeDif);
    setUrl(baseDir, downscalingDif, modelDif, yearRangeDif, ensemble, dif);
  });

  const handleDownscalingChange = useCallback((e) => {
    const downscaling = e.target.value;
    setDownscaling(downscaling);
    let safe_model = checkDownscalingModel(downscaling);
    let safe_ensemble = checkModelEnsemble(safe_model, downscaling);
    setModel(safe_model);
    setUrl(baseDir, downscaling, safe_model, yearRange, safe_ensemble);
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

    setUrl(baseDir, downscalingDif, safemodel, yearRangeDif, ensemble);
  });

  function checkModelEnsemble(model, downscaling) {
    let ens = ensemble;
    if (!ens) {
      return ens;
    }

    const ensList = settings.ensemble[downscaling][model];
    if (!ensList.includes(ens)) {
      ens = ensList[0];
      setEnsemble(ens);
    }
    return ens;
  }

  function checkDownscaling(computeChoice) {
    let ds = downscaling
    if (!ds) {
      return ds;
    }

    if (computeChoice['Climate Signal']) {
      const dsList = Object.keys(settings.downscaling_climateSignal || {});
      if (!dsList.includes(ds)) {
        ds = dsList[0];
        setDownscaling(ds);
      }
        console.log("DS =", ds)
        console.log("dsList = ", dsList)

    } else {
      const dsListb = Object.keys(settings.past_eras).includes(yearRange)
        ? Object.keys(settings.downscaling_past || {})
        : Object.keys(settings.downscaling_future|| {});
      if (!dsListb.includes(ds)) {
        ds = dsListb[0];
        setDownscaling(ds);
      }
    }
    return ds;
  };

  function checkDownscalingModel(downscaling) {
    let mod = model
    if (!mod) {
      return mod;
    }

    if (computeChoice['Climate Signal']) {
      const modList = Object.keys(settings.model_climateSignal[downscaling] || {});
      if (!modList.includes(mod)) {
        mod = modList[0];
        setModel(mod);
      }
    } else {
      const modList = Object.keys(settings.model[downscaling] || {});
      if (!modList.includes(mod)) {
        mod = modList[0];
        setModel(mod);
      }
    }
    return mod;
  }


  const handleModelChange = useCallback((e) => {
    const model = e.target.value;
    const ens = checkModelEnsemble(model, downscaling);
    setModel(model);
    setUrl(baseDir, downscaling, model, yearRange, ens);
    // setChartSource(bucket+'/chart/'+downscaling+'/'+model+'/'+yearRange+'/'+band);
    // setChartSource(bucket+'/chart/'+downscaling+'/'+model+'/'+band);
    // getData({chartSource}, setChartData);
  });

  const handleMetricsChange = useCallback((e) => {
    const metric = e.target.value;
    setMetric(metric);
    console.log("metric e =", e.target.value);

    if (metric === 'n34pr') {
      setBand('n34p');
      setUnits('correlation');
    } else if (metric === 'n34t') {
      setBand('n34t');
      setUnits('correlation');
    } else if (metric === 'eli_t') {
      setBand('elit');
      setUnits('°E');
    } else if (metric === 'eli_p') {
      setBand('elip');
      // average longitude of cells capable of deep convection (SST>28C)
      setUnits('°E');
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
    } else if (metric === 'drought_1yr') {
      setBand('d1yr');
      setUnits('num. months SPI < -1');
    } else if (metric === 'drought_2yr') {
      setBand('d2yr');
      setUnits('num. months SPI < -1');
    } else if (metric === 'drought_5yr') {
      setBand('d5yr');
      setUnits('num. months SPI < -1');
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

  let aveChoice = null;
  let setAveChoice = null;
  if (settings.observation) {
    [aveChoice, setAveChoice] = useState({ 'Modeling': true, 'Observation': false, });
  } else {
    [aveChoice, setAveChoice] = useState({ 'Modeling': true });
  }

  const [metricPerformance, setMetricPerformance] = //useState(true);
          useState({ "Metric Performance": false });
  const [methodAndModel, setMethodAndModel] = //useState(false);
          useState({ "Method & Model": true });

  const [differenceChoice, setDifferenceChoice] =
          useState({ "Dataset A": true, "Dataset B": false });
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

  // Pretty printing of the model and downscaling labels
  const modelPP = {
    access1_3: 'ACCESS1-3',
    canesm2: 'CanESM2',
    ccsm4: 'CCSM4',
    cesm: 'CESM',
    gfdl: 'GFDL',
    miroc5: 'MIROC5',
    noresm: 'NorESM',
    noresm1_m: 'NorESM-M',
  };

  const downscalingPP = {
    icar: 'ICAR',
    gard_r2: 'GARD_r2',
    gard_r3: 'GARD_r3',
    loca_8th: 'LOCA_8th',
    maca: 'MACA',
    nasa_nex: 'NASA-NEX'
  };

  const obsPP = {
    conus404: 'Conus404',
    gmet: 'GMET',
    gridmet: 'gridMET',
    livneh: 'Livneh',
    nclimgrid: 'nClimGrid',
    nldas: 'NLDAS',
    prism: 'PRISM',
  }


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
  // hack to avoid these files
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
      setUrl(baseDir, downscaling, model, yearRange, ensemble);
    } else {
      const yearRange = Object.keys(settings.past_eras)[0];
      setYearRange(yearRange);
      setObsUrl(obs, yearRange);
    }
  }, [difObsOrDataChoice1]);

  // difference options
  useEffect(() => {
    if (difObsOrDataChoice2['Model']) {
      setUrl(baseDir, downscalingDif, modelDif, yearRangeDif, ensemble, dif_true);
    } else {
      const yearRangeDif = Object.keys(settings.past_eras)[0];
      setYearRangeDif(yearRangeDif);
      setObsUrl(obs, yearRangeDif, dif_true);
    }
  }, [difObsOrDataChoice2]);

  const handleRCPValues = useCallback((e) => {
    const choice = e;
    // console.log("RCP VALUES e =", e);
    setRCPValues(choice);
    if (methodAndModel["Method & Model"]) {
      // copied from getYearRangeString function
      // const time = getRCPKey(choice) + "." + yearRange
      // let url = [bucket+baseDir+downscaling+'/'+model+'/'+time+'/'+fname];
      // setMapSource(url);
    }
    setUrl(baseDir, downscaling, model, yearRange, ensemble, false, choice);
  });

  const handleRCPValuesDif = useCallback((e) => {
    const choice = e;
    // console.log("RCP Dif VALUES e =", e);
    setRCPValuesDif(choice);
    if (methodAndModel["Method & Model"]) {
      // copied from getYearRangeString function
      // const time = getRCPKey(choice) + "." + yearRangeDif
      // let url = [bucket+baseDir+downscaling+'/'+model+'/'+time+'/'+fname];
      // setMapSourceDif(url);

    }
    setUrl(baseDir, downscalingDif, modelDif, yearRangeDif, ensemble, dif_t, choice);
  });



  const [shouldUpdateMapSource, setShouldUpdateMapSource] = useState(false);

  const handleAveChange = useCallback((e) => {
    const choice =e
    console.log("AVECHOIE =", choice);
    if (choice['Modeling']) {
      // setAveChoice({ 'Modeling': true, 'Observation': false, });
      setAveChoice(choice);
      setUrl(baseDir, downscaling, model, yearRange, ensemble)
    } else if (choice['Observation']) {
      setAveChoice(choice);
      const yearRange = Object.keys(settings.past_eras)[0];
      setYearRange(yearRange);
      setObsUrl(obs, yearRange, dif_false, region);
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
      setUrl(baseDir, downscaling, model, yearRange, ensemble)
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
    setComputeClimateSignal({'COMPUTE': false});
  }, [metrics, metrics1, metrics2, metrics3, metrics4,
      stdDevMetrics, stdDevMetrics1, stdDevMetrics2,
      RMSEMetrics, RMSEMetrics1, RMSEMetrics2]);

  useEffect(() => {
    if (!showRegionPlot && shouldUpdateMapSource) {
      console.log("ARTLESS top combination =", topCombination);
      let downscaling_l = topDownscaling[0];
      let model_l = topModel[0];
      const time = getYearRangeString(yearRange)
      let url = [bucket+baseDir+downscaling_l+'/'+model_l+'/'+time+'/'+fname];
      const numClimateSignalSets_i = parseInt(numClimateSignalSets, 10);

      setUrl(baseDir, downscaling_l, model_l, yearRange, ensemble);
      setDownscaling(downscaling_l);
      setModel(model_l);
      setShouldUpdateMapSource(false); // Reset the flag
      // const local_filterValue = {'Ave.': false, 'Dif.': true,
      //                            'Climate Signal': false};
      // handleFilterAndSetClimColormapName(local_filterValue);

      for (let i=1; i<numClimateSignalSets_i; i++) {
        downscaling_l = topDownscaling[i];
        model_l = topModel[i];
        addUrlArrayMember(downscaling_l, model_l, yearRange, ensemble);
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
    const dif = true
    setModelDif(modelDif);
    setUrl(baseDir, downscalingDif, modelDif, yearRangeDif, ensemble, dif);
  });


  const handleChartChange = useCallback((e) => {
    const model = e.target.value;
    setChartHeight('20%');
  });

  const RiversTag = () => {
    return(
    <Box>
    <Tag value={showRivers}
         sx={{ color: "black"}}
         onClick={() => setRivers((prev) => !prev)}>
      Rivers
    </Tag>
    </Box>
    );
  };

  const StatesTag = () => {
    return(
      // <Toggle value={showStates} onClick={() => setStates(!showStates)} />
    <Box>
    <Tag value={showStates}
         sx={{ color: "black"}}
         onClick={() => setStates((prev) => !prev)}>
      State Lines
    </Tag>
    </Box>
    );
  };

  const Huc2Tag = () => {
    return(
    <Box>
    <Tag value={showHuc2}
         sx={{ color: "black"}}
         onClick={() => setHuc2((prev) => !prev)}>
      Huc 2
    </Tag>
    </Box>
    );
  };

  const SideBySideTag = () => {
    return(
    <Box>
    <Tag value={sideBySide}
         sx={{ color: "black"}}
         onClick={() => setSideBySide((prev) => !prev)}>
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
        prefix={<Right />}
        color="black"
      >
        HELP
      </Button>
      </Box>
    );
  };

  const DifferenceLegend = () => {
    let a_label, b_label
    if (difObsOrDataChoice1['Model']) {
      a_label = `${modelPP[model]} downscaled with ${downscalingPP[downscaling]}`
    } else {
      a_label = `${obsPP[obs]} observation`
    }
    if (difObsOrDataChoice2['Model']) {
      b_label = `${modelPP[modelDif]} downscaled with ${downscalingPP[downscalingDif]}`
    } else {
      b_label = `${obsPP[obsDif]} observation`
    }


    return (
      <Box sx={{ mt: [2], justifyContent: 'center'}}>
        {a_label} <br />
        minus <br />
        {b_label} <br />
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
      display range
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button prefix={<Reset/>} inverted onClick={resetColorbar} size='xs'>
        reset
      </Button>
      </Box>
      </>
    );
  };


  const handleObsChange = useCallback((e) => {
    const obs_l = e.target.value;
    setObs(obs_l);
    let region_l = null;
    if (settings.obs_lev2 != null) {
      region_l = region
    }
    console.log("handleobschange region=", region)
    setObsUrl(obs_l, yearRange, dif_false, region_l);
  });
  const handleObsDifChange = useCallback((e) => {
    const obs_l = e.target.value;
    setObsDif(obs_l);
    setObsUrl(obs_l, yearRangeDif, dif_true);
  });

  const handleRegionChange = useCallback((e) => {
    const region = e.target.value
    setRegion(region);
    setObsUrl(obs, yearRange, dif_false, region);
  });

  const ObsChoiceRegionBox = () => {
    return (
      <>
      <Box sx={{ ...sx.label, mt: [3] }}>{settings.obs_lev2_title}</Box>
      <Select
        sxSelect={{ bg: 'transparent' }}
        size='xs'
        onChange={handleRegionChange}
        sx={{ mt: [1] }}
        value={region}
      >
      {Object.entries(settings.obs_lev2).map(([key, label]) => (
          <option key={key} value={key}>
          {label}
        </option>
      ))}
      </Select>
      </>
    );
  };

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
      {Object.entries(settings.obs_lev1).map(([key, label]) => (
          <option key={key} value={key}>
          {label}
        </option>
      ))}
      </Select>
      {settings.obs_lev2 && <ObsChoiceRegionBox/>}
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

      // Ave. or Dif. maps
      if (!newValues['Climate Signal']) {
        // handleFilterAndSetClimColormapName(newValues);
        // above func handled below
        let yearRange_key = yearRange;
        const downscaling = checkDownscaling(newValues);
        const model = checkDownscalingModel(downscaling);

        if (newValues['Ave.']) {
          setClim([Clim_Ranges[metric].min, Clim_Ranges[metric].max]);
          setColormapName(Default_Colormaps[metric]);
        }
        if (newValues['Dif.']) {
          yearRange_key = Object.keys(settings.past_eras)[0];
          setYearRange(yearRange_key);
          setScaleDif(Scale_Values['dif_'+metric]);
          setClim([Clim_Ranges['dif_'+metric].min, Clim_Ranges['dif_'+metric].max]);
          setColormapName(Default_Colormaps['dif_'+metric]);
        }
        setUrl(baseDir_l, downscaling, model, yearRange_key, ensemble)
      }

      if (newValues['Climate Signal']) {
        console.log("CLIMATE SIGNAL SELECTED")
        const yearRange_key = Object.keys(settings.future_eras)[0];
        // const time = getYearRangeString(yearRange_key)
        // let url = [bucket+baseDir_l+downscaling+'/'+model+'/'+time+'/'+fname];
        // setMapSource(url);
        // console.log("SIGNAL URL =", url)
        setYearRange(yearRange_key);
        let downscaling_l = downscaling;
        let model_l = model;
        // console.log("CS YEARRANGE", yearRange_key)
        // console.log("BAR", downscaling_l, model_l);
        if (!(downscaling in settings.model_climateSignal)) {
          downscaling_l = Object.keys(settings.model_climateSignal)[0];
          model_l = Object.keys(settings.model_climateSignal[downscaling_l])[0];
          // console.log("FOOOOOOOO", downscaling_l, model_l);
          setDownscaling(downscaling_l);
          setModel(model_l)
        }
        setUrl(baseDir_l, downscaling_l, model_l, yearRange_key, ensemble, )

        // setYearRange(Object.keys(settings.future_eras)[0]);
        setScaleDif(Scale_Values['dif_'+metric]);
        setClim([Clim_Ranges['dif_'+metric].min,
                 Clim_Ranges['dif_'+metric].max]);
        setColormapName(Default_Colormaps['dif_'+metric]);
        if ((metric === 'ptrend' || metric === 'ttrend')) {
          handleMetricsChange({ target: { value: settings.variables[0] } });
        }
        // setShouldUpdateMapSource(true);
        // setComputeClimateSignal({'COMPUTE': true});
      }
    };


    // --- Return Section ---
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

  const VariableChoiceBox = ({showPlotLabel=false, climateSignal=false}) => {
    const metrics = [...settings.variables,
                     ...(climateSignal ? [] : settings.variables_trend)
                    ];

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
        {metrics.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
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


  const YearRangeBox = ({downscaling_l, past = true, future = true,
                         dif=false}) => {
    let handle, val;
    if (dif === true)  {
      handle = handleYearDifChange;
      val =  yearRangeDif;
    } else {
      handle = handleYearChange;
      val =  yearRange;
    }
    if (downscaling_l == 'gard_r2' ||
        downscaling_l == 'gard_r3') {
      future = false;
    }
    const options = {
      ...(past ? settings.past_eras : {}),
      ...(future ? settings.future_eras : {}),
    };

    const value = Object.values(options)[0];  // dead code
    return(
      <>
      <Box sx={{ ...sx.label, mt: [3] }}>Year Range</Box>
      <Select
          sxSelect={{ bg: 'transparent' }}
          size='xs'
          onChange={handle}
          sx={{ mt: [1] }}
          value={val}
       >

       {Object.entries(options).map(([key, label]) => (
            <option key={key} value={key}>
            {label}
          </option>
        ))}
     </Select>
     </>
    );
  };

  const EnsembleBox = () => {
    return(
      <>
      <Box sx={{ ...sx.label, mt: [3] }}>Ensemble</Box>
      <Select
          sxSelect={{ bg: 'transparent' }}
          size='xs'
          onChange={handleEnsembleChange}
          sx={{ mt: [1] }}
          value={ensemble}
       >

       {settings.ensemble[downscaling][model].map(ens => (
          <option key={ens} value={ens}>
          {ens}
        </option>
      ))}
     </Select>
     </>
    );
  };

  const MapChoicesBox = ({dif=false, climateSignal=false}) => {
    var downscalingChange;
    var downscalingVar;
    var modelChange;
    var modelVar;
    let showMetricLabel;
    if (!dif) {
      downscalingChange = handleDownscalingChange;
      downscalingVar = downscaling;
      modelChange = handleModelChange;
      modelVar = model;
      showMetricLabel = Object.keys(settings.past_eras).includes(yearRange)
    } else {
      downscalingChange = handleDownscalingDifChange;
      downscalingVar = downscalingDif;
      modelChange = handleModelDifChange;
      modelVar = modelDif;
      showMetricLabel = Object.keys(settings.past_eras).includes(yearRangeDif)
    }

    let downscaling_d, model_d
    if (climateSignal == false) {
      downscaling_d = Object.keys(settings.past_eras).includes(yearRange)
        ? settings.downscaling_past
        : settings.downscaling_future;

      model_d = settings.model[downscaling];
    } else {
      downscaling_d = settings.downscaling_climateSignal;
      model_d = settings.model_climateSignal[downscaling];
      console.log("DD=",downscaling_d);
      console.log("MD=",model_d);
      console.log("downscaling", downscaling)
    }


    // console.log("dd =", downscaling_d);
    // console.log("md =", model_d);

    return(
      <>
      {/* <Box sx={{ position: 'absolute', top: 20, left: 20 }}>*/}

      {computeChoice['Ave.'] &&
       <YearRangeBox downscaling_l={downscaling} />}


      <Box sx={{ ...sx.label, mt: [4] }}>{settings.downscaling_title}</Box>
      <Select
        sxSelect={{ bg: 'transparent' }}
        size='xs'
        onChange={downscalingChange}
        sx={{ mt: [1] }}
        value={downscalingVar}
      >
        {Object.entries(downscaling_d).map(([key, label]) => (
          <option key={key} value={key}>
          {label}
          </option>
        ))}
      </Select>

      <Box sx={{ ...sx.label, mt: [4] }}>Climate Model</Box>
      <Select
        sxSelect={{ bg: 'transparent' }}
        size='xs'
        onChange={modelChange}
        sx={{ mt: [1] }}
        value={modelVar}
      >
        {Object.entries(model_d).map(([key, label]) => (
          <option key={key} value={key}>
          {label}
          </option>
        ))}
      </Select>

      {settings.ensemble !== null && <EnsembleBox />}

      <VariableChoiceBox climateSignal={computeChoice['Climate Signal']} />
      {(!computeChoice['Climate Signal'] && showMetricLabel)
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
      setYearRange(Object.keys(settings.past_eras)[0]);

      // if (settings.obs_era !== undefined) {
      //   console.log("FOO RIGHT HERE");
      //   setYearRange(settings.obs_era);
      // }

      return (
        <>
        <Filter
          values={aveChoice}
          setValues={handleAveChange}
          sx={{mt:3}}
        />
        <YearRangeBox downscaling_l={downscaling} future={false} />
        <ObsChoicesBox
           onChange={handleObsChange}
           value={obs}
           label={settings.obs_lev1_title}
        />
        </>
      );
    }
  };

  const DifferenceChoiceBox = ({obsOrDataChoice, setObsOrDataChoice}) => {
    return (
      <Box>
      <Box
        sx={{fontSize: [2], fontFamily: 'mono', letterSpacing: 'mono',
              mt:3, mb: 0,}}>
        A-B for
      </Box>
      <Filter
        values={differenceChoice}
        setValues={setDifferenceChoice}
        sx={{mt:0}}
      />
      <Filter
        values={obsOrDataChoice}
        setValues={setObsOrDataChoice}
        sx={{mt:3}}
      />
      </Box>
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
      <YearRangeBox downscaling_l={downscaling} past={false} />
      </>
    );
  };

  const RcpBox = ({dif=false}) => {
    let showRcp, val, handle;
    if (dif) {
      showRcp = Object.keys(settings.future_eras).includes(yearRangeDif);
      val = rcpValuesDif;
      handle = handleRCPValuesDif
    } else {
      showRcp = Object.keys(settings.future_eras).includes(yearRange);
      val = rcpValues;
      handle = handleRCPValues
    }
    if (showRcp) {
      return(
      <>
      <Box sx={{mt:4}}>RCP SCENARIO</Box>
      <Filter
        values={val}
        setValues={handle}
        multiSelect={false}
      />
      </>
      );
    } else {
      return null;
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
          <MapChoicesBox climateSignal={true}/>
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
    if (differenceChoice["Dataset A"]) {
      return(
        <Box sx={{ mt: 0 }}>
          <DifferenceChoiceBox
             obsOrDataChoice={difObsOrDataChoice1}
             setObsOrDataChoice={setObsOrDataChoice1} />
          <YearRangeBox value={yearRange} downscaling_l={downscaling}
                        future={false}
           />

          {difObsOrDataChoice1['Model'] ?
                      <><MapChoicesBox /> <RcpBox /></>
                      :
                      <ObsChoicesBox onChange={handleObsChange} value={obs} />
          }
        </Box>
      );
    } else { // Dataset B
      return(
        <Box sx={{ mt: 0 }}>
          <DifferenceChoiceBox
             obsOrDataChoice={difObsOrDataChoice2}
             setObsOrDataChoice={setObsOrDataChoice2} />
          <YearRangeBox value={yearRangeDif} downscaling_l={downscalingDif}
                        future={false} dif={dif_t}
          />
          {difObsOrDataChoice2['Model'] ?
                      <><MapChoicesBox dif={true} />  <RcpBox dif={true} /></>
                      :
                      <ObsChoicesBox onChange={handleObsDifChange}
                                     value={obsDif} />
          }
        </Box>
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


{/*------------------------------------------------------------------*/}


  const LegendAndColorbarBox = () => {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 2, // adds vertical spacing between the two
          zIndex: 10,
        }}
      >
      {computeChoice['Dif.'] && (
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <DifferenceLegend />
        </Box>
      )}

      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '10px',
          borderRadius: '5px',
          width: 'fit-content',
          alignSelf: 'flex-end',
        }}
      >
        <LocalColorbar />
      </Box>
      <MapValueBox map={map} />
    </Box>
    );
  }; {/* end of LegendAndColorbarBox */}


  const ComputeChoiceBox = () => {
    return(
    <Box
      sx={{ position: 'absolute', top: 20, left: 20,
            backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '10px',
            borderRadius: '5px',
            maxHeight: '95vh',     // or any height you want
            overflowY: 'auto'       // adds vertical scrollbar if needed
          }}
    >
      <ComputeChoiceFilter />
    </Box>
    );
  };


  const HelpResetTagsBox = () => {
    return(
    <Box sx={{ position: 'absolute',
               bottom: 20,
               left: metricPerformance["Metric Performance"] ? 'auto' : 20,
               right: metricPerformance["Metric Performance"] ? 20 : 'auto',
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
      <ResetZoomButton />
      <README />
    </Box>
    );
  };


  // Top level return of three main control boxes
  return (
    <>
    <LegendAndColorbarBox />
    <ComputeChoiceBox />
    <HelpResetTagsBox />
    </>
  );
};

export default ParameterControls
