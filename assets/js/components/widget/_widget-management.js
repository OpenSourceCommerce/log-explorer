import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, DoughnutPieChart, FilterDate, FilterText, Input} from "../index";
import {WIDGET_TYPE} from "../../utils";
import {CounterSum} from "./_counter-sum";
import {WidgetTable} from "./_widget-table";
import {DatabaseActions, WidgetActions} from "../../actions";
import {isEqual} from "lodash";
import {FormField} from "../_form-field";

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
            field: '',
            order: '',
            size: '',
            table: '',
            title: '',
            type: ''
            // field: "timestamp",
            // order: "asc",
            // size: 10,
            // table: "nginx_access",
            // title: "adsdasdasd",
            // type: "4"
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
        this.addNew = this.addNew.bind(this);
    }

    async componentDidMount() {
        /*
           When user wanna edit any widget, will be call API to get widget detail here

        */
        this.setState({
            isLoading: true,
        });

        const {widget} = this.props;
        const {widgetDetail, initialData} = this.state;

        const [
            tableRes,
            widgetDetailRes,
        ] = await Promise.all([
            DatabaseActions.getAllTable(),
            widget && WidgetActions.loadWidget(widget),
        ]);

        let tables = [];

        if (tableRes && tableRes.data && tableRes.data.length > 0) {
            tables = tableRes.data.map(item => ({
                value: item,
                label: item
            }))
        }

        let newWidgetDetail = {...widgetDetail};
        let newInitialData = {...initialData};

        if (widgetDetailRes && widgetDetailRes.data) {
            newWidgetDetail = {...widgetDetailRes.data};
            newInitialData = {...widgetDetailRes.data};

        }

        let columns = [];

        if (widgetDetail && widgetDetail.table) {
            const columnRes = await DatabaseActions.getTableColumns(widgetDetail.table);
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

    async addNew() {
        // let layout;
        const {widgetDetail} = this.state;
        const {title, table, field, order, size, type, id} = this.state.widgetDetail;

        let errors;
        Object.entries(widgetDetail).forEach(([key, value]) => {
            console.log(key, value)
            if (!value) {
                errors = {
                    ...errors,
                    [key]: true,
                }
            }
        });

        if (errors && Object.keys(errors).length > 0) {
            this.setState({
                errors,
            });
            console.log('errors', errors);
            return;
        }


        console.log('widgetDetail', widgetDetail);

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

        const resp = await WidgetActions.createOrUpdate(id, {
            title,
            type,
        });

        console.log(resp);
        // after success set new data for initialData

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

        const {title, table, field, order, size, type} = widgetDetail;

        return (
            <div className="editable-widget">
                {/*<div className="filter-panel card">*/}
                {/*    <div className="card-body row">*/}
                {/*        <div className="col-12 col-md-8">*/}
                {/*            <FilterText*/}
                {/*                label="What are you looking for ?"*/}
                {/*                placeholder="status = 200 AND url LIKE '%product%'"*/}
                {/*                onChange={(e) => onChangeData(e.target)}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*        /!*<div className="input-search col-12 col-md-3 mt-2 mt-md-0">*!/*/}
                {/*        /!*    <FilterDate*!/*/}
                {/*        /!*        label="Date Range"*!/*/}
                {/*        /!*        onDateRangeChanged={(f, t) => console.log(f, t)}*!/*/}
                {/*        /!*    />*!/*/}
                {/*        /!*</div>*!/*/}

                {/*    </div>*/}
                {/*</div>*/}
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
                                        <FormField
                                            label='Field'
                                            value={field}
                                            fieldName='field'
                                            onChange={(e) => this.onChangeData(e.target)}
                                            isMandatory={true}
                                            type='select'
                                            errors={errors}
                                            disabled={!table}
                                        >
                                            {this.generateOption(columns, 'column')}
                                        </FormField>
                                        <div className="row">
                                            <FormField
                                                className='col-12 col-md-6'
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
                                            <FormField
                                                className='col-12 col-md-6 pt-md-0'
                                                label='Size'
                                                value={size}
                                                fieldName='size'
                                                onChange={(e) => this.onChangeData(e.target)}
                                                isMandatory={true}
                                                type='select'
                                                errors={errors}
                                            >
                                                {this.generateOption(null, 'size')}
                                            </FormField>
                                        </div>
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
                                        <div className="row">
                                            <div className="col-12 col-md-6 btn-action-group">
                                                <Button className="btn-search w-100 mt-0 mt-md-2"
                                                        onClick={() => this.addNew()}
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
