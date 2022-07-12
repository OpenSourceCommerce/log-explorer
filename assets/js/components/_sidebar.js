import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Text, Link, Image, Icon} from '.';
import Logo from '../../images/logo.svg';
import PropTypes from 'prop-types';
import { getDataFromCookies, SIDEBAR_STATUS_COOKIE_NAME } from '../utils';

export class Sidebar extends Component {
    componentDidMount() {
        if(getDataFromCookies(SIDEBAR_STATUS_COOKIE_NAME) === "true") {
            $("#sidebar").toggleClass("hidden");
        }
    }
    render() {
        const { role } = this.props;
        const featureName = window.location.pathname.split("/");
        let navList;
        if (role === "guest") {
            navList = [];
        } else if (role === "user") {
            navList = [
                { href: "log-view", iconName: "search", label: "Explore" },
                { href: "profile", iconName: "user", label: "Profile" },
            ];
        } else {
            navList = [
                { href: "dashboard", iconName: "home", label: "Dashboards" },
                { href: "log-view", iconName: "search", label: "Explore" },
                { href: "user", iconName: "users", label: "Users" },
                { href: "alert", iconName: "alert-triangle", label: "Alerts" },
                { href: "export", iconName: "download", label: "Exports" },
                { href: "setting?tabs=profile", iconName: "settings", label: "Settings" },
            ];
        }

        return (
            <div className="sidebar-wrapper">
                <div id="sidebar" className="d-flex flex-column shadow-sm">
                    <Link href="/" className="mt-4">
                        <Image
                            src={Logo}
                            className="sidebar-logo"
                            alt="ScaleCommerce · E-Commerce"
                        />
                    </Link>
                    <ul className="nav mb-auto overflow-auto d-block mt-2">
                        {navList.map((item, index) => {
                            const { href, iconName, label } = item;
                            return (
                                <li key={index}>
                                    <Link
                                        href={`/${href}`}
                                        className={`nav-item ${
                                            href.includes(featureName[1]) ? "active" : ""
                                        }`}
                                    >
                                        <Icon dataFeather={iconName}></Icon> {label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="sidebar-footer">
                        <div className="text-center"> Data Protection / Datenschutz</div>
                    </div>
                </div>
            </div>
        );
    }
}
Sidebar.propTypes = {
    userimage: PropTypes.string,
    username: PropTypes.string,
    role: PropTypes.string,
};

const root = document.querySelector("#sidebar_component");
ReactDOM.render(<Sidebar {...root.dataset} />, root);
