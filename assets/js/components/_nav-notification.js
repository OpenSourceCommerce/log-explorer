import React, {Component} from 'react';
import {Link, Icon, Text, NavNotificationItem, NavDivider} from '.';
import PropTypes from 'prop-types';

export class NavNotification extends Component {
    render() {
        const {total = 0} = this.props;

        return (
            <li className="nav-item dropdown d-none">
                <Link className="nav-link" data-bs-toggle="dropdown">
                    <Icon name="bell"/>
                    <Text className="badge badge-warning navbar-badge">{total}</Text>
                </Link>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    <Text className="dropdown-item dropdown-header">
                        {total} Notification{total > 1 ? 's' : ''}
                    </Text>
                    <NavDivider/>
                    <NavNotificationItem type="envelope" href="#" title="1 new messages"
                        time="1 mins"/>
                    <NavDivider/>

                    <NavNotificationItem type="users" href="#" title="2 friend requests"
                        time="3 hours"/>
                    <NavDivider/>

                    <NavNotificationItem type="file" href="#" title="3 new reports" time="5 days"/>
                    <NavDivider/>

                    <Link className="dropdown-item dropdown-footer">
                        See All Notifications
                    </Link>
                </div>
            </li>
        );
    }
}

NavNotification.propTypes = {
    total: PropTypes.number
};
