/**
 *  Copyright (c) 2016, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

/* eslint-disable */

import React, { Component } from "react";
import { useState } from 'react';
import moment  from "moment";

// Pond
import { Collection, TimeSeries, TimeEvent, IndexedEvent, TimeRange } from "pondjs";

// Imports from the charts library
// import ChartContainer from "../../../../../components/ChartContainer";
// import ChartRow from "../../../../../components/ChartRow";
// import Charts from "../../../../../components/Charts";
// import YAxis from "../../../../../components/YAxis";
// import LineChart from "../../../../../components/LineChart";
// import BarChart from "../../../../../components/BarChart";
// import Resizable from "../../../../../components/Resizable";

import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    LineChart,
    BarChart,
    Resizable,
} from "react-timeseries-charts";

import stockchart_docs from "./stockchart_docs.md";
import stockchart_thumbnail from "./stockchart_thumbnail.png";

import aapl from "./aapl_historical.json";

//
// Price: High, low, open, close
//

const name = "AAPL-price";
const columns = ["time", "open", "close", "low", "high"];
const events = aapl.map(item => {
    const timestamp = moment(new Date(item.date));
    const { open, close, low, high } = item;
    return new TimeEvent(timestamp.toDate(), {
        open: +open,
        close: +close,
        low: +low,
        high: +high
    });
});
const collection = new Collection(events);
const sortedCollection = collection.sortByTime();
const series = new TimeSeries({ name, columns, collection: sortedCollection });

//
// Volume
//

const volumeEvents = aapl.map(item => {
    const index = item.date.replace(/\//g, "-");
    const { volume } = item;
    return new IndexedEvent(index, { volume: +volume });
});
const volumeCollection = new Collection(volumeEvents);
const sortedVolumeCollection = volumeCollection.sortByTime();

const seriesVolume = new TimeSeries({
    name: "AAPL-volume",
    utc: false,
    collection: sortedVolumeCollection
});


const stockchart = () =>{
    // const [mode, setMode] = useState("log");
    // const [timerange, setTimerange] = useState(
    //   new TimeRange([1236985288649, 1326654398343])
    // );

    // const handleTimeRangeChange = (timerange) => {
    //     setTimerange(timerange);
    // };
    
    // const setModeLinear = () => {
    //     setMode("linear");
    // };
    
    // const setModeLog = () => {
    //     setMode("log");
    // };

    // const renderChart = () => {
    //     // const { timerange } = this.state;
    //     const croppedSeries = series.crop(timerange);
    //     const croppedVolumeSeries = seriesVolume.crop(timerange);
    //     return (
    //         <ChartContainer
    //             timeRange={timerange}
    //             hideWeekends={true}
    //             enablePanZoom={true}
    //             onTimeRangeChanged={this.handleTimeRangeChange}
    //             timeAxisStyle={{ axis: { fill: "none", stroke: "none" } }}
    //         >
    //             <ChartRow height="300">
    //                 <Charts>
    //                     <LineChart
    //                         axis="y"
    //                         style={{ close: { normal: { stroke: "steelblue" } } }}
    //                         columns={["close"]}
    //                         series={croppedSeries}
    //                         interpolation="curveBasis"
    //                     />
    //                 </Charts>
    //                 <YAxis
    //                     id="y"
    //                     label="Price ($)"
    //                     min={croppedSeries.min("close")}
    //                     max={croppedSeries.max("close")}
    //                     format=",.0f"
    //                     width="60"
    //                     type={this.state.mode}
    //                 />
    //             </ChartRow>
    //         </ChartContainer>
    //     );
    // };

    // const linkStyle = {
    //     fontWeight: 600,
    //     color: "grey",
    //     cursor: "default",
    // };
    
    // const linkStyleActive = {
    //     color: "steelblue",
    //     cursor: "pointer",
    // };

    return (
        <Component>
            <div className="row">
                <div className="col-md-12">
                    <h3>Apple stock price</h3>
                </div>
            </div>
        </Component>
    )

    // return (
    //     <Component>
    //         <div className="row">
    //             <div className="col-md-12">
    //                 <h3>Apple stock price</h3>
    //             </div>
    //         </div>

    //         <hr />

    //         <div className="row">
    //             <div className="col-md-12" style={{ fontSize: 14, color: "#777" }}>
    //                 <span
    //                     style={mode === "log" ? linkStyleActive : linkStyle}
    //                     onClick={setModeLinear}
    //                 >
    //                     Linear
    //                 </span>
    //                 <span> | </span>
    //                 <span
    //                     style={mode === "linear" ? linkStyleActive : linkStyle}
    //                     onClick={setModeLog}
    //                 >
    //                     Log
    //                 </span>
    //             </div>
    //         </div>

    //         <hr />

    //         {/* <div className="row">
    //             <div className="col-md-12">
    //                 <Resizable>{renderChart()}</Resizable>
    //             </div>
    //         </div> */}
    //     </Component>
    //     );
};


// Export example
export default stockchart;