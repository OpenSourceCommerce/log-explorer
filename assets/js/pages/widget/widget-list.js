import React, { useEffect, useState, Fragment } from "react";
import DatabaseActions from "../../actions/_database-actions";
import WidgetActions from "../../actions/_widget-actions";
import { Spinner, Icon, Toast, Colors, Modal, Size } from "../../components";
import { TOAST_STATUS } from "../../utils";
import { WidgetDetailModal } from "./widget-detail";
import "./widget-list.scss";

const WIDGET_ICON = {
    widget: "activity",
    table: "list",
    count: "count",
};

const ORDER_FIELD_VALUE = {
    asc: "asc",
    desc: "desc",
};

const WIDGET_DEFAULT = {
    column: "",
    order: ORDER_FIELD_VALUE.asc,
    size: 5,
    table: "",
    title: "",
    type: "",
};

const Widget = ({ widgetItem, onWidgetClick, onRemoveWidgetClick }) => {
    const { id, title, type } = widgetItem;
    let widgetType = "widget";
    if (type === 1) widgetType = "count";
    else if (type === 3) widgetType = "table";

    return (
        <div className={`widget-item d-flex flex-column ${!id ? "border-dashed" : ""}`}>
            <div
                className="ms-auto dropdown"
                style={{ height: "1rem" }}
                onClick={() => console.log(id)}
            >
                <div
                    className={`${id ? "d-block" : "d-none"}`}
                    type="button"
                    id="more-option-widget"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <Icon className="me-2" name="ellipsis-h" />
                </div>
                <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="more-option-widget"
                >
                    <li>
                        <a className="dropdown-item text-danger" onClick={onRemoveWidgetClick}>
                            Delete
                        </a>
                    </li>
                </ul>
            </div>
            <div
                className="d-flex flex-column justify-content-center align-item-center flex-grow-1"
                role="button"
                onClick={onWidgetClick}
            >
                <div className="text-center">
                    {id ? (
                        <span className={`rounded-circle bg-${widgetType} p-3`}>
                            <Fragment>
                                {widgetType === "count" ? (
                                    <span className="text-white fw-medium">123</span>
                                ) : (
                                    <Icon
                                        className="text-white"
                                        dataFeather={WIDGET_ICON[widgetType]}
                                    />
                                )}
                            </Fragment>
                        </span>
                    ) : (
                        <Icon className="text-primary" dataFeather="plus" />
                    )}
                </div>
                <div className="mt-4 text-center fw-medium">
                    {id ? (
                        <span>{title}</span>
                    ) : (
                        <span className="text-primary">Create new widget</span>
                    )}
                </div>
            </div>
        </div>
    );
};

const AlertDeleteWidget = ({ widget, onHidden, onConfirmDeleteButton }) => {
    return (
        <Modal
            id={`delete-widget-${widget?.id}`}
            size={Size.medium}
            title="Confirm delete widget"
            show={!!widget?.id}
            onHidden={onHidden}
            closeButtonAction={onHidden}
            saveButtonTitle="Delete"
            showSaveButton={true}
            saveButtonColor={Colors.red}
            saveButtonAction={onConfirmDeleteButton}
        >
            <p>{`Are you sure to delete widget ${widget?.title} ?`}</p>
        </Modal>
    );
};

export const WidgetList = () => {
    const [widgets, setWidgets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [widgetSelected, setWidgetSelected] = useState();
    const [isWidgetDetailClicked, setIsWidgetDetailClicked] = useState(false);
    const [tables, setTables] = useState([]);
    const [queries, setQueries] = useState([]);
    const [toastContent, setToastContent] = useState();
    const [widgetRemoveSelected, setWidgetRemoveSelected] = useState();

    const loadData = async () => {
        const [tableRes, queriesRes, widgetRes] = await Promise.all([
            DatabaseActions.getAllTable(),
            WidgetActions.getQueries(),
            WidgetActions.listWidget(),
        ]);

        const widgetListItem = widgetRes.data.map((item) => {
            const widget = { ...item };
            if (item.hasOwnProperty("order_desc")) {
                widget.order = item.order_desc ? ORDER_FIELD_VALUE.desc : ORDER_FIELD_VALUE.asc;
            }
            return widget;
        });

        if (!widgetRes.error) {
            setWidgets([{ ...WIDGET_DEFAULT }, ...widgetListItem]);
        }

        let tables =
            tableRes && tableRes.data && tableRes.data.length > 0
                ? tableRes.data.map((item) => ({
                      value: item,
                      label: item,
                  }))
                : [];

        let queries =
            queriesRes && queriesRes.data && queriesRes.data.length > 0 ? queriesRes.data : [];

        setTables(tables);
        setQueries(queries);
        setIsLoading(false);
    };

    const onSubmitDataSuccess = async (isUpdateWidget) => {
        await setIsWidgetDetailClicked(false);
        await setWidgetSelected(null);
        await setIsLoading(true);
        await loadData();
        setToastContent({
            color: TOAST_STATUS.success,
            message: `${isUpdateWidget ? "Update" : "Create"} widget successful`,
        });
    };

    const onConfirmDeleteButton = async () => {
        const res = await WidgetActions.deleteWidget(widgetRemoveSelected.id);
        const { error } = res;
        let toastContent = {};
        if (error) {
            toastContent = {
                color: TOAST_STATUS.failed,
                message: res.message,
            };
            return;
        }
        toastContent = {
            color: TOAST_STATUS.success,
            message: "Delete toast successful",
        };

        setWidgetRemoveSelected();
        const newWidgetList = [...widgets].filter((item) => item.id !== widgetRemoveSelected.id);
        setWidgets(newWidgetList);

        setToastContent(toastContent);
    };

    useEffect(() => {
        setIsLoading(true);
        loadData();
    }, []);

    return (
        <div className="widget-list">
            <Toast toastContent={toastContent} onToastClosed={() => setToastContent()} />
            {!isLoading ? (
                <>
                    <div className="container-fluid">
                        <div className="ms-2">
                            <div className="d-flex flex-wrap">
                                {widgets.map((item, index) => (
                                    <Widget
                                        key={index}
                                        widgetItem={item}
                                        onWidgetClick={() => {
                                            setWidgetSelected(item);
                                            setIsWidgetDetailClicked(true);
                                        }}
                                        onRemoveWidgetClick={() => {
                                            setWidgetRemoveSelected(item);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <WidgetDetailModal
                        tables={tables}
                        queries={queries}
                        widget={widgetSelected}
                        isShow={isWidgetDetailClicked}
                        onSubmitDataSuccess={onSubmitDataSuccess}
                        onHidden={() => {
                            setIsWidgetDetailClicked(false);
                            setWidgetSelected(null);
                        }}
                    />
                    <AlertDeleteWidget
                        widget={widgetRemoveSelected}
                        onHidden={() => setWidgetRemoveSelected()}
                        onConfirmDeleteButton={() => onConfirmDeleteButton()}
                    />
                </>
            ) : (
                <Spinner />
            )}
        </div>
    );
};
