import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Input, Button, Checkbox} from '../../components';
import {Alert, UserActions} from '../../actions';

class UserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: window.user ? window.user : '',
            firstName: '',
            lastName: '',
            email: '',
            isAdmin: false
        };
        this.onTextChange = this.onTextChange.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    loadUser(id) {
        const that = this;
        this.setState({
            isLoading: true
        });
        UserActions.getUser(id)
            .then(res => {
                const {error, data} = res;
                if (error) {
                    return;
                }

                const {first_name, last_name, email, is_admin} = data;

                that.setState({
                    firstName: first_name,
                    lastName: last_name,
                    email,
                    isAdmin: is_admin == 1,
                    isLoading: false,
                    firstNameError: false,
                    lastNameError: false,
                    emailError: false
                });
            });
    }

    componentDidMount() {
        const {id} = this.state;
        if (id) {
            this.loadUser(id);
        }
    }

    onTextChange(e) {
        const state = {};
        state[e.target.name] = e.target.value;
        state[e.target.name + 'Error'] = false;
        this.setState(state);
    }

    onCheckboxChange(e) {
        this.setState({
            isAdmin: e.target.checked
        });
    }

    onSubmit() {
        let hasError = false;
        let {id, firstName, lastName, email, isAdmin} = this.state;
        firstName = $.trim(firstName);
        lastName = $.trim(lastName);
        email = $.trim(email);
        if (firstName === '') {
            this.setState({
                firstNameError: true
            });
            hasError = true;
        }

        if (lastName === '') {
            this.setState({
                lastNameError: true
            });
            hasError = true;
        }

        if (email === '') {
            this.setState({
                emailError: true
            });
            hasError = true;
        }

        if (!hasError) {
            this.setState({
                isLoading: true
            });
            const that = this;
            UserActions.createOrUpdate(id, {
                first_name: firstName,
                last_name: lastName,
                email,
                is_admin: isAdmin ? 1 : 0
            }).then(res => {
                const {error, redirect} = res;
                if (error) {
                    return;
                }

                if (redirect) {
                    window.location.href = redirect;
                } else {
                    Alert.success('Update successful');
                }
            }).finally(() => {
                that.setState({
                    isLoading: false
                });
            });
        }
    }

    render() {
        const {id, firstName, lastName, email, isAdmin, isLoading, firstNameError, lastNameError, emailError} = this.state;

        return (
            <div className="user container-fluid">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title align-items-center p-2">{id === '' ? 'Create new user' : 'Update user'}</h3>
                        <Button className="float-right" color={'success'}
                            onClick={this.onSubmit} isLoading={isLoading}>
                            {id === '' ? 'Create user' : 'Update user'}
                        </Button>

                    </div>
                    <div className="card-body">
                        <form role="form">
                            <div className="form-group">
                                <label>First name</label>
                                <Input className={firstNameError ? 'is-invalid' : ''} required={true} name={'firstName'} placeholder="First name" value={firstName} onChange={this.onTextChange}/>
                            </div>
                            <div className="form-group">
                                <label>Last name</label>
                                <Input className={lastNameError ? 'is-invalid' : ''} required={true} name={'lastName'} placeholder="Last name" value={lastName} onChange={this.onTextChange}/>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <Input className={emailError ? 'is-invalid' : ''} required={true} type={'email'} name={'email'} placeholder="Email" value={email} onChange={this.onTextChange}/>
                            </div>
                            <div className="form-group">
                                <label>Role</label>
                                <Checkbox id={'isAdmin'} name={'isAdmin'} value={'1'} checked={isAdmin} onChange={this.onCheckboxChange} label={'Is Admin'} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<UserForm/>, document.querySelector('#root'));
