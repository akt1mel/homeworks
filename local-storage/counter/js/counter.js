'use strict';


const counter = document.getElementById('counter');
const increment = document.getElementById('increment');
const decrement = document.getElementById('decrement');
const reset = document.getElementById('reset');


function updateCount() {
    if (!localStorage.count) {
        localStorage.count = 0;
    }

    counter.innerHTML = localStorage.count;
}
console.log(localStorage.count);


increment.addEventListener('click', () => {
    localStorage.count++;
    updateCount();
});

decrement.addEventListener('click', () => {
    localStorage.count--;
    if (localStorage.count < 0) {
        return;
    }
    updateCount();
});

reset.addEventListener('click', () => {
    localStorage.count = 0;
    updateCount();
});

document.addEventListener('DOMContentLoaded', updateCount);