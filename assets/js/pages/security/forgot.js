import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {ForgotForm} from './_forgot-form';

class Forgot extends Component {
    render() {
        return (
            <div className="container-fluid p-0">
                <h1 className="h3 mb-3">{'Forgot password'}</h1>
                <div className="row">
                    <div className="col-12">
                        <div className="card p-2 p-sm-3 p-lg-4">
                            <div className="card-header form-center-w-600">
                                {'Input your email to recovery password'}
                            </div>
                            <div className="card-body form-center-w-600">
                                <ForgotForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
ReactDOM.render(<Forgot/>, document.querySelector('#root'));
