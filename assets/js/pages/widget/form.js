import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {WidgetManagement} from "../../components";
import {WIDGET_TYPE} from "../../utils";

class WidgetPage extends Component {
    render() {
        const {widget} = this.props;

        const widgetList = [
            {
                layout: {i: "1", x: 0, y: 0, w: 3, h: 2, minW: 3, minH: 2, static: true},
                dataWidget: [
                    {label: 'Mobile', value: 2000},
                    {label: 'Desktop', value: 700},
                    {label: 'Bot', value: 350},
                    {label: 'Botm', value: 34},
                ],
                widgetHeader: 'Devices and Machine',
                widgetType: 'doughnut',
            }, {
                layout: {i: "b", x: 3, y: 0, w: 3, h: 2, minW: 3, minH: 2},
                dataWidget: [
                    {label: 'Mobile', value: 2000},
                    {label: 'Desktop', value: 700},
                    {label: 'Bot', value: 350},
                    {label: 'Botm', value: 34},
                ],
                widgetHeader: 'Devices',
                widgetType: 'pie',
            }, {
                layout: {i: "c", x: 6, y: 0, w: 3, h: 2, minW: 3, minH: 2},
                dataWidget: [
                    {label: 'Mobile', value: 2000},
                    {label: 'Desktop', value: 700},
                    {label: 'Bot', value: 350},
                    {label: 'Botm', value: 34},
                ],
                widgetHeader: 'Devices',
                widgetType: 'pie',
            }, {
                layout: {i: "d", x: 0, y: 2, w: 3, h: 2, minW: 3, minH: 2},
                dataWidget: [
                    {label: 'Mobile', value: 2000},
                    {label: 'Desktop', value: 700},
                    {label: 'Bot', value: 350},
                    {label: 'Botm', value: 34},
                ],
                widgetHeader: 'Devices',
                widgetType: 'pie',
            }, {
                layout: {i: "e", x: 3, y: 2, w: 3, h: 2, minW: 3, minH: 2},
                dataWidget: [
                    {label: 'Mobile', value: 2000},
                    {label: 'Desktop', value: 700},
                    {label: 'Bot', value: 350},
                    {label: 'Botm', value: 34},
                ],
                widgetHeader: 'Devices',
                widgetType: 'doughnut',
            }, {
                layout: {i: "h", x: 6, y: 2, w: 3, h: 2, minW: 3, minH: 2},
                dataWidget: [
                    {label: 'Mobile', value: 2000},
                    {label: 'Desktop', value: 700},
                    {label: 'Bot', value: 350},
                    {label: 'Botm', value: 34},
                ],
                widgetHeader: 'Devices',
                widgetType: 'doughnut',
            },{
                layout: {i: "i", x: 0, y: 4, w: 3, h: 2, minW: 3, minH: 2},
                dataWidget: [
                    {label: 'Mobile', value: 2000},
                    {label: 'Desktop', value: 700},
                    {label: 'Bot', value: 350},
                    {label: 'Botm', value: 34},
                ],
                widgetHeader: 'Devices',
                widgetType: 'doughnut',
            }, {
                layout: {i: "j", x: 3, y: 4, w: 3, h: 1, minW: 3, minH: 1},
                dataWidget: [
                    {label: 'Mobile', value: 872966},
                ],
                widgetHeader: 'Devices',
                widgetType: 'counterSum',
            }, {
                layout: {i: "k", x: 6, y: 4, w: 3, h: 1, minW: 3, minH: 1},
                dataWidget: [
                    {label: 'Des', value: 392423482},
                ],
                widgetHeader: 'Devices',
                widgetType: 'counterSum',
            }, {
                layout: {i: "l", x: 0, y: 6, w: 3, h: 3, minW: 3, minH: 3},
                dataWidget: [
                    {label: 'Mobile', value: 2000},
                    {label: 'Desktop', value: 700},
                    {label: 'Bot', value: 350},
                    {label: 'Botm', value: 34},
                    {label: 'Botm', value: 34},
                    {label: 'Botm', value: 34},
                    {label: 'Botm', value: 34},
                    {label: 'Botm', value: 34},
                    {label: 'Botm', value: 34},
                    {label: 'Botm', value: 34},
                ],
                widgetHeader: 'Devices and Machine',
                widgetType: WIDGET_TYPE.table,
            }, {
                layout: {i: "m", x: 0, y: 0, w: 3, h: 1, minW: 3, minH: 1},
                dataWidget: [
                    {label: 'Des', value: 392423482},
                ],
                widgetHeader: 'Devices',
                widgetType: 'counterSum',
            },{
                layout: {i: "n", x: 0, y: 0, w: 3, h: 2, minW: 3, minH: 2},
                dataWidget: [
                    {label: 'Mobile', value: 2000},
                    {label: 'Desktop', value: 700},
                    {label: 'Bot', value: 350},
                    {label: 'Botm', value: 34},
                ],
                widgetHeader: 'Devices',
                widgetType: 'doughnut',
            }

        ]

        return (
            <div>
                <WidgetManagement
                    addNew={(newWidget) => {
                        console.log(newWidget);
                    }}
                    widgetList={widgetList}
                    key={widgetList}
                />
            </div>
        );
    }
}

const root = document.querySelector('#root');
ReactDOM.render(<WidgetPage {...root.dataset}/>, root);
