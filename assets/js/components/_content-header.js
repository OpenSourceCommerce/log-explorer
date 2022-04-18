import React, {Component} from 'react';
import {PAGE_NAME} from '../utils';
import ReactDOM from 'react-dom';

class ContentHeader extends Component {
    render() {
        const splitUrl = window.location.pathname.split('/');

        let title = '';

        if (splitUrl[1] !== 'welcome') {
            title = PAGE_NAME[splitUrl[1]] || PAGE_NAME.dashboard;
        }

        return (
            <div className={`content-header p-0 ${splitUrl[1] === 'log-view' ? 'pt-1' : 'pt-4'}`}>
                <div className="container-fluid d-none">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark">{title}</h1>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

ReactDOM.render(<ContentHeader/>, document.querySelector('#content-header'));
