import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import LogTableActions from "../../actions/_log-table-actions";
import {FilterDate, FilterText, ResponsiveGridLayout, Select2} from "../../components";
import {Button} from "../../components/_button";
import {Icon} from "../../components/_icon";
import {WidgetActions} from "../../actions";
import DashboardActions from "../../actions/_dashboard-actions";
import {WIDGET_TYPE} from "../../utils";
import {FormField} from "../../components/_form-field";

export class DashboardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dashboardDetail: {},
            widgetList: [],
            widgetSelected: null,
            isLoading: false,
            isClickedAddNew: false,
        };

        this.onSaveChange = this.onSaveChange.bind(this);
        this.removeWidget = this.removeWidget.bind(this);
        this.loadingData = this.loadingData.bind(this);
        this.isFilterChange = this.isFilterChange.bind(this);
    }

    async componentDidMount() {
        if (window.uuid) {
            this.setState({
                isLoading: true,
            })

            await this.loadingData();
        }
    }

    async loadingData() {
        const uuid = window.uuid;

        const [dashboardRes, widgetListRes] = await Promise.all([
            LogTableActions.getDashboard(uuid),
            WidgetActions.listWidget(),
        ]);

        const widgetList = widgetListRes && widgetListRes.data && widgetListRes.data.length > 0 ? widgetListRes.data : [];

        let dashboardDetail = {};

        if (dashboardRes && !dashboardRes.error) {

            const {widgets, data, configs} = dashboardRes;
            dashboardDetail = {
                ...data,
                configs: configs && configs.size ? {...configs} : {},
                widgets: widgets && widgets.length > 0 ? [...widgets] : [],
            } || {};

        }

        this.setState({
            dashboardDetail,
            widgetList,
            isLoading: false,
        })
    }

    async onSaveChange(widgetId) {
        const { dashboardDetail, widgetList } = this.state;
        const {id} = dashboardDetail;
        let newWidget = {};
        const widget = widgetList.find(item => item.id.toString() === widgetId);
        if (widget) {
            switch (widget.type.toString()) {
                case WIDGET_TYPE.doughnut:
                case WIDGET_TYPE.pie: {
                    newWidget = {x: 0, y: 0, width: 3, height: 2, fixed: 0};
                    break;
                }
                case WIDGET_TYPE.counterSum: {
                    newWidget = {x: 0, y: 0, width: 3, height: 1, fixed: 0};
                    break;
                }
                case WIDGET_TYPE.table: {
                    newWidget = {x: 0, y: 0, width: 3, height: 3, fixed: 0};
                    break;
                }
            }

            const addWidgetRes = await DashboardActions.addWidget(id, widget.id, newWidget);

            if (addWidgetRes && !addWidgetRes.error) {
                await this.loadingData();
            }
        }
    }

    async removeWidget(id) {
        const { dashboardDetail } = this.state;
        const removeWidgetRes = await DashboardActions.removeWidget(dashboardDetail.id, id);

        if (removeWidgetRes && !removeWidgetRes.error) {
            await this.loadingData();
        }
    }

    async isFilterChange({name, value}) {
        const { dashboardDetail } = this.state;
        const { widgets, uuid } = dashboardDetail;

        const rawFilter =  widgets.map(item => LogTableActions.getWidget(uuid, item.widget_id))
        const filterDataRes = await Promise.all(rawFilter);

        const newWidgetData = widgets.map((item,index) => {
            const {data, error} = filterDataRes[index];
            return {
                ...item,
                data: !error && data && data.length > 0 ? [...data] : [],
            }
        })

        this.setState({
            dashboardDetail: {
                ...dashboardDetail,
                widgets: [...newWidgetData]
            }
        })
    }

    render() {
        const {
            isLoading,
            dashboardDetail,
            widgetList,
            widgetSelected,
            isClickedAddNew
        } = this.state;

        const {title, widgets} = dashboardDetail;

        const columns = widgetList.filter(e => !widgets.some(el => el.widget_id === e.id));

        return (
            <>
                <div className="dashboard-container">
                    <h3 className="col-12">{title}</h3>
                    <div className="filter col-12">
                        <div className="card">
                            <div className="card-body row">
                                <div className="col-12 col-md-6">
                                    <FilterText
                                        label="Filter"
                                        placeholder="status = 200 AND url LIKE '%product%'"
                                        onBlur={(e) => this.isFilterChange(e.target)}
                                    />
                                </div>
                                <div className="input-search col-12 col-md-4 mt-2 mt-md-0">
                                    <FilterDate
                                        label="Date Range"
                                        onDateRangeChanged={() => console.log('1')}
                                    />
                                </div>
                                <div className="col-12 col-md-2 btn-action-group mt-4">
                                    <Button className="btn-search mt-0 mt-md-2 w-100">
                                        <Icon name="sync" className="mr-2"/>
                                        Refresh
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isLoading ? <p>Waiting</p> : <div key={dashboardDetail.widgets}>
                        <div className="col-12">
                            <div className="d-flex flex-row justify-content-end">
                                {isClickedAddNew ? (
                                    <>
                                        <FormField
                                            className="mb-0 mr-2 w-100"
                                            isHiddenLabel={true}
                                            value={widgetSelected}
                                            fieldName='widgetSelected'
                                            onChange={(e) => this.onSaveChange(e.target.value)}
                                            type='select'
                                        >
                                            <>
                                                <option value='' className='d-none'>
                                                    {`Select widget for add new `}
                                                </option>
                                                {columns.map((item, index) => (
                                                    <option value={item.id} key={index}>
                                                        {item.title}
                                                    </option>))}
                                            </>
                                        </FormField>
                                        <Button className="btn-search"
                                                data-toggle="modal"
                                                data-target="#addWidgetModal"
                                                onClick={() => {
                                                    this.setState({
                                                        isClickedAddNew: false,
                                                    })
                                                }}
                                        >
                                            Cancel
                                        </Button>
                                    </>) : (<Button className="btn-search"
                                                    data-toggle="modal"
                                                    data-target="#addWidgetModal"
                                                    onClick={() => {
                                                        this.setState({
                                                            isClickedAddNew: true,
                                                        })
                                                    }}
                                >
                                    <Icon name="plus" className="mr-2"/>
                                    Add widget
                                </Button>)}
                            </div>
                        </div>
                        <ResponsiveGridLayout
                            dashboardDetail={dashboardDetail}
                            isResizable={true}
                            isDraggable={true}
                            removeWidget={(id) => this.removeWidget(id)}
                        />
                    </div>}
                </div>
            </>

        );
    }
}

ReactDOM.render(<DashboardPage/>, document.querySelector('#root'));
