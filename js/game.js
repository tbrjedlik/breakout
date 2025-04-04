import { Ball } from "./ball.js";
import Paddle from "./paddle.js";
import BrickGrid from "./brick.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddle = new Paddle(50, 10, "#0000FF", canvas);
const bricks = new BrickGrid(canvas.width);

let ballSpeedX = randomFloat(-4, 4);
// console.log(ballSpeedX)
const ball = new Ball(canvas.width / 2, canvas.height / 2, 10, ballSpeedX, 4, canvas, paddle, bricks);
// constructor(x, y, radius, speedX, speedY, canvas, paddle, bricks) {



function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball.move();
    ball.draw(ctx);
    
    paddle.update();
    paddle.draw(ctx);
    
    bricks.draw(ctx);

    requestAnimationFrame(gameLoop);
}

function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}


  gameLoop();

  