import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {WIDGET_TYPE} from "../../utils";
import {Input, Button, Text, ResponsiveGridLayout,WidgetManagement} from '../../components';
import {Alert, UserActions} from '../../actions';

class ProfileForm extends Component {
    constructor(props) {
        super(props);

        //data structure



        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            firstNameError: false,
            lastNameError: false,
        };
        this.onTextChange = this.onTextChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    loadUser() {
        const that = this;
        this.setState({
            isLoading: true
        });
        UserActions.getProfile()
            .then(res => {
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
                    lastNameError: false
                });
            });
    }

    componentDidMount() {
        this.loadUser();
    }

    onTextChange(e) {
        const state = {};
        state[e.target.name] = e.target.value;
        state[e.target.name + 'Error'] = false;
        this.setState(state);
    }

    onSubmit() {
        let hasError = false;
        let {firstName, lastName, email} = this.state;
        firstName = $.trim(firstName);
        lastName = $.trim(lastName);
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

        if (!hasError) {
            this.setState({
                isLoading: true
            });
            const that = this;
            UserActions.updateMe({
                first_name: firstName,
                last_name: lastName
            }).then(res => {
                const {error} = res;
                if (error) {
                    return;
                }

                Alert.success('Update successful');
            }).finally(() => {
                that.setState({
                    isLoading: false
                });
            });
        }
    }

    render() {
        const {firstName, lastName, email, isLoading, firstNameError, lastNameError} = this.state;
        return (
            <div className="user container-fluid">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title align-items-center p-2">Update profile</h3>
                        <Button className="float-right" color={'success'}
                            onClick={this.onSubmit} isLoading={isLoading}>
                            Update
                        </Button>

                    </div>
                    <div className="card-body">
                        <form role="form">
                            <div className="form-group">
                                <label>Email</label>
                                <Text className={'ml-3'}>{email}</Text>
                            </div>
                            <div className="form-group">
                                <label>First name</label>
                                <Input className={firstNameError ? 'is-invalid' : ''} required={true} name={'firstName'} placeholder="First name" value={firstName} onChange={this.onTextChange}/>
                            </div>
                            <div className="form-group">
                                <label>Last name</label>
                                <Input className={lastNameError ? 'is-invalid' : ''} required={true} name={'lastName'} placeholder="Last name" value={lastName} onChange={this.onTextChange}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<ProfileForm/>, document.querySelector('#root'));
