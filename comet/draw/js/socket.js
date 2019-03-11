'use strict';

const ws = new WebSocket("wss://neto-api.herokuapp.com/draw");

window.editor.addEventListener('update', () => {
    canvas.toBlob(img => ws.send(img));
});