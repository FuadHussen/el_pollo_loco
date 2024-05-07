class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    isAlive = true;


    applyGravitiy() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
     * Checks if the object is above the ground.
     * @returns {boolean} - True if the object is above the ground, otherwise false.
     */
    isAboveGround() {
        return this.y < 150
    }


    /**
     * Checks if the object is colliding with another object.
     * @param {Object} obj - The object to check collision with.
     * @returns {boolean} - True if the objects are colliding, otherwise false.
     */
    isColliding(obj) {
        return (
            this.x + this.width >= obj.x &&
            this.y + this.height >= obj.y &&
            this.x <= obj.x + obj.width &&
            this.y <= obj.y + obj.height
        );
    }    


    /**
     * Reduces the energy of the object when hit.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Checks if the object is currently hurt.
     * @returns {boolean} - True if the object is hurt
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; //Difference in ms
        timePassed = timePassed / 1000; //Differnece in s
        return timePassed < 1;
    }


    /**
     * Checks if the object is dead.
     * @returns {boolean} - True if the object is dead, otherwise false.
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * Plays animation by cycling through a set of images.
     * @param {Array} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Moves the object to the left.
     */
    moveLeft() {
        if (this.isAlive && world.endboss.isAlive) {
            this.x -= this.speed;
        }
    }


    /**
     * Moves the object to the right.
     */
    moveRight() {
        if (this.isAlive && world.endboss.isAlive) {
            this.x += this.speed;
        }
    }


    /**
     * Initiates a jump action for the object.
     */
    jump() {
        if (this.isAlive && world.endboss.isAlive) {
            this.speedY = 25;
        }
    }
}