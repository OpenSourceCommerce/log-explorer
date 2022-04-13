import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {CardHeader, Table, Link, Icon, Button, DeleteModal} from '../../components';
import {Alert, UserActions} from '../../actions';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: false,
            newUser: null,
            userSelected: null,
        };
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onDelete = this.onDelete.bind(this);
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
        const newUser = localStorage.getItem('newUser') && JSON.parse(localStorage.getItem('newUser')).email ? JSON.parse(localStorage.getItem('newUser')).email : null;
        if (newUser) {
            this.setState({
                newUser,
            }, () => {
                setTimeout(() => {
                    localStorage.removeItem('newUser');
                    this.setState({newUser: null});
                }, 5000)
            })
        }
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
                const strMessage = newStatus ? 'Enable' : 'Disable';
                if (error) {
                    Alert.error(`You can not ${strMessage} this user`);
                    return;
                }

                users[key].is_active = newStatus;
                Alert.success(`${strMessage} successful`);
                that.setState({
                    users
                });
            }).finally(() => {
                that.setState({
                    isLoading: false
                });
            });
    }

    onDelete = (key) => {
        if (key !== 0) {
            this.setState({
                userSelected: key
            })
            return;
        }
        Alert.error('Can not delete your account by yourself')
    }

    render() {
        const {users, newUser, userSelected} = this.state;

        const _users = users.map((user, key) => {
            return <tr key={key}>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.is_admin ? 'Admin' : 'user'}</td>
                <td>{user.status}</td>
                <td>{user.last_updated}</td>
                <td className={'text-right'}>
                    <Link href={'/user/' + user.id} className={'btn btn-sm me-3 btn-success'} title={'Edit'}><Icon name={'edit'}/></Link>
                    {user.is_active == 1 &&
                    <Button onClick={_ => this.onChangeStatus(key)} className={'btn btn-sm btn-warning'} title={'Disable'}><Icon name={'user-times'}/></Button>}
                    {user.is_active != 1 &&
                    <Button onClick={_ => this.onChangeStatus(key)} className={'btn btn-sm btn-primary'} title={'Enable'}><Icon name={'user-plus'}/></Button>}
                    <Button onClick={_ => this.onDelete(key)} className={'btn ms-3 btn-sm btn-danger'} title={'Delete'}><Icon name={'trash'}/></Button>
                </td>
            </tr>;
        });

        return (
            <div className="users container-fluid">
                <DeleteModal
                    data={users}
                    indexSelected={userSelected}
                    objectName="user"
                    displayField="email"
                    closeButtonAction={() => {
                        this.setState({
                            userSelected: false,
                        })
                    }}
                    saveButtonAction={() => {
                        this.setState({
                            isLoading: true
                        });
                        UserActions.delete(users[userSelected].id).then(res => {
                            const {error} = res;
                            if (error) {
                                Alert.error('You can not delete this account');
                                return;
                            }

                            users.splice(userSelected, 1);
                            this.setState({
                                users,
                            });
                            Alert.success('Delete successful');
                        }).finally(() => {
                            this.setState({
                                isLoading: false,
                                userSelected: false,
                            });
                        });
                    }}
                />
                {newUser && (
                    <div className="alert alert-success" role="alert">
                        {`The account ${newUser} has been created.`}
                    </div>)}
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
