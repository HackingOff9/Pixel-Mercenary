var player;
var hearts;
var stars;
var road;
var cursors;
var gameOver = false;
var score;
var keys;
const worldWidth = 1600;
const worldHeight = 600;
const startHealth = 3;
const maxHealth = 5; 

export default class Play {
    preload() {
        this.load.image('sky', 'src/games/firstgame/assets/sky.png');
        this.load.image('road', 'src/games/firstgame/assets/road.png');
        this.load.image('star', 'src/games/firstgame/assets/star.png');
        this.load.spritesheet('dude', 'src/games/firstgame/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('heart', 'src/games/firstgame/assets/heart.png')
    }
    init() {
        this.scoreText = 0;
        this.stars = undefined;
        this.hearts = undefined;
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

        hearts = this.physics.add.group();
        hearts.defaultKey = "heart";
        hearts.create(1300, 100);
        hearts.children.iterate(child => {
            child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));
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
        this.physics.add.collider(hearts, road);
        this.physics.add.collider(stars, road);
        this.physics.add.overlap(player, hearts, this.collectHeart, null, this);
        this.physics.add.overlap(player, stars, this.collectStar, null, this);

        this.scene.manager.start("hud", this);

        this.hearts = this.add.group();
        this.hearts.defaultKey = "heart";
        //this.reconcileHearts();

        window.fun = x => {
            this.health += x
        }
        window.hearts = this.hearts;
    }
    reconcileHearts() {
        const hearts = this.hearts;
        const health = this.health;

        const diff = health - hearts.getChildren().length;
        console.log("diff", diff);

        // Positive diff, spawn more hearts
        if (diff > 0) {
            for (let i = 0; i < diff; i++) {
                const spawnedHearts = hearts.getChildren().length;
                const heartNumber = spawnedHearts + 1;
                hearts.create(50+100*heartNumber, 50)
            }
        } 

        // Negative diff, reduce hearts
        else if (diff < 0) {
            const deleteNumber = -diff;
            const spawnedHearts = hearts.getChildren();
            const toDestroy = [];
            for (let i = 0; i < deleteNumber; i++) {
              toDestroy.push(spawnedHearts[spawnedHearts.length -i -1])
            }
            for (let heart of toDestroy) {
                hearts.killAndHide(heart)
            }
        }
    }
    update() {        
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

       this.reconcileHearts();
    }
    collectStar(player, star) {
        star.disableBody(true, true);
        this.scoreText += 10;
    }
    collectHeart(player, heart) {
        heart.disableBody(true,true);
        this.health += 1
    }
}