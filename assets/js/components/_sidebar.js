import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Text, Link, Image, Icon} from '.';
import Logo from '../../images/logo.svg';
import PropTypes from 'prop-types';

export class Sidebar extends Component {
    render() {
        const {role} = this.props;
        const featureName = window.location.pathname.split('/');
        let navList;
        if (role === 'guest') {
            navList = [];
        } else if (role === 'user') {
            navList = [
                {href: 'log-view', iconName: 'search', label: 'Explore'},
                {href: 'profile', iconName: 'user', label: 'Profile'}
            ];
        } else {
            navList = [
                {href: 'log-view', iconName: 'search', label: 'Explore'},
                {href: 'profile', iconName: 'user', label: 'Profile'},
                {href: 'table', iconName: 'database', label: 'Database'},
                {href: 'user', iconName: 'users', label: 'Users'},
                {href: 'dashboard/list', iconName: 'home', label: 'Dashboards'},
                {href: 'widget', iconName: 'pie-chart', label: 'Widgets'},
                {href: 'alert', iconName: 'alert-triangle', label: 'Alerts'},
                {href: 'export', iconName: 'download', label: 'Exports'},
            ];
        }

        return (
            <div className="sidebar-wrapper">
                <div id="sidebar" className="d-flex flex-column flex-shrink-0 shadow-sm">
                    <Link href="/" className="text-center mb-4 mt-4">
                        <Image src={Logo} className="sidebar-logo" alt="ScaleCommerce · E-Commerce" />
                    </Link>
                    <ul className="nav mb-auto overflow-auto d-block">
                        {navList.map((item, index) => {
                            const { href, iconName, label } = item;
                            return (
                                <li key={index}>
                                    <Link href={`/${href}`} className={`nav-item ${href.includes(featureName[1]) ? 'active' : ''}`}>
                                        <i data-feather={iconName}></i> {label}
                                    </Link>
                                </li>
                            )
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
    role: PropTypes.string
};

const root = document.querySelector('#sidebar_component');
ReactDOM.render(<Sidebar {...(root.dataset)}/>, root);
