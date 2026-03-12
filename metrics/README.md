# Metrics
The metrics files are generated json files that are read by the website at
runtime to calculate the best scoring, based on the users input of metric choices.

# Build
Use scripts from the [[https://github.com/NCAR/zarr-data-maps][zarr-data-maps]] repository.
```bash
$ python3 create_global_zarr.py \
  /path/to/downscaling_metrics/cmip5/ \
  /path/to/downscaling_metrics/obs/ \
  /path/to/cmip5/Normalized_Error_Metrics_CMIP5.nc \
  --metric-score-path output_path/
```

After generating the metrics files the output directory should have files
named `{region}_metrics.js`.
Copy those new files to the this directory.


# Schema
|--------------------------|-------------------|----------------------------------------------------------------------------------------------------------|
| variable                 | Type              | Description                                                                                              |
|--------------------------|-------------------|----------------------------------------------------------------------------------------------------------|
| num_metrics              | integer           | Number of metrics                                                                                        |
| num_datasets             | integer           | Number of dataset/model-downscaling combinations                                                         |
| combinations             | array of strings  | Labels of the form "[Downscaling Method] with [Model]"                                                   |
| combinations_downscaling | array of strings  | Downscaling method names                                                                                 |
| combinations_model       | array of strings  | Model names                                                                                              |
| metrics                  | array of strings  | Metric names                                                                                             |
| schemes                  | dictionary        | Mapping of scheme keys to scheme names. Schemes are method of analysis used                              |
| scores                   | nested dictionary | Score data organized as scores[scheme][metric] = array, each array is aligned by index with combinations |
|--------------------------|-------------------|----------------------------------------------------------------------------------------------------------|
