class Coins extends DrawableObject {
    COIN = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];


    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.COIN);
        this.height = 175;
        this.width = 175;
        this.y = 320;
        this.x = 400 + Math.random() * 1500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.COIN);
        }, 1000 / 2);
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}
