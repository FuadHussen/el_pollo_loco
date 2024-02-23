class EndbossStatusBar extends DrawableObject {

    STATUSBAR_ENDBOSS = ['img/7_statusbars/2_statusbar_endboss/blue.png']

    percentage = 100;


    constructor() {
        super().loadImage('img/7_statusbars/2_statusbar_endboss/blue.png');
        this.loadImages(this.STATUSBAR_ENDBOSS);
        this.x = 500;
        this.y = 0;
        this.width = 180;
        this.height = 60;
    }


    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
