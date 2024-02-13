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

    hadFirstContact = false;



    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.ENDBOSS_WALKING);
        this.x = 2450;
        this.animate();
    }


    animate() {
        let i = 0;
        setInterval(() => {

            if (i < 8) {
                this.playAnimation(this.ENDBOSS_WALKING);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }

            i++;

            if (world.character.x >= 2050) {
                i = 0;
                this.hadFirstContact = true;
                setInterval(() => {
                    this.moveLeft(this.speed = 1);                    
                }, 1000 / 60);
            }
        }, 200);
    }
}