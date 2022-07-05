import React, { useContext, useState, useEffect } from "react";
import "./LoginComponent.css";
import Button from "../elements/Button/Button";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import AuthContext from "../context/AuthContext";

const LoginComponent = (props) => {
    const [email, setEmail] = useState("");
    const { loginUser, user } = useContext(AuthContext);

    function login() {
        loginUser(email);
    }

    useEffect(() => {
        if (user) {
            props.history.push("/");
        }
    }, [user]);

    return (
        <div className="login-component">
            <div className="login-form">
                <span className="login-title">Login</span>
                <div className="input-item-log">
                    <input
                        type="text"
                        className="log-input"
                        placeholder="Email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <Button
                    className={"gradient-btn log-btn"}
                    textContent={"Sign in"}
                    buttonHandler={() => {
                        login();
                    }}
                />
                <span className="reg-redirect">
                    Don't want to shop? Return home{" "}
                    <Link to="/" className="log-link">
                        here
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default withRouter(LoginComponent);
