import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Checkbox, Modal, Button, Colors, Size} from '.';
import {LogViewActions} from '../actions';
import GridLayout from 'react-grid-layout';
import {Input} from "./_input";

export class LogViewExportModal extends Component {
    constructor(props) {
        super(props);

        this.onHidden = this.onHidden.bind(this);
        this.onSelected = this.onSelected.bind(this);
    }

    onHidden() {
        const {onHidden} = this.props;

        this.setState({tableColumnList: []})

        if (typeof onHidden === 'function') {
            onHidden();
        }
    }

    onSelected(event) {
        const {onSelected} = this.props
        const {format} = event.target.dataset;

        if (typeof onSelected === 'function' && format) {
            onSelected(format)
        }
    }

    render() {
        const {show, onHidden, onSave} = this.props;

        return (
            <Modal title={'Export Data'}
                   id={'logview-export'}
                   size={Size.small}
                   saveButtonTitle={'OK'}
                   show={show}
                   saveButtonAction={onSave}
                   showSaveButton={false}
                   onHidden={onHidden}>
                <div className={'row'}>
                    <div className="col-6">
                        <h5>Select format:</h5>
                    </div>
                    <div className="col-6">
                        <a onClick={this.onSelected} data-format="csv"
                           className="btn btn-primary btn-sm me-2">CSV</a>
                        <a onClick={this.onSelected} data-format="json"
                           className="btn btn-secondary btn-sm">JSON</a>
                    </div>
                </div>
            </Modal>
        );
    }
}

LogViewExportModal.propTypes = {
    show: PropTypes.bool,
    onHidden: PropTypes.func,
    onSave: PropTypes.func,
    showSaveButton: PropTypes.bool
};
