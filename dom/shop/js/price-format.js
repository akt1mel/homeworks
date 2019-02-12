function getPriceFormatted(value) {
  return  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}



const items = document.getElementsByClassName('box');
const cartCount = document.getElementById('cart-count');
const totalPrice = document.getElementById('cart-total-price');

let cartItemsCount = 0;
let finalPrice = 0;

function addToCart() {
  cartItemsCount++;
  cartCount.innerHTML = cartItemsCount;
  let itemPrice = this.dataset.price;
  finalPrice += Number(itemPrice);
  totalPrice.innerHTML = getPriceFormatted(finalPrice);
}


for (let item of items) {
  item.querySelector('.add').addEventListener('click', addToCart);
}


