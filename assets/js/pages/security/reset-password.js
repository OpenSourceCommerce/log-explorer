import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {ResetPasswordForm} from './_reset-password-form';

class ResetPassword extends Component {
    render() {
        return (
            <div className="container-fluid p-0">
                <h1 className="h3 mb-3">{'Reset password'}</h1>
                <div className="row">
                    <div className="col-12">
                        <div className="card p-2 p-sm-3 p-lg-4">
                            <div className="card-header form-center-w-600">
                                {'Input your new password'}
                            </div>
                            <div className="card-body form-center-w-600">
                                <ResetPasswordForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
ReactDOM.render(<ResetPassword/>, document.querySelector('#root'));
