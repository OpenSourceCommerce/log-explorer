import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button, Icon, DeleteModal, ContentHeader, DataTable, Toast } from "../../components";
import { AlertActions, DatabaseActions } from "../../actions";
import { TOAST_STATUS } from "../../utils";
import { AlertFormModal } from "./form";

class AlertList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertList: [],
            tableList: [],
            toastContent: {},
            deleteAlertIndex: null,
            isShowAlertDetailForm: false,
            editAlertIndex: null,
        };
    }

    getData = async () => {
        const { tableList } = this.state;
        const [alertRes, dataTablesRes] = await Promise.all([
            AlertActions.listAlert(),
            tableList.length === 0 ? DatabaseActions.getAllTable() : [],
        ]);

        if (!alertRes.error || !dataTablesRes.error) {
            this.setState({
                alertList: alertRes.data,
                tableList: dataTablesRes.data || tableList,
            });
        }
    };

    componentDidMount() {
        this.getData();
    }

    onConfirmDeleteAlert = async () => {
        const { deleteAlertIndex, alertList } = this.state;

        if (parseInt(deleteAlertIndex) < 0) {
            return;
        }

        let toastContent = {};

        let newAlertList = [...alertList];

        try {
            const res = await AlertActions.deleteAlert(newAlertList[deleteAlertIndex].id);

            if (res.error) {
                toastContent = {
                    color: TOAST_STATUS.failed,
                    message: "Delete alert failed",
                };
            } else {
                toastContent = {
                    color: TOAST_STATUS.success,
                    message: "Delete alert successful",
                };

                newAlertList.splice(deleteAlertIndex, 1);
            }
        } catch (e) {
            toastContent = {
                color: TOAST_STATUS.failed,
                message: e.message,
            };
        } finally {
            this.setState({
                toastContent,
                deleteAlertIndex: null,
                alertList: newAlertList,
            });
        }
    };

    onChangeStatus = async (id, index, newValue) => {
        const { alertList } = this.state;

        const newAlertList = [...alertList];

        let toastContent = {};

        const toastStr = !!parseInt(newValue) ? "Activate" : "Deactivate";

        try {
            const res = await AlertActions.updateStatus(id);
            if (res.error) {
                toastContent = {
                    color: TOAST_STATUS.failed,
                    message: `${toastStr} alert failed`,
                };
                return;
            }
            toastContent = {
                color: TOAST_STATUS.success,
                message: `${toastStr} alert successful`,
            };

            newAlertList[index].isActive = newValue;
        } catch (e) {
            toastContent = {
                color: TOAST_STATUS.failed,
                message: `${toastStr} alert failed`,
            };
        } finally {
            this.setState({
                toastContent,
                alertList: newAlertList,
            });
        }
    };

    render() {
        const {
            alertList,
            deleteAlertIndex,
            toastContent,
            isShowAlertDetailForm,
            editAlertIndex,
            tableList,
        } = this.state;

        const columns = [
            {
                label: "Title",
                dataField: "title",
            },
            {
                label: "Table",
                dataField: "from_table",
            },
            {
                label: "Threshold",
                dataField: "threshold",
            },
            {
                label: "Interval (min.)",
                dataField: "interval_time",
            },
            {
                label: "Status",
                dataField: "isActive",
                formatter: ({ row, cell, index }) => {
                    const value = parseInt(cell);
                    return (
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="isActive"
                                defaultChecked={!!value}
                                onChange={() =>
                                    this.onChangeStatus(row.id, index, !value ? "1" : "0")
                                }
                            />
                        </div>
                    );
                },
            },
            {
                formatter: ({ index }) => {
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
                                        onClick={() => this.setState({ editAlertIndex: index })}
                                    >
                                        Edit
                                    </Button>
                                </li>
                                <li>
                                    <Button
                                        onClick={() => this.setState({ deleteAlertIndex: index })}
                                        className="dropdown-item text-danger"
                                    >
                                        Delete
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    );
                },
            },
        ];

        return (
            <div className="alert container-fluid" style={{ backgroundColor: "#F8F9FA" }}>
                <div className="content ms-2 me-2">
                    <ContentHeader
                        iconName="alert-triangle"
                        actionButtonTitle="Create Alert"
                        actionButtonIcon="plus"
                        onClickActionBtn={() => {
                            this.setState({ isShowAlertDetailForm: true });
                        }}
                    />
                    <Toast
                        toastContent={toastContent}
                        onToastClosed={() => {
                            this.setState({ toastContent: {} });
                        }}
                    />
                    {alertList && alertList.length > 0 ? (
                        <DataTable columns={columns} dataTable={alertList} className="bg-white" />
                    ) : (
                        <div className="d-flex justify-content-center">No alert found</div>
                    )}
                    <DeleteModal
                        data={alertList}
                        indexSelected={deleteAlertIndex}
                        objectName="alert"
                        displayField="title"
                        closeButtonAction={() => {
                            this.setState({
                                deleteAlertIndex: null,
                            });
                        }}
                        saveButtonAction={() => this.onConfirmDeleteAlert()}
                    />
                    <AlertFormModal
                        isShow={isShowAlertDetailForm || parseInt(editAlertIndex) >= 0}
                        alertList={alertList}
                        editAlertIndex={editAlertIndex}
                        tableList={tableList}
                        onSubmitAlertData={(toastContent) => {
                            this.getData();
                            this.setState({
                                isShowAlertDetailForm: false,
                                editAlertIndex: null,
                                toastContent,
                            });
                        }}
                        onHidden={() => {
                            this.setState({
                                isShowAlertDetailForm: false,
                                editAlertIndex: null,
                            });
                        }}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<AlertList />, document.querySelector("#root"));
