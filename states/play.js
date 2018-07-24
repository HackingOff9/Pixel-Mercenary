var player;
var stars;
var road;
var cursors;
var gameOver = false;
var scoreText;
var keys;
var hearts;
var house1;
const worldWidth = 1600;
const worldWidth = 4950;
const startHealth = 3;
let door;
let bullets;
let canFire;
let facingRight;
let enemies;

export default class Play {
    preload() {
        this.load.image('sky', 'src/games/firstgame/assets/sky.png');
        this.load.image('road', 'src/games/firstgame/assets/road.png');
        this.load.image('star', 'src/games/firstgame/assets/star.png');
        this.load.spritesheet('dude', 'src/games/firstgame/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('heart', 'src/games/firstgame/assets/heart.png');
        this.load.image('house1', 'src/games/firstgame/assets/house1.png');
        this.load.image('house2', 'src/games/firstgame/assets/house2.png');
        this.load.image('cloud', 'src/games/firstgame/assets/cloud.png');
        this.load.spritesheet('door1', 'src/games/firstgame/assets/door1.png', { frameWidth: 150, frameHeight: 150 });
        this.load.image('house3', 'src/games/firstgame/assets/house3.png');
        this.load.image('house4', 'src/games/firstgame/assets/house4.png');
        this.load.image('house5', 'src/games/firstgame/assets/house5.png');
        this.load.spritesheet('door1', 'src/games/firstgame/assets/door1.png', { frameWidth:150, frameHeight: 150});
        this.load.image("platform", "src/games/firstgame/assets/platform.png");
        this.load.image("bullet", "src/games/firstgame/assets/bullet.png");
        
    }
    init() {
        this.score = 0;
        this.stars = undefined;
        this.health = startHealth;
        canFire = true;
        facingRight = true;
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
            Right: Phaser.Input.Keyboard.KeyCodes.RIGHT,

            J: Phaser.Input.Keyboard.KeyCodes.J
        });

        this.add.image(400, 300, 'sky');
        this.add.image(800, 300, 'sky');
        this.add.image(1200, 300, 'sky');
        this.add.image(1600, 300, 'sky');
        this.add.image(2000, 300, 'sky');
        this.add.image(2400, 300, 'sky');
        this.add.image(2800, 300, 'sky');
        this.add.image(3200, 300, 'sky');
        this.add.image(3600, 300, 'sky');
        this.add.image(4000, 300, 'sky');
        this.add.image(4400, 300, 'sky');
        this.add.image(4800, 300, 'sky');
        this.add.image(4950, 300, 'sky');        
        this.add.image(800, 374, 'house1');
        const house2 = this.add.image(1600, 314, 'house2');
        house2.setScale(1.78)
        this.add.image(2400, 407, 'house3');
        this.add.image(3200, 299, 'house4')
        const house5 = this.add.image(4000, 340, 'house5')
        house5.setScale(1.75)

        
        


