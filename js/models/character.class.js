class Character extends MovableObject {

    height = 280;
    y = 70;
    speed = 2;
    currentEnemy;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]

    GAME_OVER = ['img/9_intro_outro_screens/game_over/game over.png'];

    world;

    walking_sound = new Audio('audio/running.mp3');
    dead_chicken = new Audio('audio/deadChicken.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    snoring_sound = new Audio('audio/snoringSound.mp3');

    isWalking = false;



    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.GAME_OVER);
        this.applyGravitiy();
        this.updateGameLogic();
        this.animate();
        this.updateCharacterStatus();
    }


    /**
     * Updates the game logic for the character.
     */
    updateGameLogic() {
        setStoppableInterval(() => {
            this.jumpOnChicken();
            this.bottleOnChicken();
        }, 1000 / 60);
    }


    /**
     * Animates the character.
     */
    animate() {
        setStoppableInterval(() => this.moveCharacter(), 1000 / 1000);
    }


    /**
     * Updates the status of the character.
     */
    updateCharacterStatus() {
        setStoppableInterval(() => this.playCharacter(), 100);
    }


    /**
     * Moves the character based on user input.
     */
    moveCharacter() {
        this.walking_sound.pause();
        if (this.canMoveRight()) {
            this.moveRight();
        }
        if (this.canMoveLeft()) {
            this.moveLeft();
        }
        if (this.canJump()) {
            this.jump();
            if (this.world.soundElement.isMuted) {
                this.jump_sound.play();
            }
        }
        if (this.canJumpSpace()) {
            this.jump();
            if (this.world.soundElement.isMuted) {
                this.jump_sound.play();
            }
        }
        this.world.camera_x = -this.x + 100;
    }


    /**
     * Checks if the character can jump.
     * @returns {boolean} True if the character can jump 
     */
    canJump() {
        return this.world.keyboard.UP && !this.isAboveGround();
    }


    /**
     * Checks if the character can jump.
     * @returns {boolean} True if the character can jump 
     */
    canJumpSpace() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }


    /**
     * Checks if the character can move right.
     * @returns {boolean} True if the character can move right
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }


    /**
     * Checks if the character can move left
     * @returns {boolean} True if the character can move left
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }


    /**
     * Moves the character to the right and plays the associated sound.
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        if (this.world.soundElement.isMuted) {
            this.walking_sound.play();
        }
    }


    /**
     * Moves the character to the left and plays the associated sound.
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        if (this.world.soundElement.isMuted) {
            this.walking_sound.play();
        }
    }


    /**
     * Plays the character's animation based on its status.
     */
    playCharacter() {
        if (this.isDead()) {
            this.characterDead();
            i++;
        } else if (this.isHurt()) {
            this.characterHurt();
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
            this.move();
            this.checkInactivity();
        }
    }

    /**
     * Checks the inactivity of the character and plays the sleep animation along with the snoring sound.
     */
    checkInactivity() {
        const currentTime = Date.now();
        const timeSinceLastMovement = currentTime - this.lastMovementTime;
        if (timeSinceLastMovement >= 5000) {
            this.playSleepAnimation();
            this.playSnoringSound();
        }
    }


    /**
     * Plays the sleep animation of the character along with the snoring sound.
     */
    playSleepAnimation() {
        let i = 0;
        if (i < 20) {
            this.playAnimation(this.IMAGES_SLEEP);
            if (this.world.soundElement.isMuted) {
                this.snoring_sound.play();
            }
        }
    }


    /**
     * Plays the snoring sound.
     */
    playSnoringSound() {
        if (this.world.soundElement.isMuted) {
            this.snoring_sound.play();
        }
    }


    /**
     * Displays the dead character animation and shows the end screen overlay.
     */
    characterDead() {
        let i = 0;
        if (i < 7) {
            this.playAnimation(this.IMAGES_DEAD);
            setTimeout(() => this.world.showEndScreen(), 1000);
            this.walking_sound.pause();
        }
    }


    /**
     * Displays the hurt animation of the character and plays the associated sound.
     */
    characterHurt() {
        this.playAnimation(this.IMAGES_HURT);
        if (this.world.soundElement.isMuted) {
            this.hurt_sound.play();
        }
    }


    /**
     * Moves the character and plays the walking animation.
     */
    move() {
        if (this.leftOrRight()) {
            this.playAnimation(this.IMAGES_WALKING);
            this.lastMovementTime = Date.now();
        }
    }


    /**
     * Checks if the character is moving left or right
     * @returns {boolean} True if the character is moving left or right
     */
    leftOrRight() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }


    /**
     * Makes the character jump by setting the vertical speed.
     */
    jump() {
        this.speedY = 25;
    }


    /**
     * Checks if the character has jumped on any chicken enemies and performs actions accordingly.
     */
    jumpOnChicken() {
        this.world.level.enemies.forEach((enemy, index) => {
            this.characterJumpedOnChicken(enemy, index);
        });
    }


    /**
     * Handles the logic when the character jumps on a chicken enemy.
     * @param {object} enemy - The chicken enemy that the character has jumped on.
     * @param {number} index - The index of the enemy in the enemies array.
     */
    characterJumpedOnChicken(enemy, index) {
        if (this.jumpOnEnemy(enemy)) {
            this.removeEnemy(enemy, index);
            this.jump();
            if (this.world.soundElement.isMuted) {
                this.dead_chicken.play();
            }
        }
    }


    /**
     * Determines if the character is currently jumping on an enemy.
     * @param {object} enemy - The enemy being checked for collision.
     * @returns {boolean} True if the character is jumping on the enemy
     */
    jumpOnEnemy(enemy) {
        return (enemy instanceof Chicken || enemy instanceof SmallChicken) &&
            this.isColliding(enemy) &&
            this.isAboveGround() &&
            this.speedY < 0;
    }


    /**
     * Handles the character getting hit by the endboss and adjusts character's energy accordingly.
     * @param {number} damage - The amount of damage inflicted by the endboss.
     */
    hitByEndboss(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Checks for collisions between bottles and chicken enemies, triggering actions accordingly.
     */
    bottleOnChicken() {
        this.world.throwAbleObject.forEach((bottle) => {
            if (!bottle.enemyHit) {
                this.world.level.enemies.forEach((enemy, index) => {
                    if (!bottle.enemyHit && this.checkBottleCollision(bottle, enemy)) {
                        setTimeout(() => {
                            bottle.enemyHit = true;
                            this.bottleHitEnemy(enemy, index);
                        }, 0);
                    }
                });
            }
        });
    }


    /**
     * Handles the logic when a bottle thrown by the character hits an enemy.
     * @param {object} enemy - The enemy that the bottle hit.
     * @param {number} index - The index of the enemy in the enemies array.
     */
    bottleHitEnemy(enemy, index) {
        if (enemy instanceof Endboss) {
            if (this.world.endbossStatusbar.percentage <= 0) {
                enemy.deadAnimation();
                if (this.world.soundElement.isMuted) {
                    this.dead_chicken.play();
                }
                this.removeEnemy(enemy, index);
                setStoppableInterval(() => this.world.showEndScreen(), 1000);
            } else {
                enemy.endbossHurt(30);
                enemy.getSmaller();
            }
        } else {
            this.removeEnemy(enemy, index);
            if (this.world.soundElement.isMuted) {
                this.dead_chicken.play();
            }
        }
    }


    /**
     * Checks for collision between a bottle and an enemy.
     * @param {object} bottle - The bottle being checked for collision.
     * @param {object} enemy - The enemy being checked for collision.
     * @returns {boolean} True if there is a collision between the bottle and the enemy
     */
    checkBottleCollision(bottle, enemy) {
        return bottle.isColliding(enemy) && (enemy instanceof Chicken || enemy instanceof SmallChicken || enemy instanceof Endboss)
    }


    /**
     * Removes an enemy from the level after it's been defeated.
     * @param {object} enemy - The enemy to be removed.
     * @param {number} index - The index of the enemy in the enemies array.
     */
    removeEnemy(enemy, index) {
        enemy.dead = true;
        setTimeout(() => this.world.level.enemies.splice(index, 1), 500);
    }
}
