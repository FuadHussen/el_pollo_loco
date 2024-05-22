class World extends MovableObject {
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
    showEndScreenCalled = false;

    bottle_collect = new Audio('audio/collectBottle.mp3');
    coin_collect = new Audio('audio/collectCoin.mp3');


    constructor(canvas, keyboard) {
        super();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setupWorld();
    }


    /**
     * Sets up the game world including background objects, characters, enemies, and interactive elements.
     */
    setupWorld() {
        this.generateBackgroundObjects();
        this.draw();
        this.setWorld();
        if (gameStarted) {
            this.run();
        }
    }


    /**
     * Sets the world for the character.
     */
    setWorld() {
        this.character.world = this;
    }


    /*
     * Runs the game loop.
     */
    run() {
        setStoppableInterval(() => {
            this.collisionEnemy();
            this.collisionBottle();
            this.collisionCoin();
            this.checkThrowObjects();
        }, 250);
    }


    /**
     * Checks if the character can throw objects and handles the throwing action.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.pickedUpBottles > 0) {
            let direction = this.character.otherDirection ? 'left' : 'right'; // Richtung des Charakters
            let bottle = new ThrowAbleObject(this.character.x + 100, this.character.y + 100, direction);
            bottle.world = this;
            this.throwAbleObject.push(bottle);
            this.pickedUpBottles--;

            this.bottle.setPercentage(this.bottle.percentage - 20);
        }
    }


    /**
     * Handles collision detection between the character and enemies.
     */
    collisionEnemy() {
        this.level.enemies.forEach(enemy => {
            if (!enemy.isDead() && this.character.isColliding(enemy)) {
                if (enemy instanceof Endboss) {
                    this.character.hitByEndboss(25);
                    this.statusBar.setPercentage(this.character.energy);
                } else {
                    if (this.character.isAboveGround(enemy) && !this.character.isHurt()) {
                        enemy.energy = 0;
                    } else {
                        this.character.hit();
                        this.statusBar.setPercentage(this.character.energy);
                    }
                }
            }
        });
    }



    /**
     * Handles collision detection between the character and bottles.
     */
    collisionBottle() {
        for (let i = 0; i < this.bottles.length; i++) {
            let bottle = this.bottles[i];
            if (this.character.isCollidingCoinAndBottle(bottle) && this.bottle.percentage < 100) {
                this.bottle.setPercentage(this.bottle.percentage + 20);
                this.pickedUpBottles++;
                this.bottle_collect.play();
                this.bottles.splice(i, 1);
                i--;
            } else if (isMuted) {
                this.bottle_collect.pause();
            }
        }
    }


    /**
     * Handles collision detection between the character and coins.
     */
    collisionCoin() {
        for (let i = 0; i < this.coins.length; i++) {
            let coin = this.coins[i];
            if (this.character.isCollidingCoinAndBottle(coin)) {
                this.coin.setPercentage(this.coin.percentage + 10);
                if (this.coin.percentage <= 100) {
                    this.coins.splice(i, 1);
                    this.coin_collect.play();
                    i--;
                }
            }
        }
        if (isMuted) {
            this.coin_collect.pause();
        }
    }


    /**
     * Removes a chicken from the level.
     * @param {Object} chicken - The chicken object to be removed.  
     */
    removeChicken(chicken) {
        let index = this.level.enemies.indexOf(chicken);
        if (index !== -1) {
            this.level.enemies.splice(index, 1);
        }
    }


    /**
     * Draws all elements on the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawBackground();
        this.drawFixedObjects();
        this.drawDynamicObjects();

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    drawBackground() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
    }


    drawFixedObjects() {
        // Fixed objects like status bar, bottle, coin, etc.
        this.addToMap(this.statusBar);
        this.addToMap(this.bottle);
        this.addToMap(this.coin);

        if (this.character.x >= 2050) {
            this.endbossStatusBarVisible = true;
            this.addToMap(this.endbossStatusbar);
            this.addToMap(this.healthElement);
        }

        if (this.endbossStatusBarVisible) {
            this.addToMap(this.endbossStatusbar);
            this.addToMap(this.healthElement);
        }
    }


    drawDynamicObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.smallEnemies);
        this.addObjectsToMap(this.throwAbleObject);
        this.ctx.translate(-this.camera_x, 0);
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        })
    }


    /**
     * Adds an object to the map for drawing.
     * @param {Object} mo - The object to be added to the map.
     */
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

    /**
     * Generates background objects for the game world.
     */
    generateBackgroundObjects() {
        for (let i = -this.totalBackgrounds; i < this.totalBackgrounds; i++) {
            let setOffset = i * this.backgroundWidth * this.backgroundsPerSet;
            this.generateBackground(setOffset);
        }
        this.generateBottle();
        this.generateCoin();
    }


    /**
     * Generates background layers for the game world.
     * @param {number} setOffset - The offset for the background layers.
     */
    generateBackground() {
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


    /**
     * Generates bottle objects for the game world.
     */
    generateBottle() {
        for (let i = 0; i < 10; i++) {
            let bottle = new Bottles();
            this.bottles.push(bottle);
        }
    }


    /**
     * Generates coins objects for the game world.
     */
    generateCoin() {
        for (let i = 0; i < 9; i++) {
            let coin = new Coins();
            this.coins.push(coin);
        }
    }


    /**
     * Shows the end screen when the game ends.
     */
    showEndScreen() {
        if (this.showEndScreenCalled) return; // Verhindere mehrfaches Aufrufen
        this.showEndScreenCalled = true;

        if (window.matchMedia('(max-width: 665px)').matches) {
            let mobileAlert = document.getElementById('mobileAlert');
            mobileAlert.classList.remove('d-none');
            document.getElementById("canvas").classList.add("d-none");
            document.getElementById("endScreen").classList.add("d-none");
            document.querySelector('h1').classList.add('d-none');
            document.querySelector('.hud').classList.add('d-none');
        } else {
            let mobileAlert = document.getElementById('mobileAlert');
            mobileAlert.classList.add('d-none');
            document.getElementById("canvas").classList.add("d-none");
            document.getElementById("endScreen").classList.remove("d-none");
            document.getElementById("endScreen").style.display = "block";
            document.querySelector(".hud").style.display = 'none';

            if (this.character.isDead()) {
                document.getElementById("endScreen").style.backgroundImage = "url('img/9_intro_outro_screens/game_over/oh no you lost!.png')";
                if (gameStarted) {
                    document.getElementById("soundOn").style.display = "none";
                    document.getElementById("soundOff").style.display = "none";
                    document.getElementById("restartBtn").style.display = "none";
                }
            } else {
                document.getElementById("endScreen").style.backgroundImage = "url('img/9_intro_outro_screens/game_over/won_2.png')";
                if (gameStarted) {
                    document.getElementById("soundOn").style.display = "none";
                    document.getElementById("soundOff").style.display = "none";
                    document.getElementById("restartBtn").style.display = "none";
                }
            }
        }
    }
}