'use strict';

const longPolling = document.querySelectorAll('.long-pooling div');

showLongPolling();

function showLongPolling() {
    fetch('https://neto-api.herokuapp.com/comet/long-pooling')
        .then(res => res.json())
        .then(result => {
            Array.from(longPolling).forEach(el => {
                let randNumber = Number(el.textContent);
                if (randNumber === result) {
                    el.classList.add('flip-it');
                } else {
                    el.classList.remove('flip-it');
                }
            });
            showLongPolling();
        })
        .catch(err => console.log(err));
}