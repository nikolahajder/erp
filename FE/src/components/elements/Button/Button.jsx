import React from "react";
import "./Button.css";

const Button = (props) => {
    const { buttonHandler, className, textContent } = props;
    return (
        <span
            className={className}
            onClick={() => {
                buttonHandler();
            }}
        >
            {textContent}
        </span>
    );
};

export default Button;
