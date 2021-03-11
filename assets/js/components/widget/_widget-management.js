import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, DoughnutPieChart, FilterText, FormField} from "../index";
import {WIDGET_TYPE} from "../../utils";
import {CounterSum} from "./_counter-sum";
import {WidgetTable} from "./_widget-table";
import {DatabaseActions, WidgetActions} from "../../actions";
import {isEqual} from "lodash";

const WIDGET = [
    {label: 'Doughnut', value: WIDGET_TYPE.doughnut},
    {label: 'Pie', value: WIDGET_TYPE.pie},
    {label: 'Counter Sum', value: WIDGET_TYPE.counterSum},
    {label: 'Table', value: WIDGET_TYPE.table},
]

const DATA_FROM_API = [
    {label: 'Mobile', value: 2000},
    {label: 'Desktop', value: 700},
    {label: 'Bot', value: 350},
    {label: 'Botm', value: 34},
];

export class WidgetManagement extends Component {
    constructor(props) {
        super(props);

        // initial data will be data exist when user edit widget
        const initialData = {
            column: '',
            order: 'asc',
            size: '',
            table: '',
            title: '',
            type: ''
        }
        this.state = {
            errors: {},
            initialData,
            widgetDetail: {
                //layout: {i: '', x: 0, y: 0, w: 3, h: 2, minW: 3, minH: 2},
                ...initialData,
            },
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
        });

