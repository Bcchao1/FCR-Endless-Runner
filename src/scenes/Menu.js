class Menu extends Phaser.Scene {
  constructor() {
      super("menuScene");
  }

  preload() {
      // load audio

      
      this.load.audio('sfx_select', './assets/blip_select12.wav');
      this.load.audio('sfx_explosion', './assets/explosion38.wav');
      this.load.audio('bgmusic', './assets/bgmusic.mp3');

      /*
      this.load.audio('sfx_explosion', './assets/explosion38.wav');
      this.load.audio('sfx_rocket', './assets/rocket_shot.wav');

      */
      
 
  }

  create() {
 
  
    var music = this.sound.add('bgmusic');

    music.play();
// score
this.p1Score = 0;
// score display
let menuConfig = {
  fontFamily: 'Courier',
  fontSize: '28px',
  backgroundColor: '#F3B141',
  color: '#843605',
  align: 'right',
  padding: {
      top: 5,
      bottom: 5,
  },
  fixedWidth: 0
}


//show menu text
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let textSpacer = 64;

this.add.text(centerX,centerY- textSpacer, 'Flappy Cat Runner', menuConfig).setOrigin(0.5);
this.add.text(centerX,centerY,'Use <--> arrows to dodge', menuConfig).setOrigin(0.5);
menuConfig.backgroundColor = '#00FF00';
menuConfig.color = '#000';
this.add.text(centerX,centerY + textSpacer, 'Press <R> to Begin', menuConfig).setOrigin(0.5);
  
keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);


/*
var music = this.sound.add('bgmusic');
music.play();

if (Phaser.Input.Keyboard.JustDown(keyR)) {
music.stop();
}
if (Phaser.Input.Keyboard.JustDown(keyM)) {
music.stop();
*/

}

 
    
    

    

update() {



  if (Phaser.Input.Keyboard.JustDown(keyR)) {
   
    game.settings = {
      spaceshipSpeed: 3,
      gameTimer: 60000    
    }


   
    this.sound.play('sfx_select');
    this.scene.start("playScene");  
   // this.sound.play('bgmusic');
    

  
}
}
}