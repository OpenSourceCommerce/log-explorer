import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Alert, DashboardActions} from "../../actions";
import {Button, CardHeader, Icon, Link, Table, DeleteModal, ExportImport} from "../../components";

class DashboardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dashboards: [],
            dashboardSelected: null,
        };
    }

    componentDidMount() {
        const that = this;
        DashboardActions.listDashboard()
            .then(res => {
                const {error, data} = res;
                if (error) {
                    return;
                }

                that.setState({
                    dashboards: data
                });
            });
    }

    deleteDashboard(key) {
        this.setState({
            dashboardSelected: key,
        })
    }

    render() {
        const {role} = this.props
        const isAdmin = (String(role).toLowerCase() === 'admin')
        const {dashboards, dashboardSelected} = this.state;

        return (
            <div className="database">
                {isAdmin && <DeleteModal
                    data={dashboards}
                    indexSelected={dashboardSelected}
                    objectName="dashboard"
                    displayField="title"
                    closeButtonAction={() => {
                        this.setState({
                            dashboardSelected: false,
                        })
                    }}
                    saveButtonAction={() => {
                        try {
                            DashboardActions.deleteDashboard(dashboards[dashboardSelected].id)
                                .then(res => {
                                    const {error} = res;
                                    if (error) {
                                        Alert.success('You can not delete this dashboard');
                                        return;
                                    }

                                    dashboards.splice(dashboardSelected, 1);
                                    this.setState({dashboards}, () => {
                                        Alert.success('Delete successful');
                                    });
                                });
                        } catch (e) {
                            Alert.error(e);
                        } finally {
                            this.setState({
                                dashboardSelected: null,
                            })
                        }
                        ;
                    }}
                />}
                <div className="card">
                    <CardHeader title="Dashboard list" showCollapseButton={false}
                                showRemoveButton={false}>
                        {isAdmin && <ExportImport/>}
                        {isAdmin && <Link href={'/dashboard/create'} className={'btn btn-success'}>Create
                            dashboard</Link>}
                    </CardHeader>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <Table>
                                    <thead>
                                    <tr>
                                        {isAdmin && <th>&nbsp;</th>}
                                        <th>Title</th>
                                        <th>Last update</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {dashboards.map((item, key) => {
                                        const url = '/dashboard/edit/' + item.id;
                                        return <tr key={key}>
                                            {isAdmin && <td><input type="checkbox" className="export-item"
                                                        data-id={item.id}/></td>}
                                            <td>{item.title}</td>
                                            <td>{item.last_updated}</td>
                                            <td>
                                                <Link href={`/dashboard/${item.uuid}`} className="btn btn-primary me-2" ><Icon name={'eye'}/></Link>
                                                <Link href={url} className={'btn btn-success me-2'}><Icon name={'edit'}/></Link>
                                                <Button onClick={e => this.deleteDashboard(key)} color={'danger'}><Icon name={'trash'}/></Button>
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

const root = document.querySelector('#root');
ReactDOM.render(<DashboardList {...(root.dataset)}/>, document.querySelector('#root'));
