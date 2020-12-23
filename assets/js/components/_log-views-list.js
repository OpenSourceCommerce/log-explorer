import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Icon} from './index';
import '../../styles/component/_log-views-list.scss';

export class LogViewList extends Component {
    render() {
        const {className, onSelected, data, selected, ...rest} = this.props;

        let value = '';
        let uuid = '';

        if (selected) {
            value = selected.name || '';
            uuid = selected.uuid || '';
        }

        return (
            <div className={`log-view-list ${className}`} {...rest}>
                <a className="title align-items-center d-inline-flex dropdon-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">

                    <h1 className="mr-4"> {value} </h1>
                    <span className="btn-caret">
                        <Icon name="angle-down" />
                    </span>
                </a>

                <div className="dropdown-menu dropdown-menu-left animate slideIn"
                    aria-labelledby="navbarDropdown">
                    {data && data.map((item, index) => {
                        return (
                            <a key={index}
                                value={item.uuid}
                                className={`${item.uuid && item.uuid === uuid ? 'active' : ''} dropdown-item`}
                                href="#"
                                onClick={() => onSelected(item)}
                            >
                                {item.name}
                            </a>
                        );
                    })}
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item"
                        href="/table/create"
                    >Create new one</a>
                </div>
            </div>
        );
    }
}

LogViewList.propTypes = {
    className: PropTypes.string,
    data: PropTypes.array,
    onSelected: PropTypes.func,
    selected: PropTypes.object
};
