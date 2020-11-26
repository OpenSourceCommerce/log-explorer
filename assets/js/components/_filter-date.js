import React, {Component} from 'react';
import PropTypes from 'prop-types';
import 'admin-lte/plugins/daterangepicker/daterangepicker.css';
import 'admin-lte/plugins/daterangepicker/daterangepicker';
import moment from 'moment';

export class FilterDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            from: '',
            to: ''
        };
    }

    onFilterChanged(from, to) {
        const {onDateRangeChanged} = this.props;
        this.setState({
            from,
            to
        });
        if (onDateRangeChanged) {
            onDateRangeChanged(from, to);
        }
    }

    componentDidMount() {
        const {from = '60', to = ''} = this.props;
        this.setState({
            from,
            to
        });
        const that = this;
        $(() => {
            $('#date-range').daterangepicker(
                {
                    ranges: {
                        '1 hour': [moment(), moment().subtract(1, 'hour')],
                        '12 hours': [moment(), moment().subtract(12, 'hours')],
                        '1 day': [moment(), moment().subtract(1, 'day')],
                        '7 days': [moment(), moment().subtract(7, 'days')],
                        Today: [moment(), moment()],
                        Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                    },
                    timePicker: true,
                    timePicker24Hour: true,
                    autoApply: true,
                    StartDate: moment(),
                    endDate: moment().subtract(1, 'hour')
                },
                (start, end, label) => {
                    switch (label) {
                        case '1 hour':
                            that.onFilterChanged(60, null);
                            break;
                        case '12 hours':
                            that.onFilterChanged(720, null);
                            break;
                        case '1 day':
                            that.onFilterChanged(1440, null);
                            break;
                        case '7 days':
                            that.onFilterChanged(10080, null);
                            break;
                        case 'Custom Range':
                            that.onFilterChanged(start.format('YYYY-MM-DD HH:mm:00'), end.format('YYYY-MM-DD HH:mm:59'));
                            break;
                        default:
                            that.onFilterChanged(start.format('YYYY-MM-DD 00:00:00'), end.format('YYYY-MM-DD 23:59:59'));
                            break;
                    }

                    if (label === 'Custom Range') {
                        $('#date-range span').html(start.format('YYYY-MM-DD HH:MM') + ' - ' + end.format('YYYY-MM-DD HH:MM'));
                    } else {
                        $('#date-range span').html(label);
                    }
                }
            );
        });
    }

    render() {
        const {onDateRangeChanged, ...rest} = this.props;
        const {from, to} = this.state;

        return (
            <div {...rest}>
                <button type="button" className="btn btn-default mr-3" id="date-range">
                    <i className="far fa-calendar-alt"></i> <span>1 hour</span>
                    <i className="fas fa-caret-down"></i>
                </button>
                <input type="hidden" id="date-range-from" value={from}/>
                <input type="hidden" id="date-range-to" value={to}/>
            </div>
        );
    }
}

FilterDate.propTypes = {
    className: PropTypes.string,
    from: PropTypes.any,
    to: PropTypes.string,
    onDateRangeChanged: PropTypes.func
};
