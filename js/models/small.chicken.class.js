class SmallChicken extends MovableObject {

    width = 75;
    height = 75;
    y = 360;
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
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    
        setInterval(() => {
            if (this.isDead()) {
                this.deadSmallChicken();
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }    


    deadSmallChicken() {
        if (this.isDead()) {
            setInterval(() => {
            world.removeChicken(this);
            }, 500);
            this.playAnimation(this.IMAGES_DEAD);
        }
    }
}