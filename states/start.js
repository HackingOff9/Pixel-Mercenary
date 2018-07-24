let keys;
        
export default {
    preload() {
        this.load.image("title", "src/games/firstgame/assets/title2.png");
        //this.load.image("instructions", "img/instructions.png");
    },
    create() {
        const title = this.add.image(750, 500, "title");
        title.setOrigin(0.5)
        //title.setScale(5);

        keys = this.input.keyboard.addKeys({
            Space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            Enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
        });

       // const instructions = this.add.image(200, 300, "instructions");

        // This centers the instructions images
       // instructions.setOrigin(0.5, 0);
    },
    update() {
        if (keys.Space.isDown || keys.Enter.isDown) {
            this.scene.start("play");
        }
    }
}