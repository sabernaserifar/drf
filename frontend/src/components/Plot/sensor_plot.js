import React, { Component } from "react";
import { useState } from 'react';
import moment  from "moment";
import Container from '@material-ui/core/Container';
import { Collection, TimeSeries, TimeEvent, IndexedEvent, TimeRange } from "pondjs";
import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    LineChart,
    BarChart,
    Resizable,
} from "react-timeseries-charts";

// import aapl from "./aapl_historical.json";

const SensorPlot = ({ posts, query}) =>{
    const posts_map = new Map(posts);
    let all_data = [];
    let sensor_names = [];
    posts_map.forEach((_, sensor) => {        
        const sensor_data = posts_map.get(sensor);
        sensor_names.push(sensor);
        const name = "AAPL-price";
        const columns = ["time", "value"];
        const events = sensor_data.map(item => {
            const timestamp = moment(new Date(item.time));
            const { value } = item;
            return new TimeEvent(timestamp.toDate(), {
                value: +value,
              
            });
        });
        const collection = new Collection(events);
        const sortedCollection = collection.sortByTime();
        const series = new TimeSeries({ name, columns, collection: sortedCollection });
        all_data.push(series);  
    });

    var fmt = "YYYY-MM-DD HH:mm";
    var beginTime = moment(query.date_min, fmt);
    var endTime =   moment(query.date_max, fmt);


    const [mode, setMode] = useState("linear");
    const [timerange, setTimerange] = useState(
      new TimeRange(beginTime, endTime)
    );

    const handleTimeRangeChange = (timerange) => {
        setTimerange(timerange);
    };
    
    const setModeLinear = () => {
        setMode("linear");
    };
    
    const setModeLog = () => {
        setMode("log");
    };

  
    const renderChart = () => {
        return (
            <ChartContainer
                timeRange={timerange}
                hideWeekends={true}
                enablePanZoom={true}
                onTimeRangeChanged={handleTimeRangeChange}
                timeAxisStyle={{ axis: { fill: "none", stroke: "none" } }}
            >
            { all_data && all_data.map( (values, i) =>{
                // console.log("VALUEEES", values._collection._eventList.size)
                // if (!values._collection._eventList.size > 0 ){
                //     return
                // }
                // const croppedSeries = values.crop(timerange);

                const croppedSeries = values

                return (
                    <ChartRow height="300">
                        <Charts>
                            <LineChart
                                axis="y"
                                style={{ value: { normal: { stroke: "steelblue" } } }}
                                columns={["value"]}
                                series={croppedSeries}
                                interpolation="curveBasis"
                            />
                        </Charts>
                        <YAxis
                            id="y"
                            label={sensor_names[i]}
                            min={croppedSeries.min("value")}
                            max={croppedSeries.max("value")}
                            format=",.0f"
                            width="60"
                            type={mode}
                        />
                    </ChartRow>
                )
            })}
            </ChartContainer>
        );
    };

    const linkStyle = {
        fontWeight: 600,
        color: "grey",
        cursor: "default",
    };
    
    const linkStyleActive = {
        color: "steelblue",
        cursor: "pointer",
    };

    return (
        <Container component="main" maxWidth="xl">
            <div className="row">
                <div className="col-md-12">
                    <h3>Apple stock price</h3>
                </div>
            </div>

            <hr />

            <div className="row">
                <div className="col-md-12" style={{ fontSize: 14, color: "#777" }}>
                    <span
                        style={mode === "log" ? linkStyleActive : linkStyle}
                        onClick={setModeLinear}
                    >
                        Linear
                    </span>
                    <span> | </span>
                    <span
                        style={mode === "linear" ? linkStyleActive : linkStyle}
                        onClick={setModeLog}
                    >
                        Log
                    </span>
                </div>
            </div>

            <hr />

            <div className="row">
                <div className="col-md-12">
                    <Resizable>{renderChart()}</Resizable>
                </div>
            </div>
        </Container>
        );
};


export default SensorPlot;