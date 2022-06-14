import React from "react";

export const AlertMessage = ({ message, color, className='' }) => {
    return (
        <>
            {message && (
                <div className={`alert alert-${color} ${className}`} role="alert">
                    {message}
                </div>
            )}
        </>
    );
};
