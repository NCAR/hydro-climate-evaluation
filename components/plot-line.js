import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import zarr from 'zarr-js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


// this function is from @carbonplan/maps/utils.js
export const getPyramidMetadata = (multiscales) => {
  if (!multiscales) {
    throw new Error(
      'Missing `multiscales` value in metadata. Please check your pyramid generation code.'
    )
  }
  const datasets = multiscales[0].datasets
  if (!datasets || datasets.length === 0) {
    throw new Error(
      'No datasets provided in `multiscales` metadata. Please check your pyramid generation code.'
    )
  }
  const levels = datasets.map((dataset) => Number(dataset.path))
  const maxZoom = Math.max(...levels)
  const tileSize = datasets[0].pixels_per_tile
  if (!tileSize) {
    throw new Error(
      'Missing required `pixels_per_tile` value in `multiscales` metadata. Please check your pyramid generation code.'
    )
  }
  return { levels, maxZoom, tileSize }
}

export const getBands = (variable, selector = {}) => {
  const bandInfo = getBandInformation(selector)
  const bandNames = Object.keys(bandInfo)

  if (bandNames.length > 0) {
    return bandNames
  } else {
    return [variable]
  }
}

export const getBandInformation = (selector) => {
  const combinedBands = Object.keys(selector)
    .filter((key) => Array.isArray(selector[key]))
    .reduce((bandMapping, selectorKey) => {
      const values = selector[selectorKey]
      let keys
      if (typeof values[0] === 'string') {
        keys = values
      } else {
        keys = values.map((d) => selectorKey + '_' + d)
      }

      const bands = Object.keys(bandMapping)
      const updatedBands = {}
      keys.forEach((key, i) => {
        if (bands.length > 0) {
          bands.forEach((band) => {
            const bandKey = `${band}_${key}`
            updatedBands[bandKey] = {
              ...bandMapping[band],
              [selectorKey]: values[i],
            }
          })
        } else {
          updatedBands[key] = { [selectorKey]: values[i] }
        }
      })

      return updatedBands
    }, {})

  return combinedBands
}


const getLineData = async (source, version, variable, coordinateKeys) => {
	let loaders, metadata, dimensions
  let shape, chunks, fill_value, dtype
	let levels, maxZoom, tileSize
  console.log("LINE SOURCE =", source)
  console.log("LINE SOURCE =", version)
  console.log("LINE SOURCE =", variable)
  console.log("LINE SOURCE =", coordinateKeys)

  // console.log("ARTLESS coordinatekeys =", coordinateKeys) // tavg

      await new Promise((resolve) =>
        zarr(window.fetch, version).openGroup(source, (err, l, m) => {
          loaders = l
          metadata = m
          resolve()
        })
      )

      ;({ levels, maxZoom, tileSize } = getPyramidMetadata(
        metadata.metadata['.zattrs'].multiscales
      ))

	 const variable1 = 'month'

   const zattrs = metadata.metadata[`${levels[0]}/${variable1}/.zattrs`]
   const zarray = metadata.metadata[`${levels[0]}/${variable1}/.zarray`]
      dimensions = zattrs['_ARRAY_DIMENSIONS']
      shape = zarray.shape
      chunks = zarray.chunks
      fill_value = zarray.fill_value
      dtype = zarray.dtype


      // await Promise.all(
      //   coordinateKeys.map(
      //     (key) =>
      //       new Promise((resolve) => {
      //         loaders[`${levels[0]}/${key}`]([0], (err, chunk) => {
      //           coordinates[key] = Array.from(chunk.data)
      //           resolve()
      //         })
      //       })
      //   )
      // )
		console.log("ARTLESS ${variable}", variable)
		console.log("ARTLESS SHAPE =", shape)
		console.log("ARTLESS ZATTRS =", zattrs)
		console.log("CHUNKS", chunks)
		console.log("COORDINATEKEYS", coordinateKeys)
  // console.log("ARTLESS LM =", loaders, metadata)
  // console.log("ARTLESS M =", metadata.metadata['.zattrs'].multiscales)
  // console.log("ARTLESS LMT =", levels, maxZoom, tileSize)
}


export const linedata = (source) => {
	const version = "v2"
  const band = 'tavg'
  // getLineData(source, version, 'band', band)

  return {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
};


// ---- this works ----
export const linedata_stub =  {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};
    // {
    //   label: 'Dataset 2',
    //   data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
    //   borderColor: 'rgb(53, 162, 235)',
    //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
    // },
