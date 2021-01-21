import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {WIDGET_TYPE} from "../../utils";
import {Input, Button, Text, ResponsiveGridLayout,WidgetManagement} from '../../components';
import {Alert, UserActions} from '../../actions';

class ProfileForm extends Component {
    constructor(props) {
        super(props);

        //data structure
        const widgetList = [
            {
                layout: {i: "1", x: 0, y: 0, w: 3, h: 2, minW: 3, minH: 2, static: true},
                dataWidget: [
                    {label: 'Mobile', value: 2000},
                    {label: 'Desktop', value: 700},
                    {label: 'Bot', value: 350},
                    {label: 'Botm', value: 34},
                ],
                widgetHeader: 'Devices and Machine',
                widgetType: 'doughnut',
            }, {
                layout: {i: "b", x: 3, y: 0, w: 3, h: 2, minW: 3, minH: 2},
                dataWidget: [
                    {label: 'Mobile', value: 2000},
                    {label: 'Desktop', value: 700},
                    {label: 'Bot', value: 350},
                    {label: 'Botm', value: 34},
                ],
                widgetHeader: 'Devices',
                widgetType: 'pie',
            }, {
                layout: {i: "c", x: 6, y: 0, w: 3, h: 2, minW: 3, minH: 2},
                dataWidget: [
                    {label: 'Mobile', value: 2000},
                    {label: 'Desktop', value: 700},
                    {label: 'Bot', value: 350},
                    {label: 'Botm', value: 34},
                ],
                widgetHeader: 'Devices',
                widgetType: 'pie',
            }, {
                layout: {i: "d", x: 0, y: 2, w: 3, h: 2, minW: 3, minH: 2},
                dataWidget: [
                    {label: 'Mobile', value: 2000},
                    {label: 'Desktop', value: 700},
                    {label: 'Bot', value: 350},
                    {label: 'Botm', value: 34},
                ],
                widgetHeader: 'Devices',
                widgetType: 'pie',
            }, {
                layout: {i: "e", x: 3, y: 2, w: 3, h: 2, minW: 3, minH: 2},
                dataWidget: [
                    {label: 'Mobile', value: 2000},
                    {label: 'Desktop', value: 700},
                    {label: 'Bot', value: 350},
                    {label: 'Botm', value: 34},
                ],
                widgetHeader: 'Devices',
                widgetType: 'doughnut',
            }, {
                layout: {i: "h", x: 6, y: 2, w: 3, h: 2, minW: 3, minH: 2},
                dataWidget: [
                    {label: 'Mobile', value: 2000},
                    {label: 'Desktop', value: 700},
                    {label: 'Bot', value: 350},
                    {label: 'Botm', value: 34},
                ],
                widgetHeader: 'Devices',
                widgetType: 'doughnut',
            },{
                layout: {i: "i", x: 0, y: 4, w: 3, h: 2, minW: 3, minH: 2},
                dataWidget: [
                    {label: 'Mobile', value: 2000},
                    {label: 'Desktop', value: 700},
                    {label: 'Bot', value: 350},
                    {label: 'Botm', value: 34},
                ],
                widgetHeader: 'Devices',
                widgetType: 'doughnut',
            }, {
                layout: {i: "j", x: 3, y: 4, w: 3, h: 1, minW: 3, minH: 1},
                dataWidget: [
                    {label: 'Mobile', value: 872966},
                ],
                widgetHeader: 'Devices',
               widgetType: 'counterSum',
            }, {
                layout: {i: "k", x: 6, y: 4, w: 3, h: 1, minW: 3, minH: 1},
                dataWidget: [
                    {label: 'Des', value: 392423482},
                ],
                widgetHeader: 'Devices',
                widgetType: 'counterSum',
            }, {
                layout: {i: "l", x: 0, y: 6, w: 3, h: 3, minW: 3, minH: 3},
                dataWidget: [
                    {label: 'Mobile', value: 2000},
                    {label: 'Desktop', value: 700},
                    {label: 'Bot', value: 350},
                    {label: 'Botm', value: 34},
                    {label: 'Botm', value: 34},
                    {label: 'Botm', value: 34},
                    {label: 'Botm', value: 34},
                    {label: 'Botm', value: 34},
                    {label: 'Botm', value: 34},
                    {label: 'Botm', value: 34},
                ],
                widgetHeader: 'Devices and Machine',
                widgetType: WIDGET_TYPE.table,
            }, {
                layout: {i: "m", x: 0, y: 0, w: 3, h: 1, minW: 3, minH: 1},
                dataWidget: [
                    {label: 'Des', value: 392423482},
                ],
                widgetHeader: 'Devices',
                widgetType: 'counterSum',
            },{
                layout: {i: "n", x: 0, y: 0, w: 3, h: 2, minW: 3, minH: 2},
                dataWidget: [
                    {label: 'Mobile', value: 2000},
                    {label: 'Desktop', value: 700},
                    {label: 'Bot', value: 350},
                    {label: 'Botm', value: 34},
                ],
                widgetHeader: 'Devices',
                widgetType: 'doughnut',
            }

        ]


        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            firstNameError: false,
            lastNameError: false,
            widgetList,
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
        const {firstName, lastName, email, isLoading, firstNameError, lastNameError, widgetList} = this.state;
        return (
            <div className="user container-fluid">
                <WidgetManagement
                    addNew={(widgetList) => {
                        this.setState({
                            widgetList,
                        })
                    }}
                    widgetList={widgetList}
                    key={widgetList}
                />
                <ResponsiveGridLayout data={widgetList}/>
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
