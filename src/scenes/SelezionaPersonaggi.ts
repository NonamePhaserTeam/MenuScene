import Phaser from "phaser";
import { gameSettings } from '../consts/GameSettings'
import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimationKeys";
import FontKeys from "../consts/FontKeys";
import path from "path";

export default class SelezionaPersonaggi extends Phaser.Scene
{
    Camera: Phaser.Cameras.Scene2D.Camera;
    cursors :Phaser.Types.Input.Keyboard.CursorKeys
    cursor : any

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
    characters:Phaser.GameObjects.Group;
    character:Phaser.GameObjects.Image;
    itemContainer:Phaser.GameObjects.Image;
    //descriptionsCharacters:Phaser.GameObjects.Group;
    descriptionsCharactersContainer:Phaser.GameObjects.Image;
    namesCharacters:Phaser.GameObjects.Group;
    stats1:Phaser.GameObjects.Image;
    stats:Phaser.GameObjects.Image;
    // charactersPhotoArray:Phaser.GameObjects.Image[];
    //charactersPhotoArray:Phaser.GameObjects.Image[];
    previewCharacterTMP:Phaser.GameObjects.Image;
    previewCharacter:Phaser.GameObjects.Image;
    nomeCharacter: Phaser.GameObjects.Text;
    nomeCharacters:Phaser.GameObjects.Text;
    descitem1:Phaser.GameObjects.Image;
    itemSelector:Phaser.GameObjects.Image;
    

    //
    charactersArraylun: any;
    iCharactersArray: number;
    iItemsArray: number;
    offset: any;
    heightbetween2lines: any;
    scrittaCombattenti: any;
    scrittaSelezionaItems: any;
    heightFirstQuadrant: any; 
    widthFirstQuadrant: any;
    frecciaSceltaPersonaggioSxHeight: any;
    frecciaSceltaPersonaggioDxHeight: any;
    heightSecondQuadrant: any ;
    widthSecondQuadrant: any;
    heightThirdQuadrant: any ;
    widthThirdQuadrant: any;
    scrittaEquipaggiamento: any;
    heightFourthQuadrant: any ;
    widthFourthQuadrant: any;
    mainTextDescContainer: any;
    subMainTextDescContainer: any;

    heightFifthQuadrant: any ;
    widthFifthQuadrant: any;
    heightSixthQuadrant: any;
    widthSixthQuadrant: any;
    isAnimatingkeydownLEFT: any ;
    isAnimatingkeydownRIGHT: any;
    itemSelectorWidth:any;
    isAnimatingkeydownRIGHTRoulette: any;
    
    arrayItemPos: number[] = [];
    items: Phaser.GameObjects.Group;
    offsetItem: number;
    itemslun:any;

    itemArray = [
        {id:0,name:"0",photo:TextureKeys.uno ,descrizioneItem:""},
        {id:1,name:"1",photo:TextureKeys.r1 ,descrizioneItem:""},
        {id:2,name:"2",photo:TextureKeys.dx1 ,descrizioneItem:""},
        {id:3,name:"3",photo:TextureKeys.sx1 ,descrizioneItem:""},
        {id:4,name:"4",photo:TextureKeys.due ,descrizioneItem:""},
        {id:5,name:"5",photo:TextureKeys.cavalloitem ,descrizioneItem:""}
    ];
    charactersArray = [
        { id: 0, name: 'AntoGnio La Montagna', photo:TextureKeys.MILITO,descrizionePersonaggio:" ",razza: 'MOLOSSO', preview:TextureKeys.MILITO,descrizioneItem:""},
        { id: 1, name: 'Pasquale O DIavl', photo:TextureKeys.hotdog,descrizionePersonaggio:" ",razza: 'palermitano', preview:TextureKeys.hotdog,descrizioneItem:""},
        { id: 2, name: 'FALCIANOG502', photo:TextureKeys.maionese,descrizionePersonaggio:" ",razza: 'Falcone4ever', preview:TextureKeys.maionese,},
    ];
    
    //
    constructor()
    {
        super('SelezionaPersonaggi')
    }

    init(){
        
    }

