class Endboss extends MovableObject {

    width = 350;
    height = 350;
    y = 80;


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
        let i = 0;
        let animationInterval;
    
        let startAnimation = () => {
            animationInterval = setInterval(() => {
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
            }, 200);
        };
    
        startAnimation();
    
        // Überprüfen, ob der Endboss die 2050 erreicht hat
        setInterval(() => {
            if (world.character.x >= 2050) {
                clearInterval(animationInterval); 
                this.hadFirstContact = true; 
                i = 0; 
                startAnimation(); 
                setInterval(() => {
                    this.moveLeft(this.speed = 1);
                }, 1000 / 60);
            }
        }, 200);
    }
}