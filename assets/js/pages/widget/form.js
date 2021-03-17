import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {DoughnutPieChart, WidgetManagement} from "../../components";
import {WIDGET_TYPE} from "../../utils";
import {CounterSum} from "../../components/widget/_counter-sum";
import {WidgetTable} from "../../components/widget/_widget-table";

const SAMPLE_DATA = [
    {
        "label": "Bergoo",
        "value": 931
    },
    {
        "label": "Carlos",
        "value": 296
    },
    {
        "label": "Groveville",
        "value": 587
    },
    {
        "label": "Carrizo",
        "value": 645
    },
    {
        "label": "Broadlands",
        "value": 581
    },
    {
        "label": "Jennings",
        "value": 234
    },
    {
        "label": "Whitestone",
        "value": 350
    },
    {
        "label": "Harborton",
        "value": 545
    },
    {
        "label": "Spelter",
        "value": 178
    },
    {
        "label": "Stockwell",
        "value": 199
    },
    {
        "label": "Oceola",
        "value": 636
    },
    {
        "label": "Bluffview",
        "value": 840
    },
    {
        "label": "Oley",
        "value": 942
    },
    {
        "label": "Staples",
        "value": 994
    },
    {
        "label": "Emison",
        "value": 876
    },
    {
        "label": "Cuylerville",
        "value": 690
    },
    {
        "label": "Saranap",
        "value": 188
    },
    {
        "label": "Sanborn",
        "value": 106
    },
    {
        "label": "Tibbie",
        "value": 229
    },
    {
        "label": "Bascom",
        "value": 144
    }
];

class WidgetPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: '',
            title: '',
            size: '',
            column: '',
        }

        this.updateInitialData = this.updateInitialData.bind(this);
    }

    updateInitialData(initialData) {
        this.setState({
            ...initialData,
            type: initialData.type.toString()
        })
    }

    render() {
        const WidgetLayout = ({type, title, size, column}) => {
            const dataWidget = SAMPLE_DATA.slice(0, size)
            let component;
            switch (type) {
                case WIDGET_TYPE.doughnut:
                case WIDGET_TYPE.pie: {
                    component = <DoughnutPieChart
                        id='new'
                        type={type}
                        widgetHeader={title}
                        data={dataWidget}
                        height='500'
                        minHeight='500'
                    />;
                    break;
                }
                case WIDGET_TYPE.counterSum: {
                    component = <CounterSum
                        data={dataWidget}
                        widgetHeader={title}
                    />
                    break;
                }
                case WIDGET_TYPE.table: {
                    component = <WidgetTable
                        key={dataWidget}
                        data={dataWidget}
                        widgetHeader={title}
                        column={column}
                        isDashboardComponent={true}
                    />
                    break;
                }
            }
            return component;
        }

        const { type } = this.state;

        return (
            <div className="row">
                {this.state.isLoading ?
                    <span
                        className="spinner-border spinner-border-sm mr-2"
                        role="status" aria-hidden="true"></span> :
                    <>
                        <div className=" col-12 col-md-4">
                            <WidgetManagement
                                {...this.props}
                                onUpdateWidget={(name, value) => {
                                    this.setState({
                                        [name]: value
                                    })
                                }}
                                updateInitialData={this.updateInitialData}
                                updateLoading={(value) => {this.setState({
                                    isLoading: value,
                                })}}
                            />
                        </div>
                        {type && <div className="widget col-12 col-md-8">
                            <div className="card pb-5">
                                <WidgetLayout {...this.state} />
                            </div>
                        </div>}
                    </>}
            </div>
        );
    }
}


const root = document.querySelector('#root');
ReactDOM.render(<WidgetPage {...root.dataset}/>, root);
