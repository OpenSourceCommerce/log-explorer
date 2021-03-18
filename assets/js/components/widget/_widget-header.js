import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Icon} from "../_icon";

export class WidgetHeader extends Component {
    render() {
        const {
            header,
            removeWidget,
        } = this.props;
        return (
            <div className="card-header pb-0 pt-2 pl-3 pr-2 font-weight-bold border-bottom-0">
                <div className="float-left">{`${header || '< Input Header >'}`}</div>
                <div className="dropdown float-right dropleft"
                     href="#"
                >
                    <div className=" pr-2 pl-2"
                         data-toggle="dropdown"
                         aria-haspopup="true"
                         aria-expanded="false"
                    >
                        <Icon name='ellipsis-v'/>
                    </div>
                    <div className="dropdown-menu"

                         aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Stick widget</a>
                        <a className="dropdown-item" href="#">Edit</a>
                        <a className="dropdown-item" href="#" onClick={() => removeWidget()}>Remove</a>
                    </div>
                </div>
            </div>
        );
    }
}

WidgetHeader.propTypes = {
    className: PropTypes.string,
    header: PropTypes.string,
    removeWidget: PropTypes.func
};
