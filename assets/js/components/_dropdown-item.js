import React, {Component} from 'react';
import {Text} from '.';
import PropTypes from 'prop-types';

export class DropdownItem extends Component {
    render() {
        let {className = '', href = '#', children, ...rest} = this.props;

        if (Array.isArray(children)) {
            children = children.map((child, index) => {
                if (typeof child === 'string') {
                    child = <Text key={index}>{child}</Text>;
                }

                return child;
            });
        }

        className += ' dropdown-item';

        return (
            <a href={href} {...rest} className={className}>
                {children}
            </a>
        );
    }
}

DropdownItem.propTypes = {
    href: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any
};
