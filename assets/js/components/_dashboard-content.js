import React, { useEffect, useState, useRef } from "react";
import {
    generateRandomColor,
    WIDGET_TYPE,
    TOAST_STATUS,
    DATE_RANGE,
    getDataFromCookies,
    setDataToCookies,
} from "../utils";
import EmptyWidgetImage from "../../images/empty-widget.png";
import {
    Button,
    Colors,
    FilterDate,
    FilterText,
    FormField,
    Icon,
    Image,
    ResponsiveGridLayout,
    Spinner,
    Toast,
} from ".";
import { DashboardActions, LogTableActions, WidgetActions } from "../actions";
import { WidgetDetailModal } from "./widget/_widget-detail";
const DATE_RANGE_DEFAULT = {
    from: DATE_RANGE[0].from,
    to: DATE_RANGE[0].to,
    label: DATE_RANGE[0].label,
};

const FILTERS_DEFAULT = [
    {
        id: 0,
        query: "",
        table: "",
    },
];

const getFilterDataFromCookies = (filters = null, dateRange = null) => {
    const cData = getDataFromCookies(window.uuid) ? getDataFromCookies(window.uuid).split("|") : "";

    let filterCookie = filters;
    let dateRangeCookie = dateRange;

    if (cData) {
        filterCookie = filterCookie || JSON.parse(decodeURIComponent(cData[1]));
        dateRangeCookie = dateRange || JSON.parse(cData[0]);
    }

    return { filterCookie, dateRangeCookie };
};

const setDataCookies = (filters, dateRange) => {
    const { filterCookie, dateRangeCookie } = getFilterDataFromCookies(filters, dateRange);
    const filter = JSON.stringify(filterCookie.map(({ query, table }) => ({ query, table })));
    setDataToCookies(
        window.uuid,
        `${JSON.stringify(dateRangeCookie)}|${encodeURIComponent(filter)}`,
        30
    );
};

const EmptyWidgetContent = ({ onAddWidgetClick }) => {
    return (
        <div className="dashboard-empty-widget d-flex flex-column justify-content-center align-items-center">
            <Image src={EmptyWidgetImage} className="empty-widget-icon" />
            <div className="sub-title fs-4 fw-bold mt-2">Pretty empty here</div>
            <div className="sub-title fs-4 mt-1 mb-2">Let’s add your first widget</div>
            <Button className="fs-6" outlineColor={Colors.blue} onClick={onAddWidgetClick}>
                <Icon dataFeather="plus" className="stroke-width-4 feather-sm" />
                <span className="align-middle ms-1 fw-bold">Add widget</span>
            </Button>
        </div>
    );
};

const ModalEditWidget = ({
    widgetIdSelectedForEdit: widgetId = "",
    onSubmitWidgetSuccess,
    ...props
}) => {
    const DEFAULT_WIDGET = {
        id: widgetId,
        title: "",
        type: 4,
        table: "",
        column: "",
        query: "",
        order_desc: true,
        size: 10,
    };

    const ORDER_FIELD_VALUE = {
        asc: "asc",
        desc: "desc",
    };

    const [widgetDetail, setWidgetDetail] = useState({ ...DEFAULT_WIDGET });
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        if (widgetId) {
            loadWidgetDetail();
        }
    }, [widgetId]);

    const loadWidgetDetail = async () => {
        const [loadWidgetRes, queriesRes] = await Promise.all([
            WidgetActions.loadWidget(widgetId),
            WidgetActions.getQueries(),
        ]);
        if (loadWidgetRes && !loadWidgetRes.error) {
            const widget = { ...loadWidgetRes.data };
            if (widget.hasOwnProperty("order_desc")) {
                widget.order = widget.order_desc ? ORDER_FIELD_VALUE.desc : ORDER_FIELD_VALUE.asc;
            }
            setWidgetDetail({ ...widget });
        }

        const queries =
            queriesRes && queriesRes.data && queriesRes.data.length > 0 ? queriesRes.data : [];

        setQueries(queries);
    };

    return (
        <WidgetDetailModal
            onSubmitDataSuccess={onSubmitWidgetSuccess}
            widget={widgetDetail}
            isShow={!!widgetId}
            queries={queries}
            {...props}
        />
    );
};

