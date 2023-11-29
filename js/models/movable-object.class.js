class MovableObject {
    x = 200;
    y = 250;
    img;
    height = 150;
    width = 100;


    loadImage(path) {
        this.img = new Image(); //this.img = document.getElementById('img') <img id="img">
        this.img.src = path;
    }


    moveRight() {
        console.log('Move right');
    }


    moveLeft() {

    }
}