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
    Modal
} from '../../components';
import {Live, LogTableActions, Event} from '../../actions';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: [],
            isRetrieveAllData: false,
            isLive: true,
            disableLive: false,
            interval: 2000,
            showTableSettingModal: false
        };

        this.handleRealTimeClicked = this.handleRealTimeClicked.bind(this);
        this.onDateRangeChanged = this.onDateRangeChanged.bind(this);
        this.showTableSettingModal = this.showTableSettingModal.bind(this);
        this.hideTableSettingModal = this.hideTableSettingModal.bind(this);
    }

    async loadData() {
        const {data = [], error = 0} = await LogTableActions.getColumns();

        if (error) {
            return;
        }

        this.setState({
            fields: data,
            isRetrieveAllData: true
        });
    }

    componentDidMount() {
        Live.start(this.state.interval);
        Event.bus.register(Event.RESPONSE_ERROR, res => {
            const {error} = res;
            if (error === Event.ERROR_INVALID_QUERY) {
                this.setState({
                    isLive: false
                });
                Live.pause();
            }
        });

        this.loadData();
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
        const {isLive, interval} = this.state;
        if (isLive && Boolean(to)) {
            this.setState({
                isLive: false,
                disableLive: true
            });
            Live.pause();
        } else if (!isLive && !to) {
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

    render() {
        const {
            fields,
            isRetrieveAllData,
            isLive,
            disableLive,
            showTableSettingModal
        } = this.state;

        const getDataTableUrl = '/api/stream/' + LogTableActions.getUuid() + '/list';

        return (
            <div className="dashboard-page">
                <AdvancedSearch
                    onDateRangeChanged={this.onDateRangeChanged}
                />
                <div className="col-12 row justify-content-start">
                    <div className="col-12 col-md-8">
                        <FlotChart isLive={isLive}
                            handleRealTimeClicked={this.handleRealTimeClicked}
                            disableLive={disableLive}
                        />
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="row d-flex flex-wrap">
                            <Summary/>
                        </div>
                    </div>
                    {isRetrieveAllData ? (<div className="col-12 col-md-auto">
                        <Modal title={'Table Setting'} id={'table-setting'} saveButtonTitle={'Save'}
                            show={showTableSettingModal}
                            saveButtonAction={() => {
                                console.log('saved!!!');
                            }}
                            onHidden={this.hideTableSettingModal}>
                            Text thử xem sao
                        </Modal>
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
                                    dataSrc={getDataTableUrl}
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
