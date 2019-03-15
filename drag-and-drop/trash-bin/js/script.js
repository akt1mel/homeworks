'use strict';


let icon = null;

function mouseDown(event) {
    if (event.target.classList.contains('logo')) {
        icon = event.target;
        icon.classList.add('moving');
        mouseMove(event);
        icon.ondragstart = function () {
            return false;
        };
    }

}

function mouseMove(event) {
    if (icon) {
        icon.style.left = event.pageX - icon.offsetWidth / 2 + 'px';
        icon.style.top = event.pageY - icon.offsetHeight / 2 + 'px';
    }
}

function mouseUp(event) {
    if (icon) {
        icon.style.visibility = 'hidden';
        const check = document
            .elementFromPoint(event.clientX, event.clientY)
            .closest('#trash_bin');
        icon.style.visibility = 'visible';
        icon.classList.remove('moving');

        if (check) {
            icon.style.display = 'none';
        }
    }

    icon = null;
}


document.addEventListener('mousedown', mouseDown);
document.addEventListener('mousemove', mouseMove);
document.addEventListener('mouseup', mouseUp);