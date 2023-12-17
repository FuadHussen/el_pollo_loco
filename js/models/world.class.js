class World {
    character = new Character();
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
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, 0)
    ]
    air = [
        new Air()
    ]
    canvas;
    ctx;


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.addToMap(this.character);

        // this.smallEnemies.forEach(smallEnemy => {
        //     this.ctx.drawImage(smallEnemy.img, smallEnemy.x, smallEnemy.y, smallEnemy.width, smallEnemy.height);
        // });

        // this.background.forEach(background => {
        //     this.ctx.drawImage(background.img, background.x, background.y, background.width, background.height);
        // });

        // this.air.forEach(air => {
        //     this.ctx.drawImage(air.img, air.x, air.y, air.width, air.height);
        // });
        this.addObjectsToMap(this.backgroundObjects)
        this.addObjectsToMap(this.clouds)
        this.addObjectsToMap(this.enemies)

        //Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        })
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}