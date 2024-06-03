import { useState, Fragment } from 'react'
import { Box, Flex } from 'theme-ui'
import { useCallback, useEffect } from 'react'
import { Colorbar, Filter, Table, Tag, Slider, Badge, Toggle, Select, Link } from '@carbonplan/components'
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

const Clim_Ranges = {
  diff: { max: 1, min: -1},
  // temperature variables
  tavg: { max: 37, min: 0 },
  n34t: { max: 1, min: -1 },
  ttre: { max: 0.1, min: -0.1 },
  t90_: { max: 30, min: 0 },
  t99_: { max: 30, min: 0 },
  djft: { max: 15, min: -10 },
  mamt: { max: 30, min: 0 },
  jjat: { max: 30, min: 0 },
  sont: { max: 30, min: 0 },

  // precip variables
  prec: { max: 70, min: 0 },
  n34p: { max: 1, min: -1 },
  ptre: { max: 3, min: -3 },
  pr90: { max: 70, min: 0 },
  pr99: { max: 70, min: 0 },
  djfp: { max: 80, min: 0 },
  mamp: { max: 70, min: 0 },
  jjap: { max: 70, min: 0 },
  sonp: { max: 70, min: 0 },
}

const Default_Colormaps = {
  // difference colormap
  diff: 'redteal',

  // temperature variables
  tavg: 'warm',
  n34t: 'warm',
  ttre: 'warm',
  t90_: 'warm',
  t99_: 'warm',
  djft: 'warm',
  mamt: 'warm',
  jjat: 'warm',
  sont: 'warm',

  // precip variables
  prec: 'cool',
  n34p: 'cool',
  ptre: 'cool',
  p90_: 'cool',
  p99_: 'cool',
  djfp: 'cool',
  mamp: 'cool',
  jjap: 'cool',
  sonp: 'cool',
}


