import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'admin-lte/plugins/flot/jquery.flot';
import '../../styles/legend.scss';
import {LogTableActions, Live} from '../actions';
import {LiveButton} from '.';

export class FlotChart extends Component {
    loadData() {
        // We use an inline data source in the example, usually data would
        // be fetched from a server
        const legendContainer = document.querySelector('#legendContainer');
        const legendSettings = {
            position: 'nw',
            show: true,
            noColumns: 2,
            container: legendContainer
        };

        const options = {
            grid: {
                borderColor: '#f3f3f3',
                borderWidth: 1,
                tickColor: '#f3f3f3',
                hoverable: true,
                clickable: true
            },
            series: {
                lines: {
                    lineWidth: 2,
                    show: true,
                    fill: false
                },
                points: {show: true}
            },
            xaxis: {
                mode: 'time',
                timeBase: 'milliseconds',
                timeformat: '%H:%M'
            },
            legend: legendSettings
        };

        LogTableActions.getGraph()
            .then(response => {
                const {data, error} = response;

                if (error) {
                    return;
                }

                $.plot('#interactive', data, options);

                $('#interactive')
                    .bind('plothover', (event, pos, item) => {
                        if (!pos.x || !pos.y) {
                            return;
                        }

                        if (item) {
                            const x = item.dataIndex;
                            const y = item.datapoint[1];
                            const date = new Date(item.series.data[x][0]);
                            const string = `<br> ${date.toUTCString()}<br>Value: ${y}`;

                            $('#tooltip')
                                .html(item.series.label + string)
                                .css({
                                    top: item.pageY + 5,
                                    left: item.pageX + 5
                                })
                                .fadeIn(200);
                        } else {
                            $('#tooltip')
                                .hide();
                        }
                    });
            });
    }

    componentDidMount() {
        const that = this;
        $(() => {
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

            that.loadData();
            Live.onRefresh(() => {
                that.loadData();
            });
        });
    }

    render() {
        return (
            <div className="card card-primary card-outline">
                <div className="card-header">
                    <h3 className="card-title">
                        <i className="far fa-chart-bar"/>
                        Interactive Area Chart
                    </h3>

                    <LiveButton className="card-tools" />
                </div>
                <div className="card-body">
                    <div id="interactive" style={{height: '300px'}}>
                        &nbsp;
                    </div>
                </div>
                <div className="card-footer">
                    <div id="legendContainer">
                        &nbsp;
                    </div>
                </div>
            </div>
        );
    }
}

FlotChart.propTypes = {};
ReactDOM.render(<FlotChart/>, document.querySelector('#flot-chart'));
