import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/main.css";
import MainComponent from "./components/MainComponent/MainComponent";
import { AuthProvider } from "./components/context/AuthContext";

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <MainComponent />
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
