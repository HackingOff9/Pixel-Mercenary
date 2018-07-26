let keys;

export default {
    preload() {
        this.load.image("gameover", "src/games/firstgame/assets/gameover.png");
    },
    create() {
        const G = this.add.graphics();
        G.fillStyle(0xEAEAEA);
        const gameover = this.add.image(700, 500, "gameover");
        gameover.setOrigin(0.5)
        keys = this.input.keyboard.addKeys({
            Space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            Enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
        });
        this.sound.pauseAll();
    },
    update() {
        if (keys.Space.isDown || keys.Enter.isDown) {
            this.scene.start("play");
        }
    }

}