import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    AdvancedSearch,
    Summary,
    FlotChart,
    LogViewTable
} from '../../components';
import {Live, LogTableActions, Event, LogViewActions} from '../../actions';
import '../../../styles/pages/index.scss';
import {DATE_RANGE, getDataFromCookies, setDataToCookies} from "../../utils";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: [],
            logViews: [],
            isRetrieveAllData: false,
            isLive: true,
            disableLive: false,
            interval: 5000,
            showTableSettingModal: false,
            selectedTable: null,
            tableColumnList: [],
            dateRange: {
                from: DATE_RANGE[0].from,
                to: DATE_RANGE[0].to,
                label: DATE_RANGE[0].label,
            },
        };

        this.handleRealTimeClicked = this.handleRealTimeClicked.bind(this);
        this.onDateRangeChanged = this.onDateRangeChanged.bind(this);
        this.setSelectedTable = this.setSelectedTable.bind(this);
    }

    loadData() {
        const {selectedTable} = this.state;

        if (!selectedTable) {
            return;
        }

        LogTableActions.getColumns(selectedTable.uuid).then(response => {
            const {data, error} = response;
            if (error) {
                return;
            }

            this.setState({
                fields: data,
                isRetrieveAllData: true
            });
        }).then(() => {
            Live.refresh();
            window.history.pushState('logview', selectedTable.name, '/log-view/' + selectedTable.uuid);
        });
    }

    loadLogView = async() => {
        const response = await LogViewActions.getAll();
        const {data, error} = response;
        if (error) {
            return;
        }

        if (data.length === 0) {
            window.location.href = '/welcome';
            return;
        }

        let selectedTable = null;
        let uuid = window.uuid;

        if (window.uuid) {
            for (const i in data) {
                const table = data[i];
                if (table.uuid === window.uuid) {
                    selectedTable = data[i];
                    break;
                }
            }
        } else if (data.length > 0) {
            selectedTable = data[0];
            uuid = selectedTable.uuid;
        }

        const { disableLive, dateRange } = this.state;

        let newDateRange = { ...dateRange };

        let isDisableLive = disableLive;
        const cData = getDataFromCookies(uuid) ||  '';
        let dateRangeValue;
        if (cData) {
            const dateRangeLabel = JSON.parse(cData).label || '';
            if (dateRangeLabel !== 'Custom Range') {
                dateRangeValue = DATE_RANGE.find(item => item.label === dateRangeLabel);
                if (dateRangeValue) {
                    newDateRange = { ...dateRangeValue };
                    isDisableLive = !newDateRange.dateRangeValue;
                }
            } else {
                dateRangeValue = JSON.parse(cData);
                newDateRange.label = dateRangeValue.label;
                newDateRange.from = moment.unix(dateRangeValue.from);
                newDateRange.to = moment.unix(dateRangeValue.to);
            }
        } else {
            this.setDataCookies(uuid, {label: dateRange.label});
        }

        this.setState({
            logViews: data,
            selectedTable,
            disableLive: isDisableLive,
            isLive: !isDisableLive,
            dateRange: {...newDateRange},
        }, () => {
            const {logViews, isLive} = this.state;
            if (logViews.length > 0) {
                this.loadData();
                if (isLive) this.startStreaming();
            }
        });
    }

    startStreaming() {
        Live.start(this.state.interval);
    }

    componentDidMount() {
        Event.bus.register(Event.RESPONSE_ERROR, res => {
            const {error} = res;
            if (error === Event.ERROR_INVALID_QUERY) {
                this.setState({
                    isLive: false
                });
                Live.pause();
            }
        });

        this.loadLogView();
    }

    setDataCookies = (uuid, dateRange) => {
        setDataToCookies(uuid, `${JSON.stringify(dateRange)}`, 30);
    }

    setSelectedTable(selectedTable) {
        this.setState({selectedTable}, () => {
            this.loadData();
        });
    }

    handleRealTimeClicked(event) {
        const {interval} = this.state;
        const {checked} = event.target;
        this.setState({
            isLive: checked
        });
        if (checked) {
            Live.start(interval, true);
        } else {
            Live.pause();
        }
    }

    onDateRangeChanged(from, to, dateRange) {
        const {selectedTable, interval, isLive} = this.state;
        if (to) {
            this.setState({
                // isLive: false,
                disableLive: true
            });
            Live.pause();
        } else if (!to) {
            this.setState({
                // isLive: true,
                disableLive: false
            });
            if (isLive) {
                Live.start(interval);
            }
        }

        this.setDataCookies(selectedTable.uuid, dateRange);

        this.setState({
            dateRange,
        }, () => Live.refresh());
    }

    render() {
        const {
            isLive,
            disableLive,
            logViews,
            selectedTable,
            dateRange
        } = this.state;

        const uuid = selectedTable ? selectedTable.uuid : null;

        return (
            <div className="dashboard-page container-fluid">
                {logViews && logViews.length > 0 ? (
                    <>
                        <AdvancedSearch
                            onDateRangeChanged={this.onDateRangeChanged}
                            data={logViews}
                            selected={selectedTable}
                            onSelected={this.setSelectedTable}
                            dateRange={dateRange}
                        />
                        <div className="row justify-content-start flex-md-wrap">
                            <div className="col-12">
                                <FlotChart isLive={isLive}
                                    uuid={uuid}
                                    handleRealTimeClicked={this.handleRealTimeClicked}
                                    disableLive={disableLive}
                                />
                            </div>
                            <div className="col-12 card-columns">
                                <Summary uuid={uuid}/>
                            </div>

                            <LogViewTable selectedTable={selectedTable}/>
                        </div>
                    </>
                ) : (
                    <div className="spinner text-center position-absolute">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

ReactDOM.render(<Index/>, document.querySelector('#root'));
