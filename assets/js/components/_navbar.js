import React, { Component, useEffect } from "react";
import ReactDOM from "react-dom";
import { NavUser, Icon } from ".";
import PropTypes from "prop-types";
import { getDataFromCookies, setDataToCookies, SIDEBAR_STATUS_COOKIE_NAME } from "../utils";

const Navbar = ({ ...props }) => {
    useEffect(() => {
        if (getDataFromCookies(SIDEBAR_STATUS_COOKIE_NAME) === "true") {
            $("#sidebarCollapse").toggleClass("sidebar-hidden");
        }
    }, []);

    const onSidebarCollapseToggle = () => {
        $(".wrapper").toggleClass("w-100");
        // setSidebarIsCollapse(newStatus);

        const newStatus = getDataFromCookies(SIDEBAR_STATUS_COOKIE_NAME) === "true" ? "false" : "true";
        setDataToCookies(SIDEBAR_STATUS_COOKIE_NAME, newStatus, 30);
    };

    return (
        <nav className="navbar navbar-expand navbar-light bg-white main-header ps-cp-4">
            <div className="d-flex justify-content-between w-100 align-items-center">
                <span
                    className="nav-item collapse-icon rounded-circle p-2"
                    id="sidebarCollapse"
                    href="#"
                    onClick={() => {
                        onSidebarCollapseToggle();
                    }}
                >
                    <Icon dataFeather="chevron-left" />
                </span>
                <NavUser {...props} />
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    logoutLink: PropTypes.string.isRequired,
    profileLink: PropTypes.string.isRequired,
    changePasswordLink: PropTypes.string.isRequired,
    role: PropTypes.string,
};

const root = document.querySelector("#navbar");
ReactDOM.render(<Navbar {...root.dataset} />, root);
