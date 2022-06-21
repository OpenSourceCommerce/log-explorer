import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
    CreateNewDashboardModal,
    DashboardContent,
    DashboardHeader,
    Modal,
    Size,
    Spinner,
    Toast,
    WidgetListModal,
} from "../../components";
import { DashboardActions, LogTableActions, WidgetActions } from "../../actions";
import { TOAST_STATUS, WIDGET_TYPE } from "../../utils";
import "../../../styles/pages/dashboard.scss";

const ConfirmDeleteDashboard = ({
    dashboard,
    dashboardTitle,
    onConfirmDeleteDashboard,
    onHidden,
}) => {
    return (
        <Modal
            size={Size.medium}
            id={"delete-dashboard"}
            title={`Deleting table ${dashboardTitle}`}
            showCloseButton={true}
            closeButtonTitle="Cancel"
            showSaveButton={true}
            saveButtonTitle="Delete dashboard"
            saveButtonColor="danger"
            saveButtonAction={() => onConfirmDeleteDashboard(dashboard)}
            closeButtonAction={() => onHidden()}
            show={!!dashboardTitle}
            onHidden={onHidden}
        >
            {` Are you sure you want to delete ${dashboardTitle}`}
        </Modal>
    );
};

const DashboardPage = ({}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isShowCreateNewDashboard, setIsShowCreateNewDashboard] = useState(false);
    const [dashboardList, setDashboardList] = useState([]);
    const [dashboardDetail, setDashboardDetail] = useState();
    const [widgetList, setWidgetList] = useState([]);
    const [widgetListOrigin, setWidgetListOrigin] = useState([]);
    const [visibleConfirmDeleteDashboard, setVisibleConfirmDeleteDashboard] = useState();
    const [toastContent, setToastContent] = useState();
    const [visibleAddWidgetModal, setVisibleAddWidgetModal] = useState(false);
    const [isNewWidgetAdded, setIsNewWidgetAdded] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (isNewWidgetAdded) {
            loadData();
            setIsNewWidgetAdded(false);
        }
    }, [visibleAddWidgetModal]);

    const loadData = async () => {
        setIsLoading(true);
        const [dashboardListRes, dashboardRes, widgetListRes] = await Promise.all([
            DashboardActions.listDashboard(),
            LogTableActions.getDashboard(uuid),
            WidgetActions.listWidget(),
        ]);

        let widgetList =
            widgetListRes && widgetListRes.data && widgetListRes.data.length > 0
                ? widgetListRes.data
                : [];

        const widgetListOrigin = widgetList;

        const dashboardList =
            dashboardListRes && dashboardListRes.data && dashboardListRes.data.length > 0
                ? dashboardListRes.data
                : [];

        let dashboardDetail = {};

        if (dashboardRes && !dashboardRes.error) {
            const { widgets, data, configs } = dashboardRes;

            dashboardDetail = {
                ...data,
                configs: configs && configs.size ? { ...configs } : {},
                widgets,
            };

            widgetList = widgetList.filter((item) =>
                widgets.every((el) => el.widget_id !== item.id)
            );
        }

        setWidgetListOrigin([...widgetListOrigin]);
        setDashboardList([...dashboardList]);
        setDashboardDetail({ ...dashboardDetail });
        setWidgetList([...widgetList]);
        setIsLoading(false);
    };

    const onConfirmDeleteDashboard = async () => {
        setIsLoading(true);
        const res = await DashboardActions.deleteDashboard(visibleConfirmDeleteDashboard?.id);
        let toastContent;
        let newDashboardList = [...dashboardList];
        if (res && !res.error) {
            newDashboardList = newDashboardList.filter(
                (item) => item.uuid !== visibleConfirmDeleteDashboard.uuid
            );

            let pathname = `dashboard`;
            if (newDashboardList.length > 0) {
                pathname = `${pathname}/${newDashboardList[0]?.uuid}`;
            }
            window.location.pathname = pathname;
        } else {
            toastContent = {
                color: TOAST_STATUS.failed,
                message: res?.message,
            };

            setVisibleConfirmDeleteDashboard();
            setIsLoading(false);
            setDashboardList([...newDashboardList]);
            setToastContent(toastContent);
        }
    };

    const onAddNewWidget = async (widget) => {
        let position = {};

        switch (widget.type) {
            case WIDGET_TYPE.bar:
            case WIDGET_TYPE.line:
            case WIDGET_TYPE.doughnut:
            case WIDGET_TYPE.pie: {
                position = { x: 0, y: 0, width: 3, height: 2, fixed: null };
                break;
            }
            case WIDGET_TYPE.counterSum: {
                position = { x: 0, y: 0, width: 3, height: 1, fixed: null };
                break;
            }
            case WIDGET_TYPE.table: {
                position = { x: 0, y: 0, width: 3, height: 3, fixed: null };
                break;
            }
        }

        const addWidgetRes = await DashboardActions.addWidget(
            dashboardDetail.id,
            widget.id,
            position
        );

        if (addWidgetRes && !addWidgetRes.error) {
            setToastContent({
                color: TOAST_STATUS.success,
                message: `Add widget ${widget.title} to dashboard successful.`,
            });

            setWidgetList(widgetList.filter((item) => item.id !== widget.id));
            setIsNewWidgetAdded(true);
        }
    };

    const onWidgetListChange = (widgets) => {
        if (widgets)
            setWidgetList(
                widgetListOrigin.filter((item) => widgets.every((el) => el.widget_id !== item.id))
            );
    };

    const onAddWidgetClick = () => setVisibleAddWidgetModal(true);

    return (
        <>
            {!isLoading ? (
                <div
                    className="dashboard-page ms-cp-4 mt-3 me-cp-3"
                    style={{ marginBottom: "7rem" }}
                >
                    <Toast
                        toastContent={toastContent}
                        onToastClosed={() => setToastContent()}
                        style={{ zIndex: "1060" }}
                    />
                    <DashboardHeader
                        dashboardDetail={dashboardDetail}
                        dashboardList={dashboardList}
                        onCreateNewDashboardClick={() => setIsShowCreateNewDashboard(true)}
                        onDeleteDashboardClick={(dashboard) =>
                            setVisibleConfirmDeleteDashboard(dashboard)
                        }
                        onAddWidgetClick={() => onAddWidgetClick()}
                    />
                    {dashboardDetail && (
                        <DashboardContent
                            dashboardDetail={dashboardDetail}
                            onAddWidgetClick={() => onAddWidgetClick()}
                            onWidgetListChange={onWidgetListChange}
                        />
                    )}
                    <CreateNewDashboardModal
                        isShow={isShowCreateNewDashboard}
                        onHidden={() => setIsShowCreateNewDashboard(false)}
                    />
                    <ConfirmDeleteDashboard
                        dashboard={visibleConfirmDeleteDashboard}
                        dashboardTitle={visibleConfirmDeleteDashboard?.title}
                        onConfirmDeleteDashboard={() => onConfirmDeleteDashboard()}
                        onHidden={() => setVisibleConfirmDeleteDashboard()}
                    />
                    <WidgetListModal
                        isShow={visibleAddWidgetModal}
                        widgetList={widgetList}
                        onHidden={() => {
                            setVisibleAddWidgetModal(false);
                        }}
                        isSpinnerFullHeight={false}
                        onSelectWidgetForDashboard={(item) => onAddNewWidget(item)}
                    />
                </div>
            ) : (
                <Spinner />
            )}
        </>
    );
};

ReactDOM.render(<DashboardPage />, document.querySelector("#root"));
