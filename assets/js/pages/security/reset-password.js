import React from "react";
import ReactDOM from "react-dom";
import { ResetPasswordForm } from "./_reset-password-form";

const ResetPassword = (props) => {
    return (
        <div className="reset-password-screen min-vh-100 d-flex flex-column min-vh-100 justify-content-center align-items-center authentication-background">
            <div className="reset-password-component">
                <ResetPasswordForm {...props}/>
            </div>
        </div>
    );
};

const root = document.querySelector("#root");
ReactDOM.render(<ResetPassword {...root.dataset} />, root);
