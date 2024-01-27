class World {
    character = new Character('img/2_character_pepe/2_walk/W-21.png');
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coin = new Coin();
    bottle = new Bottle();
    coins = [];
    bottles = [];
    throwAbleObject = [];

    COIN = [
        'img/7_statusbars/3_icons/icon_coin.png'
    ];

    BOTTLE =[
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    MAX_COINS = 10;
    MAX_BOTTLES = 10;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.generateBackgroundObjects();
        this.generateCoins();
        this.generateBottles();
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 250);
    }


    generateBottles() {
        for (let i = 0; i < this.MAX_BOTTLES; i++) {
            const bottlePath = this.BOTTLE[Math.floor(Math.random() * this.BOTTLE.length)];
            const bottle = new Bottle();
            bottle.loadImage(bottlePath);

            do {
                bottle.x = 0 + Math.random() * 2200;
            } while (this.isBottleTooClose(bottle));

            bottle.width = 90;
            bottle.y = 370;
            this.bottles.push(bottle);
        }
    }


    generateCoins() {
        for (let i = 0; i < this.MAX_COINS; i++) {
            const coinPath = this.COIN[0];  // Verwenden Sie das einzige verfügbare Münzbild
            const coin = new Coin();
            coin.loadImage(coinPath);

            if (i % 5 === 0) {
                coin.y = 250;
            } else {
                coin.y = 375;
            }

            do {
                coin.x = 300 + Math.random() * 2200;
            } while (this.isCoinTooClose(coin));

            coin.width = 90;
            this.coins.push(coin);
        }
    }


    isBottleTooClose(newBottle) {
        for (const existingBottle of this.bottles) {
            if (Math.abs(newBottle.x - existingBottle.x) < 50) {
                return true;
            }
        }
        return false;
    }


    isCoinTooClose(newCoin) {
        for (const existingCoin of this.coins) {
            if (Math.abs(newCoin.x - existingCoin.x) < 50) {
                return true;
            }
        }
        return false;
    }


    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowAbleObject(this.character.x + 100, this.character.y + 100);

            this.throwAbleObject.push(bottle);
        }
    }


    checkCollisions() {
        // Überprüfen Kollisionen mit Feinden
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    
        // Überprüfen Kollisionen mit Münzen
        for (let i = 0; i < this.coins.length; i++) {
            const coin = this.coins[i];
            if (this.character.isColliding(coin)) {
                this.coins.splice(i, 1); 
                i--; 
            }
        }

        // Überprüfen Kollisionen mit Bottle
        for (let i = 0; i < this.bottles.length; i++) {
            const bottle = this.bottles[i];
            if (this.character.isColliding(bottle)) {
                this.bottles.splice(i, 1); 
                i--; 
            }
        }
    }
    


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);


        this.ctx.translate(-this.camera_x, 0); // camera back
        // -------- Space for fixed objectes ---------
        this.addToMap(this.statusBar);
        this.addToMap(this.bottle);
        this.addToMap(this.coin);
        this.ctx.translate(this.camera_x, 0); // camera forwards


        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.coins);
        this.coins.forEach(coin => coin.draw(this.ctx));
        this.addObjectsToMap(this.bottles);
        this.bottles.forEach(bottle => bottle.draw(this.ctx));
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