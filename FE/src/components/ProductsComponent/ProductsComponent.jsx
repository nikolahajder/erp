import React, { useState, useEffect, useContext } from "react";
import HashLoader from "react-spinners/HashLoader";
import "./ProductsComponent.css";
import { withRouter } from "react-router";
import { filterData, searchProducts } from "../../utils/generalHelpers";
import { ReactComponent as SearchSVG } from "../../assets/images/svgs/search.svg";
import AuthContext from "../context/AuthContext";
import Button from "../elements/Button/Button";
import { ProductService } from "../../api/productService";

import ProductItemComponent from "../ProductItemComponent/ProductItemComponent";

const ProductsComponent = (props) => {
    const [loader, setLoader] = useState(true);
    const [allProducts, setProducts] = useState(null);

    const [newPrice, setNewPrice] = useState("");
    const [newName, setNewName] = useState("");
    const [newColor, setNewColor] = useState("");
    const [newDimension, setNewDimension] = useState("");
    const [newImage, setNewImage] = useState("");

    const { user } = useContext(AuthContext);

    const {
        products,
        categories,
        location,
        match,
        addToCart,
        getProductsAndCategories,
    } = props;

    useEffect(() => {
        if (products && categories) {
            setProducts(products.concat(categories));
            setLoader(false);
        }
    }, [products, categories]);

    useEffect(() => {
        if (match.params.id && products && categories) {
            setProducts(
                filterData(match.params.id, products.concat(categories))
            );
        }
    }, [location.pathname]);

    function addProduct() {
        if (
            newPrice.length > 0 &&
            newName.length > 0 &&
            newDimension.length > 0 &&
            newColor.length > 0 &&
            newImage.length > 0
        ) {
            ProductService.getInstance()
                .addProduct({
                    name: newName,
                    price: newPrice,
                    color: newColor,
                    dimension: `${newDimension}|${newImage}`,
                })
                .then((response) => {
                    getProductsAndCategories();
                    setNewColor("");
                    setNewDimension("");
                    setNewName("");
                    setNewPrice("");
                    setNewImage("");
                });
        }
    }

    function editProduct(name, price, color, dimension, image, id) {
        ProductService.getInstance()
            .editProduct(
                {
                    name: name,
                    price: price,
                    color: color,
                    dimension: `${dimension}|${image}`,
                },
                id
            )
            .then((response) => {
                getProductsAndCategories();
            });
    }

    function removeProduct(id) {
        ProductService.getInstance()
            .delProduct(id)
            .then((response) => {
                getProductsAndCategories();
            });
    }

    return (
        <div className="resource-container">
            <div className="resource-header">
                <input
                    type="text"
                    className="search-products"
                    onChange={(e) => {
                        setProducts(
                            searchProducts(
                                e.target.value,
                                products.concat(categories)
                            )
                        );
                    }}
                />
                <SearchSVG className="search-icon" />
            </div>

            {loader ? (
                <div className="loader">
                    <HashLoader color={"#fff"} loading={loader} size={100} />
                </div>
            ) : (
                <div className="resource-content">
                    {user &&
                    user.email === process.env.REACT_APP_ADMIN.toString() ? (
                        <div className="add-product">
                            <input
                                type="text"
                                className="search-products"
                                placeholder="Name"
                                value={newName}
                                onChange={(e) => {
                                    setNewName(e.target.value);
                                }}
                            />
                            <input
                                type="text"
                                className="search-products"
                                placeholder="Price"
                                value={newPrice}
                                onChange={(e) => {
                                    setNewPrice(e.target.value);
                                }}
                            />
                            <input
                                type="text"
                                className="search-products"
                                placeholder="Color"
                                value={newColor}
                                onChange={(e) => {
                                    setNewColor(e.target.value);
                                }}
                            />
                            <input
                                type="text"
                                className="search-products"
                                placeholder="Dimension"
                                value={newDimension}
                                onChange={(e) => {
                                    setNewDimension(e.target.value);
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Image URL"
                                className="search-products"
                                value={newImage}
                                onChange={(e) => {
                                    setNewImage(e.target.value);
                                }}
                            />
                            <Button
                                className={"gradient-btn cart-btn"}
                                textContent={"ADD PRODUCT"}
                                buttonHandler={() => {
                                    addProduct();
                                }}
                            />
                        </div>
                    ) : (
                        <span></span>
                    )}
                    {allProducts.map((product, index) => {
                        if (!product.products) {
                            return (
                                <ProductItemComponent
                                    product={product}
                                    key={index}
                                    type="product"
                                    admin={
                                        user &&
                                        user.email ===
                                            process.env.REACT_APP_ADMIN.toString()
                                    }
                                    addToCart={addToCart}
                                    removeProduct={removeProduct}
                                    editProduct={editProduct}
                                />
                            );
                        }
                    })}
                </div>
            )}
        </div>
    );
};

export default withRouter(ProductsComponent);
