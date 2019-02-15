'use strict';

const source = document.getElementById('source');
const output = document.getElementById('result');
const from = document.getElementById('from');
const to = document.getElementById('to');
const currencies = document.getElementsByTagName('select');



const xhr = new XMLHttpRequest();

xhr.addEventListener('loadstart', startLoad);
xhr.addEventListener('loadend', endLoad);
xhr.addEventListener('load', onLoad);

xhr.open("GET", "https://neto-api.herokuapp.com/currency", true);
xhr.send();


function startLoad() {
    document.getElementById('loader').classList.remove('hidden');
}

function endLoad() {
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('content').classList.remove('hidden');
}

function onLoad() {
    const exchangeRates = JSON.parse(xhr.responseText);

    let option= '';
    for(const exchangeRate of exchangeRates) {
         option += `<option label="${exchangeRate.code}" value="${exchangeRate.value}"></option>`;
        from.innerHTML = option;
        to.innerHTML = option;
    }

    
}

for (const currency of currencies) {
    currency.addEventListener('input', showResult);
}

function showResult() {
    output.value = (source.value * from.value / to.value).toFixed(2);
}