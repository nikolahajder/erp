import React from "react";
import "./HomeContainer.css";

import NavigationComponent from "../../components/NavigationComponent/NavigationComponent";
import ShowcaseComponent from "../../components/ShowcaseComponent/ShowcaseComponent";

const HomeContainer = (props) => {
    return (
        <div className="home-container">
            <NavigationComponent />
            <ShowcaseComponent />
        </div>
    );
};

export default HomeContainer;
