import { Ball } from "./ball.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const ball = new Ball(canvas.width / 2, canvas.height / 2, 10, 4, -4, canvas);

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball.move();
    ball.draw(ctx);

    requestAnimationFrame(gameLoop);
}

gameLoop();