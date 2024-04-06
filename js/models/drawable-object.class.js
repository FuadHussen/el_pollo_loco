class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 205;
    height = 150;
    width = 100;


    /**
     * Loads an image from the given path.
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image(); //this.img = document.getElementById('img') <img id="img">
        this.img.src = path;
    }


    /**
     * Draws the object onto the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);           
        } catch (e) {
            console.warn('Error Loading image', e);
            console.log('Could not load image', this.img.src);
        }
    }

    
    /**
     * Draws a frame around the object.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss) {
            ctx.rect(this.x, this.y, this.width, this.height);
        }
    }


    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image1.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }
}