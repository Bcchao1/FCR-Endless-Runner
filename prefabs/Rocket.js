// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.isFiring = false; //track rocket firing status
     // this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx

    }

update(){
    //left right movement

        if(keyLEFT.isDown && this.y >=30){
            this.y -=2;
        }else if (keyRIGHT.isDown && this.y <=350) {
            this.y +=2;
        }

     

}

reset() {

    this.setPosition(-1000, -1000);
}

  }
