import React from "react";
import "./ShowcaseComponent.css";
import image from "../../assets/images/2.jpg";
import image1 from "../../assets/images/1.jpg";

import { withRouter } from "react-router";

const ShowcaseComponent = (props) => {
    return (
        <div className="showcase-container">
            <div className="showcase-content">
                <div className="l-div">
                    <img src={image} alt="2" />
                </div>
                <div className="r-div">
                    <img src={image1} alt="1" />
                </div>
                <p className="title">Mobilni Telefoni shop</p>
            </div>
        </div>
    );
};

export default withRouter(ShowcaseComponent);
