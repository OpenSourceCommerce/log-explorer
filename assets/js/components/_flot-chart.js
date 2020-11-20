import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'admin-lte/plugins/flot/jquery.flot';

export class FlotChart extends Component {
    componentDidMount() {
        $(() => {
            // We use an inline data source in the example, usually data would
            // be fetched from a server
            const options = {
                grid: {
                    borderColor: '#f3f3f3',
                    borderWidth: 1,
                    tickColor: '#f3f3f3'
                },
                series: {
                    color: '#3c8dbc',
                    lines: {
                        lineWidth: 2,
                        show: true,
                        fill: false
                    }
                },
                xaxis: {
                    mode: 'categories',
                    showTicks: false,
                    gridLines: false
                }
            };

            $.ajax({
                url: '/stream/{uuid}/graph',
                dataType: 'json',
                success(response) {
                    const {data, error} = response;

                    if (error) {
                        return;
                    }

                    $.plot('#interactive', data, options);
                }
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

                    <div className="card-tools">
                        Real time
                        <div className="btn-group" id="realtime" data-toggle="btn-toggle">
                            <button type="button" className="btn btn-default btn-sm active"
                                data-toggle="on">On
                            </button>
                            <button type="button" className="btn btn-default btn-sm"
                                data-toggle="off">Off
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div id="interactive" style={{height: '300px'}}>
                        &nbsp;
                    </div>
                </div>
            </div>
        );
    }
}

FlotChart.propTypes = {};
ReactDOM.render(<FlotChart/>, document.querySelector('#flot-chart'));
