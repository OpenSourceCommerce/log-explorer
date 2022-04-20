import React, { Component } from "react";
import { UserActions } from "../../actions";
import { Input, Button, Colors, Image } from "../../components";
import Logo from "../../../images/light-logo.png";

import EmailSent from "./email-sent.json";
import { Player } from "@lottiefiles/react-lottie-player";
export class ForgotForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            emailError: "",
            emailSentSuccess: false,
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            this.setState({
                email: value,
            });
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();

        UserActions.forgot(this.state.email).then((response) => {
            if (response.error === 0) {
                this.reset();
                this.setState({
                    emailSentSuccess: true,
                });
            } else {
                this.setState({
                    message: {
                        type: "danger",
                        message: response.fields.email,
                    },
                });
            }
        });
    };

    reset = () => {
        this.setState({
            email: "",
        });
        $("#email").focus();
    }

    returnLogin = () => {
        window.location.href = "/";
    };

    render() {
        const { message, email, emailSentSuccess } = this.state;

        const EmailSentSuccess = () => (
            <div className="card-body text-center">
                <Player
                    src={EmailSent}
                    background="transparent"
                    speed="0.7"
                    style={{ width: "197px", height: "197px" }}
                    autoplay
                />
                <h4>We sent you an email</h4>

                <label className="w-75 mb-3">
                    Check your inbox for our mail and follow the steps described to retrieve your
                    password.
                </label>
            </div>
        );

        return (
            <div className="reset-form card">
                {!emailSentSuccess ? (
                    <>
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
                        <div className="card-body text-center">
                            <label className="w-75">
                                You forgot your password? Here you can easily retrieve a new
                                password.
                            </label>
                            <form className="ms-3 me-3" onSubmit={this.handleSubmit}>
                                {message && (
                                    <div className={`alert alert-${message.type}`}>
                                        <div className="alert-message">{message.message}</div>
                                    </div>
                                )}
                                <div className="form-group text-start">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={this.handleChange}
                                        required="required"
                                        autoFocus={true}
                                        placeholder={"Input your login email"}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="btn-block w-100 mt-3"
                                    color={Colors.blue}
                                >
                                    Reset Password
                                </Button>
                                <button
                                    className="btn text-primary w-100 mt-3"
                                    role="link"
                                    onClick={this.returnLogin}
                                >
                                    Return to Login
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <EmailSentSuccess />
                )}
            </div>
        );
    }
}
