import Phaser from "phaser";
import { gameSettings } from '../consts/GameSettings'
import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimationKeys";
import FontKeys from "../consts/FontKeys";

export default class SelezionaPersonaggi extends Phaser.Scene
{
    Camera: Phaser.Cameras.Scene2D.Camera;
    cursors :Phaser.Types.Input.Keyboard.CursorKeys
    Sfondo: Phaser.GameObjects.Image;
    lineaDecorativaInferiore: Phaser.GameObjects.Image;
    lineaDecorativaSuperiore: Phaser.GameObjects.Image;
    lineaSimmetriaRettangolo1: Phaser.GameObjects.Image;//orizzontale
    lineaSimmetriaRettangolo2: Phaser.GameObjects.Image;//verticale prima della transizione
    lineaSimmetriaRettangolo3: Phaser.GameObjects.Image;////verticale dopo la transizione
    frecciaSceltaPersonaggioSx: Phaser.GameObjects.Image;
    frecciaSceltaPersonaggioDx: Phaser.GameObjects.Image;
    chain: Phaser.GameObjects.Image;
    Specchio: Phaser.GameObjects.Image;
    statsCharacters: Phaser.GameObjects.Group;
    items:Phaser.GameObjects.Group;
    characters:Phaser.GameObjects.Group;
    character1:Phaser.GameObjects.Image;
    itemContainer:Phaser.GameObjects.Image;
    descriptionsCharacters:Phaser.GameObjects.Group;
    descriptionsCharacter1:Phaser.GameObjects.Image;
    namesCharacters:Phaser.GameObjects.Group;
    stats1:Phaser.GameObjects.Image;
    stats:Phaser.GameObjects.Image;
    previewCharacterTMP:Phaser.GameObjects.Image; 
    text1: Phaser.GameObjects.Text;
    nomeCharacters:Phaser.GameObjects.Text;
    descitem1:Phaser.GameObjects.Image;
    itemSelector:Phaser.GameObjects.Image;
    constructor()
    {
        super('SelezionaPersonaggi')
    }

    init(){
        
    }

