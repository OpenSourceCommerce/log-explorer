import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../styles/component/_toggle-button.scss';

export class ToggleButton extends Component {
    render() {
        const {onChange, checked, disabled, className} = this.props;
        return (
            <div className={`${className} checkbox switcher`}>
                <label>
                    <input
                        type="checkbox"
                        id="toggle-button"
                        onChange={onChange}
                        checked={checked}
                        disabled={disabled}
                    />
                    <span><small></small></span>
                </label>
            </div>
        );
    }
}

ToggleButton.propTypes = {
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string
};
