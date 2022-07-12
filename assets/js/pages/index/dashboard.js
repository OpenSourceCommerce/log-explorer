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
            setIsNewWidgetAdded(false);
            loadData();
        }
    }, [visibleAddWidgetModal]);

    const loadData = async () => {
        setIsLoading(true);
        const [dashboardListRes, dashboardRes] = await Promise.all([
            DashboardActions.listDashboard(),
            LogTableActions.getDashboard(uuid),
        ]);

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

            loadWidgetList(widgets);

            setDashboardList([...dashboardList]);
            setDashboardDetail({ ...dashboardDetail });
        }
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
            setDashboardList([...newDashboardList]);
            setIsLoading(false);
            setToastContent(toastContent);
        }
    };

    const loadWidgetList = async (widgetExistInDashboard) => {
        const widgetListRes = await WidgetActions.listWidget();

        let widgetList =
            widgetListRes && widgetListRes.data && widgetListRes.data.length > 0
                ? widgetListRes.data
                : [];

        const widgetListOrigin = widgetList;

        if (widgetExistInDashboard?.length > 0)
            widgetList = widgetList.filter((item) =>
                widgetExistInDashboard.every((el) => el.widget_id !== item.id)
            );

        setWidgetListOrigin([...widgetListOrigin]);
       	setWidgetList([...widgetList]);
    };

    const onAddNewWidget = async (widgetListSelected) => {
        const widgetListAddToDashboard = widgetListSelected.map((item) => {
            let position = {};

            switch (item.type) {
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

            return DashboardActions.addWidget(dashboardDetail.id, item.id, position);
        });

        const addWidgetRes = await Promise.all([...widgetListAddToDashboard]);

        const isErrorExist = addWidgetRes.every((item) => item.error !== 0);
        if (!isErrorExist) {
            setToastContent({
                color: TOAST_STATUS.success,
                message: `Add ${widgetListSelected.length} widget to dashboard successful.`,
            });

            setWidgetList(
                widgetList.filter((item) => !widgetListSelected.find((el) => el.id === item.id))
            );
            setIsNewWidgetAdded(true);
            setVisibleAddWidgetModal(false);
        }
    };

    const onWidgetListChange = (widgets) => {
        if (widgets)
            setWidgetList(
                widgetListOrigin.filter((item) => widgets.every((el) => el.widget_id !== item.id))
            );
    };

    const onAddWidgetClick = () => setVisibleAddWidgetModal(true);

    const onWidgetUpdateSuccess = () => loadData();

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
                            onWidgetUpdateSuccess={onWidgetUpdateSuccess}
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
                        onSelectWidgetForDashboard={(widgetListSelected) =>
                            onAddNewWidget(widgetListSelected)
                        }
                        isCreateNewWidgetCallback={() => loadWidgetList(dashboardDetail?.widgets)}
                    />
                </div>
            ) : (
                <Spinner />
            )}
        </>
    );
};

ReactDOM.render(<DashboardPage />, document.querySelector("#root"));
