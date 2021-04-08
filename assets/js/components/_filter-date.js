import React, {Component} from 'react';
import PropTypes from 'prop-types';
import 'admin-lte/plugins/daterangepicker/daterangepicker.css';
import 'admin-lte/plugins/daterangepicker/daterangepicker';
import moment from 'moment';
import {DATE_RANGE} from "../utils";

export class FilterDate extends Component {
    constructor(props) {
        super(props);
        const {from = '60', to = ''} = this.props;

        this.state = {
            from,
            to,
            // Default select option
            dateRangeValue: '1 hour'
        };
    }

    onFilterChanged(from, to, dateRangeValue, fromUnix, toUnix) {
        const {onDateRangeChanged} = this.props;
        this.setState({
            from,
            to,
            dateRangeValue
        });
        if (onDateRangeChanged) {
            onDateRangeChanged(from, to, { label: dateRangeValue, from: fromUnix, to: toUnix });
        }
    }

    componentDidMount() {
        const { dateRange } = this.props;
        let startDate = moment().subtract(1, 'hour');
        let endDate = moment();
        let dateRangeValue = '1 hour';

        if (dateRange) {
            startDate = dateRange.from;
            endDate = dateRange.to;
            dateRangeValue = dateRange.label;
        }

        const ranges = DATE_RANGE.reduce((obj, item) => ({
            ...obj,
            [item.label]: [item.from, item.to],
        }), {})

        $(() => {
            $('#date-range').daterangepicker(
                {
                    ranges,
                    timePicker: true,
                    timePicker24Hour: true,
                    opens: 'center',
                    autoApply: true,
                    startDate,
                    endDate
                },
                (start, end, label) => {
                    switch (label) {
                        case '1 hour':
                            this.onFilterChanged(60, '', label);
                            break;
                        case '12 hours':
                            this.onFilterChanged(720, '', label);
                            break;
                        case '1 day':
                            this.onFilterChanged(1440, '', label);
                            break;
                        case '7 days':
                            this.onFilterChanged(10080, '', label);
                            break;
                        case 'Custom Range':
                            this.onFilterChanged(start.format('YYYY-MM-DD HH:mm:00'), end.format('YYYY-MM-DD HH:mm:59'),
                                label, start.unix(), end.unix());
                            break;
                        default:
                            this.onFilterChanged(start.format('YYYY-MM-DD 00:00:00'), end.format('YYYY-MM-DD 23:59:59'),
                                label, start.unix(), end.unix());
                            break;
                    }
                }
            );
        });

        this.setState({
            from: startDate.format('YYYY-MM-DD HH:mm:00'),
            to: endDate.format('YYYY-MM-DD HH:mm:59'),
            dateRangeValue,
        });
    }

    render() {
        const { label } = this.props;
        const {from, to, dateRangeValue} = this.state;

        return (
            <div>
                <div>
                    <p className="float-left mb-2">{label}</p>
                </div>
                <button type="button" className="btn btn-default w-100" id="date-range">
                    <>
                        <i className="far fa-calendar-alt mr-2"></i>
                        <span>{dateRangeValue}</span>
                        <i className="fas fa-caret-down ml-2"></i>
                    </>
                </button>
                <input type="hidden" id="date-range-from" value={from}/>
                <input type="hidden" id="date-range-to" value={to}/>
            </div>
        );
    }
}

FilterDate.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    from: PropTypes.any,
    to: PropTypes.string,
    onDateRangeChanged: PropTypes.func
};
