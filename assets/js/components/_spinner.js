import React, {Component} from 'react';

export class Spinner extends Component {
    render() {
        return (
            <div className="spinner d-flex justify-content-center align-items-center text-primary">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
}
