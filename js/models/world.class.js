class World {
    character = new Character('img/2_character_pepe/2_walk/W-21.png');
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new HealthStatusBar();
    coin = new CoinStatusBar();
    bottle = new BottleStatusBar();
    endboss = new Endboss();
    endbossStatusbar = new EndbossStatusBar();
    healthElement = new HealthElement();
    endbossStatusBarVisible = false;
    coins = [];
    bottles = [];
    activeBottles = [];
    throwAbleObject = [];
    pickedUpBottles = 0;


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


    run() {
        setInterval(() => {
            this.collisionEnemy();
            this.collisionBottle();
            this.collisionCoin();
            this.checkThrowObjects();
        }, 250);
    }


    checkThrowObjects() {
        if (this.keyboard.D && this.pickedUpBottles > 0) { 
            let bottle = new ThrowAbleObject(this.character.x + 100, this.character.y + 100);
            bottle.world = this; 
            this.throwAbleObject.push(bottle);
            this.pickedUpBottles--;
    
            this.bottle.setPercentage(this.bottle.percentage - 20); // Reduziere die Flaschenanzeige um 20 Prozent
        }
    }
    

    collisionEnemy() {
        this.level.enemies.forEach(enemy => {
            if (!enemy.isDead() && this.character.isColliding(enemy)) {
                if (this.character.isAboveGround(enemy) && !this.character.isHurt()) {
                    enemy.energy = 0;
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }


    collisionBottle() {
        for (let i = 0; i < this.bottles.length; i++) {
            let bottle = this.bottles[i];
            if (this.character.isColliding(bottle) && this.bottle.percentage < 100) {
                this.bottle.setPercentage(this.bottle.percentage + 20); 
                this.pickedUpBottles++;
                this.bottles.splice(i, 1);
                i--; 
            }
        }
    }


    collisionCoin() {
        for (let i = 0; i < this.coins.length; i++) {
            let coin = this.coins[i];
            if (this.character.isColliding(coin)) {
                this.coin.setPercentage(this.coin.percentage + 10);
                if (this.coin.percentage <= 100) {
                    this.coins.splice(i, 1);
                    i--;
                }
            }
        }
    }


    removeChicken(chicken) {
        let index = this.level.enemies.indexOf(chicken);
        if (index !== -1) {
            this.level.enemies.splice(index, 1);
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

        //wenn x achse erreicht wird 
        if (this.character.x >= 2050) {
            this.endbossStatusBarVisible = true;
            this.addToMap(this.endbossStatusbar);
            this.addToMap(this.healthElement);
        }

        // immer anzeigen der Endboss-Statusleiste 
        if (this.endbossStatusBarVisible) {
            this.addToMap(this.endbossStatusbar);
            this.addToMap(this.healthElement);
        }

       this.ctx.translate(this.camera_x, 0); // camera forwards

        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.bottles);
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
        for (let i = 0; i < 10; i++) {
            let coin = new Coins();
            this.coins.push(coin);
        }
        for (let i = 0; i < 20; i++) {
            let bottle = new Bottles();
            this.bottles.push(bottle);
        }
    }


    // showEndScreen() {
    //     document.getElementById("endScreen").style.display = "block";
    //     document.getElementById("canvas").classList.add("d-none");
    //     document.getElementById("endScreen").classList.remove("d-none");
    //     this.character.walking_sound.pause();
    //     document.getElementById("endScreen").style.backgroundImage = "url('img/9_intro_outro_screens/game_over/oh no you lost!.png')";
    // }
}