    create()
    {
        
        // Crea un array di "strutture"
        

        this.charactersArraylun = this.charactersArray.length;
        this.itemslun = (this.itemArray.length);//l'array parte da 0
        console.log(this.itemslun)
        this.iCharactersArray = 0;
        this.items = this.add.group()
        
        
        // const arrayChildrenItems = this.items.getChildren() as Phaser.GameObjects.Image[];
        // console.log(arrayChildrenItems.length);
        /*
        NOTE:
        la scena è divisa in 4 quadranti: 1 in alto a sx,2 in alto a dx,3 in basso a dx e 4 in basso a sx,
        //quadrante 5 a destra del quadrante 1
        in fase finale o rendere trasparente o cambiare lo z index delle linee di costruzione, non eliminarle perchè sono necessarie per i calcoli

        FINE NOTE*/
        //inserimento nell'array di tutti i preview
        // let previewCharacterArray = [];
        // previewCharacterArray.push(this.add.image(gameSettings.gameWidth/2, gameSettings.gameHeight/2, TextureKeys.stats[0]));





        console.log("Scena di selezione dei personaggo");

        //riattiva sfondo se non usi uno sfondo tile
        this.Sfondo = this.add.image(gameSettings.gameWidth/2, gameSettings.gameHeight/2, TextureKeys.MenuBackground3).setDepth(0);

        this.Sfondo.setDisplaySize(gameSettings.gameWidth, gameSettings.gameHeight);
        this.Sfondo.setTint(0x333333);


        console.log(gameSettings.gameHeight)
        this.offset = 50;
        this.lineaDecorativaInferiore = this.add.image(gameSettings.gameWidth/2,gameSettings.gameHeight-100, TextureKeys.lineaBianca);
        this.lineaDecorativaInferiore.scaleX = (gameSettings.gameWidth / this.lineaDecorativaInferiore.width)-this.offset;
        this.lineaDecorativaInferiore.setTint(0x942299);
        this.lineaDecorativaSuperiore = this.add.image(gameSettings.gameWidth/2,gameSettings.gameHeight-980, TextureKeys.lineaBianca);
        this.lineaDecorativaSuperiore.scaleX = (gameSettings.gameWidth / this.lineaDecorativaSuperiore.width)-this.offset;
        this.heightbetween2lines =  this.lineaDecorativaInferiore.y -  this.lineaDecorativaSuperiore.y;
        this.lineaSimmetriaRettangolo1 = this.add.image(gameSettings.gameWidth/2,gameSettings.gameHeight/2, TextureKeys.lineaBianca);
        this.lineaSimmetriaRettangolo1.scaleX = (gameSettings.gameWidth / this.lineaDecorativaSuperiore.width)-this.offset;// orizzontale
        this.lineaSimmetriaRettangolo2 = this.add.image(gameSettings.gameWidth/2,gameSettings.gameHeight/2, TextureKeys.lineaBianca);
        this.lineaSimmetriaRettangolo2.scaleX = (gameSettings.gameWidth / this.lineaDecorativaSuperiore.width)-this.offset;//verticale
        this.lineaSimmetriaRettangolo2.setRotation(Math.PI / 2); 

        this.frecciaSceltaPersonaggioSx =  this.add.image(gameSettings.gameWidth/2,0, TextureKeys.arrowScelta);
        console.log("this.lineaDecorativaSuperiore.y"+this.lineaDecorativaSuperiore.y)
        console.log("this.lineaSimmetriaRettangolo1.y"+this.lineaSimmetriaRettangolo1.y)
        //AL CENTRO PRIMA DELLO SPOSTAMENTO DELLA CAM
        this.scrittaCombattenti = this.add.text(0,0,"COMBATTENTI!").setColor('#dddd00').setFontSize('72px');
        this.scrittaCombattenti.setY(this.lineaDecorativaSuperiore.y/2-this.scrittaCombattenti.height/2)     
        this.scrittaCombattenti.setX(gameSettings.gameWidth/2-this.scrittaCombattenti.width/2)
        //AL CENTRO DOPO LO SPOSTAMENTO DELLA CAM
        this.scrittaSelezionaItems = this.add.text(0,0,"SELEZIONA IL TUO OGGETTO").setColor('#dddd00').setFontSize('72px').setAlpha(0.0);
        this.scrittaSelezionaItems.setY(this.lineaDecorativaSuperiore.y/2-this.scrittaSelezionaItems.height/2)     
        this.scrittaSelezionaItems.setX(gameSettings.gameWidth*1-this.scrittaSelezionaItems.width/2)
        

        //primo quadrante
        this.heightFirstQuadrant = Math.abs(this.lineaDecorativaSuperiore.y - this.lineaSimmetriaRettangolo1.y);
        this.widthFirstQuadrant = Math.abs(0 + this.lineaSimmetriaRettangolo1.x);
        console.log("alt1 "+this.heightFirstQuadrant)//in alto a destra
        console.log("lar1 "+this.widthFirstQuadrant)//in alto a destra
        this.frecciaSceltaPersonaggioSxHeight = this.frecciaSceltaPersonaggioSx.height;

        console.log((this.frecciaSceltaPersonaggioSxHeight / 2));
        this.frecciaSceltaPersonaggioSx.setX(this.widthFirstQuadrant*0.20);
        this.frecciaSceltaPersonaggioSx.setY(this.heightFirstQuadrant - (this.frecciaSceltaPersonaggioSxHeight / 2));
        console.log(this.frecciaSceltaPersonaggioSx.x)
        this.frecciaSceltaPersonaggioDx =  this.add.image(gameSettings.gameWidth/2,2000, TextureKeys.arrowScelta);
        this.frecciaSceltaPersonaggioDxHeight = this.frecciaSceltaPersonaggioDx.height;
        this.frecciaSceltaPersonaggioDx.setX(this.widthFirstQuadrant*0.80);//quella di destra dista 20% dal bordo destro
        this.frecciaSceltaPersonaggioDx.setY(this.heightFirstQuadrant - (this.frecciaSceltaPersonaggioDxHeight / 2));
        this.frecciaSceltaPersonaggioDx.setRotation(Math.PI);
         
        this.frecciaSceltaPersonaggioSx.setInteractive();
        this.frecciaSceltaPersonaggioDx.setInteractive();
        
        this.chain = this.add.image(gameSettings.gameWidth/2,gameSettings.gameHeight-100, TextureKeys.chain)
        .setScale(0.5);
        this.chain.setX(this.widthFirstQuadrant/2)
        this.chain.setY(this.heightFirstQuadrant - this.chain.height/2)
        console.log("this.chain.y"+this.chain.y)

        this.chain.setDepth(10);

        //this.character1 = this.add.image(0,0,TextureKeys.pg1).setScale(0.6).setDepth(1);
        
        
        //secondo quadrante in basso a destra
        this.heightSecondQuadrant = Math.abs(this.lineaSimmetriaRettangolo1.y - this.lineaDecorativaSuperiore.y);
        this.widthSecondQuadrant = Math.abs(this.lineaSimmetriaRettangolo1.x - gameSettings.gameWidth)
        console.log("alt2 "+this.heightSecondQuadrant);
        console.log("lar2 "+this.widthSecondQuadrant);
        this.Specchio = this.add.image((gameSettings.gameWidth- this.widthSecondQuadrant/2),0,TextureKeys.specchio);
        this.Specchio.setX(Math.abs(gameSettings.gameWidth- (this.widthSecondQuadrant-this.Specchio.width*1)));
        console.log("this.Specchio.x nel quadrante 1 "+(gameSettings.gameWidth-this.Specchio.x));
        this.Specchio.setY(Math.abs(this.heightSecondQuadrant- this.Specchio.height/3))
        //perchè più si va a destra più sale la x,tutti i quadranti hanno la stessa misura
        //ma per mettere qualcosa nei quadranti c'è bisogno di vedere se partire da 0 
        //come quadrante 3 e 4 oppure sottrarre alla width totale come per 1 e 2 
        this.itemContainer = this.add.image(0,0,TextureKeys.itemContainer).setScale(0.8);
        this.itemContainer.setX(Math.abs(this.Specchio.x + (this.Specchio.width * 1.5)))
        this.itemContainer.setY(Math.abs(this.lineaSimmetriaRettangolo2.y-this.Specchio.y+this.Specchio.height/2));//this.Specchio.height-this.itemContainer.height
    
        this.scrittaEquipaggiamento = this.add.text(this.itemContainer.x,this.itemContainer.y-this.itemContainer.height/2-50,"OGGETTO")
        this.scrittaEquipaggiamento.setFontSize('48px');
        this.scrittaEquipaggiamento.setColor('#dddd00');
        this.scrittaEquipaggiamento.setBackgroundColor('#000000')
        this.scrittaEquipaggiamento.setX(this.itemContainer.x-this.scrittaEquipaggiamento.width/2)
        
        // let speciePersonaggio = this.add.text(this.itemContainer.x,this.itemContainer.y-this.itemContainer.height,charactersArray[0].razza)
        // speciePersonaggio.setFontSize('48px');
        // speciePersonaggio.setColor('#dddd00');
        // speciePersonaggio.setBackgroundColor('#000000')
        // speciePersonaggio.setX(this.itemContainer.x-speciePersonaggio.width/2)
        
        
        
        
        
        
        //terzo quadrante in basso a sinistra
        this.heightThirdQuadrant = Math.abs(this.lineaDecorativaInferiore.y - this.lineaSimmetriaRettangolo1.y);
        this.widthThirdQuadrant = Math.abs(0 + this.lineaSimmetriaRettangolo1.x);
        console.log("alt3 "+this.heightThirdQuadrant);
        console.log("lar3 "+this.widthThirdQuadrant);
        this.stats1 = this.add.image(0,0,TextureKeys.stats1).setScale(1);
        //this.stats1.setX(gameSettings.gameWidth - (gameSettings.gameWidth-this.itemContainer.x)-this.stats1.width/2 );
        this.stats1.setX(gameSettings.gameWidth - this.stats1.width/2-Math.round(gameSettings.gameWidth - (this.itemContainer.width/2*0.8) -this.itemContainer.x));
        console.log(Math.round(gameSettings.gameWidth - (this.itemContainer.width/2*0.8) -this.itemContainer.x))
        
        //(gameSettings.gameWidth-this.itemContainer.x-this.itemContainer.width)-gameSettings.gameWidth 


        this.stats1.setY(this.lineaDecorativaInferiore.x-this.heightThirdQuadrant/2);
        
        
        
        
        
        
        
        
        
        
        
        //quarto quadrante
        this.heightFourthQuadrant = Math.abs(this.lineaDecorativaInferiore.y - this.lineaSimmetriaRettangolo1.y);
        this.widthFourthQuadrant = Math.abs(0 + this.lineaSimmetriaRettangolo1.x);

        this.descriptionsCharactersContainer = this.add.image(this.widthFourthQuadrant/2,0,TextureKeys.descContainer);
        this.descriptionsCharactersContainer.setY((  this.lineaDecorativaInferiore.y - (this.lineaDecorativaInferiore.y - this.stats1.y-this.stats1.height/2))-this.descriptionsCharactersContainer.height/2)
        console.log(this.lineaDecorativaInferiore.y-this.stats1.y + this.stats1.height/2)

        this.nomeCharacter = this.add.text(0,0,this.charactersArray[0].name)
        
        //this.text1.setFont(FontKeys.Arcade);
        this.nomeCharacter.setFont('FontKeys.Arcade');
        this.nomeCharacter.setFontSize('48px');

        this.nomeCharacter.setColor('#dddddd');
        //this.nomeCharacter.setBackgroundColor('#ffffff')
        this.nomeCharacter.setX(this.widthFourthQuadrant/2-this.nomeCharacter.width/2)
        this.nomeCharacter.setY(this.lineaSimmetriaRettangolo1.y+this.lineaDecorativaSuperiore.y*0.2)

        this.mainTextDescContainer = this.add.text(0,0,"SCRITTA PRINCIPALE");
        this.mainTextDescContainer.setColor('yellow');
        this.mainTextDescContainer.setFontSize('24px')
        this.mainTextDescContainer.setX(this.descriptionsCharactersContainer.x-(this.mainTextDescContainer.width/2))
        this.mainTextDescContainer.setY(this.descriptionsCharactersContainer.y-this.mainTextDescContainer.height/2-40)
        this.mainTextDescContainer.setText("NUOVO TESTO PER LA SCRITTA PRINCIPALE").setX(this.descriptionsCharactersContainer.x-(this.mainTextDescContainer.width/2));
        this.subMainTextDescContainer = this.add.text(0,0,"SCRITTA SECONDARIA");
        this.subMainTextDescContainer.setX(this.descriptionsCharactersContainer.x-(this.subMainTextDescContainer.width/2))
        this.subMainTextDescContainer.setY(this.descriptionsCharactersContainer.y-this.subMainTextDescContainer.height/2)
        this.subMainTextDescContainer.setFontSize('18px')


     
        this.lineaSimmetriaRettangolo3 = this.add.image(gameSettings.gameWidth+this.offset,gameSettings.gameHeight/2, TextureKeys.lineaBianca);
        this.lineaSimmetriaRettangolo3.scaleX = ((gameSettings.gameWidth+this.offset) / this.lineaDecorativaSuperiore.width);//verticale
        this.lineaSimmetriaRettangolo3.setRotation(Math.PI / 2); 

        this.heightFifthQuadrant = Math.abs(this.lineaDecorativaSuperiore.y - this.lineaSimmetriaRettangolo1.y);
        this.widthFifthQuadrant= Math.abs(0 + this.lineaSimmetriaRettangolo1.x);
        console.log("alt5 "+this.heightFifthQuadrant);
        console.log("lar5 "+this.widthFifthQuadrant);
        this.descitem1 = this.add.image(0,0,TextureKeys.descitem1).setScale(1.5)
        this.descitem1.setX(this.lineaSimmetriaRettangolo3.x+this.widthFifthQuadrant/2)//this.descitem1.width/2)
        this.descitem1.setY(this.lineaDecorativaSuperiore.y+this.heightFifthQuadrant/2)//
        this.heightSixthQuadrant = Math.abs(this.lineaDecorativaInferiore.y - this.lineaSimmetriaRettangolo1.y);
        this.widthSixthQuadrant= Math.abs(0 + this.lineaSimmetriaRettangolo1.x);
        console.log("alt6 "+this.heightSixthQuadrant);
        console.log("lar6 "+this.widthSixthQuadrant);
        this.itemSelector = this.add.image(this.lineaSimmetriaRettangolo3.x+this.widthSixthQuadrant/2,this.lineaDecorativaInferiore.y-this.heightSixthQuadrant/2,TextureKeys.itemSelectContainer).setScale(2)
    


        this.character = this.add.image(0,0,this.charactersArray[this.iCharactersArray].photo).setScale(1).setDepth(1);
        this.character.setX(this.chain.x)
        this.character.setY(this.chain.y)
        this.character.setInteractive();

        this.previewCharacter = this.add.image(0,0,this.charactersArray[this.iCharactersArray].preview).setScale(0.4)//.setDepth(1);
        this.previewCharacter.setX(this.Specchio.x)
        this.previewCharacter.setY(this.Specchio.y)
        // this.previewCharacter.setX((this.Specchio.x - this.Specchio.width / 2) + this.previewCharacter.width / 2)
        // this.previewCharacter.setY((this.Specchio.y - this.Specchio.width/ 2) + this.previewCharacter.height / 2);




        this.input.keyboard.on('keydown-ENTER',()=>{
            this.flash()
            this.cameras.main.pan(
                (gameSettings.gameWidth),//(gameSettings.gameWidth+offset),// (gameSettings.gameWidth+offset), //x
                gameSettings.gameHeight/2, //y
                0, //duration // --> 5000 come prova per vedere il layout bene --> 2000 come val
                "Sine.easeInOut", //ease function
                true, // force
                (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
                    
                    this.tweens.add({
                        targets: this.scrittaCombattenti,
                        alpha: 0, // Opacità desiderata (0 = completamente trasparente)
                        duration: 100, // Durata dell'animazione in millisecondi
                        ease: 'Linear', // Tipo di easing (puoi scegliere diversi tipi di easing se preferisci)
                        onComplete: () => {
                            // Callback da eseguire quando l'animazione è completata
                            this.scrittaCombattenti.destroy(); // Puoi distruggere l'oggetto se non è più necessario
                            
                        }
                    });
                    
                    if (progress === 1) { 
                        console.log("pan completed"); 
                        this.scrittaCombattenti.setAlpha(0.0)
                    

                        this.tweens.add({
                            targets: this.scrittaSelezionaItems,
                            alpha: 1, // Opacità desiderata (1 = completamente visibile)
                            duration: 100, // Durata dell'animazione in millisecondi
                            ease: 'Linear', // Tipo di easing (puoi scegliere diversi tipi di easing se preferisci)
                            onComplete: () => {
                                this.input.keyboard.off('keydown-ENTER');
                                this.input.keyboard.off('keydown-LEFT');
                                this.input.keyboard.off('keydown-RIGHT');
                                //lavora su item selector per la roulette degli items
                                this.itemSelectorWidth = this.itemSelector.width*2;//perchè su itemselector c'è setscale(2)
                                console.log(this.itemSelector.height)
                                for (let contArray = 0,cont = 0; (cont < 10) ; cont++) {
                                    if(cont % 2 == 1){
                                        let val = Math.round((this.itemSelectorWidth/10)*cont);
                                        
                                        this.itemSelector.setDepth(0)
                                        const item = this.add.image(0,0,this.itemArray[contArray].photo).setDepth(9999);
                                        item.height=this.itemSelector.height;
                                        // this.items.add(item);

                                        //item.width = this.itemSelectorWidth/2;
                                        //console.log(item.height)
                                        // console.log(this.itemSelector.height)
                                        // OK SONO UGUALI
                                        if(cont != 5){
                                            item.setY(this.itemSelector.y )
                                            item.setX(this.itemSelector.x-this.itemSelector.width+val-item.width/2)//this.itemSelector.x-this.itemSelector.width è l'inizio di itemselector
                                        }else{
                                            item.setY(this.itemSelector.y )
                                            item.setX(this.itemSelector.x)

                                        }
                                        this.arrayItemPos.push(item.x);
                                        
                                        this.items.add(item);
                                        
                                                      
                                        //console.log(val)   
                                        contArray++;
                                        
                                    }
                                    this.offsetItem = Math.round((this.itemSelectorWidth/10)*2);
                                }
                                
                                    
                                for(let cont=4;cont < (this.itemslun-1);cont++){
                                    const item = this.add.image(0,-gameSettings.gameHeight*2,this.itemArray[cont].photo).setDepth(999);//spawn fittizio
                                    this.items.add(item);
                                }
                                this.inputKeyboardRightPostEnter()
                            }
                        });
                        
                        
                        
                        //this.arrayItemPos ha 5 val --> 1|2|3|4|5|

                        
                        


                    }
                },
                this //callback context
            );

            // this.lineaDecorativaInferiore.setDepth(0)
            // this.lineaDecorativaSuperiore.setDepth(0)
            // this.lineaSimmetriaRettangolo1.setDepth(-1)
            // this.lineaSimmetriaRettangolo2.setDepth(-1)
            // this.lineaSimmetriaRettangolo3.setDepth(0)
        }
        )


        //decommenta all'ultimo
        this.lineaDecorativaInferiore.setAlpha(0.0);
        this.lineaDecorativaSuperiore.setAlpha(0.0);
        this.lineaSimmetriaRettangolo1.setAlpha(0.0);
        this.lineaSimmetriaRettangolo2.setAlpha(0.0);
        this.lineaSimmetriaRettangolo3.setAlpha(0.0);
        this.chain.setAlpha(0.0);

        // Crea un rettangolo a schermo intero
        



        this.frecciaSceltaPersonaggioSx.on('pointerdown',  () => {
            console.log("sx")
            
        }, this);
        this.frecciaSceltaPersonaggioDx.on('pointerdown',  () => {
            console.log("dx")
        }, this);
        this.isAnimatingkeydownLEFT = false;
        this.isAnimatingkeydownRIGHT = false;

  

      
        this.inputKeyboardRightAfterEnter()


        this.inputKeyboardLeftAfterEnter()
        
        
                
    
                       
                   
       
      
        
       
       
        //this.scene.stop(SceneKeys.SelezionaPersonaggi);
        //this.scene.start(SceneKeys.SelectItem);
    }


