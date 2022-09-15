import React from "react";
import { FormField, Button } from ".";
import { UserActions } from "../actions";
import { TOAST_STATUS } from "../utils";
import isEqual from "lodash/isEqual";

const MANDATORY_FIELDS = ["firstName", "lastName"];
const DEFAULT_USER_DATA = {
    firstName: "",
    lastName: "",
    email: "",
};
export class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: DEFAULT_USER_DATA,
            oldUserData: DEFAULT_USER_DATA,
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

            const user = {
                firstName: first_name,
                lastName: last_name,
                email,
            };

            this.setState({
                user,
                oldUserData: user,
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
                    oldUserData: user,
                });
                setToastMessage(toastContent);
            });
    };

    render() {
        const { user, isLoading, errors, oldUserData } = this.state;

        const { firstName, lastName, email } = user;

        const isDisableSaveButton = errors.length > 0 || isEqual(user, oldUserData);

        return (
            <div className="update-profile col-12 col-md-5 card border-0 rounded-0">
                <div className="card-body mx-4">
                    <h5 className="header mb-3">Update Profile</h5>
                    <form role="form">
                        <FormField
                            className="mb-3"
                            label="First name"
                            value={firstName}
                            placeholder="First name"
                            fieldName="firstName"
                            onChange={(e) => this.onFieldChange(e.target)}
                            isMandatory={MANDATORY_FIELDS.includes("firstName")}
                            errors={errors}
                        />
                        <FormField
                            className="mb-3"
                            label="Last name"
                            value={lastName}
                            placeholder="Last name"
                            fieldName="lastName"
                            onChange={(e) => this.onFieldChange(e.target)}
                            isMandatory={MANDATORY_FIELDS.includes("lastName")}
                            errors={errors}
                        />
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
                            disabled={isDisableSaveButton}
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
