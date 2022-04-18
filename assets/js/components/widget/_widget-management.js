import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, FilterText, FormField} from "../index";
import {WIDGET_TYPE} from "../../utils";
import {Alert, DatabaseActions, WidgetActions} from "../../actions";
import {isEqual} from "lodash";

const WIDGET = [
    {label: 'Doughnut', value: WIDGET_TYPE.doughnut},
    {label: 'Pie', value: WIDGET_TYPE.pie},
    {label: 'Counter Sum', value: WIDGET_TYPE.counterSum},
    {label: 'Table', value: WIDGET_TYPE.table},
    {label: 'Bar', value: WIDGET_TYPE.bar},
    {label: 'Line', value: WIDGET_TYPE.line},
]
export class WidgetManagement extends Component {
    constructor(props) {
        super(props);

        // initial data will be data exist when user edit widget
        const initialData = {
            column: '',
            order: 'desc',
            size: '5',
            table: '',
            title: '',
            type: '4',
        }

        const mandatoryFields = [
            'title', 'type', 'table', 'order', 'column'
        ];

        this.state = {
            errors: {},
            initialData,
            widgetDetail: {
                //layout: {i: '', x: 0, y: 0, w: 3, h: 2, minW: 3, minH: 2},
                ...initialData,
            },
            mandatoryFields,
            columns: [],
            isLoading: false,
        }

        this.onChangeData = this.onChangeData.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
        /*
           When user wanna edit any widget, will be call API to get widget detail here

        */
        this.setState({
            isLoading: true,
        });

        const {widget} = this.props;
        const {initialData} = this.state;

        const [
            tableRes,
            widgetDetailRes,
        ] = await Promise.all([
            DatabaseActions.getAllTable(),
            widget && WidgetActions.loadWidget(widget),
        ]);

        let tables = tableRes && tableRes.data && tableRes.data.length > 0 ? tableRes.data.map(item => ({
            value: item,
            label: item
        })) : [];

        let newInitialData = {...initialData};
        let newWidgetDetail = {...initialData};

        if (widgetDetailRes && widgetDetailRes.data) {
            newWidgetDetail = {
                ...widgetDetailRes.data,
                order: widgetDetailRes.data.order_desc ? 'desc' : 'asc',
                column: widgetDetailRes.data.column || ''
            };
            newInitialData = {
                ...newWidgetDetail
            };

        }

        let columns = [];

        if (newWidgetDetail && newWidgetDetail.table) {
            const columnRes = await DatabaseActions.getTableColumns(newWidgetDetail.table);
            columns = columnRes && columnRes.data && columnRes.data.length > 0 ? columnRes.data.map(item => ({
                value: item.name,
                label: item.name
            })) : [];
        }

        this.setState({
            tables,
            columns,
            widgetDetail: newWidgetDetail,
            initialData: newInitialData,
            isLoading: false,
        }, () => {
            const {updateInitialData} = this.props;
            if (updateInitialData) updateInitialData(newWidgetDetail);
        });

        // If create new widget we will use data below
    }

