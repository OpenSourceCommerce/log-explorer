import React, { Component } from "react";
import { Link, Icon, Text, NavNotificationItem, NavDivider } from "./index";

export class NavNotification extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { total = 0 } = this.props;

        return (
            <li className="nav-item dropdown">
                <Link className="nav-link" data-toggle="dropdown">
                    <Icon name="bell"/>
                    <Text className="badge badge-warning navbar-badge">{total}</Text>
                </Link>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    <Text className="dropdown-item dropdown-header">
                        {total} Notification{total > 1 ? "s" : ""}
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
