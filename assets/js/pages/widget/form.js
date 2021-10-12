import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {DoughnutPieChart, Size, WidgetManagement} from "../../components";
import {WIDGET_TYPE} from "../../utils";
import {CounterSum} from "../../components/widget/_counter-sum";
import {WidgetTable} from "../../components/widget/_widget-table";
import {Alert, WidgetActions} from "../../actions";
import {Input} from "../../components/_input";
import {Modal} from "../../components/_modal";
import {LineBarChart} from "../../components/widget/_line-bar-chart";

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
            showQueryModal: false,
            queryModalQuery: {}
        }

        this.color = SAMPLE_DATA.map(() => this.getRandomColor());
        this.onSubmitQuery = this.onSubmitQuery.bind(this)
        this.onQuerySave = this.onQuerySave.bind(this)
        this.onDeleteQuery = this.onDeleteQuery.bind(this)
        this.onQueryModelChange = this.onQueryModelChange.bind(this)
        this.hideQueryModal = this.hideQueryModal.bind(this)
        this.loadQueries = this.loadQueries.bind(this)
    }

    componentDidMount() {
        this.loadQueries()
    }

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    updateInitialData = (initialData) => {
        this.setState({
            ...initialData,
            type: initialData.type.toString()
        })
    }

    onSubmitQuery(query) {
        this.setState({
            showQueryModal: true,
            queryModalQuery: query
        })
    }

    loadQueries() {
        const that = this;

        WidgetActions.getQueries()
            .then(res => {
                const {error, data} = res;
                if (error === 0) {
                    that.setState({
                        queries: data
                    })
                }
            });
    }

    onQuerySave() {
        const that = this;
        let {queryModalQuery} = this.state;
        if ($.trim(queryModalQuery.name) === '') {
            Alert.error('Query name should not be blank');
            queryModalQuery.nameClass = 'is-invalid';
            that.setState({queryModalQuery});
            return;
        }
        queryModalQuery.nameClass = '';
        if ($.trim(queryModalQuery.name) === '' || $.trim(queryModalQuery.query) === '') {
            Alert.error('Query should not be blank');
            queryModalQuery.queryClass = 'is-invalid';
            that.setState({queryModalQuery});
            return;
        }
        queryModalQuery.queryClass = '';
        that.setState({queryModalQuery});

        WidgetActions.saveQueries(queryModalQuery.id, queryModalQuery)
            .then(res => {
                const {error} = res;
                if (error === 0) {
                    this.loadQueries()

                    that.setState({
                        queryModalQuery: {},
                        showQueryModal: false,
                    })
                }
            })
    }

    onDeleteQuery(query) {
        const that = this;
        WidgetActions.deleteQueries(query.id)
            .then(res => {
                const {error} = res;
                if (error === 0) {
                    this.loadQueries()

                    that.setState({
                        showQueryModal: false
                    })
                }
            })
    }

    onQueryModelChange(e) {
        let {queryModalQuery} = this.state;
        queryModalQuery[e.target.name] = e.target.value;
        queryModalQuery[e.target.name + 'Class'] = e.target.value === '' ? 'is-invalid' : '';
        this.setState({queryModalQuery});
    }

    hideQueryModal() {
        this.setState({
            showQueryModal: false
        })
    }

    render() {
        const WidgetLayout = ({type, title, size, column, duration}) => {
            const dataWidget = SAMPLE_DATA.slice(0, size);
            const color = this.color.slice(0, size);
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
                        duration={duration}
                        color={color}
                    />;
                    break;
                }
                case WIDGET_TYPE.bar:
                case WIDGET_TYPE.line: {
                    component = <LineBarChart
                        id='new'
                        type={type}
                        widgetHeader={title}
                        data={dataWidget}
                        height='500'
                        minHeight='500'
                        duration={duration}
                        color={color}
                    />;
                    break;
                }
                case WIDGET_TYPE.counterSum: {
                    component = <CounterSum
                        data={dataWidget.length}
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

        const {type, showQueryModal, queryModalQuery, queries} = this.state;

        const {query, name, nameClass = '', queryClass = ''} = queryModalQuery;

        return (
            <div className="row">
                {this.state.isLoading ?
                    <span
                        className="spinner-border spinner-border-sm mr-2"
                        role="status" aria-hidden="true"></span> :
                    <>
                        <Modal title={'Query'}
                               id={'query'}
                               size={Size.large}
                               saveButtonTitle={'Save'}
                               showSaveButton={true}
                               show={showQueryModal}
                               saveButtonAction={this.onQuerySave}
                               closeButtonAction={this.hideQueryModal}
                        >
                            {showQueryModal && <div className='row'>
                                <div className='col-12'>
                                    <Input
                                        name='name'
                                        placeholder='Query name'
                                        defaultValue={name}
                                        className={nameClass}
                                        onChange={this.onQueryModelChange}
                                    />
                                </div>
                                <div className='col-12 mt-3'>
                                    <Input
                                        name='query'
                                        defaultValue={query}
                                        className={queryClass}
                                        onChange={this.onQueryModelChange}
                                    />
                                </div>
                            </div>}
                        </Modal>
                        <div className=" col-12 col-md-4">
                            <WidgetManagement
                                {...this.props}
                                onUpdateWidget={(name, value) => {
                                    this.setState({
                                        [name]: value,
                                        duration: name === 'type' || name === 'size' ? 1000 : 0,
                                    })
                                }}
                                updateInitialData={this.updateInitialData}
                                updateLoading={(value) => {
                                    this.setState({
                                        isLoading: value,
                                    })
                                }}
                                queries={queries}
                                onSaveClicked={this.onSubmitQuery}
                                onDeleteCLicked={this.onDeleteQuery}
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
