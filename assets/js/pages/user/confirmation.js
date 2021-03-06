import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Input, Button, CardHeader} from '../../components';
import {UserActions} from '../../actions';

class UserConfirmationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: window.token ? window.token : '',
            password: '',
            rePassword: '',
            isLoading: false
        };
        this.onTextChange = this.onTextChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onTextChange(e) {
        const state = {};
        state[e.target.name] = e.target.value;
        state[e.target.name + 'Error'] = false;
        this.setState(state);
    }

    onSubmit() {
        let hasError = false;
        let {token, password, rePassword} = this.state;
        password = $.trim(password);
        rePassword = $.trim(rePassword);
        if (password === '') {
            this.setState({
                passwordError: true
            });
            hasError = true;
        }

        if (rePassword !== password) {
            this.setState({
                rePasswordError: true
            });
            hasError = true;
        }

        if (!hasError) {
            this.setState({
                isLoading: true
            });
            const that = this;
            UserActions.confirm(token, {
                password
            }).then(res => {
                const {error, redirect} = res;
                if (error) {
                    return;
                }

                window.location.href = redirect;
            }).finally(() => {
                that.setState({
                    isLoading: false
                });
            });
        }
    }

    render() {
        const {password, rePassword, passwordError, rePasswordError, isLoading} = this.state;

        return (
            <div className="user container-fluid">
                <div className="card">
                    <CardHeader title={'Confirmation'} showCollapseButton={false} showRemoveButton={false} />
                    <div className="card-body">
                        <form role="form">
                            <div className="form-group">
                                <p>To complete activation your account, please create your password</p>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <Input type={'password'} className={passwordError ? 'is-invalid' : ''} required={true} name={'password'} placeholder="Password" value={password} onChange={this.onTextChange}/>
                                <small className="form-text text-muted">Minimum eight characters, at
                                    least one uppercase letter, one lowercase letter, one number and
                                    one special character.</small>
                            </div>
                            <div className="form-group">
                                <label>Repeat your password</label>
                                <Input type={'password'} className={rePasswordError ? 'is-invalid' : ''} required={true} name={'rePassword'} placeholder="Repeat your password" value={rePassword} onChange={this.onTextChange}/>
                            </div>
                            <div className="form-group">
                                <Button onClick={this.onSubmit} isLoading={isLoading}>Set password</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<UserConfirmationForm/>, document.querySelector('#root'));