    update(time: number, delta: number): void {

         
    }

    inputKeyboardEnterAfterEnter(){

    }

    inputKeyboardRightAfterEnter(){
        this.input.keyboard.on('keydown-RIGHT',()=>{
            console.log("dx")
            if (this.isAnimatingkeydownRIGHT ) {
                return; // Esci dalla funzione se un'animazione è già in corso
            }     
            this.isAnimatingkeydownRIGHT = true;
            
            //disabilita il movimento di sinistra 
            // Interpolazione verso la nuova posizione
            this.tweens.add({
                targets: this.character,
                x: this.frecciaSceltaPersonaggioDx.x-this.frecciaSceltaPersonaggioDx.width/2,
                duration: 500,//millis
                scaleX: 0.5, // Scala X dell'immagine
                scaleY: 0.5, // Scala Y dell'immagine
                ease: 'Linear', // Puoi scegliere diversi tipi di easing se preferisci
                onComplete: () => {
                    //SCORRIMENTO PERSONAGGI
                    console.log(this.iCharactersArray)
                    if(this.iCharactersArray==(this.charactersArraylun)) this.iCharactersArray=0

                    if(this.iCharactersArray == 0){
                        this.iCharactersArray = Number(this.iCharactersArray+1)
                        console.log(this.iCharactersArray+'/'+(this.charactersArraylun-1))
                        this.character.setTexture(this.charactersArray[this.iCharactersArray].photo);
                        this.previewCharacter.setTexture(this.charactersArray[this.iCharactersArray].preview);
                    }else if(this.iCharactersArray < this.charactersArraylun && this.iCharactersArray != 0){
                        this.iCharactersArray = Number(this.iCharactersArray+1)

                        if(this.iCharactersArray==(this.charactersArraylun)) this.iCharactersArray=0

                        this.character.setTexture(this.charactersArray[Number(this.iCharactersArray)].photo);
                        this.previewCharacter.setTexture(this.charactersArray[Number(this.iCharactersArray)].preview);
                        console.log(this.iCharactersArray +'/'+(this.charactersArraylun-1))
                        // speciePersonaggio.setText(charactersArray[Number(i)].razza);
                        // speciePersonaggio.setX(speciePersonaggio.x)
                        
                    }else{
                        this.iCharactersArray = 0;
                         console.log(this.iCharactersArray +'/'+(this.charactersArraylun-1))  
                         this.character.setTexture(this.charactersArray[this.iCharactersArray].photo);
                         this.previewCharacter.setTexture(this.charactersArray[this.iCharactersArray].preview);
                         this.iCharactersArray = Number(this.iCharactersArray+1) 
                    }
                    
                    this.character.setAlpha(0.0)
                    this.character.setX(this.frecciaSceltaPersonaggioSx.x)
                    this.character.setAlpha(1)
                    this.tweens.add({
                        targets: this.character,
                        x: this.chain.x,
                        duration: 500,//millis
                        scaleX: 1, // Scala X dell'immagine
                        scaleY: 1, // Scala Y dell'immagine
                        ease: 'Linear', // Puoi scegliere diversi tipi di easing se preferisci
                        onComplete: () => {
                            this.character.setScale(1)
                            this.isAnimatingkeydownRIGHT = false;
                            if(this.iCharactersArray == 0) this.nomeCharacter.setText(this.charactersArray[0].name)
                                else this.nomeCharacter.setText(this.charactersArray[this.iCharactersArray].name)
                            console.log('charactersArray'+this.iCharactersArray)
                            this.nomeCharacter.setX(this.widthFourthQuadrant/2-this.nomeCharacter.width/2)
                            this.nomeCharacter.setY(this.lineaSimmetriaRettangolo1.y+this.lineaDecorativaSuperiore.y*0.2)
                            setTimeout(() => {}, 1000);

                            //aggiungi il movimento di sinistra che hai precedentemente disabilitato
                        }
                    });
                }
            });
        })
    }


