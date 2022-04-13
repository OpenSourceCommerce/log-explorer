import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {NavSearch, NavNotification, NavMenu, NavMessage, NavUser} from '.';
import PropTypes from 'prop-types';

class Navbar extends Component {
    render() {
        const {logoutLink, profileLink, changePasswordLink, role} = this.props;

        return (
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <NavMenu/>

                {role !== 'guest' && <NavSearch/>}

                {role !== 'guest' && <ul className="navbar-nav ms-auto">
                    <NavMessage total={3}/>
                    <NavNotification total={15}/>
                    <NavUser logoutLink={logoutLink}
                        changePasswordLink={changePasswordLink}
                        profileLink={profileLink}/>
                </ul>}
            </nav>
        );
    }
}

Navbar.propTypes = {
    logoutLink: PropTypes.string.isRequired,
    profileLink: PropTypes.string.isRequired,
    changePasswordLink: PropTypes.string.isRequired,
    role: PropTypes.string
};

const root = document.querySelector('#navbar');
ReactDOM.render(<Navbar {...root.dataset}/>, root);
