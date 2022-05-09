import { t } from "@nextcloud/event-bus";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { UserActions } from "../../actions";
import { ContentHeader, DataTable, Toast, DeleteModal, Button, Icon } from "../../components";
import { TOAST_STATUS } from "../../utils";
import { UserForm } from "./form";

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: false,
            newUser: null,
            editUserIndex: null,
            deleteUserIndex: null,
            toastContent: {},
            isShowUserDetailForm: false,
        };
    }

    loadData = () => {
        this.setState({
            isLoading: true,
        });
        UserActions.getAllUser().then((res) => {
            const { error, data } = res;
            if (error) {
                return;
            }

            this.setState({
                users: data,
                isLoading: false,
            });
        });
    };

    componentDidMount() {
        this.loadData();
    }

    onChangeStatus = (key, newValue) => {
        const { users } = this.state;
        const userData = [...users];

        const { id } = userData[key];

        const newStatus = newValue ? 1 : 0;

        userData[key].is_active = newStatus;
        setTimeout(() => {
            this.setState({
                isLoading: true,
            });
        }, 200);

        let toastContent = {};

        UserActions.setStatus(id, { is_active: newStatus })
            .then((res) => {
                const { error } = res;
                const strMessage = newStatus ? "Enable" : "Disable";
                if (error) {
                    toastContent = {
                        color: TOAST_STATUS.failed,
                        message: `${strMessage} user failed`,
                    };
                    return;
                }

                toastContent = {
                    color: TOAST_STATUS.success,
                    message: `${strMessage} user successfully`,
                };
            })
            .finally(() => {
                this.setState(
                    {
                        isLoading: false,
                        users: [...userData],
                        toastContent,
                    }
                );
            });
    };

    onDelete = (key) => {
        if (key !== 0) {
            this.setState({
                deleteUserIndex: key,
            });
            return;
        }
    };

    onUpdateUserRole = async (user, { value }, index) => {
        this.setState({
            isLoading: true,
        });
        const { first_name, last_name, email, id } = user;
        let toastContent = {};
        let userData = [...this.state.users];
        try {
            const res = await UserActions.createOrUpdate(id, {
                first_name,
                last_name,
                email,
                is_admin: parseInt(value),
            });
            if (res.error) {
                toastContent = {
                    color: TOAST_STATUS.failed,
                    message: "Updated user failed",
                };
            } else {
                userData[index].is_admin = value;
                toastContent = {
                    color: TOAST_STATUS.success,
                    message: "Updated user successfully",
                };
            }
        } catch (e) {
            toastContent = {
                color: TOAST_STATUS.failed,
                message: e.message,
            };
        }
        this.setState(
            {
                toastContent,
                users: [...userData],
                isLoading: false,
            }
        );
    };

    onConfirmDeleteUser = () => {
        this.setState({
            isLoading: true,
        });

        let toastContent = {};
        const { deleteUserIndex, users } = this.state;
        const userData = [...users];
        UserActions.delete(users[deleteUserIndex].id)
            .then((res) => {
                const { error } = res;

                if (error) {
                    toastContent = {
                        color: TOAST_STATUS.failed,
                        message: "You can not delete this account",
                    };
                    return;
                }

                userData.splice(deleteUserIndex, 1);
                toastContent = {
                    color: TOAST_STATUS.success,
                    message: "Delete successful",
                };
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                    deleteUserIndex: null,
                    users: userData,
                    toastContent,
                });
            });
    };

    onFinishEditUser = async (user, isUpdateUser) => {
        const toastContent = {
            color: "success",
            message: `${isUpdateUser ? 'Update' : 'Create'} user  ${user.email} successful`,
        };

        await this.loadData();

        this.setState({
            isShowUserDetailForm: false,
            editUserIndex: null,
            toastContent,
        }, () => {
            setTimeout(() => {
                this.setState({ toastContent: {} });
            }, 1500);
        });
    };

    render() {
        const {
            users,
            editUserIndex,
            deleteUserIndex,
            toastContent,
            isLoading,
            isShowUserDetailForm,
        } = this.state;

        const columns = [
            {
                isSortable: false,
            },
            {
                label: "Name",
                formatter: ({ row }) => `${row.first_name} ${row.last_name}`,
            },
            {
                label: "E-Mail",
                dataField: "email",
                formatter: ({ cell }) => <span className="text-primary">{cell}</span>,
            },
            {
                label: "Role",
                dataField: "is_admin",
                formatter: ({ cell, row, index }) => (
                    <select
                        name="is_admin"
                        className="form-select"
                        aria-label={cell ? "Admin" : "User"}
                        defaultValue={cell}
                        onChange={(e) => this.onUpdateUserRole(row, e.target, index)}
                    >
                        <option value="0">User</option>
                        <option value="1">Admin</option>
                    </select>
                ),
            },
            {
                label: "Status",
                dataField: "is_active",
                formatter: ({ index, cell }) => (
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="is_active"
                            disabled={index === 0}
                            defaultChecked={!!cell}
                            onChange={(e) => this.onChangeStatus(index, e.target.checked)}
                        />
                    </div>
                ),
            },
            {
                label: "Last updated",
                dataField: "last_updated",
            },
            {
                isSortable: false,
                formatter: ({ row, index }) => {
                    return (
                        <div className="dropdown float-end">
                            <button
                                className="btn text-dark"
                                id="dropdownMenuLink"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <Icon name="ellipsis-h" />
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <li>
                                    <Button
                                        className="dropdown-item text-primary"
                                        onClick={() => {
                                            this.setState({
                                                isShowUserDetailForm: true,
                                                editUserIndex: index,
                                            });
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </li>
                                {index !== 0 && (
                                    <li>
                                        <Button
                                            onClick={() => this.onDelete(index)}
                                            className="dropdown-item text-danger"
                                        >
                                            Delete
                                        </Button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    );
                },
            },
        ];

        return (
            <div className="users container-fluid">
                <Toast toastContent={toastContent} message="User updated successfully" />
                <div className="content ms-2 me-2">
                    <ContentHeader
                        iconName="users"
                        actionButtonTitle="Create User"
                        actionButtonIcon="plus"
                        onClickActionBtn={() => {
                            this.setState({
                                isShowUserDetailForm: true,
                            });
                        }}
                    />
                    <DataTable columns={columns} dataTable={users} />
                </div>
                <UserForm
                    isShow={isShowUserDetailForm}
                    indexUserSelected={editUserIndex}
                    users={users}
                    onFinishEditUser={this.onFinishEditUser}
                    onHidden={() => {
                        this.setState({
                            isShowUserDetailForm: false,
                            editUserIndex: null,
                        });
                    }}
                />
                <DeleteModal
                    data={users}
                    indexSelected={deleteUserIndex}
                    objectName="user"
                    displayField="email"
                    closeButtonAction={() => {
                        this.setState({
                            deleteUserIndex: null,
                        });
                    }}
                    saveButtonAction={() => this.onConfirmDeleteUser()}
                />
            </div>
        );
    }
}

ReactDOM.render(<UserList />, document.querySelector("#root"));
