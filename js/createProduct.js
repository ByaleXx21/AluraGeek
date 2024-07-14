import { createProduct } from './api.js';

document.getElementById('product-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const imageUrl = document.getElementById('image-url').value;

    const newProduct = {
        name,
        price,
        imageUrl
    };

    await createProduct(newProduct);

    const product = document.createElement('div');
    product.className = 'product';
    product.innerHTML = `
        <img src="${imageUrl}" alt="${name}">
        <h3>${name}</h3>
        <p>$${price}</p>
        <button class="delete-button">&times;</button>
    `;


    const productList = document.getElementById('product-list');
    productList.appendChild(product);

    product.querySelector('.delete-button').addEventListener('click', function() {
        product.remove();
    });

    document.getElementById('product-form').reset();
});
