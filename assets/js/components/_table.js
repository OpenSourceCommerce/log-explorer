import React, { Component } from "react";

export class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { children, className = "", ...rest } = this.props;
        className += " table table-hover text-nowrap";

        return (
            <div className={"table-responsive"}>
                <table {...rest} className={className}>
                    {children}
                </table>
            </div>
        );
    }
}
