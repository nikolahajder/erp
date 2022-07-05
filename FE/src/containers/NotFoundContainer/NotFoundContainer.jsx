import React from "react";
import "./NotFoundContainer.css";
import PacmanLoader from "react-spinners/PacmanLoader";
import NavigationComponent from "../../components/NavigationComponent/NavigationComponent";

const NotFoundContainer = (props) => {
    return (
        <div className="notfound-container">
            <NavigationComponent />
            <div className="notfound-content">
                <p className="notfound-title">This page doesn't exist!</p>
                <p className="notfound-sub-title">
                    There is big chance that Pacman eat it, so be carefull and
                    return to an existing page.
                </p>
                <PacmanLoader color={"#fff"} loading={true} size={50} />
            </div>
        </div>
    );
};

export default NotFoundContainer;
