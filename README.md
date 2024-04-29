# ICAR Maps
A web map of [ICAR](https://github.com/NCAR/icar) data based on [CarbonPlan's maps](https://github.com/carbonplan/maps).


## Build
### Prerequisites
- Start Docker Desktop or its equivalent in the background.
- Start server to host data.
  See the [ICAR Zarr Data](https://github.com/scrasmussen/icar-zarr-data) repo for instructions on locally hosting ICAR Zarr data for testing.

### Docker Build
The following commands will start a Docker Image and from within the image startup and run a Node.js website.
```
startup docker
$ make rundocker

run website
$ make run
```
Go to <localhost:3000> to see website.

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
