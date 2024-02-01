class ThrowAbleObject extends MovableObject {
    BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    currentImage = 0;
    isSplashing = false;



    constructor(x, y) {
        super();
        this.loadImages(this.BOTTLE_ROTATION);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
        this.setupAnimation();
    }


    throw() {
        this.speedY = 20;
        this.applyGravitiy();
        setInterval(() => {
            this.x += 10;
            this.bottleGround();
        }, 25);
    }


    bottleGround() {
        if (this.y > 350 && !this.isSplashing) {
            this.isSplashing = true;
            this.loadImages(this.BOTTLE_SPLASH);
            this.setupSplashAnimation();
        }
    }


    setupSplashAnimation() {
        let animationInterval = setInterval(() => {
            this.currentImage = (this.currentImage + 1) % this.BOTTLE_SPLASH.length;
            this.y = 350;
        }, 1000 / 60);

        setInterval(() => {
            this.x = 0;
        }, 1000 / 10);
    
        // Nach 2 Sekunden die Animation stoppen
        setTimeout(() => {
            clearInterval(animationInterval);
        }, 2000);
    }
    

    setupAnimation() {
        setInterval(() => {
            this.currentImage = (this.currentImage + 1) % this.BOTTLE_ROTATION.length;
        }, 1000 / 60);
    }


    draw(ctx) {
        const imagePath = this.isSplashing ? this.BOTTLE_SPLASH[this.currentImage] : this.BOTTLE_ROTATION[this.currentImage];
        this.img = this.imageCache[imagePath];
        super.draw(ctx);
    }
}
