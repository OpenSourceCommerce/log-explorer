import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {LoginForm} from './_login-form';
// import {ForgotForm} from './_forgot_form';
import logoImage from '../../../images/logo.svg';
import {Icon} from '../../components';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleForgotPassword: false
        };
    }

    render() {
        const {visibleForgotPassword} = this.state;
        return (
            <>
                <div className="login-box">
                    <div className="login-logo">
                        <a href="../../index2.html"><b>Admin</b>LTE</a>
                    </div>
                    <div className="card">
                        <div className="card-body login-card-body">
                            <p className="login-box-msg">Sign in to start your session</p>

                            <LoginForm message={''} email={'abc@example.com'} remember={true} hidePassword={false}/>

                            <p className="mb-1">
                                <a href="forgot-password.html">I forgot my password</a>
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

ReactDOM.render(<Login/>, document.querySelector('#root'));