    inputKeyboardLeftAfterEnter(){
        this.input.keyboard.on('keydown-LEFT', () => {
            console.log("sx");
            this.input.keyboard.off('keydown-RIGHT');
            if (this.isAnimatingkeydownLEFT) {
                return; // Esci dalla funzione se un'animazione è già in corso
            }
            this.isAnimatingkeydownLEFT = true;
            //disabilita il movimento di destra
        
            // Interpolazione verso la nuova posizione
            this.tweens.add({
                targets: this.character,
                x: this.frecciaSceltaPersonaggioSx.x + this.frecciaSceltaPersonaggioSx.width / 2, // Utilizza il bordo destro di frecciaSceltaPersonaggioSx
                duration: 500,
                scaleX: 0.5,
                scaleY: 0.5,
                ease: 'Linear',
                onComplete: () => {
                    //SCORRIMENTO PERSONAGGI
                    console.log(this.charactersArraylun)
                    if (this.iCharactersArray == this.charactersArraylun) this.iCharactersArray = 0
        
                    if (this.iCharactersArray == 0) {
                        console.log('SEè0sx' + this.iCharactersArray + '/' + (this.charactersArraylun - 1))
                        this.iCharactersArray = (this.charactersArraylun - 1);
                        this.character.setTexture(this.charactersArray[this.iCharactersArray].photo);
                        this.previewCharacter.setTexture(this.charactersArray[this.iCharactersArray].preview);
                    } else if (this.iCharactersArray < this.charactersArraylun && this.iCharactersArray != 0) {
                        console.log('SEèminDimaxlunsx' + this.iCharactersArray + '/' + (this.charactersArraylun - 1))
                        this.iCharactersArray = Number(this.iCharactersArray - 1)
                        this.character.setTexture(this.charactersArray[Number(this.iCharactersArray)].photo);
                        this.previewCharacter.setTexture(this.charactersArray[Number(this.iCharactersArray)].preview);
                    }
                    this.character.setAlpha(0.0);
                    this.character.setX(this.frecciaSceltaPersonaggioDx.x);
                    this.character.setAlpha(1);
                    this.tweens.add({
                        targets: this.character,
                        x: this.chain.x,
                        duration: 500,
                        scaleX: 1,
                        scaleY: 1,
                        ease: 'Linear',
                        onComplete: () => {
                            this.character.setScale(1);
                            this.isAnimatingkeydownLEFT = false;
                            console.log('SXNomeAll\'indice:' + this.iCharactersArray)
                            this.nomeCharacter.setText(this.charactersArray[this.iCharactersArray].name);
                            this.nomeCharacter.setX(this.widthFourthQuadrant / 2 - this.nomeCharacter.width / 2);
                            this.nomeCharacter.setY(this.lineaSimmetriaRettangolo1.y + this.lineaDecorativaSuperiore.y * 0.2);
                            //aggiungi il movimento di destra che hai precedentemente disabilitato
                            this.inputKeyboardRightAfterEnter()
                    }
                    })
                }
            })
        });
    }

