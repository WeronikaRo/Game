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

let game = new Phaser.Game(config);
let platforms;
let player;

function preload(){
    this.load.image('day', 'image/day.png');
    this.load.image('floor', 'image/floor.png');
    this.load.spritesheet('black', 'image/black.png', {frameWidth: 32, frameHeight: 48});
}


function create(){
    this.add.image(400, 300, 'day');
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 567, 'floor').setScale(2).refreshBody();
    platforms.create(150, 350, 'floor');
    platforms.create(550, 225, 'floor');
    platforms.create(700, 450, 'floor');
    
    player = this.physics.add.sprite(100, 450, 'black');

    // player.setBounce(0.3);
    // player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('black', {start:0, end: 3}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{key: 'black', frame: 4}],
        frameRate: 20,
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('black', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(player, platforms);

    cursors = this.input.keyboard.createCursorKeys();

    player.body.setGravityY(300);

}

function update (){
    if(cursors.left.isDown){
        player.setVelocityX(-140);
        player.anims.play('left', true);
    } else if(cursors.right.isDown){
        player.setVelocityX(140);
        player.anims.play('right', true);
    } else{
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if(cursors.space.isDown && player.body.touching.down){
        player.setVelocityY(-390);
    }
}