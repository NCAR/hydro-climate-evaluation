import { useState } from 'react';
import { useRef, useEffect } from 'react';
import { Box, useThemeUI } from 'theme-ui';
import { Dimmer, Column, Row } from '@carbonplan/components';
import { Map, Raster, Fill, Line, RegionPicker, useControls } from '../maps';
import Meta from '../components/meta';
import { useThemedColormap } from '../colormaps/src';
import RegionPlot from '../components/region-plot';
import ParameterControls from '../components/parameter-controls';
import {options, linedata, linedata_stub} from '../components/plot-line';
import { Line as LineCJS } from 'react-chartjs-2';
import Charts from '../components/charts';
import ErrorBoundary from '../components/ErrorBoundary';
// import MetricControls from '../components/metric-controls'
// import { NetCDFReader } from "netcdfjs";

// option to use external zarr files only
const TESTING = false;

// location of the map and pbf shape files
const bucket_ndp = 'https://hydro.rap.ucar.edu/hydro-climate-eval/data/';
// original hosting site
// const bucket = 'https://carbonplan-maps.s3.us-west-2.amazonaws.com/';
// local data address for testing
// const bucket_ndp = 'http://127.0.0.1:4000/data/';

const Index = () => {

  const { theme } = useThemeUI();
  const [sideBySide, setSideBySide] = useState(false);

  // const controls = useControls();
  // const [center, setCenter] = useState(controls.center);
  // const [zoom, setZoom] = useState(controls.zoom);
  // controlArgs={{controls, center, setCenter, zoom, setZoom}}

  if (sideBySide){
    return(
      <div key={sideBySide} style={{ display: 'flex', width: '100%', height: '100vh' }}>
        <Box sx={{ flex: 1, backgroundColor: '#f0f0f0', position: 'relative' }}>
          <ClimateMapInstance sideBySideArgs={{sideBySide, setSideBySide}} />
        </Box>
        <Box sx={{ flex: 1, backgroundColor: '#e0e0e0', position: 'relative' }}>
          <ClimateMapInstance
            sideBySideArgs={{sideBySide, setSideBySide}}
           />
        </Box>
      </div>
    );
  } else {
      return(
        <div key={sideBySide} style={{ display: 'flex', width: '100%', height: '100vh' }}>
          <Box sx={{ flex: 1, backgroundColor: '#f0f0f0', position: 'relative' }}>
          <ClimateMapInstance sideBySideArgs={{sideBySide, setSideBySide}}
          />
          </Box>
        </div>
    );
  }
};


