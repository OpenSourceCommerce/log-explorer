import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
    ContentHeader,
    Toast,
    UserProfile,
    ChangePasswordForm,
    WidgetList,
} from "../../components";
import "../../../styles/pages/_edit-profile.scss";
import { DatabaseTables } from "../database/tables";

const TAB_LIST = [
    {
        id: "profile",
        title: "My Profile",
    },
    {
        id: "databases",
        title: "Databases",
    },
    {
        id: "widgets",
        title: "Widgets",
    },
];

const NavComponent = ({ currentTab }) => {
    const TabComponent = ({ title, id, currentTab }) => {
        return (
            <li className="nav-item" role="presentation">
                <button
                    className={`nav-link ${currentTab === id ? "active" : ""}`}
                    id={`pills-${id}-tab`}
                    data-bs-toggle="pill"
                    data-bs-target={`#pills-${id}`}
                    type="button"
                    role="tab"
                    aria-controls={`pills-${id}`}
                    aria-selected="true"
                    onClick={() => {
                        location.href = `setting?tab=${id}`;
                    }}
                >
                    {title}
                </button>
            </li>
        );
    };
    return (
        <ul className="nav nav-pills ms-4" id="pills-tab" role="tablist">
            {TAB_LIST.map((item) => (
                <TabComponent key={item.id} {...item} currentTab={currentTab} />
            ))}
        </ul>
    );
};

const ProfileForm = ({ currentTab: passedCurrentTab }) => {
    const [toastContent, setToastContent] = useState();
    const [currentTab, setCurrentTab] = useState();

    useEffect(() => {
        const currentValue = window.location.search;
        setCurrentTab(currentValue?.split("=")[1] || "profile");
    }, []);

    useEffect(() => {
        setCurrentTab(passedCurrentTab);
    }, [passedCurrentTab]);

    const setToastMessage = (toastContent) => setToastContent(toastContent);

    return (
        <div className="setting-profile" style={{ marginBottom: "50px" }}>
            <div className="content">
                <Toast
                    toastContent={toastContent}
                    onToastClosed={() => {
                        setToastContent();
                    }}
                />
                <div className="bg-white">
                    <div className="container-fluid">
                        <div className="ms-4 me-4">
                            <ContentHeader
                                pageTitle="Settings"
                                iconName="settings"
                                className="pb-2 bg-white"
                            >
                                <NavComponent currentTab={currentTab} />
                            </ContentHeader>
                        </div>
                    </div>
                </div>
                <div className="tab-content" id="pills-tabContent">
                    <div
                        className={`container-fluid pb-5 ms-cp-4 px-0 mt-3 tab-pane fade ${
                            currentTab === "profile" ? "show active" : ""
                        }`}
                        id="pills-profile"
                        role="tabpanel"
                        aria-labelledby="pills-profile-tab"
                    >
                        <UserProfile setToastMessage={setToastMessage} />
                        <ChangePasswordForm setToastMessage={setToastMessage} />
                    </div>
                    <div
                        className={`tab-pane fade ${
                            currentTab === "databases" ? "show active" : ""
                        }`}
                        id="pills-databases"
                        role="tabpanel"
                        aria-labelledby="pills-databases-tab"
                    >
                        <DatabaseTables />
                    </div>
                    <div
                        className={`tab-pane fade ${currentTab === "widgets" ? "show active" : ""}`}
                        id="pills-widgets"
                        role="tabpanel"
                        aria-labelledby="pills-widgets-tab"
                    >
                        <WidgetList />
                    </div>
                </div>
            </div>
        </div>
    );
};

const root = document.querySelector("#root");
ReactDOM.render(<ProfileForm {...root.dataset} />, root);
