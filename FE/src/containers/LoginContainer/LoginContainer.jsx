import React from "react";
import LoginComponent from "../../components/LoginComponent/LoginComponent";
import "./LoginContainer.css";

const LoginContainer = (props) => {
    return (
        <div className="login-container">
            <LoginComponent />
        </div>
    );
};

export default LoginContainer;
