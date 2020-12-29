import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {LoginForm} from './_login-form';
import PropTypes from 'prop-types';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleForgotPassword: false
        };
    }

    render() {
        const {forgotPasswordLink} = this.props;
        const {visibleForgotPassword} = this.state;
        return (
            <>
                <div className="login-box">
                    <div className="login-logo">
                        <a href="/"><b>Log</b>Explorer</a>
                    </div>
                    <div className="card">
                        <div className="card-body login-card-body">
                            <p className="login-box-msg">Sign in to start your session</p>

                            <LoginForm/>

                            <p className="mb-1">
                                <a href={forgotPasswordLink}>I forgot my password</a>
                            </p>
                            {/* <p className="mb-0">
                                <a href="register.html" className="text-center">Register a new
                                    membership</a>
                            </p> */}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

Login.propTypes = {
    forgotPasswordLink: PropTypes.string
};

const root = document.querySelector('#root');
ReactDOM.render(<Login {...(root.dataset)}/>, root);