const ParameterControls = ({ getters, setters, bucket, fname }) => {
  const { display, debug, opacity, clim, month,
          band, colormapName, colormap,
          downscaling, model, metric, yearRange, mapSource, chartSource,
          downscalingDif, modelDif, yearRangeDif, obsDif,
          mapSourceDif, chartSourceDif,
          chartHeight, filterValues } = getters
  const {
    setDisplay,
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
    setObsDif,
    setMapSourceDif,
    setChartSourceDif,
    setChartHeight,
    setChartData,
    setFilterValues
  } = setters

  // const [filterValues, setFilterValues] = useState({'Ave.': true, 'Dif.': false})

  const [chartToggle, setChartToggle] = useState(false)

  const [units, setUnits] = useState('mm')

  const handleUnitsChange = () => {
      if (band === 'tavg') {
          setUnits('°C')
      } else if (band === 'prec') {
          setUnits('mm')
      }
  };

  const setMetricLabel = () => {
    let label = 'n34pr'
    let description  = ['further description']
    if (metric === 'n34pr') {
      label = 'n34pr'
      description =
            ['Niño3.4 precipitation',
             'teleconnection patterns',
             'spatial correlation']
    } else if (metric === 'n34t') {
      label = 'n34t'
      description =
            ['Niño3.4 temperature',
             'teleconnection patterns',
             'spatial correlation']
    }  else if (metric === 'ptrend') {
      label = 'ptrend'
      description =
            ['Precipitation',
             'trend']
    }  else if (metric === 'ttrend') {
      label = 'ttrend'
      description =
            ['Temperature',
             'trend']
    }  else if (metric === 'pr90') {
      label = 'pr90'
      description =
            ['Precipitation',
             'extremes',
             '90th percentile']
    }  else if (metric === 'pr99') {
      label = 'pr99'
      description =
            ['Precipitation',
             'extremes',
             '99th percentile']
    }  else if (metric === 't90') {
      label = 't90'
      description =
            ['Temperature',
             'extremes',
             '90th percentile']
    }  else if (metric === 't99') {
      label = 't99'
      description =
            ['Temperature',
             'extremes',
             '99th percentile']
    }  else if (metric === 'djf_t') {
      label = 'djf_t'
      description =
            ['Seasonal mean',
             'temperature',
            'Dec/Jan/Feb']
    }  else if (metric === 'djf_p') {
      label = 'djf_p'
      description =
            ['Seasonal mean',
             'precipitation',
            'Dec/Jan/Feb']
    }  else if (metric === 'mam_t') {
      label = 'mam_t'
      description =
            ['Seasonal mean',
             'temperature',
            'Mar/Apr/May']
    }  else if (metric === 'mam_p') {
      label = 'mam_p'
      description =
            ['Seasonal mean',
             'precipitation',
            'Mar/Apr/May']
    }  else if (metric === 'jja_t') {
      label = 'jja_t'
      description =
            ['Seasonal mean',
             'temperature',
            'Jun/Jul/Aug']
    }  else if (metric === 'jja_p') {
      label = 'jja_p'
      description =
            ['Seasonal mean',
             'precipitation',
            'Jun/Jul/Aug']
    }  else if (metric === 'son_t') {
      label = 'son_t'
      description =
            ['Seasonal mean',
             'temperature',
            'Sep/Oct/Nov']
    }  else if (metric === 'son_p') {
      label = 'son_p'
      description =
            ['Seasonal mean',
             'precipitation',
            'Sep/Oct/Nov']
    } //  else {
    //   label = 'label undefined'
    // }

    return(
       <Box sx={{ ...sx.label, mt: [4] }}>
          <Link href='https://google.com/'>{label}</Link>:<br />
          {description.map((line, index) => (
              <Fragment key={index}>
                  {line}
                  <br />
              </Fragment>
          ))}

       </Box>
      )

   };

   const MetricBox = () => {
       const [values, setValues] =
           useState({'90%': false, '99%': false, 'Std.': false, 'RSME': false})
       return (
           <Filter
             values={values}
             setValues={setValues}
             showAll
               />
       )
   };




  // NOTE: Chart sources have not been created with yearRange yet
  // TODO: fixed Clim_Ranges[band]
  const handleFilterAndSetClimColormapName = (e) => {
      const filterVals = e
      if (filterVals['Ave.']) {
          setFilterValues({'Ave.': true, 'Dif.': false})
          setClim([Clim_Ranges[band].min, Clim_Ranges[band].max])
          setColormapName(Default_Colormaps[band])
      } else {
          setFilterValues({'Ave.': false, 'Dif.': true})
          setClim([Clim_Ranges['diff'].min, Clim_Ranges['diff'].max])
          setColormapName(Default_Colormaps['diff'])
      }
  };

  const handleBandChange = useCallback((e) => {
    const band = e.target.value
    setBand(band)
    handleFilterAndSetClimColormapName(filterValues)
    setMapSource(bucket+'/map/'+downscaling+'/'+model+'/'+yearRange+'/'+fname)
    // setChartSource(bucket+'/chart/'+downscaling+'/'+model+'/'+yearRange+'/'+band)
    setChartSource(bucket+'/chart/'+downscaling+'/'+model+'/'+band)
    getData({chartSource}, setChartData)
  })

  const handleYearChange = useCallback((e) => {
    const yearRange = e.target.value
    setYearRange(yearRange)
    console.log("yearRange =", e.target.value)
    setMapSource(bucket+'/map/'+downscaling+'/'+model+'/'+yearRange+'/'+fname)
    // setChartSource(bucket+'/chart/'+downscaling+'/'+model+'/'+yearRange+'/'+band)
    setChartSource(bucket+'/chart/'+downscaling+'/'+model+'/'+band)
  })
  const handleYearDifChange = useCallback((e) => {
    const yearRangeDif = e.target.value
    setYearRangeDif(yearRangeDif)
    console.log("yearRange =", e.target.value)
    setMapSourceDif(bucket+'/map/'+downscalingDif+'/'+modelDif+'/'+yearRangeDif+'/'+fname)
    setChartSourceDif(bucket+'/chart/'+downscalingDif+'/'+modelDif+'/'+yearRangeDif+'/'+band)
  })

  const handleDownscalingChange = useCallback((e) => {
    const downscaling = e.target.value
    setDownscaling(downscaling)
    let safemodel = model
    if (downscaling === 'maca') {
        if (model === 'access1_3') {
            setModel('noresm1_m')
            safemodel = 'noresm1_m'
        }
    }
    if (downscaling === 'nasa_nex') {
        if (model === 'access1_3' || model === 'ccsm4') {
            setModel('noresm1_m')
            safemodel = 'noresm1_m'
        }
    }

    setMapSource(bucket+'/map/'+downscaling+'/'+safemodel+'/'+yearRange+'/'+fname)
    // setChartSource(bucket+'/chart/'+downscaling+'/'+model+'/'+yearRange+'/'+band)
    setChartSource(bucket+'/chart/'+downscaling+'/'+safemodel+'/'+band)
    // getData({chartSource}, setChartData)
  })

  const handleDownscalingDifChange = useCallback((e) => {
    const downscalingDif = e.target.value
    setDownscalingDif(downscalingDif)
    setMapSourceDif(bucket+'/map/'+downscalingDif+'/'+modelDif+'/'+yearRangeDif+'/'+fname)
    setChartSourceDif(bucket+'/chart/'+downscalingDif+'/'+modelDif+'/'+yearRangeDif+'/'+band)
    //getData({chartSource}, setChartData)
  })

  const handleModelChange = useCallback((e) => {
    const model = e.target.value
    setModel(model)
    console.log("e =", e.target.value)
    console.log("model =", bucket+'/'+downscaling+'/'+model+'/')
    setMapSource(bucket+'/map/'+downscaling+'/'+model+'/'+yearRange+'/'+fname)
    // setChartSource(bucket+'/chart/'+downscaling+'/'+model+'/'+yearRange+'/'+band)
    setChartSource(bucket+'/chart/'+downscaling+'/'+model+'/'+band)
    // getData({chartSource}, setChartData)
  })

  const handleMetricChange = useCallback((e) => {
    const metric = e.target.value
    setMetric(metric)
    console.log("e =", e.target.value)
    // console.log("model =", bucket+'/'+downscaling+'/'+model+'/')
    // setMapSource(bucket+'/map/'+downscaling+'/'+model+'/'+yearRange+'/'+fname)
    // // setChartSource(bucket+'/chart/'+downscaling+'/'+model+'/'+yearRange+'/'+band)
    // setChartSource(bucket+'/chart/'+downscaling+'/'+model+'/'+band)
    // getData({chartSource}, setChartData)
    if (metric === 'n34pr') {
      setBand('n34p')
      setUnits('mm')
      setClim([Clim_Ranges['n34p'].min, Clim_Ranges['n34p'].max])
    } else if (metric === 'n34t') {
      setBand('n34t')
      setUnits('°C')
      setClim([Clim_Ranges['n34t'].min, Clim_Ranges['n34t'].max])
    }  else if (metric === 'ptrend') {
      setBand('ptre')
      setUnits('mm')
      setClim([Clim_Ranges['ptre'].min, Clim_Ranges['ptre'].max])
    }  else if (metric === 'ttrend') {
      setBand('ttre')
      setUnits('°C')
      setClim([Clim_Ranges['ttre'].min, Clim_Ranges['ttre'].max])
    }  else if (metric === 'pr90') {
      setBand('pr90')
      setUnits('mm')
      setClim([Clim_Ranges['pr90'].min, Clim_Ranges['pr90'].max])
    }  else if (metric === 'pr99') {
      setBand('pr99')
      setUnits('mm')
      setClim([Clim_Ranges['pr99'].min, Clim_Ranges['pr99'].max])
    }  else if (metric === 't90') {
      setBand('t90_')
      setUnits('°C')
      setClim([Clim_Ranges['t90_'].min, Clim_Ranges['t90_'].max])
    }  else if (metric === 't99') {
      setBand('t99_')
      setUnits('°C')
      setClim([Clim_Ranges['t99_'].min, Clim_Ranges['t99_'].max])
    }  else if (metric === 'djf_t') {
      setBand('djft')
      setUnits('°C')
      setClim([Clim_Ranges['djft'].min, Clim_Ranges['djft'].max])
    }  else if (metric === 'djf_p') {
      setBand('djfp')
      setUnits('mm')
      setClim([Clim_Ranges['djfp'].min, Clim_Ranges['djfp'].max])
    }  else if (metric === 'mam_t') {
      setBand('mamt')
      setUnits('°C')
      setClim([Clim_Ranges['mamt'].min, Clim_Ranges['mamt'].max])
    }  else if (metric === 'mam_p') {
      setBand('mamp')
      setUnits('mm')
      setClim([Clim_Ranges['mamp'].min, Clim_Ranges['mamp'].max])
    }  else if (metric === 'jja_t') {
      setBand('jjat')
      setUnits('°C')
      setClim([Clim_Ranges['jjat'].min, Clim_Ranges['jjat'].max])
    }  else if (metric === 'jja_p') {
      setBand('jjap')
      setUnits('mm')
      setClim([Clim_Ranges['jjap'].min, Clim_Ranges['jjap'].max])
    }  else if (metric === 'son_t') {
      setBand('sont')
      setUnits('°C')
      setClim([Clim_Ranges['sont'].min, Clim_Ranges['sont'].max])
    }  else if (metric === 'son_p') {
      setBand('sonp')
      setUnits('mm')
      setClim([Clim_Ranges['sonp'].min, Clim_Ranges['sonp'].max])
    } //  else {
    if (filterValues['Dif.']) {
      setClim([Clim_Ranges['diff'].min, Clim_Ranges['diff'].max])
    }
  })

  const handleModelDifChange = useCallback((e) => {
    const modelDif = e.target.value
    setModelDif(modelDif)
    setMapSourceDif(bucket+'/map/'+downscalingDif+'/'+modelDif+'/'+yearRangeDif+'/'+fname)
    setChartSourceDif(bucket+'/chart/'+downscalingDif+'/'+modelDif+'/'+yearRangeDif+'/'+band)
    // getData({chartSourceDif}, setChartDataDif)
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


  const LocalColorbar = () => {
    // handleUnitsChange()
    useEffect(() => {
      handleUnitsChange(); // This will be executed after the component is rendered
    }, []); // Empty dependency array ensures this effect runs only once after initial render


    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Colorbar
        colormap={colormap}
        label={units}
        clim={clim}
        setClim={setClim}
      />
      </Box>
    );
  };

  const DifYearChoices = () => {
    if (yearRange === '1980_2010') {
      setYearRangeDif('1980_2010')
      return(
        [<option value='1980_2010'>1980-2010</option>,
         <option value='2070_2100'>2070-2100</option>]
      );
    } else {
      setYearRangeDif('1980_2010')
      return(
        <option value='1980_2010'>1980-2010</option>
      );
    }
   }

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
  }

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
  }

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
         <option value='2070_2100'>2070-2100</option>
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
    const obs = e.target.value
    setObsDif(obs)
    // console.log("obs =", obs) // works
    setMapSourceDif(bucket+'/obs/'+obs+'/'+yearRangeDif+'/'+fname)
  });

  const NewDifSourceChoices = () => {
    return (
    <>
        <Box sx={{ ...sx.label, mt: [3] }}>Climate</Box>
        <Box sx={{ ...sx.label, mt: [0] }}>Model</Box>
        <Select
          sxSelect={{ bg: 'transparent' }}
          size='xs'
          onChange={handleObsChange}
          sx={{ mt: [1] }}
          value={obsDif}
        >
         {/* DifModelChoices() */}
          <option value='conus404'>Conus404</option>
          <option value='livneh'>Livneh</option>
          <option value='maurer'>Maurer</option>
          <option value='nldas'>NLDAS</option>
{/*       <option value='oldlivneh'>Old Livneh</option> */}
          <option value='prism'>PRISM</option>
        </Select>
      </>
    );
  };



  const AveDifFilter = () => {

  const handleFilterChange = (newValues) => {
        // Update the state only when the Filter component changes
        setValues(newValues);
     };

    if (filterValues['Ave.']) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Filter
          values={filterValues}
          // setValues={setFilterValues}
          setValues={handleFilterAndSetClimColormapName}
          multiSelect={false}
        />
        </Box>
      );
   } else {
      return (
        <>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Filter
          values={filterValues}
          // setValues={setFilterValues}
          setValues={handleFilterAndSetClimColormapName}
          multiSelect={false}
        />
        </Box>
        <NewDifSourceChoices />
        </>
      );
    }
  };




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
    [<LocalColorbar/>],
    [
     <Box sx={{ ...sx.label, minWidth: 110, mx: 'auto',
                px: 0, mt: [1], textAlign: 'center'}}>Charts</Box>,
     <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
    //[<DifSourceChoices />],

    // [<ClickRow />],
  ]}



  borderTop={true}
  borderBottom={false}
  index={false}
  sx={{ my: [3] }}
  />
        </Flex>
      </Box>
      <Box sx={{ position: 'absolute', top: 20, left: 20 }}>

