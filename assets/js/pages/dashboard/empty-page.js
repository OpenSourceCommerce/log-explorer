import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DashboardActions } from "../../actions";
import {
    Button,
    Icon,
    ContentHeader,
    Image,
    Colors,
    Modal,
    Size,
    FormField,
    Toast,
    AlertMessage,
    CreateNewDashboardModal,
} from "../../components";
import NoDashboardImage from "../../../images/no-dashboard.png";
import "../../../styles/pages/dashboard-empty.scss";

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

const DashBoardEmptyPage = ({}) => {
    const [isDisplayCreateNewDashboardModal, setIsDisplayCreateNewDashboardModal] = useState();
    const [toastContent, setToastContent] = useState();

    return (
        <div className="dashboard-page">
            <Toast toastContent={toastContent} onToastClosed={() => setToastContent()} />
            <ContentHeader className="mt-2 ms-cp-4" pageTitle="Dashboard" iconName="home"></ContentHeader>
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

ReactDOM.render(<DashBoardEmptyPage />, document.querySelector("#root"));
