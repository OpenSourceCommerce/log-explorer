import React from "react";
import ReactDOM from "react-dom";
import { ContentHeader, Image } from "../../components";
import ChervonIcon from "../../../images/select.svg";

const DashboardPage = ({}) => {
    return (
        <div className="dashboard-page">
            <ContentHeader className="mt-2" pageTitle="Dashboard" iconName="home">
                <Image src={ChervonIcon} className="mx-3 mt-1" />
                <span class="ms-2 align-middle fs-4 fw-bold">MyDashboardName</span>
            </ContentHeader>
            <div className="dashboard-content">
                <div className="dashboard-empty-widget">

                </div>
            </div>
        </div>
    );
};

ReactDOM.render(<DashboardPage />, document.querySelector("#root"));
