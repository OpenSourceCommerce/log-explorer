import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    CardTool,
    DropdownItem, Icon,
    JsGridTable,
    LogViewTableSettingModal,
    QueryInfo
} from '.';
import {LogTableActions} from '../actions';

export class LogViewTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTableSettingModal: false,
            fields: [],
            queryInfo: {}
        };

        this.showTableSettingModal = this.showTableSettingModal.bind(this);
        this.hideTableSettingModal = this.hideTableSettingModal.bind(this);
        this.onTableSettingModalChanged = this.onTableSettingModalChanged.bind(this);
        this.onDataLoaded = this.onDataLoaded.bind(this);
    }

    componentDidUpdate(prevProps) {
        const {selectedTable} = this.props;
        const prevSelectedTable = prevProps.selectedTable;

        if (selectedTable && selectedTable !== prevSelectedTable) {
            this.loadColumns();
        }
    }

    componentDidMount() {
        this.loadColumns();
    }

    loadColumns() {
        const {selectedTable} = this.props;

        if (!selectedTable) {
            return;
        }

        LogTableActions.getColumns(selectedTable.uuid).then(response => {
            const {data, error} = response;
            if (error) {
                return;
            }

            this.setState({
                fields: data
            });
        });
    }

    showTableSettingModal(event) {
        event.preventDefault();
        this.setState({showTableSettingModal: true});
    }

    hideTableSettingModal(event) {
        event.preventDefault();
        this.setState({showTableSettingModal: false});
    }

    onTableSettingModalChanged() {
        this.loadColumns();
    }

    onDataLoaded(res) {
        const {itemsCount = 0, data = [], queryInfo = {}} = res;
        queryInfo.total = itemsCount;
        queryInfo.current = data.length;
        this.setState({queryInfo});
    }

    render() {
        const {selectedTable} = this.props;
        const {fields, showTableSettingModal, queryInfo} = this.state;

        return (
            (fields && fields.length > 0 && <div className="col-12 col-md-auto">
                <LogViewTableSettingModal show={showTableSettingModal}
                    selectedTable={selectedTable}
                    onSave={this.onTableSettingModalChanged}
                    onHidden={this.hideTableSettingModal}/>
                <div className="card">
                    <div className="card-header pt-1 pb-0">
                        <h3 className="card-title">
                            <QueryInfo queryInfo={queryInfo} className={'col-12'}/>
                        </h3>

                        <div className="card-tools">
                            <CardTool>
                                <DropdownItem onClick={this.showTableSettingModal}>
                                    Setting
                                </DropdownItem>
                            </CardTool>

                            <Button color="tool"
                                    data-card-widget="collapse"
                                    data-toggle="tooltip" title="Collapse">
                                <Icon className="" name={'minus'}/>
                            </Button>
                            <Button color="tool"
                                    data-card-widget="remove"
                                    data-toggle="tooltip" title="Remove">
                                <Icon name={'times'}/>
                            </Button>
                        </div>
                    </div>
                    <div className="card-body pt-0">
                        {fields && fields.length > 0 &&
                        <JsGridTable
                            height='auto'
                            logview={selectedTable}
                            fields={fields}
                            pageSize={100}
                            sorting={true}
                            onDataLoaded={this.onDataLoaded}
                        />}
                    </div>
                </div>
            </div>)
        );
    }
}

LogViewTable.propTypes = {
    selectedTable: PropTypes.object
};
