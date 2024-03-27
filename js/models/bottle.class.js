class Bottles extends DrawableObject {
    Bottle = ['img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'];


    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.Bottle);
        this.height = 100;
        this.width = 100;
        this.y = 345;
        this.x = 400 + Math.random() * 1900;
        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.Bottle);
        }, 1000 / 2);
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}