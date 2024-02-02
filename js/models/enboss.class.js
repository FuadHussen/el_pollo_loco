class Endboss extends MovableObject {

    width = 350;
    height = 350;
    y = 80;

    // pedro = new Character();

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

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.ENDBOSS_WALKING);
        this.x = 2450;
        this.speed = 5;
        this.animate();
    }


    animate() {
        let i = 0;

        setInterval(() => {
            this.moveLeft();

        }, 1000 / 60);

        setInterval(() => {
            if (i < 8) {
                this.playAnimation(this.IMAGES_WALKING)
            }
        }, 200);

        // setInterval(() => {
        //     if (this.pedro.x == 2000) {
        //         if (i < 4) {
        //             this.playAnimation(this.ENDBOSS_WALKING)
        //         }
        //     }
        // }, 1000 / 60);
    }
}