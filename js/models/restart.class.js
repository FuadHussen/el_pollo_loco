class Restart extends DrawableObject {
    IMAGES_RESTART = ['img/restart.png'];

    
    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_RESTART[0]);
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.onClick = this.onClick.bind(this); 
        canvas.addEventListener('click', this.onClick);
    }

    onClick(event) {
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        if (clickX >= this.x && clickX <= this.x + this.width &&
            clickY >= this.y && clickY <= this.y + this.height) {
            this.toggleRestart();
        }
    }

    toggleRestart() {
        window.location.reload(); // Seite neu laden
    }
}
