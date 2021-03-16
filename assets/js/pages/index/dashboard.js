import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import LogTableActions from "../../actions/_log-table-actions";
import {ResponsiveGridLayout} from "../../components";
import {WIDGET_TYPE} from "../../utils";

export class DashboardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dashboardDetail: {},
            widgets: [],
            isLoading: false,
        }

        //this.updateWidgetPosition = this.updateWidgetPosition.bind(this);
    }

    async componentDidMount() {
        if (window.uuid) {
            this.setState({
                isLoading: true,
            })
            const uuid = window.uuid;
``
            console.log('uuid', uuid);
            const dashboardRes = await LogTableActions.getDashboard(uuid);

            console.log(dashboardRes)
            let dashboardDetail = {};
            let widgets = [];

            if (dashboardRes && !dashboardRes.error) {
                dashboardDetail = dashboardRes.data || {};

                if (dashboardRes.widgets && dashboardRes.widgets.length > 0 && dashboardRes.configs && dashboardRes.configs.size) {
                    const rawWidget = dashboardRes.widgets.map((item) => LogTableActions.getWidget(uuid, item.widget_id));
                    const widgetRes = await Promise.all(rawWidget);

                    widgets = widgetRes && widgetRes.length > 0 && widgetRes.reduce((arr, item, index) => {
                        const {error, data} = item;
                        const {id, x, y, width, height, fixed, title, type} = dashboardRes.widgets[index];
                        console.log(' dashboardRes.widgets[index]', dashboardRes.widgets[index]);
                        const {minWidth, minHeight} = dashboardRes.configs.size[type];

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
                                type: type.toString()
                            });
                        }
                        return arr;
                    }, [])
                }
            }

            this.setState({
                dashboardDetail,
                widgets,
                isLoading: false,
            })
        }
    }

    render() {
        const {widgets,isLoading} = this.state;

        return (
            <div className="dashboard-container">
                {isLoading ? <p>Waiting</p> : <ResponsiveGridLayout data={widgets}/>}
            </div>
        );
    }
}

ReactDOM.render(<DashboardPage/>, document.querySelector('#root'));
