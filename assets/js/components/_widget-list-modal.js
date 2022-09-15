import React, { useState, useEffect, Fragment } from "react";
import { Button, Colors, Icon, Link, Modal, Size, Spinner, Text, Toast } from ".";
import { DatabaseActions, WidgetActions } from "../actions";
import { WidgetDetailModal } from "./widget/_widget-detail";
import "../../styles/component/_widget-list-modal.scss";
import { TOAST_STATUS } from "../utils";

export const WidgetListModal = ({
    isShow,
    onHidden,
    widgetList: passedWidgetList,
    isCreateNewWidgetCallback,
    onSelectWidgetForDashboard,
}) => {
    const [isWidgetDetailClicked, setIsWidgetDetailClicked] = useState(false);
    const [tables, setTables] = useState([]);
    const [widgetRemoveSelected, setWidgetRemoveSelected] = useState();
    const [widgets, setWidgets] = useState(passedWidgetList);
    const [isLoading, setIsLoading] = useState(false);
    const [toastContent, setToastContent] = useState();
    const [widgetListSelected, setWidgetListSelected] = useState([]);

    useEffect(() => {
        if (!!isShow) {
            setIsLoading(true);
            loadData();
            setWidgetListSelected([]);
        }
    }, [isShow]);

    useEffect(() => {
        loadWidgetList();
    }, [passedWidgetList]);

    const loadData = async () => {
        const [tableRes] = await Promise.all([DatabaseActions.getAllTable()]);

        let tables =
            tableRes && tableRes.data && tableRes.data.length > 0
                ? tableRes.data.map((item) => ({
                      value: item,
                      label: item,
                  }))
                : [];
        setTables(tables);
        setIsLoading(false);
    };

    const loadWidgetList = async () => {
        const widgetListItem = passedWidgetList.map((item) => {
            const widget = { ...item };
            if (item.hasOwnProperty("order_desc")) {
                widget.order = item.order_desc ? ORDER_FIELD_VALUE.desc : ORDER_FIELD_VALUE.asc;
            }
            return widget;
        });

        setWidgets([{ ...WIDGET_DEFAULT }, ...widgetListItem]);
    };

    const onSubmitDataSuccess = async (isUpdateWidget) => {
        await setIsWidgetDetailClicked(false);
        await setIsLoading(true);
        await loadWidgetList();
        await setIsLoading(false);
        if (isCreateNewWidgetCallback) await isCreateNewWidgetCallback();
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
            message: "Delete widget successful",
        };

        setWidgetRemoveSelected();
        const newWidgetList = [...widgets].filter((item) => item.id !== widgetRemoveSelected.id);
        setWidgets(newWidgetList);

        setToastContent(toastContent);
    };

    const headerChildren = (
        <Link href="/setting?tab=widgets" className="text-decoration-none">
            <Icon dataFeather="settings" className="feather-sm stroke-width-3 me-2" />
            <Text className="fw-bold d-inline-block align-middle">Edit Widget</Text>
        </Link>
    );
    return (
        <>
            <Toast toastContent={toastContent} onToastClosed={() => setToastContent()} />
            <WidgetDetailListModal
                headerChildren={headerChildren}
                widgetListSelected={widgetListSelected}
                isLoading={isLoading}
                isShow={isShow}
                onHidden={onHidden}
                widgets={widgets}
                setWidgetListSelected={setWidgetListSelected}
                setIsWidgetDetailClicked={setIsWidgetDetailClicked}
                setWidgetRemoveSelected={setWidgetRemoveSelected}
                onSelectWidgetForDashboard={onSelectWidgetForDashboard}
            />
            {isShow && (<WidgetDetailModal
                key="modal_add"
                tables={tables}
                isShow={isWidgetDetailClicked}
                widget={WIDGET_DEFAULT}
                onSubmitDataSuccess={onSubmitDataSuccess}
                onHidden={() => {
                    setIsWidgetDetailClicked(false);
                }}
            />)}
            <AlertDeleteWidget
                widget={widgetRemoveSelected}
                onHidden={() => setWidgetRemoveSelected()}
                onConfirmDeleteButton={() => onConfirmDeleteButton()}
            />
        </>
    );
};

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