{/*   // Old temperature range sliders
      <Box sx={sx.label}>Minimum</Box>
        <Slider
          min={Clim_Ranges[band].min}
          max={Clim_Ranges[band].max}
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
          min={Clim_Ranges[band].min}
          max={Clim_Ranges[band].max}
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
*/}


        {/* --- Month Slider ---
            setup to use the 0 value as averaging over the full year
          */}

{/*     <Box sx={sx.label}>{month === 0 ? 'Full Year' : `Month: ${month}`}</Box>
        <Slider
          min={1}
          max={12}
          step={1}
          sx={{ width: '175px', display: 'inline-block' }}
          value={month}
          onChange={(e) => setMonth(parseFloat(e.target.value))}
        />*/}

        {/* --- Unused Year Slider ---
        <Box sx={sx.label}>{`Year: ${year}`}</Box>
        <Slider
          min={1970}
          max={2020}
          step={1}
          sx={{ width: '175px', display: 'inline-block' }}
          value={year}
          onChange={(e) => setYear(parseFloat(e.target.value))}
        /> */}
        <Box sx={{ ...sx.label, mt: [4] }}>Year Range</Box>
        <Select
          sxSelect={{ bg: 'transparent' }}
          size='xs'
          onChange={handleYearChange}
          sx={{ mt: [1] }}
          value={yearRange}
        >
          <option value='1981_2004'>1981-2004</option>
{/*       <option value='1980_2010'>1980-2010</option>
          <option value='2070_2100'>2070-2100</option>*/}
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
          <option value='gard_r2'>GARD_r2</option>
          <option value='gard_r3'>GARD_r3</option>
          <option value='loca_8th'>LOCA_8th</option>
          <option value='maca'>MACA</option>
          <option value='nasa_nex'>NASA-NEX</option>
{/*OLD    <option value='icar'>ICAR</option>
          <option value='gard'>GARD</option>
          <option value='loca'>LOCA</option>
          <option value='bcsd'>BCSD</option>*/}
        </Select>

        <Box sx={{ ...sx.label, mt: [4] }}>Climate Model</Box>
        <Select
          sxSelect={{ bg: 'transparent' }}
          size='xs'
          onChange={handleModelChange}
          sx={{ mt: [1] }}
          value={model}
        >

  {downscaling === 'icar' && (
    <>
          <option value='noresm1_m'>NorESM-M</option>
          <option value='access1_3'>ACCESS1-3</option>
          <option value='canesm2'>CanESM2</option>
          <option value='ccsm4'>CCSM4</option>
          <option value='miroc5'>MIROC5</option>
    </>
  )}
  {downscaling === 'gard_r2' && (
    <>
          <option value='noresm1_m'>NorESM-M</option>
          <option value='access1_3'>ACCESS1-3</option>
          <option value='canesm2'>CanESM2</option>
          <option value='ccsm4'>CCSM4</option>
          <option value='miroc5'>MIROC5</option>
    </>
  )}
  {downscaling === 'gard_r3' && (
    <>
          <option value='noresm1_m'>NorESM-M</option>
          <option value='access1_3'>ACCESS1-3</option>
          <option value='canesm2'>CanESM2</option>
          <option value='ccsm4'>CCSM4</option>
          <option value='miroc5'>MIROC5</option>
    </>
  )}
  {downscaling === 'loca_8th' && (
    <>
          <option value='noresm1_m'>NorESM-M</option>
          <option value='access1_3'>ACCESS1-3</option>
          <option value='canesm2'>CanESM2</option>
          <option value='ccsm4'>CCSM4</option>
          <option value='miroc5'>MIROC5</option>
    </>
  )}
  {downscaling === 'maca' && (
    <>
          <option value='noresm1_m'>NorESM-M</option>
          <option value='canesm2'>CanESM2</option>
          <option value='ccsm4'>CCSM4</option>
          <option value='miroc5'>MIROC5</option>
    </>
  )}
  {downscaling === 'nasa_nex' && (
    <>
          <option value='noresm1_m'>NorESM-M</option>
          <option value='canesm2'>CanESM2</option>
          <option value='miroc5'>MIROC5</option>
    </>
  )}

