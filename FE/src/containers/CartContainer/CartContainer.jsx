import React from "react";
import "./CartContainer.css";
import NavigationComponent from "../../components/NavigationComponent/NavigationComponent";
import CartComponent from "../../components/CartComponent/CartComponent";

const CartContainer = (props) => {
    return (
        <div className="cart-container">
            <NavigationComponent />
            <CartComponent
                cart={props.cart}
                clearCart={props.clearCart}
                total={props.total}
                removeFromCart={props.removeFromCart}
            />
        </div>
    );
};

export default CartContainer;
