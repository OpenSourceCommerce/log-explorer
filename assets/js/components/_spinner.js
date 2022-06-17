import React from 'react';

export const Spinner = ({isSpinnerFullHeight = true}) => {
    return (
        <div className={`d-flex flex-column align-items-center justify-content-center text-primary ${isSpinnerFullHeight ? 'min-vh-100' : ''}`}>
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}
