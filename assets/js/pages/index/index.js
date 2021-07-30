import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    AdvancedSearch,
    Summary,
    FlotChart,
    LogViewTable, Size
} from '../../components';
import {Live, LogTableActions, Event, LogViewActions, DatabaseActions, Alert} from '../../actions';
import '../../../styles/pages/index.scss';
import {DATE_RANGE, getDataFromCookies, setDataToCookies} from "../../utils";
import {Modal} from "../../components/_modal";
import {Input} from "../../components/_input";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logViews: [],
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
            queries: [],
            showQueryModal: false,
            queryModalQuery: {},
        };

        this.handleRealTimeClicked = this.handleRealTimeClicked.bind(this);
        this.onDateRangeChanged = this.onDateRangeChanged.bind(this);
        this.setSelectedTable = this.setSelectedTable.bind(this);
        this.syncAll = this.syncAll.bind(this);
        this.onSubmitQuery = this.onSubmitQuery.bind(this);
        this.onQuerySave = this.onQuerySave.bind(this);
        this.onQueryModelChange = this.onQueryModelChange.bind(this);
        this.onDeleteQuery = this.onDeleteQuery.bind(this);
        this.hideQueryModal = this.hideQueryModal.bind(this);
    }

    loadData() {
        const {selectedTable, queries} = this.state;

        if (!selectedTable) {
            return;
        }

        const that = this;

        if (queries[selectedTable.uuid] === undefined) {
            LogTableActions.getQueries(selectedTable.uuid)
                .then(res => {
                    const {error, data} = res;
                    if (error === 0) {
                        queries[selectedTable.uuid] = data;
                        that.setState({
                            queries: queries
                        })
                    }
                });
        }

        Live.refresh();
        window.history.pushState('logview', selectedTable.name, '/log-view/' + selectedTable.uuid);
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

        const {isLive, disableLive, dateRange } = this.getFilterForTable(uuid);

        this.setState({
            logViews: data,
            selectedTable,
            disableLive,
            isLive,
            dateRange,
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

        this.syncAll()
    }

    syncAll() {
        const $this = this;
        DatabaseActions.syncAll().then(response => {
            const {error} = response;
            if (error === 0) {
                $this.loadLogView()
            }
        });
    }

    getFilterForTable = (uuid) => {
        const cData = getDataFromCookies(uuid) ||  '{}';
        let newDateRange = {};
        let disableLive = '';
        let isLive = '';
        let dateRangeLabel = '';
        if (cData !== '{}') {
            const cDataObject = JSON.parse(cData);
            dateRangeLabel = cDataObject.label || '';
            if (dateRangeLabel !== 'Custom Range') {
                const dateRangeValue = DATE_RANGE.find(item => item.label === dateRangeLabel);
                if (dateRangeValue) {
                    newDateRange = { ...dateRangeValue };
                    disableLive = !Number.isInteger(newDateRange.fromValue);
                    isLive = cDataObject.isLive == 1;
                }
            } else {
                newDateRange.label = cDataObject.label;
                newDateRange.from = moment.unix(cDataObject.from);
                newDateRange.to = moment.unix(cDataObject.to);
                disableLive = true;
                isLive = false;
            }
        } else {
            newDateRange = {
                from: DATE_RANGE[0].from,
                to: DATE_RANGE[0].to,
                label: DATE_RANGE[0].label,
            };
            disableLive = false;
            isLive = true;
            this.setDataCookies(uuid, {label: DATE_RANGE[0].label, isLive: 1});
        }
        return {
            dateRange: { ...newDateRange },
            isLive,
            disableLive,
        }
    }

    setDataCookies = (uuid, dateRange) => {
        setDataToCookies(uuid, `${JSON.stringify(dateRange)}`, 30);
    }

    setSelectedTable(selectedTable) {
        const {isLive, disableLive, dateRange } = this.getFilterForTable(selectedTable.uuid);

        this.setState({
            selectedTable,
            isLive,
            disableLive,
            dateRange
        }, () => {
            this.loadData();
            if (!isLive) Live.pause();
            else if (isLive) this.startStreaming();
        });
    }

    handleRealTimeClicked(event) {
        const {interval, selectedTable} = this.state;
        const {checked} = event.target;
        this.setState({
            isLive: checked
        });
        if (checked) {
            Live.start(interval, true);
        } else {
            Live.pause();
        }
        const cData = JSON.parse(getDataFromCookies(uuid) ||  '{}');
        cData.isLive = checked ? 1 : 0;
        this.setDataCookies(selectedTable.uuid, cData);
    }

    onDateRangeChanged(from, to, dateRange) {
        const {selectedTable, interval, isLive} = this.state;
        if (to) {
            this.setState({
                // isLive: false,
                disableLive: true
            });
            dateRange.isLive = 0;
            Live.pause();
        } else if (!to) {
            this.setState({
                // isLive: true,
                disableLive: false
            });
            if (isLive) {
                Live.start(interval);
            }
            dateRange.isLive = isLive ? 1 : 0;
        }

        this.setDataCookies(selectedTable.uuid, dateRange);

        this.setState({
            dateRange,
        }, () => Live.refresh());
    }

    onSubmitQuery(query) {
        this.setState({
            showQueryModal: true,
            queryModalQuery: query
        })
    }

    onQuerySave() {
        const that = this;
        let {queryModalQuery, selectedTable, queries} = this.state;
        if ($.trim(queryModalQuery.name) == '') {
            Alert.error('Query name should not be blank');
            queryModalQuery.nameClass = 'is-invalid';
            that.setState({queryModalQuery});
            return;
        }
        queryModalQuery.nameClass = '';
        if ($.trim(queryModalQuery.name) == '' || $.trim(queryModalQuery.query) == '') {
            Alert.error('Query should not be blank');
            queryModalQuery.queryClass = 'is-invalid';
            that.setState({queryModalQuery});
            return;
        }
        queryModalQuery.queryClass = '';
        that.setState({queryModalQuery});
        LogTableActions.saveQueries(selectedTable.uuid, queryModalQuery, queryModalQuery.id)
            .then(res => {
                const {error, query} = res;
                if (error === 0) {
                    if (queryModalQuery.id) {
                        Alert.success('Update successful');
                        let selectedQueries = queries[selectedTable.uuid];
                        for (let i = 0; i < selectedQueries.length; i++) {
                            if (selectedQueries[i].id === query.id) {
                                queries[selectedTable.uuid][i] = query;
                                break;
                            }
                        }
                    } else {
                        Alert.success('Create successful');
                        queries[selectedTable.uuid].push(query);
                    }
                    that.setState({
                        queryModalQuery: {},
                        showQueryModal: false,
                        queries: queries
                    })
                }
            })
    }

    onDeleteQuery(query) {
        const that = this;
        let {selectedTable, queries} = this.state;
        LogTableActions.deleteQueries(query.id)
            .then(res => {
                const {error} = res;
                if (error === 0) {
                    Alert.success('Delete successful');
                    let selectedQueries = queries[selectedTable.uuid];
                    for (let i = 0; i < selectedQueries.length; i++) {
                        if (selectedQueries[i].id === query.id) {
                            queries[selectedTable.uuid].splice(i, 1);
                            break;
                        }
                    }

                    that.setState({
                        queries: queries,
                        showQueryModal: false
                    })
                }
            })
    }

    onQueryModelChange(e) {
        let {queryModalQuery} = this.state;
        queryModalQuery[e.target.name] = e.target.value;
        queryModalQuery[e.target.name + 'Class'] = e.target.value == '' ? 'is-invalid' : '';
        this.setState({queryModalQuery});
    }

    hideQueryModal() {
        this.setState({
            showQueryModal: false
        })
    }

    render() {
        const {
            isLive,
            disableLive,
            logViews,
            selectedTable,
            dateRange,
            queries,
            showQueryModal,
            queryModalQuery
        } = this.state;

        const uuid = selectedTable ? selectedTable.uuid : null;

        const selectedQueries = queries[uuid] || [];

        const {query, name, nameClass = '', queryClass = ''} = queryModalQuery;

        return (
            <div className="dashboard-page container-fluid">
                {logViews && logViews.length > 0 ? (
                    <>
                        <AdvancedSearch
                            key={selectedTable.uuid}
                            onDateRangeChanged={this.onDateRangeChanged}
                            data={logViews}
                            selected={selectedTable}
                            onSelected={this.setSelectedTable}
                            dateRange={dateRange}
                            queries={selectedQueries}
                            onSaveClicked={this.onSubmitQuery}
                            onDeleteCLicked={this.onDeleteQuery}
                        />
                        <div className="float-chart row justify-content-start flex-md-wrap">
                            <div className="col-12">
                                <FlotChart isLive={isLive}
                                    uuid={uuid}
                                    handleRealTimeClicked={this.handleRealTimeClicked}
                                    disableLive={disableLive}
                                    className="mb-2"
                                />
                            </div>
                            <div className="col-12 card-columns">
                                <Summary uuid={uuid}/>
                            </div>

                            <LogViewTable selectedTable={selectedTable}/>
                        </div>
                        <Modal title={'Query'}
                               id={'query'}
                               size={Size.large}
                               saveButtonTitle={'Save'}
                               showSaveButton={true}
                               show={showQueryModal}
                               saveButtonAction={this.onQuerySave}
                               closeButtonAction={this.hideQueryModal}
                               >
                            {showQueryModal && <div className='row'>
                                <div className='col-12'>
                                    <Input
                                        name='name'
                                        placeholder='Query name'
                                        defaultValue={name}
                                        className={nameClass}
                                        onChange={this.onQueryModelChange}
                                    />
                                </div>
                                <div className='col-12 mt-3'>
                                    <Input
                                        name='query'
                                        defaultValue={query}
                                        className={queryClass}
                                        onChange={this.onQueryModelChange}
                                    />
                                </div>
                            </div>}
                        </Modal>
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