    async onChangeData({name, value}, isUpdateWidget) {
        const {widgetDetail, columns, errors, mandatoryFields} = this.state;

        let newColumnData = [...columns];
        let newWidgetDetail = {...widgetDetail};
        let newErrors = {...errors};
        let newMandatoryFieldArray = [...mandatoryFields];
        let newValue = value;

        if (name) {
            const {errors} = this.state;

            if (name === 'table') {
                const columnRes = await DatabaseActions.getTableColumns(newValue);
                newColumnData = columnRes && columnRes.data && columnRes.data.length > 0 ? columnRes.data.map(item => ({
                    value: item.name,
                    label: item.name
                })) : [];

                let column = ''

                if (widgetDetail.type == WIDGET_TYPE.table) {
                    column = []
                }

                newWidgetDetail = {...widgetDetail, column}
            } else if (name === 'type') {
                if (newValue === WIDGET_TYPE.counterSum) {
                    newMandatoryFieldArray = newMandatoryFieldArray.filter(item => item !== 'column');
                } else {
                    if (!newMandatoryFieldArray.includes('column')) {
                        newMandatoryFieldArray.push('column')
                    }
                }
            } else if (name == 'column' && widgetDetail.type == WIDGET_TYPE.table) {
                newValue = newValue.trim()

                let currentValue = widgetDetail.column

                if (typeof currentValue === 'string') {
                    currentValue = currentValue.split(',')
                }

                if (!currentValue) {
                    currentValue = []
                    currentValue.push(value)
                } else {
                    const index = currentValue.indexOf(value)

                    if (index >= 0) {
                        currentValue.splice(index, 1)
                    } else {
                        currentValue.push(value)
                    }
                }

                newValue = currentValue
            }
            if (newValue) {
                // remove field in error if have value
                newErrors = Object.keys({...errors}).reduce(function (obj, key) {
                    if (key === 'column') {
                        if (name === 'type' && newValue !== WIDGET_TYPE.counterSum) {
                            obj[key] = errors[key]
                        }
                    } else if (key !== name) obj[key] = errors[key];

                    return obj;
                }, {});
            } else {
                if (mandatoryFields.includes(name)) {
                    newErrors = {
                        ...newErrors,
                        [name]: true,
                    }
                }
            }

            newWidgetDetail = {
                ...newWidgetDetail,
                [name]: newValue
            }

            this.setState({
                columns: newColumnData.length > 0 ? [...newColumnData] : [],
                widgetDetail: {...newWidgetDetail},
                errors: {...newErrors},
                mandatoryFields: [...newMandatoryFieldArray],
            }, () => {
                const {onUpdateWidget} = this.props;
                if (isUpdateWidget && onUpdateWidget) {
                    onUpdateWidget(name, value);
                }
            });
        }
    }

    generateOption(data, field) {
        let options = data;
        if (field === 'order') {
            options = [
                {value: 'asc', label: 'Ascending'},
                {value: 'desc', label: 'Descending'},
            ]
        } else if (field === 'size') {
            options = [
                {value: '1', label: '1'},
                {value: '5', label: '5'},
                {value: '10', label: '10'},
                {value: '20', label: '20'},
            ]
        } else if (field === 'type') {
            options = [...WIDGET]
        }

        if (options && options.length > 0) {
            return (
                <>
                    <option value='' className='d-none'>{`Select ${field}`}</option>
                    {options.map((item, index) => (
                        <option value={item.value}
                                key={index}
                        >
                            {item.label}
                        </option>))}
                </>
            )
        } else {
            return null;
        }
    }

    async onSubmit() {
        // let layout;
        const {widgetDetail, errors, mandatoryFields} = this.state;
        const {order, id} = widgetDetail;

        let newErrors = {...errors}
        mandatoryFields.forEach((item) => {
            let isInvalidField = false;
            if (!widgetDetail[item]) {
                isInvalidField = true
            } else if (Array.isArray(widgetDetail[item])) {
                if (widgetDetail[item].length === 0) {
                    isInvalidField = true
                }
            }
            if (isInvalidField) {
                newErrors = {
                    ...newErrors,
                    [item]: true
                }
            }
        })

        if (Object.keys(newErrors).length === 0) {
            let data;
            Object.entries(widgetDetail).forEach(([key, value]) => {
                if (key === 'order') {
                    data = {
                        ...data,
                        isOrderDesc: order === 'desc',
                    }
                }

                if (value) {
                    if (key === 'column' && Array.isArray(value)) {
                        value = value.join(',')
                    }

                    data = {
                        ...data,
                        [key]: value,
                    }
                }
            });

            const resp = await WidgetActions.createOrUpdate(id, data);

            if (resp && !resp.error) {
                Alert.success(`${id ? 'Update' : 'Add new'} successful`);
                if (resp.redirect) {
                    window.location.href = resp.redirect;
                    return;
                } else {
                    this.setState({
                        initialData: {...widgetDetail},
                    })
                }
                return;
            } else {
                const {fields} = resp;
                this.setState({
                    errors: {...fields},
                })
            }
        } else {
            this.setState({
                errors: {...newErrors}
            })
        }
    }

