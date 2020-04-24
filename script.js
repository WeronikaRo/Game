const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var platforms;

function preload(){
    this.load.image('day', 'img/day.png');
    this.load.image('floor', 'img/floor.png');
}


function create(){
    this.add.image(400, 300, 'day');
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 567, 'floor').setScale(2).refreshBody();
    platforms.create(150, 350, 'floor');
    platforms.create(550, 225, 'floor');
    platforms.create(700, 450, 'floor');

}

function update (){

}