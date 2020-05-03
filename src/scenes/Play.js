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
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield2.png');
        this.load.image('particle', './assets/particle.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.audio('bgmusic', './assets/bgmusic.mp3');
        
        

      }

   
      
    create() {
        


        var music = this.sound.add('bgmusic');

        music.play();

        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

                
        // white rectangle borders
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        // green UI background
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0, 0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2 - 8, 431, 'rocket').setScale(0.5, 0.5).setOrigin(0, 0);
        
        // add spaceships (x3) random x coordinate

        let randomXone = Math.floor(Math.random() * 500) + 1;
        let randomXtwo = Math.floor(Math.random() * 500) + 1;
        let randomXthree = Math.floor(Math.random() * 500) + 1;



        this.ship01 = new Spaceship(this, game.config.width + randomXone, 132, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + randomXtwo, 196, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width + randomXthree, 260, 'spaceship', 0, 10).setOrigin(0,0);




        // define keys
        
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // score
        this.p1Score = 0;
        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);

        //fire button

        this.add.text(450, 54, 'FIRE', scoreConfig);


        // game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            music.stop();
        }, null, this);



        this.clock = this.time.delayedCall(30000, () => {
            game.settings.spaceshipSpeed ++ ; 

        }, null, this);




        // var p = this.add.particles('particle');
        // var e = p.createEmitter();
        // e.setPosition(320,240);
        // e.setSpeed(200);


    }

    update() {

        
        // var p = this.add.particles('particle');
        // var e = p.createEmitter();
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart(this.p1Score);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }


        this.starfield.tilePositionX -= 4;





        if (!this.gameOver){

        this.p1Rocket.update();
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
          
            // console.log(this.explodePosition01);
        //   game.settings.gameTimer - 100000; 
            

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
/*
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            var p = this.add.particles('particle');
            this.emitter02 = p.createEmitter();
            this.emitter02.setPosition(200,240);
            this.emitter02.setSpeed(200);

            // e.setPosition(200,240);

        }
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            var p = this.add.particles('particle');
            this.emitter03 = p.createEmitter();
            this.emitter03.setPosition(200,240);
            this.emitter03.setSpeed(200);
            //e.setPosition(200,240);
        }

*/
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
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;  
        this.sound.play('sfx_explosion');

    }

    

}