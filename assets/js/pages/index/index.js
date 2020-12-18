import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    CardHeader,
    CardTool,
    AdvancedSearch,
    Summary,
    FlotChart,
    JsGridTable,
    DropdownItem,
    Modal,
    LogViewList,
    Checkbox,
    LogViewTableSettingModal
} from '../../components';
import {Live, LogTableActions, Event, LogViewActions, DatabaseActions} from '../../actions';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: [],
            logViews: [],
            isRetrieveAllData: false,
            isLive: true,
            disableLive: false,
            interval: 2000,
            showTableSettingModal: false,
            selectedTable: null,
            tableColumnList: []
        };

        this.handleRealTimeClicked = this.handleRealTimeClicked.bind(this);
        this.onDateRangeChanged = this.onDateRangeChanged.bind(this);
        this.showTableSettingModal = this.showTableSettingModal.bind(this);
        this.hideTableSettingModal = this.hideTableSettingModal.bind(this);
        this.setSelectedTable = this.setSelectedTable.bind(this);
        this.onTableSettingModalChanged = this.onTableSettingModalChanged.bind(this);

        this.logTable = React.createRef();
        this.tableSettingModalRef = React.createRef();
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
            window.history.pushState('logview', selectedTable.name, '/' + selectedTable.uuid);
        });
    }

    loadLogView() {
        LogViewActions.getAll().then(response => {
            const {data, error} = response;
            if (error) {
                return;
            }

            if (data.length === 0) {
                window.location.href = '/welcome';
                return;
            }

            let selectedTable = null;

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
            }

            this.setState({
                logViews: data,
                selectedTable
            });
        }).then(() => {
            const {logViews} = this.state;
            if (logViews.length > 0) {
                this.loadData();
                this.startStreaming();
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

        // This.loadData();
        this.loadLogView();
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

    onDateRangeChanged(from, to) {
        const {interval} = this.state;
        if (to) {
            this.setState({
                isLive: false,
                disableLive: true
            });
            Live.pause();
        } else if (!to) {
            this.setState({
                isLive: true,
                disableLive: false
            });
            Live.start(interval);
        }

        Live.refresh();
    }

    showTableSettingModal(event) {
        event.preventDefault();
        this.setState({showTableSettingModal: true});
    }

    hideTableSettingModal(event) {
        event.preventDefault();
        this.setState({showTableSettingModal: false});
    }

    onTableSettingModalChanged(column) {
        this.loadData();
    }

    render() {
        const {
            fields,
            isRetrieveAllData,
            isLive,
            disableLive,
            showTableSettingModal,
            logViews,
            selectedTable
        } = this.state;

        const uuid = selectedTable ? selectedTable.uuid : null;

        return (
            <div className="dashboard-page">
                <div className="advanced-search col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <LogViewList data={logViews}
                                    selected={selectedTable}
                                    onSelected={this.setSelectedTable}/>
                            </div>
                        </div>
                    </div>
                </div>
                <AdvancedSearch
                    onDateRangeChanged={this.onDateRangeChanged}
                />
                <div className="col-12 row justify-content-start">
                    <div className="col-12 col-md-8">
                        <FlotChart isLive={isLive}
                            uuid={uuid}
                            handleRealTimeClicked={this.handleRealTimeClicked}
                            disableLive={disableLive}
                        />
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="row d-flex flex-wrap">
                            <Summary uuid={uuid}/>
                        </div>
                    </div>
                    {isRetrieveAllData ? (<div className="col-12 col-md-auto">
                        <LogViewTableSettingModal show={showTableSettingModal}
                            selectedTable={selectedTable}
                            onHidden={this.hideTableSettingModal}
                            onSave={this.onTableSettingModalChanged}
                            ref={this.tableSettingModalRef}/>
                        <div className="card">
                            <CardHeader title="Home Page">
                                <CardTool>
                                    <DropdownItem onClick={this.showTableSettingModal}>
                                        Setting
                                    </DropdownItem>
                                </CardTool>
                            </CardHeader>
                            <div className="card-body">
                                {fields && fields.length > 0 &&
                                <JsGridTable
                                    logview={selectedTable}
                                    fields={fields}
                                    pageSize={5}
                                />}
                            </div>
                            <div className="card-footer">
                                Footer
                            </div>
                        </div>
                    </div>) : null}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Index/>, document.querySelector('#root'));
