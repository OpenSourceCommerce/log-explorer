import React, {Component} from "react";
import {AlertActions} from "../actions";
import {DATE_RANGE, TOAST_STATUS} from "../utils";
import {FilterDate, Select, Input} from "./index";
import {Checkbox, Button} from "./";

export class AlertForm extends Component {
    constructor(props) {
        super(props);

        this.filterDateRef = React.createRef();

        const dateRange = {
            from: DATE_RANGE[0].from,
            to: DATE_RANGE[0].to,
            label: DATE_RANGE[0].label,
        };

        this.state = {
            data: {
                title: '',
                from_table: '',
                query: '',
                threshold: '',
                interval_time: '60',
                email: '',
                subject: '',
                isActive: '0',
                time_range: dateRange
            },
            isLoading: false,
            errors: [],
        }
    }

    componentDidMount() {
        const {alertElement, alertId} = this.props;


        if(alertId) {
            let data = { ...alertElement };

            let dateRange = data.time_range;

            if (dateRange.label !== 'Custom Range') {
                const dateRangeValue = DATE_RANGE.find(item => item.label === dateRange.label);
                if (dateRangeValue) {
                    dateRange = {...dateRangeValue};
                }
            } else {
                dateRange.from = moment.unix(parseInt(dateRange.from));
                dateRange.to = moment.unix(parseInt(dateRange.to));
            }

            data['time_range'] = dateRange

            this.setState({data}, () => {
                this.filterDateRef.current.initDate()
            })
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target
        let {data} = this.state

        data[name] = value

        this.setState({data})
    }

    onChangeFilter = async (from, to, dateRange) => {
        let {data} = this.state
        data['time_range'] = dateRange

        this.setState({
            data
        })
    }

    onSubmit = () => {
        let isLoading = true;
        let errors = []
        let {data} = this.state;
        const {time_range} = data

        this.setState({isLoading, errors})
        const label = time_range?.label
        let from = time_range?.from
        let to = time_range?.to

        if (typeof from === 'object') {
            from = from.unix()
        }

        if (typeof to === 'object') {
            to = to.unix()
        }

        data['time_range'] = `${label}|${from}|${to}`

        AlertActions.createOrUpdate(data?.id, data).then((response) => {
            isLoading = false
            this.setState({isLoading})

            let toastContent = {
                color: TOAST_STATUS.success,
                message: `${data.id ? 'Update' : 'Create'} alert successful`,
            };

            if (response.error === 1) {
                data['time_range'] = time_range
                this.setState({errors: response.fields, data})
            } else {
                this.props.onSubmitAlertData(toastContent);
            }
        })
    }

    render() {
        const {data, errors} = this.state
        const time_range = data.time_range
        const { tableList } = this.props;

        return (
            <>
                <div className="form-group mb-3">
                    <label>Title</label>
                    <Input type="text" name="title"
                           value={data.title}
                           className={(errors?.title) ? 'is-invalid' : ''}
                           onChange={this.handleChange}/>
                    {errors?.title &&
                    <span className="error invalid-feedback">{errors.title}</span>}
                </div>
                <div className="form-group mb-3">
                    <label>Select Table</label>
                    <Select name="from_table"
                            value={data.from_table}
                            className={(errors?.from_table) ? 'is-invalid' : ''}
                            onChange={this.handleChange}>
                        <option value="" disabled={true}>Select table</option>
                        {tableList && tableList.map((table, key) => {
                            return (
                                <option key={key} value={table}>
                                    {table}
                                </option>
                            )
                        })}
                    </Select>
                    {errors?.from_table &&
                    <span className="error invalid-feedback">{errors.from_table}</span>}
                </div>
                <div className="form-group mb-3">
                    <label>Criteria to search for in sql mode</label>
                    <Input type="text" name="query"
                           value={data.query}
                           className={(errors?.query) ? 'is-invalid' : ''}
                           onChange={this.handleChange}/>
                    {errors?.query &&
                    <span className="error invalid-feedback">{errors.query}</span>}
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <div className="form-group">
                            <label>Limit for alert</label>
                            <Input type="number" min={0}
                                   name="threshold" value={data.threshold}
                                   className={(errors?.threshold) ? 'is-invalid' : ''}
                                   onChange={this.handleChange}/>
                            {errors?.threshold &&
                            <span className="error invalid-feedback">{errors.threshold}</span>}
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label>Check interval in minutes</label>
                            <Input type="number" min={0}
                                   name="interval_time" value={data.interval_time}
                                   className={(errors?.interval_time) ? 'is-invalid' : ''}
                                   onChange={this.handleChange}/>
                            {errors?.interval_time &&
                            <span className="error invalid-feedback">{errors.interval_time}</span>}
                        </div>
                    </div>
                </div>
                <div className={`form-group mb-3` + ((errors?.time_range) ? 'is-invalid' : '')}>
                        <label>Time Range</label>
                        <FilterDate
                            ref={this.filterDateRef}
                            dateRange={time_range}
                            onDateRangeChanged={this.onChangeFilter}
                        />
                            {errors?.time_range &&
                        <span className="error invalid-feedback">{errors.time_range}</span>}
                </div>

                <div className="form-group mb-3">
                    <label>Email Address</label>
                    <Input type="email" name="email"
                           className={(errors?.email) ? 'is-invalid' : ''}
                           value={data.email} onChange={this.handleChange}/>
                    {errors?.email &&
                    <span className="error invalid-feedback">{errors.email}</span>}
                </div>
                <div className="form-group mb-3">
                    <label>Email Subject</label>
                    <Input type="text" name="subject"
                           value={data.subject}
                           className={(errors?.subject) ? 'is-invalid' : ''}
                           onChange={this.handleChange}/>
                    {errors?.subject &&
                    <span className="error invalid-feedback">{errors.subject}</span>}
                </div>
                <div className="mb-3">
                    <Checkbox type="checkbox"
                            label="Active"
                            id="active"
                            name="isActive"
                            value={data.isActive === '1' ? '0' : '1'}
                            checked={data.isActive === '1'}
                            onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <Button type="button" className="btn-block w-100" onClick={this.onSubmit}>
                        Save Alert
                    </Button>
                </div>
            </>
        )
    }
}
