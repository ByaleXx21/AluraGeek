import { getProducts, deleteProduct } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const products = await getProducts();
    const productList = document.getElementById('product-list');

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button class="delete-button" data-id="${product.id}">&times;</button>
        `;

        productElement.querySelector('.delete-button').addEventListener('click', async function() {
            await deleteProduct(product.id);
            productElement.remove();
        });

        productList.appendChild(productElement);
    });
});
