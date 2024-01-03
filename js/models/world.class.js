class World {
    character = new Character('img/2_character_pepe/2_walk/W-21.png');
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    smallEnemies = [
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken()
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [];
    totalBackgrounds = 4;
    backgroundsPerSet = 4;
    backgroundWidth = 719;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.generateBackgroundObjects();
        this.draw();
        this.setWorld();
    }


    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.backgroundObjects)
        this.addObjectsToMap(this.clouds)
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies)
        this.addObjectsToMap(this.smallEnemies)
        this.ctx.translate(-this.camera_x, 0);

        //Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        })
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }

        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }


    //Background img's für positiven und negativen x bereich
    generateBackgroundObjects() {

        for (let i = -this.totalBackgrounds; i < this.totalBackgrounds; i++) {
            let setOffset = i * this.backgroundWidth * this.backgroundsPerSet;

            for (let j = 0; j < this.backgroundsPerSet; j++) {
                const xPosition = setOffset + this.backgroundWidth * j;

                this.backgroundObjects.push(
                    new BackgroundObject('img/5_background/layers/air.png', xPosition),
                    new BackgroundObject(`img/5_background/layers/3_third_layer/${j % 2 + 1}.png`, xPosition),
                    new BackgroundObject(`img/5_background/layers/2_second_layer/${j % 2 + 1}.png`, xPosition),
                    new BackgroundObject(`img/5_background/layers/1_first_layer/${j % 2 + 1}.png`, xPosition)
                );
            }
        }
    }
}