import { useState } from 'react'
import { Box, useThemeUI } from 'theme-ui'
import { Dimmer, Meta, Column, Row } from '@carbonplan/components'
import { Map, Raster, Fill, Line, RegionPicker } from '@carbonplan/maps'
import { useThemedColormap } from '@carbonplan/colormaps'
import RegionPlot from '../components/region-plot'
import ParameterControls from '../components/parameter-controls'
import {options, linedata, linedata_stub} from '../components/plot-line';
import { Line as LineCJS } from 'react-chartjs-2';

const bucket = 'https://carbonplan-maps.s3.us-west-2.amazonaws.com/'

// this works
// const bucket_ndp = 'https://scrasmussen.github.io/'
// this should work
const bucket_ndp = 'http://127.0.0.1:4000/downscaling/'
// const source = bucket_ndp + 'tavg-prec-month.zarr'
// const bucket_ndp = 'http://localhost:4000/'
// const bucket_ndp = 'http://localhost:8080/'
// const bucket_ndp = 'http://localhost:4000/127.0.0.1'
// const fname = 'tavg-prec-month.zarr'

const Index = () => {
  const { theme } = useThemeUI()
  const [display, setDisplay] = useState(true)
  const [debug, setDebug] = useState(false)
  const [opacity, setOpacity] = useState(1)
  // const [clim, setClim] = useState([270, 310]) // tavg
  const [clim, setClim] = useState([0, 60]) // precip
  const [month, setMonth] = useState(1)
  const [time, setTime] = useState(1)
  // const [band, setBand] = useState('tavg')
  const [band, setBand] = useState('prec')
  // const [colormapName, setColormapName] = useState('warm') // tavg
  const [colormapName, setColormapName] = useState('cool') // precip
  const colormap = useThemedColormap(colormapName)
  const [showRegionPlot, setShowRegionPlot] = useState(false)
  const [regionData, setRegionData] = useState({ loading: true })
// new stuff
  const [downscaling, setDownscaling] = useState('icar')
  const [model, setModel] = useState('noresm')
	const [fname, setFname] = useState('tavg-prec-month.zarr')
	const [source, setSource] = useState(bucket_ndp+'/icar/noresm/'+fname)

  const getters = { display, debug, opacity, clim, month, band, colormapName,
									downscaling, model, source, bucket_ndp}
  const setters = {
    setDisplay,
    setDebug,
    setOpacity,
    setClim,
    setMonth,
    setTime,
    setBand,
    setColormapName,
		setDownscaling,
		setModel,
		setSource
  }

  return (
    <>
      <Meta
        card={'https://images.carbonplan.org/social/maps-demo.png'}
        description={
          'Demo of our library for making interactive multi-dimensional data-driven web maps.'
        }
        title={'@carbonplan/maps'}
      />
<Row columns={[6]}>
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
            colormap={colormap}
            clim={clim}
            display={display}
            opacity={opacity}
            mode={'texture'}
            // source={bucket + 'v2/demo/4d/tavg-prec-month'}
			      // this works when hosting on github
            source={source}
            variable={'climate'}
            selector={{ month, band }}
            // selector={{ band }}
            regionOptions={{ setData: setRegionData }}
          />
          <RegionPlot
            band={band}
			      // this works when hosting on github
            source={source}
            regionData={regionData}
            showRegionPlot={showRegionPlot}
            setShowRegionPlot={setShowRegionPlot}
          />
        </Map>
        <ParameterControls getters={getters} setters={setters}
			bucket={bucket_ndp} fname={fname} />
      </Box>
  </Column>

  <Column start={[1]} width={[1]}>
   <Box
      sx={{
        color: 'blue',
        backgroundColor: 'lightgray',
				bottom: 0, right: 0,
        padding: 2,
        fontSize: 16,
				position: 'fixed',
				height: '20%',
		  	width: '100%' }}>
			<LineCJS options={options}
			data={
					// linedata({source:source})
					linedata_stub
					 } />
    </Box>
  </Column>
</Row>
    </>
  )
}

export default Index
