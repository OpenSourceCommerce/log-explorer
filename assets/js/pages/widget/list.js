import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Alert, WidgetActions} from "../../actions";
import {Button, CardHeader, Icon, Link, Table, DeleteModal, ExportImport} from "../../components";
import {WIDGET_TYPE} from "../../utils";

const WIDGET = {
    [WIDGET_TYPE.doughnut]: 'Doughnut',
    [WIDGET_TYPE.pie]: 'Pie',
    [WIDGET_TYPE.counterSum]: 'Counter Sum',
    [WIDGET_TYPE.table]: 'Table',
}

class WidgetList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widgets: [],
            widgetSelected: null,
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
        this.setState({
            widgetSelected: key,
        })
    }

    render() {
        const {widgets, widgetSelected} = this.state;

        return (
            <div className="widget-list">
                <DeleteModal
                    data={widgets}
                    indexSelected={widgetSelected}
                    objectName="widget"
                    displayField="title"
                    closeButtonAction={() => {
                        this.setState({
                            widgetSelected: false,
                        })
                    }}
                    saveButtonAction={() => {
                        try {
                            WidgetActions.deleteWidget(widgets[widgetSelected].id)
                                .then(res => {
                                    const {error} = res;
                                    if (error) {
                                        Alert.error('You can not delete this widget');
                                        return;
                                    }

                                    widgets.splice(widgetSelected, 1);
                                    this.setState({widgets}, () => {
                                        Alert.success('Delete successful');
                                    });
                                })
                        } catch (e) {
                            Alert.error(e);
                        } finally {
                            this.setState({
                                widgetSelected: null,
                            })
                        };
                    }}
                />
                <div className="card">
                    <CardHeader title="Widget list" showCollapseButton={false} showRemoveButton={false}>
                        <ExportImport widget={true} />
                        <Link href={'/widget/create'} className={'btn btn-success'}>Create widget</Link>
                    </CardHeader>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>&nbsp;</th>
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
                                            <td><input type="checkbox" className="export-item" data-id={item.id}/></td>
                                            <td>{item.title}</td>
                                            <td>{WIDGET[item.type]}</td>
                                            <td>{item.query}</td>
                                            <td>{item.last_updated}</td>
                                            <td>
                                                <Link href={url} className={'btn btn-success me-3'}><Icon name={'edit'}/></Link>
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
            </div>
        );
    }
}

ReactDOM.render(<WidgetList/>, document.querySelector('#root'));
