import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {ResetPasswordForm} from './_reset-password-form';
import PropTypes from 'prop-types';

class ResetPassword extends Component {
    render() {
        const {loginLink, token} = this.props;

        return (
            <>
                <div className="login-box">
                    <div className="login-logo">
                        <a href="/"><b>Admin</b>LTE</a>
                    </div>
                    <div className="card">
                        <div className="card-body login-card-body">
                            <p className="login-box-msg">You are only one step a way from your new password, recover your password now.</p>

                            <ResetPasswordForm token={token}/>

                            <p className="mb-1">
                                <a href={loginLink}>Login</a>
                            </p>
                            <p className="mb-0">
                                <a href="register.html" className="text-center">Register a new
                                    membership</a>
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

ResetPassword.propTypes = {
    loginLink: PropTypes.string,
    token: PropTypes.string.isRequired
};

const root = document.querySelector('#root');
ReactDOM.render(<ResetPassword {...root.dataset}/>, root);
