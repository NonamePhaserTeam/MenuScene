import { globalEval } from 'jquery'
import Phaser from 'phaser'

import { gameSettings } from '../consts/GameSettings'
import SceneKeys from '../consts/SceneKeys'
import TextureKeys from '../consts/TextureKeys'
// import {TextureKeys, sprites} from '../consts/TextureKeys'

export default class Selezionamodalità extends Phaser.Scene
{
    cursors :Phaser.Types.Input.Keyboard.CursorKeys
    cursor : any
    Camera: Phaser.Cameras.Scene2D.Camera;
    Sfondo: Phaser.GameObjects.Image;
    lineaDecorativaInferiore: Phaser.GameObjects.Image;
    lineaDecorativaSuperiore: Phaser.GameObjects.Image;
    cardDx: Phaser.GameObjects.Sprite;
    cardSx: Phaser.GameObjects.Sprite;
    cardDxIsTint: Boolean;
    cardSxIsTint: Boolean;

    constructor()
	{
		super(SceneKeys.SelectMode)
	}

    init(){
        
    }
    create(){

        console.log("seleziona modalità")
        this.cursor = this.input.activePointer;
        this.cursors = this.input.keyboard.createCursorKeys()
        this.Sfondo = this.add.image(gameSettings.gameWidth/2, gameSettings.gameHeight/2, TextureKeys.Sfondo);
        this.Sfondo.setDisplaySize(gameSettings.gameWidth, gameSettings.gameHeight);
        this.Sfondo.setTint(0x333333);
        console.log(gameSettings.gameHeight)
        this.lineaDecorativaInferiore = this.add.image(gameSettings.gameWidth/2,gameSettings.gameHeight-100, TextureKeys.lineaBianca);
        this.lineaDecorativaInferiore.scaleX = (gameSettings.gameWidth / this.lineaDecorativaInferiore.width)-50;
        this.lineaDecorativaSuperiore = this.add.image(gameSettings.gameWidth/2,gameSettings.gameHeight-980, TextureKeys.lineaBianca);
        this.lineaDecorativaSuperiore.scaleX = (gameSettings.gameWidth / this.lineaDecorativaSuperiore.width)-50;
        let heightbetween2lines =  this.lineaDecorativaInferiore.y -  this.lineaDecorativaSuperiore.y;
        console.log(heightbetween2lines)
        //600 è una misura da mettere in una variabile
        this.cardDx = this.add.sprite(gameSettings.gameWidth-600,heightbetween2lines/2, TextureKeys.card2);
        this.cardSx = this.add.sprite(gameSettings.gameWidth-Math.abs(gameSettings.gameWidth-600),heightbetween2lines/2, TextureKeys.card1);
        this.cardDx.setInteractive();
        this.cardSx.setInteractive();
        this.cardDx.setTint(0x555555);
        gameSettings.gameWidth
        this.cardDxIsTint = true;
        this.cardSxIsTint = false;
        this.cardSx.setScale(1.2);
        
        let scrittaScena = this.add.text(0,0,"SELEZIONA UN'OPZIONE").setColor('#dddd00').setFontSize('72px').setAlpha(0.0);
        scrittaScena.setY(this.lineaDecorativaSuperiore.y/2-scrittaScena.height/2)     
        scrittaScena.setX(gameSettings.gameWidth/2-scrittaScena.width/2)

        this.tweens.add({
            targets: scrittaScena,
            alpha: 1, // Opacità desiderata (1 = completamente visibile)
            duration: 1000, // Durata dell'animazione in millisecondi
            ease: 'Linear', // Tipo di easing (puoi scegliere diversi tipi di easing se preferisci)
            onComplete: () => {
                // Callback da eseguire quando l'animazione è completata
                // Puoi eseguire altre azioni se necessario
            }
        });




        this.input.keyboard.on('keydown-LEFT',()=>{
            if(this.cardDxIsTint == true){//carta dx oscurata
                this.cardDx.clearTint();
                this.cardDx.setScale(1.2);
                this.cardSx.setTint(0x555555);
                this.cardSx.setScale(1);
                this.cardDxIsTint = false;
                this.cardSxIsTint = true;
                
            }else{
                this.cardSx.clearTint();
                this.cardSx.setScale(1.2);
                this.cardDx.setTint(0x555555);
                this.cardDx.setScale(1);
                this.cardDxIsTint = true;
                this.cardSxIsTint = false;
            }
        });
        this.input.keyboard.on('keydown-RIGHT',()=>{
            if(this.cardDxIsTint == true){//carta dx oscurata
                this.cardDx.clearTint();
                this.cardDx.setScale(1.2);
                this.cardSx.setTint(0x555555);
                this.cardSx.setScale(1);
                this.cardDxIsTint = false;
                this.cardSxIsTint = true;
                
            }else{
                this.cardSx.clearTint();
                this.cardSx.setScale(1.2);
                this.cardDx.setTint(0x555555);
                this.cardDx.setScale(1);
                this.cardDxIsTint = true;
                this.cardSxIsTint = false;
            }
        });

        this.cardDx.on('pointerover',  () => {
            if(this.cardDxIsTint == true){//carta dx oscurata
                this.cardDx.clearTint();
                this.cardDx.setScale(1.2);
                this.cardSx.setTint(0x555555);
                this.cardSx.setScale(1);
                this.cardDxIsTint = false;
                this.cardSxIsTint = true;
                
            }
        }, this);
        
        // Rileva quando il cursore è sopra la carta destra (cardDx)
        this.cardSx.on('pointerover',  () => {
            if(this.cardDxIsTint != true){//carta sx oscurata
                this.cardSx.clearTint();
                this.cardSx.setScale(1.2);
                this.cardDx.setTint(0x555555);
                this.cardDx.setScale(1);
                this.cardDxIsTint = true;
                this.cardSxIsTint = false;
                
            }
        }, this);

        this.input.keyboard.on('keydown-ENTER',()=>{
            if(this.cardDxIsTint == true){//selezione modalità di sinistra
                this.scene.stop(SceneKeys.SelectMode);
                this.scene.start(SceneKeys.SelezionaPersonaggi);
        
            }else{//selezione modalità destra
                this.scene.stop(SceneKeys.SelectMode);
                this.scene.start(SceneKeys.SelezionaPersonaggi);
            }
        })


        this.cardDx.on('pointerdown', ()=> {
            if(this.cardDxIsTint == false){
                this.scene.stop(SceneKeys.SelectMode);
                this.scene.start(SceneKeys.SelezionaPersonaggi);   
            }
            
        })

        this.cardSx.on('pointerdown', ()=> {
            if(this.cardSxIsTint == false){
                this.scene.stop(SceneKeys.SelectMode);
                this.scene.start(SceneKeys.SelezionaPersonaggi);   
            }
        })



    }

    update(time: number, delta: number): void {
        
        
    }
    
}