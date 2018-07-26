let keys;
        
export default {
    preload() {
        this.load.image("winner", "src/games/firstgame/assets/winner.png");
        //this.load.image("instructions", "img/instructions.png");
    },
    create() {
        const winner = this.add.image(700, 500, "winner");
        winner.setOrigin(0.5)
        //title.setScale(5);

        keys = this.input.keyboard.addKeys({
            Space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            Enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
        });
    },
    update() {
        if (keys.Space.isDown || keys.Enter.isDown) {
            this.scene.start("play");
        }
    }
}