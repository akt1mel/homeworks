const canvas = document.getElementsByTagName('canvas')[0],
    ctx = canvas.getContext('2d'),
    PI = Math.PI,
    starColors = ['#ffffff', '#ffe9c4', '#d4fbff'],
    starCount = rand(200, 400);

canvas.width = 800;
canvas.height = 600;
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);

function generateStarField() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < starCount; i++) {
        ctx.beginPath();
        ctx.fillStyle = starColors[Math.floor(Math.random() * starColors.length)];
        ctx.globalAlpha = rand(0.8, 1);
        ctx.arc(rand(0, canvas.width), rand(0, canvas.height), rand(0, 1.1), 0, 2 * PI);
        ctx.fill();
        ctx.closePath();

    }
}


function rand(min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
}

canvas.addEventListener('click', generateStarField);