import React, { useRef, useEffect, useState } from "react";
import { ChartJsComponent } from "./_chart-component";
import { generateRandomColor, WIDGET_TYPE } from "../../utils";
import "../../../styles/component/_doughnut-pie-chart.scss";

export const Chart = ({
    data,
    type = WIDGET_TYPE.doughnut,
    id = "new",
    onLabelClicked,
    className,
}) => {
    const mapDataForChart = () => {
        let chartData = {
            labels: data.map((item) => item.label),
        };
        switch (type) {
            case WIDGET_TYPE.doughnut:
            case WIDGET_TYPE.pie: {
                let backgroundColor = data.map(() => generateRandomColor());
                chartData.datasets = [
                    {
                        data: data.map((item) => item.value),
                        backgroundColor,
                    },
                ];
                break;
            }
            case WIDGET_TYPE.line:
            case WIDGET_TYPE.bar: {
                const [borderColor, backgroundColor] = generateRandomColor(true);
                chartData.datasets = [
                    {
                        data: data.map((item) => item.value),
                        borderColor,
                        backgroundColor,
                    },
                ];
                break;
            }
        }
        return chartData;
    };

    const chartOptions = {
        aspectRatio: 1.5,
        plugins: {
            legend: {
                display: ![WIDGET_TYPE.bar, WIDGET_TYPE.line].includes(type) ? true : false,
                align: "center",
                position: "bottom",
                labels: {
                    usePointStyle: true,
                },
                onClick(_, legendItem) {
                    if (onLabelClicked) onLabelClicked(legendItem.text);
                    // legend.chart.toggleDataVisibility(legendItem.index);
                    // legend.chart.update();
                },
            },
        },
        tooltips: {
            enabled: false,
        },
        // onClick: (e, activeEls) => {
        //     let datasetIndex = activeEls[0].datasetIndex;
        //     let dataIndex = activeEls[0].index;
        //     let datasetLabel = e.chart.data.datasets[datasetIndex].label;
        //     let value = e.chart.data.datasets[datasetIndex].data[dataIndex];
        //     let label = e.chart.data.labels[dataIndex];
        //     if (onLabelClicked) onLabelClicked(label);
        // },
    };

    return (
        <div className="card-body pt-0 pb-2 overflow-auto">
            {data && data.length > 0 ? (
                <div id={`chart-${id}`} className={`chart-${id} ${className || ""}`}>
                    {type ? (
                        <div className="chart-container">
                            <ChartJsComponent
                                type={type}
                                data={mapDataForChart()}
                                options={chartOptions}
                            />
                        </div>
                    ) : (
                        <p>Widget not available</p>
                    )}
                </div>
            ) : (
                <p className="m-5 text-center">No data</p>
            )}
        </div>
    );
};
