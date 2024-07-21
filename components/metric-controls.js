import { useState, Fragment } from 'react'
import { Box, Flex } from 'theme-ui'
import { useCallback, useEffect } from 'react'
import { Filter, Table, Tag, Slider, Badge, Toggle, Select, Link } from '@carbonplan/components'
import Colorbar from './colorbar'
// import { colormaps } from '@carbonplan/colormaps'
import { colormaps } from '../colormaps/src'
import { getData } from './getData'
import { IconButton } from 'theme-ui'

const sx = {
  label: {
    fontFamily: 'mono',
    letterSpacing: 'mono',
    textTransform: 'uppercase',
    fontSize: [1, 1, 1, 2],
    mt: [3],
  },
}

const precip_dif = 1.0
const temp_dif = 0.2

const Scale_Values = {
  // diference colormap
  dif: 0.2,
  dift: temp_dif,
  difp: precip_dif,

  // temperature variables
  dif_tavg: temp_dif,
  dif_n34t: temp_dif,
  dif_ttrend: temp_dif,
  dif_t90: temp_dif,
  dif_t99: temp_dif,
  dif_djf_t: temp_dif,
  dif_mam_t: temp_dif,
  dif_jja_t: temp_dif,
  dif_son_t: temp_dif,

  // precip variables
  dif_prec: precip_dif,
  dif_n34pr: precip_dif,
  dif_ptrend: precip_dif,
  dif_p90: precip_dif,
  dif_p99: precip_dif,
  dif_djf_p: precip_dif,
  dif_mam_p: precip_dif,
  dif_jja_p: precip_dif,
  dif_son_p: precip_dif,
}


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
  dif_tavg: { max: 4, min: -4 },
  dif_n34t: { max: 1, min: -1 },
  dif_ttrend: { max: 1.0, min: -1.0 },
  dif_t90: { max: 4, min: -4 },
  dif_t99: { max: 4, min: -4 },
  dif_djf_t: { max: 4, min: -4 },
  dif_mam_t: { max: 4, min: -4 },
  dif_jja_t: { max: 4, min: -4 },
  dif_son_t: { max: 4, min: -4 },

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
  dif_prec: { max: 50, min: -50 },
  dif_n34pr: { max: 1, min: -1 },
  dif_ptrend: { max: 20, min: -20 },
  dif_pr90: { max: 10, min: -10 },
  dif_pr99: { max: 20, min: -20 },
  dif_djf_p: { max: 60, min: -60 },
  dif_mam_p: { max: 50, min: -50 },
  dif_jja_p: { max: 50, min: -50 },
  dif_son_p: { max: 50, min: -50 },
}

const Default_Colormaps = {
  // temperature variables
  tavg: 'BuYlRd',
  n34t: 'BuYlRd',
  ttrend: 'BuYlRd',
  t90: 'BuYlRd',
  t99: 'BuYlRd',
  djf_t: 'BuYlRd',
  mam_t: 'BuYlRd',
  jja_t: 'BuYlRd',
  son_t: 'BuYlRd',

  // precip variables
  prec: 'browngreen',
  n34pr: 'browngreen',
  ptrend: 'browngreen',
  pr90: 'browngreen',
  pr99: 'browngreen',
  djf_p: 'browngreen',
  mam_p: 'browngreen',
  jja_p: 'browngreen',
  son_p: 'browngreen',

  // difference colormap
  dif: 'difredblue',
  dift: 'difbluered',
  difp: 'difbrowngreen',

  // temperature variables
  dif_tavg: 'difbluered',
  dif_n34t: 'difbluered',
  dif_ttrend: 'difbluered',
  dif_t90: 'difbluered',
  dif_t99: 'difbluered',
  dif_djf_t: 'difbluered',
  dif_mam_t: 'difbluered',
  dif_jja_t: 'difbluered',
  dif_son_t: 'difbluered',

  // precip variables
  dif_prec: 'difbrowngreen',
  dif_n34pr: 'difbrowngreen',
  dif_ptrend: 'difbrowngreen',
  dif_p90: 'difbrowngreen',
  dif_p99: 'difbrowngreen',
  dif_djf_p: 'difbrowngreen',
  dif_mam_p: 'difbrowngreen',
  dif_jja_p: 'difbrowngreen',
  dif_son_p: 'difbrowngreen',

}


