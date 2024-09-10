import { useState } from 'react';
import { useRef, useEffect } from 'react';
import { Box, useThemeUI } from 'theme-ui';
import { Dimmer, Column, Row } from '@carbonplan/components';
import { Map, Raster, Fill, Line, RegionPicker } from '../maps';
import Meta from '../components/meta';
import { useThemedColormap } from '../colormaps/src';
import RegionPlot from '../components/region-plot';
import ParameterControls from '../components/parameter-controls';
import {options, linedata, linedata_stub} from '../components/plot-line';
import { Line as LineCJS } from 'react-chartjs-2';
import Charts from '../components/charts';
// import MetricControls from '../components/metric-controls'
// import { NetCDFReader } from "netcdfjs";

// option to use external zarr files only
const TESTING = false;

// base urls to zarr data
const bucket = 'https://carbonplan-maps.s3.us-west-2.amazonaws.com/';
const bucket_ndp = 'https://hydro.rap.ucar.edu/hydro-climate-eval/data/';

const Index = () => {
  const { theme } = useThemeUI();
  const [display, setDisplay] = useState(true);
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

  // const [yearRange, setYearRange] = useState('1980_2010')
  const [yearRange, setYearRange] = useState('1981_2004');
  // diff dataset variables for model to compare against
  const [scaleDif, setScaleDif] = useState(1.0);
  const [downscalingDif, setDownscalingDif] = useState('icar');
  const [modelDif, setModelDif] = useState('cesm');
  const [yearRangeDif, setYearRangeDif] = useState('1981_2004');
  const [obsDif, setObsDif] = useState('livneh');

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
  const [filterValues, setFilterValues] = useState({'Ave.': true,
                                                    'Dif.': false});
  // const [filterValues, setFilterValues] = useState({'Ave.': true,
  //                                                   'Dif.': false,
  //                                                   'Obs.': false});

  // control the height of the charts, initially hidden
  const [chartHeight, setChartHeight] = useState('0%');
  const [chartData, setChartData] = useState(Array(12).fill(0));

  const getters = { display, reload, debug, opacity, clim,
                    month, band, colormapName, colormap,
                    downscaling, model, metric,
                    yearRange, mapSource, chartSource,
                    downscalingDif, modelDif, yearRangeDif, obsDif,
                    mapSourceDif, chartSourceDif, scaleDif,
                    bucket_ndp, chartHeight, filterValues,
                    showClimateChange, showRegionPlot};
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
    setObsDif,
    setMapSourceDif,
    setChartSourceDif,
    setScaleDif,
    setChartHeight,
    setChartData,
    setFilterValues,
    setShowClimateChange,
    setShowRegionPlot
  };

  const fillValue = 3.4028234663852886e38; // black on land, red nans


  return (
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
      source={bucket + 'basemaps/ocean'}
      variable={'ocean'}
    />
    <Line
      color={theme.rawColors.primary}
      source={bucket + 'basemaps/land'}
      variable={'land'}
    />
    {showRegionPlot && (
     <RegionPicker
       color={theme.colors.primary}
       backgroundColor={theme.colors.background}
       fontFamily={theme.fonts.mono}
       fontSize={'14px'}
       maxRadius={200}
     />)}

    <Raster
      key={`${mapSource}-${mapSourceDif}-${reload}-${JSON.stringify(filterValues)}`}
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
      filterValue={filterValues}
      // selector={{ month, band, source }}
      regionOptions={{ setData: setRegionData }}
    />;
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
  ) // end return statement
};

export default Index
