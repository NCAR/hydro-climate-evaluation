# Hydro Climate Evaluation Maps

## Sites

- [Hydro Climate Evaluation](https://hydro.rap.ucar.edu/hydro-climate-eval)
- [ESTCP ESM Modeling](https://hydro.rap.ucar.edu/hydro-climate-eval/estcp)
- [ESM Modeling](https://hydro.rap.ucar.edu/hydro-climate-eval/global)

## Description

The sites [hydro.rap.ucar.edu/hydro-climate-eval](https://hydro.rap.ucar.edu/hydro-climate-eval) and [hydro.rap.ucar.edu/hydro-climate-eval/global](https://hydro.rap.ucar.edu/hydro-climate-eval/global) are interactive web maps of hydro-climate data, the site is based on [CarbonPlan's maps](https://github.com/carbonplan/maps).

- [Map Viewing Options](https://github.com/NCAR/hydro-climate-evaluation?readme-ov-file#map-viewing-options)
- [Map Variable Details](https://github.com/NCAR/hydro-climate-evaluation?readme-ov-file#variable-details)
- [Build](https://github.com/NCAR/hydro-climate-evaluation?readme-ov-file#build)
- [Downscaling Methods Matrix PDF](https://raw.githubusercontent.com/NCAR/hydro-climate-evaluation/refs/heads/main/docs/downscalingMethodsMatrixPublic.36x24.pdf)

## Map Viewing Options

| **Viewing Option** | **Descriptin**                                | **Variables** |
|--------------------|-----------------------------------------------|--------------|
| Ave.               | Maps of metrics averaged over time epochs |  [Year Range ](https://github.com/NCAR/hydro-climate-evaluation?tab=readme-ov-file#year-range), [Downscaling Method](https://github.com/NCAR/hydro-climate-evaluation?tab=readme-ov-file#year-range), [Climate Model](https://github.com/NCAR/hydro-climate-evaluation?tab=readme-ov-file#year-range), [Metrics](https://github.com/NCAR/hydro-climate-evaluation?tab=readme-ov-file#year-range) |
| Dif.               | Map the difference between datasets of climate or observational data | [Dif. Obs. Data](https://github.com/NCAR/hydro-climate-evaluation?tab=readme-ov-file#year-range), [Downscaling Method](https://github.com/NCAR/hydro-climate-evaluation?tab=readme-ov-file#downscaling-methods), [Climate Model](https://github.com/NCAR/hydro-climate-evaluation?tab=readme-ov-file#climate-models), [Metrics](https://github.com/NCAR/hydro-climate-evaluation?tab=readme-ov-file#metrics) |
| Climate Signal: Method & Model | View climate signal of specific method and model combinations | [Downscaling Method](https://github.com/NCAR/hydro-climate-evaluation?tab=readme-ov-file#downscaling-methods), [Climate Model](https://github.com/NCAR/hydro-climate-evaluation?tab=readme-ov-file#climate-models), [Metrics](https://github.com/NCAR/hydro-climate-evaluation?tab=readme-ov-file#metrics), [RCP Scenario](https://github.com/NCAR/hydro-climate-evaluation?tab=readme-ov-file#representative-concentration-pathway-rcp-scenario) |
| Climate Signal: Metric Performance | View climate signal, averaged over best performing datasets | [Selecting Performance Metrics](https://github.com/NCAR/hydro-climate-evaluation?tab=readme-ov-file#selecting-performance-metrics) |

## Variable Details
### Year Range

| **Name**  | **Description**                              |
|-----------|----------------------------------------------|
| 1981-2004 | Time range past yearly data averaged over    |
| 2006-2099 | Time range future yearly data averaged over  |

### Downscaling Methods
See this detailed [downscaling methods matrix document](https://raw.githubusercontent.com/NCAR/hydro-climate-evaluation/refs/heads/main/docs/downscalingMethodsMatrixPublic.36x24.pdf) for more information on some of the datasets mapped.
<!-- google doc link https://docs.google.com/spreadsheets/d/e/2PACX-1vTYqCetwsunFVtImQ04HcmqH8uTrh62IGkkohCrAUD4oguSMfb9naUxsbYUCthsOw/pubhtml --->

| **Name** | **URL**                                                                                               |
|----------|-------------------------------------------------------------------------------------------------------|
| ICAR     | [Intermediate Complexity Atmospheric Research Model](https://github.com/NCAR/icar)                    |
| GARD_R2  | [GARD](https://github.com/NCAR/GARD) analog regression on precipitation and 500mb horizontal wind     |
| GARD_R3  | [GARD](https://github.com/NCAR/GARD) analog regression on 500mb water vapor and 500mb horizontal wind |
| LOCA_8th | [LOcalized Constructed Analog (LOCA)](https://github.com/NCAR/LOCA_Downscaling_Analysis)              |
| MACA     | [Multivariate Adaptive Constructed Analogs](https://climate.northwestknowledge.net/MACA/index.php)    |
| NASA-NEX | [NCCS NASA](https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6)   |

### Climate Models

| **Name**  | **URL**                                                                                                                                 |
|-----------|-----------------------------------------------------------------------------------------------------------------------------------------|
| ACCESS1-3 | [Australian Community Climate and Earth System Simulator](https://www.csiro.au/en/research/environmental-impacts/climate-change/access) |
| CanESM2   | [Canadian Earth System Model](https://climate-scenarios.canada.ca/?page=pred-canesm2)                                                   |
| CCSM4     | [Community Climate System Model](https://www2.cesm.ucar.edu/models/ccsm4.0/)                                                            |
| MIROC5    | [Model for Interdisciplinary Research on Climate](https://www.icesfoundation.org/Pages/ScienceItemDetails.aspx?siid=181)                |
| NorESM-M  | [Norwegian Earth System Model](https://github.com/NorESMhub/NorESM)                                                                     |

### Metrics

| **Name**        | **Units** | **Description**                                                    |
|-----------------|-----------|--------------------------------------------------------------------|
| `ann_t`         | °C        |                                                                    |
| `ann_p`         | mm        |                                                                    |
| `ann_snow`      | mm        |                                                                    |
| `djf_p`         | mm        | Dec/Jan/Feb seasonal mean of precipitation                         |
| `djf_t`         | °C        | Dec/Jan/Feb seasonal mean of temperature                           |
| `drought_1yr`   | Months    | Number of months where 1-year SPI falls below -1.5                 |
| `drought_2yr`   | Months    | Number of months where 2-year SPI falls below -1.5                 |
| `drought_5yr`   | Months    | Number of months where 5-year SPI falls below -1.5                 |
| `freezethaw`    | Days      | Days with daily minimum temperatures below 0°C                     |
|                 |           | and daily maximum temperatures above 0°C                           |
| `jja_p`         | mm        | Jun/Jul/Aug seasonal mean of precipitation                         |
| `jja_t`         | °C        | Jun/Jul/Aug seasonal mean of temperature                           |
| `mam_p`         | mm        | Mar/Apr/May seasonal mean of precipitation                         |
| `mam_t`         | °C        | Mar/Apr/May seasonal mean of temperature                           |
| `n34pr`         | mm        | Nino 3.4 precipitation teleconnection pattern spactial correlation |
| `n34t`          | °C        | Nino 3.4 temperature teleconnection pattern spactial correlation   |
| `pr90`          | mm        | Precipitation extremes in the 90th percentile                      |
| `pr99`          | mm        | Precipitation extremes in the 99th percentile                      |
| `ptrend`        | mm        | Precipitation trends                                               |
| `son_p`         | mm        | Sep/Oct/Nov seasonal mean of precipitation                         |
| `son_t`         | °C        | Sep/Oct/Nov seasonal mean of temperature                           |
| `t90`           | °C        | Temperature extremes in the 90th percentile                        |
| `t99`           | °C        | Temperature extremes in the 99th percentile                        |
| `tpcorr`        |           | Annual temperature-precepitation correlation                       |
| `ttrend`        | °C        | Temperature trends                                                 |
| `wt_day_to_day` |           | Weather typing spacial correlation                                 |
| `wt_clim`       |           | Weather typing climatologies                                       |


### Dif. Obs. Data
Observational dataset used to compute the difference against.

| **Name** | **Description** |
|----------|-----------------|
| CONUS404 | [Four-kilometer long-term regional hydroclimate reanalysis ](https://www.usgs.gov/data/conus404-four-kilometer-long-term-regional-hydroclimate-reanalysis-over-conterminous-united) |
| GMET     | [Gridded Meteorological Ensemble Tool](https://ncar.github.io/hydrology/models/GMET)                       |
| Livneh   | [Livneh hydrometeorological dataset](https://climatedataguide.ucar.edu/climate-data/livneh-gridded-precipitation-and-other-meteorological-variables-continental-us-mexico) |
| Maurer   | [Maurer hydrometeorological dataset](https://www.engr.scu.edu/~emaurer/gridded_obs/index_gridded_obs.html) |
| NLDAS    | [North American Land Data Assimilation System](https://ldas.gsfc.nasa.gov/nldas)                           |
| PRISM    | [PRISM Climate Group](https://prism.oregonstate.edu/)                                                      |

### Representative Concentration Pathway (RCP) Scenario

| **Name** | **Description**                                                          |
|----------|--------------------------------------------------------------------------|
| 4.5      | Radiative forcing levels of 4.5 W/m² above pre-industrial levels by 2100 |
| 8.5      | Radiative forcing levels of 8.5 W/m² above pre-industrial levels by 2100 |

### Selecting Performance Metrics

| **Steps**                     | **Description**                                                             |
|-------------------------------|-----------------------------------------------------------------------------|
| 1. Select Metrics             | Select metrics to use as the criteria for choicing the best performing maps |
| 2. Select Future RCP Scenario | RCP scenario to map                                                         |
| 3. Number of Datasets         | Number of climate signal datasets to average over                           |
| 4. Compute Climate Signal     | Compute climate signal map after completing previous steps                  |
| Plot Metric                   | Plot selected [metrics](https://github.com/NCAR/hydro-climate-evaluation?tab=readme-ov-file#metrics) |



# Build
### Prerequisites
- NodeJS to host site
- [Zarr datasets](https://github.com/scrasmussen/icar-zarr-data) to map

### Local Build
```
$ npm install .
$ npm local
$ npm run
```

### Production Build
For hosting at [hydro.rap.ucar.edu/hydro-climate-eval](https://hydro.rap.ucar.edu/hydro-climate-eval)
```
$ npm install .
$ npm run dev
$ npm start
```

### View Local Map
Go to [localhost:3000](http://localhost:3000) in a browser to preview website.

<img width="400" alt="image" src="https://github.com/NCAR/hydro-climate-evaluation/assets/5750642/5ab5462d-206c-4bb5-9a67-2ac45606ad22">



# License
[License](https://github.com/NCAR/hydro-climate-evaluation/blob/main/LICENSE.md)
is based on [CarbonPlan's maps](https://github.com/carbonplan/maps).
All the original code in this repository is MIT licensed.
The library contains code from mapbox-gl-js version 1.13 (3-Clause BSD licensed).
Please provide attribution if reusing any of our digital content (graphics, logo, copy, etc.).
