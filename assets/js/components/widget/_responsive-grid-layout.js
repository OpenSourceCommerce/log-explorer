import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DoughnutPieChart, WidgetHeader} from "../index";
import {Responsive, WidthProvider} from "react-grid-layout/index";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../../../styles/component/_responsive-grid-layout.scss';
import {WIDGET_TYPE} from "../../utils";
import {CounterSum} from "./_counter-sum";
import {WidgetTable} from "./_widget-table";
import LogTableActions from "../../actions/_log-table-actions";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export class ResponsiveGridLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            compactType: "horizontal",
            mounted: false,
        };
    }

    async componentDidMount() {
        this.setState({ mounted: true });
        const { dashboardDetail } = this.props;

        if (dashboardDetail) {
            const { configs, widgets, uuid } = dashboardDetail;

            console.log('widgets', widgets);
            let data = [];

            if (widgets && widgets.length > 0) {
                const rawWidget = widgets.map((item) => LogTableActions.getWidget(uuid, item.widget_id));
                const widgetRes = await Promise.all(rawWidget);

                data = widgetRes && widgetRes.length > 0 && widgetRes.reduce((arr, item, index) => {
                    const {error, data} = item;
                    const {id, x, y, width, height, fixed, title, type, widget_id} = widgets[index];
                    const {minWidth, minHeight} = configs.size[type];

                    if (!error && data && data.length > 0) {
                        arr.push({
                            data,
                            layout: {
                                i: id.toString(),
                                x,
                                y,
                                w: width,
                                h: height,
                                minW: minWidth,
                                minH: minHeight,
                                static: !!fixed
                            },
                            title,
                            widget_id,
                            type: type.toString()
                        });
                    }
                    return arr;
                }, []);
            }

            this.setState({
                data,
            })
        }
    }

    render() {
        const { isResizable = true, isDraggable = true, onLayoutChange, removeWidget } = this.props;
        const { mounted, compactType, data } = this.state;
        // min Width :x 356;
        // row Height : 340 / 2;

        const layout = data && data.length > 0 ? data.map(item => item.layout) : [];
        return (
            <div className="responsive-grid-layout">
                { data && data.length > 0  ? <ResponsiveReactGridLayout
                    {...this.props}
                    rowHeight={155}
                    cols={{lg: 12, md: 9, sm: 6, xs: 3, xxs: 3}}
                    layout={layout}
                    onLayoutChange={onLayoutChange}
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
                    {data.map((item) => {
                        let WidgetLayout = ({layout, data, type}) => {
                            let component;
                            if (layout && data) {
                                switch (type) {
                                    case WIDGET_TYPE.doughnut:
                                    case WIDGET_TYPE.pie: {
                                        component = <DoughnutPieChart
                                            id={layout.i}
                                            type={type}
                                            data={data}
                                            height='250'
                                            minHeight='250'
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
                                            data={data}
                                            isDashboardComponent={true}
                                        />
                                    }
                                }
                            } else {
                                component = <> No data </>;
                            }
                            return component;
                        }
                        return (
                            <div key={item.layout.i} data-grid={item.layout} className="widget card">
                                <WidgetHeader header={item.title} removeWidget={() => removeWidget(item.widget_id)}/>
                                <WidgetLayout {...item}/>
                            </div>
                        )
                    })}
                </ResponsiveReactGridLayout> : <p className="text-center"> No widget exist </p>}
            </div>
        );
    }
}

ResponsiveGridLayout.propTypes = {
    data: PropTypes.array,
    isResizable: PropTypes.bool,
    isDraggable: PropTypes.bool,
    removeWidget: PropTypes.func
};
