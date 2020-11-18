import React, { Component } from "react";

export class Text extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { className = "", children, color = "", size = "", ...rest } = this.props;

        className += " ";

        if (color) {
            color = ` text-${color}`;
        }

        className += color;

        if (size) {
            size = ` text-${size}`;
        }

        className += size;

        return (
            <span {...rest} className={className}>
                {children}
            </span>
        );
    }
}

