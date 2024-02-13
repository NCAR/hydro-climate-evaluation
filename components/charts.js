import React, { useEffect, useState } from 'react';
import { Dimmer, Meta, Column, Row } from '@carbonplan/components'
import { InitializeStore } from '@carbonplan/maps'
import { Box, useThemeUI } from 'theme-ui'
import {options, linedata, linedata_stub} from '../components/plot-line';

// import { Line as LineCJS } from 'react-chartjs-2';
// import { Line } from 'react-chartjs-2';
import { Chart } from 'react-chartjs-2';
import { months } from './chartjs-utils'
// import { AnnotationPlugin } from 'chartjs-plugin-annotation';

// Chart.register(AnnotationPlugin);


const Charts = ({ chartHeight, source, downscaling, model,
                  band, month, chartData, setChartData }) => {
  const [levels, setLevels] = useState(null);
  const [maxZoom, setMaxZoom] = useState(null);
  const [tileSize, setTileSize] = useState(null);

  const labels = months({count: 12});
  const varName = {
      'prec': 'Precipitation',
      'tavg': 'Average Temperature',
  };
  const label = downscaling.toUpperCase()+'+'+model.toUpperCase();
  const chart_data =  {
        labels,
        datasets: [
            {
                label: label,
                data: chartData,
                pointStyle: 'line',
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

  const chart_options = {
     responsive: true,
     plugins: {
         legend: {
             display: false
         },
         title: {
             display: true,
             text: '1980 Average '+varName[band]+': '+label,
         },

   annotation: {
        annotations: {
          box1: {
            // Indicates the type of annotation
            type: 'box',
            xMin: 3,
            xMax: 6,
            yMin: 0,
            yMax: 20,
            backgroundColor: 'rgba(255, 99, 132, 0.25)'
          }
        }
      },
         // annotation: {
         //     annotations: [{
         //         type: 'line',
         //         mode: 'vertical',
         //         scaleID: "x-axis-0",
         //         // scaleID: 'x',
         //         value: 4, // Adjusted value for zero-based index
         //         // value: 'April', // Adjusted value for zero-based index
         //         borderColor: 'blue',
         //         // borderWidth: 1,
         //         // borderDash: [5, 5], // Set the border dash pattern for a dashed line
         //    label: {
         //      content: "TODAY",
         //      enabled: true,
         //      position: "top"
         //    }
         //     }],
         // },
      },
   };


  const foo_options = {
     responsive: true,
     plugins: {
         legend: {
             position: 'bottom',
             display: false
         },
         title: {
             display: true,
             text: 'Annual Average '+varName[band],
         },
      },
   };
  console.log("LBAELS", labels)
  console.log("NEW LABLES", ["1","2","3"])
  const foo_data =  {
        labels: ['1980', '','1990', '','2000', '','2010', '','2020'],
        datasets: [
            {
                label: 'Foo',
                data: [5,10,7,10,12,1,5,4,3,6,2,5],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

  // const foo_options = {
  //       scales: {
  //           xAxes: [{
  //               type: 'linear',
  //               position: 'bottom',
  //               gridLines: {
  //                   borderDash: [5, 5], // Dashed line style for grid lines
  //               }
  //           }],
  //           yAxes: [{
  //               ticks: {
  //                   beginAtZero: true,
  //               },
  //           }],
  //       },
  //       annotation: {
  //           annotations: [{
  //               type: 'line',
  //               mode: 'vertical',
  //               scaleID: 'x-axis-0',
  //               value: 1, // Set the x-value for the vertical line
  //               borderColor: 'rgba(0, 0, 0, 0.5)', // Light dashed line color
  //               borderWidth: 1,
  //               borderDash: [5, 5], // Dashed line style
  //           }]
  //       },
  //   }



  return (
   <>
    <Column start={[5]} width={[1]}>
      <Box
        sx={{
          color: 'blue',
          backgroundColor: 'lightgray',
          bottom: 0,
          left: 0,
          padding: 2,
          fontSize: 16,
          position: 'fixed',
          height: chartHeight,
          width: '50%',
        }}
      >
        <Chart type='line' options={chart_options} data={chart_data} />
      </Box>
    </Column>
    <Column start={[6]} width={[2]}>
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
          width: '50%',
        }}
      >
        <Chart type='line' options={foo_options} data={foo_data} />
      </Box>
    </Column>
   </>
  );
};

export default Charts;
