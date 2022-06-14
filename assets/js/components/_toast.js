import React, { useEffect } from "react";

export const Toast = ({
    toastContent = {
        message: "",
    },
    onToastClosed,
}) => {
    useEffect(() => {
        if (toastContent.message) {
            setTimeout(() => {
                if (onToastClosed) onToastClosed();
            }, toastContent.timeout || 2000);
        }
    }, [toastContent]);

    const { color, message } = toastContent;

    const isShow = color && message;

    return (
        <div
            className="toast-container p-3 start-50 translate-middle-x fixed-top"
            style={{ top: "30px" }}
        >
            <div
                className={`toast text-white bg-${color} border-0 fade ${
                    isShow ? "show" : "hide"
                } w-auto`}
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
};
