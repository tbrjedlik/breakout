import Paddle from "./paddle.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddle = new Paddle(50, 10, "#0000FF", canvas);

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.center, canvas.height - paddle.height - 10, paddle.width, paddle.height);
    ctx.fillStyle = paddle.color;
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle();
    paddle.update();

    requestAnimationFrame(draw);
}

draw();