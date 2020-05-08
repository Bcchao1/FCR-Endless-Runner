class Play extends Phaser.Scene {
    //var e;
    constructor() {
        super("playScene");
        // this.e = new.createEmitter();
        this.countDownLength = 25;
        this.emitter01;
        this.emitter02;
        this.emitter03;
        this.isExploding01 = false;
        this.isExploding02 = false;
        this.isExploding03 = false;
        this.explodingCounter01;
        this.explodingCounter02;
        this.explodingCounter03;
        this.explodePosition01x;
        this.explodePosition01y;
        this.explodePosition02x;
        this.explodePosition02y;
        this.explodePosition03x;
        this.explodePosition03y;
    }


    preload() {

        this.load.image('bgsky', './assets/bgsky.jpg');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('cat', './assets/cat.png', {frameWidth: 60, frameHeight: 60, startFrame: 0, endFrame: 5});
        this.load.image('particle', './assets/particle.png');
        //this.load.audio('bgmusic', './assets/bgmusic.mp3');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('meow', './assets/meow.mp3');

        
      

      }

   
      
    create() {
        


        // place tile sprite
        this.bgsky = this.add.tileSprite(0, 130, 640, 480, 'bgsky').setOrigin(0, 0);
        

                
        // white rectangle borders
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        // green UI background
        this.add.rectangle(37, 30, 566, 100, 0x6E9EF2).setOrigin(0, 0);


        this.p1Rocket = new Rocket(this, 45, game.config.height/2, 'cat').setScale(0.5, 0.5).setOrigin(0, 0);

    
        
        // add spaceships (x3) random x coordinate

        let randomXone = Math.floor(Math.random() * 500) + 1;
        let randomXtwo = Math.floor(Math.random() * 500) + 1;
        let randomXthree = Math.floor(Math.random() * 500) + 1;

        let randomYone = Math.floor(Math.random() * 400) + 1;
        let randomYtwo = Math.floor(Math.random() * 400) + 1;
        let randomYthree = Math.floor(Math.random() * 400) + 1;



        this.ship01 = new Spaceship(this, game.config.width + randomXone, randomYone, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + randomXtwo, randomYtwo, 'spaceship', 0, 10).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width + randomXthree, randomYthree, 'spaceship', 0, 0).setOrigin(0,0);




        // define keys
        
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.anims.create({
            key: 'cat',
            frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 5, first: 0}),
            frameRate: 30
        });

        // score
        this.p1Score = 0;
        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#4D83DF',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(500, 54, this.p1Score, scoreConfig);

        //fire button

       // this.add.text(450, 54, 'FIRE', scoreConfig);


        
        this.gameOver = false;
        
    
     

     //change to collision detection
        scoreConfig.fixedWidth = 0;
     
     /*
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
          //  music.stop();
        }, null, this);

*/

        this.clock = this.time.delayedCall(20000, () => {
            game.settings.spaceshipSpeed ++ ; 

        }, null, this);

        this.clock = this.time.delayedCall(40000, () => {
            game.settings.spaceshipSpeed ++ ; 

        }, null, this);




    

    }

    update() {


     
        

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 400
        }
        
        // var p = this.add.particles('particle');
        // var e = p.createEmitter();
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart(this.p1Score);
        }
        /*
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start("menuScene");
        }
        */

        this.bgsky.tilePositionX -= 4;




        if (!this.gameOver){


   
        this.p1Rocket.update();
        let kitty = this.add.sprite(this.p1Rocket.x, this.p1Rocket.y, 'cat').setOrigin(0, 0);
        kitty.anims.play('cat'); 
        this.ship01.update();               // update spaceships (x3)
        this.ship02.update();
        this.ship03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.explodePosition01x = this.ship01.x;
            this.explodePosition01y = this.ship01.y;
            this.shipExplode(this.ship01);
            var p = this.add.particles('particle');
            this.emitter01 = p.createEmitter();

            this.isExploding01 = true;
            this.explodingCounter01 = this.countDownLength;
            
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(R) to Restart', scoreConfig).setOrigin(0.5);
            //this.add.text(game.config.width/2, game.config.height/2 + 96, ' or (M) for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            

          
            // console.log(this.explodePosition01);
        //   game.settings.gameTimer - 100000; 
            

        }

        if(this.ship01.x< 10){
        this.ship01.reset();
        this.p1Score += 1;
        this.scoreLeft.text = this.p1Score; 
        }
        
        if(this.ship02.x< 10){
            this.ship02.reset();
            this.p1Score += 1;
            this.scoreLeft.text = this.p1Score; 
            }
            
        if(this.ship03.x< 10){
            this.ship03.reset();
            this.p1Score += 1;
            this.scoreLeft.text = this.p1Score; 
            }


        if (this.isExploding01 == true) {
            // console.log(this.explodePosition01);
            this.emitter01.setPosition(this.explodePosition01x,this.explodePosition01y);
            this.emitter01.setSpeed(300);
            this.explodingCounter01 -= 1;

       
            if(this.explodingCounter01 == 0) {
                this.isExploding01 = false;
                this.emitter01.setPosition(-1000, -1000);
                this.emitter01.setSpeed(0);
            }
        }
//2
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.explodePosition02x = this.ship02.x;
            this.explodePosition02y = this.ship02.y;
            this.shipExplode(this.ship02);
            var p = this.add.particles('particle');
            this.emitter02 = p.createEmitter();
            
            this.isExploding02 = true;
            this.explodingCounter02 = this.countDownLength;

            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(R) to Restart', scoreConfig).setOrigin(0.5);
            //this.add.text(game.config.width/2, game.config.height/2 + 96, ' or (M) for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
          
            // console.log(this.explodePosition01);
        //   game.settings.gameTimer - 100000; 
            

        }
        if (this.isExploding02 == true) {
            // console.log(this.explodePosition01);
            this.emitter02.setPosition(this.explodePosition02x,this.explodePosition02y);
            this.emitter02.setSpeed(300);
            this.explodingCounter02 -= 1;


            if(this.explodingCounter02 == 0) {
                this.isExploding02 = false;
                this.emitter02.setPosition(-1000, -1000);
                this.emitter02.setSpeed(0);
            }
        }
//3
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.explodePosition03x = this.ship03.x;
            this.explodePosition03y = this.ship03.y;
            this.shipExplode(this.ship03);
            var p = this.add.particles('particle');
            this.emitter03 = p.createEmitter();
            
            this.isExploding03 = true;
            this.explodingCounter03 = this.countDownLength;

            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(R) to Restart', scoreConfig).setOrigin(0.5);
            //this.add.text(game.config.width/2, game.config.height/2 + 96, ' or (M) for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
          
            // console.log(this.explodePosition01);
        //   game.settings.gameTimer - 100000; 
            

        }
        if (this.isExploding03 == true) {
            // console.log(this.explodePosition01);
            this.emitter03.setPosition(this.explodePosition03x,this.explodePosition03y);
            this.emitter03.setSpeed(300);
            this.explodingCounter03 -= 1;

    
            if(this.explodingCounter03 == 0) {
                this.isExploding03 = false;
                this.emitter03.setPosition(-1000, -1000);
                this.emitter03.setSpeed(0);
            }
        }

    }


      

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;                         // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });      
        // score increment and repaint
        //this.p1Score += ship.points;
        //this.scoreLeft.text = this.p1Score;  
        this.sound.play('sfx_explosion');
        this.sound.play('meow');

    }

    

}