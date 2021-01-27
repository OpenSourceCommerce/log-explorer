import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, DoughnutPieChart, FilterDate, FilterText, Input} from "../index";
import {Live} from "../../actions";
import {WIDGET_TYPE} from "../../utils";
import {CounterSum} from "./_counter-sum";
import {WidgetTable} from "./_widget-table";

const WIDGET = {
    placeHolder: 'Please select widget widgetType',
    data: [
        {label: 'Doughnut', value: WIDGET_TYPE.doughnut},
        {label: 'Pie', value: WIDGET_TYPE.pie},
        {label: 'Counter Sum', value: WIDGET_TYPE.counterSum},
        {label: 'Table', value: WIDGET_TYPE.table},
    ]
}

const DATA_FROM_API = [
    {label: 'Mobile', value: 2000},
    {label: 'Desktop', value: 700},
    {label: 'Bot', value: 350},
    {label: 'Botm', value: 34},
];

export class WidgetManagement extends Component {
    constructor(props) {
        super(props);

        // default Doughnut when user create new widget
        const initialData = {
            layout: {i: '', x: 0, y: 0, w: 3, h: 2, minW: 3, minH: 2},
            dataWidget: [...DATA_FROM_API],
            widgetHeader: '',
            widgetType: WIDGET_TYPE.doughnut,
        }

        this.state = {
            // currently only handle for add new not edit and only view permission
            widgetDetail: {...initialData},
            initialData,
        }
    }

    componentDidMount() {
        /*
           When user wanna edit any widget, will be call API to get widget detail here


        */
        // If create new widget we will use data below

        const {widgetList} = this.props;
        const widgetId = widgetList.length + 1;

        this.setState({
            widgetId: widgetId.toString(),
        })

    }

    render() {
        const {widgetDetail, widgetId} = this.state;
        const {widgetList} = this.props;

        const WidgetLayout = ({widgetDetail, widgetId}) => {
            const {widgetType, widgetHeader, dataWidget, layout} = widgetDetail;
            let component;
            switch (widgetType) {
                case WIDGET_TYPE.doughnut:
                case WIDGET_TYPE.pie: {
                    component = <DoughnutPieChart
                        id={widgetId}
                        type={widgetType}
                        widgetHeader={widgetHeader}
                        data={dataWidget}
                        height='500'
                        minHeight='500'
                    />;
                    break;
                }
                case WIDGET_TYPE.counterSum: {
                    component = <CounterSum
                        data={dataWidget}
                        widgetHeader={widgetHeader}
                    />
                    break;
                }
                case WIDGET_TYPE.table: {
                    component = <WidgetTable
                        key={dataWidget}
                        data={dataWidget}
                        widgetHeader={widgetHeader}
                        isDashboardComponent={true}
                    />
                    break;
                }
            }
            return component;
        };

        const onChangeData = ({name, value}) => {
            console.log({name, value});
            this.setState((preState) => ({
                widgetDetail: {
                    ...preState.widgetDetail,
                    [name]: value,
                    layout: {
                        ...preState.widgetDetail.layout,
                    }
                }
            }))
        }

        const addNew = (widgetDetail, widgetId) => {
            let layout;
            const { widgetType } = widgetDetail;

            switch (widgetType) {
                case WIDGET_TYPE.doughnut:
                case WIDGET_TYPE.pie: {
                    layout = {i: widgetId.toString(), x: 0, y: 0, w: 3, h: 2, minW: 3, minH: 2};
                    break;
                }
                case WIDGET_TYPE.counterSum: {
                    layout = {i: widgetId.toString(), x: 0, y: 0, w: 3, h: 1, minW: 3, minH: 1};
                    break;
                }
                case WIDGET_TYPE.table: {
                    layout = {i: widgetId.toString(), x: 0, y: 0, w: 3, h: 3, minW: 3, minH: 3};
                    break;
                }
            }

            this.props.addNew([
                ...widgetList,
                {   ...widgetDetail,
                    layout,
                }
            ])

            this.setState({
                widgetId: widgetId + 1,
                widgetDetail: { ...this.state.initialData },
            })
        }

        return (
            <div className="editable-widget">
                <div className="filter-panel card">
                    <div className="card-body row">
                        <div className="col-12 col-md-6">
                            <FilterText
                                label="What are you looking for ?"
                                placeholder="status = 200 AND url LIKE '%product%'"
                            />
                        </div>
                        <div className="input-search col-12 col-md-4 mt-2 mt-md-0">
                            <FilterDate
                                label="Date Range"
                                onDateRangeChanged={(f, t) => console.log(f, t)}
                            />
                        </div>
                        <div className="col-12 col-md-2 btn-action-group mt-4">
                            <Button className="btn-search w-100 mt-0 mt-md-2"
                                    onClick={() => addNew(widgetDetail, widgetId)}>
                                SEARCH
                            </Button>
                        </div>
                    </div>
                </div>
                {widgetDetail && widgetDetail.dataWidget ? (
                    <div className="widget-panel row">
                        <div className="select-widget-widgetType col-12 col-md-3">
                            <div className="card">
                                <div className="card-header pr-3 pl-3">Setting</div>
                                <div className="card-body pr-2 pl-2">
                                    <div className="col-12">
                                        <div className="header">
                                            <div>
                                                <p className="float-left mb-2">Header</p>
                                            </div>
                                            <Input
                                                placeholder='Input header'
                                                name="widgetHeader"
                                                onBlur={(e) => onChangeData(e.target)}
                                            />
                                        </div>
                                        <div className="widgetType">
                                            <div>
                                                <p className="float-left mb-2">Type</p>
                                            </div>
                                            <select
                                                className="form-control"
                                                aria-label="Default select"
                                                name="widgetType"
                                                defaultValue={widgetDetail.widgetType}
                                                onChange={(e) => onChangeData(e.target, widgetId)}
                                            >
                                                {WIDGET.data.map((item, index) => (
                                                    <option value={item.value}
                                                            key={index}
                                                    >
                                                        {item.label}
                                                    </option>))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="widget col-12 col-md-9">
                            <div className="card pb-5">
                                {widgetDetail && widgetDetail.dataWidget && widgetDetail.dataWidget.length > 0 ?
                                    <WidgetLayout widgetDetail={widgetDetail} widgetId={widgetId}/> :
                                    <p className="text-center"> No data display.</p>
                                }
                            </div>
                        </div>
                    </div>
                ) : <p className="text-center mt-5"> No data for display </p>}
            </div>
        );
    }
}

WidgetManagement.propTypes = {
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    widgetList: PropTypes.array
};
