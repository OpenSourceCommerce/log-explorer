import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {ForgotForm} from './_forgot-form';

class Forgot extends Component {
    render() {
        return (
            <div className="login-box">
                <div className="login-logo">
                    <a href="/"><b>Log</b>Explorer</a>
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">You forgot your password? Here you can
                            easily retrieve a new password.</p>

                        <ForgotForm/>

                        <p className="mt-3 mb-1">
                            <a href="/">Login</a>
                        </p>
                        {/* <p className="mb-0">
                            <a href="register.html" className="text-center">Register a new
                                membership</a>
                        </p> */}
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Forgot/>, document.querySelector('#root'));
