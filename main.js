var config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 900,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var stars;
var road;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var keys;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'src/games/firstgame/assets/sky.png');
    this.load.image('road', 'src/games/firstgame/assets/road.png');
    this.load.image('star', 'src/games/firstgame/assets/star.png');
    this.load.spritesheet('dude', 'src/games/firstgame/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

const worldWidth = 1600;
const worldHeight = 600;

function create() {
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    keys = this.input.keyboard.addKeys({
        W: Phaser.Input.Keyboard.KeyCodes.W,
        Up: Phaser.Input.Keyboard.KeyCodes.UP,

        A: Phaser.Input.Keyboard.KeyCodes.A,
        Left: Phaser.Input.Keyboard.KeyCodes.LEFT,

        S: Phaser.Input.Keyboard.KeyCodes.S,
        Down: Phaser.Input.Keyboard.KeyCodes.DOWN,

        D: Phaser.Input.Keyboard.KeyCodes.D,
        Right: Phaser.Input.Keyboard.KeyCodes.RIGHT
    });

    //  A simple background for our game
    this.add.image(400, 300, 'sky');
    this.add.image(800, 300, 'sky');
    this.add.image(1200, 300, 'sky');


    //  The platforms group contains the ground and the 2 ledges we can jump on
    road = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    road.create(150, 799, 'road').setScale(2).refreshBody();
    road.create(350, 799, 'road').setScale(2).refreshBody();
    road.create(550, 799, 'road').setScale(2).refreshBody();
    road.create(750, 799, 'road').setScale(2).refreshBody();
    road.create(950, 799, 'road').setScale(2).refreshBody();
    road.create(1150, 799, 'road').setScale(2).refreshBody();
    road.create(1350, 799, 'road').setScale(2).refreshBody();


    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    const camera = this.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, worldWidth, worldHeight);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group();
    stars.defaultKey = "star";

    stars.create(400, 100);

    stars.create(650, 100)

    stars.create(950, 100)
    
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));
    });

    

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, road);
    this.physics.add.collider(stars, road);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this);

}

function update() {
    if (gameOver) {
        return;
    }

    if (keys.A.isDown) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (keys.D.isDown) {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (keys.W.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}

function collectStar(player, star) {
    star.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

}