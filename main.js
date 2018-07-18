import Play from "./states/play.js";
import HUD from "./states/hud.js";

const config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 900,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    }
};


const game = new Phaser.Game(config);

game.scene.add("play", Play)
game.scene.add("hud", HUD);

game.scene.start("play")