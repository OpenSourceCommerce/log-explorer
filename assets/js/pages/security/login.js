import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {LoginForm} from './_login-form';
import PropTypes from 'prop-types';
import "../../../styles/pages/login.scss";

class Login extends Component {
    render() {
        const {forgotPasswordLink} = this.props;

        return (
            <div className="login-screen min-vh-100 d-flex flex-column min-vh-100 justify-content-center align-items-center">
                <div className="login-form-component">
                    <LoginForm forgotPasswordLink={forgotPasswordLink}/>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    forgotPasswordLink: PropTypes.string
};

const root = document.querySelector('#root');
ReactDOM.render(<Login {...(root.dataset)}/>, root);
