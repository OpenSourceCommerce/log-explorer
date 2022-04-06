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

        this.initDate = this.initDate.bind(this)
        this.setDate = this.setDate.bind(this)
        this.onDateSelected = this.onDateSelected.bind(this)
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
        this.initDate()
    }

    initDate() {
        const _this = this
        const {dateRange} = this.props;
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
                _this.onDateSelected
            );
        });

        const dateRangePicker = DATE_RANGE.find(item => item.label === dateRangeValue);

        let from = startDate.format('YYYY-MM-DD HH:mm:00');
        let to = endDate.format('YYYY-MM-DD HH:mm:59');
        if (dateRangePicker && dateRangePicker.fromValue) {
            from = dateRangePicker.fromValue;
            to = '';
        }

        this.setState({
            from,
            to,
            dateRangeValue,
        });
    }

    onDateSelected(start, end, label) {
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

    setDate(from, to, dateRangeValue, callback) {
        const _this = this;

        this.setState({from, to, dateRangeValue}, () => {
            $('#date-range').data('daterangepicker').setStartDate(from);
            $('#date-range').data('daterangepicker').setEndDate(to);

            _this.onDateSelected(from, to, dateRangeValue)

            if (callback && typeof callback === 'function') {
                callback()
            }
        })
    }

    render() {
        const {label} = this.props;
        const {from, to, dateRangeValue} = this.state;

        return (
            <div>
                <div>
                    <p className="float-start mb-1">{label}</p>
                </div>
                <button type="button" className="btn btn-default w-100" id="date-range">
                    <>
                        <i className="far fa-calendar-alt me-2"></i>
                        <span>{dateRangeValue}</span>
                        <i className="fas fa-caret-down ms-2"></i>
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
