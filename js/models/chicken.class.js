class Chicken extends MovableObject {

    y = 370;
    height = 60;
    width = 80;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 1800;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }


    /**
     * Animates the chicken object by moving it left and playing the walking animation.
     * If the chicken is dead it plays the dead animation instead.
     */
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


    /**
     * Removes the dead chicken after a certain interval.
     * This method is called when the chicken is dead.
     */
    deadChicken() {
        if (this.isDead()) {
            setStoppableInterval(() => {
                world.removeChicken(this);
            }, 100);
            this.playAnimation(this.IMAGES_DEAD);
        }
    }
}