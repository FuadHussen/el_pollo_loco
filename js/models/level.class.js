class Level {
    enemies;
    smallEnemies;
    endBoss;
    clouds;
    backgroundObjects;
    level_end_x = 2200;

    constructor(enemies, clouds, smallEnemies, backgroundObjects, endBoss){
        this.enemies = enemies;
        this.smallEnemies = smallEnemies;
        this.endBoss = endBoss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}