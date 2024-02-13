import React, { useEffect, useState } from 'react';
import { slice, openArray, openGroup } from "zarr";

export const getData = async (props, setChartData) => {
    const chartSource = props.chartSource
    const z = await openArray({
        store: chartSource,
        // path not needed, chartSource has full path already
        // path: "data/chart/icar/noresm/prec",
        mode: "r"
    });


    // GET PENDING
    // const zarrData = z.get([slice(null, z.meta.shape)])
    // const arg1 =  [slice(null, z.meta.shape)]
    const arg1 =  [slice(null, 12)]

    z.get(arg1).then(
        function(result){
            console.log("GET ZARR DATA RESULT", z)
            setChartData(result.data);
        });
}

export default getData;
