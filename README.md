# Hydro Climate Evaluation Map
An interactive web map of hydro-climate data based on [CarbonPlan's maps](https://github.com/carbonplan/maps).

## Viewing Options
### Ave.
Map of metrics averages over the time period.
| **Option**         |
| Year Range         |
| Downscaling Method |
| Climate Model      |
| Metrics            |

### Dif.
| **Option**         |
| Dif. Obs. Data     |
| Downscaling Method |
| Climate Model      |
| Metrics            |

### Climate Signal
#### Method & Model
| **Option**         |
| Downscaling Method |
| Climate Model      |
| Metrics            |
| RCP Scenario       |


## Variable Details
### Year Range
| **Name**  | **Description**                           |
| 1981-2004 | Time range data yearly data averaged over |
### Downscaling Methods
| **Name**     | **URL**                                                                                             |
| ICAR         | [Intermediate Complexity Atmospheric Research Model](https://github.com/NCAR/icar)                  |
| GARD_{R2,R3} | [Ensemble Generalized Analog Regression Downscaling](https://github.com/NCAR/GARD)                  |
| LOCA_8th     | [LOcalized Constructed Analog(LOCA)](https://github.com/NCAR/LOCA_Downscaling_Analysis)             |
| MACA         | [Multivariate Adaptive Constructed Analogs](https://climate.northwestknowledge.net/MACA/index.php)  |
| NASA-NEX     | [NCCS NASA](https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6) |
### Climate Models
| **Name**  | **URL**                                                                                                                                 |
| NorESM-M  | [Norwegian Earth System Model](https://github.com/NorESMhub/NorESM)                                                                     |
| ACCESS1-3 | [Australian Community Climate and Earth System Simulator](https://www.csiro.au/en/research/environmental-impacts/climate-change/access) |
| CanESM2   | [Canadian Earth System Model](https://climate-scenarios.canada.ca/?page=pred-canesm2)                                                   |
| CCSM4     | [Community Climate System Model](https://www2.cesm.ucar.edu/models/ccsm4.0/)                                                            |
| MIROC5    | [Model for Interdisciplinary Research on Climate](https://www.icesfoundation.org/Pages/ScienceItemDetails.aspx?siid=181)                |
### Metrics
| **Name**       | **Description**                                                  |
| N34T, N34PR    | Nino 3.4 temp/precip teleconnection pattern spactial correlation |
| TTREND, PTREND | Temp/precip trends                                               |
| T90, T99       | Temperature extremes in the 90th/99th percentile                 |
| PR90, PR99     | Precipitation extremes in the 90th/99th percentile               |
| DJF_{T,P}      | Seasonal mean temp/precip over Dec/Jan/Feb                       |
| MAM_{T,P}      | Seasonal mean temp/precip over Mar/Apr/May                       |
| JJA_{T,P}      | Seasonal mean temp/precip over Jun/Jul/Aug                       |
| SON_{T,P}      | Seasonal mean temp/precip over Sep/Oct/Nov                       |

### Dif. Obs. Data
Observational dataset used to compute the difference against.
| **Name** | **Description** |
| CONUS404 | [Four-kilometer long-term regional hydroclimate reanalysis ](https://www.usgs.gov/data/conus404-four-kilometer-long-term-regional-hydroclimate-reanalysis-over-conterminous-united)                |
| Livneh   | [Livneh hydrometeorological dataset](https://climatedataguide.ucar.edu/climate-data/livneh-gridded-precipitation-and-other-meteorological-variables-continental-us-mexico)                |
| Maurer   | [Maurer hydrometeorological dataset](https://www.engr.scu.edu/~emaurer/gridded_obs/index_gridded_obs.html)                |
| NLDAS    | [North American Land Data Assimilation System](https://ldas.gsfc.nasa.gov/nldas)                |
| PRISM    | [PRISM Climate Group](https://prism.oregonstate.edu/) |
### Representative Concentration Pathway (RCP) Scenario
| **Name** | **Description**                                                          |
| 4.5      | Radiative forcing levels of 4.5 W/m² above pre-industrial levels by 2100 |
| 8.5      | Radiative forcing levels of 8.5 W/m² above pre-industrial levels by 2100 |



## Build
### Prerequisites
- Initialize Git Submodules to get `icar-maps` branch of [CarbonPlan's maps](https://github.com/scrasmussen/carbonplan-maps).
- Start Docker Desktop or its equivalent in the background.
- Start server to host data.
  See the [ICAR Zarr Data](https://github.com/scrasmussen/icar-zarr-data) repo for instructions on locally hosting ICAR Zarr data for testing.

### Docker Build
The following commands will start a Docker Image and from within the image startup and run a Node.js website.
```
startup docker
$ make rundocker

run website, on startup of Docker node_modules may need to be reinstalled
$ make init
$ make run
```
Go to [localhost:3000](http://localhost:3000) in a browser to preview website.

<img width="400" alt="image" src="https://github.com/scrasmussen/icar-maps/assets/5750642/5ab5462d-206c-4bb5-9a67-2ac45606ad22">




### Non-Docker Build
Install npm then run the following.
```
$ npm install .
$ npm run dev
```

# License
This is based on [CarbonPlan's maps](https://github.com/carbonplan/maps).
All the original code in this repository is MIT licensed. The library contains code from mapbox-gl-js version 1.13 (3-Clause BSD licensed). We request that you please provide attribution if reusing any of our digital content (graphics, logo, copy, etc.).


# TODO
- [ ] update node_modules/@carbonplan/maps/dst/index.esm.js:import { scaleOrdinal } from 'd3-scale'
