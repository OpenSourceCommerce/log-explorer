import React, {Component} from 'react';
import {PAGE_NAME} from '../utils';
import { Icon, Button } from '.';
import "../../styles/component/_content-header.scss";

export class ContentHeader extends Component {
    render() {
        const {
            iconName,
            actionButtonTitle,
            actionButtonIcon,
            onClickActionBtn
        } = this.props;
        const splitUrl = window.location.pathname.split('/');

        let title = '';

        if (splitUrl[1] !== 'welcome') {
            title = PAGE_NAME[splitUrl[1]] || PAGE_NAME.dashboard;
        }

        return (
            <div className={`content-header d-flex justify-content-between ${splitUrl[1] === 'log-view' ? 'pt-1' : 'pt-3'}`}>
                <div className="title fw-bold">
                    <Icon dataFeather={iconName} className="feather-lg" />
                    <span className="align-middle ms-2">{title}</span>
                </div>
                {onClickActionBtn && <Button style={{ fonSize: "16px" }} onClick={onClickActionBtn}>
                    {actionButtonIcon && <Icon dataFeather={actionButtonIcon} className="feather-lg"/>}
                    {actionButtonTitle && <span className="align-middle ms-1">
                        {actionButtonTitle}
                    </span>}
                </Button>}
            </div>
        );
    }
}