    create()
    {
        /*
        NOTE:
        la scena è divisa in 4 quadranti: 1 in alto a sx,2 in alto a dx,3 in basso a dx e 4 in basso a sx,
        //quadrante 5 a destra del quadrante 1
        in fase finale o rendere trasparente o cambiare lo z index delle linee di costruzione, non eliminarle perchè sono necessarie per i calcoli

        */
        //inserimento nell'array di tutti i preview
        // let previewCharacterArray = [];
        // previewCharacterArray.push(this.add.image(gameSettings.gameWidth/2, gameSettings.gameHeight/2, TextureKeys.stats[0]));
        console.log("Scena di selezione dei personaggo");
        this.Sfondo = this.add.image(gameSettings.gameWidth/2, gameSettings.gameHeight/2, TextureKeys.Sfondo).setDepth(0);
        this.Sfondo.setDisplaySize(gameSettings.gameWidth, gameSettings.gameHeight);
        this.Sfondo.setTint(0x333333);
        console.log(gameSettings.gameHeight)
        let offset = 50;
        this.lineaDecorativaInferiore = this.add.image(gameSettings.gameWidth/2,gameSettings.gameHeight-100, TextureKeys.lineaBianca);
        this.lineaDecorativaInferiore.scaleX = (gameSettings.gameWidth / this.lineaDecorativaInferiore.width)-offset;
        this.lineaDecorativaInferiore.setTint(0x942299);
        this.lineaDecorativaSuperiore = this.add.image(gameSettings.gameWidth/2,gameSettings.gameHeight-980, TextureKeys.lineaBianca);
        this.lineaDecorativaSuperiore.scaleX = (gameSettings.gameWidth / this.lineaDecorativaSuperiore.width)-offset;
        let heightbetween2lines =  this.lineaDecorativaInferiore.y -  this.lineaDecorativaSuperiore.y;
        this.lineaSimmetriaRettangolo1 = this.add.image(gameSettings.gameWidth/2,gameSettings.gameHeight/2, TextureKeys.lineaBianca);
        this.lineaSimmetriaRettangolo1.scaleX = (gameSettings.gameWidth / this.lineaDecorativaSuperiore.width)-offset;// orizzontale
        this.lineaSimmetriaRettangolo2 = this.add.image(gameSettings.gameWidth/2,gameSettings.gameHeight/2, TextureKeys.lineaBianca);
        this.lineaSimmetriaRettangolo2.scaleX = (gameSettings.gameWidth / this.lineaDecorativaSuperiore.width)-offset;//verticale
        this.lineaSimmetriaRettangolo2.setRotation(Math.PI / 2); 

        this.frecciaSceltaPersonaggioSx =  this.add.image(gameSettings.gameWidth/2,0, TextureKeys.arrowScelta);
        console.log("this.lineaDecorativaSuperiore.y"+this.lineaDecorativaSuperiore.y)
        console.log("this.lineaSimmetriaRettangolo1.y"+this.lineaSimmetriaRettangolo1.y)
        //primo quadrante
        let heightFirstQuadrant = Math.abs(this.lineaDecorativaSuperiore.y - this.lineaSimmetriaRettangolo1.y);
        let widthFirstQuadrant = Math.abs(0 + this.lineaSimmetriaRettangolo1.x);
        console.log("alt1 "+heightFirstQuadrant)//in alto a destra
        console.log("lar1 "+widthFirstQuadrant)//in alto a destra
        let frecciaSceltaPersonaggioSxHeight = this.frecciaSceltaPersonaggioSx.height;

        console.log((frecciaSceltaPersonaggioSxHeight / 2));
        this.frecciaSceltaPersonaggioSx.setX(widthFirstQuadrant*0.20);
        this.frecciaSceltaPersonaggioSx.setY(heightFirstQuadrant - (frecciaSceltaPersonaggioSxHeight / 2));
        console.log(this.frecciaSceltaPersonaggioSx.x)
        this.frecciaSceltaPersonaggioDx =  this.add.image(gameSettings.gameWidth/2,2000, TextureKeys.arrowScelta);
        let frecciaSceltaPersonaggioDxHeight = this.frecciaSceltaPersonaggioDx.height;
        this.frecciaSceltaPersonaggioDx.setX(widthFirstQuadrant*0.80);//quella di destra dista 20% dal bordo destro
        this.frecciaSceltaPersonaggioDx.setY(heightFirstQuadrant - (frecciaSceltaPersonaggioDxHeight / 2));
        this.frecciaSceltaPersonaggioDx.setRotation(Math.PI);
       
        this.chain = this.add.image(gameSettings.gameWidth/2,gameSettings.gameHeight-100, TextureKeys.chain)
        .setScale(0.5);
        this.chain.setX(widthFirstQuadrant/2)
        this.chain.setY(heightFirstQuadrant - this.chain.height/2)
        console.log("this.chain.y"+this.chain.y)

        this.chain.setDepth(10);

        this.character1 = this.add.image(0,0,TextureKeys.pg1).setScale(0.6).setDepth(1);
        this.character1.setX(this.chain.x)
        this.character1.setY(this.chain.y)
        //secondo quadrante in basso a destra
        let heightSecondQuadrant = Math.abs(this.lineaSimmetriaRettangolo1.y - this.lineaDecorativaSuperiore.y);
        let widthSecondQuadrant = Math.abs(this.lineaSimmetriaRettangolo1.x - gameSettings.gameWidth)
        console.log("alt2 "+heightSecondQuadrant);
        console.log("lar2 "+widthSecondQuadrant);
        this.Specchio = this.add.image((gameSettings.gameWidth- widthSecondQuadrant/2),0,TextureKeys.specchio);
        this.Specchio.setX(Math.abs(gameSettings.gameWidth- (widthSecondQuadrant-this.Specchio.width*1)));
        console.log("this.Specchio.x nel quadrante 1 "+(gameSettings.gameWidth-this.Specchio.x));
        this.Specchio.setY(Math.abs(heightSecondQuadrant- this.Specchio.height/3))
        //perchè più si va a destra più sale la x,tutti i quadranti hanno la stessa misura
        //ma per mettere qualcosa nei quadranti c'è bisogno di vedere se partire da 0 
        //come quadrante 3 e 4 oppure sottrarre alla width totale come per 1 e 2 
        this.itemContainer = this.add.image(0,0,TextureKeys.itemContainer).setScale(0.8);
        this.itemContainer.setX(Math.abs(this.Specchio.x + (this.Specchio.width * 1.5)))
        this.itemContainer.setY(Math.abs(this.lineaSimmetriaRettangolo2.y-this.Specchio.y+this.Specchio.height/2));//this.Specchio.height-this.itemContainer.height
    
        const speciePersonaggio = this.add.text(this.itemContainer.x,this.itemContainer.y-this.itemContainer.height,"PAGANESE")
        speciePersonaggio.setFontSize('48px');
        speciePersonaggio.setColor('#dddd00');
        speciePersonaggio.setBackgroundColor('#000000')
        speciePersonaggio.setX(this.itemContainer.x-speciePersonaggio.width/2)
        //terzo quadrante in basso a sinistra
        let heightThirdQuadrant = Math.abs(this.lineaDecorativaInferiore.y - this.lineaSimmetriaRettangolo1.y);
        let widthThirdQuadrant = Math.abs(0 + this.lineaSimmetriaRettangolo1.x);
        console.log("alt3 "+heightThirdQuadrant);
        console.log("lar3 "+widthThirdQuadrant);
        this.stats1 = this.add.image(0,0,TextureKeys.stats1).setScale(1);
        //this.stats1.setX(gameSettings.gameWidth - (gameSettings.gameWidth-this.itemContainer.x)-this.stats1.width/2 );
        this.stats1.setX(gameSettings.gameWidth - this.stats1.width/2-Math.round(gameSettings.gameWidth - (this.itemContainer.width/2*0.8) -this.itemContainer.x));
        console.log(Math.round(gameSettings.gameWidth - (this.itemContainer.width/2*0.8) -this.itemContainer.x))
        
        //(gameSettings.gameWidth-this.itemContainer.x-this.itemContainer.width)-gameSettings.gameWidth 


        this.stats1.setY(this.lineaDecorativaInferiore.x-heightThirdQuadrant/2);
        //quarto quadrante
        let heightFourthQuadrant = Math.abs(this.lineaDecorativaInferiore.y - this.lineaSimmetriaRettangolo1.y);
        let widthFourthQuadrant = Math.abs(0 + this.lineaSimmetriaRettangolo1.x);

        this.descriptionsCharacter1 = this.add.image(widthFourthQuadrant/2,0,TextureKeys.desc1);
        this.descriptionsCharacter1.setY((  this.lineaDecorativaInferiore.y - (this.lineaDecorativaInferiore.y - this.stats1.y-this.stats1.height/2))-this.descriptionsCharacter1.height/2)
        console.log(this.lineaDecorativaInferiore.y-this.stats1.y + this.stats1.height/2)

        this.text1 = this.add.text(0,0,"NOME PERSONAGGIO")
        
        //this.text1.setFont(FontKeys.Arcade);
        this.text1.setFont(FontKeys.Arcade);
        this.text1.setFontSize('48px');
        this.text1.setColor('#241198');
        this.text1.setBackgroundColor('#ffffff')
        this.text1.setX(widthFourthQuadrant/2-this.text1.width/2)
        this.text1.setY(this.lineaSimmetriaRettangolo1.y+this.lineaDecorativaSuperiore.y*0.2)

        //this.stats = this.add.image(gameSettings.gameWidth/2,gameSettings.gameHeight/2,TextureKeys.stats[0])
        //da vedere
        //this.descriptionsCharacter1.setX(widthFourthQuadrant-this.descriptionsCharacter1.width)
        // this.cameras.main.pan(
        //     (gameSettings.gameWidth+offset), //x
        //     gameSettings.gameHeight/2, //y
        //     2000, //duration
        //     "Sine.easeInOut", //ease function
        //     true, // force
        //     (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
        //         if (progress === 1) { console.log("pan completed"); }
        //     }, //callback
        //     this //callback context
        // );

        // this.lineaSimmetriaRettangolo3 = this.add.image(gameSettings.gameWidth,gameSettings.gameHeight/2,TextureKeys.lineaBianca);
        // this.lineaSimmetriaRettangolo3.setRotation(-Math.PI/2)
        // //this.lineaSimmetriaRettangolo3.setY(this.lineaDecorativaSuperiore.y+this.lineaSimmetriaRettangolo3.width/2)
        // this.lineaSimmetriaRettangolo3.setScale((this.lineaDecorativaInferiore.y-this.lineaDecorativaSuperiore.y) / this.lineaSimmetriaRettangolo3.width); 
        // this.lineaSimmetriaRettangolo3.setTint(0x399993)
        this.lineaSimmetriaRettangolo3 = this.add.image(gameSettings.gameWidth+offset,gameSettings.gameHeight/2, TextureKeys.lineaBianca);
        this.lineaSimmetriaRettangolo3.scaleX = ((gameSettings.gameWidth+offset) / this.lineaDecorativaSuperiore.width);//verticale
        this.lineaSimmetriaRettangolo3.setRotation(Math.PI / 2); 

        let heightFifthQuadrant = Math.abs(this.lineaDecorativaSuperiore.y - this.lineaSimmetriaRettangolo1.y);
        let widthFifthQuadrant= Math.abs(0 + this.lineaSimmetriaRettangolo1.x);
        console.log("alt5 "+heightFifthQuadrant);
        console.log("lar5 "+widthFifthQuadrant);
        this.descitem1 = this.add.image(0,0,TextureKeys.descitem1).setScale(1.5)
        this.descitem1.setX(this.lineaSimmetriaRettangolo3.x+widthFifthQuadrant/2)//this.descitem1.width/2)
        this.descitem1.setY(this.lineaDecorativaSuperiore.y+heightFifthQuadrant/2)//
        let heightSixthQuadrant = Math.abs(this.lineaDecorativaInferiore.y - this.lineaSimmetriaRettangolo1.y);
        let widthSixthQuadrant= Math.abs(0 + this.lineaSimmetriaRettangolo1.x);
        console.log("alt6 "+heightSixthQuadrant);
        console.log("lar6 "+widthSixthQuadrant);
        this.itemSelector = this.add.image(this.lineaSimmetriaRettangolo3.x+widthSixthQuadrant/2,this.lineaDecorativaInferiore.y-heightSixthQuadrant/2,TextureKeys.itemSelectContainer).setScale(2)
    
    
        this.input.keyboard.on('keydown-ENTER',()=>{
            this.cameras.main.pan(
                (gameSettings.gameWidth+offset), //x
                gameSettings.gameHeight/2, //y
                5000, //duration // --> 5000 come prova per vedere il layout bene --> 2000 come val
                "Sine.easeInOut", //ease function
                true, // force
                (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
                    if (progress === 1) { console.log("pan completed"); }
                }, //callback
                this //callback context
            );

            this.lineaDecorativaInferiore.setDepth(0)
            this.lineaDecorativaSuperiore.setDepth(0)
            this.lineaSimmetriaRettangolo1.setDepth(-1)
            this.lineaSimmetriaRettangolo2.setDepth(-1)
            this.lineaSimmetriaRettangolo3.setDepth(0)
        }
        )
    }

    update(time: number, delta: number): void {
        
    }
    
}