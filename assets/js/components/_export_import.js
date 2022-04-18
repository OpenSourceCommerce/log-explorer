import React, {Component} from 'react';
import {Button} from '.';
import PropTypes from 'prop-types';
import {Alert} from "../actions";

export class ExportImport extends Component {
    constructor(props) {
        super(props);
        this.exportAll = this.exportAll.bind(this);
        this.exportDashboard = this.exportDashboard.bind(this);
        this.exportWidget = this.exportWidget.bind(this);
        this.exportSelected = this.exportSelected.bind(this);
        this.importFile = this.importFile.bind(this);
    }

    componentDidMount() {
        $('#file-import').on('change', function () {
            $(this).closest('form').submit();
        })
    }

    export(data) {
        const {widget = false} = this.props;
        if (widget) {
            data.page = 'widget_list';
        } else {
            data.page = 'dashboard_list';
        }
        window.location = '/dashboard/export?' + $.param(data);
    }

    exportAll(e) {
        e.preventDefault();
        this.export({mode:'all'});
    }

    exportDashboard(e) {
        e.preventDefault();
        this.export({mode:'dashboard'});
    }

    exportWidget(e) {
        e.preventDefault();
        this.export({mode:'widget'});
    }

    exportSelected(e) {
        e.preventDefault();
        let ids = [];
        $('.export-item:checked').each(function () {
            ids.push($(this).data('id'));
        });
        if (ids.length === 0) {
            Alert.error('No item selected');
        } else {
            this.export({id: ids});
        }
    }

    importFile() {
        $('#file-import').click();
    }

    render() {
        const {widget = false} = this.props;

        return (
            <>
                <div className="dropdown d-inline-block me-3">
                    <button className="btn btn-info dropdown-toggle" type="button"
                            id="dropdownExport" data-bs-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                        Export
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownExport">
                        <a onClick={this.exportAll} className="dropdown-item" target="_blank" href="#">Export all dashboards and widgets</a>
                        {widget &&
                        <a onClick={this.exportWidget} className="dropdown-item" target="_blank" href="#">Export all widgets</a>}
                        {!widget &&
                        <a onClick={this.exportDashboard} className="dropdown-item" target="_blank" href="#">Export all dashboards</a>}
                        <a onClick={this.exportSelected} className="dropdown-item" target="_blank" href="#">Export selected</a>
                    </div>
                </div>
                <Button onClick={this.importFile} className="me-3">Import</Button>
                <div style={{display: "none"}}>
                    <form method="POST" action="/dashboard/import" encType="multipart/form-data">
                    <input type="file" name="import" id="file-import" />
                        <input type="hidden" name="page" value={widget ? 'widget_list' : 'dashboard_list'}/>
                    </form>
                </div>
            </>
        );
    }
}

Button.propTypes = {
    className: PropTypes.string,
    widget: PropTypes.bool
};
