export const filters = [
    {
        type: "price",
        header: "Price",
        className: "collapse-item",
        data: [
            { id: 0, type: "price", title: "0 - 200e", label: "0-200" },
            {
                id: 1,
                type: "price",
                title: "200e - 500e",
                label: "200-500",
            },
            {
                id: 2,
                type: "price",
                title: "500e - 1000e",
                label: "500-1000",
            },
            { id: 3, type: "price", title: "1000e > ", label: "gt1000" },
        ],
    },
    {
        type: "type",
        header: "Type",
        className: "collapse-item",
        data: [
            { id: 0, type: "type", title: "# All products", label: "all" },
            {
                id: 1,
                type: "type",
                title: "# Samsung",
                label: "Samsung",
            },
            {
                id: 2,
                type: "type",
                title: "# Xiaomi",
                label: "Xiaomi",
            },
            {
                id: 3,
                type: "type",
                title: "# Apple",
                label: "Apple",
            },
        ],
    },
];

export const filterData = (type, data) => {
    if (!data) return;

    if (type === "all") {
        return data;
    }

    if (type === "products") {
        const filteredData = [];

        data.map((item) => {
            if (item.category) {
                filteredData.push(item);
            }
        });

        return filteredData;
    }

    if (type === "Samsung") {
        const filteredData = [];

        data.map((item) => {
            if (item.category && item.category.name === "Samsung") {
                filteredData.push(item);
            }
        });

        return filteredData;
    }

    if (type === "Xiaomi") {
        const filteredData = [];

        data.map((item) => {
            if (item.category && item.category.name === "Xiaomi") {
                filteredData.push(item);
            }
        });

        return filteredData;
    }

    if (type === "Apple") {
        const filteredData = [];

        data.map((item) => {
            if (item.category && item.category.name === "iPhone") {
                filteredData.push(item);
            }
        });

        return filteredData;
    }

    if (type === "0-200") {
        const filteredData = [];

        data.map((item) => {
            if (item.price > 0 && item.price <= 200) {
                filteredData.push(item);
            }
        });

        return filteredData;
    }

    if (type === "200-500") {
        const filteredData = [];

        data.map((item) => {
            if (item.price > 200 && item.price <= 500) {
                filteredData.push(item);
            }
        });

        return filteredData;
    }

    if (type === "500-1000") {
        const filteredData = [];

        data.map((item) => {
            if (item.price > 500 && item.price <= 1000) {
                filteredData.push(item);
            }
        });

        return filteredData;
    }

    if (type === "gt1000") {
        const filteredData = [];

        data.map((item) => {
            if (item.price > 1000) {
                filteredData.push(item);
            }
        });

        return filteredData;
    }
};

export const searchProducts = (query, data) => {
    if (query.length === 0) return data;

    const filteredData = [];

    data.map((item) => {
        if (item.name.toLowerCase().includes(query.toLowerCase())) {
            filteredData.push(item);
        }
    });

    return filteredData;
};

export const calculateTotal = (data) => {
    if (data) {
        let total = 0;

        data.map((item) => {
            total = total + item.price;
        });

        return total;
    }

    return 0;
};

export const removeItemFromCart = (data, idToRemove) => {
    const cart = data.filter(function (item) {
        return item.id != idToRemove;
    });

    return cart;
};
