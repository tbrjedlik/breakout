export class Scoreboard {
    constructor(canvas, brickGrid) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.brickGrid = brickGrid;
        this.score = 0;
        this.highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
        this.lives = 3;
        this.highScoreElement = document.querySelector('#scoreboard .high-score');
        this.livesElement = document.querySelector('#scoreboard .lives');
        this.scoreElement = document.querySelector('#scoreboard .score');
        this.updateDisplay();
    }

    updateDisplay() {
        this.highScoreElement.textContent = `High Score: ${this.highScore}`;
        this.livesElement.textContent = `Lives: ${this.lives}`;
        this.scoreElement.textContent = `Score: ${this.score}`;
    }

    addPoint() {
        this.score++;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('highScore', this.highScore);
        }
        this.updateDisplay();
    }

    loseLife() {
        this.lives--;
        this.updateDisplay();
        return this.lives <= 0;
    }

    reset() {
        this.score = 0;
        this.lives = 3;
        this.updateDisplay();
    }

    showGameOver() {
        const gameOverScreen = document.getElementById('gameOverScreen');
        const finalScoreText = document.getElementById('finalScore');
        const highScoreText = document.getElementById('highScore');
        finalScoreText.textContent = `Score: ${this.score}`;
        highScoreText.textContent = `High Score: ${this.highScore}`;
        gameOverScreen.style.display = 'flex';
    }
}