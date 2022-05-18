import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Checkbox extends Component {
    render() {
        const {label = '', checked, value, id, name, className, ...rest} = this.props;

        return (
            <div className="form-check">
                <input checked={checked} type="checkbox" id={id} value={value} name={name} className={`form-check-input ${className}`} {...rest}/>
                <label className="form-check-label" htmlFor={id}>{label}</label>
            </div>
        );
    }
}

Checkbox.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    checked: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};
