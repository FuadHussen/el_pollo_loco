class SmallChicken extends MovableObject {

    width = 50;
    height = 50;
    y = 390;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 1500;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }


    animate() {
        let walkingInterval = setInterval(() => {
            if (!this.dead) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                clearInterval(walkingInterval); // Stops the walking animation
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 5);
    }


    deadChicken() {
        if (this.isDead()) {
            setStoppableInterval(() => {
                world.removeChicken(this);
            }, 100);
            this.playAnimation(this.IMAGES_DEAD);
        }
    }
}