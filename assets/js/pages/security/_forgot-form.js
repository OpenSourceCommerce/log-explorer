import React, {Component} from 'react';
// Import {ToastrHelper} from '../../components/_toastr';
// import {UserActions} from '../../actions';

export class ForgotForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: ''
        };
        // This.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
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

        /* UserActions.forgot(this.state.email)
            .then(response => {
                if (response.error === 0) {
                    ToastrHelper.success('Send request successful'));
                    this.reset();
                } else {
                    this.setState({
                        emailError: response.fields.email
                    });
                }
            }); */
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
                    <input className="form-control form-control-lg"
                        type="email"
                        id="email"
                        name="email"
                        value={this.state.email}
                        // OnChange={this.handleChange}
                        required="required"
                        autoFocus={true}
                        placeholder={'Enter your email'}/>
                </div>
                <div className="mt-3">
                    <button type="submit" className="btn btn-lg btn-primary">{'Reset'}</button>
                    <button className="ml-2 btn btn-lg btn-primary text-capitalize btn-back" onClick={() => {
                        console.log('clicked!!!!');
                    }}>{'Go Back'}</button>
                </div>
            </form>
        );
    }
}

