import React, {Component} from 'react';

export class Spinner extends Component {
    render() {
        return (
            <div className=" d-flex flex-column align-items-center justify-content-center min-vh-100 text-primary">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
}
