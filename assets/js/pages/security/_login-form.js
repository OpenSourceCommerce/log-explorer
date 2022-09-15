import React, { Component } from "react";
import PropTypes from 'prop-types';
import { UserActions } from "../../actions";
import { Input, Image } from "../../components";
import Logo from "../../../images/light-logo.png";
export class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            remember: false,
            message: "",
        };
    }

    handleChange = ({ name, value, checked }) => {
        this.setState((preState) => ({
            ...preState,
            [name]: name === "remember" ? checked : value,
        }));
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { email, password, remember } = this.state;
        UserActions.login(email, password, remember).then((response) => {
            if (response.error === 0) {
                if (response.redirect) {
                    window.location.href = response.redirect;
                } else {
                    window.location.href = "/";
                }
            } else {
                this.setState({
                    message: response.message,
                });
            }
        });
    };

    render() {
        const { message, email, remember, password } = this.state;
        const { forgotPasswordLink } = this.props;

        return (
            <div className="login-form card">
                <div className="card-header bg-white">
                    <div className="header  d-flex flex-column w-100 justify-content-center align-items-center">
                        <Image
                            src={Logo}
                            className="login-logo w-50 mt-4 mb-4"
                            alt="ScaleCommerce · E-Commerce"
                        />
                    </div>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        {message && (
                            <div className="alert alert-danger">
                                <div className="alert-message">{message}</div>
                            </div>
                        )}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <Input
                                type="email"
                                onChange={(e) => this.handleChange(e.target)}
                                name={"email"}
                                value={email}
                                required="required"
                                autoFocus={true}
                                placeholder="Email"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="d-flex justify-content-between">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <a className="text-decoration-none" href={forgotPasswordLink}>
                                    Forgot your password?
                                </a>
                            </div>
                            <Input
                                id="input-password"
                                type="password"
                                name={"password"}
                                required="required"
                                value={password}
                                onChange={(e) => this.handleChange(e.target)}
                                placeholder="Password"
                            />
                            <div className="position-relative">
                                <a className="toggle-password" id="toggle-password" role="button">
                                    <div className="eye-icon">
                                        <i className="fas fa-eye icon" id="fas-eye-icon"></i>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                value={remember}
                                className="form-check-input"
                                name="remember"
                                onChange={(e) => this.handleChange(e.target)}
                                id="remember"
                            />
                            <label className="form-check-label" htmlFor="remember">
                                Remember me
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

LoginForm.propTypes = {
    forgotPasswordLink: PropTypes.string
};
