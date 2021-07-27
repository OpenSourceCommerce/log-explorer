import React, {Component} from 'react';
import {UserActions} from '../../actions';
import {Input, Button, Colors} from '../../components';

export class ForgotForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        if (e.target.name === 'email') {
            this.setState({
                email: e.target.value
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        UserActions.forgot(this.state.email).then(response => {
            if (response.error === 0) {
                this.reset();
                this.setState({
                    message: {
                        type: 'success',
                        message: 'We have sent you an email to reset your password. Please follow the instruction to reset your password!'
                    }
                });
            } else {
                this.setState({
                    message: {
                        type: 'danger',
                        message: response.fields.email
                    }
                });
            }
        });
    }

    reset() {
        this.setState({
            email: '',
        });
        $('#email').focus();
    }

    render() {
        const {message, email} = this.state

        return (
            <form onSubmit={this.handleSubmit}>
                {message &&
                <div className={`alert alert-${message.type}`}>
                    <div className="alert-message">
                        {message.message}
                    </div>
                </div>
                }
                <div className="form-group">
                    <Input type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        required="required"
                        autoFocus={true}
                        placeholder={'Enter your email'}/>
                </div>
                <div className="mt-3">
                    <Button type="submit" className={'btn-block'}
                        color={Colors.blue}>{'Reset'}</Button>
                </div>
            </form>
        );
    }
}

