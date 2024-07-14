const API_URL = 'http://localhost:3000/products';

export const getProducts = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};

export const createProduct = async (product) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    return await response.json();
};

export const deleteProduct = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    return await response.json();
};
