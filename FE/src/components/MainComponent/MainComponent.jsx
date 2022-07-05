import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./MainComponent.css";
import { calculateTotal, removeItemFromCart } from "../../utils/generalHelpers";

import HomeContainer from "../../containers/HomeContainer/HomeContainer";
import NotFoundContainer from "../../containers/NotFoundContainer/NotFoundContainer";
import LoginContainer from "../../containers/LoginContainer/LoginContainer";
import ProductsContainer from "../../containers/ProductsContainer/ProductsContainer";
import CartContainer from "../../containers/CartContainer/CartContainer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainComponent = () => {
    const [cart, setCart] = useState([]);

    function addToCart(item) {
        const cartCopy = cart;
        cartCopy.push(item);
        toast("Product is added to cart!");
        setCart(cartCopy);
    }

    function clearCart() {
        setCart([]);
    }

    function removeFromCart(id) {
        setCart(removeItemFromCart(cart, id));
    }

    return (
        <Router>
            <ToastContainer />
            <Switch>
                <Route
                    path="/cart"
                    render={() => {
                        return (
                            <CartContainer
                                cart={cart}
                                clearCart={clearCart}
                                total={calculateTotal(cart)}
                                removeFromCart={removeFromCart}
                            />
                        );
                    }}
                />
                <Route
                    path="/products/:id?"
                    render={() => {
                        return <ProductsContainer addToCart={addToCart} />;
                    }}
                />
                <Route
                    path="/login"
                    render={() => {
                        return <LoginContainer />;
                    }}
                />
                <Route
                    exact
                    path="/"
                    render={() => {
                        return <HomeContainer />;
                    }}
                />
                <Route
                    render={() => {
                        return <NotFoundContainer />;
                    }}
                />
            </Switch>
        </Router>
    );
};

export default MainComponent;
