import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class NavMenuItem extends Component {
    render() {
        let {title, link = '#', className = '', ...rest} = this.props;

        className = `nav-link ${className}`;

        return (
            <li className="nav-item d-none d-sm-inline-block">
                <a href={link} className={className} {...rest}>{title}</a>
            </li>
        );
    }
}

NavMenuItem.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    link: PropTypes.string
};
