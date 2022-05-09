import React, { Component } from "react";
import { Button, Modal, Size, Colors, FormField } from "../../components";
import { UserActions } from "../../actions";

const MANDATORY_FIELDS = ["firstName", "lastName", "email"];

const DEFAULT_USER = {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    isAdmin: false,
};

export class UserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: DEFAULT_USER,
            userPosition: null,
            errors: {},
            errorMessageRes: null,
            isLoading: false,
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { userPosition, user } = state;
        const { indexUserSelected, users } = props;

        let newUser = { ...user };

        let position = indexUserSelected;

        if (indexUserSelected !== userPosition) {
            if (indexUserSelected === null) {
                newUser = DEFAULT_USER;
            } else {
                const { id, first_name, last_name, email, is_admin } = users[indexUserSelected];

                newUser = {
                    id,
                    firstName: first_name,
                    lastName: last_name,
                    email,
                    isAdmin: is_admin == 1,
                };
            }
        }

        return {
            ...state,
            user: { ...newUser },
            userPosition: position,
        };
    }

    onChangeField = (name, value) => {
        this.setState((preState) => {
            const { user, errors } = preState;
            let newError = { ...errors };
            if (MANDATORY_FIELDS.includes(name)) {
                newError[name] = false;
                if (!value) newError[name] = true;
            }

            newError = Object.entries(newError).reduce((obj, [key, value]) => {
                if (value) obj[key] = value;
                return obj;
            }, {});

            return {
                user: {
                    ...user,
                    [name]: value,
                },
                errors: newError,
                errorMessageRes: null,
            };
        });
    };

    onSubmit = async () => {
        const { user } = this.state;

        const { onFinishEditUser } = this.props;

        let errorObj = Object.entries(user).reduce((obj, [key, value]) => {
            if (MANDATORY_FIELDS.includes(key) && !value) obj[key] = true;
            return obj;
        }, {});

        if (Object.keys(errorObj).length > 0) {
            this.setState({
                errors: { ...errorObj },
            });
            return;
        }

        const { id, firstName, lastName, email, isAdmin } = user;

        const userPayload = {
            first_name: firstName,
            last_name: lastName,
            email,
            is_admin: isAdmin ? 1 : 0,
        };

        let errorRes = null;

        this.setState({
            isLoading: true,
        })

        try {
            const res = await UserActions.createOrUpdate(id, userPayload);
            const { error, message } = res;
            const isUpdateUser = parseInt(id) >= 0;
            if (!error) {
                onFinishEditUser(user, isUpdateUser);
                return;
            }
            errorRes = message ? message : `${isUpdateUser ? "Update" : "Create"} user failed`;
        } catch (e) {
            errorRes = e.message;
        }
        if (errorRes) {
            this.setState({
                errorMessageRes: errorRes,
                isLoading: false,
            });
        }
    };

    render() {
        const { isLoading, errors, user, errorMessageRes } = this.state;

        const { id, firstName, lastName, email, isAdmin } = user;

        const { onHidden, isShow } = this.props;

        const isUpdateUser = parseInt(id) >= 0;

        return (
            <Modal
                id={`update-user-${id}`}
                size={Size.medium}
                title={`${isUpdateUser ? "Update" : "Create new"} user`}
                showCloseButton={false}
                show={isShow}
                isPositionCenter={true}
                onHidden={onHidden}
            >
                <form role="form" className="mx-4">
                    {errorMessageRes && (
                        <div className={`alert alert-danger`}>
                            <div className="alert-message">{errorMessageRes}</div>
                        </div>
                    )}
                    <FormField
                        className="mb-3"
                        label="First name"
                        value={firstName}
                        placeholder="First name"
                        fieldName="firstName"
                        onChange={(e) => this.onChangeField(e.target.name, e.target.value)}
                        isMandatory={MANDATORY_FIELDS.includes("firstName")}
                        errors={errors}
                    />
                    <FormField
                        className="mb-3"
                        label="Last name"
                        value={lastName}
                        placeholder="Last name"
                        fieldName="lastName"
                        onChange={(e) => this.onChangeField(e.target.name, e.target.value)}
                        isMandatory={MANDATORY_FIELDS.includes("lastName")}
                        errors={errors}
                    />
                    <FormField
                        className="mb-3"
                        label="E-mail"
                        value={email}
                        placeholder="E-mail"
                        fieldName="email"
                        onChange={(e) => this.onChangeField(e.target.name, e.target.value)}
                        isMandatory={MANDATORY_FIELDS.includes("email")}
                        errors={errors}
                    />
                    <FormField
                        id="isAdmin"
                        className="mb-3"
                        label="Role"
                        type="checkbox"
                        checkboxlabel="Is Admin"
                        checked={isAdmin}
                        fieldName="isAdmin"
                        onChange={(e) => this.onChangeField(e.target.name, e.target.check)}
                        isMandatory={MANDATORY_FIELDS.includes("isAdmin")}
                        errors={errors}
                    />
                    <Button
                        className="btn-block w-100 my-3"
                        color={Colors.blue}
                        onClick={() => this.onSubmit()}
                        isLoading={isLoading}
                        disabled={Object.keys(errors).length > 0 || errorMessageRes}
                    >
                        {`${isUpdateUser ? "Update" : "Create"} User`}
                    </Button>
                </form>
            </Modal>
        );
    }
}
