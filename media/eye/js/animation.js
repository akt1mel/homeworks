'use strict';
const eye = document.querySelector('.big-book__pupil');

document.addEventListener('mousemove', animateEye);


function animateEye(event) {

    const bodyRect = document.body.getBoundingClientRect(),
        eyeRect = eye.getBoundingClientRect(),
        offsetX = eyeRect.left - bodyRect.left + eyeRect.width / 2,
        offsetY = eyeRect.top - bodyRect.top + eyeRect.height / 2,
        deltaX = event.pageX - offsetX,
        deltaY = event.pageY - offsetY,
        distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)),
        maxDistance = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2)),
        maxSize = 3,
        minSize = 1,
        sizeEye = maxSize - (maxSize - minSize) * (distance / maxDistance),
        maxDelta = 30,
        pupilDeltaX = maxDelta * (deltaX / offsetX),
        pupilDeltaY = maxDelta * (deltaY / offsetY);

    eye.style.setProperty('--pupil-size', sizeEye);
    eye.style.setProperty('--pupil-x', pupilDeltaX + 'px');
    eye.style.setProperty('--pupil-y', pupilDeltaY + 'px');
}
