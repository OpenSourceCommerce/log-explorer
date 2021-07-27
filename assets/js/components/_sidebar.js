import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Text, Link, Image, Icon} from '.';
import Logo from '../../images/logo.svg';
import PropTypes from 'prop-types';

export class Sidebar extends Component {
    render() {
        const {username, userimage, role} = this.props;
        const pathName = window.location.pathname.split('/');
        const featureName = pathName[1] === 'dashboard' ? window.location.pathname.trim().substring(1) : pathName[1];
        let navList;
        if (role === 'guest') {
            navList = [];
        } else if (role === 'user') {
            navList = [
                {href: 'log-view', type: 'regular', iconName: 'circle', label: 'Explore'},
                {href: 'profile', type: 'solid', iconName: 'user', label: 'Profile'}
            ];
        } else {
            navList = [
                {href: 'log-view', type: 'regular', iconName: 'circle', label: 'Explore'},
                {href: 'profile', type: 'solid', iconName: 'user', label: 'Profile'},
                {href: 'table', type: 'solid', iconName: 'database', label: 'Database'},
                {href: 'user', type: 'solid', iconName: 'users', label: 'Users'},
                {href: 'dashboard/list', type: 'solid', iconName: 'money-check', label: 'Dashboards',
                    navChild: [{href: 'widget', type: 'solid', iconName: 'chart-pie', label: 'Widgets'}]},
            ];
        }

        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <Link className="brand-link" href={'/'}>
                    <Image src={Logo} alt="AdminLTE Logo"
                        className="brand-image"/>
                </Link>

                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <Image src={userimage} className="img-circle elevation-2"
                                alt={username}/>
                        </div>
                        <div className="info">
                            <Link className={'d-block'}> { username }</Link>
                        </div>
                    </div>

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview"
                            role="menu" data-accordion="false">
                            {navList.map((item, index) => {
                                const {href, type, iconName, label, navChild} = item;
                                console.log('href', href);
                                return (
                                    <>
                                        <li className="nav-item" key={index}>
                                            <Link href={`/${href}`} className={`nav-link ${href === featureName ? 'active' : ''}`}>
                                                <Icon name={iconName} type={type}
                                                      className="nav-icon"/>
                                                <p>{label}</p>
                                            </Link>
                                        </li>
                                        {navChild && navChild.length > 0 && (
                                            <ul className="nav-sidebar">
                                                {navChild.map((item, index) => {
                                                    const {href, type, iconName, label} = item;
                                                    return(
                                                        <li className="nav-item" key={index}>
                                                            <Link href={`/${href}`} className={`nav-link ${href === featureName ? 'active' : ''}`}>
                                                                <Icon name={iconName} type={type}
                                                                      className="nav-icon mr-1"/>
                                                                <p>{label}</p>
                                                            </Link>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        )}
                                    </>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </aside>

        );
    }
}
Sidebar.propTypes = {
    userimage: PropTypes.string,
    username: PropTypes.string,
    role: PropTypes.string
};

const root = document.querySelector('#sidebar');
ReactDOM.render(<Sidebar {...(root.dataset)}/>, root);
