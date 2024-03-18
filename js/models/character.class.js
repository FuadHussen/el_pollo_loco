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


    updateGameLogic() {
        setStoppableInterval(() => {
            this.jumpOnChicken();
            this.bottleOnChicken();
        }, 1000 / 60);
    }


    animate() {
        setStoppableInterval(() => this.moveCharacter(), 1000 / 1000);
    }


    updateCharacterStatus() {
        setStoppableInterval(() => this.playCharacter(), 100);
    }


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
            this.jump_sound.play();
        }
        if (this.canJumpSpace()) {
            this.jump();
            this.jump_sound.play();
        }
        this.world.camera_x = -this.x + 100;
    }


    canJump() {
        return this.world.keyboard.UP && !this.isAboveGround();
    }


    canJumpSpace() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }


    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }


    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }


    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        this.walking_sound.play();
    }


    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
    }


    playCharacter() {
        if (this.isDead()) {
            this.characterDead();
            i++;
        } else if (this.isHurt()) {
            this.characterHurt();
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            this.move();
            this.checkInactivity();
        }
    }
    
    checkInactivity() {
        const currentTime = Date.now();
        const timeSinceLastMovement = currentTime - this.lastMovementTime;
        if (timeSinceLastMovement >= 5000) { 
            this.playSleepAnimation();
            this.playSnoringSound();
        }
    }
    
    playSleepAnimation() {    
        let i = 0;
        if (i < 20) {
            this.playAnimation(this.IMAGES_SLEEP);
            this.snoring_sound.play();
        }    
    }
        
    
    playSnoringSound() {
        this.snoring_sound.play();
    }
    


    characterDead() {
        let i = 0;
        if (i < 7) {
            this.playAnimation(this.IMAGES_DEAD);
            setTimeout(() => this.world.showEndScreen(), 1000);
            this.walking_sound.pause();
        }
    }


    characterHurt() {
        this.playAnimation(this.IMAGES_HURT);
        this.hurt_sound.play();
    }


    move() {
        if (this.leftOrRight()) {
            this.playAnimation(this.IMAGES_WALKING);
            this.lastMovementTime = Date.now();
        }
    }


    leftOrRight() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }


    jump() {
        this.speedY = 25;
    }


    jumpOnChicken() {
        this.world.level.enemies.forEach((enemy, index) => {
            this.characterJumpedOnChicken(enemy, index);
        });
    }


    characterJumpedOnChicken(enemy, index) {
        if (this.jumpOnEnemy(enemy)) {
            this.removeEnemy(enemy, index);
            this.jump();
            this.dead_chicken.play();
        }
    }


    jumpOnEnemy(enemy) {
        return (enemy instanceof Chicken || enemy instanceof SmallChicken) &&
            this.isColliding(enemy) &&
            this.isAboveGround() &&
            this.speedY < 0;
    }


    hitByEndboss(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


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


    bottleHitEnemy(enemy, index) {
        if (enemy instanceof Endboss) {
            if (this.world.endbossStatusbar.percentage <= 0) {
                enemy.deadAnimation();
                this.dead_chicken.play();
                this.removeEnemy(enemy, index);
                setStoppableInterval(() => this.world.showEndScreen(), 1000);
            } else {
                enemy.endbossHurt(30);
                enemy.getSmaller();
            }
        } else {
            this.removeEnemy(enemy, index);
            this.dead_chicken.play();
        }
    }


    checkBottleCollision(bottle, enemy) {
        return bottle.isColliding(enemy) && (enemy instanceof Chicken || enemy instanceof SmallChicken || enemy instanceof Endboss)
    }


    removeEnemy(enemy, index) {
        enemy.dead = true;
        setTimeout(() => this.world.level.enemies.splice(index, 1), 500);
    }
}
