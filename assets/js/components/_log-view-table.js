import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    Button,
    CardTool,
    Colors,
    DropdownItem,
    Icon,
    JsGridTable,
    LogViewTableSettingModal,
    QueryInfo,
} from ".";
import { LogTableActions, ExportActions, Alert } from "../actions";
import { LogViewExportModal } from "./_log-view-export-modal";

export class LogViewTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showExportModal: false,
            showTableSettingModal: false,
            fields: [],
            queryInfo: {},
            updated: false,
        };

        this.showTableSettingModal = this.showTableSettingModal.bind(this);
        this.hideTableSettingModal = this.hideTableSettingModal.bind(this);
        this.onTableSettingModalChanged = this.onTableSettingModalChanged.bind(this);
        this.onDataLoaded = this.onDataLoaded.bind(this);
        this.showExportModal = this.showExportModal.bind(this);
        this.exportData = this.exportData.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { selectedTable } = this.props;
        const prevSelectedTable = prevProps.selectedTable;

        if (selectedTable && selectedTable !== prevSelectedTable) {
            this.loadColumns();
        }
    }

    componentDidMount() {
        this.loadColumns();
    }

    loadColumns() {
        const { selectedTable } = this.props;

        if (!selectedTable) {
            return;
        }

        LogTableActions.getColumns(selectedTable.uuid).then((response) => {
            const { data, error } = response;
            if (error) {
                return;
            }

            this.setState({
                fields: data,
                updated: true,
            });
        });
    }

    showTableSettingModal(event) {
        event.preventDefault();
        this.setState({ showTableSettingModal: true });
    }

    hideTableSettingModal(event) {
        event.preventDefault();
        this.setState({ showTableSettingModal: false });
    }

    onTableSettingModalChanged() {
        this.loadColumns();
    }

    onDataLoaded(res) {
        const { itemsCount = 0, data = [], queryInfo = {} } = res;
        queryInfo.total = itemsCount;
        queryInfo.current = data.length;
        this.setState({ queryInfo, updated: false });
    }

    showExportModal(event) {
        event.preventDefault();
        this.setState({ showExportModal: true });
    }

    exportData(format) {
        const { selectedTable } = this.props;
        const filter = LogTableActions.getOptions({});

        ExportActions.exportData(selectedTable.table, format, filter).then((response) => {
            const { error, redirect } = response;

            if (error === 0) {
                const showExportModal = false;
                this.setState({ showExportModal });
                Alert.success(
                    "Your request are being in progress. <br>" +
                        'Please visit <a href="' +
                        redirect +
                        '">Export Page</a> to download.'
                );

                if (redirect) {
                    setTimeout(() => {
                        window.location.href = redirect;
                    }, 1000);
                }
            }
        });
    }

    render() {
        const { selectedTable } = this.props;
        const { fields, showTableSettingModal, queryInfo, updated, showExportModal } = this.state;

        return (
            fields &&
            fields.length > 0 && (
                <div className="log-view-table">
                    <LogViewTableSettingModal
                        show={showTableSettingModal}
                        selectedTable={selectedTable}
                        onSave={this.onTableSettingModalChanged}
                        onHidden={this.hideTableSettingModal}
                    />
                    <LogViewExportModal show={showExportModal} onSelected={this.exportData} />
                    <div className="d-flex justify-content-between align-item-center mb-2">
                        <QueryInfo className="d-flex align-items-center" queryInfo={queryInfo} />
                        <div className="card-tools">
                            <CardTool>
                                <small className="py-1 px-2">Select format</small>
                                <DropdownItem
                                    className="text-primary"
                                    onClick={() => this.exportData("csv")}
                                >
                                    CSV
                                </DropdownItem>
                                <DropdownItem
                                    className="text-primary"
                                    onClick={() => this.exportData("json")}
                                >
                                    Json
                                </DropdownItem>
                            </CardTool>
                            <Button
                                className="ms-2"
                                outlineColor={Colors.blue}
                                onClick={this.showTableSettingModal}
                            >
                                <Icon
                                    className="feather-sm me-2 stroke-width-3"
                                    dataFeather="grid"
                                />
                                <span className="d-inline-block align-middle fw-bold">
                                    Customize
                                </span>
                            </Button>
                        </div>
                    </div>
                    <JsGridTable
                        height="auto"
                        logview={selectedTable}
                        fields={fields}
                        updated={updated}
                        pageSize={100}
                        sorting={true}
                        onDataLoaded={this.onDataLoaded}
                    />
                </div>
            )
        );
    }
}

LogViewTable.propTypes = {
    selectedTable: PropTypes.object,
};
