import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, DoughnutPieChart, FilterDate, FilterText, Input} from "../index";
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

        const initialData = {
            title: '',
            type: WIDGET_TYPE.doughnut,
            size: 10,
            order: 'asc'
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
                delete newErrorArray[name];
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

    addNew() {
        // let layout;
        const {widgetDetail} = this.state;
        const {title, table, field, order, size, type} = this.state.widgetDetail;

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
            console.log(errors)
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

        // WidgetActions.createOrUpdate(id, {
        //     title,
        //     type,
        //     query,
        // })

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

        console.log('table', table);
        console.log('table', tables);
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
                                        <div className="header form-group">
                                            <label>Header</label>
                                            <Input
                                                className={`${errors.title && 'is-invalid'}`}
                                                placeholder='Input header'
                                                name="title"
                                                defaultValue={title}
                                                onBlur={(e) => this.onChangeData(e.target)}
                                            />
                                            {errors.title && <span id="exampleInputPassword1-error"
                                                                   className="error invalid-feedback">Please provide a tittle</span>}
                                        </div>
                                        <div className="widgetTable form-group">
                                            <label>Datatable</label>
                                            <select
                                                className="form-control"
                                                aria-label="Default select"
                                                name="table"
                                                defaultValue={table}
                                                onChange={(e) => this.onChangeData(e.target)}
                                            >
                                                {this.generateOption(tables, 'table')}
                                            </select>
                                            <span id="exampleInputPassword1-error"
                                                  className="error invalid-feedback">Please provide a table</span>
                                        </div>
                                        <div className=" widgetTable form-group">
                                            <label>Field</label>
                                            <select
                                                className="form-control"
                                                aria-label="Default select"
                                                name="field"
                                                value={field}
                                                onChange={(e) => this.onChangeData(e.target)}
                                            >
                                                {this.generateOption(columns, 'column')}
                                            </select>
                                            <span id="exampleInputPassword1-error"
                                                  className="error invalid-feedback">Please provide a field</span>
                                        </div>
                                        <div className=" row">
                                            <div className="col-12 col-md-6 form-group">
                                                <label>Order</label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select"
                                                    name="order"
                                                    defaultValue={order}
                                                    onChange={(e) => this.onChangeData(e.target)}
                                                >
                                                    {this.generateOption(null, 'order')}
                                                </select>
                                                <span id="exampleInputPassword1-error"
                                                      className="error invalid-feedback">Please provide a order</span>
                                            </div>
                                            <div className="col-12 col-md-6  pt-md-0 form-group">
                                                <label>Size</label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select"
                                                    name="size"
                                                    defaultValue={size}
                                                    onChange={(e) => this.onChangeData(e.target)}
                                                >
                                                    {this.generateOption(null, 'size')}
                                                </select>
                                                <span id="exampleInputPassword1-error"
                                                      className="error invalid-feedback">Please provide a size</span>
                                            </div>
                                        </div>
                                        <div className=" widgetType form-group">
                                            <label>Type</label>
                                            <select
                                                className="form-control"
                                                aria-label="Default select"
                                                name="type"
                                                defaultValue={type}
                                                onChange={(e) => this.onChangeData(e.target)}
                                            >
                                                {this.generateOption(null, 'type')}
                                            </select>
                                            <span id="exampleInputPassword1-error"
                                                  className="error invalid-feedback">Please provide a type</span>
                                        </div>
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