export const DashboardContent = ({
    dashboardDetail,
    onAddWidgetClick,
    onWidgetListChange,
    onWidgetUpdateSuccess,
}) => {
    const [widgets, setWidgets] = useState([]);
    const [toastContent, setToastContent] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState(FILTERS_DEFAULT);
    const [dateRange, setDateRange] = useState();
    const [tables, setTableList] = useState([]);
    const [isLoadingWidgetData, setIsLoadingWidgetData] = useState(true);
    const [widgetIdSelectedForEdit, setWidgetIdSelectedForEdit] = useState();
    const filterDateRef = useRef(false);

    useEffect(() => {
        const tables =
            widgets && widgets.length > 0
                ? widgets.reduce((result, item, index) => {
                      if (item.table != "") {
                          if (result.length === 0 || !result.find((e) => e.value === item.table)) {
                              let isSelected = false;
                              if (
                                  filters &&
                                  filters.length === 1 &&
                                  !filters[0].table &&
                                  index === 0
                              ) {
                                  isSelected = true;
                                  setFilters([
                                      {
                                          ...filters[0],
                                          table: item.table,
                                      },
                                  ]);
                              } else if (filters && filters.length > 0) {
                                  isSelected = !!filters.find((el) => el.table === item.table);
                              }
                              result = [
                                  ...result,
                                  {
                                      value: item.table,
                                      label: item.table,
                                      isSelected,
                                  },
                              ];
                          }
                      }
                      return result;
                  }, [])
                : [];
        setTableList(tables);
    }, [widgets]);

    useEffect(() => {
        loadFilter();
    }, []);

    const loadFilter = async () => {
        setIsLoading(true);
        let dateRange = { ...DATE_RANGE_DEFAULT };
        let filters = [...FILTERS_DEFAULT];

        const { filterCookie, dateRangeCookie } = getFilterDataFromCookies();

        if (filterCookie && dateRangeCookie) {
            const dateRangeLabel = dateRangeCookie.label || "";
            if (dateRangeLabel !== "Custom Range") {
                const dateRangeValue = DATE_RANGE.find((item) => item.label === dateRangeLabel);
                if (dateRangeValue) {
                    dateRange = { ...dateRangeValue };
                }
            } else {
                dateRange.label = dateRangeCookie.label;
                dateRange.from = moment.unix(dateRangeCookie.from);
                dateRange.to = moment.unix(dateRangeCookie.to);
            }
            filters =
                filterCookie && filterCookie.length > 0
                    ? filterCookie.map((item, index) => ({
                          ...item,
                          id: index,
                      }))
                    : filters;
        } else {
            setDataCookies(filters, { label: dateRange.label });
        }

        setDateRange(dateRange);
        setFilters(filters);
        setIsLoading(false);
    };

    const applyFilter = async () => {
        setIsLoadingWidgetData(true);
        const { uuid } = dashboardDetail;
        let newWidgetList = [...widgets];
        const rawWidget = newWidgetList.map((item) => {
            if (filters.length === 1 && !filters[0].query) {
                return LogTableActions.getWidget(uuid, item.widget_id);
            } else {
                const tableSelected = filters.find((el) => el.table === item.table);
                if (tableSelected && tableSelected.query) {
                    return LogTableActions.getWidget(uuid, item.widget_id, tableSelected.query);
                }
            }
        });
        const filterRes = await Promise.all(rawWidget);

        if (filterRes && filterRes.length > 0) {
            filterRes.forEach((item, index) => {
                if (item && !item.error) {
                    newWidgetList[index].data = item.data;
                }
            });
        }
        setWidgets([...newWidgetList]);
        setIsLoadingWidgetData(false);
    };

    const onQueryTableChange = ({ name, value }, index) => {
        let newFilter = [...filters];
        newFilter[index][name] = value;

        if (name === "table") {
            let newTables = [...tables];
            newTables = newTables.map((item) => {
                const filter = filters.find((el) => el.table === item.value);
                return {
                    ...item,
                    isSelected: !!filter,
                };
            });
            setTableList(newTables);
        }

        setDataCookies(newFilter);

        setFilters(newFilter);
    };

    const onAddNewFilterOnClick = () => {
        const table = tables.filter((item) => !item.isSelected)[0].value;
        const index = tables.findIndex((item) => item.value === table);
        const newTables = [...tables];
        newTables[index].isSelected = true;

        setFilters([
            ...filters,
            {
                id: filters.length,
                table,
            },
        ]);
        setTableList([...newTables]);
    };

    const onRemoveFilter = (id, table) => {
        let newTables = [...tables];
        if (table) {
            const index = tables.findIndex((item) => item.value === table);
            newTables[index].isSelected = false;
        }
        let newFilters = [...filters].filter((el) => id !== el.id);
        if (newFilters.length === 0) {
            newFilters.push({
                id: 0,
                query: "",
                table: tables[0].value,
            });
            newTables[0].isSelected = true;
        } else {
            newFilters.map((item, index) => ({ ...item, id: index }));
        }
        setDataCookies(newFilters);
        setFilters([...newFilters]);
        setTableList([...tables]);
    };

    const loadData = async () => {
        if (dashboardDetail) {
            setIsLoadingWidgetData(true);
            const { widgets = [], uuid, configs = {} } = dashboardDetail;

            const widgetList = await getWidgetDetail(widgets, configs, uuid);

            setWidgets(widgetList.map((item) => item));
            setIsLoadingWidgetData(false);
        }
    };

    useEffect(() => {
        onWidgetListChange(widgets);
    }, [widgets]);

    const getWidgetDetail = async (widgets, configs, uuid) => {
        let data = [];

        if (widgets && widgets.length > 0) {
            const rawWidget = widgets.map((item) => {
                if (filters.length === 1 && !filters[0].query) {
                    return LogTableActions.getWidget(uuid, item.widget_id);
                } else {
                    const tableSelected = filters.find((el) => el.table === item.table);
                    if (tableSelected && tableSelected.query) {
                        return LogTableActions.getWidget(uuid, item.widget_id, tableSelected.query);
                    }
                }
            });
            const widgetRes = await Promise.all(rawWidget);

            data =
                widgetRes &&
                widgetRes.length > 0 &&
                widgetRes.reduce((arr, item, index) => {
                    const data = item?.data;
                    const {
                        id,
                        x,
                        y,
                        width,
                        height,
                        fixed,
                        title,
                        type,
                        widget_id,
                        color,
                        w,
                        h,
                    } = widgets[index];
                    const { minWidth, minHeight } = configs.size[type];

                    let colorForChart;
                    if (data && data.length > 0) {
                        if (color && color.length > 0 && color.length === data.length) {
                            colorForChart = color;
                        } else if (
                            [
                                WIDGET_TYPE.doughnut,
                                WIDGET_TYPE.pie,
                                WIDGET_TYPE.bar,
                                WIDGET_TYPE.line,
                            ].includes(type)
                        ) {
                            colorForChart = data.reduce((arrColor, _) => {
                                const colorCode = generateRandomColor();
                                if (arrColor.includes(colorCode)) {
                                    colorCode = generateRandomColor();
                                }
                                arrColor.push(colorCode);
                                return arrColor;
                            }, []);
                        }
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
                        type: type,
                        color: colorForChart,
                        duration: 1000,
                    });
                    return arr;
                }, []);
        }
        return data;
    };

    const removeWidget = async (id) => {
        const removeWidgetRes = await DashboardActions.removeWidget(dashboardDetail.id, id);
        let toastContent = {};
        if (removeWidgetRes && !removeWidgetRes.error) {
            setWidgets(widgets.filter((item) => item.widget_id !== id));
            toastContent = {
                color: TOAST_STATUS.success,
                message: "Remove widget successful.",
            };
        } else {
            toastContent = {
                color: TOAST_STATUS.failed,
                message: removeWidgetRes.message,
            };
        }
        setToastContent(toastContent);
    };

    const stickWidget = async (widgetId, fixed, index) => {
        setIsLoading(true);
        const widgetList = [...widgets];
        const { x, y, w, h } = widgetList[index];
        if (widgetId) {
            const stickWidgetRes = await DashboardActions.updateWidget(
                dashboardDetail.id,
                widgetId,
                {
                    fixed: fixed === true ? 1 : null,
                    x,
                    y,
                    width: w,
                    height: h,
                }
            );

            if (!stickWidgetRes.error) {
                widgetList[index].static = fixed;
                setWidgets(widgetList.map((item) => ({ ...item, duration: 1000 })));
            }
        }
        setIsLoading(false);
    };

    const onLayoutChange = async (e) => {
        const keyForCheck = ["x", "y", "w", "h"];
        const newWidgetPosition = [...widgets].map((item) => {
            const { widget_id } = item;
            let isChangePosition = false;
            const widget = e.find((el) => el.i === item.i);
            Object.keys(item).forEach((key) => {
                if (keyForCheck.includes(key) && item[key] !== widget[key]) {
                    isChangePosition = true;
                    return;
                }
            });
            if (isChangePosition) {
                const { x, y, w, h } = widget;
                DashboardActions.updateWidget(dashboardDetail?.id, widget_id, {
                    x,
                    y,
                    width: w,
                    height: h,
                }).then((res) => {});
            }
            return {
                ...item,
                ...widget,
            };
        });
        setWidgets([...newWidgetPosition].map((item) => ({ ...item, duration: 0 })));
    };

    const onWidgetClicked = (value, column, table) => {
        let queryStr = `${column} = '${value}'`;
        let isQueryChange = false;

        if (/^\d+$/.test(value)) {
            queryStr = `${column} = ${value}`;
        }

        const tableList = tables;
        let filterList = filters;

        const tableIndex = tableList.findIndex((item) => item.value === table);
        tableList[tableIndex].isSelected = true;

        const filterIndex = filters.findIndex((item) => item.table === table);

        if (filterIndex !== -1) {
            if (!filters[filterIndex].query.includes(value)) {
                filterList[filterIndex].query = filterList[filterIndex].query
                    ? `${filterList[filterIndex].query.trim()} AND ${queryStr}`
                    : queryStr;
                isQueryChange = true;
            }
        } else {
            filterList = [
                ...filters,
                {
                    id: filters.length - 1,
                    query: queryStr,
                    table: table,
                },
            ];
            isQueryChange = true;
        }

        if (isQueryChange) {
            setTableList([...tableList]);
            setFilters([...filterList]);
            setDataCookies(filters);
            $("#collapseAdvanceSearch").addClass("show");
            applyFilter();
        }
    };

    const onDateRangeChanged = async (_, _a, dateRange) => {
        setDataCookies(null, dateRange);
        setDateRange(dateRange);
        await loadData();
    };

    useEffect(() => {
        if (filterDateRef.current) {
            loadData();
        }
    }, [filterDateRef.current]);

    return (
        <div className="dashboard-content mt-3">
            {!isLoading ? (
                <>
                    <Toast toastContent={toastContent} onToastClosed={() => setToastContent()} />
                    <div className="dashboard-advance-search">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-end align-self-center flex-wrap">
                                    {dateRange && (
                                        <FilterDate
                                            ref={filterDateRef}
                                            dateRange={dateRange}
                                            onDateRangeChanged={onDateRangeChanged}
                                        />
                                    )}
                                    <Button
                                        id="btn-filters"
                                        className="btn-search ms-2"
                                        data-bs-toggle="collapse"
                                        href="#collapseAdvanceSearch"
                                        aria-expanded="false"
                                        aria-controls="collapseAdvanceSearch"
                                    >
                                        <Icon name="filter" className="mr-2" />
                                        Filters
                                    </Button>
                                </div>
                                <div className="collapse col-12" id="collapseAdvanceSearch">
                                    <div
                                        className="advanced-search bg-white border-0"
                                        key={filters}
                                    >
                                        {filters.map((item, index) => {
                                            const { id, query, table } = item;
                                            return (
                                                <div
                                                    className="row ml-0 mt-2"
                                                    key={`${query}|${table}`}
                                                >
                                                    <div className="col-12 col-md-9 d-flex pl-0 mb-2 mb-md-0">
                                                        <Button
                                                            className="bg-transparent border-0 btn btn-light"
                                                            onClick={() =>
                                                                onRemoveFilter(id, table)
                                                            }
                                                        >
                                                            <Icon
                                                                name="times"
                                                                className="align-self-center mr-3"
                                                            />
                                                        </Button>
                                                        <FilterText
                                                            className="mb-0"
                                                            placeholder="status = 200 AND url LIKE '%product%'"
                                                            value={query}
                                                            onBlur={(e) =>
                                                                onQueryTableChange(e.target, index)
                                                            }
                                                        />
                                                    </div>
                                                    <FormField
                                                        className="col-12 col-md-3 mb-0 mb-2 mb-md-0"
                                                        value={table}
                                                        fieldName="table"
                                                        isHiddenLabel={true}
                                                        onChange={(e) =>
                                                            onQueryTableChange(e.target, index)
                                                        }
                                                        type="select"
                                                    >
                                                        <>
                                                            {tables.map((item, index) => (
                                                                <option
                                                                    value={item.value}
                                                                    key={index}
                                                                    className={
                                                                        item.isSelected
                                                                            ? "d-none"
                                                                            : ""
                                                                    }
                                                                >
                                                                    {item.label}
                                                                </option>
                                                            ))}
                                                        </>
                                                    </FormField>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="d-flex justify-content-end mb-2">
                                        {tables &&
                                            tables.length > 0 &&
                                            tables.length > filters.length && (
                                                <div className="col-6 col-md-1 btn-action-group">
                                                    <Button
                                                        className="btn-search mt-0 mt-md-2 w-100"
                                                        onClick={() => onAddNewFilterOnClick()}
                                                    >
                                                        <Icon name="plus-circle" />
                                                    </Button>
                                                </div>
                                            )}
                                        <div className="btn-action-group pr-0">
                                            <Button
                                                className="btn-search mt-0 mt-md-2 w-100 text-nowrap"
                                                onClick={() => applyFilter()}
                                            >
                                                Apply
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {!isLoadingWidgetData ? (
                        <>
                            {widgets && widgets.length > 0 ? (
                                <>
                                    <ResponsiveGridLayout
                                        layouts={widgets}
                                        isResizable={!isUser()}
                                        isDraggable={!isUser()}
                                        removeWidget={(id) => removeWidget(id)}
                                        stickWidget={stickWidget}
                                        editWidget={(id) => {
                                            setWidgetIdSelectedForEdit(id);
                                        }}
                                        // onLayoutChange={onLayoutChange}
                                        onDragStop={onLayoutChange}
                                        onResizeStop={onLayoutChange}
                                        onWidgetClicked={onWidgetClicked}
                                    />
                                    <ModalEditWidget
                                        widgetIdSelectedForEdit={widgetIdSelectedForEdit}
                                        tables={tables}
                                        onHidden={() => setWidgetIdSelectedForEdit()}
                                        onSubmitWidgetSuccess={() => {
                                            setWidgetIdSelectedForEdit();
                                            onWidgetUpdateSuccess();
                                        }}
                                    />
                                </>
                            ) : (
                                <EmptyWidgetContent onAddWidgetClick={onAddWidgetClick} />
                            )}
                        </>
                    ) : (
                        <Spinner />
                    )}
                </>
            ) : (
                <Spinner />
            )}
        </div>
    );
};