    flash(){
        const rect = this.add.graphics();
        rect.fillStyle(0xffffff, 1); // Imposta il colore e l'opacità del rettangolo (bianco, opaco)
        rect.fillRect(0,0, gameSettings.gameWidth*2, gameSettings.gameHeight); // Disegna un rettangolo a schermo intero
        rect.setDepth(9999); // Assicura che il rettangolo sia sopra a tutti gli altri elementi

        // Crea un tween per far lampeggiare il rettangolo
        this.tweens.add({
            targets: this.Sfondo,
            x: gameSettings.gameWidth,
            duration: 0, // Durata del flash (in millisecondi)
            ease: 'Linear',
             // Ripeti l'effetto due volte (una volta per ogni direzione dello yoyo)
            onComplete: () => {

            }
        })

        const flashTween = this.tweens.add({
            targets: rect,
            alpha: { from: 1, to: 0.7 }, // Aumenta l'opacità da 1 a 0 per farlo scomparire
            duration: 50, // Durata del flash (in millisecondi)
            ease: 'Linear',
            yoyo: true, // Ripeti l'effetto andando da 1 ad 0 e poi da 0 a 1
            repeat: 1
            , // Ripeti l'effetto due volte (una volta per ogni direzione dello yoyo)
            onComplete: () => {
                
                rect.destroy();
            }
        });

        // Avvia il tween
        flashTween.play();
    }

