import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Select extends Component {
    render() {
        let {className = '', hasEmpty = false, children, ...rest} = this.props;
        className += ' form-control';

        return (
            <select className={className} {...rest}>
                {hasEmpty && <option>Please select</option>}
                {children}
            </select>
        );
    }
}

Select.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any,
    hasEmpty: PropTypes.bool,
    children: PropTypes.any
};
