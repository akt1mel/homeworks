'use strict';

const colorSwatch = document.getElementById('colorSwatch');
const sizeSwatch = document.getElementById('sizeSwatch');
const quickCart = document.getElementById('quick-cart');
const addToCartForm = document.getElementById('AddToCartForm');

const xhrColors = new XMLHttpRequest();
const xhrSizes = new XMLHttpRequest();
const xhrCart = new XMLHttpRequest();
xhrCart.addEventListener("load", onLoadCart);
xhrCart.open("GET","https://neto-api.herokuapp.com/cart");
xhrCart.send();

addToCartForm.addEventListener('submit', addToCart);

quickCart.addEventListener('click', removeProduct);

function removeProduct(event){
    if (event.target.classList.contains('remove')){
        let productId = event.target.dataset.id;
        const formData = new FormData();
        formData.append('productId', productId);
        const xhr = new XMLHttpRequest()
        xhr.addEventListener('load', (e) => {
            let data = JSON.parse(xhr.response);
            if (data.error){
                console.log(data.message);
            }else{
                updateCart(data);
            }
        });
        xhr.open('POST', 'https://neto-api.herokuapp.com/cart/remove');
        xhr.send(formData);
    }
}

function addToCart(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    if (formData.get('color') == null) {
        alert('Выберите цвет!');
        return;
    }
    if (formData.get('size') == null) {
        alert('Выберите размер!');
        return;
    }
    localStorage.setItem('color', formData.get('color'));
    localStorage.setItem('size', formData.get('size'));
    formData.append('productId', event.target.dataset.productId);
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', (e) => {
        let data = JSON.parse(xhr.response);
        if (data.error){
            console.log(data.message);
        }else{
            updateCart(data);
        }
    });
    xhr.open('POST', 'https://neto-api.herokuapp.com/cart');
    xhr.send(formData);
}

function updateCart(data){
    let cartWidget = '';
    let total = 0;
    for (let product of data){
        cartWidget += '<div class="quick-cart-product quick-cart-product-static" id="quick-cart-' + product.id + '" style="opacity: 1;">';
        cartWidget += '<div class="quick-cart-product-wrap">';
        cartWidget += '<img src="' + product.pic + '"  title="' + product.title + '">';
        cartWidget += '<span class="s1" style="background-color: #000; opacity: .5">$' + product.price + '</span><span class="s2"></span></div>';
        cartWidget += '<span class="count hide fadeUp" id="quick-cart-product-count-' + product.id + '">' + product.quantity + '</span>';
        cartWidget += '<span class="quick-cart-product-remove remove" data-id="' + product.id + '"></span></div>';
        total += parseInt(product.price) * parseInt(product.quantity);
    }
    let open = (data.length > 0) ? 'open' : '';
    cartWidget += '<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ' + open + '"><span>';
    cartWidget += '<strong class="quick-cart-text">Оформить заказ<br></strong>';
    cartWidget += '<span id="quick-cart-price">$' + total + '</span></span></a>';
    quickCart.innerHTML = cartWidget;

    xhrColors.addEventListener("load", onLoadColors);
    xhrColors.open("GET","https://neto-api.herokuapp.com/cart/colors");
    xhrColors.send();

    xhrSizes.addEventListener("load", onLoadSizes);
    xhrSizes.open("GET","https://neto-api.herokuapp.com/cart/sizes");
    xhrSizes.send();
}

function onLoadCart() {
    let cart = JSON.parse(xhrCart.responseText);
    let cartWidget = '';
    updateCart(cart);
}

function onLoadSizes() {
    let localSize = localStorage.getItem('size');
    let sizes = JSON.parse(xhrSizes.responseText);
    let sizeWidget = '<div class="header">Размер</div>';
    for (let size of sizes){
        let available = size.isAvailable ? 'available' : 'soldout';
        let disabled = size.isAvailable ? '' : 'disabled';
        let checked = (localSize == size.type) ? 'checked' : '';
        sizeWidget += '<div data-value="' + size.type + '" class="swatch-element plain ' + size.type + ' ' + available + '">';
        sizeWidget += '<input id="swatch-0-' + size.type + '" type="radio" name="size" value="' + size.type + '" ' + disabled + ' ' + checked + '>';
        sizeWidget += '<label for="swatch-0-' + size.type + '">' + size.title;
        sizeWidget += '<img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">';
        sizeWidget += '</label>';
        sizeWidget += '</div>';
    }
    sizeSwatch.innerHTML = sizeWidget;
}

function onLoadColors() {
    let localColor = localStorage.getItem('color');
    let colors = JSON.parse(xhrColors.responseText);
    let colorWidget = '<div class="header">Цвет</div>';
    for (let color of colors){
        let available = color.isAvailable ? 'available' : 'soldout';
        let disabled = color.isAvailable ? '' : 'disabled';
        let checked = (localColor == color.type) ? 'checked' : '';
        colorWidget += '<div data-value="' + color.type + '" class="swatch-element color ' + color.type + ' ' + available +'">';
        colorWidget += '<div class="tooltip">' + color.title + '</div>';
        colorWidget += '<input quickbeam="color" id="swatch-1-' + color.type + '" type="radio" name="color" value="' + color.type + '" ' + disabled + ' ' + checked + '>';
        colorWidget += '<label for="swatch-1-' + color.type + '" style="border-color: ' + color.type + ';">';
        colorWidget += '<span style="background-color: ' + color.code + ';"></span>';
        colorWidget += '<img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">';
        colorWidget += '</label>';
        colorWidget += '</div>';
    }
    colorSwatch.innerHTML = colorWidget;
}