import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'admin-lte/plugins/flot/jquery.flot'

export class FlotChart extends Component {
    componentDidMount() {
        $(() => {
            // We use an inline data source in the example, usually data would
            // be fetched from a server
            let data = [];
            const totalPoints = 100;

            function getRandomData() {
                if (data.length > 0) {
                    data = data.slice(1);
                }

                // Do a random walk
                while (data.length < totalPoints) {
                    const previous = data.length > 0 ? data[data.length - 1] : 50;
                    let y = previous + (Math.random() * 10) - 5;

                    if (y < 0) {
                        y = 0;
                    } else if (y > 100) {
                        y = 100;
                    }

                    data.push(y);
                }

                // Zip the generated y values with the x values
                const response = [];
                for (const [i, datum] of data.entries()) {
                    response.push([i, datum]);
                }

                return response;
            }

            const interactivePlot = $.plot('#interactive', [
                {
                    data: getRandomData()
                }
            ],
            {
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
                        fill: true
                    }
                },
                yaxis: {
                    min: 0,
                    max: 100,
                    show: true
                },
                xaxis: {
                    show: true
                }
            }
            );

            const updateInterval = 500; // Fetch data ever x milliseconds
            let realtime = 'on'; // If == to on then fetch data every x seconds. else stop fetching
            function update() {
                interactivePlot.setData([getRandomData()]);

                // Since the axes don't change, we don't need to call plot.setupGrid()
                interactivePlot.draw();
                if (realtime === 'on') {
                    setTimeout(update, updateInterval);
                }
            }

            // INITIALIZE REALTIME DATA FETCHING
            if (realtime === 'on') {
                update();
            }

            // REALTIME TOGGLE
            $('#realtime .btn')
                .click(function () {
                    realtime = $(this)
                        .data('toggle') === 'on' ? 'on' : 'off';
                    update();
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
