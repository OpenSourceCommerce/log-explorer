import React, {Component} from 'react';
import Chart from 'admin-lte/plugins/chart.js/Chart';
import PropTypes from 'prop-types';
import {WIDGET_TYPE} from "../../utils";
import {Icon} from "../_icon";
import {WidgetHeader} from "../index";

export class DoughnutPieChart extends Component {
    componentDidMount() {
        const {data, type = 'doughnut', id} = this.props;
        console.log('id', id);
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
                type,
                data: charData,
                options: chartOptions
            })
        }
    }

    render() {
        const {id, type, minHeight = '250', height = '250', className, widgetHeader} = this.props;
        console.log('id', id);
        return (
            <>
                <WidgetHeader header={widgetHeader}/>
                <div className="card-body pt-0 pb-2">
                    <div className={`doughnut-pie-chart ${className || ''}`}>
                        {WIDGET_TYPE[type] ?
                            <canvas id={`chart${id}`}
                                    min-height={minHeight}
                                    height={height}
                            >
                            </canvas> :
                            <p>Widget not available</p>
                        }
                    </div>

                </div>

            </>
        )
            ;
    }
}

Chart.propTypes = {
    data: PropTypes.array,
    chart: PropTypes.string,
    widgetHeader: PropTypes.string,
    minHeight: PropTypes.number,
    height: PropTypes.number,
};
