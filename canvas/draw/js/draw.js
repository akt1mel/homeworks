'use strict';

const canvas = document.getElementById('draw'),
    ctx = canvas.getContext('2d');
let curves = [], //массив кривых
    draw = false,
    shift = false,
    lineWidth = 100,
    reduceWith = true,
    lineColor = 1,
    needsRepaint = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


canvas.addEventListener('mousedown', (e) => {
    draw = true;
    curves.push(makePoint(e.offsetX, e.offsetY));
});

canvas.addEventListener('mousemove', (e) => {
    if (draw) {
        curves.push(makePoint(e.offsetX, e.offsetY));
        shift = e.shiftKey;
        needsRepaint = true;
    }
});

canvas.addEventListener('mouseup', (e) => {
    curves = [];
    draw = false;

});

canvas.addEventListener("mouseleave", () => {
    draw = false;
    curves = [];
});

function makePoint(x, y) {
    return [x, y];
}


canvas.addEventListener('dblclick', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

//перерисовка фона
function repaint() {

    if (reduceWith) {
        if (lineWidth === 100) {
            reduceWith = false;
            lineWidth--;
        } else {
            lineWidth++;
        }

    } else {
        if (lineWidth === 5) {
            reduceWith = true;
            lineWidth++;
        } else {
            lineWidth--;
        }

    }

    if (shift) {
        lineColor < 1 ? lineColor = 359 : lineColor--;
    } else {
        lineColor > 358 ? lineColor = 0 : lineColor++;
    }

    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = `hsl(${lineColor}, 100%, 50%)`;

    ctx.moveTo(curves[0], curves[1]);
    for (let i = 1; i <= curves.length - 1; i++) {
        ctx.lineTo(...curves[i]);
    }
    ctx.stroke();
    ctx.closePath();
    curves.splice(0, curves.length - 2);
}


function tick() {
    if (needsRepaint) {
        repaint();
        needsRepaint = false;
    }

    window.requestAnimationFrame(tick);
}

tick();