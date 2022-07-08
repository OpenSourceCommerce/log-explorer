import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import LogTableActions from "../../actions/_log-table-actions";
import {FilterDate, FilterText, ResponsiveGridLayout} from "../../components";
import {Button} from "../../components/_button";
import {Icon} from "../../components/_icon";
import {DatabaseActions, WidgetActions} from "../../actions";
import DashboardActions from "../../actions/_dashboard-actions";
import {DATE_RANGE, getDataFromCookies, setDataToCookies, WIDGET_TYPE} from "../../utils";
import {FormField} from "../../components/_form-field";

export class DashboardPage extends Component {
    constructor(props) {
        super(props);

        let filters = [{
            id: 0,
            query: '',
            table: ''
        }];
        let dateRange = {
            from: DATE_RANGE[0].from,
            to: DATE_RANGE[0].to,
            label: DATE_RANGE[0].label,
        };

        const {filterCookie, dateRangeCookie} = this.getFilterDataFromCookies();
        if (filterCookie && dateRangeCookie) {
            const dateRangeLabel = dateRangeCookie.label || '';
            if (dateRangeLabel !== 'Custom Range') {
                const dateRangeValue = DATE_RANGE.find(item => item.label === dateRangeLabel);
                if (dateRangeValue) {
                    dateRange = {...dateRangeValue};
                }
            } else {
                dateRange.label = dateRangeCookie.label;
                dateRange.from = moment.unix(dateRangeCookie.from);
                dateRange.to = moment.unix(dateRangeCookie.to);
            }
            filters = filterCookie && filterCookie.length > 0? filterCookie.map((item, index) => ({
                ...item,
                id: index
            })) : filters;
        } else {
            this.setDataCookies(filters, {label: dateRange.label});
        }

        this.state = {
            dashboardDetail: {},
            widgetList: [],
            tables: [],
            filters,
            widgetSelected: null,
            isLoading: false,
            dateRange,
        };
    }

    async componentDidMount() {
        await this.loadingData();

        const { filters, tables } = this.state;

        if (tables && tables.length > 0) {
            const newFilters = [...filters];

            if (!newFilters[0].table) {
                newFilters[0].table = tables[0].value;
            }

            this.setDataCookies(newFilters);
        }
    }

