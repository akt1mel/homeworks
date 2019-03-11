'use strict';

const webSock = document.querySelectorAll('.websocket div');
const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');

ws.addEventListener('message', event => {
    Array.from(webSock).forEach(el => {
        if (el.textContent === event.data) {
            el.classList.add('flip-it');
        } else {
            el.classList.remove('flip-it');
        }
    });
});