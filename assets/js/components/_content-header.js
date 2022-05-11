import React, {Component} from 'react';
import {PAGE_NAME} from '../utils';
import { Icon, Button } from '.';

export class ContentHeader extends Component {
    render() {
        const {
            iconName,
            btnRightSideTitle,
            btnRightSideIcon,
            btnRightSideOnClick
        } = this.props;
        const splitUrl = window.location.pathname.split('/');

        let title = '';

        if (splitUrl[1] !== 'welcome') {
            title = PAGE_NAME[splitUrl[1]] || PAGE_NAME.dashboard;
        }

        return (
            <div className={`header d-flex justify-content-between ${splitUrl[1] === 'log-view' ? 'mt-1' : 'mt-3'}`}>
                <div className="title fw-bold">
                    <Icon dataFeather={iconName} className="feather-lg" />
                    <span className="align-middle ms-2">{title}</span>
                </div>
                {btnRightSideOnClick && <Button style={{ fonSize: "16px" }} onClick={btnRightSideOnClick}>
                    {btnRightSideIcon && <Icon dataFeather={btnRightSideIcon} className="feather-lg"/>}
                    {btnRightSideTitle && <span className="align-middle ms-1">
                        {btnRightSideTitle}
                    </span>}
                </Button>}
            </div>
        );
    }
}
