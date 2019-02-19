'use strict';

const done = document.querySelector('.done');
const affairs = document.querySelectorAll('label');
const undone = document.querySelector('.undone');

//console.log(todo[0]);

Array.from(affairs).forEach(affair => affair.addEventListener('click', changeStatus));

function changeStatus(event) {
    //console.log(event);
    const status = event.target.parentElement;

    if (status.classList.contains('done')) {
        undone.appendChild(event.target);
    } else {
        done.appendChild(event.target);
    }

}