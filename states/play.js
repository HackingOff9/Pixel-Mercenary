var player;
var stars;
var road;
var cursors;
var gameOver = false;
var score;
var scoreText;
var keys;
var house1;
const worldWidth = 1600;
const worldHeight = 600;
const startHealth = 3;
const maxHealth = 5;
let door;

export default class Play {
    preload() {
        this.load.image('sky', 'src/games/firstgame/assets/sky.png');
        this.load.image('road', 'src/games/firstgame/assets/road.png');
        this.load.image('star', 'src/games/firstgame/assets/star.png');
        this.load.spritesheet('dude', 'src/games/firstgame/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('heart', 'src/games/firstgame/assets/heart.png');
        this.load.image('house1', 'src/games/firstgame/assets/house1.png');
        this.load.image('house2', 'src/games/firstgame/assets/house2.png');
        this.load.spritesheet('door1', 'src/games/firstgame/assets/door1.png', { frameWidth: 150, frameHeight: 150 });
    }
    init() {
        this.score = 0;
        this.stars = undefined;
        this.health = startHealth;
    }
    create() {
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

        this.add.image(400, 300, 'sky');
        this.add.image(800, 300, 'sky');
        this.add.image(1200, 300, 'sky');
        this.add.image(350, 374, 'house1');
        const house2 = this.add.image(900, 314, 'house2');
        house2.setScale(1.78)


        door = this.add.sprite(1350, 524, 'door1');
        this.anims.create({
            key: 'door-animation',
            frames: this.anims.generateFrameNumbers('door1', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        road = this.physics.add.staticGroup();

        road.create(150, 799, 'road').setScale(2).refreshBody();
        road.create(350, 799, 'road').setScale(2).refreshBody();
        road.create(550, 799, 'road').setScale(2).refreshBody();
        road.create(750, 799, 'road').setScale(2).refreshBody();
        road.create(950, 799, 'road').setScale(2).refreshBody();
        road.create(1150, 799, 'road').setScale(2).refreshBody();
        road.create(1350, 799, 'road').setScale(2).refreshBody();

        player = this.physics.add.sprite(100, 450, 'dude');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        const camera = this.cameras.main;
        camera.startFollow(player);
        camera.setBounds(0, 0, worldWidth, worldHeight);

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


        stars = this.physics.add.group();
        stars.defaultKey = "star";
        stars.create(100, 100);
        stars.create(650, 100);
        stars.create(950, 100);
        stars.children.iterate(child => {
            child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));

        });

        this.physics.add.collider(player, road);
        this.physics.add.collider(stars, road);
        this.physics.add.overlap(player, stars, this.collectStar, null, this);

        this.scene.manager.start("hud", this);


        const star = this.add.sprite(200, 200, "star")
        star.setScale(2)
        this.add.tween({
            targets: [star],
            durration: 1000,
            delay: 0,
            hold: 500,
            yoyo: true,
            repeat: Infinity,
            ease: 'linear',
            x: {
                getStart: () => 100,
                getEnd: () => 200
            }
        });


    }

    update() {
        door.anims.play('door-animation')

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
    collectStar(player, star) {
        star.disableBody(true, true);
        this.events.emit("updateHUD");
    }
    collectHeart(player, heart) {
        heart.disableBody(true, true);
        this.health += 1;
    }
}