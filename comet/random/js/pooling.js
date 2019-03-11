'use strict';

const polling = document.querySelectorAll('.pooling div');

setInterval(showPolling, 5000);

function showPolling() {
    fetch('https://neto-api.herokuapp.com/comet/pooling')
        .then(res => res.json())
        .then(result => {
            Array.from(polling).forEach(el => {
                let randNumber = Number(el.textContent);
                if (randNumber === result) {
                    el.classList.add('flip-it');
                } else {
                    el.classList.remove('flip-it');
                }
            })
        })
        .catch(err => console.error(err));

}