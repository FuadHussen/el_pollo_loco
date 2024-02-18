class BottleStatusBar extends DrawableObject {
    STATUSBAR_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    percentage = 0;



    constructor() {
        super();
        this.loadImages(this.STATUSBAR_BOTTLE);
        this.x = 40;
        this.y = 0;
        this.width = 180;
        this.height = 60;
        this.setPercentage(0)
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let bottlePath = this.STATUSBAR_BOTTLE[this.resolveImageIndex()];
        this.img = this.imageCache[bottlePath];
    }


    resolveImageIndex() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage <= 20) {
            return 1;
        } else if (this.percentage <= 40) {
            return 2;
        } else if (this.percentage <= 60) {
            return 3;
        } else if (this.percentage <= 80) {
            return 4;
        } else {
            return 5;
        }
    }
}