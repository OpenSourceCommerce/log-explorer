import React, {Component} from 'react';
import {Link,Icon} from '.';
import PropTypes from 'prop-types';

export class NavUser extends Component {
    render() {
        const {
            logoutLink,
            profileLink,
            changePasswordLink,
            username,
            userimage,
        } = this.props;

        return (
            <div className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="d-none d-md-inline-block me-2">{username}</span>
                    <img src={userimage} className="rounded-circle" style={{width: "43px"}}/>
                    <Icon dataFeather="chevron-down" className="feather-sm"/>
                </Link>
                <ul className="dropdown-menu border-0 shadow-sm dropdown-menu-end fade-down" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item text-primary" href={profileLink}>My Profile</Link></li>
                    <li><Link className="dropdown-item text-primary" href={changePasswordLink}>Change Password</Link></li>
                    <li><Link className="dropdown-item text-danger" href={logoutLink}>Log out</Link></li>
                </ul>
            </div>
        );
    }
}

NavUser.propTypes = {
    logoutLink: PropTypes.string.isRequired,
    profileLink: PropTypes.string.isRequired,
    changePasswordLink: PropTypes.string.isRequired
};
