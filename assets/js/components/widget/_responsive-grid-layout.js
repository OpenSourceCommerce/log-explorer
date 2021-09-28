import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DoughnutPieChart, WidgetHeader} from "../index";
import {Responsive, WidthProvider} from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../../../styles/component/_responsive-grid-layout.scss';
import {WIDGET_TYPE} from "../../utils";
import {CounterSum} from "./_counter-sum";
import {WidgetTable} from "./_widget-table";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export class  ResponsiveGridLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            compactType: "horizontal",
            mounted: false,
        };
    }

    async componentDidMount() {
        this.setState({
            mounted: true,
        });
    }

    render() {
        const {
            isResizable = true,
            layouts,
            isDraggable = true,
            onLayoutChange,
            removeWidget,
            editWidget,
            stickWidget,
            onWidgetClicked,
            ...rest } = this.props;
        const { mounted,
            compactType,
            isLoading,
        } = this.state;
        // min Width :x 356;
        // row Height : 340 / 2;
        return (
            <>{isLoading ? <span
                className="spinner-border spinner-border-sm mr-2"
                role="status" aria-hidden="true"/> :  <div className="responsive-grid-layout" {...rest}>
                { layouts && layouts.length > 0  && <ResponsiveReactGridLayout
                    {...this.props}
                    rowHeight={155}
                    cols={{lg: 12, md: 9, sm: 6, xs: 3, xxs: 3}}
                    layouts={{lg: [...layouts]}}
                    onLayoutChange={(e) => onLayoutChange(e)}
                    onBreakpointChange={(currentBreakpoint) => this.setState({
                        currentBreakpoint,
                    })}
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
                    droppingItem={{i: "xx", h: 50, w: 250 }}
                >
                    {layouts.map((item, index) => {
                        let WidgetLayout = ({i, data, type, column, color, duration, onLabelClicked, table}) => {
                            let component;
                            if (i && data) {
                                switch (type) {
                                    case WIDGET_TYPE.doughnut:
                                    case WIDGET_TYPE.pie: {
                                        component = <DoughnutPieChart
                                            id={i}
                                            type={type}
                                            data={data}
                                            height='200'
                                            minHeight='200'
                                            color={color}
                                            duration={duration}
                                            onLabelClicked={(value) => onLabelClicked(value, column, table)}
                                        />;
                                        break;
                                    }
                                    case WIDGET_TYPE.counterSum: {
                                        component = <CounterSum
                                            data={data}
                                        />
                                        break;
                                    }
                                    case WIDGET_TYPE.table: {
                                        component = <WidgetTable
                                            column={column}
                                            data={data}
                                            isDashboardComponent={true}
                                            onLabelClicked={(value) => onLabelClicked(value, column, table)}
                                        />
                                    }
                                }
                            } else {
                                component = <p className="m-5 text-center"> No data </p>;
                            }
                            return component;
                        }
                        return (
                            <div key={item.i} data-grid={item} className="widget card">
                                <WidgetHeader header={item.title}
                                              isFixed={item.static}
                                              removeWidget={() => removeWidget(item.widget_id)}
                                              editWidget={() => editWidget(item.widget_id)}
                                              stickWidget={(isFixed) => stickWidget(item.widget_id, isFixed, index)}
                                />
                                <WidgetLayout {...item} onLabelClicked={(value, column, table) => {
                                    if(value && column && table) onWidgetClicked(value, column, table);
                                }}/>
                            </div>
                        )
                    })}
                </ResponsiveReactGridLayout>}
            </div>} </>
        );
    }
}

ResponsiveGridLayout.propTypes = {
    layouts: PropTypes.array,
    isResizable: PropTypes.bool,
    isDraggable: PropTypes.bool,
    removeWidget: PropTypes.func,
    editWidget: PropTypes.func,
    stickWidget: PropTypes.func,
    onLayoutChange: PropTypes.func,
    onWidgetClicked: PropTypes.func
};
