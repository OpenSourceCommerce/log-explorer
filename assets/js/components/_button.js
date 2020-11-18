import React, { Component } from "react";
import { Colors } from "./index";

export class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { className = "", type = "button", color = Colors.blue, children, ...rest } = this.props;

        if (Array.isArray(children)) {
            children = children.map((child, index) => {
                if (typeof child == "string") {
                    child = <span key={index}>{child}</span>;
                }
                return child;
            });
        }

        let classes = className;
        classes += " btn";
        classes += " btn-" + color;

        return (
            <button {...rest} className={classes} type={type}>
                {children}
            </button>
        );
    }
}
