import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Input extends Component {
    render() {
        let {className = '', type = 'text', cy = '', ...rest} = this.props;
        className += ' form-control';
        if (cy === '') {
            cy = rest['name'] ?? '';
        }

        return (
            <input
                className={className}
                type={type}
                data-cy={cy}
                {...rest}
            />
        );
    }
}

Input.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onKeyUp: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string,
    cy: PropTypes.string
};
