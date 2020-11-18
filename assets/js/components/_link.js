import React, { Component } from "react";
import { Text } from "./_text";

export class Link extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { className = "", href = "#", children, ...rest } = this.props;

        if (Array.isArray(children)) {
            children = children.map((child, index) => {
                if (typeof child == "string") {
                    child = <Text key={index}>{child}</Text>;
                }
                return child;
            });
        }

        className += " ";

        return (
            <a href={href} {...rest} className={className}>
                {children}
            </a>
        );
    }
}
