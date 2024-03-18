class Sound extends DrawableObject {
    IMAGES_SOUND = ['img/sound-modified.png'];
    IMAGES_SOUND_MUTE = ['img/mute-modified.png']
    isMuted = false;



    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_SOUND[0]);
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
    }

    toggleSound() {
        if (this.isMuted) {
            background_sound.play();
            this.loadImage(this.IMAGES_SOUND[0]);
        } else {
            background_sound.pause();
            this.loadImage(this.IMAGES_SOUND_MUTE[0]);
        }
        this.isMuted = !this.isMuted; 
    }
}