class SmallChicken extends MovableObject {

    width = 75;
    height = 75;
    y = 230;
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500;
    }
}