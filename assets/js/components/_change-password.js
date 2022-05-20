import React, { Component } from "react";
import { Button, FormField } from "./";
import { Alert, UserActions, ValidatorHelper } from "../actions";

const DEFAULT_VALUE = {
    current_password: "",
    password: "",
    confirm_password: "",
};

const MANDATORY_FIELDS = ["current_password", "password", "current_password"];

const InputPasswordComponent = ({ fieldName, helpText, ...props }) => {
    return (
        <div className="mb-3">
            <FormField
                type="password"
                fieldName={fieldName}
                isMandatory={MANDATORY_FIELDS.includes(fieldName)}
                {...props}
            />
            <div className="position-relative">
                <a className="toggle-password" id="toggle-password" role="button">
                    <div className="eye-icon">
                        <i className="fas fa-eye icon" id="fas-eye-icon"></i>
                    </div>
                </a>
            </div>
            {helpText && <small className="form-text text-muted">{helpText}</small>}
        </div>
    );
};

export class ChangePasswordForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...DEFAULT_VALUE,
            isLoading: false,
            errors: [],
        };
    }

    componentDidMount() {
        this.initValidator();
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        console.log(this.state);
        this.setState((preState) => ({
            ...preState,
            [name]: value,
        }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        const hasError = false;
        const { current_password, password } = this.state;

        if (!hasError) {
            this.setState({
                isLoading: true,
            });

            UserActions.changePassword(current_password, password)
                .then((res) => {
                    const { error } = res;
                    if (error) {
                        return;
                    }

                    Alert.success("Update successful");
                })
                .finally(() => {
                    this.setState({
                        isLoading: false,
                        current_password: "",
                        password: "",
                        confirm_password: "",
                    });
                });
        }
    };

    initValidator() {
        const rules = $.extend({}, this.getRules());
        const messages = $.extend({}, this.getMessages());
        ValidatorHelper.init("#change-password", rules, messages);
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
                equalTo: "#password",
            },
        };
    }

    getMessages() {
        return {};
    }

    render() {
        const { isLoading, current_password, password, confirm_password } = this.state;

        return (
            <div className="col-4 card mt-3">
                <div className="card-body mx-4">
                    <h5 className="mb-4">Change Password</h5>
                    <form id={"change-password"} onSubmit={this.onSubmit}>
                        <InputPasswordComponent
                            id="current_password"
                            fieldName="current_password"
                            className="input-password"
                            value={current_password}
                            label="Old password"
                            placeholder="Input your old password"
                            onChange={this.handleChange}
                        />
                        <InputPasswordComponent
                            id="password"
                            fieldName="password"
                            value={password}
                            label="Password"
                            className="input-password"
                            placeholder="Input your new password"
                            onChange={this.handleChange}
                            helpText="Minimum 8 characters, at least one uppercase letter, one lowercase
                            letter, one number and one special"
                        />
                        <InputPasswordComponent
                            id="confirm_password"
                            fieldName="confirm_password"
                            value={confirm_password}
                            label="Repeat password"
                            className="input-password"
                            placeholder="Repeat your new password"
                            onChange={this.handleChange}
                        />
                        <Button
                            type={"submit"}
                            className="float-end"
                            color={"primary"}
                            isLoading={isLoading}
                        >
                            Save Changes
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}
