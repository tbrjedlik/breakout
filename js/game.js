import { Ball } from "./ball.js";
import Paddle from "./paddle.js";
import BrickGrid from "./brick.js";
import { Scoreboard } from "./score.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddle = new Paddle(50, 10, "#0000FF", canvas);
let bricks = new BrickGrid(canvas.width);
let scoreboard = new Scoreboard(canvas, bricks);
let isLoadingNewLevel = false;
let levelClearedTime = null;
let currentLevel = 0;

let ballSpeedX = randomFloat(-4, 4);
let ball = new Ball(canvas.width / 2, canvas.height / 2, 10, ballSpeedX, 4, canvas, paddle, bricks, scoreboard);

let game = true;
let waitingForBall = false;
export let gameEnding = false;
let gameStarted = false; // Flag to track if the game has started

function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function playSound(src, volume = 1) {
    const sound = new Audio(src);
    sound.volume = volume;
    sound.play();
}

function restartGame() {
    scoreboard.reset();
    paddle.center = (canvas.width - paddle.width) / 2;
    bricks = new BrickGrid(canvas.width);
    ball = new Ball(canvas.width / 2, canvas.height / 2, 10, randomFloat(-4, 4), 4, canvas, paddle, bricks, scoreboard);
    ball.started = false;
    game = true;
    waitingForBall = false;
    gameEnding = false;
    gameStarted = false;
    currentLevel = 0;
    levelClearedTime = null;
    document.getElementById('gameOverScreen').style.display = 'none';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Silkscreen";
    showControlScreen();
}

async function resetBallAfterLifeLoss() {
    waitingForBall = true;
    await wait(2000);
    ball.x = randomFloat(50, canvas.width - 50);
    ball.y = canvas.height / 2;
    ball.speedX = randomFloat(-4, 4);
    ball.started = true;
    waitingForBall = false;
    playSound('sounds/ball_launch.wav', 0.3);
}

async function endGameWithDelay() {
    await wait(1500);
    game = false;
    scoreboard.showGameOver();
    buttonSounds();
}

function showControlScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "60px Silkscreen";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    const colors = ["red", "orange", "yellow", "yellowgreen", "cyan"];
    const title = "BREAKOUT";
    
    const titleWidth = ctx.measureText(title).width;
    let currentX = canvas.width / 2 - titleWidth / 2;

    for (let i = 0; i < title.length; i++) {
        const letter = title[i];
        ctx.fillStyle = colors[i % colors.length]; // Cycle through colors
        const letterWidth = ctx.measureText(letter).width;
        ctx.fillText(letter, currentX + letterWidth / 2, canvas.height / 4);
        currentX += letterWidth; // Move to the next letter's position
    }

    ctx.fillStyle = "white";
    ctx.font = "20px Silkscreen";
    ctx.fillText("Move Paddle:", canvas.width / 2, canvas.height / 2 + 80);

    ctx.beginPath();
    ctx.rect(canvas.width / 2 - 60, canvas.height / 2 + 100, 30, 30);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.font = "20px Silkscreen";
    ctx.fillText("<", canvas.width / 2 - 45, canvas.height / 2 + 120);

    ctx.beginPath();
    ctx.rect(canvas.width / 2 + 30, canvas.height / 2 + 100, 30, 30);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fillText(">", canvas.width / 2 + 45, canvas.height / 2 + 120);

    paddle.draw(ctx);
    ball.draw(ctx);

    ctx.font = "20px Silkscreen";
    ctx.fillText("Press UP Arrow Key to Start", canvas.width / 2, canvas.height * 3 / 4);
}

document.addEventListener("keydown", (e) => {
    if (!gameStarted && (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        gameStarted = true;
        ball.started = true;
        gameLoop();
    }
});

function startLevelTransitionDelay() {
    if (!levelClearedTime) {
        levelClearedTime = performance.now();
    }
}

function tryStartNewLevel() {
    const now = performance.now();
    if (levelClearedTime && now - levelClearedTime >= 5000) {
        levelClearedTime = null;
        bricks = new BrickGrid(canvas.width);
        ball.updateBricks(bricks);
        isLoadingNewLevel = false;
        playSound('sounds/next_level.wav',0.7);
    }
}

function gameLoop() {
    if (!game) return;

    if (!gameStarted) {
        ctx.font = "30px Silkscreen";
        showControlScreen();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    paddle.update();
    paddle.draw(ctx);

    bricks.draw(ctx);

    if (!waitingForBall) {
        ball.move();
        ball.draw(ctx);
    }

    if (bricks.allCleared() && !isLoadingNewLevel) {
        isLoadingNewLevel = true;
        currentLevel++;
        startLevelTransitionDelay();
    }

    if (isLoadingNewLevel) {
        tryStartNewLevel();
    }

    if (ball.y > canvas.height && !waitingForBall && !gameEnding) {
        if (scoreboard.loseLife()) {
            gameEnding = true;
            playSound('sounds/game_over.wav', 0.3);
            endGameWithDelay();
        } else {
            playSound('sounds/lose_life.wav', 0.3);
            resetBallAfterLifeLoss();
        }
    }

    scoreboard.render();
    requestAnimationFrame(gameLoop);
}

function buttonSounds() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            playSound('sounds/button_hover.wav', 0.05);
        });
        button.addEventListener('click', () => {
            playSound('sounds/button_click.wav', 1);
        });
    });

    const restartButton = document.getElementById('restartButton');
    if (restartButton) {
        restartButton.addEventListener('click', restartGame);
    }
}

document.addEventListener('DOMContentLoaded', buttonSounds);

showControlScreen();
gameLoop();
