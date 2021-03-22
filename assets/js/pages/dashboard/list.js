import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Alert, DashboardActions} from "../../actions";
import {Button, CardHeader, Icon, Link, Table} from "../../components";

class DashboardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dashboards: []
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
        const {dashboards} = this.state;
        const that = this;
        DashboardActions.deleteDashboard(dashboards[key].id)
            .then(res => {
                const {error} = res;
                if (error) {
                    return;
                }

                dashboards.splice(key, 1);
                that.setState({dashboards});
                Alert.success('Delete successful');
            });
    }

    render() {
        const {dashboards} = this.state;

        return (
            <div className="database">
                <div className="card">
                    <CardHeader title="Dashboard list" showCollapseButton={false} showRemoveButton={false}>
                        <Link href={'/dashboard/create'} className={'btn btn-success'}>Create dashboard</Link>
                    </CardHeader>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Last update</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {dashboards.map((item, key) => {
                                        const url = '/dashboard/edit/' + item.id;
                                        return <tr key={key}>
                                            <td>{item.title}</td>
                                            <td>{item.last_updated}</td>
                                            <td>
                                                <Button onClick={e => {
                                                    window.location.href = '/dashboard';
                                                }} className="mr-2" ><Icon name={'eye'}/></Button>
                                                <Link href={url} className={'btn btn-success mr-2'}><Icon name={'edit'}/></Link>
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

ReactDOM.render(<DashboardList/>, document.querySelector('#root'));
