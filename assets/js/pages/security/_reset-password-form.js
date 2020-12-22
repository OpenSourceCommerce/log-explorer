import React, {Component} from 'react';
// Import {UserActions} from '../../actions';
// import {ToastrHelper, Password} from '../../components';
// import {Response, ValidatorHelper} from '../..';

export class ResetPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: {},
            message: ''
        };
        // This.childrenMount = this.childrenMount.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
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

        /* If (!$('#forgot').valid()) {

        } */

        /* UserActions.setPassword(this.state.password.getValues(), this.getToken())
            .then(response => {
                if (response.error === 0) {
                    setTimeout(() => {
                        window.location.href = response.redirect;
                    }, 3000);
                    this.reset();
                    ToastrHelper.success(trans('Reset successful'));
                } else {
                    if (response.message !== undefined) {
                        this.setState({
                            message: response.message
                        });
                    }

                    this.state.password.setErrors(Response.parseError(response));
                }
            }); */
    }

    componentDidMount() {
        // This.initValidator();
    }

    initValidator() {
        /* Const rules = $.extend({}, Password.getRules());
        const messages = $.extend({}, Password.getMessages());
        ValidatorHelper.init('#forgot', rules, messages); */
    }

    getToken() {
        return $('#token').val();
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
                {this.state.message &&
                <div className="alert alert-danger">
                    <div className="alert-message">
                        {this.state.message}
                    </div>
                </div>
                }
                {/* <Password onMount={this.childrenMount} /> */}
                <div className="mt-3">
                    <button type="submit" className="btn btn-lg btn-primary">{'Reset'}</button>
                </div>
            </form>
        );
    }
}
