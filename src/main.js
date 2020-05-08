/*
Bryan Chao
Flappy Cat Runner
5/7

Cat parkour game Inspired by Nyan Cat

Creative tilt

Cat Tilesprite animated to have surprised faced when blown up, eyes widening. Drawn in Asesprite
along with rockets. Cat particle explosion img file created in MS paint. Particle explosions animated to time out over time.
Game increases in difficulty over time

*/



let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play]
  }

let game = new Phaser.Game(config);
// define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000    
}

// reserve keyboard vars
let keyR, keyLEFT, keyRIGHT,keyF,keyM;
