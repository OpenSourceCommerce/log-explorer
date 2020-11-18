import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Text extends Component {
    render() {
        let {className = '', children, color = '', size = '', ...rest} = this.props;

        className += ' ';

        if (color) {
            color = ` text-${color}`;
        }

        className += color;

        if (size) {
            size = ` text-${size}`;
        }

        className += size;

        return (
            <span {...rest} className={className}>
                {children}
            </span>
        );
    }
}

Text.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    size: PropTypes.string,
    color: PropTypes.string
};
