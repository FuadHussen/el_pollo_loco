class Character extends MovableObject {

    height = 280;
    y = 10;
    speed = 3;
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

    world;
    walking_sound = new Audio('audio/running.mp3');

    isHurt = false; // Neue Eigenschaft für den Verletzungsstatus
    HURT_IMAGE = 'img/2_character_pepe/4_hurt/H-41.png';

    isDead = false;
    DEAD_IMAGE = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ]

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.applyGravitiy();
        this.animate();
    }


    animate() {
        setInterval(() => {
            if (this.energy <= 0 && !this.isDead) {
                // Wenn keine Energie mehr vorhanden ist, spiele die Dead-Animation nur einmal ab
                this.isDead = true;
                this.isHurt = false;
                this.speed = 0;  // Setze die Geschwindigkeit auf 0, um Animationen zu stoppen
                this.loadImages(this.DEAD_IMAGE);  // Lade die Totenbilder
                this.walking_sound.pause();  // Pausiere den walking_sound
    
                // Warte, bis die Dead-Animation durchgelaufen ist, und setze dann den Charakter zurück
                setTimeout(() => {
                    this.x = 120;  // Setze die Startposition oder eine andere gewünschte Position
                    this.y = 205;
                    this.energy = 100;  // Setze die Energie wieder auf einen Startwert
                    this.isDead = false;  // Setze den Tot-Status zurück
                    this.loadImages(this.IMAGES_WALKING);  // Lade die normalen Bilder
                }, this.DEAD_IMAGE.length * 1000);
            }

            if (this.energy > 0) {  // Nur wenn die Energie größer als 0 ist, führe Bewegungen aus
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
                }

                if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                    this.jump();
                }
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 1000);




        setInterval(() => {

            if (this.isAboveGround()) {
                // Jump animation
                this.playAnimation(this.IMAGES_JUMPING);
            } else {

                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    //Walk animation
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 100);
    }


    draw(ctx) {
        if (this.isHurt) {
            this.img.src = this.HURT_IMAGE;
            setTimeout(() => {
                this.isHurt = false;
            }, 1000); // Hier wird der Verletzungsstatus nach 2 Sekunden zurückgesetzt
        }

        super.draw(ctx);

        // Wenn das Bild für die Verletzung gezeichnet wurde, stelle es auf das normale Bild zurück
        if (this.isHurt) {
            this.loadImages(this.IMAGES_WALKING); // Oder setze es auf das Bild, das du als Normalzustand haben möchtest
            this.isHurt = true;
        }

        if (this.isDead) {
            this.isHurt = false;
        }
    }


    setHurt() {
        this.isHurt = true;
    }


    setDead() {
        if (this.energy <= 0 && !this.isDead) {
            this.isDead = true;
            let currentImageIndex = 0;

            const deadImageInterval = setInterval(() => {
                this.img.src = this.DEAD_IMAGE[currentImageIndex];
                currentImageIndex++;

                // Wenn alle Bilder in der Sequenz durchlaufen wurden, setze das Intervall zurück
                if (currentImageIndex >= this.DEAD_IMAGE.length) {
                    currentImageIndex = 0;
                }
            }, 200); // Hier kannst du die Geschwindigkeit der Bildsequenz anpassen
        }
    }
}
