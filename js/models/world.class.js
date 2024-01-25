class World {
    character = new Character('img/2_character_pepe/2_walk/W-21.png');
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    bottle = new Bottle();
    throwAbleObject = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.generateBackgroundObjects();
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }


    // In der World-Klasse
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 1000);
    }


    checkThrowObjects(){
        if (this.keyboard.D) {
            let bottle = new ThrowAbleObject(this.character.x + 100, this.character.y + 100);
            
            this.throwAbleObject.push(bottle);
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        
        this.ctx.translate(-this.camera_x, 0); // camera back
        // -------- Space for fixed objectes ---------
        this.addToMap(this.statusBar);
        this.addToMap(this.bottle);
        this.ctx.translate(this.camera_x, 0); // camera forwards


        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.smallEnemies);
        this.addObjectsToMap(this.throwAbleObject);
        
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
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        mo.x = mo.x * -1;
        this.ctx.scale(-1, 1);
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
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