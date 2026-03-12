import { useRef, useLayoutEffect, useState, Fragment } from 'react';
import { Box, Flex } from 'theme-ui';
import { useCallback, useEffect } from 'react';
import { useMapbox } from '../maps/src/mapbox';
import { Line } from '../maps';
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

import {metrics_settings as desertsouthwest_metrics} from
  '../metrics/desertsouthwest_metrics.js';
import {metrics_settings as gulfcoast_metrics} from
  '../metrics/gulfcoast_metrics.js';
import {metrics_settings as mountainwest_metrics} from
  '../metrics/mountainwest_metrics.js';
import {metrics_settings as northernplains_metrics} from
  '../metrics/northernplains_metrics.js';
import {metrics_settings as pacificsouthwest_metrics} from
  '../metrics/pacificsouthwest_metrics.js';
import {metrics_settings as greatlakes_metrics} from
  '../metrics/greatlakes_metrics.js';
import {metrics_settings as midatlantic_metrics} from
  '../metrics/midatlantic_metrics.js';
import {metrics_settings as northatlantic_metrics} from
  '../metrics/northatlantic_metrics.js';
import {metrics_settings as pacificnorthwest_metrics} from
  '../metrics/pacificnorthwest_metrics.js';
const region_metric_settings = {
  'desertsouthwest': desertsouthwest_metrics,
  'gulfcoast': gulfcoast_metrics,
  'mountainwest': mountainwest_metrics,
  'northernplains': northernplains_metrics,
  'pacificsouthwest': pacificsouthwest_metrics,
  'greatlakes': greatlakes_metrics,
  'midatlantic': midatlantic_metrics,
  'northatlantic': northatlantic_metrics,
  'pacificnorthwest': pacificnorthwest_metrics,
}

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
  const { display, reload, debug, metricPerformance, clim, metricRegion,
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
    setMetricPerformance,
    setClim,
    setMetricRegion,
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


  const [metrics_settings, setMetricsSettings] =
        useState(desertsouthwest_metrics);

  const [chartToggle, setChartToggle] = useState(false);

  const [units, setUnits] = useState('°C');


  // TODO: HANDLE ALL THE REGIONS
  // const [metricRegion, setMetricRegion] = useState('desertsouthwest');

  const [baseDir, setBaseDir] = useState('map/');


  const schemeLabels = {
    'equal': "Equal",
    'equal_nowt': "Equal, No WT",
    'obsstd': "Obs SD",
    'ensstd': "Ens SD",
    'combstd': "Comb SD",
  };
  // set to combstd
  const [scheme, setScheme] =  useState('combstd');

  useEffect(() => {
    console.log("BAR: ------------------------------------");
    console.log("BAR: map =", mapSource);
    console.log("BAR: dif =", mapSourceDif);
  }, [mapSource, mapSourceDif]);


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
    console.log("COMPUTE should be adding url = ",url);
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
    // let yearRange_s = "hist." + yearRange;
    let yearRange_s = yearRange.startsWith("hist.")
        ? yearRange
        : "hist." + yearRange;
    if (Object.keys(settings.future_eras).includes(yearRange)) {
      const rcpValues_l = rcp_in ?? rcpValues;
      yearRange_s = getRCPKey(rcpValues_l) + "." + yearRange
    }
    // console.log("DEBUG: yearrang",yearRange_s);
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
    }  else if (metric === 'tpcorr') {
      label = 'tpcorr';
      description =
            ['tp',
             'correlation'];
    }  else if (metric === 'wt_day_to_day') {
      label = 'wt_day_to_day';
      description =
            ['Weight,',
             'day to',
             'day'];
    }  else if (metric === 'wt_clim') {
      label = 'wt_clim';
      description =
            ['Weight',
             'Climate'];
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


  const MetricsBox = () => {
    return(
      <>
      <Box sx={{ ...sx.label, mt: [4] }}>Select Metrics</Box>
      <Filter
        values={metrics}
        setValues={setMetrics}
        setValues={handleClimateMetricsChange}
      />
      <div  style={{ width: '100%', maxWidth: '320px' }}>
      <Filter values={metricsAll} setValues={setMetricsAll} multiSelect={true} />
      </div>
      </>
    );
   };


  const handleBandChange = useCallback((e) => {
    const band = e.target.value;
    setBand(band);
  });

  const { map } = useMapbox()

  const resetLatLon = () => {
    if (map) {
      map.jumpTo({
        center: [settings.lon, settings.lat],
        zoom: settings.zoom,
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
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
    let safe_modelDif = checkDownscalingModel(downscalingDif, true);
    let safe_ensembleDif = checkModelEnsemble(safe_modelDif, downscalingDif);
    setModelDif(safe_modelDif);
    setUrl(baseDir, downscalingDif, safe_modelDif, yearRangeDif,
           safe_ensembleDif, dif_t);
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

  function checkDownscalingModel(downscaling, dif=false) {
    let mod = model
    if (!mod) {
      return mod;
    }

    if (computeChoice['Climate Signal']) {
      const modList = Object.keys(settings.model_climateSignal[downscaling] || {});
      if (!modList.includes(mod)) {
        mod = modList[0];
        if (!dif) {
          setModel(mod);
        } else {
          setModelDif(mod);
        }
      }
    } else {
      const modList = Object.keys(settings.model[downscaling] || {});
      if (!modList.includes(mod)) {
        mod = modList[0];
        if (!dif) {
          setModel(mod);
        } else {
          setModelDif(mod);
        }
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
      setUnits('num. months SPI < -1.5');
    } else if (metric === 'drought_2yr') {
      setBand('d2yr');
      setUnits('num. months SPI < -1.5');
    } else if (metric === 'drought_5yr') {
      setBand('d5yr');
      setUnits('num. months SPI < -1.5');
    } else if (metric === 'wt_clim') {
      // setBand('wtcl');
      setUnits('recreate dataset');
    } else if (metric === 'wt_day_to_day') {
      // setBand('wtds');
      setUnits('recreate dataset');
    } else if (metric === 'tpcorr') {
      setBand('tpco');
      setUnits('correlation');
    }

    else {
      setUnits('fill in missing units for '+metric);
    }

    // else if (metric === '') {
    //   setBand('');
    //   setUnits('');
    // }


    // else if (metric === 'drought_5yr') {
    //   setBand('d5yr');
    //   setUnits('num. months SPI < -1');
    // } else if (metric === 'drought_5yr') {
    //   setBand('d5yr');
    //   setUnits('num. months SPI < -1');
    // } else if (metric === 'drought_5yr') {
    //   setBand('d5yr');
    //   setUnits('num. months SPI < -1');
    // }  // Add     'tpcorr',      'wt_day_to_day',      'wt_clim',

    if (computeChoice['Dif.'] || computeChoice['Climate Signal']) {
      setClim([Clim_Ranges['dif_'+metric].min, Clim_Ranges['dif_'+metric].max]);
      setColormapName(Default_Colormaps['dif_'+metric]);
      setScaleDif(Scale_Values['dif_'+metric]);
    } else if (computeChoice['Ave.']) {
      setClim([Clim_Ranges[metric].min, Clim_Ranges[metric].max]);
      setColormapName(Default_Colormaps[metric]);
    }
  });

  const makeMetricsState = () =>
        Object.fromEntries(
          (region_metric_settings[metricRegion].metrics).map((metric) => [
            metric,
            true, // default metrics setting
          ])
        );
  const [metricsAll, setMetricsAll] = useState(() => makeMetricsState());


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

  // const [metricPerformance, setMetricPerformance] = //useState(true);
  //         useState({ "Metric Performance": false });
  const [methodAndModel, setMethodAndModel] = //useState(false);
          useState({ "Method & Model": true });

  const [differenceChoice, setDifferenceChoice] =
          useState({ "Dataset A": true, "Dataset B": false });
  const [difObsOrDataChoice1, setObsOrDataChoice1] =
          useState({ "Model": true, "Observation": false });
  const [difObsOrDataChoice2, setObsOrDataChoice2] =
          useState({ "Model": true, "Observation": false });
          // useState({ "Model": false, "Observation": true });


  const [metrics, setMetrics] = useState({ all: true, clear: false});

  const countNumMetrics = () => {
    let count = 0;
    for (const key in metricsAll) {
      if (metricsAll[key] === true) count++;
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
  const combinations = metrics_settings['combinations'];
  const combinations_downscaling = metrics_settings['combinations_downscaling'];
  const combinations_model = metrics_settings['combinations_model'];

  // TODO SCORES METRIC
  // --- SCORES ---
  const [metric_scores, setMetricScores] =
        useState(metrics_settings['scores']['combstd']);
  function addScores(a,b){
        return a.map((e,i) => e + b[i]);
  };

  useEffect(() => {
    let currentScore = Array(metrics_settings.num_datasets).fill(0);

    // metrics_settings.combinations.forEach((val, i) => {
    //     if (val === "MACA with ACCESS1-3" ||
    //         val === "NASA-NEX with ACCESS1-3" ||
    //         val === "NASA-NEX with CCSM4"
    //        ) {
    //       currentScore[i] += 999;
    //     }
    // });

    // calculate scores
    for (const key in metricsAll) {
      if (metricsAll[key] === true && metric_scores[key] !== undefined) {
        if (debug) console.log(key,' addscores')
        currentScore = addScores(currentScore, metric_scores[key]);
      }
    }

    if (debug) console.log("numMetrics =", numMetrics);
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

      const scoreFunc = Math.min;
      const scoreNull = 9999;

      for (let n = 0; n < numClimateSignalSets; n++) {
        let i = currentScore.indexOf(scoreFunc(...currentScore));
        if (debug) {
          console.log("score =", currentScore[i], "for ", combinations[i]);
        }
        combo.push(combinations[i]);
        downscaling.push(combinations_downscaling[i]);
        model.push(combinations_model[i]);
        currentScore[i] = scoreNull; // only use combination once
      }
      setTopCombination(combo);
      setTopDownscaling(downscaling);
      setTopModel(model);
    }
  }, [numMetrics,
      scheme, metric_scores, metricRegion,
      setMetricsAll,
      numClimateSignalSets,
     ]);
  // add region??


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
      const yearRange = Object.keys(settings.past_eras)[0];
      setYearRange(yearRange);
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
    setShouldUpdateMapSource(prev => !prev);
  });

  useEffect(() => {
    if (metricPerformance["Metric Performance"] &&
        (computeClimateSignal['COMPUTE'] === false)) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  }, [computeClimateSignal, metricPerformance]);

  // if these variables change, stop displaying the map until user
  // presses compute again
  useEffect(() => {
    setComputeClimateSignal({'COMPUTE': false});
  }, [metrics, metricsAll,
      scheme, metricRegion, rcpValues, numClimateSignalSets,
      yearRange,
     // MORE TO THIS?
     ]);

  useEffect(() => {
    if (!showRegionPlot && shouldUpdateMapSource) {
      console.log("COMPUTE top combination =", topCombination);
      let downscaling_l = topDownscaling[0];
      let model_l = topModel[0];
      const time = getYearRangeString(yearRange)
      let url = [bucket+baseDir+downscaling_l+'/'+model_l+'/'+time+'/'+fname];
      const numClimateSignalSets_i = parseInt(numClimateSignalSets, 10);

      console.log("COMPUTE i=",0);
      console.log("COMPUTE should be adding url = ",url);

      setUrl(baseDir, downscaling_l, model_l, yearRange, ensemble);
      setDownscaling(downscaling_l);
      setModel(model_l);
      setShouldUpdateMapSource(false); // Reset the flag
      // const local_filterValue = {'Ave.': false, 'Dif.': true,
      //                            'Climate Signal': false};
      // handleFilterAndSetClimColormapName(local_filterValue);

      for (let i=1; i<numClimateSignalSets_i; i++) {
        console.log("COMPUTE i=",i);
        downscaling_l = topDownscaling[i];
        model_l = topModel[i];
        addUrlArrayMember(downscaling_l, model_l, yearRange, ensemble);
      }
    }
  }, [showRegionPlot, shouldUpdateMapSource]);


  // If not all metrics are selected, make sure all is false
  useEffect(() => {
    const numSelected = countNumMetrics();
    setNumMetrics(numSelected);

    if (Object.values(metricsAll).includes(false)) {
      setMetrics({all: false, clear: false});
    } else {
      setMetrics({all: true, clear: false});
    }
  }, [metricsAll, scheme, metricRegion, rcpValues]);


  const handleClimateMetricsChange = useCallback((e) => {
    const all = e.all;
    const clear = e.clear;

    if (all) {
      setMetrics({all: true, clear: false});
      setMetricsAll(
        Object.fromEntries(
          Object.keys(metricsAll).map((key) => [key, true])
        )
      );
    } else if (clear) {
      setMetrics({all: false, clear: false});
      setMetricsAll(
        Object.fromEntries(
          Object.keys(metricsAll).map((key) => [key, false])
        )
      );
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
    console.log("DEBUG: handleobschange region=", region)
    setObs(obs_l);
    let region_l = null;
    if (settings.obs_lev2 != null) {
      region_l = region
    }
    setObsUrl(obs_l, yearRange, dif_false, region_l);
  });
  const handleObsDifChange = useCallback((e) => {
    const obs_l = e.target.value;
    console.log("DEBUG: handleobschange region=", region)
    setObsDif(obs_l);
    setObsUrl(obs_l, yearRangeDif, dif_true);
    // let region_l = null;
    // if (settings.obs_lev2 != null) {
    //   region_l = region
    // }
    // setObsUrl(obs_l, yearRangeDif, dif_true, region_l);
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
        setDisplay(true);
          console.log("FOO: ",{ "Metric Performance": false });
	  // make sure metric geojson lines are off
          setMetricPerformance({ "Metric Performance": false });
	  setMethodAndModel({"Method & Model": true});

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
      <Box>TOP DATASET</Box>
      </>
      );
    } else {
      return(
      <>
      <Box>TOP {numClimateSignalSets} DATASETS</Box>
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
        sx={{mb:2}}
      />
      <BestPerformingBox topCombination={topCombination}/>
      </>
    );
  };

  const ClimateSignalComputeButton = () => {
    return(
      <>
      <Box>COMPUTE CLIMATE SIGNAL</Box>
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

  const BestPerformingBox = ({ topCombination }) => {
    if (topCombination === "Select Metrics") {
      return <Box>{topCombination}</Box>;
    }
    const items = Array.isArray(topCombination) ? topCombination : [];

    return (
      <Box as="ul" sx={{ listStyle: 'none', p: 0, m: 0, mb: 4 }}>
        {items.map((item, idx) => (
          <Box
            as="li"
            // prefer item as key; fallback to idx
            key={typeof item === 'string' && item ? item : idx}
            sx={{ mb: 1 }}
          >
            {item}
          </Box>
        ))}
      </Box>
    );
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

    // this hack was breaking the options after hitting COMPUTE
    // if (downscaling_l == 'gard_r2' ||
    //     downscaling_l == 'gard_r3') {
    //   future = false;
    // }  ! FOOBAR
    const options = {
      ...(past ? settings.past_eras : {}),
      ...(future ? settings.future_eras : {}),
    };

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
    var yearRange_l;
    let showMetricLabel;
    if (!dif) {
      downscalingChange = handleDownscalingChange;
      downscalingVar = downscaling;
      modelChange = handleModelChange;
      modelVar = model;
      yearRange_l = yearRange
    } else {
      downscalingChange = handleDownscalingDifChange;
      downscalingVar = downscalingDif;
      modelChange = handleModelDifChange;
      modelVar = modelDif;
      yearRange_l = yearRangeDif
    }
    showMetricLabel = Object.keys(settings.past_eras).includes(yearRange_l)

    let downscaling_d, model_d
    if (climateSignal == false) {
      downscaling_d = Object.keys(settings.past_eras).includes(yearRange_l)
        ? settings.downscaling_past
        : settings.downscaling_future;

      model_d = settings.model[downscaling];
    } else {
      downscaling_d = settings.downscaling_climateSignal;
      model_d = settings.model_climateSignal[downscaling];
      // console.log("DD=",downscaling_d);
      // console.log("MD=",model_d);
      // console.log("downscaling", downscaling)
    }

    return(
      <>
      {/* <Box sx={{ position: 'absolute', top: 20, left: 20 }}>*/}

      {computeChoice['Ave.'] &&
       <YearRangeBox downscaling_l={downscalingVar} />}


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
      {/*(!computeChoice['Climate Signal'] && showMetricLabel)
       && setMetricLabel()*/}
      {(!computeChoice['Climate Signal'])
       && setMetricLabel()}
      {/* </Box> */}
    </>
  ); // end of MapChoicesBox return statement
  };

  const AveChoiceBox = () => {
    if (aveChoice['Modeling']) {
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

  useEffect(() => {
    setMetricsSettings(region_metric_settings[metricRegion]);
  }, [metricRegion]);


  useEffect(() => {
    console.log("COMPUTE SOURCE =", mapSource);
  }, [mapSource]);

  // call setMetricScores when scheme or region changes
  useEffect(() => {
    const metrics_settings_l = region_metric_settings[metricRegion];
    setMetricScores(metrics_settings_l['scores'][scheme]);
  }, [scheme, metricRegion]);


  const handleMetricRegionChange = useCallback((e) => {
    const metricRegion = e.target.value;
    setMetricRegion(metricRegion);
  });

  const MetricRegionChoiceBox = () => {
    console.log("metric region =", metricRegion);
    return(
      <>
      <Box sx={{ ...sx.label, mt: [4] }}>Region</Box>
      <Select
        sxSelect={{ bg: 'transparent' }}
        size='xs'
        onChange={handleMetricRegionChange}
        sx={{ mt: [1] }}
        value={metricRegion}
      >
      {Object.entries(settings.metricRegions).map(([key, label]) => (
          <option key={key} value={key}>
          {label}
        </option>
      ))}
      </Select>
      </>
    );
  }

  const ClimateSignalBox = ({numMetrics}) => {
    if (metricPerformance["Metric Performance"]) {
      return(
        <>
          <ClimateSignalChoiceBox />
          <MetricRegionChoiceBox />
          <ClimateSignalBoxMetrics />
          {setMetricLabel()}
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
          {setMetricLabel()}
        </>
      );
    }
  };

  /* TODO */
  /* add arguments to mapchoicesbox */
  const DifferenceBox = ({numMetrics}) => {
    let futureChoice1 = true;
    let futureChoice2 = true;

    if (difObsOrDataChoice1['Observation']) {
      futureChoice1 = false;
    }
    if (difObsOrDataChoice2['Observation']) {
      futureChoice2 = false;
    }

    if (differenceChoice["Dataset A"]) {
      return(
        <Box sx={{ mt: 0 }}>
          <DifferenceChoiceBox
             obsOrDataChoice={difObsOrDataChoice1}
             setObsOrDataChoice={setObsOrDataChoice1} />
          <YearRangeBox value={yearRange} downscaling_l={downscaling}
                        future={futureChoice1}
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
                        future={futureChoice2} dif={dif_t}
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
          // {schemeLabels[key]}


  const handleSchemeChange = useCallback((e) => {
    const scheme = e.target.value;
    setScheme(scheme);
    // setObsUrl(obs, yearRange, dif_false, region);
  });

  const SchemeBox = () => {
    return(
      <>
      <Box sx={{ ...sx.label, mt: [4] }}>Normalization Scheme</Box>
      <Select
        sxSelect={{ bg: 'transparent' }}
        size='xs'
        onChange={handleSchemeChange}
        sx={{ mt: [1] }}
        value={scheme}
      >
      {Object.entries(metrics_settings.schemes).map(([key, label]) => (
          <option key={key} value={key}>
          {label}
          </option>
      ))}
      </Select>
      </>
    );
  };

  const ClimateSignalBoxMetrics = ({numMetrics}) => {
    return(
      <>
      <SchemeBox />
      <MetricsBox />

      <Box sx={{mt:4}}>FUTURE RCP SCENARIO</Box>
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
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <DifferenceLegend />
        </Box>
      )}

      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
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


  const scrollref = useRef(null);
  const lastTop = useRef(0);

  const ComputeChoiceBox = () => {
    // restore after each render
    useLayoutEffect(() => {
      if (scrollref.current) scrollref.current.scrollTop = lastTop.current;
    });
    return(
    <Box
      ref={scrollref}
      onScroll={(e) => (lastTop.current = e.currentTarget.scrollTop)}
      sx={{ position: 'absolute', top: 20, left: 20, zIndex: 1000,
            maxHeight: '95vh', overflowY: 'auto',
            backgroundColor: 'rgba(0,0,0,0.9)', p: '10px', borderRadius: '5px',
            overflowAnchor: 'none' }}    >
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
