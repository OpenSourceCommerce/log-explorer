import React, { useEffect, useState } from "react";
import { Button, Colors, Image, InputPasswordComponent } from "../../components";
import { UserActions, ValidatorHelper, Alert } from "../../actions";
import PropTypes from "prop-types";
import Logo from "../../../images/light-logo.png";
// Import {ToastrHelper, Password} from '../../components';
// import {Response, ValidatorHelper} from '../..';

export const ResetPasswordForm = ({ token, loginLink }) => {
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [message, setMessage] = useState();

    useEffect(() => {
        const rules = $.extend({}, getRules());
        const messages = $.extend({}, getMessages());
        ValidatorHelper.init("#forgot", rules, messages);
    }, []);

    const getMessages = () => {
        return {};
    };

    const getRules = () => {
        return {
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await UserActions.setPassword(password, token);
        if (response.error === 0) {
            Alert.success("Your password has been updated successfully.");
            setTimeout(() => {
                window.location.href = response.redirect;
            }, 3000);

            reset();
            // ToastrHelper.success('Reset successful');
        } else {
            if (response.message) {
                setMessage(response.message);
            }
        }
    };

    const reset = () => {
        setPassword();
        setMessage();
    };

    return (
        <div className="card reset-password-form">
            <div className="card-header bg-white">
                <a
                    href="/"
                    className=" d-flex flex-column w-100 justify-content-center align-items-center"
                >
                    <Image
                        src={Logo}
                        className="login-logo w-50 mt-4 mb-4"
                        alt="ScaleCommerce · E-Commerce"
                    />
                </a>
            </div>
            <div className="card-body">
                <form id="forgot" onSubmit={handleSubmit}>
                    <p className="login-box-msg text-center">
                        You are only one step a way from your new password, recover your password
                        now.
                    </p>
                    {message && (
                        <div className="alert alert-danger">
                            <div className="alert-message">{message}</div>
                        </div>
                    )}
                    <InputPasswordComponent
                        id="password"
                        fieldName="password"
                        value={password}
                        label="Password"
                        className="input-password"
                        placeholder="Input your new password"
                        onChange={(e) => setPassword(e.target?.value)}
                        helpText="Minimum 8 characters, at least one uppercase letter, one lowercase
                            letter, one number and one special character."
                    />
                    <InputPasswordComponent
                        id="confirm_password"
                        fieldName="confirmPassword"
                        value={confirmPassword}
                        label="Repeat password"
                        className="input-password"
                        placeholder="Repeat your new password"
                        onChange={(e) => setConfirmPassword(e.target?.value)}
                    />
                    <div className="my-3">
                        <Button type="submit" className="btn-block w-100" color={Colors.blue}>
                            {"Reset"}
                        </Button>
                    </div>
                    <div className="text-center">
                        <a className="text-decoration-none w-100" href={loginLink}>
                            Return to Login
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

ResetPasswordForm.propTypes = {
    loginLink: PropTypes.string,
    token: PropTypes.string.isRequired,
};
