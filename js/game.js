import { Ball } from "./ball.js";
import Paddle from "./paddle.js";
import BrickGrid from "./brick.js";
import { Scoreboard } from "./score.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddle = new Paddle(50, 10, "#0000FF", canvas);
const bricks = new BrickGrid(canvas.width);
let scoreboard = new Scoreboard(canvas, bricks);

let ballSpeedX = randomFloat(-4, 4);

let ball = new Ball(canvas.width / 2, canvas.height / 2, 10, ballSpeedX, 4, canvas, paddle, bricks, scoreboard);

let game = true; 

function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function restartGame() {
    scoreboard.reset();
    paddle = new Paddle(50, 10, "#0000FF", canvas);
    bricks = new BrickGrid(canvas.width);
    ball = new Ball(canvas.width / 2, canvas.height / 2, 10, randomFloat(-4, 4), 4, canvas, paddle, bricks, scoreboard);
    ball.started = true;
    game = true;
    document.getElementById('gameOverScreen').style.display = 'none';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameLoop();
}

async function gameLoop() {
    if (!game){
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ball.move();
    ball.draw(ctx);
    
    paddle.update();
    paddle.draw(ctx);
    
    bricks.draw(ctx);

    if (ball.y > canvas.height) {
        if (scoreboard.loseLife()) {
            game = false;
            scoreboard.showGameOver();
            return;
        } else {
            let ballSpeedY = ball.speedY;
            ball.x = randomFloat(50, canvas.width - 50);
            ball.y = canvas.height / 2;
            ball.speedX = randomFloat(-4, 4);
            ball.speedY = ballSpeedY;
            ball.started = true;
            await wait(1000);
        }
    }

    requestAnimationFrame(gameLoop);

}

gameLoop();