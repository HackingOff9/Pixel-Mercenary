import Play from "./states/play.js";
import HUD from "./states/hud.js";
import start from "./states/start.js";
import gameover from "./states/gameover.js";
import winner from "./states/winner.js";
const config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 900,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};


const game = new Phaser.Game(config);

game.scene.add("play", Play)
game.scene.add("hud", HUD);
game.scene.add("start", start)
game.scene.add("gameover", gameover)
game.scene.add("winner", winner)

game.scene.start("start");
