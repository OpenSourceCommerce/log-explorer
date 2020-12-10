import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Input extends Component {
    render() {
        let {className = '', type = 'text', ...rest} = this.props;
        className += ' form-control';

        return (
            <input
                className={className}
                type={type}
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
    value: PropTypes.string
};
