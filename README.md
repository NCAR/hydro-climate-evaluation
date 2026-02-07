# Hydro Climate Evaluation Maps

## Sites

- [Hydro Climate Evaluation](https://hydro.rap.ucar.edu/hydro-climate-eval)
- [ESTCP Downscaling Evaluation](https://hydro.rap.ucar.edu/hydro-climate-eval/estcp)
- [ESM Modeling](https://hydro.rap.ucar.edu/hydro-climate-eval/global)

### Status
![Hydro Climate Evaluation](https://img.shields.io/website?url=https%3A%2F%2Fhydro.rap.ucar.edu%2Fhydro-climate-eval&label=Hydro%20Climate%20Evaluation)
![ESTCP Downscaling Evaluation](https://img.shields.io/website?url=https%3A%2F%2Fhydro.rap.ucar.edu%2Fhydro-climate-eval%2Festcp&label=ESTCP%20Downscaling%20Evaluation)
![ESM Modeling](https://img.shields.io/website?url=https%3A%2F%2Fhydro.rap.ucar.edu%2Fhydro-climate-eval%2Fglobal&label=ESM%20Modeling)

## Description

These sites are interactive web maps of hydro-climate data. The sites are based on [CarbonPlan's maps](https://github.com/carbonplan/maps).

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
| 1981-2016 | Time range past yearly data averaged over    |
| 2016-2099 | Time range future yearly data averaged over  |

### Downscaling Methods
See this detailed [downscaling methods matrix document](https://raw.githubusercontent.com/NCAR/hydro-climate-evaluation/refs/heads/main/docs/downscalingMethodsMatrixPublic.36x24.pdf) for more information on some of the datasets mapped.
<!-- google doc link https://docs.google.com/spreadsheets/d/e/2PACX-1vTYqCetwsunFVtImQ04HcmqH8uTrh62IGkkohCrAUD4oguSMfb9naUxsbYUCthsOw/pubhtml --->

| **Name** | **URL**                                                                                               |
|----------|-------------------------------------------------------------------------------------------------------|
| ICAR     | [Intermediate Complexity Atmospheric Research Model](https://github.com/NCAR/icar)                    |
| GARD_puv  | [GARD](https://github.com/NCAR/GARD) analog regression on precipitation and 500mb horizontal wind     |
| GARD_quv  | [GARD](https://github.com/NCAR/GARD) analog regression on 500mb water vapor and 500mb horizontal wind |
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

| **Short Name**  | **Long Name**                                      | **Units** | **Description**                                                                                                                                   |
|-----------------|----------------------------------------------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `ann_p`         | Annual Precipiation                                | mm        | Mean of yearly annual total precipitation                                                                                                         |
| `ann_t`         | Annual Temperature                                 | °C        | Mean of yearly annual mean temperature                                                                                                            |
| `ann_p_iav`     | Standard Deviation Annual Precipitation            | °C        | Standard deviation of yearly annual total precipitation                                                                                           |
| `ann_t_iav`     | Standard Deviation Annual Temperature              | °C        | Standard deviation of yearly annual mean temperature                                                                                              |
| `ann_snow`      | Annual Snow Accumulation                           | mm        | Mean of yearly annual total snow accumulation (Pr when daily mean T < 1°C)                                                                        |
| `ann_snow_iav`  | Standard Deviation Annual Snow Accummulation       | mm        | Standard deviation of yearly annual total snow accumulation (Pr when daily mean T < 1°C)                                                          |
| `djf_p`         | Seasonal Precipitation                             | mm        | Mean of yearly seasonal Dec/Jan/Feb total precipitation                                                                                           |
| `djf_t`         | Seasonal Temperature                               | °C        | Mean of yearly seasonal Dec/Jan/Feb mean temperature                                                                                              |
| `djf_p_iav`     | Standard Deviation Seasonal Precipitation          | °C        | Standard deviation of Dec/Jan/Feb seasonal total precipitation                                                                                    |
| `djf_t_iav`     | Standard Deviation Seasonal Temperature            | °C        | Standard deviation of Dec/Jan/Feb seasonal mean temperature                                                                                       |
| `freezethaw`    | Freeze-Thaw Cycles                                 | Days      | Mean of annual total freeze-thaw cycles (days with Tmin < 0 and Tmax > 0)                                                                         |
| `jja_p`         | Seasonal Precipitation                             | mm        | Mean of yearly seasonal Jun/Jul/Aug total precipitation                                                                                           |
| `jja_t`         | Seasonal Temperature                               | °C        | Mean of yearly seasonal Jun/Jul/Aug mean temperature                                                                                              |
| `jja_p_iav`     | Standard Deviation Seasonal Precipitation          | °C        | Standard deviation of Jun/Jul/Aug seasonal total precipitation                                                                                    |
| `jja_t_iav`     | Standard Deviation Seasonal Temperature            | °C        | Standard deviation of Jun/Jul/Aug seasonal mean temperature                                                                                       |
| `mam_p`         | Seasonal Precipitation                             | mm        | Mean of yearly seasonal Mar/Apr/May total precipitation                                                                                           |
| `mam_t`         | Seasonal Temperature                               | °C        | Mean of yearly seasonal Mar/Apr/May mean temperature                                                                                              |
| `mam_p_iav`     | Standard Deviation Seasonal Precipitation          | °C        | Standard deviation of Mar/Apr/May seasonal total precipitation                                                                                    |
| `mam_t_iav`     | Standard Deviation Seasonal Temperature            | °C        | Standard deviation of Mar/Apr/May seasonal mean temperature                                                                                       |
| `n34pr`         | Nino3.4 Precipitation                              | mm        | Temporal correlation between yearly DJF Nino 3.4 Index and DJF precipitation                                                                              |
| `n34t`          | Nino3.4 Temperature                                | °C        | Temporal correlation between yearly DJF Nino 3.4 Index and DJF temperature                                                                        |
| `pr90`          | Precipitation 90th Percentile                      | mm        | 90th percentile daily precipitation accumulation                                                                                                  |
| `pr99`          | Precipitation 99th Percentile                      | mm        | 99th percentile daily precipitation accumulation                                                                                                  |
| `pr_gev-#yr`    | Precipitation GEV #Yr                              |           | Return level of annual precipitation maximum for {20, 50, 100} year return period, estimated from GEV function fit to annual precipitation maxima |
| `ptrend`        | Precipitation Trend                                | mm        | Linear trend of annual mean precipitation by least squares regression                                                                             |
| `son_p`         | Seasonal Precipitation                             | mm        | Mean of yearly seasonal Sep/Oct/Nov total precipitation                                                                                           |
| `son_t`         | Seasonal Temperature                               | °C        | Mean of yearly seasonal Sep/Oct/Nov mean temperature                                                                                              |
| `son_p_iav`     | Standard Deviation Seasonal Precipitation          | °C        | Standard deviation of Sep/Oct/Nov seasonal total precipitation                                                                                    |
| `son_t_iav`     | Standard Deviation Seasonal Temperature            | °C        | Standard deviation of Sep/Oct/Nov seasonal mean temperature                                                                                       |
| `SPI#year`      | Standardized Precipitation Index                   |           | Total count of months with SPI < -1.5 computed from smoothed precipitation using {1, 2, 5} year window                                            |
| `t90`           | Temperature 90th Percentile                        | °C        | 90th percentile daily temperature extremes                                                                                                        |
| `t99`           | Temperature 99th Percentile                        | °C        | 99th percentile daily temperature extremes                                                                                                        |
| `tpcorr`        | Temperature and Precipitation Temporal Correlation |           | Temporal correlation of annual mean temperature and annual total precipitation                                                                    |
| `ttrend`        | Temperature Trend                                  | °C        | Linear trend of annual mean temperature by least squares regression                                                                               |
| `wet_day_frac`  | Wet Day Fraction                                   |           | Wet day fraction (Fraction of days with Pr > 0)                                                                                                   |
| `wt_day_to_day` |                                                    |           | Weather typing spacial correlation                                                                                                                |
| `wt_clim`       |                                                    |           | Weather typing climatologies                                                                                                                      |


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
To build the website the user will need to
  1. [Obtain Code](#obtain-code)
  2. [Setup Environment](#environment)
  3. [Obtain Datasets](#datasets)
  4. [Host Site](#hosting)

## Obtain Code
Note, this repository uses [Git Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules).
```
$ git clone --recurse-submodules git@github.com:NCAR/hydro-climate-evaluation.git
$ cd hydro-climate-evaluation
```

## Prerequisites
### Environment
The simplest way is to use a [Conda Environment](https://docs.conda.io/projects/conda/en/stable/user-guide/getting-started.html#creating-environments) to install the NodeJS prerequisite.
```
  First Setup of Conda Environment
$ conda env create -f conda-environment.yml
  or
$ conda activate maps
$ conda env update -f conda-environment.yml

  Future Use After Setup
$ conda activate maps
```

### Datasets
Create datasets using the [Zarr datasets](https://github.com/NCAR/zarr-data-maps)
repository to change NetCDF files to Zarr files that can be mapped.

Or download datasets from <https://hydro.rap.ucar.edu/hydro-climate-eval/data/refactor/>.
Note, the size of these files range from 50MB to 1.7GB.
```
$ mkdir -p data/refactor
$ cd data/refactor
$ wget https://hydro.rap.ucar.edu/hydro-climate-eval/data/refactor/basemaps.tar.gz
$ wget https://hydro.rap.ucar.edu/hydro-climate-eval/data/refactor/climateSignal.tar.gz
$ wget https://hydro.rap.ucar.edu/hydro-climate-eval/data/refactor/map.tar.gz
$ wget https://hydro.rap.ucar.edu/hydro-climate-eval/data/refactor/obs.tar.gz
$ wget https://hydro.rap.ucar.edu/hydro-climate-eval/data/refactor/refactor_conus.tar.gz IS THIS NEEDED???
$ wget https://hydro.rap.ucar.edu/hydro-climate-eval/data/refactor/regionmaps.tar.gz
$ for f in *.tar.gz; do tar zxf "$f"; done
```



## Hosting
The `Production` and `Development` builds are for a hosted website while the `Local` builds a local web server.
For setting up the URL redirect to point to the hosted website the user will need to talk to their Sys Admins.
### Production Build
The production build is more reliable and faster, but changes will only show up after a user rebuilds.
This is for hosting at [hydro.rap.ucar.edu/hydro-climate-eval](https://hydro.rap.ucar.edu/hydro-climate-eval)
```
$ npm install .
$ npm run build
$ npm run start

Or use Makefile
$ make install
$ make build
$ make run
```

### Development Build
The development build will host the site at [hydro.rap.ucar.edu/hydro-climate-eval](https://hydro.rap.ucar.edu/hydro-climate-eval)
but compiles on-the-fly as the user loads the site. This is nice for development but leads to slow page-loads and random reloads.

```
$ npm install .
$ npm run build
$ npm run dev

Or use Makefile
$ make install
$ make build
$ make dev
```
### Local Build
This is for building locally, the data will be read from
<https://hydro.rap.ucar.edu/hydro-climate-eval/data/> unless the user changes
the value of the `bucket` variable in the files of the `initialConditions`
directory. The variable `bucket` would need to be changed to
`http://localhost:8080/hydro-climate-eval/data/refactor/`.

```
$ npm install .
$ npm run build
$ npm run local

Or use Makefile
$ make install
$ make build
$ make local
```

# License
[License](https://github.com/NCAR/hydro-climate-evaluation/blob/main/LICENSE.md)
is based on [CarbonPlan's maps](https://github.com/carbonplan/maps).
All the original code in this repository is MIT licensed.
The library contains code from mapbox-gl-js version 1.13 (3-Clause BSD licensed).
Please provide attribution if reusing any of our digital content (graphics, logo, copy, etc.).
