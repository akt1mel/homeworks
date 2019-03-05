const wall = document.querySelector('#wall');
const ctx = wall.getContext("2d");

function randomInt(min, max) {
    return Math.round(min - 0.5 + Math.random()*(max - min +1));

}

function randomFloat(min, max, precision = 1) {
    let degree = Math.pow(10, precision);
    return randomInt(min*degree,max*degree)/degree;
}

function nextPoint1(x, y, time) {
    return {
        x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
        y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
    };
}

function nextPoint2(x, y, time) {
    return {
        x: x + Math.sin((x + (time / 10)) / 100) * 5,
        y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
    }
}


function drawCircle() {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = this.size * 5;
    ctx.arc(this.currX, this.currY, this.size * 12, 0, 2*Math.PI);
    ctx.stroke();
    ctx.restore();
}

function drawCross() {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#FFFFFF';
    ctx.rotate(Math.PI*this.angle/180);
    ctx.moveTo(this.currX - this.size * 10, this.currY);
    ctx.lineTo(this.currX  + this.size * 10, this.currY);
    ctx.stroke();
    ctx.moveTo(this.currX, this.currY - this.size * 10);
    ctx.lineTo(this.currX, this.currY + this.size * 10);
    ctx.stroke();
    ctx.restore();
}

let figure = [];
let countFigure = randomInt(50, 200);
for (let i = 0; i < countFigure; i++) {
    figure.push({
        x: randomInt(0, wall.width),
        y: randomInt(0, wall.height),

        size: randomFloat(0.1, 0.6, 1),
        speedRotate: randomFloat(-0.2, 0.2, 1),
        angle: randomInt(0, 360),
        funcNextPoint: randomInt(0,1) === 0 ? nextPoint1 : nextPoint2,
        funcDrawFigure: i % 2 === 0 ? drawCircle : drawCross

    });
}

function moveFigures() {
    for(let i=0; i < countFigure;i++){
        let result = figure[i].funcNextPoint(figure[i].x, figure[i].y, Date.now());
        figure[i].currX = result.x;
        figure[i].currY = result.y;
        figure[i].angle += figure[i].speedRotate;

        if (figure[i].angle > 360){
            figure[i].angle -= 360;
        } else if (figure[i].angle < 0){
            figure[i].angle += 360;
        }
    }

}

function drawFigures() {
    for (let i=0;i < countFigure; i++){
        figure[i].funcDrawFigure();
    }
}
setInterval(function () {
    ctx.clearRect(0,0,wall.width,wall.height);
    moveFigures();
    drawFigures();

}, 50);