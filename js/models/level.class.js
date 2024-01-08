class Level {
    enemies;
    smallEnemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;

    constructor(enemies, clouds, smallEnemies, backgroundObjects){
        this.enemies = enemies;
        this.smallEnemies = smallEnemies
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}