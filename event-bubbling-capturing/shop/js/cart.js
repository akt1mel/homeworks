'use strict';

const itemsList = document.querySelector('.items-list');

function addItem(event) {
    event.preventDefault();
    const product = {
        'title': event.target.dataset.title,
        'price': event.target.dataset.price
    };

    if (event.target.classList.contains('add-to-cart')) {
        addToCart(product);
    }
}

itemsList.addEventListener('click', addItem);