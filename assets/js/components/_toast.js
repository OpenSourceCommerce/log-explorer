import React, { Component } from "react";

export class Toast extends Component {
    render() {
        const {
            toastContent
        } = this.props;

        const { color, message } = toastContent;

        const isShow = color && message;

        return (
            <div className="toast-container p-3 top-0 start-50 translate-middle-x fixed-top">
                <div
                    className={`toast text-white bg-${color} border-0 fade ${isShow ? 'show' : 'hide'} w-auto`}
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="d-flex">
                        <div className="toast-body">{message}</div>
                    </div>
                </div>
            </div>
        );
    }
}
