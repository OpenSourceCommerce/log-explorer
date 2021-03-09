import React, {Component} from 'react';
import Chart from 'admin-lte/plugins/chart.js/Chart';
import PropTypes from 'prop-types';
import {WIDGET_TYPE} from "../../utils";
import {Icon} from "../_icon";
import {WidgetHeader} from "../index";

export class DoughnutPieChart extends Component {
    componentDidMount() {
        const {data, type = WIDGET_TYPE.doughnut, id = 'new'} = this.props;

        if (data && data.length > 0) {
            if (type === WIDGET_TYPE.doughnut || type === WIDGET_TYPE.pie) {
                const doughnutChartCanvas = $(`#chart${id}`).get(0).getContext('2d')
                const charData = {
                    labels: data.map(item => item.label),
                    datasets: [
                        {
                            data: data.map(item => item.value),
                            backgroundColor: ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
                        }
                    ]
                }
                const chartOptions = {
                    maintainAspectRatio: false,
                    responsive: true,
                }

                const chart = new Chart(doughnutChartCanvas, {
                    //'pie', 'doughnut'
                    type: WIDGET_TYPE.doughnut === type ? 'doughnut' : 'pie',
                    data: charData,
                    options: chartOptions
                })
            }
        }
    }

    render() {
        const {id = 'new', type, minHeight = '250', height = '250', className, widgetHeader, data} = this.props;
        return (
            <>
                <WidgetHeader header={widgetHeader}/>
                <div className="card-body pt-0 pb-2">
                    {data && data.length > 0 ?
                        <div className={`doughnut-pie-chart ${className || ''}`}>
                            {type ?
                                <canvas id={`chart${id}`}
                                        min-height={minHeight}
                                        height={height}
                                >
                                </canvas> :
                                <p>Widget not available</p>
                            }
                        </div> :
                        <p>No data</p>
                    }
                </div>

            </>
        )
            ;
    }
}

Chart.propTypes = {
    dataWidget: PropTypes.array,
    chart: PropTypes.string,
    widgetHeader: PropTypes.string,
    minHeight: PropTypes.number,
    height: PropTypes.number,
};
