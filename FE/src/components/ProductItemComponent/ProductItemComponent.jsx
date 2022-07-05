import React, { useContext, useState, useEffect } from "react";
import Button from "../elements/Button/Button";
import AuthContext from "../context/AuthContext";
import { ReactComponent as EyeSVG } from "../../assets/images/svgs/eyes.svg";
const ProductItemComponent = (props) => {
    const [newPrice, setNewPrice] = useState("");
    const [newName, setNewName] = useState("");
    const [newDimension, setNewDimension] = useState("");
    const [newColor, setNewColor] = useState("");
    const [newImage, setNewImage] = useState("");
    const [editMode, setEditMode] = useState(false);
    const { product, type, addToCart, admin, removeProduct, editProduct } =
        props;

    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (product && product.dimension) {
            setNewDimension(product.dimension.split("|")[0]);
            setNewName(product.name);
            setNewPrice(product.price);
            setNewColor(product.color);
            setNewImage(product.dimension.split("|")[1]);
        }
    }, [product]);

    return (
        <>
            <div className="resource-item">
                <div className="item-l">
                    {product.img ? (
                        <img
                            className="product-image"
                            src={`${process.env.REACT_APP_API}${product.img.url}`}
                            alt={product.name}
                        />
                    ) : (
                        <>
                            {product.cover ? (
                                <img
                                    className="product-image"
                                    src={`${process.env.REACT_APP_API}${product.cover.url}`}
                                    alt={product.name}
                                />
                            ) : (
                                <img
                                    className="product-image"
                                    src={product.dimension.split("|")[1]}
                                    alt={product.Name}
                                />
                            )}
                        </>
                    )}
                </div>
                <div className="item-r">
                    <div className="item-info">
                        <span className="item-name">{product.name}</span>
                        {type === "product" ? (
                            <>
                                <p className="item-description">
                                    Color:{product.color}
                                </p>
                                <p className="item-description">
                                    Dimension:{product.dimension.split("|")[0]}
                                </p>
                            </>
                        ) : (
                            <div className="arr-flowers">
                                <p className="item-list">Contains:</p>
                                {product.products &&
                                    product.products.map((item, index) => {
                                        return (
                                            <p
                                                className="item-list-item"
                                                key={index}
                                            >
                                                - {item.name}
                                            </p>
                                        );
                                    })}
                            </div>
                        )}
                        <p className="item-price">{product.price}e</p>
                        <div className="date-and-cart">
                            <p className="item-published">
                                Added:{" "}
                                {new Date(product.published_at)
                                    .toISOString()
                                    .slice(0, 10)
                                    .replaceAll("-", ".")}
                            </p>
                            {user && (
                                <>
                                    <Button
                                        className={"gradient-btn reg-btn"}
                                        textContent={"Cart"}
                                        buttonHandler={() => {
                                            addToCart(product);
                                        }}
                                    />
                                    {admin && (
                                        <>
                                            <Button
                                                className={
                                                    "gradient-btn rem-btn"
                                                }
                                                textContent={"Remove"}
                                                buttonHandler={() => {
                                                    removeProduct(product.id);
                                                }}
                                            />
                                            <Button
                                                className={"gradient-btn "}
                                                textContent={"Edit"}
                                                buttonHandler={() => {
                                                    setEditMode(!editMode);
                                                }}
                                            />
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {admin && editMode && (
                <div className="add-product">
                    <input
                        type="text"
                        className="search-products"
                        placeholder="Name"
                        defaultValue={newName}
                        onChange={(e) => {
                            setNewName(e.target.value);
                        }}
                    />
                    <input
                        type="text"
                        className="search-products"
                        placeholder="Price"
                        defaultValue={newPrice}
                        onChange={(e) => {
                            setNewPrice(e.target.value);
                        }}
                    />
                    <input
                        type="text"
                        className="search-products"
                        defaultValue={newDimension}
                        placeholder="Dimension"
                        onChange={(e) => {
                            setNewDimension(e.target.value);
                        }}
                    />
                    <input
                        type="text"
                        className="search-products"
                        placeholder="Color"
                        defaultValue={newColor}
                        onChange={(e) => {
                            setNewColor(e.target.value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        className="search-products"
                        defaultValue={newImage}
                        onChange={(e) => {
                            setNewImage(e.target.value);
                        }}
                    />
                    <Button
                        className={"gradient-btn cart-btn"}
                        textContent={"EDIT PRODUCT"}
                        buttonHandler={() => {
                            setEditMode(false);
                            editProduct(
                                newName,
                                newPrice,
                                newColor,
                                newDimension,
                                newImage,
                                product.id
                            );
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default ProductItemComponent;
