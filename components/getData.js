import React, { useEffect, useState } from 'react';
import { slice, openArray, openGroup } from "zarr";

export const getData = async (props, setChartData) => {
    const z = await openArray({
        store: "http://localhost:8000/",
        // store: "http://localhost:4000/",
        path: "bar.zarr",
        mode: "r"
    });

    // GET PENDING
    // const zarrData = z.get([slice(null, z.meta.shape)])
    // const arg1 =  [slice(null, z.meta.shape)]
    const arg1 =  [slice(null, 12)]

    z.get(arg1).then(
        function(result){
            setChartData(result.data);
        });
}

export default getData;
