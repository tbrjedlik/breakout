export default class Paddle {
    constructor(width, height, color, canvas) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.canvas = canvas;
        this.center = (canvas.width - this.width) / 2;
        this.rightPressed = false;
        this.leftPressed = false;

        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));
    }

    keyDownHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            this.rightPressed = true;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            this.leftPressed = true;
        }
    }

    keyUpHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            this.rightPressed = false;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            this.leftPressed = false;
        }
    }

    update() {
        if (this.rightPressed && this.center < this.canvas.width - this.width) {
            this.center += 7;
        } else if (this.leftPressed && this.center > 0) {
            this.center -= 7;
        }
    }
}