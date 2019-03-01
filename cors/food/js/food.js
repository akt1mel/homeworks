'use strict';

const pic = document.querySelector("[data-pic]");
const title = document.querySelector("[data-title]");
const ingredients = document.querySelector("[data-ingredients]");
const rating = document.querySelector("[data-rating]");
const star = document.querySelector("[data-star]");
const votes = document.querySelector("[data-votes]");
const consumers = document.querySelector("[data-consumers]");

function addScript(src) {
    let elem = document.createElement("script");
    elem.src = src;
    document.head.appendChild(elem);
}

addScript('https://neto-api.herokuapp.com/food/42?callback=updateRecipe');
addScript('https://neto-api.herokuapp.com/food/42/rating?callback=showRating');
addScript('https://neto-api.herokuapp.com/food/42/consumers?callback=showConsumers');

function updateRecipe(data) {
    title.textContent = data.title;
    ingredients.textContent = data.ingredients.join(', ');
    pic.style.backgroundImage = `url('${data.pic}')`;
}

function showRating(data) {
    rating.textContent = data.rating.toFixed(2);
    star.style.width = `${data.rating * 10}%`;
    votes.textContent = `${data.votes} оценок`;
}

function showConsumers(data) {
    for (let consumer of data.consumers){
        let consumerProfile = document.createElement('img');
        consumerProfile.src = consumer.pic;
        consumerProfile.title = consumer.name;
        consumers.appendChild(consumerProfile);
    }
    let otherConsumers = document.createElement('span');
    otherConsumers.textContent = `(+${data.total})`;
    consumers.appendChild(otherConsumers);
}