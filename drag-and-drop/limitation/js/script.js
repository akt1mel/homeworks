'use strict';

const textarea = document.querySelector('.textarea'),
    block = document.querySelector('.block'),
    message = document.querySelector('.message')


textarea.addEventListener('input', () => {
    block.classList.add('active');
    message.classList.remove('view');
});

textarea.addEventListener('keydown', debounce(() => {
    block.classList.remove('active');
    message.classList.add('view');
}, 2000));

textarea.addEventListener('blur', () => {
    block.classList.remove('active');
    message.classList.remove('view');
});

function debounce(callback, delay) {
    let timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            callback();
        }, delay);
    };
}
