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
        this.setState({
            mounted: true,
        });
    }

    render() {
        const { isResizable = true, data, isDraggable = true, onLayoutChange, removeWidget, ...rest } = this.props;
        const { mounted, compactType, isLoading } = this.state;
        // min Width :x 356;
        // row Height : 340 / 2;
        const layout = data && data.length > 0 ? data.map(item => item.layout) : [];
        return (
            <>{isLoading ? <span
                className="spinner-border spinner-border-sm mr-2"
                role="status" aria-hidden="true"/> :  <div className="responsive-grid-layout" {...rest}>
                { data && data.length > 0  && <ResponsiveReactGridLayout
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
                        let WidgetLayout = ({layout, data, type, column}) => {
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
                                            column={column}
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
                </ResponsiveReactGridLayout>}
            </div>} </>
        );
    }
}

ResponsiveGridLayout.propTypes = {
    data: PropTypes.array,
    isResizable: PropTypes.bool,
    isDraggable: PropTypes.bool,
    removeWidget: PropTypes.func
};
