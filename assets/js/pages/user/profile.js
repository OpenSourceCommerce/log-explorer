import React, { Component } from "react";
import ReactDOM from "react-dom";
import { ContentHeader, Toast, UserProfile, ChangePasswordForm } from "../../components";
import "../../../styles/pages/_edit-profile.scss";
import { DatabaseTables } from "../database/tables";

class ProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toastContent: {},
        };
    }

    setToastMessage = (toastContent) => {
        this.setState({ toastContent });
    };

    render() {
        const { toastContent } = this.state;
        return (
            <div className="setting-profile" style={{marginBottom: "50px"}}>
                <div className="content">
                    <Toast
                        toastContent={toastContent}
                        onToastClosed={() => {
                            this.setState({ toastContent: {} });
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
                                    <ul
                                        className="nav nav-pills ms-4"
                                        id="pills-tab"
                                        role="tablist"
                                    >
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className="nav-link active"
                                                id="pills-profile-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-profile"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-profile"
                                                aria-selected="true"
                                            >
                                                My Profile
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className="nav-link"
                                                id="pills-databases-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-databases"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-databases"
                                                aria-selected="false"
                                            >
                                                Databases
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className="nav-link"
                                                id="pills-widgets-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-widgets"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-widgets"
                                                aria-selected="false"
                                            >
                                                Widgets
                                            </button>
                                        </li>
                                    </ul>
                                </ContentHeader>
                            </div>
                        </div>
                    </div>
                    <div className="tab-content" id="pills-tabContent">
                        <div
                            className="container-fluid mx-2 mt-3 tab-pane fade show active"
                            id="pills-profile"
                            role="tabpanel"
                            aria-labelledby="pills-profile-tab"
                        >
                            <UserProfile setToastMessage={this.setToastMessage} />
                            <ChangePasswordForm setToastMessage={this.setToastMessage} />
                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-databases"
                            role="tabpanel"
                            aria-labelledby="pills-databases-tab"
                        >
                            <DatabaseTables />
                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-widgets"
                            role="tabpanel"
                            aria-labelledby="pills-widgets-tab"
                        >
                            Widget config tab
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<ProfileForm />, document.querySelector("#root"));