const ClimateMapInstance = ({ sideBySideArgs, controlArgs }) => {
  const { sideBySide, setSideBySide } = sideBySideArgs;
  // const {controls, center, setCenter, zoom, setZoom} = controlArgs;

  const { theme } = useThemeUI();
  const [display, setDisplay] = useState(true);
    console.log("INDEX SET DISPLAY =",setDisplay);
  const [reload, setReload] = useState(true);
  const [debug, setDebug] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [month, setMonth] = useState(1);
  const [time, setTime] = useState(1);
  // --- precipitation defaults
  const [band, setBand] = useState('djft');
  const [colormapName, setColormapName] = useState('BuYlRd');
  const [clim, setClim] = useState([-10, 15]);

  const colormap = useThemedColormap(colormapName);
  const [showClimateChange, setShowClimateChange] = useState(false);
  const [showRegionPlot, setShowRegionPlot] = useState(false);
  const [regionData, setRegionData] = useState({ loading: true });
  // set variables to access datasets
  const [downscaling, setDownscaling] = useState('icar');
  const [model, setModel] = useState('access1_3');
  const [metric, setMetric] = useState('djf_t');
  const [rcp, setRCP] = useState('4.5');

  const [bucketRes, setBucketRes] = useState(
    {'Low': true,
     'High': false});

  // const [yearRange, setYearRange] = useState('1980_2010')
  const [yearRange, setYearRange] = useState('1981_2004', '2070_2100');
  // diff dataset variables for model to compare against
  const [scaleDif, setScaleDif] = useState(1.0);
  const [downscalingDif, setDownscalingDif] = useState('nasa_nex');
  const [modelDif, setModelDif] = useState('canesm2');
  const [yearRangeDif, setYearRangeDif] = useState('1981_2004');
  const [obs, setObs] = useState('livneh');
  const [obsDif, setObsDif] = useState('livneh');

  const [showStates, setStates] = useState(true);
  const [showRivers, setRivers] = useState(false);
  const [showHuc2, setHuc2] = useState(false);

  const [fname, setFname] = useState('data.zarr');
  // paths to model dataset
  // const [mapSource, setMapSource] =
  //         useState([bucket_ndp+'map/icar/noresm1_m/1981_2004/'+fname])
  const [mapSource, setMapSource] =
          useState([bucket_ndp+'map/icar/access1_3/1981_2004/'+fname]);
  const [chartSource, setChartSource] =
          useState(bucket_ndp+'chart/icar/noresm1_m/'+band);
  // paths to model dataset used for diff
  // const [mapSourceDif, setMapSourceDif] =
  //         useState(bucket_ndp+'map/icar/cesm/1980_2010/'+fname);
  // const [mapSourceDif, setMapSourceDif] =
  //         useState(bucket_ndp+'map/icar/noresm1_m/1981_2004/'+fname);
  const [mapSourceDif, setMapSourceDif] =
          useState(bucket_ndp+'obs/'+obsDif+'/1981_2004/'+fname);
  const [chartSourceDif, setChartSourceDif] =
          useState(bucket_ndp+'chart/icar/cesm/'+band);
  // set values to decide whether to map average or difference
  // const [filterValues, setFilterValues] = useState({'Ave.': true,
  //                                                   'Dif.': false});
  const [computeChoice, setComputeChoice] = useState({
    'Ave.': true,
    'Dif.': false,
    'Climate Signal': false,
  });

  // control the height of the charts, initially hidden
  const [chartHeight, setChartHeight] = useState('0%');
  const [chartData, setChartData] = useState(Array(12).fill(0));

  const getters = { display, reload, debug, opacity, clim,
                    month, band, colormapName, colormap,
                    downscaling, model, metric,
                    yearRange, mapSource, chartSource,
                    downscalingDif, modelDif, yearRangeDif, obs, obsDif,
                    mapSourceDif, chartSourceDif, scaleDif,
                    bucket_ndp, chartHeight, computeChoice,
                    showClimateChange, showRegionPlot, bucketRes,
                    showStates, showRivers, showHuc2, sideBySide};
  const setters = {
    setDisplay,
    setReload,
    setDebug,
    setOpacity,
    setClim,
    setMonth,
    setTime,
    setBand,
    setColormapName,
    setDownscaling,
    setModel,
    setMetric,
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
  };

  const fillValue = 3.4028234663852886e38; // black on land, red nans



  return (
  <ErrorBoundary>
    <>
    <Meta
      card={'https://ncar.ucar.edu/profiles/custom/ncar_ucar_umbrella/themes/custom/koru/libraries/koru-base/img/app-favicons/ncar/favicon.ico'}
      description={"Climate Evaluation of Downscaling and Climate Model data. Based on Carbonplan's Maps"}
      title={'Hydro-Climate Evaluation'}
    />
    <Row columns={[4]}>
    <Column start={[1]} width={[1]}>
    <Box sx={{ position: 'absolute', top: 0, bottom: 0, width: '100%', height:'100%',
               backgroundColor: '#bbdaa4', zIndex: 0}}>
    {/* zoom to this location when page first loads */}
    <Map zoom={4} center={{lon:-97, lat:38}} debug={debug}>
    <Fill
      color={'#4a80f5'}
      source={bucket_ndp + 'basemaps/ocean'}
      variable={'ocean'}
    />
    <Line
      color={theme.rawColors.primary}
      source={bucket_ndp + 'basemaps/land'}
      variable={'land'}
    />

    {showStates && (
    <Line
      color={'black'}
      source={bucket_ndp + 'basemaps/states/ne_110m_admin_1_states_provinces_lakes.json'}
      variable={'United States of America'}
      ndp={false}
    />)}

    {showRivers && (
    <Line
      color={'black'}
      source={bucket_ndp + 'basemaps/rivers/rivers.3percent.geojson'}
      ndp={false}
    />)}

    {showHuc2 && (
    <Line
      color={'black'}
      source={bucket_ndp + 'basemaps/huc/huc2-basins-1percent.geojson'}
      blur={1.0}
      ndp={false}
      dashArray={[2, 4]}
    />)}

    {/*
      source={bucket_ndp + 'basemaps/rivers/ne_10m_rivers_north_america.json'}
    */}

    {/*
    <Line
      color={'red'}
      source={bucket_ndp + 'basemaps/huc/huc2-basins.geojson'}
      ndp={false}
    />;
    */}

    {/*
    <Line
      color={'black'}
      source={bucket_ndp + 'basemaps/states/us-states.json'}
      variable={'state'}
      ndp={false}
    />;
    <Line
      color={'red'}
      source={bucket_ndp + 'basemaps/states/rivers.geojson'}
      ndp={false}
    />;
    */}

    {showRegionPlot && (
     <RegionPicker
       color={theme.colors.primary}
       backgroundColor={theme.colors.background}
       fontFamily={theme.fonts.mono}
       fontSize={'14px'}
       maxRadius={200}
     />)}

    <Raster
      key={`${mapSource}-${mapSourceDif}-${reload}-${sideBySide}-${JSON.stringify(computeChoice)}`}
      colormap={colormap}
      clim={clim}
      display={display}
      opacity={opacity}
      mode={'texture'}
      sources={mapSource}
      sourceDif={mapSourceDif}
      fillValue={fillValue}
      variable={'climate'}
      selector={{ band }}
      // selector={{ month, band }}
      filterValue={computeChoice}
      setDisplay={setDisplay}
      // selector={{ month, band, source }}
      regionOptions={{ setData: setRegionData }}
      // controls={controls}
      // zoom={zoom}
      // setZoom={setZoom}
      // center={center}
      // setCenter={setCenter}
    />
    {/*
    <RegionPlot
      band={band}
      source={mapSource}
      regionData={regionData}
      showRegionPlot={showRegionPlot}
      setShowRegionPlot={setShowRegionPlot}
    />
    */}

    </Map>

    <ParameterControls
      getters={getters}
      setters={setters}
      bucket={bucket_ndp}
      fname={fname}
    />

    </Box>
    </Column>

    {/*
    <Column start={[1]} width={[1]}>
     <Box
      sx={{
        color: 'blue',
        backgroundColor: 'lightgray',
        bottom: 0, right: 0,
        padding: 2,
        fontSize: 16,
        position: 'fixed',
        height: chartHeight,
        width: '100%' }}>
        <LineCJS options={options} data={ linedata_stub } />
      </Box>
    </Column>
    */}

    {/*
    <Charts
      chartHeight={chartHeight}
      source={chartSource}
      downscaling={downscaling}
      model={model}
      band={band}
      month={month}
      chartData={chartData}
      setChartData={setChartData}/>
    */}


    </Row>
    </>
  </ErrorBoundary>
  ) // end return statement
};

export default Index