        door = this.add.sprite(4500, 524, 'door1');
        this.anims.create({
            key: 'door-animation',
            frames: this.anims.generateFrameNumbers('door1', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        bullets = this.physics.add.group();

        road = this.physics.add.staticGroup();

        for (let i = 0; i < 26; i++) {
            road.create(150 + 200 * i, 799, 'road').setScale(2).refreshBody();

        }
        /*
        road.create(150, 799, 'road').setScale(2).refreshBody();
        road.create(350, 799, 'road').setScale(2).refreshBody();
        road.create(550, 799, 'road').setScale(2).refreshBody();
        road.create(750, 799, 'road').setScale(2).refreshBody();
        road.create(950, 799, 'road').setScale(2).refreshBody();
        road.create(1150, 799, 'road').setScale(2).refreshBody();
        road.create(1350, 799, 'road').setScale(2).refreshBody();

        road.create(260, 445, 'platform').setScale(.25).refreshBody();
        road.create(437.5, 445, 'platform').setScale(.25).refreshBody();
        road.create(888, 468, 'platform').setScale(.15).refreshBody();

        road.create(1550, 799, 'road').setScale(2).refreshBody();
        road.create(1750, 799, 'road').setScale(2).refreshBody();
        road.create(1950, 799, 'road').setScale(2).refreshBody();
        road.create(2150, 799, 'road').setScale(2).refreshBody();
        road.create(2350, 799, 'road').setScale(2).refreshBody();
        road.create(2550, 799, 'road').setScale(2).refreshBody();
        road.create(2750, 799, 'road').setScale(2).refreshBody();
        road.create(2950, 799, 'road').setScale(2).refreshBody();
        road.create(3150, 799, 'road').setScale(2).refreshBody();
        road.create(3150, 799, 'road').setScale(2).refreshBody();
        road.create(3350, 799, 'road').setScale(2).refreshBody();
        road.create(3550, 799, 'road').setScale(2).refreshBody();
        road.create(3750, 799, 'road').setScale(2).refreshBody();
        road.create(3750, 799, 'road').setScale(2).refreshBody();
        road.create(3950, 799, 'road').setScale(2).refreshBody();
        road.create(4150, 799, 'road').setScale(2).refreshBody();
        road.create(4350, 799, 'road').setScale(2).refreshBody();
        road.create(4550, 799, 'road').setScale(2).refreshBody();
        road.create(4750, 799, 'road').setScale(2).refreshBody();
        road.create(4950, 799, 'road').setScale(2).refreshBody();
        */

                
        road.create(710, 445, 'platform').setScale(.25).refreshBody();
        road.create(798.75, 295, 'platform').setScale(.25).refreshBody();
        road.create(887.5, 445, 'platform').setScale(.25).refreshBody();
        road.create(1504, 459, 'platform').setScale(.125).refreshBody();
        road.create(1520.5, 225, 'platform').setScale(.21).refreshBody(); 
        road.create(1588, 468, 'platform').setScale(.15).refreshBody();
        road.create(1588, 325, 'platform').setScale(.25).refreshBody();
        road.create(1605, 100, 'platform').setScale(.085).refreshBody();
        road.create(1646.5, 225, 'platform').setScale(.21).refreshBody();
        road.create(1663, 459, 'platform').setScale(.125).refreshBody();
        road.create(2400, 495, 'platform').setScale(.15).refreshBody();
        road.create(2455, 330, 'platform').setScale(.075).refreshBody();
        road.create(3052.5, 420, 'platform').setScale(.225).refreshBody();
        road.create(3110, 310, 'platform').setScale(.3).refreshBody();
        road.create(3175, 550, 'platform').setScale(.025).refreshBody();
        road.create(3200, 150, 'platform').setScale(.1).refreshBody();
        road.create(3290, 310, 'platform').setScale(.3).refreshBody();
        road.create(3250, 550, 'platform').setScale(.025).refreshBody();
        road.create(3333.5, 420, 'platform').setScale(.225).refreshBody();
        road.create(3882.5, 360, 'platform').setScale(.26).refreshBody(); 
        road.create(3995, 505, 'platform').setScale(.26).refreshBody();
        road.create(3995, 270, 'platform').setScale(.3).refreshBody(); 
        road.create(4108, 360, 'platform').setScale(.26).refreshBody();
        road.create(4185, 145, 'platform').setScale(.26).refreshBody(); 

        player = this.physics.add.sprite(100, 450, 'dude');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.setGravityY(320)

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
        stars.create(800, 25);
        stars.create(2455, 25);
        stars.create(3200, 25);
        stars.create(4185, 25);
        stars.children.iterate(child => {
            child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));
            child.setGravityY(320)
        });

        hearts = this.physics.add.group();
        hearts.defaultKey = "heart";
        hearts.create(1605, 25);
        hearts.children.iterate(h => h.setGravityY(320));

            


        this.physics.add.collider(player, road);
        this.physics.add.collider(stars, road);
        this.physics.add.collider(hearts, road);
        this.physics.add.overlap(player, stars, this.collectStar, null, this);
        this.physics.add.overlap(player, hearts, this.collectHeart, null, this);

        this.scene.manager.start("hud", this);

        cloud = this.physics.add.group ();
        let cloud = this.add.sprite(1000, 100, "cloud")
        cloud.setScale(2)
        this.add.tween({
            targets: [cloud],
            durration: 1000,
            delay: 0,
            yoyo: true,
            repeat: Infinity,
            ease: 'Sine.easeInOut',
            x: {
                getStart: () => 500,
                getEnd: () => 600
            }
        });



        enemies = this.physics.add.group();
        let star = enemies.create(500, 500, "star")
        star.setData("health", 3)
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

        if (keys.J.isDown) {
            this.spawnBullet();
        }

        if (keys.A.isDown) {
            player.setVelocityX(-160);
            player.anims.play('left', true);
            facingRight = false;
        }
        else if (keys.D.isDown) {
            player.setVelocityX(160);
            player.anims.play('right', true);
            facingRight = true;
        }
        else {
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        if (keys.W.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }

        this.physics.overlap(bullets, enemies, (bullet, enemy) => {
            if (enemy.getData("health") >= 2) {
                enemy.setData("health", enemy.getData("health") - 1);
            } else {
                enemy.destroy();
            }
            bullet.destroy();
        })
    }
    collectStar(player, star) {
        star.disableBody(true, true);
        this.score += 5;
        this.events.emit("updateHUD");
    }
    collectHeart(player, heart) {
        heart.disableBody(true, true);
        this.health += 1;
    }
    spawnBullet() {
        if (canFire === true) {
            canFire = false;
            const bullet = bullets.create(player.x, player.y, "bullet")

            if (facingRight === true) {
                bullet.setVelocityX(500)
            } else {
                bullet.setVelocityX(-500)
            }


            this.time.addEvent({
                delay: 400,
                callback: () => {
                    canFire = true;
                }
            });
        }
    }
}