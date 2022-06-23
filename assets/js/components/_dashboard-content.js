import React, { useEffect, useState } from "react";
import { generateRandomColor, WIDGET_TYPE, TOAST_STATUS } from "../utils";
import EmptyWidgetImage from "../../images/empty-widget.png";
import { Button, Colors, Icon, Image, ResponsiveGridLayout, Spinner, Toast } from ".";
import { DashboardActions, LogTableActions } from "../actions";

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

export const DashboardContent = ({ dashboardDetail, onAddWidgetClick, onWidgetListChange }) => {
    const [widgets, setWidgets] = useState([]);
    const [toastContent, setToastContent] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (dashboardDetail) {
            loadData();
        }
    }, [dashboardDetail]);

    const loadData = async () => {
        setIsLoading(true);
        const { widgets = [], uuid, configs = {} } = dashboardDetail;

        const widgetList = await getWidgetDetail(widgets, configs, uuid);

        setWidgets(widgetList.map((item) => item));
        setIsLoading(false);
    };

    useEffect(() => {
        onWidgetListChange(widgets);
    }, [widgets])

    const getWidgetDetail = async (widgets, configs, uuid, query) => {
        let data = [];
        if (widgets && widgets.length > 0) {
            const rawWidget = widgets.map((item) =>
                LogTableActions.getWidget(uuid, item.widget_id, query)
            );
            const widgetRes = await Promise.all(rawWidget);

            data =
                widgetRes &&
                widgetRes.length > 0 &&
                widgetRes.reduce((arr, item, index) => {
                    const { error, data } = item;
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
                }).then((res) => {
                    const { error } = res;
                    if (error) {
                        this.setState({});
                    } else {
                        //Alert.success('Change position success');
                    }
                });
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

        const { filters, tables, dashboardDetail } = this.state;

        const widgets = [...dashboardDetail.widgets].map((item) => ({
            ...item,
            duration: 0,
        }));

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
            this.setState(
                {
                    tables: [...tableList],
                    filters: [...filterList],
                    dashboardDetail: {
                        ...dashboardDetail,
                        widgets,
                    },
                },
                () => {
                    this.setDataCookies(filters);
                    $("#collapseAdvanceSearch").addClass("show");
                    this.applyFilter();
                }
            );
        }
    };

    return (
        <div className="dashboard-content mt-3">
            <Toast toastContent={toastContent} onToastClosed={() => setToastContent()} />
            {!isLoading ? (
                <>
                    {widgets && widgets.length > 0 ? (
                        <ResponsiveGridLayout
                            layouts={widgets}
                            isResizable={!isUser()}
                            isDraggable={!isUser()}
                            removeWidget={(id) => removeWidget(id)}
                            stickWidget={stickWidget}
                            editWidget={(id) => {
                                window.location.href = "/setting?tab=widgets&widgetId=" + id;
                            }}
                            onLayoutChange={onLayoutChange}
                            onWidgetClicked={onWidgetClicked}
                        />
                    ) : (
                        <EmptyWidgetContent onAddWidgetClick={onAddWidgetClick} />
                    )}
                </>
            ) : (
                <Spinner />
            )}
        </div>
    );
};