    render() {
        const {
            widgetDetail,
            initialData,
            tables,
            columns,
            errors,
            isLoading,
            mandatoryFields,
        } = this.state;

        const {
            onSaveClicked,
            onDeleteCLicked,
            queries
        } = this.props

        const {
            title,
            table,
            column,
            order,
            size,
            type,
            id,
            query
        } = widgetDetail;

        const isCounterSumType = type == WIDGET_TYPE.counterSum;

        return (
            <div className="editable-widget">
                {isLoading ?
                    <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status" aria-hidden="true"></span> :
                    <div className="card">
                        <div
                            className="card-header pr-3 pl-3">{id ? 'Update setting' : 'Setting'}</div>
                        <div className="card-body pr-2 pl-2">
                            <div className="col-12">
                                <FormField
                                    label='Header'
                                    value={title}
                                    placeholder='Input header'
                                    fieldName='title'
                                    onChange={(e) => this.onChangeData(e.target)}
                                    onBlur={(e) => this.onChangeData(e.target, true)}
                                    isMandatory={mandatoryFields.includes('title')}
                                    errors={errors}
                                />
                                <FormField
                                    label='Type'
                                    value={type}
                                    fieldName='type'
                                    onChange={(e) => this.onChangeData(e.target, true)}
                                    isMandatory={true}
                                    type='select'
                                    errors={errors}
                                >
                                    {this.generateOption(null, 'type')}
                                </FormField>
                                <FormField
                                    label='Datatable'
                                    value={table}
                                    fieldName='table'
                                    onChange={(e) => this.onChangeData(e.target)}
                                    isMandatory={mandatoryFields.includes('table')}
                                    type='select'
                                    errors={errors}
                                >
                                    {this.generateOption(tables, 'table')}
                                </FormField>
                                {!isCounterSumType && <>
                                    <FormField
                                        label='Column'
                                        value={column}
                                        fieldName='column'
                                        onChange={(e) => this.onChangeData(e.target, true)}
                                        isMandatory={mandatoryFields.includes('column')}
                                        type='select'
                                        errors={errors}
                                        disabled={!table}
                                        multiple={type == WIDGET_TYPE.table}
                                    >
                                        {this.generateOption(columns, 'column')}
                                    </FormField>
                                    {type == WIDGET_TYPE.table && <span className="text-sm">
                                        * Can select multiple columns
                                    </span>}
                                </>}
                                <div className="row">
                                    <FormField
                                        className={`col-12 ${!isCounterSumType && 'col-md-6'}`}
                                        label='Order'
                                        value={order}
                                        fieldName='order'
                                        onChange={(e) => this.onChangeData(e.target)}
                                        isMandatory={mandatoryFields.includes('order')}
                                        type='select'
                                        errors={errors}
                                    >
                                        {this.generateOption(null, 'order')}
                                    </FormField>
                                    {!isCounterSumType && <FormField
                                        className='col-12 col-md-6 pt-md-0'
                                        label='Size'
                                        value={size}
                                        fieldName='size'
                                        onChange={(e) => this.onChangeData(e.target, true)}
                                        type='select'
                                        errors={errors}
                                    >
                                        {this.generateOption(null, 'size')}
                                    </FormField>}
                                </div>
                                <div className='form-field form-group'>
                                    <label>Filter</label>
                                    <FilterText
                                        fieldName='query'
                                        value={query}
                                        queries={queries}
                                        onSaveClicked={onSaveClicked}
                                        onDeleteCLicked={onDeleteCLicked}
                                        placeholder="status = 200 AND url LIKE '%product%'"
                                        onBlur={(e) => this.onChangeData(e.target)}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6 btn-action-group">
                                        <Button className="btn-search w-100 mt-0 mt-md-2"
                                                onClick={() => this.onSubmit()}
                                                disabled={Object.keys(errors).length > 0}
                                            // disabled={isEqual(initialData, widgetDetail) || Object.keys(errors).length > 0}
                                        >
                                            {`${id ? 'Update' : 'Add new'}`}
                                        </Button>
                                    </div>
                                    <div
                                        className="col-12 col-md-6 btn-action-group pt-2 pt-md-0">
                                        <Button className="btn-search w-100 mt-0 mt-md-2"
                                                color="default"
                                                onClick={() => history.back()}>
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

WidgetManagement.propTypes = {
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string
};
