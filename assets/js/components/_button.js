import React from "react";
import { Colors } from ".";
import PropTypes from "prop-types";

export const Button = ({
    className = "",
    type = "button",
    color,
    isLoading = false,
    disabled = false,
    children,
    cy = "",
    ...rest
}) => {
    let classes = `btn ${className}`;
    if (color) classes += " btn-" + color;

    if (isLoading) {
        disabled = true;
    }

    return (
        <button {...rest} className={classes} disabled={disabled} type={type} data-cy={cy}>
            {isLoading ? (
                <>
                    <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                    ></span>
                    Loading...
                </>
            ) : (
                children
            )}
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    color: PropTypes.string,
    children: PropTypes.any,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    isLoading: PropTypes.bool,
    cy: PropTypes.string,
};
