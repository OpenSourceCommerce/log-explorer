import React from "react";
import PropTypes from "prop-types";
import { Button, Icon, Colors } from ".";

export const CardTool = ({ children }) => {
    return (
        <div className="btn-group">
            <Button
                className="dropdown-toggle dropdown-toggle-none-icon"
                outlineColor={Colors.blue}
                data-bs-toggle="dropdown"
                data-offset="-52"
            >
                <Icon className="feather-sm me-2 stroke-width-3" dataFeather="upload" />
                <span className="d-inline-block align-middle fw-bold">Export</span>
            </Button>
            <div className="dropdown-menu dropdown-menu-end" role="menu">
                {children}
            </div>
        </div>
    );
};

CardTool.propTypes = {
    children: PropTypes.any,
};