const WidgetDetailListModal = ({
    headerChildren,
    onHidden,
    isShow,
    className,
    isLoading,
    widgets,
    widgetListSelected,
    setWidgetListSelected,
    setIsWidgetDetailClicked,
    setWidgetRemoveSelected,
    onSelectWidgetForDashboard,
}) => {
    const onClickWidgetExist = (item) => {
        const isSelected = widgetListSelected.find((el) => el.id === item.id);
        if (!isSelected) {
            setWidgetListSelected([...widgetListSelected, item]);
        } else {
            const newWidgetSelectedList = widgetListSelected.filter((el) => el.id !== item.id);
            setWidgetListSelected(newWidgetSelectedList);
        }
    };

    return (
        <Modal
            className="widget-list-modal"
            id="widget-list-modal"
            size={Size.extraLarge}
            title="Add Widget"
            showCloseButton={false}
            isPositionCenter={true}
            show={isShow}
            onHidden={onHidden}
            headerChildren={headerChildren}
        >
            <div className={`widget-list ${className || ""}`}>
                {!isLoading ? (
                    <>
                        <div className="d-flex flex-wrap">
                            {widgets &&
                                widgets.length > 0 &&
                                widgets.map((item, index) => (
                                    <Widget
                                        widgetListSelected={widgetListSelected}
                                        key={index}
                                        widgetItem={item}
                                        onWidgetClick={() => {
                                            if (item?.id) {
                                                onClickWidgetExist(item);
                                            } else {
                                                setIsWidgetDetailClicked(true);
                                            }
                                        }}
                                        onRemoveWidgetClick={() => {
                                            setWidgetRemoveSelected(item);
                                        }}
                                    />
                                ))}
                        </div>
                        {widgetListSelected.length > 0 && (
                            <div>
                                <Button
                                    className="btn-add-widget ms-auto d-block mt-3"
                                    onClick={() => onSelectWidgetForDashboard(widgetListSelected)}
                                >
                                    <Icon
                                        dataFeather="plus"
                                        className="stroke-width-4 feather-sm"
                                    ></Icon>
                                    <span className="align-middle ms-1 fw-bold">{`Add ${widgetListSelected.length} widget`}</span>
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <Spinner isFullHeight={false} />
                )}
            </div>
        </Modal>
    );
};

const Widget = ({ widgetItem, onWidgetClick, onRemoveWidgetClick, widgetListSelected }) => {
    const { id, title, type } = widgetItem;
    let widgetType = "widget";
    if (type === 1) widgetType = "count";
    else if (type === 3) widgetType = "table";

    const isWidgetSelected = widgetListSelected.find((item) => item.id === id);

    return (
        <div
            key={id}
            className={`widget-item d-flex flex-column ${!id ? "border-dashed" : ""} ${
                isWidgetSelected ? "widget-selected" : ""
            }`}
        >
            <div
                className="widget-header d-flex justify-content-between align-items-center mx-2 my-1"
                style={{ height: "1rem" }}
            >
                <Icon dataFeather="check-circle" className={`check-circle`} />
                <div className="ms-auto dropdown">
                    <div
                        className={`${id ? "d-block" : "d-none"}`}
                        type="button"
                        id="more-option-widget"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <Icon name="ellipsis-h" />
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
            </div>
            <div
                className="d-flex flex-column justify-content-center align-item-center flex-grow-1"
                role="button"
                onClick={onWidgetClick}
            >
                <div className="text-center">
                    {id ? (
                        <span className={`rounded-circle bg-${widgetType} p-3`}>
                            {widgetType === "count" ? (
                                <span className="text-white fw-medium">123</span>
                            ) : (
                                <Icon
                                    className="text-white"
                                    dataFeather={WIDGET_ICON[widgetType]}
                                />
                            )}
                        </span>
                    ) : (
                        <Icon className="text-primary" dataFeather="plus" />
                    )}
                </div>
                <div className="mt-4 text-center fw-medium mx-3">
                    {id ? (
                        <span className="text-break">{title}</span>
                    ) : (
                        <span className="text-primary">Create new widget</span>
                    )}
                </div>
            </div>
        </div>
    );
};
