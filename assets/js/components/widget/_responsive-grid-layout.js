import React, { Component, createRef, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Chart, WidgetHeader, WidgetDataTable, CounterSum } from "../index";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "../../../styles/component/_responsive-grid-layout.scss";
import { WIDGET_TYPE } from "../../utils";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export function ResponsiveGridLayout(props) {
    const {
        isResizable = true,
        layouts,
        isDraggable = true,
        onLayoutChange,
        onDragStop,
        onResizeStop,
        removeWidget,
        editWidget,
        stickWidget,
        onWidgetClicked,
        ...rest
    } = props;

    const [mounted, setMounted] = useState(false);
    const [compactType, setCompactType] = useState("horizontal");
    const [isLoading, setIsLoading] = useState();
    const [currentBreakpoint, setCurrentBreakpoint] = useState();
    const [chartDuration, setChartDuration] = useState(1000);

    useEffect(() => {
        setMounted(true);

        setTimeout(() => {
            setChartDuration(0);
        }, 1000);
    }, []);

    return (
        <>
            {isLoading ? (
                <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                />
            ) : (
                <div className="responsive-grid-layout" {...rest}>
                    {layouts && layouts.length > 0 && (
                        <ResponsiveReactGridLayout
                            {...props}
                            rowHeight={155}
                            cols={{ lg: 12, md: 9, sm: 6, xs: 3, xxs: 3 }}
                            layouts={{ lg: [...layouts] }}
                            onLayoutChange={(e) => onLayoutChange(e)}
                            onBreakpointChange={(currentBreakpoint) =>
                                setCurrentBreakpoint(currentBreakpoint)
                            }
                            // onDrop={onDrop}
                            // WidthProvider option
                            measureBeforeMount={false}
                            // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
                            // and set `measureBeforeMount={true}`.
                            useCSSTransforms={mounted}
                            compactType={compactType}
                            preventCollision={!compactType}
                            isDraggable={isDraggable}
                            isResizable={isResizable}
                            droppingItem={{ i: "xx", h: 50, w: 250 }}
                        >
                            {layouts.map((item, index) => {
                                let WidgetLayout = ({
                                    i,
                                    data,
                                    type,
                                    column,
                                    color,
                                    onLabelClicked,
                                    table,
                                }) => {
                                    let component;
                                    if (i && data) {
                                        switch (type) {
                                            case WIDGET_TYPE.doughnut:
                                            case WIDGET_TYPE.pie:
                                            case WIDGET_TYPE.bar:
                                            case WIDGET_TYPE.line: {
                                                component = (
                                                    <Chart
                                                        color={color}
                                                        id={i}
                                                        type={type}
                                                        data={data}
                                                        duration={chartDuration}
                                                        onLabelClicked={(value) => {
                                                            onLabelClicked(value, column, table);
                                                        }}
                                                    />
                                                );
                                                break;
                                            }
                                            case WIDGET_TYPE.counterSum: {
                                                component = <CounterSum data={data} />;
                                                break;
                                            }
                                            case WIDGET_TYPE.table: {
                                                let columnData = column ? column.split(",") : [];
                                                columnData = [...columnData, "value"];
                                                component = (
                                                    <WidgetDataTable
                                                        data={data}
                                                        column={columnData}
                                                        isDashboardComponent={true}
                                                        onLabelClicked={(value, tableColumn) => {
                                                            onLabelClicked(
                                                                value,
                                                                tableColumn,
                                                                table
                                                            );
                                                        }}
                                                    />
                                                );
                                                break;
                                            }
                                        }
                                    } else {
                                        component = <p className="m-5 text-center"> No data </p>;
                                    }
                                    return component;
                                };
                                return (
                                    <div key={item.i} data-grid={item} className="widget card">
                                        <WidgetHeader
                                            header={item.title}
                                            isFixed={item.static}
                                            removeWidget={() => removeWidget(item.widget_id)}
                                            editWidget={() => editWidget(item.widget_id)}
                                            stickWidget={(isFixed) =>
                                                stickWidget(item.widget_id, isFixed, index)
                                            }
                                        />
                                        <WidgetLayout
                                            {...item}
                                            mounted={mounted}
                                            onLabelClicked={(value, column, table) => {
                                                if (value && column && table)
                                                    onWidgetClicked(value, column, table);
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </ResponsiveReactGridLayout>
                    )}
                </div>
            )}{" "}
        </>
    );
}

ResponsiveGridLayout.propTypes = {
    layouts: PropTypes.array,
    isResizable: PropTypes.bool,
    isDraggable: PropTypes.bool,
    removeWidget: PropTypes.func,
    editWidget: PropTypes.func,
    stickWidget: PropTypes.func,
    onLayoutChange: PropTypes.func,
    onWidgetClicked: PropTypes.func,
};
