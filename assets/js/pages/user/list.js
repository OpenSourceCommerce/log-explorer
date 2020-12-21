import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {CardHeader, Table, Link} from '../../components';
import {UserActions} from '../../actions';
import {Icon} from '../../components/_icon';
import {Button} from '../../components/_button';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: false
        };
        this.onChangeStatus = this.onChangeStatus.bind(this);
    }

    loadData() {
        this.setState({
            isLoading: true
        });
        const that = this;
        UserActions.getAllUser()
            .then(res => {
                const {error, data} = res;
                if (error) {
                    return;
                }

                that.setState({
                    users: data,
                    isLoading: false
                });
            });
    }

    componentDidMount() {
        this.loadData();
    }

    onChangeStatus(key) {
        const {users} = this.state;
        const user = users[key];
        const newStatus = user.is_active ? 0 : 1;
        const that = this;
        that.setState({
            isLoading: true
        });
        UserActions.setStatus(user.id, {is_active: newStatus})
            .then(res => {
                const {error} = res;
                if (error) {
                    return;
                }

                users[key].is_active = newStatus;
                that.setState({
                    users
                });
            }).finally(() => {
                that.setState({
                    isLoading: false
                });
            });
    }

    render() {
        const {users} = this.state;

        const _users = users.map((user, key) => {
            return <tr key={key}>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.is_admin ? 'Admin' : 'user'}</td>
                <td>{user.status}</td>
                <td>{user.last_updated}</td>
                <td>
                    <Link href={'/user/' + user.id} className={'btn btn-sm mr-3 btn-success'} title={'Edit'}><Icon name={'edit'}/></Link>
                    {user.is_active == 1 &&
                    <Button onClick={_ => this.onChangeStatus(key)} className={'btn btn-sm btn-primary'} title={'Disable'}><Icon name={'user-times'}/></Button>}
                    {user.is_active != 1 &&
                    <Button onClick={_ => this.onChangeStatus(key)} className={'btn btn-sm btn-primary'} title={'Enable'}><Icon name={'user-plus'}/></Button>}
                </td>
            </tr>;
        });

        return (
            <div className="users container-fluid">
                <div className="card">
                    <CardHeader title="User management" showCollapseButton={false} showRemoveButton={false}>
                        <Link className={'btn btn-success'} href={'/user/create'}>Create user</Link>
                    </CardHeader>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Last updated</th>
                                            <th>&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {_users}
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

ReactDOM.render(<UserList/>, document.querySelector('#root'));
