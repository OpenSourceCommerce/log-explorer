import React from "react";
import { FormField, Button } from ".";
import { UserActions } from "../actions";
import { TOAST_STATUS } from "../utils";

const MANDATORY_FIELDS = ["firstName", "lastName"];

export class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: "",
                lastName: "",
                email: "",
            },
            errors: [],
        };
    }

    componentDidMount() {
        this.setState({
            isLoading: true,
        });
        UserActions.getProfile().then((res) => {
            const { error, data } = res;
            if (error) {
                return;
            }

            const { first_name, last_name, email } = data;

            this.setState({
                user: {
                    firstName: first_name,
                    lastName: last_name,
                    email,
                },
                isLoading: false,
            });
        });
    }

    onFieldChange = ({ name, value }) => {
        this.setState((preState) => {
            const errors = [...preState.errors].filter((item) => item !== name);
            if (MANDATORY_FIELDS.includes(name) && !value) {
                errors.push(name);
            }
            return {
                user: {
                    ...preState.user,
                    [name]: value,
                },
                errors,
            };
        });
    };

    onSubmit = () => {
        const { user } = this.state;
        const { setToastMessage } = this.props;
        const errors = MANDATORY_FIELDS.filter((item) => !user[item]);
        if (errors.length > 0) {
            this.setState({ errors });
            return;
        }

        let toastContent = {};
        UserActions.updateMe({
            first_name: user.firstName,
            last_name: user.lastName,
        })
            .then((res) => {
                const { error } = res;
                if (error) {
                    return;
                    toastContent = {
                        color: TOAST_STATUS.failed,
                        message: "Update profile failed",
                    };
                }
                toastContent = {
                    color: TOAST_STATUS.success,
                    message: "Update profile successful",
                };
            })
            .catch((e) => {
                toastContent = {
                    color: TOAST_STATUS.failed,
                    message: "Update profile failed",
                };
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                });
                setToastMessage(toastContent);
            });
    }

    render() {
        const {
            user: { firstName, lastName, email },
            isLoading,
            errors,
        } = this.state;

        return (
            <div className="col-4 card">
                <div className="card-body mx-4">
                    <h5 className="mb-4">Update Profile</h5>
                    <form role="form">
                        <div className="row mb-3">
                            <FormField
                                className="col"
                                label="First name"
                                value={firstName}
                                placeholder="First name"
                                fieldName="firstName"
                                onChange={(e) => this.onFieldChange(e.target)}
                                isMandatory={MANDATORY_FIELDS.includes("firstName")}
                                errors={errors}
                            />
                            <FormField
                                className="col"
                                label="Last name"
                                value={lastName}
                                placeholder="Last name"
                                fieldName="lastName"
                                onChange={(e) => this.onFieldChange(e.target)}
                                isMandatory={MANDATORY_FIELDS.includes("lastName")}
                                errors={errors}
                            />
                        </div>
                        <FormField
                            className="mb-3"
                            label="E-Mail"
                            value={email}
                            placeholder="..."
                            fieldName="email"
                            disabled
                            onChange={(e) => this.onFieldChange(e.target)}
                            isMandatory={MANDATORY_FIELDS.includes("email")}
                            errors={errors}
                        />
                        <Button
                            className="float-end"
                            color="primary"
                            onClick={this.onSubmit}
                            isLoading={isLoading}
                            cy={"btnSave"}
                        >
                            Save Changes
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}
