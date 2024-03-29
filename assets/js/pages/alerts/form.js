import React, { Component } from "react";
import { Modal, Size, Button, FormField, FilterDate } from "../../components";
import { AlertActions } from "../../actions";
import { DATE_RANGE, TOAST_STATUS } from "../../utils";

const MANDATORY_FIELDS = [
    "title",
    "from_table",
    "query",
    "threshold",
    "interval_time",
    "email",
    "subject",
];

const DEFAULT_ALERT = {
    id: "",
    title: "",
    from_table: "",
    query: "",
    threshold: "",
    interval_time: "60",
    email: "",
    subject: "",
    time_range: {
        from: DATE_RANGE[0].from,
        to: DATE_RANGE[0].to,
        label: DATE_RANGE[0].label,
    },
};

export class AlertFormModal extends Component {
    constructor(props) {
        super(props);

        this.filterDateRef = React.createRef();

        this.state = {
            data: DEFAULT_ALERT,
            isLoading: false,
            errors: [],
            fieldErrorMessages: {},
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { editAlertIndex, alertList } = props;
        const { data, errors } = state;

        const alertElement =
            parseInt(editAlertIndex) >= 0 ? alertList[editAlertIndex] : DEFAULT_ALERT;

        let newData = { ...data };
        let newErrors = [...errors];

        if (alertElement.id !== data.id) {
            if (alertElement.id === null) {
                newData = DEFAULT_ALERT;
            } else {
                newData = { ...alertElement };
                let dateRange = newData.time_range;
                if (dateRange.label !== "Custom Range") {
                    const dateRangeValue = DATE_RANGE.find(
                        (item) => item.label === dateRange.label
                    );
                    if (dateRangeValue) {
                        dateRange = { ...dateRangeValue };
                    }
                } else {
                    dateRange.from = moment.unix(parseInt(dateRange.from));
                    dateRange.to = moment.unix(parseInt(dateRange.to));
                }
                newData["time_range"] = dateRange;
            }
            newErrors = [];
        }

        return {
            data: { ...newData },
            errors: newErrors,
        };
    }

    onChangeField = ({ name, value }) => {
        this.setState((preState) => {
            const { errors, data, fieldErrorMessages } = preState;
            let newErrors = [...errors];
            let newFieldErrorMessages = { ...fieldErrorMessages };
            if (MANDATORY_FIELDS.includes(name)) {
                newErrors = newErrors.filter((item) => item !== name);
                if (!value) newErrors.push(name);
            }

            if (newFieldErrorMessages[name]) {
                newFieldErrorMessages[name] = "";
            }
            return {
                data: {
                    ...data,
                    [name]: value,
                },
                errors: newErrors,
                fieldErrorMessages: { ...newFieldErrorMessages },
            };
        });
    };

    onChangeFilter = async (from, to, dateRange) => {
        this.onChangeField({ name: "time_range", value: dateRange });
    };

    onSubmit = async () => {
        this.setState({
            isLoading: true,
        });
        const { data } = this.state;

        let payloadData = { ...data, isActive: "1" };

        const { onSubmitAlertData } = this.props;

        let errors = MANDATORY_FIELDS.filter((item) => {
            if (!payloadData[item]) return true;
            return false;
        });

        if (errors.length > 0) {
            this.setState({
                errors,
                isLoading: false,
            });
            return;
        }

        const { time_range } = data;

        this.setState({ isLoading: true });
        const label = time_range?.label;
        let from = time_range?.from;
        let to = time_range?.to;

        if (typeof from === "object") {
            from = from.unix();
        }

        if (typeof to === "object") {
            to = to.unix();
        }

        payloadData["time_range"] = `${label}|${from}|${to}`;

        let toastContent = {};

        let fieldErrorMessages = {};

        const res = await AlertActions.createOrUpdate(payloadData?.id, payloadData);
        if (res.error === 1) {
            payloadData["time_range"] = time_range;
            errors = Object.keys(res.fields);
            fieldErrorMessages = { ...res.fields };
        } else {
            toastContent = {
                color: TOAST_STATUS.success,
                message: `${data.id ? "Update" : "Create"} alert successful`,
            };
            payloadData.id = res.id;
        }
        if (errors.length > 0 || Object.keys(fieldErrorMessages).length > 0) {
            this.setState({ errors, fieldErrorMessages, isLoading: false });
        } else {
            this.setState({
                data: payloadData,
                isLoading: false,
            });
            onSubmitAlertData(toastContent);
        }
    };

    render() {
        const { isShow, onHidden, tableList } = this.props;
        const { data, errors, isLoading, fieldErrorMessages } = this.state;

        const {
            id,
            title,
            from_table,
            query,
            threshold,
            interval_time,
            email,
            subject,
            time_range,
        } = data;

        return (
            <Modal
                id={`alert-form-${id || "create"}`}
                size={Size.medium}
                title={`${id ? "Update" : "Create new"} alert`}
                showCloseButton={false}
                show={isShow}
                isPositionCenter={true}
                onHidden={() => {
                    onHidden();
                    this.setState({
                        data: DEFAULT_ALERT,
                        errors: [],
                    });
                }}
            >
                <form role="form" className="mx-4">
                    <FormField
                        className="mb-3"
                        label="Title"
                        value={title}
                        placeholder="New alert"
                        fieldName="title"
                        onChange={(e) => this.onChangeField(e.target)}
                        isMandatory={MANDATORY_FIELDS.includes("title")}
                        errors={errors}
                    />
                    <FormField
                        className="mb-3"
                        value={from_table}
                        label="Select table"
                        fieldName="from_table"
                        onChange={(e) => this.onChangeField(e.target)}
                        isMandatory={MANDATORY_FIELDS.includes("from_table")}
                        type="select"
                        errors={errors}
                    >
                        <option value="">Select table</option>
                        {tableList.map((table, key) => (
                            <option key={key} value={table}>
                                {table}
                            </option>
                        ))}
                    </FormField>
                    <FormField
                        className="mb-3"
                        label="Criteria to search for in sql mode"
                        value={query}
                        placeholder="..."
                        fieldName="query"
                        onChange={(e) => this.onChangeField(e.target)}
                        isMandatory={MANDATORY_FIELDS.includes("query")}
                        errors={errors}
                    />
                    <FormField
                        className="mb-3"
                        label="Limit for alert"
                        value={threshold}
                        fieldName="threshold"
                        type="number"
                        min="0"
                        onChange={(e) => this.onChangeField(e.target)}
                        isMandatory={MANDATORY_FIELDS.includes("threshold")}
                        errors={errors}
                        errorMessage={fieldErrorMessages["threshold"]}
                    />
                    <FormField
                        className="mb-3"
                        label="Check interval in minutes"
                        value={interval_time}
                        type="number"
                        min="0"
                        fieldName="interval_time"
                        onChange={(e) => this.onChangeField(e.target)}
                        isMandatory={MANDATORY_FIELDS.includes("interval_time")}
                        errors={errors}
                        errorMessage={fieldErrorMessages["interval_time"]}
                    />
                    <div className={`form-group mb-3` + (errors?.time_range ? "is-invalid" : "")}>
                        <FilterDate
                            label="Time Range"
                            ref={this.filterDateRef}
                            dateRange={time_range}
                            onDateRangeChanged={this.onChangeFilter}
                        />
                        {errors?.time_range && (
                            <span className="error invalid-feedback">{errors.time_range}</span>
                        )}
                    </div>

                    <FormField
                        className="mb-3"
                        label="Email Address"
                        value={email}
                        fieldName="email"
                        onChange={(e) => this.onChangeField(e.target)}
                        isMandatory={MANDATORY_FIELDS.includes("email")}
                        errors={errors}
                    />
                    <FormField
                        className="mb-3"
                        label="Email Subject"
                        value={subject}
                        fieldName="subject"
                        onChange={(e) => this.onChangeField(e.target)}
                        isMandatory={MANDATORY_FIELDS.includes("subject")}
                        errors={errors}
                    />
                    <div className="form-group">
                        <Button
                            isLoading={isLoading}
                            type="button"
                            className="btn-block w-100"
                            disabled={errors.length > 0}
                            onClick={this.onSubmit}
                        >
                            Save Alert
                        </Button>
                    </div>
                </form>
            </Modal>
        );
    }
}
