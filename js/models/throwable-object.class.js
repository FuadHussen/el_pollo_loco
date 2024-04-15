class ThrowAbleObject extends MovableObject {
    world;
    speedY = 30;
    speedX = 20;
    break = false;


    IMAGE_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGE_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    bottle_break = new Audio('audio/bottleBreak.mp3');


    constructor(x, y, direction) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGE_BOTTLE_ROTATION);
        this.loadImages(this.IMAGE_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 90;
        this.width = 75;
        this.throw(direction);
    }


    /**
     * Throws the bottle in the specified direction.
     * @param {string} direction - The direction in which the bottle is thrown ('left' or 'right').
     */
    throw(direction) {
        this.speedY = 30;
        this.applyGravitiy();
        let moveInterval = setStoppableInterval(() => {
            this.move(direction);
            if (this.break) {
                clearInterval(moveInterval);
            }
        }, 75);
        setStoppableInterval(this.rotate.bind(this), 100);
    }


    /**
     * Moves the bottle horizontally based on its throwing direction.
     * @param {string} direction - The direction in which the bottle is thrown ('left' or 'right').
     */
    move(direction) {
        if (!this.break) {
            if (direction === 'left') {
                this.x -= this.speedX;
            } else {
                this.x += this.speedX;
            }
            if (this.y >= 350) {
                this.break = true;
            }
        }
    }


    /**
     * Checks if the bottle is above the ground level.
     * @returns {boolean} - True if the bottle is above the ground, otherwise false.
     */
    isAboveGround() {
        return this.y < 350;
    }


    speedY30 = () => {
        this.speedY = 30;
    };


    /**
     * Rotates the bottle during its flight, and triggers splash animation upon collision.
     */
    rotate() {
        if (this.break) {
            this.acceleration = 0;
            this.speedY = 0;
            this.speedX = 0;
            if (!this.splashPlayed) {
                this.playSplashAnimation();
                this.splashPlayed = true;
                if (this.world.soundElement.isMuted) { // Check if sound is not muted
                    this.bottle_break.play(); // If not muted, play the sound
                }
            }
        } else {
            this.playAnimation(this.IMAGE_BOTTLE_ROTATION);
        }
    }    


    /**
     * Plays the splash animation when the bottle collides with the ground.
     */
    playSplashAnimation() {
        let currentIndex = 0;
        let interval = setStoppableInterval(() => {
            this.playAnimation(this.IMAGE_BOTTLE_SPLASH);
            currentIndex++;
            if (currentIndex >= this.IMAGE_BOTTLE_SPLASH.length) {
                clearInterval(interval);
                setTimeout(() => {
                    this.removeSelf();
                }, 50);
            }
        }, 50);
    }


    /**
     * Removes the bottle from the game.
     */
    removeSelf() {
        let index = this.world.throwAbleObject.indexOf(this);
        if (index !== -1) {
            this.world.throwAbleObject.splice(index, 1);
        }
    }
}