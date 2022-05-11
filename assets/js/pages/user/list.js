import { t } from "@nextcloud/event-bus";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Alert, UserActions } from "../../actions";
import { ContentHeader, DataTable, Toast, DeleteModal } from "../../components";
import { Button } from "../../components/_button";
import { Icon } from "../../components/_icon";
import { TOAST_STATUS } from "../../utils";

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: false,
            newUser: null,
            userSelected: null,
            toastContent: {},
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
        const newUser =
            localStorage.getItem("newUser") && JSON.parse(localStorage.getItem("newUser")).email
                ? JSON.parse(localStorage.getItem("newUser")).email
                : null;
        if (newUser) {
            this.setState(
                {
                    newUser,
                },
                () => {
                    setTimeout(() => {
                        localStorage.removeItem("newUser");
                        this.setState({ newUser: null });
                    }, 5000);
                }
            );
        }
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
                userSelected: key,
            });
            return;
        }
        Alert.error("Can not delete your account by yourself");
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
        const userData = [...users];
        UserActions.delete(users[userSelected].id)
            .then((res) => {
                const { error } = res;

                if (error) {
                    toastContent = {
                        color: TOAST_STATUS.failed,
                        message: "You can not delete this account",
                    };
                    return;
                }

                userData.splice(userSelected, 1);
                toastContent = {
                    color: TOAST_STATUS.success,
                    message: "Delete successful",
                };
            })
            .finally(() => {
                this.setState(
                    {
                        isLoading: false,
                        userSelected: null,
                        users: userData,
                        toastContent,
                    }
                );
            });
    };

    render() {
        const { users, newUser, userSelected, toastContent, isLoading } = this.state;

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
                formatter: ({ row, index }) => {
                    const { id } = row;
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
                                    <a className="dropdown-item text-primary" href={`/user/${id}`}>
                                        Edit
                                    </a>
                                </li>
                                {index !== 0 && (
                                    <li>
                                        <Button onClick={() => {this.onDelete(index)}} className="dropdown-item text-danger">
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
                <DeleteModal
                    data={users}
                    indexSelected={userSelected}
                    objectName="user"
                    displayField="email"
                    closeButtonAction={() => {
                        this.setState({
                            userSelected: null,
                        });
                    }}
                    saveButtonAction={() => this.onConfirmDeleteUser()}
                />
                <Toast toastContent={toastContent}
                        onToastClosed={() => {this.setState({ toastContent: {} })}}
                />
                <div className="content ms-2 me-2">
                    <ContentHeader
                        iconName="users"
                        btnRightSideTitle="Create User"
                        btnRightSideIcon="plus"
                        btnRightSideOnClick={() => {
                            window.location.href = "/user/create";
                        }}
                    />
                    <DataTable columns={columns} dataTable={users} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<UserList />, document.querySelector("#root"));
