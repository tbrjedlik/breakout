export class Scoreboard {
    constructor(canvas, brickGrid) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.heartsCanvas = document.getElementById("heartsCanvas");
        this.heartsCtx = this.heartsCanvas.getContext("2d");
        this.brickGrid = brickGrid;
        this.score = 0;
        this.highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
        this.lives = 3;
        this.scoreElement = document.getElementById('scoreContainer'); // <- új
        this.updateDisplay();
    }

    updateDisplay() {
        const formattedScore = this.score.toString().padStart(3, '0');
        this.scoreElement.textContent = `${formattedScore}`;
        this.drawHearts();
    }

    drawHearts() {
        this.heartsCtx.clearRect(0, 0, this.heartsCanvas.width, this.heartsCanvas.height);

        const heartPattern = [
            [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        const pixelSize = 3;
        for (let i = 0; i < this.lives; i++) {
            const xOffset = i * 44;
            const yOffset = 0;
            for (let y = 0; y < 12; y++) {
                for (let x = 0; x < 12; x++) {
                    if (heartPattern[y][x] === 1) {
                        this.heartsCtx.fillStyle = '#ffffff';
                        this.heartsCtx.fillRect(xOffset + x * pixelSize, yOffset + y * pixelSize, pixelSize, pixelSize);
                    }
                }
            }
        }
    }

    render() {
        this.drawHearts();
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
        finalScoreText.textContent = `Score: ${this.score.toString().padStart(3, '0')}`;
        highScoreText.textContent = `High Score: ${this.highScore.toString().padStart(3, '0')}`;
        gameOverScreen.style.display = 'flex';
    }
}
