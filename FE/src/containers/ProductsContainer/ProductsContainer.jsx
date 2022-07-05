import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import "./ProductsContainer.css";
import { filters } from "../../utils/generalHelpers";
import { ProductService } from "../../api/productService";

import NavigationComponent from "../../components/NavigationComponent/NavigationComponent";
import CollapseMenu from "../../components/elements/CollapseMenu/CollapseMenu";
import ProductsComponent from "../../components/ProductsComponent/ProductsComponent";

const ProductsContainer = (props) => {
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);

    const { addToCart } = props;

    useEffect(() => {
        getProductsAndCategories();
    }, []);

    function getProductsAndCategories() {
        ProductService.getInstance()
            .getProducts()
            .then((response) => {
                if (response) {
                    setProducts(response);
                }
            });

        ProductService.getInstance()
            .getCategories()
            .then((response) => {
                if (response) {
                    setCategories(response);
                }
            });
    }

    function selectFilter(type) {
        props.history.push(`/products/${type}`);
    }

    return (
        <div className="list-container">
            <NavigationComponent />
            <p className="list-title">Available products</p>
            <div className="list-content">
                <CollapseMenu
                    className={"collapse-parent"}
                    data={filters}
                    handleFunction={selectFilter}
                    active={""}
                />
                <ProductsComponent
                    products={products}
                    categories={categories}
                    addToCart={addToCart}
                    getProductsAndCategories={getProductsAndCategories}
                />
            </div>
        </div>
    );
};

export default withRouter(ProductsContainer);
