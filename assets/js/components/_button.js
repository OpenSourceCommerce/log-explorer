import React, {Component} from 'react';
import {Colors} from '.';
import PropTypes from 'prop-types';

export class Button extends Component {
    render() {
        let {className = '', type = 'button', color = Colors.blue, isLoading = false, disabled = false, children, ...rest} = this.props;

        if (Array.isArray(children)) {
            children = children.map((child, index) => {
                if (typeof child === 'string') {
                    child = <span key={index}>{child}</span>;
                }

                return child;
            });
        }

        let classes = className;
        classes += ' btn';
        classes += ' btn-' + color;
        if (isLoading) {
            disabled = true;
        }

        return (
            <button {...rest} className={classes} disabled={disabled} type={type}>
                {isLoading ? (<>  <span
                    className="spinner-border spinner-border-sm mr-2"
                    role="status" aria-hidden="true"></span>
                    Loading... </>) : children}
            </button>
        );
    }
}

Button.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    color: PropTypes.string,
    children: PropTypes.any,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    isLoading: PropTypes.bool
};
