import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Input, Button, Text } from '../../components';
import { Alert, UserActions, ValidatorHelper } from '../../actions';

class ChangePasswordForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current_password: '',
            password: '',
            confirm_password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    loadUser() {
        const that = this;
        this.setState({
            isLoading: true,
        });
        UserActions.getProfile().then(res => {
            const {error, data} = res;
            if (error) {
                return;
            }

            const {first_name, last_name, email} = data;

            that.setState({
                firstName: first_name,
                lastName: last_name,
                email,
                isLoading: false,
                firstNameError: false,
                lastNameError: false,
            });
        });
    }

    componentDidMount() {
        // this.loadUser();
        this.initValidator();
    }

    handleChange(e) {
        const state = {};
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit(e) {
        e.preventDefault();
        let hasError = false;
        let {current_password, password} = this.state;

        if (!hasError) {
            this.setState({
                isLoading: true,
            });
            const that = this;
            UserActions.changePassword(current_password, password).then(res => {
                const {error} = res;
                if (error) {
                    return;
                }

                Alert.success('Update successful');
            }).finally(() => {
                that.setState({
                    isLoading: false,
                    current_password: '',
                    password: '',
                    confirm_password: '',
                });
            });
        }
    }

    initValidator() {
        const rules = $.extend({}, this.getRules());
        const messages = $.extend({}, this.getMessages());
        ValidatorHelper.init('#change-password', rules, messages);
    }

    getRules() {
        return {
            current_password: {
                required: true,
                passwordCapitalCharacters: true,
                minlength: 8,
            },
            password: {
                required: true,
                passwordCapitalCharacters: true,
                minlength: 8,
            },
            confirm_password: {
                required: true,
                equalTo: '#password',
            },
        };
    }

    getMessages() {
        return {};
    }

    render() {
        const {isLoading, current_password, password, confirm_password} = this.state;

        return (
            <div className="user container-fluid">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title align-items-center p-2">Change Password</h3>
                    </div>
                    <div className="card-body">
                        <form id={'change-password'} onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Current Password</label>
                                <Input type={'password'}
                                       required={true}
                                       name={'current_password'}
                                       id={'current_password'}
                                       value={current_password}
                                       placeholder="Current Password"
                                       onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <Input type={'password'}
                                       required={true}
                                       name={'password'}
                                       id={'password'}
                                       value={password}
                                       placeholder="Current Password" onChange={this.handleChange}/>
                                <small className="form-text text-muted">Minimum eight characters, at
                                    least one uppercase letter, one lowercase letter, one number and
                                    one special character.</small>
                            </div>
                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <Input type={'password'}
                                       name={'confirm_password'}
                                       id={'confirm_password'}
                                       value={confirm_password}
                                       placeholder="Current Password"
                                       onChange={this.handleChange}/>
                            </div>
                            <Button type={'submit'} className="float-right" color={'success'}
                                    isLoading={isLoading}>
                                Update
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const root = document.querySelector('#root');
ReactDOM.render(<ChangePasswordForm {...root.dataset}/>, root);
