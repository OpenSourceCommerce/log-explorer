import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UserActions } from '../../actions';

export class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            remember: false,
            message: '',
            hidePassword: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        if (e.target.name === 'email') {
            this.setState({
                email: e.target.value,
            });
        }

        if (e.target.name === 'password') {
            this.setState({
                password: e.target.value,
            });
        }

        if (e.target.name === '_remember_me') {
            this.setState({
                remember: e.target.checked,
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const {email, password, remember} = this.state;
        UserActions.login(email, password, remember).then(response => {
            if (response.error === 0) {
                if (typeof response.redirect !== undefined) {
                    window.location.href = response.redirect;
                } else {
                    window.location.href = '/';
                }
            } else {
                this.setState({
                    message: response.message,
                });
            }
        });
    }

    render() {
        const {message, email, remember, hidePassword} = this.state;
        const forgotUrl = '/forgot';
        return (
            <form onSubmit={this.handleSubmit}>
                {message &&
                <div className="alert alert-danger">
                    <div className="alert-message">
                        {message}
                    </div>
                </div>
                }
                <div className="input-group mb-3">
                    <input type="email" className="form-control"
                           onChange={this.handleChange}
                           name={'email'}
                           value={email}
                           required="required"
                           autoFocus={true}
                           placeholder="Email"/>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <span className="fas fa-envelope"/>
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <input type="password" className="form-control"
                           placeholder="Password"/>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <span className="fas fa-lock"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <div className="icheck-primary">
                            <input type="checkbox" id="remember"/>
                            <label htmlFor="remember">
                                Remember Me
                            </label>
                        </div>
                    </div>
                    <div className="col-4">
                        <button type="submit"
                                className="btn btn-primary btn-block">Sign In
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

LoginForm.propTypes = {
    message: PropTypes.string,
    email: PropTypes.string,
    remember: PropTypes.bool,
    hidePassword: PropTypes.bool,
};
