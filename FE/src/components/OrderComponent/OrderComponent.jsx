import React, { useState } from "react";
import "./OrderComponent.css";
import Button from "../elements/Button/Button";

const OrderComponent = (props) => {
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [zipCode, setZipCode] = useState("");

    return (
        <div className="order-component">
            {props.show ? (
                <div className="order-component-content">
                    <span className="order-title">
                        Payment method: Billing on arrival
                    </span>
                    <div className="input-div">
                        <input
                            type="text"
                            placeholder="City"
                            className="order-input"
                            onChange={(e) => {
                                setCity(e.target.value);
                            }}
                        />
                    </div>
                    <div className="input-div">
                        <input
                            type="text"
                            placeholder="Address"
                            className="order-input"
                            onChange={(e) => {
                                setAddress(e.target.value);
                            }}
                        />
                    </div>
                    <div className="input-div">
                        <input
                            type="text"
                            placeholder="Zip Code"
                            className="order-input"
                            onChange={(e) => {
                                setZipCode(e.target.value);
                            }}
                        />
                    </div>
                    <Button
                        className={"gradient-btn order-btn"}
                        textContent={"ORDER"}
                        buttonHandler={() => {
                            if (
                                city.length > 0 &&
                                address.length > 0 &&
                                zipCode.length > 0
                            ) {
                                props.orderProduct();
                                props.clearCart();
                            }
                        }}
                    />
                </div>
            ) : (
                <span className="order-title">Cart is empty!</span>
            )}
        </div>
    );
};

export default OrderComponent;
