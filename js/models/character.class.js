class Character extends MovableObject {

    height = 280;
    y = 70;
    speed = 2;
    currentEnemy;
    // currentChicken = null;
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

    GAME_OVER = ['img/9_intro_outro_screens/game_over/game over.png'];

    world;

    walking_sound = new Audio('audio/running.mp3');
    bottle_break = new Audio('audio/bottleBreak.mp3');
    dead_chicken = new Audio('audio/deadChicken.mp3');
    jump_sound = new Audio('audio/jump.mp3');

    isWalking = false;

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    offset = {
        top: 120,
        left: 40,
        right: 30,
        bottom: 20,
    };


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.GAME_OVER);
        this.applyGravitiy();
        this.animate();
    }


    animate() {
        let i = 0;
        setInterval(() => {
            this.jumpOnChicken();
            this.bottleOnChicken();
        }, 1000 / 60);

        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
                this.jump_sound.play();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.jump_sound.play();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 1000);

        setInterval(() => {
            if (this.isDead()) {
                if (i < 7) {
                    this.playAnimation(this.IMAGES_DEAD);
                    setTimeout(() => {
                        this.world.showEndScreen();
                    }, 1000);
                    this.walking_sound.pause();
                }
                i++;
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 100);
    } 


    jump() {
        this.speedY = 25;
    }


    jumpOnChicken() {
        this.world.level.enemies.forEach((enemy, index) => {
            if (this.jumpOnEnemy(enemy)) {
                this.removeEnemy(enemy, index);
                this.jump();
                this.dead_chicken.play();
            }
        });
    }


    jumpOnEnemy(enemy) {
        return (enemy instanceof Chicken ||  enemy instanceof SmallChicken /*|| enemy instanceof Endboss*/) &&  
            this.isColliding(enemy) &&      
            this.isAboveGround() &&     
            this.speedY < 0;                
    }


    bottleOnChicken() {
        this.world.throwAbleObject.forEach((bottle) => {
            if (!bottle.enemyHit) {
                this.world.level.enemies.forEach((enemy, index) => {
                    if (!bottle.enemyHit && this.checkBottleCollision(bottle, enemy)) {
                        setTimeout(() => {
                            bottle.enemyHit = true;
                            if (enemy instanceof Endboss) {
                                if (this.world.endbossStatusbar.percentage <= 0) {
                                    enemy.deadAnimation();
                                    this.removeEnemy(enemy, index);
                                } else {
                                    enemy.endbossHurt();
                                    enemy.getSmaller();
                                }
                            } else {
                                this.removeEnemy(enemy, index);
                                this.dead_chicken.play();
                            }
                        }, 0);
                    }
                });
            }
        });
    }
    
    checkBottleCollision(bottle, enemy) {
        return bottle.isColliding(enemy) && (enemy instanceof Chicken || enemy instanceof SmallChicken || enemy instanceof Endboss)
    }
    

    removeEnemy(enemy, index) {
        enemy.dead = true;
        setTimeout(() => this.world.level.enemies.splice(index, 1), 500);
    }
}
