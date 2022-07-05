import React from "react";

const CartItemComponent = (props) => {
    const { item, removeFromCart } = props;
    return (
        <div className="cart-item">
            <div className="cart-item-info">
                <span className="cart-item-name-label">Name: </span>
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-name-label">Price: </span>
                <span className="cart-item-name">{item.price}e</span>
                <span className="cart-item-name-label">Available since: </span>
                <span className="cart-item-name">
                    {new Date(item.published_at)
                        .toISOString()
                        .slice(0, 10)
                        .replaceAll("-", ".")}
                </span>
                <span className="cart-item-name-label">Added to cart: </span>
                <span className="cart-item-name">
                    {new Date().toISOString().slice(0, 10).replaceAll("-", ".")}
                </span>
            </div>
            <span
                className="remove-item"
                onClick={() => {
                    removeFromCart(item.id);
                }}
            >
                Remove
            </span>
        </div>
    );
};

export default CartItemComponent;