    loadingData = async () => {
        this.setState({
            isLoading: true,
        })

        const { filters } = this.state;

        const uuid = window.uuid;

        const [dashboardRes, widgetListRes] = await Promise.all([
            LogTableActions.getDashboard(uuid),
            WidgetActions.listWidget(),
        ]);

        const widgetList = widgetListRes && widgetListRes.data && widgetListRes.data.length > 0 ? widgetListRes.data : [];

        let dashboardDetail = {};

        let tables = [];

        if (dashboardRes && !dashboardRes.error) {

            const {widgets, data, configs} = dashboardRes;

            tables = widgets && widgets.length > 0 ? widgets.reduce((result, item, index) => {
                if (item.table != '') {
                    if (result.length === 0 || !result.find(e => e.value === item.table)) {
                        let isSelected = index === 0;
                        if (filters && filters.length > 0) {
                            isSelected = !!filters.find((el) => el.table === item.table);
                        }
                        result = [
                            ...result,
                            {
                                value: item.table,
                                label: item.table,
                                isSelected,
                            }
                        ]
                    }
                }
                return result;
            }, []) : [];


            const widgetList = await this.getWidgetDetail(widgets, configs, uuid);

            dashboardDetail = {
                ...data,
                configs: configs && configs.size ? {...configs} : {},
                widgets: [...widgetList],
            };
        }

        this.setState({
            dashboardDetail,
            widgetList,
            isLoading: false,
            tables
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
                case WIDGET_TYPE.bar:
                case WIDGET_TYPE.line:
                case WIDGET_TYPE.doughnut:
                case WIDGET_TYPE.pie: {
                    newWidget = {x: 0, y: 0, width: 3, height: 2, fixed: null};
                    break;
                }
                case WIDGET_TYPE.counterSum: {
                    newWidget = {x: 0, y: 0, width: 3, height: 1, fixed: null};
                    break;
                }
                case WIDGET_TYPE.table: {
                    newWidget = {x: 0, y: 0, width: 3, height: 3, fixed: null};
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
        this.setState({isLoading: true})

        const {filters, dashboardDetail, dateRange} = this.state;
        const {uuid} = dashboardDetail;
        let widgets = [...dashboardDetail.widgets];
        const rawWidget = widgets.map((item) => {
            if (filters.length === 1 && !filters[0].query) {
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
                    if (widgets[index].color && widgets[index].color.length !== item.data.length) {
                        widgets[index].color = item.data.map(() => this.getRandomColor());
                    }
                }
            })
        }
        this.setState({
            widgets,
            isLoading: false,
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
                const {id, x, y, width, height, fixed, title, type, widget_id, color, w, h} = widgets[index];
                const {minWidth, minHeight} = configs.size[type];

                let colorForChart;
                if (color && color.length > 0 && color.length === data.length) {
                    colorForChart = color;
                } else if (type.toString() === WIDGET_TYPE.doughnut || type.toString() === WIDGET_TYPE.pie || type.toString() === WIDGET_TYPE.bar || type.toString() === WIDGET_TYPE.line) {
                    colorForChart = data.reduce((arr) => {
                        const colorCode = this.getRandomColor();
                        if(!arr.includes(colorCode)) {
                            arr.push(colorCode);
                        }
                        return arr;
                    }, [])
                }
                arr.push({
                    ...widgets[index],
                    data,
                    i: id.toString(),
                    x,
                    y,
                    w: w || width,
                    h: h || height,
                    minW: minWidth,
                    minH: minHeight,
                    static: !!fixed,
                    title,
                    widget_id,
                    type: type.toString(),
                    color: colorForChart,
                    duration: 1000,
                });
                return arr;
            }, []);
        }
        return data;
    }

    onChangeFilter = async (from, to, dateRange) => {
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
            dateRange,
            isLoading: false,
        }, () => {
            this.setDataCookies(null, dateRange);
        })
    }

    getFilterDataFromCookies = (filters = null, dateRange = null) => {
        const cData = getDataFromCookies(window.uuid) ?
            getDataFromCookies(window.uuid).split('|') : '';

        let filterCookie = filters;
        let dateRangeCookie = dateRange;

        if(cData) {
            filterCookie = filterCookie || JSON.parse(decodeURIComponent(cData[1]))
            dateRangeCookie = dateRange || JSON.parse(cData[0])
        }

        return {filterCookie, dateRangeCookie}
    }

    setDataCookies = (filters, dateRange) => {
        const {filterCookie, dateRangeCookie} = this.getFilterDataFromCookies(filters, dateRange)
        const filter = JSON.stringify(filterCookie.map(({query, table}) => ({query, table})))
        setDataToCookies(window.uuid, `${JSON.stringify(dateRangeCookie)}|${encodeURIComponent(filter)}`, 30);
    }

    onQueryTableChange = ({name, value}, index) => {
        this.setState((preState) => {
            // in one table user only put one
            let tables = [...preState.tables];
            const filters = [...preState.filters];
            const widgets = [...preState.dashboardDetail.widgets].map(item => ({ ...item, duration: 0}));

            filters[index][name] = value;

            if (name === 'table') {
                tables = [...preState.tables].map(item => {
                    const filter = filters.find(el => el.table === item.value);
                    return {
                        ...item,
                        isSelected: !!filter,
                    }
                })
            }

            this.setDataCookies(filters);

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

    onWidgetClicked = (value, column, table) => {
        let queryStr = `${column} = '${value}'`
        let isQueryChange = false

        if (/^\d+$/.test(value)) {
            queryStr = `${column} = ${value}`
        }

        const {filters, tables, dashboardDetail} = this.state

        const widgets = [...dashboardDetail.widgets].map(item => ({
            ...item,
            duration: 0
        }));

        const tableList = tables
        let filterList = filters

        const tableIndex = tableList.findIndex(item => item.value === table)
        tableList[tableIndex].isSelected = true

        const filterIndex = filters.findIndex(item => item.table === table)

        if (filterIndex !== -1) {
            if (!filters[filterIndex].query.includes(value)) {
                filterList[filterIndex].query = filterList[filterIndex].query ? `${filterList[filterIndex].query.trim()} AND ${queryStr}` : queryStr
                isQueryChange = true
            }
        } else {
            filterList = [...filters, {
                id: filters.length - 1,
                query: queryStr,
                table: table
            }]
            isQueryChange = true
        }

        if (isQueryChange) {
            this.setState({
                tables: [...tableList],
                filters: [...filterList],
                dashboardDetail: {
                    ...dashboardDetail,
                    widgets,
                },
            }, () => {
                this.setDataCookies(filters)
                $('#collapseAdvanceSearch').addClass('show')
                this.applyFilter()
            })
        }
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
                    id: 0,
                    query: '',
                    table: tables[0].value,
                });
                tables[0].isSelected = true;
            } else {
                filters.map((item, index) => ({...item, id:index}));
            }

            this.setDataCookies(filters);
            return {
                filters,
                tables,
                dashboardDetail: {
                    ...preState.dashboardDetail,
                    widgets: [...preState.dashboardDetail.widgets].map(item => ({ ...item, duration: 0})),
                }
            }
        });
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
                fixed: fixed === true ? 1 : null,
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
    };

    const onWidgetListChange = (widgets) => {
        if (widgets)
            setWidgetList(
                widgetListOrigin.filter((item) => widgets.every((el) => el.widget_id !== item.id))
            );
    };

    const onAddWidgetClick = () => setVisibleAddWidgetModal(true);

    const onWidgetUpdateSuccess = () => loadData();

    return (
        <>
            {!isLoading ? (
                <div
                    className="dashboard-page ms-cp-4 mt-3 me-cp-3"
                    style={{ marginBottom: "7rem" }}
                >
                    <Toast
                        toastContent={toastContent}
                        onToastClosed={() => setToastContent()}
                        style={{ zIndex: "1060" }}
                    />
                    <DashboardHeader
                        dashboardDetail={dashboardDetail}
                        dashboardList={dashboardList}
                        onCreateNewDashboardClick={() => setIsShowCreateNewDashboard(true)}
                        onDeleteDashboardClick={(dashboard) =>
                            setVisibleConfirmDeleteDashboard(dashboard)
                        }
                        onAddWidgetClick={() => onAddWidgetClick()}
                    />
                    {dashboardDetail && (
                        <DashboardContent
                            dashboardDetail={dashboardDetail}
                            onAddWidgetClick={() => onAddWidgetClick()}
                            onWidgetListChange={onWidgetListChange}
                            onWidgetUpdateSuccess={onWidgetUpdateSuccess}
                        />
                    )}
                    <CreateNewDashboardModal
                        isShow={isShowCreateNewDashboard}
                        onHidden={() => setIsShowCreateNewDashboard(false)}
                    />
                    <ConfirmDeleteDashboard
                        dashboard={visibleConfirmDeleteDashboard}
                        dashboardTitle={visibleConfirmDeleteDashboard?.title}
                        onConfirmDeleteDashboard={() => onConfirmDeleteDashboard()}
                        onHidden={() => setVisibleConfirmDeleteDashboard()}
                    />
                    <WidgetListModal
                        isShow={visibleAddWidgetModal}
                        widgetList={widgetList}
                        onHidden={() => {
                            setVisibleAddWidgetModal(false);
                        }}
                        isSpinnerFullHeight={false}
                        onSelectWidgetForDashboard={(item) => onAddNewWidget(item)}
                        isCreateNewWidgetCallback={() => loadWidgetList(dashboardDetail?.widgets)}
                    />
                </div>
            </>

        );
    }
}

ReactDOM.render(<DashboardPage/>, document.querySelector('#root'));
