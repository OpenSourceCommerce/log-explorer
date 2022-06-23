import React, {Component} from 'react';
// import 'admin-lte/plugins/flot/jquery.flot';
// import uPlot from 'admin-lte/plugins/uplot/uPlot.cjs';
import 'admin-lte/plugins/uplot/uPlot.min.css';
import '../../styles/legend.scss';
import {LogTableActions, Live} from '../actions';
import {LiveButton} from '.';
import PropTypes from 'prop-types';

export class UPlotChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areaChart: null,
        }
        this.initChart = this.initChart.bind(this)
    }

    initChart() {
        const _this = this

        function getSize(elementId) {
            return {
                width: document.getElementById(elementId).offsetWidth,
                height: document.getElementById(elementId).offsetHeight,
            }
        }

        const optsAreaChart = {
            ...getSize('interactive'),
            scales: {
                x: {
                    time: true,
                },
            },
            series: [
                {},
                {
                    fill: 'rgba(60,141,188,0.7)',
                    stroke: 'rgba(60,141,188,1)',
                    scale: '%',
                    label: 'Hit',
                },
            ],
            hooks: {
                setSelect: [
                    (u) => {
                        const {setDate} = _this.props;

                        if (setDate && typeof setDate === 'function') {
                            let min = u.posToVal(u.select.left, 'x');
                            let max = u.posToVal(u.select.left + u.select.width, 'x');

                            if (!min || !max) {
                                return;
                            }

                            const dateRange = {
                                // from: moment.unix(min),
                                from: parseFloat(min),
                                // to: moment.unix(max),
                                to: parseFloat(max),
                                label: 'Custom Range',
                                isLive: false
                            };

                            setDate(moment.unix(min), moment.unix(max), 'Custom Range', () => {
                                // _this.loadData()
                            });
                        }
                    }
                ]
            }
        };

        // let areaChart = new uPlot(optsAreaChart, [[0], [0]], document.getElementById('interactive'));
        // this.setState({areaChart})
    }

    loadData() {
        const {uuid} = this.props;
        const {areaChart} = this.state;

        if (!areaChart) {
            return;
        }

        // Retrieve data
        LogTableActions.getGraph(uuid).then(res => {
            const {data, error} = res;
            if (error) {
                return;
            }

            // We use an inline data source in the example, usually data would
            // be fetched from a server
            const legendContainer = document.querySelector('#legendContainer');
            const legendSettings = {
                position: 'nw',
                show: true,
                noColumns: 2,
                container: legendContainer
            };

            // Custom date format to easy to view
            const filter = LogTableActions.getOptions();
            let format = '%H:%M';
            let {from} = filter;
            if (isNaN(from)) {
                from = new Date(from);
                const now = new Date();
                if (now - from < 172800000) { // 2 days in milliseconds
                    format = '%H:%M';
                } else if (from.getFullYear() === now.getFullYear()) {
                    format = '%m-%d %H:%M';
                } else {
                    format = '%Y-%m-%d %H:%M';
                }
            } else {
                from = Number.parseInt(from, 2);
                if (from > 1440) { // More than 1 days
                    format = '%m-%d %H:%M';
                }
            }
            // End

            let x = [], y = [];
            data[0].data.map((row) => {
                x.push(row[0] / 1000);
                y.push(row[1]);
            })
            areaChart.setData([x, y]);
        });
    }

    componentDidMount() {
        const _this = this;
        $(() => {
            _this.initChart();
            $('<div id=\'tooltip\'></div>')
                .css({
                    position: 'absolute',
                    display: 'none',
                    border: '1px solid #fff',
                    padding: '2px',
                    'background-color': '#c7c7f5',
                    opacity: 0.8
                })
                .appendTo('body');

            _this.loadData();
            Live.onRefresh(() => {
                _this.loadData();
            });
        });
    }

    render() {
        const { className } = this.props;
        return (
            <div className={`${className} card`}>
                <div className="card-body p-0">
                    <div className="d-flex justify-content-between">
                        <span className="ms-2">
                            <i className="far fa-chart-bar" />
                            Interactive Area Chart
                        </span>

                        <LiveButton {...this.props} />
                    </div>
                    <div id="interactive" style={{ minHeight: "100px" }} />
                </div>
                <div className="card-footer pt-1 pb-1">
                    <div id="legendContainer">&nbsp;</div>
                </div>
            </div>
        );
    }
}

UPlotChart.propTypes = {
    uuid: PropTypes.string
};