const MetricControls = ({ getters, setters,
                          showClimateChange,
                          setShowClimateChange,
                          bucket, fname }) => {
  const { display, reload, debug, opacity, clim, month,
          band, colormapName, colormap,
          downscaling, model, metric,
          yearRange, mapSource, chartSource,
          downscalingDif, modelDif, yearRangeDif, obsDif,
          mapSourceDif, chartSourceDif, scaleDif,
          chartHeight, filterValues } = getters
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
    setObsDif,
    setMapSourceDif,
    setChartSourceDif,
    setScaleDif,
    setChartHeight,
    setChartData,
    setFilterValues
  } = setters

  // const [filterValues, setFilterValues] = useState({'Ave.': true, 'Dif.': false})

  const [chartToggle, setChartToggle] = useState(false)

  const [units, setUnits] = useState('mm')

  const [rcpValues, setRCPValues] = useState({'4.8': true, '8.5': false})

  const [computeClimateSignal, setComputeClimateSignal] =
        useState({'3. Compute Climate Signal': false})

  const handleUnitsChange = () => {
      if (band === 'tavg') {
          setUnits('°C')
      } else if (band === 'prec') {
          setUnits('mm')
      }
  };

  const flipReload = () => {
      if (reload) {
          setReload(false)
      } else {
          setReload(true)
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
          setClim([Clim_Ranges[metric].min, Clim_Ranges[metric].max])
          setColormapName(Default_Colormaps[metric])
      } else {
          setFilterValues({'Ave.': false, 'Dif.': true})
          setScaleDif(Scale_Values['dif_'+metric])
          setClim([Clim_Ranges['dif_'+metric].min, Clim_Ranges['dif_'+metric].max])
          setColormapName(Default_Colormaps['dif_'+metric])
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

  const maxNumMetrics = 18
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
       son_p: false,})


  const [numMetrics, setNumMetrics] = useState(0)
  const [topCombination, setTopCombination] = useState("None")

  const [metrics, setMetrics] =
    useState({
       all: false,
       clear: false,
      })

  const [metrics1, setMetrics1] =
    useState({
       tavg: false,
       n34t: false,
       ttrend: false,})
  const [metrics2, setMetrics2] =
    useState({
       t90: false,
       t99: false,
       djf_t: false,})
  const [metrics3, setMetrics3] =
    useState({
       mam_t: false,
       jja_t: false,
       son_t: false,})
  const [metrics4, setMetrics4] =
    useState({
       prec: false,
       n34pr: false,
       ptrend: false,})
  const [metrics5, setMetrics5] =
    useState({
       pr90: false,
       pr99: false,
       djf_p: false,})
  const [metrics6, setMetrics6] =
    useState({
       mam_p: false,
       jja_p: false,
       son_p: false,})

  const countNumMetrics = (change) => {
      let count = 0;
      for (const key in metrics1) { metrics1[key] === true && count++; }
      for (const key in metrics2) { metrics2[key] === true && count++; }
      for (const key in metrics3) { metrics3[key] === true && count++; }
      for (const key in metrics4) { metrics5[key] === true && count++; }
      for (const key in metrics5) { metrics5[key] === true && count++; }
      for (const key in metrics6) { metrics6[key] === true && count++; }
      return count + change;
  }

  const diffInMetrics = (array1, array2) => {
      for (const key in array1) {
          if (array1[key] != array2[key]) {
              if (array2[key] == true) {
                  return 1
              } else {
                  return -1
  }}}}

  const combinations =
        [
            "ICAR with NorESM-M",
            "ICAR with ACCESS1-3",
            "ICAR with CanESM2",
            "ICAR with CCSM4",
            "ICAR with MIROC5",
        ]

  const tavg_score = [3,4,2,5,1]
  const n34t_score = [1,3,5,2,4]
  const ttrend_score = [2,3,1,4,5]


  function addScores(a,b){
        return a.map((e,i) => e + b[i]);
  }

  const computeTopCombination = () => {
    let currentScore = [0,0,0,0,0]
    if (metrics1['tavg']) {
        currentScore = addScores(currentScore, tavg_score)
    }
    if (metrics1['n34t']) {
        currentScore = addScores(currentScore, n34t_score)
    }
    if (metrics1['ttrend']) {
        currentScore = addScores(currentScore, ttrend_score)
    }

    let i = currentScore.indexOf(Math.max(...currentScore));
    if (numMetrics === 0) {
        setTopCombination("None")
    } else {
        console.log("SCORE =", currentScore, "and i", i)
        console.log("best combination =", combinations[i])
        setTopCombination(combinations[i])
    }


  }

  const handleRCPValues = useCallback((e) => {
      const choice = e
      console.log("RCP VALUES e =", e)
      setRCPValues(choice)
  });

  const handleClimateSignal = useCallback((e) => {
      const choice = e
      setComputeClimateSignal(choice)
  });



  const handleMetrics = useCallback((e) => {
      const choice = e
      const keys = JSON.stringify(Object.keys(e))
      let change = 0

      if (keys === '["tavg","n34t","ttrend"]') {
          change = diffInMetrics(metrics1, e)
          setMetrics1(e)
      } else if (keys === '["t90","t99","djf_t"]') {
          change = diffInMetrics(metrics2, e)
          setMetrics2(e);
      } else if (keys === '["mam_t","jja_t","son_t"]') {
          change = diffInMetrics(metrics3, e)
          setMetrics3(e);
      } else if (keys === '["prec","n34pr","ptrend"]') {
          change = diffInMetrics(metrics4, e)
          setMetrics4(e);
      } else if (keys === '["pr90","pr99","djf_p"]') {
          change = diffInMetrics(metrics5, e)
          setMetrics5(e);
      } else if (keys === '["mam_p","jja_p","son_p"]') {
          change = diffInMetrics(metrics6, e)
          setMetrics6(e);
      }
      const numSelected = countNumMetrics(change)
      console.log("change", change, "numsel", numSelected)
      setNumMetrics(numSelected)

      computeTopCombination()
      // if (numSelected === 0) {
      //     metricSelected
      // }



  })



  const handleMetricChange = useCallback((e) => {
      const choice = e
      const all = e.all
      const clear = e.clear

      if (all) {
          setNumMetrics(maxNumMetrics)
          setMetrics({all: true, clear: false})
          setMetrics1({tavg: true, n34t: true, ttrend: true,})
          setMetrics2({t90: true, t99: true, djf_t: true,})
          setMetrics3({mam_t: true, jja_t: true, son_t: true,})
          setMetrics4({prec: true, n34pr: true, ptrend: true,})
          setMetrics5({pr90: true, pr99: true, djf_p: true,})
          setMetrics6({mam_p: true, jja_p: true, son_p: true,})
          computeTopCombination()

      } else if (clear) {
          setTopCombination("None")
          setNumMetrics(0)
          setMetrics({all: false, clear: false})
          setMetrics1({tavg: false, n34t: false, ttrend: false,})
          setMetrics2({t90: false, t99: false, djf_t: false,})
          setMetrics3({mam_t: false, jja_t: false, son_t: false,})
          setMetrics4({prec: false, n34pr: false, ptrend: false,})
          setMetrics5({pr90: false, pr99: false, djf_p: false,})
          setMetrics6({mam_p: false, jja_p: false, son_p: false,})
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
        filterValues={filterValues}
        scaleDif={scaleDif}
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
        <Box sx={{ mt: [1] }}>
          <Select
            sxSelect={{ bg: 'transparent' }}
            size='xs'
           >
           <option value='historical'>Historical</option>
           <option value='future'>Future</option>
           </Select>
        </Box>
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
  data={[[<LocalColorbar/>]]}


  borderTop={true}
  borderBottom={false}
  index={false}
  sx={{ my: [3] }}
  />
        </Flex>
      </Box>
      <Box sx={{ position: 'absolute', top: 20, left: 20 }}>

        <Box sx={{ ...sx.label, mt: [4] }}>1. Select Metrics</Box>
        <Filter
         values={metrics}
         setValues={setMetrics}
         setValues={handleMetricChange}
        />
        <Filter
         values={metrics1}
         setValues={handleMetrics}
         multiSelect={true}
        />
        <Filter
         values={metrics2}
         setValues={handleMetrics}
         multiSelect={true}
        />
        <Filter
         values={metrics3}
         setValues={handleMetrics}
         multiSelect={true}
        />
        <Filter
         values={metrics4}
         setValues={handleMetrics}
         multiSelect={true}
        />
        <Filter
         values={metrics5}
         setValues={handleMetrics}
         multiSelect={true}
        />
        <Filter
         values={metrics6}
         setValues={handleMetrics}
         multiSelect={true}
        />

      {/*(numMetrics > 0) && */}
      <Box>Number of selected metrics = {numMetrics} </Box>
      <Box sx={{mb:4}}>
           Best Performing: {topCombination}         </Box>



      <Box>2. Select future RCP scenario</Box>
      <Filter
       values={rcpValues}
       setValues={handleRCPValues}
       multiSelect={false}
       sx={{mb:4}}
      />

      <Filter
       values={computeClimateSignal}
       setValues={handleClimateSignal}
       multiSelect={false}
      />

      </Box>

    </>
  )
}

export default MetricControls
