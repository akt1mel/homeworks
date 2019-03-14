'use strict';

const catEye = document.querySelectorAll('.cat_eye');
let minX = 1, minY = 1, maxX, maxY;

function trackingEye(eye, x, y) {
    maxX = eye.parentElement.offsetWidth - eye.offsetWidth;
    maxY = eye.parentElement.offsetHeight - eye.offsetHeight;
    x = x - eye.parentElement.getBoundingClientRect().left;
    y = y - eye.parentElement.getBoundingClientRect().top;
    x = Math.min(x, maxX);
    y = Math.min(y, maxY);
    x = Math.max(x, minX);
    y = Math.max(y, minY);
    eye.style.left = x + 'px';
    eye.style.top = y + 'px';
}


document.addEventListener('mousemove', (event) => {
    Array.from(catEye).forEach(eye => throttle(trackingEye(eye, event.pageX, event.pageY)))
});


function throttle(callback) {
    let isWaiting = false;
    return function () {
        if (!isWaiting) {
            callback.apply(this, arguments);
            isWaiting = true;
            requestAnimationFrame(() => {
                isWaiting = false;
            });
        }
    };
}