import React, {Component} from 'react';
import {PAGE_NAME} from '../utils';
import ReactDOM from 'react-dom';

class ContentHeader extends Component {
    render() {
        const splitUrl = window.location.pathname.split('/');

        return (
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark">{PAGE_NAME[splitUrl[1]] || PAGE_NAME.dashboard}</h1>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

ReactDOM.render(<ContentHeader/>, document.querySelector('#content-header'));
