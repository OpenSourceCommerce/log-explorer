import React, {Component} from 'react';
import Chart from 'admin-lte/plugins/chart.js/Chart';
import PropTypes from 'prop-types';
import {WIDGET_TYPE} from "../../utils";
import '../../../styles/component/_doughnut-pie-chart.scss';

export class DoughnutPieChart extends Component {
    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    componentDidMount = () => {
        const {data, type = WIDGET_TYPE.doughnut, id = 'new', color, duration = 1000} = this.props;

        this.legendId = `[data-results-chart-legends-${id}]`;

        if (data && data.length > 0) {
            if (type === WIDGET_TYPE.doughnut || type === WIDGET_TYPE.pie) {
                const doughnutChartCanvas = $(`#chart${id}`).get(0).getContext('2d')
                const charData = {
                    labels: data.map(item => item.label),
                    datasets: [
                        {
                            data: data.map(item => item.value),
                            backgroundColor: color,
                        }
                    ]
                };

                const chartOptions = {
                    maintainAspectRatio: false,
                    responsive: true,
                    legend: {
                        display: false,
                        align: 'start',
                        position: 'right',
                    },
                    legendCallback: (chart) => {
                        const renderLabels = (chart) => {
                            const {data} = chart;
                            return data.datasets[0].data
                                .map(
                                    (_, i) => `<li id="legend-${i}-item" class="legend-item" onmousedown="event.stopPropagation();">
                                            <span class="dot" style="background-color:
                                             ${data.datasets[0].backgroundColor[i]}"></span>
                                             <a class="label-legend">${data.labels[i] || ''}</a>
                                    </li>`).join("");
                        };
                        return renderLabels(chart);
                    },
                    animation: {
                        duration, // general animation time
                    },
                }

                const chart = new Chart(doughnutChartCanvas, {
                    //'pie', 'doughnut'
                    type: WIDGET_TYPE.doughnut === type ? 'doughnut' : 'pie',
                    data: charData,
                    options: chartOptions
                });
                $(document).ready(function () {
                    document.querySelector(`.doughnut-pie-chart-${id} .data-results-chart-legends`).innerHTML = chart.generateLegend();
                });
            }
        }
    }

    render() {
        const {id = 'new', type, minHeight = '200', height = '200', className, data} = this.props;

        const columnCount = data && data.length > 10 ? 2 : 1;
        return (
            <div className="doughnut-pie-chart">
                <div className="card-body pt-0 pb-2">
                    {data && data.length > 0 ?
                        <div id={`doughnut-pie-chart-${id}`}
                             className={`doughnut-pie-chart-${id} ${className || ''}`}>
                            {type ?
                                <div className="d-flex flex-row flex-wrap justify-content-start">
                                    <div className="">
                                        <canvas id={`chart${id}`}
                                                min-height={minHeight}
                                                height={height}
                                        >
                                        </canvas>
                                    </div>
                                    <ul className="data-results-chart-legends list-unstyled" style={{columnCount,}}/>
                                </div> :
                                <p>Widget not available</p>
                            }
                        </div> :
                        <p className="m-5 text-center">No data</p>
                    }
                </div>
            </div>
        )
            ;
    }
}

Chart.propTypes = {
    dataWidget: PropTypes.array,
    chart: PropTypes.string,
    minHeight: PropTypes.number,
    height: PropTypes.number,
};
