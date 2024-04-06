class BackgroundObject extends MovableObject {
    
    width = 720;
    height = 480;

    /**
     * @param {string} imagePath 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);    
        this.x = x;    
        this.y = this.height == y;    
    }
}