    inputKeyboardRightPostEnter(){
        
            this.input.keyboard.on('keydown-RIGHT',()=>{
                console.log("dx")
                if (this.isAnimatingkeydownRIGHT ) {
                    return; // Esci dalla funzione se un'animazione è già in corso
                }     
                this.isAnimatingkeydownRIGHT = true;
                //disabilita il movimento di sinistra 
                // Interpolazione verso la nuova posizione
                for(let ct = 5;ct<this.itemslun;ct++){
                    let item = this.add.image(this.arrayItemPos[0],this.itemSelector.y,this.itemArray[ct].photo).setDepth(9999).setAlpha(0);
                    this.items.add(item)       
                    item.destroy()
                }//immetto nel group "items" tutti gli object "item"

                // const numChildrenItems = arrayChildrenItems.length;
                // console.log("numChildrenItems"+numChildrenItems)
                const barrieraDaNonOltrepassare = this.itemSelector.x + this.itemSelector.width;//width è già la metà perchè itemselector è in scale(2)
                // console.log(barrieraDaNonOltrepassare)
                let arrayChildrenItems = this.items.getChildren() as Phaser.GameObjects.Image[];
                let numChildrenItems = arrayChildrenItems.length;
                
                if(numChildrenItems == 5){
                    // for(let cont = 0; cont < numChildrenItems; cont++) {
                    //     const itemTMP = arrayChildrenItems[cont];
                    //     let alphaVal;
                    //     if((itemTMP.x+this.offsetItem) >= (barrieraDaNonOltrepassare-itemTMP.width)){alphaVal = Number(0.0)}
                    //     else {alphaVal=Number(1)}
                    //     //SOLO SE FOSSERO 5 elementi
                    //     this.tweens.add({ 
                    //         targets: itemTMP,
                    //         x: (this.offsetItem + itemTMP.x),
                    //         alpha: alphaVal, // Imposta l'alpha value tramite l'oggetto di configurazione
                    //         duration: 100,
                    //         ease: 'Cubic',
                    //         onComplete: () => {
                    //             this.isAnimatingkeydownRIGHT = false;
                    //             console.log("finito");
                    //             if (itemTMP.x >= (barrieraDaNonOltrepassare - itemTMP.width)) {
                                    
                    //                 itemTMP.setX(this.arrayItemPos[0]);
                    //                 if(itemTMP.x = this.arrayItemPos[0]){
                    //                     itemTMP.setAlpha(1);    
                    //                 }
                                    
                    //             }
                    //         }
                    //     });
                    // }
                    
                    for (let cont = 0; cont < numChildrenItems; cont++) {
                        this.isAnimatingkeydownRIGHTRoulette = true;
                        const itemTMP = arrayChildrenItems[cont];
                        let alphaVal;
                        if ((itemTMP.x+this.offsetItem) >= (barrieraDaNonOltrepassare - itemTMP.width)) {
                            alphaVal = 0.0;
                            itemTMP.setAlpha(alphaVal)
                        } else {
                            alphaVal = 1;
                        }
                        if(this.isAnimatingkeydownRIGHTRoulette){
                            this.isAnimatingkeydownRIGHTRoulette=false;
                            this.tweens.add({ 
                                targets: itemTMP,
                                x: (this.offsetItem + itemTMP.x),
                                alpha: alphaVal, // Imposta l'alpha value tramite l'oggetto di configurazione
                                duration: 100,
                                ease: 'Linear',
                                onComplete: () => {
                                    this.isAnimatingkeydownRIGHT = false;
                                    console.log("finito");
                                    if (itemTMP.x >= (barrieraDaNonOltrepassare - itemTMP.width)) {
                                        itemTMP.setAlpha(0.0);
                                        itemTMP.setX(this.arrayItemPos[0]);
                                        itemTMP.setAlpha(1);
                                    }
                                }
                            });
                        }
                        this.isAnimatingkeydownRIGHTRoulette=true;
                        
                    }
                    
                }else{
                    numChildrenItems = arrayChildrenItems.length;
                    for (let cont = 0; cont < numChildrenItems; cont++) {
                        this.isAnimatingkeydownRIGHTRoulette = true;
                        let itemTMP = arrayChildrenItems[cont];
                        let alphaVal;
                        if ((itemTMP.x+this.offsetItem) >= (barrieraDaNonOltrepassare - itemTMP.width)) {
                            alphaVal = 0.0;
                            itemTMP.setAlpha(alphaVal)
                        } else {
                            alphaVal = 1;
                        }
                        if(this.isAnimatingkeydownRIGHTRoulette){
                            this.isAnimatingkeydownRIGHTRoulette=false;
                            this.tweens.add({ 
                                targets: itemTMP,
                                x: (this.offsetItem + itemTMP.x),
                                alpha: alphaVal, // Imposta l'alpha value tramite l'oggetto di configurazione
                                duration: 100,
                                ease: 'Linear',
                                onComplete: () => {
                                    this.isAnimatingkeydownRIGHT = false;
                                    console.log("Si è spostato item " + cont);
                                    arrayChildrenItems = this.items.getChildren() as Phaser.GameObjects.Image[];
                                    numChildrenItems = arrayChildrenItems.length;
                                    console.log((cont)+"/"+(numChildrenItems-1));
                                    if (itemTMP.x >= (barrieraDaNonOltrepassare - itemTMP.width)) {
                                        itemTMP.setAlpha(0.0);
                                        itemTMP.setX(this.arrayItemPos[0]);
                                        let tmpCont = cont+1;
                                        console.log((tmpCont));
                                        console.log((numChildrenItems));
                                        if((tmpCont) == numChildrenItems){
                                            console.log("sto nell'if")
                                            tmpCont = 0
                                        }// }else tmpCont++
                                        console.log("NON sto nell'if")
                                        itemTMP.setTexture(this.itemArray[tmpCont].photo).setDepth(9999);
                                        // itemTMP.setY(this.itemSelector.y)
                                        // itemTMP.setX(this.arrayItemPos[0]);
                                
                                        
                                        
                                        // if(cont < (this.itemslun)){
                                        //     console.log("if1")
                                            // if((cont+1) >= numChildrenItems-1){
                                                //vedi il valore dell'item corrente
                                                //se è l'ultimo vai al primo
                                                //se così non fosse vai a quello dopo
                                                
                                            // }    
                                        // }
                                        
                                        // itemTMP = arrayChildrenItems[cont+1];
                                        itemTMP.setAlpha(1);

                                    }

                                        
                                }
                            });
                        }
                        this.isAnimatingkeydownRIGHTRoulette=true;
                        
                    }
                    // console.log(numChildrenItems)+
                    // this.iItemsArray = numChildrenItems-1// VALE COME 5 perchè GLI ARRAY CONTANO DA 0
                    // for(let cont = 0; cont < numChildrenItems; cont++) {
                       
                    //     let itemTMP = arrayChildrenItems[cont];
                    //     let alphaVal;
                    //     if((itemTMP.x + this.offsetItem) >= (barrieraDaNonOltrepassare-itemTMP.width)){alphaVal = Number(0.0)}
                    //     else {alphaVal=Number(1)}
                    //     //SOLO SE FOSSERO 5 elementi
                    //     this.tweens.add({ 
                    //         targets: itemTMP,
                    //         x: (this.offsetItem + itemTMP.x),
                    //         alpha: alphaVal, // Imposta l'alpha value tramite l'oggetto di configurazione
                    //         duration: 100,
                    //         ease: 'Cubic',
                    //         onComplete: () => {
                    //             this.isAnimatingkeydownRIGHT = false;
                    //             console.log("finito");
                    //             if (itemTMP.x >= (barrieraDaNonOltrepassare - itemTMP.width)) {
                    //                 this.iItemsArray++;
                    //                 console.log(this.iItemsArray)
                    //                 if(this.iItemsArray > numChildrenItems){ this.iItemsArray=0;}
                    //                 itemTMP.setX(this.arrayItemPos[0]);
                    //                 console.log(cont+" "+itemTMP.x);
                    //                 if(itemTMP.x = this.arrayItemPos[0]){
                    //                     itemTMP.setAlpha(1);   
                    //                     //itemTMP = arrayChildrenItems[this.iItemsArray]; 
                    //                 }
                                    
                    //             }
                    //         }
                    //     });
                    // }
                }
                
            })
    }
                
                
                    
                       
    
        
    

    inputKeyboardLeftPostEnter(){

    }

    inputKeyboardEnterPostEnter(){
        this.inputKeyboardLeftPostEnter()
        this.inputKeyboardRightPostEnter()
    }



}


