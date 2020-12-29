import React, {Component} from 'react';
import {Link, Icon, NavDivider} from '.';
import PropTypes from 'prop-types';

export class NavUser extends Component {
    render() {
        const {logoutLink, profileLink, changePasswordLink} = this.props;

        return (
            <li className="nav-item dropdown">
                <Link className="nav-link" data-toggle="dropdown">
                    <Icon name="user"/>
                </Link>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    <Link href={profileLink} className="dropdown-item">
                        My Profile
                    </Link>
                    <NavDivider/>
                    <Link href={changePasswordLink} className="dropdown-item">
                        Change Password
                    </Link>
                    <NavDivider/>

                    <Link href={logoutLink} className="dropdown-item">
                        Log out
                    </Link>
                </div>
            </li>
        );
    }
}

NavUser.propTypes = {
    logoutLink: PropTypes.string.isRequired,
    profileLink: PropTypes.string.isRequired,
    changePasswordLink: PropTypes.string.isRequired
};
