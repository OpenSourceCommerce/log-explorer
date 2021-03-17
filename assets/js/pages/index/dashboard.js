import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import LogTableActions from "../../actions/_log-table-actions";
import {FilterDate, FilterText, ResponsiveGridLayout} from "../../components";
import {WIDGET_TYPE} from "../../utils";
import {Button} from "../../components/_button";
import {Icon} from "../../components/_icon";
import {Live} from "../../actions";

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
        const {widgets,isLoading, dashboardDetail} = this.state;

        const { title } = dashboardDetail;

        return (
            <div className="dashboard-container">
                <h3 className="col-12">{title}</h3>
                <div className="filter col-12">
                    <div className="card">
                        <div className="card-body row">
                            <div className="col-12 col-md-6">
                                <FilterText
                                    label="Filter"
                                    placeholder="status = 200 AND url LIKE '%product%'"
                                />
                            </div>
                            <div className="input-search col-12 col-md-4 mt-2 mt-md-0">
                                <FilterDate
                                    label="Date Range"
                                    onDateRangeChanged={() => console.log('1')}
                                />
                            </div>
                            <div className="col-12 col-md-2 btn-action-group mt-4">
                                <Button className="btn-search w-100 mt-0 mt-md-2">
                                    <Icon name="sync" className="mr-2" />
                                    Refresh
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                {isLoading ? <p>Waiting</p> : <ResponsiveGridLayout data={widgets}/>}
            </div>
        );
    }
}

ReactDOM.render(<DashboardPage/>, document.querySelector('#root'));
