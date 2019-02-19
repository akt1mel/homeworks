/* Данный JS код */
const xhr = new XMLHttpRequest();
const catalog = document.getElementById('content')

xhr.addEventListener("load", onLoad);
xhr.open("GET", "https://neto-api.herokuapp.com/book",true);
xhr.send();

function onLoad() {
    const books = JSON.parse(xhr.responseText);
    let booksLinks = '';

    for (let book of books) {
        booksLinks += `<li data-title="${book.title}" data-author="${book.author.name}" 
                        data-info="${book.info}" data-price="${book.price}">
                        <img src=${book.cover.small}> </li>`;

        catalog.innerHTML = booksLinks;
    }
}

// Регулируем видимость карточки
function toggleCardVisible () {
 document.getElementById('content').classList.toggle('hidden');
 document.getElementById('card').classList.toggle('hidden');
}


document.getElementById('close').addEventListener('click', toggleCardVisible);

document.getElementById('content').addEventListener('click', (event) => {
    let target = null;
    if (event.target.tagName === 'LI') {
        target = event.target;
    }
    if (event.target.parentNode.tagName === 'LI') {
        target = event.target.parentNode;
    }

    if (target) {
      toggleCardVisible();
      document.getElementById('card-title').innerHTML = target.dataset.title;
      document.getElementById('card-author').innerHTML = target.dataset.author;
      document.getElementById('card-info').innerHTML = target.dataset.info;
      document.getElementById('card-price').innerHTML = target.dataset.price;
    }
});
