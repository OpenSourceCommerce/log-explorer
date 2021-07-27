import React, {Component} from 'react';
import {Button, Colors, Input, Icon} from '../../components';
import {UserActions, ValidatorHelper, Alert} from '../../actions';
import PropTypes from 'prop-types';
// Import {ToastrHelper, Password} from '../../components';
// import {Response, ValidatorHelper} from '../..';

export class ResetPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: {},
            message: ''
        };
        // This.childrenMount = this.childrenMount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    childrenMount(e) {
        /* If (e instanceof Password) {
            this.setState({
                password: e
            });
        } */
    }

    handleSubmit(e) {
        e.preventDefault();
        const {token} = this.props;
        const {password} = this.state;

        UserActions.setPassword(password, token).then(response => {
            if (response.error === 0) {
                Alert.success('Your password has been updated successfully.')
                setTimeout(() => {
                    window.location.href = response.redirect;
                }, 3000);
                this.reset();
                // ToastrHelper.success('Reset successful');
            } else {
                if (response.message !== undefined) {
                    this.setState({
                        message: response.message
                    });
                }

                this.state.password.setErrors(Response.parseError(response));
            }
        });
    }

    componentDidMount() {
        this.initValidator();
    }

    initValidator() {
        const rules = $.extend({}, this.getRules());
        const messages = $.extend({}, this.getMessages());
        ValidatorHelper.init('#forgot', rules, messages);
    }

    getRules() {
        return {
            password: {
                required: true,
                passwordCapitalCharacters: true,
                minlength: 8
            },
            confirm_password: {
                required: true,
                equalTo: '#password'
            }
        };
    }

    getMessages() {
        return {};
    }

    handleChange(e) {
        if (e.target.name === 'password') {
            this.setState({
                password: e.target.value
            });
        } else if (e.target.name === 'confirm_password') {
            this.setState({
                confirm_password: e.target.value
            });
        }
    }

    reset() {
        this.state.password.reset();
        this.setState({
            message: ''
        });
    }

    render() {
        return (
            <form id="forgot" onSubmit={this.handleSubmit}>
                {this.state.emailError &&
                <div className="alert alert-danger">
                    <div className="alert-message">
                        {this.state.emailError}
                    </div>
                </div>
                }
                <div className="form-group">
                    <div className="input-group mb-3">
                        <Input type="password"
                            id="password"
                            name="password"
                            onChange={this.handleChange}
                            required="required"
                            autoFocus={true}
                            placeholder={'Password'}/>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <Icon name={'lock'}/>
                            </div>
                        </div>
                    </div>
                    <small className="form-text text-muted">Minimum eight characters, at least one special character.</small>
                </div>
                <div className="form-group">
                    <div className="input-group mb-3">
                        <Input type="password"
                            id="confirm_password"
                            name="confirm_password"
                            onChange={this.handleChange}
                            required="required"
                            autoFocus={true}
                            placeholder={'Confirm Password'}/>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <Icon name={'lock'}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <Button type="submit" className={'btn-block'}
                        color={Colors.blue}>{'Reset'}</Button>
                </div>
            </form>
        );
    }
}

ResetPasswordForm.propTypes = {
    token: PropTypes.string.isRequired
};
