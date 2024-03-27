class Endboss extends MovableObject {

    width = 350;
    height = 350;
    y = 80;
    endbossStatusbar = new EndbossStatusBar();


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    ENDBOSS_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    ENDBOSS_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    ENDBOSS_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    hadFirstContact = false;
    currentImageIndexHurt = 0;
    endboss_sound = new Audio('audio/endbossSound.mp3');


    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.ENDBOSS_WALKING);
        this.loadImages(this.ENDBOSS_HURT);
        this.loadImages(this.ENDBOSS_DEAD);
        this.x = 2450;
        this.animate();
    }


    animate() {
        let animationInterval;

        let startAnimation = () => {
            animationInterval = setStoppableInterval(() => this.endbossAnimation(), 200);
        };

        startAnimation();

        // Überprüfen, ob der Endboss die 2050 erreicht hat
        setStoppableInterval(() => this.characterOnX(), 200);
    }


    endbossAnimation() {
        if (this.x <= -300) {
            world.showEndScreen();
            return;
        }
    
        if (this.hadFirstContact) {
            this.playAnimation(this.ENDBOSS_WALKING);
        } else {
            if (i < 8) {
                this.playAnimation(this.ENDBOSS_WALKING);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
            i++;
        }
    }


    characterOnX(animationInterval) {
        if (world.character.x >= 2050) {
            this.endboss_sound.play();
            clearInterval(animationInterval);
            this.hadFirstContact = true;
            i = 0;
            setStoppableInterval(() => this.moveLeft(this.speed = 0.5), 1000 / 60);
        }
    }


    endbossHurt(damage) {
        let animateInterval = setInterval(() => {
            this.playAnimation(this.ENDBOSS_HURT);
            this.currentImageIndexHurt++;
            if (this.currentImageIndexHurt >= this.ENDBOSS_HURT.length) {
                this.endbossStatus(damage);
                clearInterval(animateInterval);
            }
        }, 1000 / 10);
    }


    endbossStatus(damage) {
        this.currentImageIndexHurt = 0;
        world.endbossStatusbar.setPercentage(world.endbossStatusbar.percentage - damage);
        this.endbossDead();
    }


    endbossDead() {
        if (world.endbossStatusbar.percentage <= 0) {
            this.deadAnimation();
            setInterval(() => world.showEndScreen(), 1000);
        }
        if (this.x < 125) {
            setInterval(() => world.showEndScreen(), 1000);
        }
    }


    deadAnimation() {
        let animateInterval = setStoppableInterval(() => {
            this.playAnimation(this.ENDBOSS_DEAD);
            this.currentImageIndexHurt++;
            if (this.currentImageIndexHurt >= this.ENDBOSS_DEAD.length) {
                this.currentImageIndexHurt = 0;
                clearInterval(animateInterval);
            }
        }, 1000 / 10);
    }


    getSmaller() {
        if (world.endbossStatusbar.percentage > 90) {
            this.width = 250;
            this.height = 250;
            this.y = 200;
        }
    }
}