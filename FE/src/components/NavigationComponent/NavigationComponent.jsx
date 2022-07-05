import React, { useContext } from "react";
import "./NavigationComponent.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import AuthContext from "../context/AuthContext";

const NavigationComponent = (props) => {
    const { user, logoutUser } = useContext(AuthContext);
    return (
        <div className="nav-container">
            <div className="nav-content">
                <div className="logo-container">
                    <Link to="/" className="logo">
                        MOBILNI TELEFONI
                    </Link>
                </div>
                <div className="links">
                    <Link to="/" className="link">
                        Home
                    </Link>
                    <Link to="/products" className="link">
                        Products
                    </Link>
                    {!user && (
                        <Link to="/login" className="link">
                            LOGIN
                        </Link>
                    )}
                    {user && (
                        <Link to="/cart" className="link">
                            Cart
                        </Link>
                    )}
                    {user && (
                        <span className="link" onClick={logoutUser}>
                            Logout
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default withRouter(NavigationComponent);
