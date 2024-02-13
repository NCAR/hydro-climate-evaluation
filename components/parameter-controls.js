import { useState } from 'react'
import { Box, Flex } from 'theme-ui'
import { useCallback } from 'react'
import { Filter, Table, Tag, Slider, Badge, Toggle, Select, Link } from '@carbonplan/components'
import { colormaps } from '@carbonplan/colormaps'
import { getData } from './getData'

const sx = {
  label: {
    fontFamily: 'mono',
    letterSpacing: 'mono',
    textTransform: 'uppercase',
    fontSize: [1, 1, 1, 2],
    mt: [3],
  },
}

const CLIM_RANGES = {
  tavg: { max: 310, min: 270 },
  prec: { max: 60, min: 0 }
}

const DEFAULT_COLORMAPS = {
  tavg: 'warm',
  prec: 'cool'
}

const ParameterControls = ({ getters, setters, bucket, fname }) => {
  const { display, debug, opacity, clim, month, band, colormapName,
          downscaling, model, mapSource, chartSource, chartHeight } = getters
  const {
    setDisplay,
    setDebug,
    setOpacity,
    setClim,
    setMonth,
    setBand,
    setColormapName,
    setDownscaling,
    setModel,
    setMapSource,
    setChartSource,
    setChartHeight,
    setChartData
  } = setters

  const [chartToggle, setChartToggle] = useState(false)

  // TODO: remove if not needed, fill-in to simplify path changes
  const handleDataChange = useCallback((e) => {

  })

  const handleBandChange = useCallback((e) => {
    const band = e.target.value
    setBand(band)
    setClim([CLIM_RANGES[band].min, CLIM_RANGES[band].max])
    setMapSource(bucket+'/map/'+downscaling+'/'+model+'/'+fname)
    setChartSource(bucket+'/chart/'+downscaling+'/'+model+'/'+band)
    getData({chartSource}, setChartData)
    setColormapName(DEFAULT_COLORMAPS[band])
  })

  const handleDownscalingChange = useCallback((e) => {
    const downscaling = e.target.value
    setDownscaling(downscaling)
    setMapSource(bucket+'/map/'+downscaling+'/'+model+'/'+fname)
    setChartSource(bucket+'/chart/'+downscaling+'/'+model+'/'+band)
    getData({chartSource}, setChartData)
  })

  const handleModelChange = useCallback((e) => {
    const model = e.target.value
    setModel(model)
    console.log("e =", e.target.value)
    console.log("model =", bucket+'/'+downscaling+'/'+model+'/')
    setMapSource(bucket+'/map/'+downscaling+'/'+model+'/'+fname)
    setChartSource(bucket+'/chart/'+downscaling+'/'+model+'/'+band)
    getData({chartSource}, setChartData)
  })

  const handleChartChange = useCallback((e) => {
    const model = e.target.value
    setChartHeight('20%')
  })


  const ClickRow = () => {
    const [value, setValue] = useState(true);
    return (
      <Tag value={value} onClick={() => setValue((prev) => !prev)}>
        Click me
      </Tag>
    );
  };

  const AveDifFilter = () => {
  const [values, setValues] =
        useState({'Ave.': true, 'Dif.': false})
        // useState({One: true, Two: false, Three: false})
  return (
    <Filter
      values={values}
      setValues={setValues}
      multiSelect={false}
    />
  );
};


  const [year, setYear] = useState(1980)

  return (
    <>
      <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
        <Flex
          sx={{
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 4,
          }}
        >

{/*
          <Box>
            <Box sx={{ ...sx.label, mt: [0] }}>Tile boundaries</Box>
            <Toggle
              sx={{ float: 'right', mt: [2] }}
              value={debug}
              onClick={() => setDebug((prev) => !prev)}
            />
          </Box>

          <Box>
            <Box sx={{ ...sx.label, mt: [0] }}>Display</Box>
            <Toggle
              sx={{ display: 'block', float: 'right', mt: [2] }}
              value={display}
              onClick={() => setDisplay((prev) => !prev)}
            />
          </Box>

             onClick={() => {
               setChartToggle((prev) => !prev);
               setChartHeight((chartHeight) => (chartHeight === '0%' ? '20%' : '0%'))}
            />


 */}

{/*
          <Box>
            <Box sx={{ ...sx.label, mt: [0] }}>Charts</Box>
            <Toggle
              sx={{ chartToggle: 'block', float: 'right', mt: [2] }}
              value={chartToggle}
              onClick={() => {
               getData({source}, setChartData);
               setChartToggle((prev) => !prev);
               setChartHeight((prevHeight) => (prevHeight === '0%' ? '25%' : '0%'));
               }}
            />
          </Box>
 */}
<Table
  color={'secondary'}
  columns={[1]}
  start={[[1]]}
  width={[
    [1],
    [1],
    [1],
  ]}
  data={[
    [
     <Box>
     <Box sx={{ ...sx.label, maxWidth: 50,      mx: 'auto',
                px: 0, mt: [1] }}>Charts</Box>
        <Toggle
        sx={{ chartToggle: 'block', mx: 3, mt: [2] }}
        value={chartToggle}
        onClick={() => {
            getData({chartSource}, setChartData);
            setChartToggle((prev) => !prev);
            setChartHeight((prevHeight) => (prevHeight === '0%' ? '25%' : '0%'));
        }}
            />
      </Box>
      ],
    [<AveDifFilter />],
    [<ClickRow />],
  ]}
  borderTop={true}
  borderBottom={false}
  index={false}
  sx={{ my: [3] }}
  />
        </Flex>
      </Box>
      <Box sx={{ position: 'absolute', top: 20, left: 20 }}>

        <Box sx={sx.label}>Minimum</Box>
        <Slider
          min={CLIM_RANGES[band].min}
          max={CLIM_RANGES[band].max}
          step={1}
          sx={{ width: '175px', display: 'inline-block' }}
          value={clim[0]}
          onChange={(e) =>
            setClim((prev) => [parseFloat(e.target.value), prev[1]])
          }
        />
        <Badge
          sx={{
            bg: 'primary',
            color: 'background',
            display: 'inline-block',
            position: 'relative',
            left: [3],
            top: [1],
          }}
        >
          {clim[0].toFixed(0)}
        </Badge>
        <Box sx={sx.label}>Maximum</Box>
        <Slider
          min={CLIM_RANGES[band].min}
          max={CLIM_RANGES[band].max}
          step={1}
          sx={{ width: '175px', display: 'inline-block' }}
          value={clim[1]}
          onChange={(e) =>
            setClim((prev) => [prev[0], parseFloat(e.target.value)])
          }
        />
        <Badge
          sx={{
            bg: 'primary',
            color: 'background',
            display: 'inline-block',
            position: 'relative',
            left: [3],
            top: [1],
          }}
        >
          {clim[1].toFixed(0)}
        </Badge>

        {/* --- Month Slider ---*/}
        <Box sx={sx.label}>{month === 0 ? 'Full Year' : `Month: ${month}`}</Box>
        <Slider
          min={0}
          max={12}
          step={1}
          sx={{ width: '175px', display: 'inline-block' }}
          value={month}
          onChange={(e) => setMonth(parseFloat(e.target.value))}
        />

        {/*
        <Badge
          sx={{
            bg: 'primary',
            color: 'background',
            display: 'inline-block',
            position: 'relative',
            left: [3],
            top: [1],
          }}
        >
          {month.toFixed(0)}
        </Badge>  --- Month Slider ---*/}


        {/* --- Year Slider --- */}
        <Box sx={sx.label}>{`Year: ${year}`}</Box>
        <Slider
          min={1970}
          max={2020}
          step={1}
          sx={{ width: '175px', display: 'inline-block' }}
          value={year}
          onChange={(e) => setYear(parseFloat(e.target.value))}
        />




        <Box sx={{ ...sx.label, mt: [4] }}>Variable</Box>
        <Select
          sxSelect={{ bg: 'transparent' }}
          size='xs'
          onChange={handleBandChange}
          sx={{ mt: [1] }}
          value={band}
        >
          <option value='prec'>Precipitation</option>
          <option value='tavg'>Temperature</option>
        </Select>

        <Box sx={{ ...sx.label, mt: [4] }}>Downscaling Method</Box>
        <Select
          sxSelect={{ bg: 'transparent' }}
          size='xs'
          onChange={handleDownscalingChange}
          sx={{ mt: [1] }}
          value={downscaling}
        >
          <option value='icar'>ICAR</option>
          <option value='gard'>GARD</option>
          <option value='loca'>LOCA</option>
          <option value='bcsd'>BCSD</option>
        </Select>

        <Box sx={{ ...sx.label, mt: [4] }}>Climate Model</Box>
        <Select
          sxSelect={{ bg: 'transparent' }}
          size='xs'
          onChange={handleModelChange}
          sx={{ mt: [1] }}
          value={model}
        >
          <option value='noresm'>NorESM</option>
          <option value='cesm'>CESM</option>
          <option value='gfdl'>GFDL</option>
          <option value='miroc5'>MIROC5</option>
        </Select>


   {/*     <Box sx={{ ...sx.label, mt: [4] }}>Colormap</Box>
        <Select
          sxSelect={{ bg: 'transparent' }}
          size='xs'
          onChange={(e) => setColormapName(e.target.value)}
          sx={{ mt: [1] }}
          value={colormapName}
        >
          {colormaps.map((d) => (
            <option key={d.name}>{d.name}</option>
          ))}
        </Select>*/}

        <Box sx={{ ...sx.label, mt: [4] }}>
          <Link href='https://github.com/NCAR/ICAR'>ICAR Github</Link>
        </Box>

      {/*  <Box sx={{ ...sx.label, mt: [4] }}>
          source = {source}
        </Box>*/}


      </Box>
    </>
  )
}

export default ParameterControls
