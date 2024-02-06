class StartEndScreen extends DrawableObject {
    constructor() {
        super();
        this.loadImage('img/9_intro_outro_screens/start/startscreen_1.png');
        this.currentImage = 0;
        this.startTime = null;
    }

    draw(ctx) {
        if (this.imageCache[Object.keys(this.imageCache)[this.currentImage]]) {
            this.img = this.imageCache[Object.keys(this.imageCache)[this.currentImage]];
        }
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        console.log('Image loaded: ', this.img);
    }

    startScreen() {
        this.startTime = Date.now();
        this.draw(ctx);
        this.requestAnimationFrame();
    }

    requestAnimationFrame() {
        if (Date.now() - this.startTime < 5000) {
            console.log('Time passed: ', Date.now() - this.startTime);
            requestAnimationFrame(() => this.startScreen());
        } else {
            // Start the game here
        }
    }

}