{/*       <option value='noresm1_m'>NorESM-M</option>
          <option value='access1_3'>ACCESS1-3</option>
          <option value='canesm2'>CanESM2</option>
          <option value='CCSM4'>CCSM4</option>
          <option value='miroc5'>MIROC5</option> */}
{/*       <option value='mri_cgcm5'>MRI-CGCM3</option> */}

{/*       <option value='noresm'>NorESM</option>
          <option value='cesm'>CESM</option>
          <option value='gfdl'>GFDL</option>
          <option value='miroc5'>MIROC5</option> */}
        </Select>


{/*     <Box sx={{ ...sx.label, mt: [4] }}>Variable</Box>
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
*/}

        <Box sx={{ ...sx.label, mt: [4] }}>Metrics</Box>
        <Select
          sxSelect={{ bg: 'transparent' }}
          size='xs'
          onChange={handleMetricChange}
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
        </Select>

     { setMetricLabel() }



 {/*       <Box sx={{ ...sx.label, mt: [4] }}>Metric</Box>  */}
          {/* MetricBox() */}
 {/*         <Grid gap={2} columns={[2]}>
            { Click90() }
            { Click99() }
            { ClickStandardDev() }
            { ClickRSME() }
          </Grid>
  */}

   {/*      <Select
          sxSelect={{ bg: 'transparent' }}
          size='xs'
          onChange={handleMetricChange}
          sx={{ mt: [1] }}
          value={model}
        >
          <option value='none'>None</option>
          <option value='90'>90th percentile</option>
          <option value='99'>99th percentile</option>
          <option value='std'>Std. Dev.</option>
          <option value='rsme'>RSME</option>
        </Select>
   */}


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

     {/*   <Box sx={{ ...sx.label, mt: [4] }}>
          <Link href='https://github.com/NCAR/ICAR'>ICAR Github</Link>
        </Box> */}

      {/*  <Box sx={{ ...sx.label, mt: [4] }}>
          source = {source}
        </Box>*/}


      </Box>
    </>
  )
}

export default ParameterControls
