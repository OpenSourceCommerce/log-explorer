import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import LogTableActions from "../../actions/_log-table-actions";
import {FilterDate, FilterText, ResponsiveGridLayout, Select2} from "../../components";
import {Button} from "../../components/_button";
import {Icon} from "../../components/_icon";
import {DatabaseActions, WidgetActions} from "../../actions";
import DashboardActions from "../../actions/_dashboard-actions";
import {WIDGET_TYPE} from "../../utils";
import {FormField} from "../../components/_form-field";

export class DashboardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dashboardDetail: {},
            widgetList: [],
            tables: [],
            filters: [{
                id: 0,
                query: '',
                table: ''
            }],
            widgetSelected: null,
            isLoading: false,
        };
    }

    async componentDidMount() {
        if (window.uuid) {
            this.setState({
                isLoading: true,
            })

            const tableRes = await DatabaseActions.getAllTable();

            let tables = tableRes && tableRes.data && tableRes.data.length > 0 ? tableRes.data.map(item => ({
                value: item,
                label: item,
                isSelected: false,
            })) : [];

            this.setState({
                tables,
            })

            await this.loadingData();
        }
    }

    loadingData = async () => {
        this.setState({
            isLoading: true,
        })

        const uuid = window.uuid;

        const [dashboardRes, widgetListRes] = await Promise.all([
            LogTableActions.getDashboard(uuid),
            WidgetActions.listWidget(),
        ]);

        const widgetList = widgetListRes && widgetListRes.data && widgetListRes.data.length > 0 ? widgetListRes.data : [];

        let dashboardDetail = {};

        if (dashboardRes && !dashboardRes.error) {

            const {widgets, data, configs} = dashboardRes;

            const widgetList = await this.getWidgetDetail(widgets, configs, uuid);

            dashboardDetail = {
                ...data,
                configs: configs && configs.size ? {...configs} : {},
                widgets: [...widgetList],
            } || {};
        }

        this.setState({
            dashboardDetail,
            widgetList,
            isLoading: false,
        });
    }

    onSaveChange = async (widgetId) => {
        if (widgetId === 'createNewOne') {
            window.location.href = '/widget/create';
            return;
        }
        this.setState({
            isLoading: true,
        })

        const {dashboardDetail, widgetList} = this.state;
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

    removeWidget = async (id) => {
        this.setState({
            isLoading: true,
        })
        const {dashboardDetail} = this.state;
        const removeWidgetRes = await DashboardActions.removeWidget(dashboardDetail.id, id);

        if (removeWidgetRes && !removeWidgetRes.error) {
            await this.loadingData();
        }
    }

    applyFilter = async () => {
        const { filters, dashboardDetail } = this.state;
        const {uuid} = dashboardDetail;
        let widgets = [...dashboardDetail.widgets];
        const rawWidget = widgets.map((item) => {
            if (filters.length === 1 && !filters[0].table && !filters[0].query) {
                return LogTableActions.getWidget(uuid, item.widget_id);
            } else {
                const tableSelected = filters.find(el => el.table === item.table);
                if (tableSelected && tableSelected.query) {
                    return LogTableActions.getWidget(uuid, item.widget_id, tableSelected.query);
                }
            }
        });
        const filterRes = await Promise.all(rawWidget);

        if (filterRes && filterRes.length > 0) {
            filterRes.forEach((item, index) => {
                if (item && !item.error) {
                    widgets[index].data = item.data;
                    widgets[index].duration = 1000;
                }
            })
        }
        this.setState({
            widgets,
        })
    }

    getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


    getWidgetDetail = async (widgets, configs, uuid, query) => {
        let data = [];
        if (widgets && widgets.length > 0) {
            const rawWidget = widgets.map((item) => LogTableActions.getWidget(uuid, item.widget_id, query));
            const widgetRes = await Promise.all(rawWidget);

            data = widgetRes && widgetRes.length > 0 && widgetRes.reduce((arr, item, index) => {
                const {error, data} = item;
                const {id, x, y, width, height, fixed, title, type, widget_id, color} = widgets[index];
                const {minWidth, minHeight} = configs.size[type];

                if (!error) {
                    arr.push({
                        ...widgets[index],
                        data,
                        i: id.toString(),
                        x,
                        y,
                        w: width,
                        h: height,
                        minW: minWidth,
                        minH: minHeight,
                        static: !!fixed,
                        title,
                        widget_id,
                        type: type.toString(),
                        color: color && color.length > 0 ? color : data.reduce((arr) => {
                            const colorCode = this.getRandomColor();
                            if(!arr.includes(colorCode)) {
                                arr.push(colorCode);
                            }
                            return arr;
                        }, []),
                        duration: 1000,
                    });
                }
                return arr;
            }, []);
        }
        return data;
    }

    onChangeFilter = async () => {
        this.setState({
            isLoading: true,
        })

        const {dashboardDetail} = this.state;
        const {widgets, configs, uuid} = dashboardDetail;
        const widgetList = await this.getWidgetDetail(widgets, configs, uuid);

        this.setState({
            dashboardDetail: {
                ...dashboardDetail,
                widgets: [...widgetList],
            },
            isLoading: false,
        })
    }

    onQueryTableChange = ({name, value}, index) => {
        this.setState((preState) => {
            // in one table user only put one
            const tables = [...preState.tables];
            const filters = [...preState.filters];
            const widgets = [...preState.dashboardDetail.widgets].map(item => ({ ...item, duration: 0}));

            filters[index][name] = value;

            if (name === 'table') {
                const indexTableSelected = tables.findIndex(item => item.value === value);
                tables[indexTableSelected].isSelected = !tables[indexTableSelected].isSelected;
            }

            return {
                filters,
                tables,
                dashboardDetail: {
                    ...preState.dashboardDetail,
                    widgets,
                },
            }

        });
    }

    onRemoveFilter = (id, table) => {
        this.setState((preState) => {
            const tables = [...preState.tables];
            if (table) {
                const index = tables.findIndex(item => item.value === table);
                tables[index].isSelected = false;
            }
            let filters = [...preState.filters].filter((el) => id !== el.id);
            if (filters.length === 0) {
                filters.push({
                    id: 0
                })
            }
            filters.map((item, index) => ({...item, id:index}));
            return {
                filters,
                tables,
                dashboardDetail: {
                    ...preState.dashboardDetail,
                    widgets: [...preState.dashboardDetail.widgets].map(item => ({ ...item, duration: 0})),
                }
            }
        }, () => console.log(this.state));
    }

    stickWidget = async (widgetId, fixed, index) => {
        this.setState({
            isLoading: true,
        })
        const {dashboardDetail} = this.state;
        const widgets = [...dashboardDetail.widgets];
        const {x, y, w, h} = widgets[index];
        if (widgetId) {
            const stickWidgetRes = await DashboardActions.updateWidget(dashboardDetail.id, widgetId, {
                fixed: fixed === true ? 1 : 0,
                x,
                y,
                width: w,
                height: h
            });

            if (!stickWidgetRes.error) {
                widgets[index].static = fixed;
                this.setState({
                    dashboardDetail: {
                        ...dashboardDetail,
                        widgets: widgets.map(item => ({ ...item, duration: 1000 })),
                    },
                    isLoading: false,
                });
            }
        }
    }

    onLayoutChange = async (e, currentBreakpoint) => {
        if (currentBreakpoint === 'lg' || currentBreakpoint === 'md') {
            const {dashboardDetail} = this.state;
            const {widgets, id} = dashboardDetail;
            const keyForCheck = ['x', 'y', 'w', 'h'];
            const newWidgetPosition = [...widgets].map((item) => {
                const {widget_id} = item;
                let isChangePosition = false;
                const widget = e.find(el => el.i === item.i);
                Object.keys(item).forEach((key) => {
                    if (keyForCheck.includes(key) && item[key] !== widget[key]) {
                        isChangePosition = true;
                        return;
                    }
                })
                if (isChangePosition) {
                    const {x, y, w, h} = widget;
                    DashboardActions.updateWidget(id, widget_id, {
                        x,
                        y,
                        width: w,
                        height: h,
                    }).then(res => {
                        const {error} = res;
                        if (error) {
                            this.setState({})
                        } else {
                            //Alert.success('Change position success');
                        }
                    });
                }
                return {
                    ...item,
                    ...widget,
                }
            });
            this.setState({
                dashboardDetail: {
                    ...dashboardDetail,
                    widgets: [...newWidgetPosition].map(item => ({ ...item, duration: 0}))
                }
            })
        }
    }

    render() {
        const {
            isLoading,
            dashboardDetail,
            widgetList,
            widgetSelected,
            tables,
            filters,
        } = this.state;

        const {title, widgets} = dashboardDetail;

        const columns = widgetList.filter(e => !widgets.some(el => el.widget_id === e.id));

        return (
            <>
                <div className="dashboard-container">
                    <h3 className="col-12">{title}</h3>
                    <div className="filter col-12">
                        <div className="card">
                            <div className="card-body pb-0">
                                <div className="col-12">
                                    <div className="d-flex justify-content-between flex-row flex-wrap">
                                        <div className="col-md-auto col-12"
                                            style={{minWidth: '300px'}}>
                                            <FormField
                                                isHiddenLabel={true}
                                                value={widgetSelected || ''}
                                                fieldName='widgetSelected'
                                                onChange={(e) => this.onSaveChange(e.target.value)}
                                                type='select'
                                            >
                                                <>
                                                    <option value='' className='d-none'>
                                                        Add widget
                                                    </option>
                                                    {columns.length === 0 && <option value='createNewOne'>
                                                        {'Create new one'}
                                                    </option>}
                                                    {columns.map((item, index) => (
                                                        <option value={item.id} key={index}>
                                                            {item.title}
                                                        </option>))}
                                                </>
                                            </FormField>
                                        </div>
                                        <div className="col-md-auto col-12"
                                            style={{minWidth: '300px'}}>
                                            <FilterDate
                                                onDateRangeChanged={() => this.onChangeFilter()}
                                            />
                                        </div>
                                        <div className="d-flex ml-auto mt-2 mt-md-0 mb-2 mb-md-0" style={{paddingRight: '7.5px'}}>
                                            <div className="mr-2">
                                                <Button className="btn-search"
                                                        disabled={isLoading}
                                                        onClick={() => this.onChangeFilter()}
                                                >
                                                    <Icon name="sync"/>
                                                </Button>
                                            </div>
                                            <div>
                                                <Button className="btn-search"
                                                        data-toggle="collapse"
                                                        href="#collapseAdvanceSearch"
                                                        aria-expanded="false"
                                                        aria-controls="collapseAdvanceSearch"
                                                >
                                                    <Icon name="filter" className="mr-2"/>
                                                    Filters
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="collapse col-12"
                                     id="collapseAdvanceSearch"
                                >
                                    <div className="advanced-search"
                                         key={filters}>
                                        {filters.map((item, index) => {
                                            const { id, query, table } = item;
                                            return (<div className="row ml-0 mt-2" key={query || table}>
                                                <div className="col-12 col-md-9 d-flex pl-0 mb-2 mb-md-0">
                                                    <Button className="bg-transparent border-0 btn btn-light"
                                                            onClick={() => this.onRemoveFilter(id, table)}
                                                    >
                                                        <Icon name="times" className="align-self-center mr-3"/>
                                                    </Button>
                                                    <FilterText
                                                        className="mb-0"
                                                        placeholder="status = 200 AND url LIKE '%product%'"
                                                        value={query}
                                                        onBlur={(e) => this.onQueryTableChange(e.target, index)}
                                                    />
                                                </div>
                                                <FormField
                                                    className="col-12 col-md-3 mb-0 mb-2 mb-md-0"
                                                    value={table}
                                                    fieldName='table'
                                                    isHiddenLabel={true}
                                                    onChange={(e) => this.onQueryTableChange(e.target, index)}
                                                    type='select'
                                                >
                                                    <>
                                                        <option value='' className='d-none'>Select datatable
                                                        </option>
                                                        {tables.map((item, index) => (
                                                            <option value={item.value}
                                                                    key={index}
                                                                    className={item.isSelected ? 'd-none' : ''}
                                                            >
                                                                {item.label}
                                                            </option>))}
                                                    </>
                                                </FormField>
                                            </div>);
                                        })}
                                    </div>
                                    <div className="d-flex justify-content-end mb-2">
                                        {tables.length > filters.length && <div className="col-6 col-md-1 btn-action-group">
                                            <Button className="btn-search mt-0 mt-md-2 w-100" onClick={() => this.setState({
                                                filters: [ ...filters, {
                                                    id: filters.length,
                                                }],
                                                widgets: [...widgets].map(item => ({ ...item, duration: 0 }))
                                            })}>
                                                <Icon name="plus-circle"/>
                                            </Button>
                                        </div>}
                                        <div className="col-6 col-md-1 btn-action-group pr-0">
                                            <Button className="btn-search mt-0 mt-md-2 w-100"
                                                    disabled={isLoading}
                                                    onClick={() => this.applyFilter()}
                                            >
                                                Apply
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isLoading ? <span
                        className="spinner-border spinner-border-sm"
                        role="status" aria-hidden="true"/> :
                        <div key={widgets}>
                            <ResponsiveGridLayout
                                layouts={widgets}
                                isResizable={true}
                                isDraggable={true}
                                removeWidget={(id) => this.removeWidget(id)}
                                stickWidget={this.stickWidget}
                                editWidget={(id) => {
                                    window.location.href = '/widget/' + id;
                                }}
                                onLayoutChange={this.onLayoutChange}
                            />
                    </div>}
                </div>
            </>

        );
    }
}

ReactDOM.render(<DashboardPage/>, document.querySelector('#root'));
