import React, {Component} from 'react';
import {PAGE_NAME} from '../utils';
import { Icon, Button } from '.';
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
            pageTitle
        } = this.props;
        const splitUrl = window.location.pathname.split('/');

        let title = '';

        if (splitUrl[1] !== 'welcome') {
            title = PAGE_NAME[splitUrl[1]] || PAGE_NAME.dashboard;
        }

        title = title || pageTitle;

        return (
            <div className={`content-header d-flex justify-content-between aligns-items-center ${className}`}>
                <div className='d-flex flex-first aligns-items-center'>
                    <div className="title my-auto">
                        <Icon dataFeather={iconName} className="feather-lg" />
                        <span className="ms-2">{title}</span>
                    </div>
                    {children}
                </div>
                {onClickActionBtn && <Button style={{ fontSize: "16px" }} onClick={onClickActionBtn}>
                    {actionButtonIcon && <Icon dataFeather={actionButtonIcon} className="feather-lg"/>}
                    {actionButtonTitle && <span className="align-middle ms-1">
                        {actionButtonTitle}
                    </span>}
                </Button>}
            </div>
        );
    }
}
