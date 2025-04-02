import { Ball } from "./ball.js";
import Paddle from "./paddle.js";
import BrickGrid from "./brick.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddle = new Paddle(50, 10, "#0000FF", canvas);
const ball = new Ball(canvas.width / 2, canvas.height / 2, 10, 4, -4, canvas, paddle);
const bricks = new BrickGrid(canvas.width)

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball.move();
    ball.draw(ctx);

    paddle.update();
    paddle.draw(ctx);

    bricks.draw(ctx);

    requestAnimationFrame(gameLoop);
}

gameLoop();