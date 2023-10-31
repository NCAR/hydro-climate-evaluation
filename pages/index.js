import { useState } from 'react'
import { Box, useThemeUI } from 'theme-ui'
import { Dimmer, Meta, Column, Row } from '@carbonplan/components'
import { Map, Raster, Fill, Line, RegionPicker } from '@carbonplan/maps'
import { useThemedColormap } from '@carbonplan/colormaps'
import RegionPlot from '../components/region-plot'
import ParameterControls from '../components/parameter-controls'
import {options, data} from '../components/plot-line';
import { Line as LineCJS } from 'react-chartjs-2';


const bucket = 'https://carbonplan-maps.s3.us-west-2.amazonaws.com/'
const bucket_ndp = 'http://localhost:4000/'
// const bucket_ndp = 'http://localhost:4000/127.0.0.1'

const Index = () => {
  const { theme } = useThemeUI()
  const [display, setDisplay] = useState(true)
  const [debug, setDebug] = useState(false)
  const [opacity, setOpacity] = useState(1)
  const [clim, setClim] = useState([0, 60])
  const [month, setMonth] = useState(1)
  const [time, setTime] = useState(1)
  const [band, setBand] = useState('prec')
  const [colormapName, setColormapName] = useState('warm')
  const colormap = useThemedColormap(colormapName)
  const [showRegionPlot, setShowRegionPlot] = useState(false)
  const [regionData, setRegionData] = useState({ loading: true })

  const getters = { display, debug, opacity, clim, month, band, colormapName }
  const setters = {
    setDisplay,
    setDebug,
    setOpacity,
    setClim,
    setMonth,
    setTime,
    setBand,
    setColormapName,
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
  <Column start={[1]} width={[3]}>
      <Box sx={{ position: 'absolute', top: 0, bottom: 0, width: '70%', height:'100%' }}>
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
            source={bucket_ndp + 'icar_zarr/tavg-prec-month.zarr'}

            // source={bucket_ndp + 'tavg-prec-month.zarr'}
            variable={'climate'}
            //selector={{ month, band }}
            selector={{ month, band }}
            regionOptions={{ setData: setRegionData }}
          />
          <RegionPlot
            band={band}
      			source={bucket_ndp + 'icar_zarr/tavg-prec-month.zarr'}
            regionData={regionData}
            showRegionPlot={showRegionPlot}
            setShowRegionPlot={setShowRegionPlot}
          />
        </Map>
        <ParameterControls getters={getters} setters={setters} />
      </Box>
  </Column>
  <Column start={[4]} width={[3]}>
   <Box
      sx={{
        color: 'blue',
        backgroundColor: 'lightgray',
				top: 0, right: 0,
        padding: 2,
        fontSize: 16,
				position: 'fixed',
		  	width: '30%' }}>
"The Earth's atmosphere is a complex and dynamic system that envelops our planet. It consists of several layers, including the troposphere, stratosphere, mesosphere, thermosphere, and exosphere. The troposphere, closest to the Earth's surface, is where weather occurs, and it contains most of the atmosphere's mass and moisture. Above the troposphere, the stratosphere is characterized by the presence of the ozone layer, which absorbs and scatters harmful ultraviolet (UV) radiation from the sun. The mesosphere is the layer in which meteors burn up upon entry into the atmosphere. Beyond this, the thermosphere is known for its extremely high temperatures but is sparsely populated with gas molecules. Finally, the exosphere marks the transition into space and extends into the vacuum of outer space. The composition of the atmosphere primarily includes nitrogen (about 78%) and oxygen (about 21%), with trace amounts of other gases, such as carbon dioxide, argon, and water vapor. This dynamic mixture of gases plays a crucial role in regulating our climate, weather patterns, and the overall habitability of our planet."
    </Box>
  </Column>

  <Column start={[4]} width={[3]}>
   <Box
      sx={{
        color: 'blue',
        backgroundColor: 'lightgray',
				bottom: 0, right: 0,
        padding: 2,
        fontSize: 16,
				position: 'fixed',
		  	width: '30%' }}>

			<LineCJS options={options} data={data} />
    </Box>
  </Column>



</Row>

    </>
  )
}

export default Index
