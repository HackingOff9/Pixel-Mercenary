var player;
var stars;
var road;
var cursors;
var gameOver = false;
var scoreText;
var keys;
var hearts;
var house1;
const worldWidth = 4950;
const worldHeight = 900;
const startHealth = 3;
let door;
let bullets;
let bullet2;
let ebullets;
let canFire;
let facingRight;
let enemies;
let clouds;
let tree;
let key;
let audio;
export default class Play {
    preload() {
        this.load.image('sky', 'src/games/firstgame/assets/sky.png');
        this.load.image('road', 'src/games/firstgame/assets/Road.png');
        this.load.image('star', 'src/games/firstgame/assets/star.png');
        this.load.image('key', 'src/games/firstgame/assets/Key.png');
        this.load.spritesheet('dude', 'src/games/firstgame/assets/gg2.png', { frameWidth: 38.75, frameHeight: 64 });
        this.load.image('heart', 'src/games/firstgame/assets/heart.png');
        this.load.image('house1', 'src/games/firstgame/assets/House1.png');
        this.load.image('house2', 'src/games/firstgame/assets/House2.png');
        this.load.image('cloud', 'src/games/firstgame/assets/cloud.png');
        this.load.spritesheet('door1', 'src/games/firstgame/assets/door1.png', { frameWidth: 150, frameHeight: 150 });
        this.load.image('house3', 'src/games/firstgame/assets/House3.png');
        this.load.image('house4', 'src/games/firstgame/assets/House4.png');
        this.load.image('house5', 'src/games/firstgame/assets/House5.png');
        this.load.spritesheet('door1', 'src/games/firstgame/assets/Door1.png', { frameWidth:150, frameHeight: 150});
        this.load.image("platform", "src/games/firstgame/assets/platform.png");
        this.load.image("bullet", "src/games/firstgame/assets/bullet.png");
        this.load.image("bench","src/games/firstgame/assets/bench.png");
        this.load.image("tree", "src/games/firstgame/assets/tree.png");
        this.load.image ("owner","src/games/firstgame/assets/owner.png")
        this.load.image("billboard","src/games/firstgame/assets/billboard.png");
        this.load.image("bullet2","src/games/firstgame/assets/bullet2.png");
        this.load.image("lazer","src/games/firstgame/assets/lazer.png");
        this.load.spritesheet('bg', 'src/games/firstgame/assets/bg2.png', { frameWidth: 38.75, frameHeight: 64 });
        this.load.audio ("audio",['src/games/firstgame/assets/pixelaudio.mp3']);
    }   
    init() {
        this.score = 0;
        this.stars = undefined;
        this.health = startHealth;
        canFire = true;
        facingRight = true;
        this.audio = undefined;
    }
    create() {
        this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
        this.soundFX = this.sound.add ("audio", {loop : "true"});
        this.soundFX.play ();
        if (!this.audio.isPlaying) {
            this.audio.play();
        } else {
            this.audio.pause();  
        }
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
        this.add.image(3200, 299, 'house4');
        const house5 = this.add.image(4000, 340, 'house5');
        house5.setScale(1.75);
        this.add.image(250, 525, 'billboard');
        this.add.image (1200, 550, "bench");
        this.add.image (1850, 525, "tree");
        this.add.image (3825, 542.5, "owner");
        
        


        door = this.physics.add.sprite(4500, 524, 'door1');
        this.anims.create({
            key: 'door-animation',
            frames: this.anims.generateFrameNumbers('door1', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        bullets = this.physics.add.group();

        ebullets = this.physics.add.group();

        road = this.physics.add.staticGroup();

        for (let i = 0; i < 26; i++) {
            road.create(150 + 200 * i, 799, 'road').setScale(2).refreshBody();
        }
                
        road.create(710, 445, 'platform').setScale(.25).refreshBody();
        road.create(798.75, 295, 'platform').setScale(.25).refreshBody();
        road.create(887.5, 445, 'platform').setScale(.25).refreshBody();
        road.create(1200, 550, 'platform').setScale(.3).refreshBody();
        road.create(1504, 459, 'platform').setScale(.125).refreshBody();
        road.create(1500, 225, 'platform').setScale(.21).refreshBody(); 
        road.create(1588, 468, 'platform').setScale(.15).refreshBody();
        road.create(1588, 325, 'platform').setScale(.25).refreshBody();
        road.create(1605, 100, 'platform').setScale(.085).refreshBody();
        road.create(1666.5, 225, 'platform').setScale(.21).refreshBody();
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
        //player.scale.setTo(0.5)
        //player.body.setSize(82.5, 50)
        

        const camera = this.cameras.main;
        camera.startFollow(player);
        camera.setBounds(0, 0, worldWidth, worldHeight);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 0 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });


        key = this.physics.add.group();
        key.defaultKey = "key";
        key.create(800, 25);
        key.create(2455, 25);
        key.create(3200, 25);
        key.create(4185, 25);
        
        key.children.iterate(child => {
            child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));
            child.setGravityY(320)
            child.setScale(.5)
        });

        hearts = this.physics.add.group();
        hearts.defaultKey = "heart";
        hearts.create(1605, 25);
        hearts.children.iterate(h => h.setGravityY(320));

            


        this.physics.add.collider(player, road);
        this.physics.add.collider(key, road);
        this.physics.add.collider(hearts, road);
        this.physics.add.overlap(player, key, this.collectKey, null, this);
        this.physics.add.overlap(player, hearts, this.collectHeart, null, this);

        this.scene.manager.start("hud", this);

