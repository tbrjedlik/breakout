class Brick {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.status = 1;
    }

    draw(ctx) {
        if (this.status === 1) {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
    }
}

class BrickGrid {
    constructor(canvasWidth) {
        this.bricks = [];
        this.brickRowCount = 5;
        this.brickColumnCount = 7;
        this.brickWidth = 75;
        this.brickHeight = 20;
        this.brickPadding = 10;
        this.brickOffsetTop = 30;
        this.brickOffsetLeft = (canvasWidth - (this.brickColumnCount * (this.brickWidth + this.brickPadding))) / 2;

        this.rowColors = ["#FF0000", "#FF4500", "#FFFF00", "#00FF00", "#00FFFF"];

        this.initBricks();
    }

    initBricks() {
        for (let row = 0; row < this.brickRowCount; row++) {
            this.bricks[row] = [];
            for (let col = 0; col < this.brickColumnCount; col++) {
                const brickX = col * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
                const brickY = row * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
                const color = this.rowColors[row];
                this.bricks[row][col] = new Brick(brickX, brickY, this.brickWidth, this.brickHeight, color);
            }
        }
    }

    draw(ctx) {
        for (let row = 0; row < this.brickRowCount; row++) {
            for (let col = 0; col < this.brickColumnCount; col++) {
                if (this.bricks[row][col]) {
                    this.bricks[row][col].draw(ctx);
                }
            }
        }
    }

    checkCollision(ball) {
        for (let row = 0; row < this.brickRowCount; row++) {
            for (let col = 0; col < this.brickColumnCount; col++) {
                const brick = this.bricks[row][col];
                if (brick && brick.status === 1) {
                    if (
                        ball.x + ball.radius > brick.x &&
                        ball.x - ball.radius < brick.x + brick.width &&
                        ball.y + ball.radius > brick.y &&
                        ball.y - ball.radius < brick.y + brick.height
                    ) {
                        this.bricks[row][col].status = 0;
                        return true;
                    }
                }
            }
        }
        return false;
    }

    allCleared() {
        for (let row = 0; row < this.brickRowCount; row++) {
            for (let col = 0; col < this.brickColumnCount; col++) {
                const brick = this.bricks[row][col];
                if (brick && brick.status === 1) {
                    return false;
                }
            }
        }
        return true;
    }
}

export default BrickGrid;
