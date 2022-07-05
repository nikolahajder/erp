const axios = require("axios");

export class ProductService {
    private static instance: ProductService;

    public static getInstance() {
        if (!ProductService.instance) {
            ProductService.instance = new ProductService();
        }
        return ProductService.instance;
    }

    public getProducts: () => Promise<void> = () => {
        return new Promise<void>((resolve, reject) => {
            try {
                axios
                    .get(`${process.env.REACT_APP_API}/products`)
                    .then((response: any) => {
                        resolve(response.data);
                    });
            } catch (err) {
                reject(err);
            }
        });
    };

    public getUser: (email:string, token: any) => Promise<void> = (email, token) => {
        return new Promise<void>((resolve, reject) => {
            try {
                axios
                    .get(`${process.env.REACT_APP_API}/users?email=${email}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((response: any) => {
                        resolve(response.data);
                    });
            } catch (err) {
                reject(err);
            }
        });
    };

    public getCategories: () => Promise<void> = () => {
        return new Promise<void>((resolve, reject) => {
            try {
                axios
                    .get(`${process.env.REACT_APP_API}/categories`)
                    .then((response: any) => {
                        resolve(response.data);
                    });
            } catch (err) {
                reject(err);
            }
        });
    };

    public orderProduct: (product: any, token: any) => Promise<void> = (
        product,
        token
    ) => {
        return new Promise<void>((resolve, reject) => {
            try {
                axios
                    .post(`${process.env.REACT_APP_API}/orders`, product, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((response: any) => {
                        resolve(response.data);
                    });
            } catch (err) {
                reject(err);
            }
        });
    };

    public getOrdersForUser: (token: any, user: string) => Promise<void> = (token, user) => {
        return new Promise<void>((resolve, reject) => {
            try {
                axios
                    .get(`${process.env.REACT_APP_API}/orders?user=${user}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((response: any) => {
                        resolve(response.data);
                    });
            } catch (err) {
                reject(err);
            }
        });
    }

    public getOrders: (token: any) => Promise<void> = (token) => {
        return new Promise<void>((resolve, reject) => {
            try {
                axios
                    .get(`${process.env.REACT_APP_API}/orders`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((response: any) => {
                        resolve(response.data);
                    });
            } catch (err) {
                reject(err);
            }
        });
    };

    public addProduct: (product: any) => Promise<void> = (product) => {
        return new Promise<void>((resolve, reject) => {
            try {
                axios
                    .post(`${process.env.REACT_APP_API}/products`, product)
                    .then((response: any) => {
                        resolve(response.data);
                    });
            } catch (err) {
                reject(err);
            }
        });
    };

    public editProduct: (product: any, id: any) => Promise<void> = (
        product,
        id
    ) => {
        return new Promise<void>((resolve, reject) => {
            try {
                axios
                    .put(`${process.env.REACT_APP_API}/products/${id}`, product)
                    .then((response: any) => {
                        resolve(response.data);
                    });
            } catch (err) {
                reject(err);
            }
        });
    };

    public editCategory: (product: any, id: any) => Promise<void> = (
        product,
        id
    ) => {
        return new Promise<void>((resolve, reject) => {
            try {
                axios
                    .put(
                        `${process.env.REACT_APP_API}/categories/${id}`,
                        product
                    )
                    .then((response: any) => {
                        resolve(response.data);
                    });
            } catch (err) {
                reject(err);
            }
        });
    };

    public delProduct: (id: any) => Promise<void> = (id) => {
        return new Promise<void>((resolve, reject) => {
            try {
                axios
                    .delete(`${process.env.REACT_APP_API}/products/${id}`)
                    .then((response: any) => {
                        resolve(response.data);
                    });
            } catch (err) {
                reject(err);
            }
        });
    };

    public delCategory: (id: any) => Promise<void> = (id) => {
        return new Promise<void>((resolve, reject) => {
            try {
                axios
                    .delete(`${process.env.REACT_APP_API}/categories/${id}`)
                    .then((response: any) => {
                        resolve(response.data);
                    });
            } catch (err) {
                reject(err);
            }
        });
    };
}