        // If create new widget we will use data below
    }

    async onChangeData({name, value}) {
        if (name) {
            const {errors} = this.state;

            if (name === 'table') {
                const columnRes = await DatabaseActions.getTableColumns(value);
                const columns = columnRes && columnRes.data && columnRes.data.length > 0 ? columnRes.data.map(item => ({
                    value: item.name,
                    label: item.name
                })) : [];

                this.setState({columns});
            }

            let newErrorArray = {...errors};
            if (value) {
                // remove field in error if have value
                newErrorArray = Object.keys({...errors}).reduce(function (obj, key) {
                    if (key !== name) obj[key] = errors[key];
                    return obj;
                }, {});
            } else {
                newErrorArray = {
                    ...newErrorArray,
                    [name]: true,
                }
            }

            this.setState((preState) => ({
                widgetDetail: {
                    ...preState.widgetDetail,
                    [name]: value,
                },
                errors: {...newErrorArray},
            }))
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
        const {widgetDetail} = this.state;
        const {title, table, column, order, size, type, id} = this.state.widgetDetail;

        console.log('widgetDetail', widgetDetail);
        let data;
        Object.entries(widgetDetail).forEach(([key, value]) => {
            if (key === 'order') {
                data = {
                    ...data,
                    isOrderDesc: order === 'desc',
                }
            }

            if (value) {
                data = {
                    ...data,
                    [key]: value,
                }
            }
        });

        const resp = await WidgetActions.createOrUpdate(id, data);

        if (resp && !resp.error && resp.redirect) {
            // ToastrHelper.success('Reset successful');
            window.location.href = resp.redirect;
            return;
        } else {
            const {fields} = resp;
            this.setState({
                errors: {...fields},
            })
        }

        // if (errors && Object.keys(errors).length > 0) {
        //     this.setState({
        //         errors,
        //     });
        //     console.log('errors', errors);
        //     return;
        // }

        // switch (widgetType) {
        //     case WIDGET_TYPE.doughnut:
        //     case WIDGET_TYPE.pie: {
        //         layout = {i: widgetId.toString(), x: 0, y: 0, w: 3, h: 2, minW: 3, minH: 2};
        //         break;
        //     }
        //     case WIDGET_TYPE.counterSum: {
        //         layout = {i: widgetId.toString(), x: 0, y: 0, w: 3, h: 1, minW: 3, minH: 1};
        //         break;
        //     }
        //     case WIDGET_TYPE.table: {
        //         layout = {i: widgetId.toString(), x: 0, y: 0, w: 3, h: 3, minW: 3, minH: 3};
        //         break;
        //     }
        // }

        // let data = {
        //     title,
        //     type,
        //     table,
        //     column,
        //     isOrderDesc: order === 'desc',
        //     size,
        // }
    }

    render() {
        const {
            widgetDetail,
            initialData,
            tables,
            columns,
            defaultData,
            errors,
            isLoading
        } = this.state;

        const WidgetLayout = ({widgetDetail, id}) => {
            const {type, title, dataWidget} = widgetDetail;
            let component;
            switch (type) {
                case WIDGET_TYPE.doughnut:
                case WIDGET_TYPE.pie: {
                    component = <DoughnutPieChart
                        id={id}
                        type={type}
                        widgetHeader={title}
                        data={dataWidget}
                        height='500'
                        minHeight='500'
                    />;
                    break;
                }
                case WIDGET_TYPE.counterSum: {
                    component = <CounterSum
                        data={dataWidget}
                        widgetHeader={title}
                    />
                    break;
                }
                case WIDGET_TYPE.table: {
                    component = <WidgetTable
                        key={dataWidget}
                        data={dataWidget}
                        widgetHeader={title}
                        isDashboardComponent={true}
                    />
                    break;
                }
            }
            return component;
        };

        const {title, table, column, order, size, type} = widgetDetail;

        const isCounterSumType = type === WIDGET_TYPE.counterSum;

        return (
            <div className="editable-widget">
                {isLoading ?
                    (<span
                        className="spinner-border spinner-border-sm mr-2"
                        role="status" aria-hidden="true"></span>) :
                    (<div className="widget-panel row">
                        <div className="select-widget-widgetType col-12 col-md-4">
                            <div className="card">
                                <div className="card-header pr-3 pl-3">Setting</div>
                                <div className="card-body pr-2 pl-2">
                                    <div className="col-12">
                                        <FormField
                                            label='Header'
                                            value={title}
                                            placeholder='Input header'
                                            fieldName='title'
                                            onChange={(e) => this.onChangeData(e.target)}
                                            isMandatory={true}
                                            errors={errors}
                                        />
                                        <FormField
                                            label='Type'
                                            value={type}
                                            fieldName='type'
                                            onChange={(e) => this.onChangeData(e.target)}
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
                                            isMandatory={true}
                                            type='select'
                                            errors={errors}
                                        >
                                            {this.generateOption(tables, 'table')}
                                        </FormField>
                                        {!isCounterSumType && <FormField
                                            label='Column'
                                            value={column}
                                            fieldName='column'
                                            onChange={(e) => this.onChangeData(e.target)}
                                            isMandatory={false}
                                            type='select'
                                            errors={errors}
                                            disabled={!table}
                                        >
                                            {this.generateOption(columns, 'column')}
                                        </FormField>}
                                        <div className="row">
                                            <FormField
                                                className={`col-12 ${!isCounterSumType && 'col-md-6'}`}
                                                label='Order'
                                                value={order}
                                                fieldName='order'
                                                onChange={(e) => this.onChangeData(e.target)}
                                                isMandatory={true}
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
                                                onChange={(e) => this.onChangeData(e.target)}
                                                isMandatory={false}
                                                type='select'
                                                errors={errors}
                                            >
                                                {this.generateOption(null, 'size')}
                                            </FormField>}
                                        </div>
                                        <FilterText
                                            label="Filter"
                                            placeholder="status = 200 AND url LIKE '%product%'"
                                            onChange={(e) => this.onChangeData(e.target)}
                                        />
                                        <div className="row">
                                            <div className="col-12 col-md-6 btn-action-group">
                                                <Button className="btn-search w-100 mt-0 mt-md-2"
                                                        onClick={() => this.onSubmit()}
                                                        disabled={isEqual(initialData, widgetDetail) || Object.keys(errors).length > 0}
                                                >
                                                    {`${widgetDetail.id ? 'Update' : 'Add new'}`}
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
                        </div>
                        <div className="widget col-12 col-md-8">
                            <div className="card pb-5">
                                {defaultData && defaultData && defaultData.length > 0 ?
                                    <WidgetLayout widgetDetail={defaultData} id={id}/> :
                                    <p className="text-center"> No data display.</p>
                                }
                            </div>
                        </div>
                    </div>)
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
