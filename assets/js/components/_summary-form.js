import React, {Component} from 'react';
import {Button, Select2} from '.';
import PropTypes from 'prop-types';
import {Alert, LogViewActions} from '../actions';
import '../../styles/component/_summary-form.scss';

export class SummaryForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logViewUuid: '',
            columns: {},
            summary: [],
            isLoading: false
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {columns = [], summary = []} = this.props;
        const preColumns = prevProps.columns ? prevProps.columns : [];
        const preSummary = prevProps.summary ? prevProps.summary : [];
        if (columns.length !== preColumns.length || summary.length !== preSummary.length) {
            this.setState({
                columns,
                summary
            });
        }
    }

    onSubmit() {
        const {logViewUuid} = this.props;
        const summary = $('#summary').val();
        if (logViewUuid) {
            const that = this;
            that.setState({
                isLoading: true
            });
            LogViewActions.setSummary(logViewUuid, {columns: summary})
                .then(res => {
                    const {error} = res;
                    if (error) {
                        return;
                    }

                    Alert.success('Update successful');
                })
                .finally(() => {
                    that.setState({
                        isLoading: false
                    });
                });
        }
    }

    render() {
        const {className} = this.props;
        const {summary, columns, isLoading} = this.state;

        const _columns = Object.keys(columns).map((item, key) => {
            return <option key={key} value={columns[item]}>{columns[item]}</option>;
        });

        return (
            <div className={`${className} summary-form`}>
                <div className="form-group select2-component">
                    <Select2 id={'summary'} multiple="multiple" data-placeholder="Select summary column" value={summary}>
                        {_columns}
                    </Select2>
                </div>

                <div className="box-footer">
                    <Button color={'success'} onClick={this.onSubmit} isLoading={isLoading}>Save</Button>
                </div>
            </div>
        );
    }
}
SummaryForm.propTypes = {
    logViewUuid: PropTypes.string,
    columns: PropTypes.array,
    summary: PropTypes.array,
    className: PropTypes.string
};
