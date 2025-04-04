export class Ball {
    constructor(x, y, radius, speedX, speedY, canvas, paddle, bricks) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        this.canvas = canvas;
        this.paddle = paddle;
        this.bricks = bricks;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x + this.radius > this.canvas.width || this.x - this.radius < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y - this.radius < 0) {
            this.speedY = -this.speedY;
        }

        if (
            this.y + this.radius > this.canvas.height - this.paddle.height - 10 &&
            this.x > this.paddle.center &&
            this.x < this.paddle.center + this.paddle.width
        ) {
            this.speedY = -Math.abs(this.speedY);
            const hitPoint = (this.x - this.paddle.center) / (this.paddle.width / 2);
            this.speedX = hitPoint * 1.5;
        }

        if (this.bricks && this.bricks.checkCollision(this)) {
            this.speedY = -this.speedY;
        }
    }
}