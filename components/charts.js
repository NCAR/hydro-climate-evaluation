import React, { useEffect, useState } from 'react';
import { Dimmer, Meta, Column, Row } from '@carbonplan/components'
import { InitializeStore } from '@carbonplan/maps'
import { Box, useThemeUI } from 'theme-ui'
import { Line as LineCJS } from 'react-chartjs-2';
import {options, linedata, linedata_stub} from '../components/plot-line';
import getData from './getData'

import { Line } from 'react-chartjs-2';
import { months } from './chartjs-utils'


const Charts = ({ chartHeight, source, downscaling, model,
                  band, chartData, setChartData }) => {
  const [levels, setLevels] = useState(null);
  const [maxZoom, setMaxZoom] = useState(null);
  const [tileSize, setTileSize] = useState(null);

  const labels = months({count: 12});
  const varName = {
      'prec': 'Precipitation',
      'tavg': 'Average Temperature',
  };
  const label = downscaling.toUpperCase()+'+'+model.toUpperCase();
  const data_stub =  {
        labels,
        datasets: [
            {
                label: label,
                data: chartData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

  const chart_options = {
     responsive: true,
     plugins: {
         legend: {
             position: 'top',
         },
         title: {
             display: true,
             text: varName[band],
         },
      },
   };

  return (
    <Column start={[1]} width={[1]}>
      <Box
        sx={{
          color: 'blue',
          backgroundColor: 'lightgray',
          bottom: 0,
          right: 0,
          padding: 2,
          fontSize: 16,
          position: 'fixed',
          height: chartHeight,
          width: '100%',
        }}
      >
        <LineCJS options={chart_options} data={data_stub} />
      </Box>
    </Column>
  );
};

export default Charts;
