document.addEventListener('DOMContentLoaded', function() {
    fetchProducts();
});

document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();


    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const imageFile = document.getElementById('image').files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {

            const product = {
                name: name,
                price: price,
                image: e.target.result
            };


            fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            .then(response => response.json())
            .then(data => {

                addProductToDOM(data);
            });
        };
        reader.readAsDataURL(imageFile);
    } else {
        alert('Por favor, selecciona un archivo de imagen.');
    }


    document.getElementById('product-form').reset();
});

function fetchProducts() {
    fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(products => {
        products.forEach(product => {
            addProductToDOM(product);
        });
    });
}

function addProductToDOM(product) {
    const productList = document.getElementById('product-list');


    const productElement = document.createElement('div');
    productElement.className = 'product';
    productElement.dataset.id = product.id;

    productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button class="delete-button">&times;</button>
    `;
    productElement.querySelector('.delete-button').addEventListener('click', function() {
        deleteProduct(product.id, productElement);
    });
    productList.appendChild(productElement);
}

function deleteProduct(id, productElement) {
    fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
        productElement.remove();
    });
}
