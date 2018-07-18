export default class HUD {
    init(play) {
        this.scoreText = undefined;

        play.events.addListener("updateHUD", () => {
            console.log("Hud updated")
            this.scoreText.setText('Score: ' + play.score);
        })
    }
    create() {
        console.log("Create Running")
        this.scoreText = this.add.text(800, 20, 'score: 0', { 
            fontSize: '32px', 
            color: '#000' 
        });
    }
}