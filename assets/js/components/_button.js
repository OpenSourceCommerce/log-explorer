import React from "react";
import PropTypes from "prop-types";

export const Button = ({
    className = "",
    type = "button",
    color,
    outlineColor,
    isLoading = false,
    disabled = false,
    children,
    cy = "",
    ...rest
}) => {
    let classes = `btn ${className}`;

    if (outlineColor) classes += ` btn-outline-${color}`;

    if (color) classes += ` btn-${color}`;

    if (!outlineColor && !color) classes += " btn-primary";

    return (
        <button {...rest} className={classes} disabled={disabled || isLoading} type={type} data-cy={cy}>
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
