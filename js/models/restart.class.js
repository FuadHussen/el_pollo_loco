class Restart extends DrawableObject {
    IMAGES_RESTART = ['img/restart.png'];
    isRestarted = false;

    
    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_RESTART[0]);
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
    }

    toggleRestart() {
        if (this.isRestarted) {
            background_sound.play();
            window.location.reload();
        }
        this.isRestarted = !this.isRestarted; 
    }
}
