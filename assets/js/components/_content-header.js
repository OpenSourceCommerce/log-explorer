import React, { Component } from "react";
import { PAGE_NAME } from "../utils";
import { Icon, Button } from ".";
import "../../styles/component/_content-header.scss";

export class ContentHeader extends Component {
    render() {
        const {
            className,
            iconName,
            actionButtonTitle,
            actionButtonIcon,
            onClickActionBtn,
            children,
            pageTitle,
        } = this.props;
        const splitUrl = window.location.pathname.split("/");

        let title = "";

        if (splitUrl[1] !== "welcome") {
            title = PAGE_NAME[splitUrl[1]];
        }

        title = title || pageTitle;

        return (
            <div
                className={`content-header d-flex justify-content-between aligns-items-center ${
                    className || ""
                }`}
            >
                <div className="d-flex align-items-center w-100">
                    <Icon dataFeather={iconName} className="icon-title" />
                    <span className="title ms-2 align-middle">{title}</span>
                    {children}
                </div>
                {onClickActionBtn && (
                    <Button className="text-nowrap" style={{ fontSize: "16px" }} onClick={onClickActionBtn}>
                        {actionButtonIcon && (
                            <Icon dataFeather={actionButtonIcon} className="feather-sm stroke-width-3" />
                        )}
                        {actionButtonTitle && (
                            <span className="align-middle ms-1">{actionButtonTitle}</span>
                        )}
                    </Button>
                )}
            </div>
        );
    }
}
