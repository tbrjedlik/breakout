import { Ball } from "./ball.js";
import Paddle from "./paddle.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const ball = new Ball(canvas.width / 2, canvas.height / 2, 10, 4, -4, canvas);
const paddle = new Paddle(50, 10, "#0000FF", canvas);

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.center, canvas.height - paddle.height - 10, paddle.width, paddle.height);
    ctx.fillStyle = paddle.color;
    ctx.fill();
    ctx.closePath();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball.move();
    ball.draw(ctx);

    paddle.update();
    drawPaddle();

    requestAnimationFrame(gameLoop);
}

gameLoop();