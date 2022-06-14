import { t } from "@nextcloud/event-bus";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { UserActions } from "../../actions";
import { ContentHeader, DataTable, Toast, DeleteModal, Button, Icon } from "../../components";
import { TOAST_STATUS } from "../../utils";
import { UserForm } from "./form";

const INDEX_CURRENT_USER = 0;

const ADMIN_VALUE = 1;

const USER_VALUE = 0;
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
            indexRowUpdated: null,
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
        if (key === INDEX_CURRENT_USER) {
            return;
        }

        const { users } = this.state;
        const userData = [...users];

        const { id } = userData[key];

        const newStatus = newValue ? ADMIN_VALUE : USER_VALUE;

        userData[key].is_active = newStatus;
        setTimeout(() => {
            this.setState({
                isLoading: true,
                indexRowUpdated: key,
            });
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
                    this.setState({
                        isLoading: false,
                        users: [...userData],
                        toastContent,
                        indexRowUpdated: null,
                    });
                });
        }, 150);
    };

    onDelete = (key) => {
        if (key !== INDEX_CURRENT_USER) {
            this.setState({
                deleteUserIndex: key,
            });
            return;
        }
    };

    onUpdateUserRole = async (user, { value }, index) => {
        this.setState({
            isLoading: true,
            indexRowUpdated: index,
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
        this.setState({
            toastContent,
            users: [...userData],
            isLoading: false,
            indexRowUpdated: null,
        });
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
            message: `${isUpdateUser ? "Update" : "Create"} user  ${user.email} successful`,
        };

        await this.loadData();

        this.setState(
            {
                isShowUserDetailForm: false,
                editUserIndex: null,
                toastContent,
            },
            () => {
                setTimeout(() => {
                    this.setState({ toastContent: {} });
                }, 1500);
            }
        );
    };

    render() {
        const {
            users,
            editUserIndex,
            deleteUserIndex,
            toastContent,
            isLoading,
            isShowUserDetailForm,
            indexRowUpdated,
        } = this.state;

        const columns = [
            {
                label: '',
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
                        disabled={isLoading && indexRowUpdated === index}
                        onChange={(e) => this.onUpdateUserRole(row, e.target, index)}
                    >
                        <option value={USER_VALUE}>User</option>
                        <option value={ADMIN_VALUE}>Admin</option>
                    </select>
                ),
            },
            {
                label: "Status",
                dataField: "is_active",
                formatter: ({ index, cell }) => {
                    let isDisable = indexRowUpdated === index;
                    if (index === INDEX_CURRENT_USER) isDisable = true;

                    return (
                        <div className="form-check form-switch">
                            <input
                                className={`form-check-input ${index === INDEX_CURRENT_USER ? 'pe-none' : ''}`}
                                type="checkbox"
                                role="switch"
                                id={`is_active_${index}`}
                                disabled={isDisable}
                                defaultChecked={!!cell}
                                onChange={(e) => this.onChangeStatus(index, !cell)}
                            />
                        </div>
                    );
                },
            },
            {
                label: "Last updated",
                dataField: "last_updated",
            },
            {
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
                <Toast
                    toastContent={toastContent}
                    onToastClosed={() => {
                        this.setState({ toastContent: {} });
                    }}
                />
                <div className="content ms-2 me-2 mt-3">
                    <ContentHeader
                        pageTitle="Users"
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
