import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Alert, WidgetActions} from "../../actions";
import {Button, CardHeader, Icon, Link, Table, ResponsiveGridLayout} from "../../components";
import {WIDGET_TYPE} from "../../utils";

class WidgetList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widgets: []
        };
    }

    componentDidMount() {
        const that = this;
        WidgetActions.listWidget()
            .then(res => {
                const {error, data} = res;
                if (error) {
                    return;
                }

                that.setState({
                    widgets: data
                });
            });
    }

    deleteWidget(key) {
        const {widgets} = this.state;
        const that = this;
        WidgetActions.deleteDashboard(widgets[key].id)
            .then(res => {
                const {error} = res;
                if (error) {
                    return;
                }

                widgets.splice(key, 1);
                that.setState({widgets});
                Alert.success('Delete successful');
            });
    }

    render() {
        const {widgets} = this.state;

        const widgetList = [
            // {
            //     layout: {i: "a", x: 0, y: 0, w: 3, h: 2, minW: 3, minH: 2, static: true},
            //     dataWidget: [
            //         {label: 'Mobile', value: 2000},
            //         {label: 'Desktop', value: 700},
            //         {label: 'Bot', value: 350},
            //         {label: 'Botm', value: 34},
            //     ],
            //     widgetHeader: 'Devices and Machine',
            //     widgetType: WIDGET_TYPE.doughnut
            // }, {
            //     layout: {i: "b", x: 3, y: 0, w: 3, h: 2, minW: 3, minH: 2},
            //     dataWidget: [
            //         {label: 'Mobile', value: 2000},
            //         {label: 'Desktop', value: 700},
            //         {label: 'Bot', value: 350},
            //         {label: 'Botm', value: 34},
            //     ],
            //     widgetHeader: 'Devices',
            //     widgetType: WIDGET_TYPE.doughnut,
            // }, {
            //     layout: {i: "c", x: 6, y: 0, w: 3, h: 2, minW: 3, minH: 2},
            //     dataWidget: [
            //         {label: 'Mobile', value: 2000},
            //         {label: 'Desktop', value: 700},
            //         {label: 'Bot', value: 350},
            //         {label: 'Botm', value: 34},
            //     ],
            //     widgetHeader: 'Devices',
            //     widgetType: WIDGET_TYPE.doughnut,
            // }, {
            //     layout: {i: "d", x: 0, y: 2, w: 3, h: 2, minW: 3, minH: 2},
            //     dataWidget: [
            //         {label: 'Mobile', value: 2000},
            //         {label: 'Desktop', value: 700},
            //         {label: 'Bot', value: 350},
            //         {label: 'Botm', value: 34},
            //     ],
            //     widgetHeader: 'Devices',
            //     widgetType: WIDGET_TYPE.doughnut,
            // }, {
            //     layout: {i: "e", x: 3, y: 2, w: 3, h: 2, minW: 3, minH: 2},
            //     dataWidget: [
            //         {label: 'Mobile', value: 2000},
            //         {label: 'Desktop', value: 700},
            //         {label: 'Bot', value: 350},
            //         {label: 'Botm', value: 34},
            //     ],
            //     widgetHeader: 'Devices',
            //     widgetType: WIDGET_TYPE.doughnut,
            // }, {
            //     layout: {i: "h", x: 6, y: 2, w: 3, h: 2, minW: 3, minH: 2},
            //     dataWidget: [
            //         {label: 'Mobile', value: 2000},
            //         {label: 'Desktop', value: 700},
            //         {label: 'Bot', value: 350},
            //         {label: 'Botm', value: 34},
            //     ],
            //     widgetHeader: 'Devices',
            //     widgetType: WIDGET_TYPE.doughnut,
            // },{
            //     layout: {i: "i", x: 0, y: 4, w: 3, h: 2, minW: 3, minH: 2},
            //     dataWidget: [
            //         {label: 'Mobile', value: 2000},
            //         {label: 'Desktop', value: 700},
            //         {label: 'Bot', value: 350},
            //         {label: 'Botm', value: 34},
            //     ],
            //     widgetHeader: 'Devices',
            //     widgetType: WIDGET_TYPE.doughnut,
            // }, {
            //     layout: {i: "j", x: 3, y: 4, w: 3, h: 1, minW: 3, minH: 1},
            //     dataWidget: [
            //         {label: 'Mobile', value: 872966},
            //     ],
            //     widgetHeader: 'Devices',
            //     widgetType: WIDGET_TYPE.counterSum,
            // }, {
            //     layout: {i: "k", x: 6, y: 4, w: 3, h: 1, minW: 3, minH: 1},
            //     dataWidget: [
            //         {label: 'Des', value: 392423482},
            //     ],
            //     widgetHeader: 'Devices',
            //     widgetType: WIDGET_TYPE.doughnut,
            // }, {
            //     layout: {i: "l", x: 0, y: 6, w: 3, h: 3, minW: 3, minH: 3},
            //     dataWidget: [
            //         {label: 'Mobile', value: 2000},
            //         {label: 'Desktop', value: 700},
            //         {label: 'Bot', value: 350},
            //         {label: 'Botm', value: 34},
            //         {label: 'Botm', value: 34},
            //         {label: 'Botm', value: 34},
            //         {label: 'Botm', value: 34},
            //         {label: 'Botm', value: 34},
            //         {label: 'Botm', value: 34},
            //         {label: 'Botm', value: 34},
            //     ],
            //     widgetHeader: 'Devices and Machine',
            //     widgetType: WIDGET_TYPE.table,
            // }, {
            //     layout: {i: "m", x: 0, y: 0, w: 3, h: 1, minW: 3, minH: 1},
            //     dataWidget: [
            //         {label: 'Des', value: 392423482},
            //     ],
            //     widgetHeader: 'Devices',
            //     widgetType: WIDGET_TYPE.counterSum,
            // },{
            //     layout: {i: "n", x: 0, y: 0, w: 3, h: 2, minW: 3, minH: 2},
            //     dataWidget: [
            //         {label: 'Mobile', value: 2000},
            //         {label: 'Desktop', value: 700},
            //         {label: 'Bot', value: 350},
            //         {label: 'Botm', value: 34},
            //     ],
            //     widgetHeader: 'Devices',
            //     widgetType: WIDGET_TYPE.doughnut,
            // }
        ]

        return (
            <div className="database">
                <div className="card">
                    <CardHeader title="Widget list" showCollapseButton={false} showRemoveButton={false}>
                        <Link href={'/widget/create'} className={'btn btn-success'}>Create widget</Link>
                    </CardHeader>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Type</th>
                                        <th>Query</th>
                                        <th>Last update</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {widgets.map((item, key) => {
                                        const url = '/widget/' + item.id;
                                        return <tr key={key}>
                                            <td>{item.title}</td>
                                            <td>{item.type}</td>
                                            <td>{item.query}</td>
                                            <td>{item.last_updated}</td>
                                            <td>
                                                <Link href={url} className={'btn btn-success mr-3'}><Icon name={'edit'}/></Link>
                                                <Button onClick={e => this.deleteWidget(key)} color={'danger'}><Icon name={'trash'}/></Button>
                                            </td>
                                        </tr>;
                                    })}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
                <ResponsiveGridLayout data={widgetList}/>
            </div>
        );
    }
}

ReactDOM.render(<WidgetList/>, document.querySelector('#root'));
