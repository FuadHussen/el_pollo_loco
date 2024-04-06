class HealthStatusBar extends DrawableObject {
    STATUSBAR_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];


    percentage = 100;


    constructor() {
        super();
        this.loadImages(this.STATUSBAR_HEALTH);
        this.x = 40;
        this.y = 40;
        this.width = 180;
        this.height = 60;
        this.setPercentage(100);
    }


    /**
     * Sets the percentage value representing the player's health.
     * @param {number} percentage - The percentage value.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let healthPath = this.STATUSBAR_HEALTH[this.resolveImageIndex()];

        this.img = this.imageCache[healthPath];
    }


    /**
     * Resolves the index of the image in the status bar array based on the current percentage value.
     * @returns {number} - The index of the image.
     */
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