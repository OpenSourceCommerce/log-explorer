import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
    Colors,
    ContentHeader,
    CreateNewDashboardModal,
    DashboardContent,
    Icon,
    Image,
    Modal,
    Size,
    Spinner,
    Text,
    Toast,
} from "../../components";
import ChervonIcon from "../../../images/select.svg";
import { DashboardActions, LogTableActions, WidgetActions } from "../../actions";
import { TOAST_STATUS } from "../../utils";
import "../../../styles/pages/dashboard.scss";

const ContentHeaderTop = ({
    dashboardDetail,
    dashboardList,
    onCreateNewDashboardClick,
    onDeleteDashboardClick,
}) => {
    const dashboardListItem = dashboardList.filter((item) => item.uuid !== dashboardDetail.uuid);

    const onDashboardItemClick = (uuid) => {
        window.location.pathname = `dashboard/${uuid}`;
    };

    return (
        <ContentHeader pageTitle="Dashboard" iconName="home">
            <Image src={ChervonIcon} className="icon-title mx-3 mt-1" />
            <div>
                <div
                    className="dashboard-drop dropdown d-flex me-4"
                    id="dashboard-dropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <span className="title align-middle">{dashboardDetail?.title}</span>
                    <Image src={ChervonIcon} className="select-down ms-2 align-middle" />
                </div>
                <ul
                    className="dropdown-menu dashboard-dropdown das p-0"
                    aria-labelledby="dashboard-dropdown"
                >
                    <li>
                        <a
                            className="dropdown-item text-primary my-2"
                            href="#"
                            onClick={() => onCreateNewDashboardClick()}
                        >
                            <Icon dataFeather="plus" className="feather-sm" />
                            <span className="ms-2 align-middle">Create new dashboard</span>
                        </a>
                    </li>
                    {dashboardListItem.length > 0 &&
                        dashboardListItem.map((item, index) => (
                            <li key={index}>
                                <a
                                    className="dropdown-item my-2"
                                    onClick={() => onDashboardItemClick(item.uuid)}
                                >
                                    {item.title}
                                </a>
                            </li>
                        ))}
                </ul>
            </div>
            <div>
                <div
                    id="action-dropdown"
                    className="action-dropdown dropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <Icon name="ellipsis-h" className="action-button" />
                </div>
                <ul className="dropdown-menu p-0" aria-labelledby="action-dropdown">
                    <li>
                        <a
                            className="dropdown-item text-primary my-2"
                            onClick={() => onDeleteDashboardClick(dashboardDetail)}
                        >
                            <Text color={Colors.red}>Delete</Text>
                        </a>
                    </li>
                </ul>
            </div>
        </ContentHeader>
    );
};

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
    const [visibleConfirmDeleteDashboard, setVisibleConfirmDeleteDashboard] = useState();
    const [toastContent, setToastContent] = useState();

    useEffect(() => {
        setIsLoading(true);
        loadData();
    }, []);

    const loadData = async () => {
        const [dashboardListRes, dashboardRes, widgetListRes] = await Promise.all([
            DashboardActions.listDashboard(),
            LogTableActions.getDashboard(uuid),
            WidgetActions.listWidget(),
        ]);

        const widgetList =
            widgetListRes && widgetListRes.data && widgetListRes.data.length > 0
                ? widgetListRes.data
                : [];

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
        }

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

    return (
        <>
            {!isLoading ? (
                <div className="dashboard-page ms-cp-4 mt-2">
                    <Toast toastContent={toastContent} onToastClosed={() => setToastContent()} />
                    <ContentHeaderTop
                        dashboardDetail={dashboardDetail}
                        dashboardList={dashboardList}
                        onCreateNewDashboardClick={() => setIsShowCreateNewDashboard(true)}
                        onDeleteDashboardClick={(dashboard) =>
                            setVisibleConfirmDeleteDashboard(dashboard)
                        }
                    />

                    {dashboardDetail && <DashboardContent dashboardDetail={dashboardDetail} />}

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
                </div>
            ) : (
                <Spinner />
            )}
        </>
    );
};

ReactDOM.render(<DashboardPage />, document.querySelector("#root"));
