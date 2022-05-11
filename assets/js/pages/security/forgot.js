import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {ForgotForm} from './_forgot-form';
import "../../../styles/pages/forgot.scss";

class Forgot extends Component {
    render() {
        return (
            <div className="reset-password-screen min-vh-100 d-flex flex-column min-vh-100 justify-content-center align-items-center authentication-background">
                <div className="reset-password-component">
                    <ForgotForm/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Forgot/>, document.querySelector('#root'));
