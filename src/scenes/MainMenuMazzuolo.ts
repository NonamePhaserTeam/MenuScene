import { globalEval } from 'jquery'
import Phaser from 'phaser'

import { gameSettings } from '../consts/GameSettings'
import SceneKeys from '../consts/SceneKeys'
import TextureKeys from '../consts/TextureKeys'

export default class MainMenuMazzuolo extends Phaser.Scene
{
    Camera: Phaser.Cameras.Scene2D.Camera;
    buttons: Phaser.Physics.Arcade.StaticGroup;
    Sfondo: Phaser.GameObjects.Image;



	constructor()
	{
		super(SceneKeys.GameMazzuolo)
	}

    init(){
        
    }
    create()
    {
        console.log("Main Menu Mazzuolo");
        this.cameras.main.setBackgroundColor('#701445'); // Imposta lo sfondo blu
        this.Sfondo = this.add.image(gameSettings.gameWidth/2, gameSettings.gameHeight/2, TextureKeys.Sfondo);
        this.Sfondo.setDisplaySize(gameSettings.gameWidth, gameSettings.gameHeight);
   

        this.Camera = this.cameras.main;
        this.buttons = this.physics.add.staticGroup();
        const button = this.buttons.create(gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5, TextureKeys.Button).setScale(0.5)
        const buttonBody = button.body;
        buttonBody.updateFromGameObject();

        var graphics = this.add.graphics();
        
            // Imposta le dimensioni della griglia e la dimensione di ogni cella
            var gridSizeX = gameSettings.gameWidth; // Larghezza dello schermo
            var gridSizeY = gameSettings.gameHeight; // Altezza dello schermo
            var cellSize = 50; // Dimensione di ogni cella
        
            // Disegna la griglia orizzontale
            for (var x = 0; x <= gridSizeX; x += cellSize) {
                graphics.lineStyle(1, 0xffffff); // Imposta lo stile della linea (spessore, colore)
                graphics.beginPath();
                graphics.moveTo(x, 0); // Posizione iniziale della linea
                graphics.lineTo(x, gridSizeY); // Posizione finale della linea
                graphics.closePath();
                graphics.strokePath();
            }
        
            // Disegna la griglia verticale
            for (var y = 0; y <= gridSizeY; y += cellSize) {
                graphics.lineStyle(1, 0xffffff);
                graphics.beginPath();
                graphics.moveTo(0, y);
                graphics.lineTo(gridSizeX, y);
                graphics.closePath();
                graphics.strokePath();
            }
        
    }

    update(time: number, delta: number): void {

    }
}

/*
import { globalEval } from "jquery";
import Phaser, { Physics } from "phaser";

import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";

export default class Gioco_prova extends Phaser.Scene {
  Giocatore: Phaser.Physics.Arcade.Sprite;
  //Piattaforma: Phaser.Physics.Arcade.Sprite;
  Punti: Phaser.Physics.Arcade.StaticGroup;
  Camera: Phaser.Cameras.Scene2D.Camera;
  //Cursore: Phaser.Types.Input.Keyboard.CursorKeys;
  //Controlli: Phaser.Cameras.Controls.SmoothedKeyControl;
  Punteggio: Phaser.GameObjects.BitmapText;

  W: Phaser.Input.Keyboard.Key;
  A: Phaser.Input.Keyboard.Key;
  S: Phaser.Input.Keyboard.Key;
  D: Phaser.Input.Keyboard.Key;
  SPACE: Phaser.Input.Keyboard.Key;
  platforms: Phaser.Physics.Arcade.StaticGroup;
  x: number;
  y: number;
  counter:number;
  npiattaforme:number;
  maluses: Phaser.Physics.Arcade.StaticGroup;
  constructor() {
    super(SceneKeys.Game);
  }

  init() {
    this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.SPACE = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.Camera = this.cameras.main;
    this.Camera.setBounds(
      0,
      0,
      this.game.canvas.width/2,
      this.game.canvas.height*2,
      true
    ).setName('main');

    this.physics.world.setBounds(
      500,
      1,
      this.game.canvas.width/2,
      this.game.canvas.height * 2
    );
  }
  create() {
    this.npiattaforme = 0;
    this.counter = 0;
    this.platforms = this.physics.add.staticGroup();
    const firstPlatform = this.platforms.create(
      gameSettings.gameWidth/2,
      gameSettings.gameHeight-50 ,
      TextureKeys.Piattaforma
    ).setScale(1.5);
    const firstPlatformBody = firstPlatform.body;
    firstPlatformBody.updateFromGameObject();

    this.maluses = this.physics.add.staticGroup();

    this.x = (gameSettings.gameWidth/3);
    this.y = 100

    this.Giocatore = this.physics.add
      .sprite(
        gameSettings.gameWidth * 0.5,
        gameSettings.gameHeight * 1,
        TextureKeys.Giocatore
      )
      .setBounce(0, 0)
      .setCollideWorldBounds(true)
      .setDrag(0.2, 0.2)
      .setMaxVelocity(900, 900)
      .setGravity(100, 700)
      .setScale(0.2);

    this.Camera.startFollow(this.Giocatore, true, 0.05, 0.05);
  }

  update(time: number, delta: number): void {
    this.physics.add.collider(this.Giocatore, this.platforms);
    
    this.physics.add.overlap(this.Giocatore, this.platforms, () => {
      if (this.Giocatore.body.touching.up) {
        this.Giocatore.setVelocityY(-5000);
      } else if (this.Giocatore.body.touching.down) {
        this.Giocatore.setVelocityY(5000);
      } else if (this.Giocatore.body.touching.left) {
        this.Giocatore.setVelocityX(5000)
      } else if (this.Giocatore.body.touching.right) {
        this.Giocatore.setVelocityX(-5000);
      }
    });
    
    //this.physics.add.collider(this.Giocatore, ,()=>{});

    const speed = 500;

    this.Giocatore.setVelocity(0);

    if (this.A.isDown) {
      this.Giocatore.setVelocityX(-speed);
    } else if (this.D.isDown) {
      this.Giocatore.setVelocityX(speed);
    }
    if (this.S.isDown) {
      this.Giocatore.setVelocityY(speed);
    } else if (this.W.isDown) {
      this.Giocatore.setVelocityY(-speed + 200);
    }

    if(this.npiattaforme<4){
      for(let i = 0; i < 4; i++){
        if(i % 2 == 0) this.x *= 2;
        else this.x /= 2;
        this.npiattaforme++;

        /** @type {Phaser.Physics.Arcade.Sprite} *//*
        const platform = this.platforms.create(this.x, this.y, TextureKeys.Piattaforma);

        platform.setScale(1.5)

        this.platforms.add(platform)
        if(this.npiattaforme % 2 == 0){//creazione malus
          const malus = this.maluses.create(platform.x, (platform.y-platform.height), TextureKeys.Redcross);
          const bodyMalus = malus.body as Physics.Arcade.StaticBody
          bodyMalus.updateFromGameObject()
          this.maluses.add(malus)
        }
        this.y += 200;
        //this.physics.add.collider(this._pou, this.platforms);

        const body = platform.body as Physics.Arcade.StaticBody
        body.updateFromGameObject()
      }
    }
    
    this.physics.add.overlap(this.Giocatore, this.maluses, (Giocatore, malus) => {
      malus.destroy();
      this.counter++;
      console.log(`Malus presi: ${this.counter}`);//prova
      ////decrementa count
    });
  }
}
*/