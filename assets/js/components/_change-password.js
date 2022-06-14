import React, { Component } from "react";
import { Button, FormField } from "./";
import { UserActions, ValidatorHelper } from "../actions";
import { TOAST_STATUS } from "../utils";

const DEFAULT_VALUE = {
    current_password: "",
    password: "",
    confirm_password: "",
};

const MANDATORY_FIELDS = ["current_password", "password", "confirm_password"];

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
            {helpText && <div className="form-text text-muted fw-light px-3 m-0">{helpText}</div>}
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
        this.setState((preState) => ({
            ...preState,
            [name]: value,
        }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        const hasError = false;
        const { current_password, password } = this.state;
        const { setToastMessage } = this.props;

        if (!hasError) {
            this.setState({
                isLoading: true,
            });

            let toastContent = {}

            UserActions.changePassword(current_password, password)
                .then((res) => {
                    const { error } = res;
                    if (error) {
                        toastContent = {
                            color: TOAST_STATUS.failed,
                            message: "Change password failed",
                        };
                        return;
                    }

                    toastContent = {
                        color: TOAST_STATUS.success,
                        message: "Change password successful",
                    };
                })
                .catch((e) => {
                    toastContent = {
                        color: TOAST_STATUS.failed,
                        message: "Change password failed",
                    };
                })
                .finally(() => {
                    this.setState({
                        isLoading: false,
                        current_password: "",
                        password: "",
                        confirm_password: "",
                    });
                    setToastMessage(toastContent);
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

        const isDisableSaveButton = MANDATORY_FIELDS.find(item => !this.state[item]);

        return (
            <div className="change-password col-12 col-md-5 card mt-3 border-0 rounded-0">
                <div className="card-body mx-4">
                    <h5 className="header mb-3">Change Password</h5>
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
                            letter, one number and one special character."
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
                            disabled={isDisableSaveButton}
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
