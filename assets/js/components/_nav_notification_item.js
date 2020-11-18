import React, { Component } from "react";
import { Icon, Text, Link } from "./index";

export class NavNotificationItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { href = "#", title = "", time = "", type = "" } = this.props;

        return (
            <Link href={href} className="dropdown-item">
                <Icon name={type} className="mr-2"/>
                {title}
                <Text className="float-right text-muted text-sm">{time}</Text>
            </Link>
        );
    }
}
