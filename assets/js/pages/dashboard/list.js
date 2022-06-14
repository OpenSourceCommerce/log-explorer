import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Alert, DashboardActions } from "../../actions";
import {
    Button,
    CardHeader,
    Icon,
    Link,
    Table,
    DeleteModal,
    ExportImport,
    ContentHeader,
    Image,
    Text,
    Colors,
    Modal,
    Size,
    FormField,
    Toast,
    AlertMessage,
} from "../../components";
import NoDashboardImage from "../../../images/no-dashboard.png";
import "./style.scss";
import { Color } from "react-input-color";

const EmptyDashboardComponent = ({ onCreateNewDashboardClick }) => {
    return (
        <div className="d-flex justify-content-center">
            <div className="no-dashboard-content position-absolute">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Image
                        className="no-dashboard-image"
                        src={NoDashboardImage}
                        alt="No dashboard image"
                    />
                    <span className="title fs-4 fw-bold mt-2">You don't have a dashboard yet</span>
                    <span className="sub-title my-3">Let’s create your first dashboard</span>
                    <Button onClick={onCreateNewDashboardClick}>
                        <Icon dataFeather="plus" className="feather-lg stroke-width-4" />
                        <span className="fw-bold align-middle ms-2">
                            Create your first dashboard
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

const CreateNewDashboardModal = ({ isShow, onHidden }) => {
    const [dashboardName, setDashboardName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState();

    const onCreateDashboardClick = async () => {
        setIsLoading(true);

        const response = await DashboardActions.createOrUpdate(null, {
            title: dashboardName,
        });

        if (response && !response.error) {
            const { id } = response;
            const resLoad = await DashboardActions.loadDashboard(id);
            if (resLoad && !resLoad.error) {
                await setAlertMessage({
                    color: Colors.green,
                    message: "Create dashboard success, we will redirect your in few second",
                });
                setTimeout(() => {
                    window.location.href = `/dashboard/${resLoad.data.uuid}`;
                }, 2000);
            }
        }
    };

    return (
        <Modal
            size={Size.medium}
            id="create-new-dashboard"
            title="Create new dashboard"
            showCloseButton={false}
            showSaveButton={false}
            isPositionCenter={true}
            show={isShow}
            onHidden={onHidden}
        >
            <div className="mx-5">
                <AlertMessage className="mb-3" color={alertMessage?.color} message={alertMessage?.message} />
                <FormField
                    value={dashboardName}
                    fieldName="dashboardName"
                    className="mb-3"
                    label="Title"
                    placeholder="Give your dashboard a cool name..."
                    isMandatory={true}
                    disabled={isLoading}
                    onChange={(e) => setDashboardName(e.target?.value)}
                />
                <Button
                    className="w-100"
                    disabled={isLoading || !dashboardName}
                    onClick={() => onCreateDashboardClick()}
                >
                    Create dashboard
                </Button>
            </div>
        </Modal>
    );
};

const DashboardList = ({}) => {
    const [isDisplayCreateNewDashboardModal, setIsDisplayCreateNewDashboardModal] = useState();
    const [toastContent, setToastContent] = useState();

    return (
        <div className="dashboard-page">
            <Toast toastContent={toastContent} onToastClosed={() => setToastContent()} />
            <ContentHeader className="mt-2" pageTitle="Dashboard" iconName="home"></ContentHeader>
            <EmptyDashboardComponent
                onCreateNewDashboardClick={() => setIsDisplayCreateNewDashboardModal(true)}
            />
            <CreateNewDashboardModal
                isShow={isDisplayCreateNewDashboardModal}
                onHidden={() => setIsDisplayCreateNewDashboardModal(false)}
                onCreateDashboard={() => {}}
            />
        </div>
    );
};

ReactDOM.render(<DashboardList />, document.querySelector("#root"));
