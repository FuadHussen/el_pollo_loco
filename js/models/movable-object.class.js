class MovableObject {
    x = 120;
    y = 205;
    height = 150;
    width = 100;
    img;


    loadImage(path) {
        this.img = new Image(); //this.img = document.getElementById('img') <img id="img">
        this.img.src = path;
    }


    moveRight() {
        console.log('Move right');
    }


    moveLeft() {
        console.log('Move left');
    }
}