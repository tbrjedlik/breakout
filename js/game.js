import { Ball } from "./ball.js";
import Paddle from "./paddle.js";
import BrickGrid from "./brick.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddle = new Paddle(50, 10, "#0000FF", canvas);
const bricks = new BrickGrid(canvas.width);

let ballSpeedX = randomFloat(-4, 4);

let ball = new Ball(canvas.width / 2, canvas.height / 2, 10, ballSpeedX, 4, canvas, paddle, bricks);

let game = true; 
let lives = 1;
console.log(lives)

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
    
    requestAnimationFrame(gameLoop);
    
    if (ball.y > canvas.height) {
        lives--;
        console.log(lives)
        
        if (lives > 0) {
            
            ball.speedX = 0;
            let ballSpeedY = ball.speedY; 
            ball.speedY = 0;
            ball.y = canvas.height-1000
            
            await wait(2000);
            
            ball.x = randomFloat(50,canvas.width - 50);
            ball.y = canvas.height / 2;
            ball.speedX = randomFloat(-4, 4);
            ball.speedY = ballSpeedY
            
            ball.started = true;
            
            
        } else {
            console.log("Game Over");
            await wait(35);
            ball = null;
            game = false;
            return;
        }
    }
}

function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

gameLoop();

  