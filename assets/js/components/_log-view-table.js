import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CardHeader, CardTool, DropdownItem, JsGridTable, LogViewTableSettingModal} from '.';
import {Live, LogTableActions} from '../actions';

export class LogViewTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTableSettingModal: false,
            fields: []
        };

        this.showTableSettingModal = this.showTableSettingModal.bind(this);
        this.hideTableSettingModal = this.hideTableSettingModal.bind(this);
        this.onTableSettingModalChanged = this.onTableSettingModalChanged.bind(this);
    }

    componentDidUpdate(prevProps) {
        const {selectedTable} = this.props;
        const prevSelectedTable = prevProps.selectedTable;

        if (selectedTable && selectedTable !== prevSelectedTable) {
            this.loadColumns();
        }
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
        }).then(() => {
            Live.refresh();
            window.history.pushState('logview', selectedTable.name, '/' + selectedTable.uuid);
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

    render() {
        const {selectedTable} = this.props;
        const {fields, showTableSettingModal} = this.state;

        return (
            (fields && fields.length > 0 && <div className="col-12 col-md-auto">
                <LogViewTableSettingModal show={showTableSettingModal}
                    selectedTable={selectedTable}
                    onSave={this.onTableSettingModalChanged}
                    onHidden={this.hideTableSettingModal}/>
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
            </div>)
        );
    }
}

LogViewTable.propTypes = {
    selectedTable: PropTypes.object
};
