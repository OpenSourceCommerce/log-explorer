import React from "react";
import { Button, Colors, ContentHeader, Icon, Image, Text } from ".";
import ChervonIcon from "../../images/select.svg";

export const DashboardHeader = ({
    dashboardDetail,
    dashboardList,
    onCreateNewDashboardClick,
    onDeleteDashboardClick,
    onAddWidgetClick,
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
            <Button
                className="ms-auto"
                outlineColor={Colors.blue}
                onClick={() => onAddWidgetClick()}
            >
                <Icon dataFeather="plus" className="feather-sm stroke-width-4 me-2" />
                <span className="align-middle d-d-inline-block fw-bold">Add widget</span>
            </Button>
        </ContentHeader>
    );
};
