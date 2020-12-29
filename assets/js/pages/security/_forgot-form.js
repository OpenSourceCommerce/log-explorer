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
            } else {
                this.setState({
                    emailError: response.fields.email
                });
            }
        });
    }

    reset() {
        this.setState({
            email: '',
            emailError: ''
        });
        $('#email').focus();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.state.emailError &&
                <div className="alert alert-danger">
                    <div className="alert-message">
                        {this.state.emailError}
                    </div>
                </div>
                }
                <div className="form-group">
                    <Input type="email"
                        id="email"
                        name="email"
                        value={this.state.email}
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

