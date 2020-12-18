import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Checkbox, Modal} from '.';
import {LogViewActions} from '../actions';

export class LogViewTableSettingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTable: null,
            tableColumnList: []
        };

        this.onShow = this.onShow.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevShow = prevProps.show;
        const {show} = this.props;

        if (show && show !== prevShow) {
            this.onShow();
        }
    }

    onShow() {
        const {selectedTable} = this.props;
        const that = this;
        return LogViewActions.getColumnSetting(selectedTable.uuid, 3).then(response => {
            const {data, error} = response;

            if (error) {
                return;
            }

            that.setState({tableColumnList: data});
        });
    }

    onChange(event) {
        const {row, column} = event.target.dataset;

        if (!row || !column) {
            return;
        }

        const that = this;
        const {tableColumnList} = this.state;
        const {onSave} = this.props;
        const logViewColumn = tableColumnList[row][column];

        LogViewActions.updateColumnSetting(logViewColumn.logview.uuid, logViewColumn.column.id,
            !logViewColumn.visible).then(response => {
            const {data, error} = response;

            if (error) {
                return;
            }

            that.onShow().then(() => {
                if (typeof onSave === 'function') {
                    onSave(data);
                }
            });
        });
    }

    render() {
        const {show, onHidden, onSave, showSaveButton = true} = this.props;
        const {tableColumnList} = this.state;

        return (
            <Modal title={'Table Setting'} id={'table-setting'} saveButtonTitle={'Save'}
                show={show}
                saveButtonAction={onSave}
                showSaveButton={showSaveButton}
                onHidden={onHidden}>
                {tableColumnList && tableColumnList.length > 0 &&
                tableColumnList.map((columns, row) => {
                    return (
                        <div key={row} className={'row'}>
                            {columns && columns.length > 0 &&
                            columns.map((item, index) => {
                                return (
                                    <div key={index} className={'col-4'}>
                                        <Checkbox name={item.column.name}
                                            label={item.column.title}
                                            id={`checkbox-${item.column.name}`}
                                            checked={item.visible}
                                            data-row={row}
                                            data-column={index}
                                            onChange={this.onChange}
                                            value="1"/>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </Modal>
        );
    }
}

LogViewTableSettingModal.propTypes = {
    show: PropTypes.bool,
    selectedTable: PropTypes.object,
    onHidden: PropTypes.func,
    onSave: PropTypes.func,
    showSaveButton: PropTypes.bool
};
