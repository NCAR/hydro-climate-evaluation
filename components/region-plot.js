import { Box, IconButton } from 'theme-ui'
import { useRecenterRegion } from '@carbonplan/maps'
import { Search, XCircle } from '@carbonplan/icons'
import { Line } from 'react-chartjs-2';


const PlotData = ({ band, data: { value } }) => {
  if (!value || !value.climate) {
    return 'loading...'
  }

  // Questions
  // 1. how does .filter work? how does it get the region
  // 2. when to read in/calculate order from metrics

  let result
  const filteredData = value.climate.filter((d) => d !== 9.969209968386869e36)
  if (filteredData.length === 0) {
    result = 'no data in region'
  } else {

		// console.log("ARTLESS CLIMATE =", value.climate)
    const average =
      filteredData.reduce((a, b) => a + b, 0) / filteredData.length
    // if (band === 'prec') {
    //   result = `Average: ${average.toFixed(2)}`
    // } else {
    //   result = `Average: ${average.toFixed(2)}ºC`
    // }
		result = "Selecting Metrics"
  }

  return (
    <Box
      sx={{
        ml: [2],
        mt: ['-1px'],
        fontFamily: 'mono',
        letterSpacing: 'mono',
        textTransform: 'uppercase',
      }}
    >
      {result}
    </Box>
  )
}

const RegionPlot = ({
  band,
  source,
  month,
  regionData,
  showRegionPlot,
  setShowRegionPlot,
}) => {
  const { recenterRegion } = useRecenterRegion()

  const generateChart = () => {
    setShowChart(true);
  };
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Example Data',
        data: [12, 19, 3, 5, 2],
        fill: false,
        borderColor: 'blue',
      },
    ],
  };
  const chartOptions = {
    responsive: true,
  };


  return (
    <Box
      sx={{
        display: ['none', 'none', 'flex', 'flex'],
        alignItems: 'center',
        position: 'absolute',
        color: 'primary',
        left: [13],
        bottom: [17, 17, 15, 15],
      }}
    >
      <IconButton
        aria-label='Circle filter'
        onClick={() => setShowRegionPlot(!showRegionPlot)}
        sx={{ stroke: 'primary', cursor: 'pointer', width: 34, height: 34 }}
      >
        {!showRegionPlot && (
          <Search sx={{ strokeWidth: 1.75, width: 24, height: 24 }} />
        )}
        {showRegionPlot && (
          <XCircle sx={{ strokeWidth: 1.75, width: 24, height: 24 }} />
        )}
      </IconButton>
      {!showRegionPlot && (<Box>Climate Signal Options</Box>)}

      {showRegionPlot && (
        <IconButton
          aria-label='Recenter map'
          onClick={recenterRegion}
          sx={{ stroke: 'primary', cursor: 'pointer', width: 34, height: 34 }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='34'
            height='34'
            strokeWidth='1.75'
            fill='none'
          >
            <circle cx='12' cy='12' r='10' />
            <circle cx='12' cy='12' r='2' />
          </svg>
        </IconButton>
      )}

      {showRegionPlot && (
        <PlotData data={regionData} band={band} month={month} />
      )}
    </Box>
  )
}

export default RegionPlot
