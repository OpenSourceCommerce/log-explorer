import React, { Component } from "react";
import { Link, Text, Image, Icon, Size } from "./index";

export class NavMessageItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { avatar, name, title, time, color } = this.props;

        return (
            <Link className="dropdown-item">
                <div className="media">
                    <Image src={avatar} alt="User Avatar"
                           className="img-size-50 mr-3 img-circle"/>
                    <div className="media-body">
                        <h3 className="dropdown-item-title">
                            {name}
                            <Text className="float-right" size={Size.small} color={color}>
                                <Icon name="star"/>
                            </Text>
                            <p className="text-sm">{title}</p>
                            <p className="text-sm text-muted">
                                <Icon type={'regular'} name="clock" className="mr-1"/>
                                {time}
                            </p>
                        </h3>
                    </div>
                </div>
            </Link>
        );
    }
}
