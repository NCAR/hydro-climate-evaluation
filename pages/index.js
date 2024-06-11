import { useState } from 'react'
import { Box, useThemeUI } from 'theme-ui'
import { Dimmer, Meta, Column, Row } from '@carbonplan/components'
// import { Map, Raster, Fill, Line, RegionPicker } from '@carbonplan/maps'
import { Map, Raster, Fill, Line, RegionPicker } from '../maps'
// import { Map, Fill, Line, RegionPicker } from '@carbonplan/maps'
// import Raster from '../components/maps/raster'
// import { useThemedColormap } from '@carbonplan/colormaps'
import { useThemedColormap } from '../colormaps/src'
import RegionPlot from '../components/region-plot'
import ParameterControls from '../components/parameter-controls'
import {options, linedata, linedata_stub} from '../components/plot-line';
import { Line as LineCJS } from 'react-chartjs-2';
import Charts from '../components/charts'

const bucket = 'https://carbonplan-maps.s3.us-west-2.amazonaws.com/'

// this works
// const bucket_ndp = 'https://scrasmussen.github.io/'
const bucket_ndp = 'http://127.0.0.1:4000/data/' // python host server

const Index = () => {
  const { theme } = useThemeUI()
  const [display, setDisplay] = useState(true)
  const [reload, setReload] = useState(true)
  const [debug, setDebug] = useState(false)
  const [opacity, setOpacity] = useState(1)
  const [month, setMonth] = useState(1)
  const [time, setTime] = useState(1)
  // --- precipitation defaults
  const [band, setBand] = useState('djft')
  const [colormapName, setColormapName] = useState('warm')
  const [clim, setClim] = useState([-10, 15])

  const colormap = useThemedColormap(colormapName)
  const [showRegionPlot, setShowRegionPlot] = useState(false)
  const [regionData, setRegionData] = useState({ loading: true })
  // set variables to access datasets
  const [downscaling, setDownscaling] = useState('icar')
  const [model, setModel] = useState('noresm1_m')
  const [metric, setMetric] = useState('djf_t')
  // const [yearRange, setYearRange] = useState('1980_2010')
  const [yearRange, setYearRange] = useState('1981_2004')
  // diff dataset variables for model to compare against
  const [scaleDif, setScaleDif] = useState(1.0)
  const [downscalingDif, setDownscalingDif] = useState('icar')
  const [modelDif, setModelDif] = useState('cesm')
  const [yearRangeDif, setYearRangeDif] = useState('1981_2004')
  const [obsDif, setObsDif] = useState('conus404')

  // const [fname, setFname] = useState('tavg-prec-month.zarr')
  const [fname, setFname] = useState('data.zarr')
  // paths to model dataset
  const [mapSource, setMapSource] = useState(bucket_ndp+'map/icar/noresm1_m/1981_2004/'+fname)
  const [chartSource, setChartSource] = useState(bucket_ndp+'chart/icar/noresm1_m/'+band)
  // paths to model dataset used for diff
  // const [mapSourceDif, setMapSourceDif] = useState(bucket_ndp+'map/icar/cesm/1980_2010/'+fname)
  // const [mapSourceDif, setMapSourceDif] = useState(bucket_ndp+'map/icar/noresm1_m/1981_2004/'+fname)
  const [mapSourceDif, setMapSourceDif] = useState(bucket_ndp+'obs/conus404/1981_2004/'+fname)
  const [chartSourceDif, setChartSourceDif] = useState(bucket_ndp+'chart/icar/cesm/'+band)
  // set values to decide whether to map average or difference
  const [filterValues, setFilterValues] = useState({'Ave.': true, 'Dif.': false})
  // const [filterValues, setFilterValues] = useState({'Ave.': true, 'Dif.': false,
  //                                                  'Obs.': false})

  // control the height of the charts, initially hidden
  const [chartHeight, setChartHeight] = useState('0%')
  const [chartData, setChartData] = useState(Array(12).fill(0))

  const getters = { display, reload, debug, opacity, clim,
                    month, band, colormapName, colormap,
                    downscaling, model, metric, yearRange, mapSource, chartSource,
                    downscalingDif, modelDif, yearRangeDif, obsDif,
                    mapSourceDif, chartSourceDif, scaleDif,
                    bucket_ndp, chartHeight, filterValues}
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
    setFilterValues
  }

  return (
    <>
      <Meta
        card={'https://images.carbonplan.org/social/maps-demo.png'}
        description={
          "Demo of presenting downscaling and climate model data. Based on carbonplan's library"
        }
        title={'@carbonplan/maps'}
      />
<Row columns={[4]}>
  <Column start={[1]} width={[1]}>
      <Box sx={{ position: 'absolute', top: 0, bottom: 0, width: '100%', height:'100%' }}>
        <Map zoom={2} center={[0, 0]} debug={debug}>
          <Fill
            color={theme.rawColors.background}
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
            />
          )}
          <Raster
            key={`${mapSource}-${mapSourceDif}-${reload}-${JSON.stringify(filterValues)}`}
            colormap={colormap}
            clim={clim}
            display={display}
            opacity={opacity}
            mode={'texture'}
            source={mapSource}
            sourceDif={mapSourceDif}
            variable={'climate'}
            selector={{ band }}
            // selector={{ month, band }}
            filterValue={filterValues}
            // selector={{ month, band, source }}
            regionOptions={{ setData: setRegionData }}
          />
          <RegionPlot
            band={band}
            source={mapSource}
            regionData={regionData}
            showRegionPlot={showRegionPlot}
            setShowRegionPlot={setShowRegionPlot}
          />
        </Map>
        <ParameterControls getters={getters} setters={setters}
                        bucket={bucket_ndp} fname={fname} />
      </Box>
  </Column>

        {/*< Outside Source = {source}*/}

{/*  <Column start={[1]} width={[1]}>
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

        <LineCJS options={options}
                 data={ linedata_stub } />
    </Box>
  </Column>
  */}

{/*  <Charts chartHeight={chartHeight}
      source={chartSource}
      downscaling={downscaling}
      model={model}
      band={band}
      month={month}
      chartData={chartData}
      setChartData={setChartData}/>*/}


</Row>
    </>
  )
}

export default Index