        clouds = this.physics.add.group();
        let cloud = this.add.sprite(1000, 50, "cloud")
        cloud.setScale(2)
        this.add.tween({
            targets: [cloud],
            durration: 2000,
            delay: 0,
            yoyo: true,
            repeat: Infinity,
            ease: 'Sine.easeInOut',
            x: {
                getStart: () => 500,
                getEnd: () => 700
            }
        });
        let cloud2 = this.add.sprite(2000, 100, "cloud")
        cloud2.setScale(2)
        this.add.tween({
            targets: [cloud2],
            duration: 2000,
            delay: 0,
            yoyo: true,
            repeat: Infinity,
            ease: 'Sine.easeInOut',
            x: {
                getStart: () => 1100,
                getEnd: () => 1600,
            }
        });
        let cloud3 = this.add.sprite(2000, 100, "cloud")
        cloud2.setScale(3)
        this.add.tween({
            targets: [cloud3],
            duration: 2000,
            delay: 0,
            yoyo: true,
            repeat: Infinity,
            ease: 'Sine.easeInOut',
            x: {
                getStart: () => 2000,
                getEnd: () => 2500,
            }
        });


        enemies = this.physics.add.group();
        let bg = enemies.create(500, 575, "bg")
        bg.setData("health", 3)
        this.add.tween({
            targets: [bg],
            durration: 1000,
            delay: 0,
            hold: 500,
            yoyo: true,
            repeat: Infinity,
            ease: 'linear',
            x: {
                getStart: () => 500,
                getEnd: () => 600
            },
            onYoyo: () => {
                this.spawnEnemyBullet(bg, true)
            },
            onRepeat: () => {
                this.spawnEnemyBullet(bg, false)
            }
        });

        let bg2 = enemies.create(500, 522.5, "bg")
        bg2.setData("health", 3)
        this.add.tween({
            targets: [bg2],
            durration: 1000,
            delay: 0,
            hold: 500,
            yoyo: true,
            repeat: Infinity,
            ease: 'linear',
            x: {
                getStart: () => 1150,
                getEnd: () => 1250
            },
            onYoyo: () => {
                this.spawnEnemyBullet(bg2, true)
            },
            onRepeat: () => {
                this.spawnEnemyBullet(bg2, false)
            }
        });
        
        let bg3 = enemies.create(500, 470, "bg")
        bg3.setData("health", 3)
        this.add.tween({
            targets: [bg3],
            durration: 1000,
            delay: 0,
            hold: 500,
            yoyo: true,
            repeat: Infinity,
            ease: 'linear',
            x: {
                getStart: () => 2375,
                getEnd: () => 2425
            },
            onYoyo: () => {
                this.spawnEnemyBullet(bg3, true)
            },
            onRepeat: () => {
                this.spawnEnemyBullet(bg3, false)
            }
        });

        let bg4 = enemies.create(500, 575, "bg")
        bg4.setData("health", 3)
        this.add.tween({
            targets: [bg4],
            durration: 1000,
            delay: 0,
            hold: 500,
            yoyo: true,
            repeat: Infinity,
            ease: 'linear',
            x: {
                getStart: () => 3500,
                getEnd: () => 3600
            },
            onYoyo: () => {
                this.spawnEnemyBullet(bg4, true)
            },
            onRepeat: () => {
                this.spawnEnemyBullet(bg4, false)
            }
        });

        let bg5 = enemies.create(500, 575, "bg")
        bg5.setData("health", 3)
        this.add.tween({
            targets: [bg5],
            durration: 1000,
            delay: 0,
            hold: 500,
            yoyo: true,
            repeat: Infinity,
            ease: 'linear',
            x: {
                getStart: () => 4000,
                getEnd: () => 4100
            },
            onYoyo: () => {
                this.spawnEnemyBullet(bg5, true)
            },
            onRepeat: () => {
                this.spawnEnemyBullet(bg5, false)
            }
        });


    }

    update() {

        this.physics.overlap(bullets, enemies, (bullet, enemy) => {
            if (enemy.getData("health") >= 2) {
                enemy.setData("health", enemy.getData("health") - 
                1);
            } else {
                enemy.destroy();
                enemy.__dead = true;
            }
            bullet.destroy();
        })

        this.physics.overlap(player, door, (player, door) => {
            console.log('collide')
        });


        this.physics.collide(bullets, ebullets, (pBullet, eBullet) => {
            pBullet.destroy();
            eBullet.destroy();
        })

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
                enemy.setData("health", enemy.getData("health") - 
                1);
            } else {
                enemy.destroy();
                enemy.__dead = true;
            }
            bullet.destroy();
        })

        this.physics.overlap(player, door, (player, door) => {
            if (this.score >= 20) {
                this.scene.start("winner")
                this.scene.manager.stop("hud")
            }
        });

        this.physics.collide(player, ebullets, (player, bullet) => {
            bullet.destroy();
            this.health-=0.5;
            console.log("fjkdslfjsdklfkj")
        })

        if (this.health <= 0) {
            this.scene.manager.stop("hud")
            this.scene.start("gameover")
        }
    }
    collectKey(player, key) {
        key.disableBody(true, true);
        this.score += 5;
        this.events.emit("updateHUD");
    }
    collectHeart(player, heart) {
        heart.disableBody(true, true);
        this.health += 2;
    }
    spawnBullet() {
        if (canFire === true) {
            canFire = false;
            const bullet = bullets.create(player.x, player.y-15, "lazer")

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
    spawnEnemyBullet(enemy, direction) {
        if (enemy.__dead) {
            return;
        }
        const ebullet = ebullets.create(enemy.x, enemy.y, 'bullet')
        if(direction){
            ebullet.setVelocityX(200)
        } else {
            ebullet.setVelocityX(-200)
        }
    }

    bulletCollision(pBullet, eBullet){

    }
}