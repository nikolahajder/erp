import React, { useContext, useState, useEffect } from "react";
import "./CartComponent.css";
import Button from "../elements/Button/Button";
import CartItemComponent from "../CartItemComponent/CartItemComponent";
import OrderComponent from "../OrderComponent/OrderComponent";
import { ProductService } from "../../api/productService";
import AuthContext from "../context/AuthContext";

const CartComponent = (props) => {
    const [orders, setOrders] = useState(null);
    const { cart, clearCart, total, removeFromCart } = props;

    const { token } = useContext(AuthContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (token) {
            getOrders();
        }
    }, [token]);

    function orderProduct() {
        console.log(cart[0].id);
        console.log(token);
        ProductService.getInstance()
            .orderProduct({ product: { id: cart[0].id, total: total } }, token)
            .then((response) => {
                getOrders();
            });
    }

    function getOrders() {
        user && user.email === process.env.REACT_APP_ADMIN.toString()
            ? ProductService.getInstance()
                .getOrders(token)
                .then((response) => {
                    setOrders(response);
                })
            : ProductService.getInstance()
                .getOrdersForUser(token, localStorage.getItem('userId'))
                .then((response) => {
                    setOrders(response);
                })
    }

    return (
        <div className="content">
            <div className="payment-and-orders">
                <div className="payment">
                    <span className="po-title">Payment</span>
                    <div className="po-box">
                        <OrderComponent
                            show={cart.length > 0 ? true : false}
                            orderProduct={orderProduct}
                            clearCart={clearCart}
                        />
                    </div>
                </div>
                <div className="orders">
                    <span className="po-title">Orders</span>
                    <div className="po-box">
                        {orders ? (
                            <div className="order-component-flex">
                                {orders.map((order, index) => {
                                    return (
                                        <span
                                            className="order-title-flex"
                                            key={index}
                                        >
                                            User: {order.user.username} | Status: {order.status} | Total:
                                            {order.total}eur | Date:{" "}
                                            {new Date(order.createdAt)
                                                .toISOString()
                                                .slice(0, 10)
                                                .replaceAll("-", ".")}
                                        </span>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="order-component">
                                <span className="order-title">
                                    There is no orders!
                                </span>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>
            <div className="products-cart">
                <div className="cart-header">
                    <span className="cart-title">Products in cart</span>
                </div>
                <div className="cart-items">
                    {cart &&
                        cart.map((item, index) => {
                            return (
                                <CartItemComponent
                                    item={item}
                                    removeFromCart={removeFromCart}
                                    key={index}
                                />
                            );
                        })}
                </div>
                <div className="cart-footer">
                    <Button
                        className={"remove-item cart-btn"}
                        textContent={"CLEAR ALL"}
                        buttonHandler={() => {
                            clearCart();
                        }}
                    />
                    <span className="total">Total: {total}e</span>
                </div>
            </div>
        </div>
    );
};

export default CartComponent;
