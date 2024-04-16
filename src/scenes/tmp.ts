import Phaser, { Physics } from "phaser";
import { gameSettings } from '../consts/GameSettings'
import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimationKeys";
import FontKeys from "../consts/FontKeys";
import path from "path";
import main from "../main";

export default class tmp extends Phaser.Scene {

  private timebar: Phaser.GameObjects.Graphics;
  private timebarWidth: number;
  private timer: Phaser.Time.TimerEvent;
  private totalSeconds: number = 116.67;
  private lastSecond: number = 117.67;  
  private secondsInterval: number = 1.028;
  private actTime = 120;
  private seconds: Phaser.GameObjects.BitmapText;
  private timebarHolder: Phaser.GameObjects.Graphics;
  private colliderNavicella: boolean = false;

  private _dialogText: Phaser.GameObjects.Text;
  private _firstQuestion: Phaser.GameObjects.Text;
  private _secondQuestion: Phaser.GameObjects.Text;
  private _thirdQuestion: Phaser.GameObjects.Text;
  private _dialogLayer: Phaser.GameObjects.Image;
  private _dialogContainer: Phaser.GameObjects.Container;
  private _numberDialog: number = 4;
  private _dialogCurrentIndex: number = 2;
  private _dialogInProgress: boolean = false;

  private areaInteractivTeschio: Phaser.Physics.Arcade.Sprite;
  private teschio: Phaser.GameObjects.Sprite;
  private interazione: boolean;


  private collisione: Phaser.GameObjects.Sprite;
  private spazio: Phaser.Input.Keyboard.Key;

  finalDate: ["1", "9", "3", "2"];
  anyQuestion: boolean = true;

  dialog = [
		
    { question: "Quanto dura una rotazione terrestre sul proprio asse?",
      answ1: "23h 58m", answ2: "24h", answ3: "23h 56m", rightAnswer: 3 },

    { question: "Quale fu il primo popolo ad utilizzare l'ora?", 
      answ1: "Aztechi", answ2: "Babilonesi", answ3: "Maya", rightAnswer: 2 },

    { question: "Come si chiama l'orologio tradizione del sud della Germania?",
      answ1: "Cucu' nero", answ2: "Cucu' bianco", answ3: "Cucu' giallo", rightAnswer: 1 },

    { question: "In quale strato atmosferico si verifica la maggior parte del tema atmosferico?", 
      answ1: "Troposfera", answ2: "Litosfera", answ3: "Termosfera", rightAnswer: 1 }
    ];


    constructor()
    {
        super('tmp')
    }

    init(){
        
    }

  create(){
    console.log("tmp")
    this.cameras.main.setBackgroundColor('#241198').setAlpha(0.8);
    this.rettangoli()
    // this.createDialog()
    
    // this.openDialog()
    //this.closeDialog()
  }

  update(time: number, delta: number): void {

         
  }
  createDialog() {

	this._dialogContainer = this.add.container().setDepth(111);
	
    //aggiungo un layer di sfondo opaco 
    //layer-dialog è una texture creata in boot.ts
    this._dialogLayer = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2 + 150 , "layer");
	this._dialogLayer.setOrigin(.5).setScale(.5, .2);
    //aggiungo un il testo
	
	this._dialogText = this.add.text(this.game.canvas.width / 2 + 300	, this.game.canvas.height / 2, "").setTint(0xffffff).setOrigin(0.5).setFontFamily("Roboto").setFontSize(14).setWordWrapWidth(600);
    
	this._firstQuestion = this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2 + 130, "").setTint(0xffffff).setOrigin(0.5).setFontFamily("Roboto").setFontSize(14).setWordWrapWidth(600).setInteractive().on("pointerdown", (index: number) => { this.showPhrase(1) });
	
	this._secondQuestion = this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2 + 160, "").setTint(0xffffff).setOrigin(0.5).setFontFamily("Roboto").setFontSize(14).setWordWrapWidth(600).setInteractive().on("pointerdown", (index: number) => { this.showPhrase(2) });
	
	this._thirdQuestion = this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2 + 190, "").setTint(0xffffff).setOrigin(0.5).setFontFamily("Roboto").setFontSize(14).setWordWrapWidth(600).setInteractive().on("pointerdown", (index: number) => { this.showPhrase(3) });
    
	//aggiungo tutti gli elementi al container
	this._dialogContainer.add([this._dialogLayer, this._firstQuestion, this._secondQuestion, this._thirdQuestion, this._dialogText]);
    
	//setto il container invisibile
    this._dialogContainer.setAlpha(0);
    console.log("Ho finito create dialog")

  }
    openDialog() {
        console.log("openDialog");
        this._dialogCurrentIndex = Math.floor(Math.random() * this._numberDialog);
        
        // Se c'è già un dialogo in corso, esce dal metodo
        if (this._dialogInProgress) return;
        
        // Setto il dialogo in corso
        this._dialogInProgress = true;
        console.log(this.dialog.length);
        
        // Recupero l'oggetto corrente per settare il testo e l'immagine iniziale
        let _textObj = this.dialog[this._dialogCurrentIndex];

        // Setto il testo con il testo corretto
        this._dialogText.setText(_textObj.question).setPosition(this.game.canvas.width / 2, this.game.canvas.height / 2 + 85);
        this._dialogText.setStroke('#000', 2); // Imposta un bordo nero di spessore 2 pixel

        this._firstQuestion.setText(_textObj.answ1).setStroke('#000', 20);
        this._secondQuestion.setText(_textObj.answ2).setStroke('#000', 20);
        this._thirdQuestion.setText(_textObj.answ3).setStroke('#000', 20);

        // Rendo il container visibile usando un tween
        this.tweens.add({
            targets: this._dialogContainer, duration: 3000, alpha: 1,
        });

        
        this.closeDialog();
    }

    closeDialog() {
        this.tweens.add({
            targets: this._dialogContainer, duration: 500, alpha: 0, onComplete: () => {
                this.dialog.splice(this._dialogCurrentIndex, 1);
                this._numberDialog--;

                if (this._numberDialog === 0) {
                    this.anyQuestion = false;
                }

                // Setto l'indice del dialogo a -1
                this._dialogCurrentIndex = -1;
                
                // Setto il container trasparente
                this._dialogContainer.setAlpha(0);
                
                // Setto il dialogo in progress a false
                this._dialogInProgress = false;

            }
        });
    }

    showPhrase(index: number) {
        let _textObj = this.dialog[this._dialogCurrentIndex];
        
        //console.log('index: ' + index + ', _textObj: ' + _textObj.rightAnswer);

        // Se la risposta è corretta
        if (_textObj.rightAnswer == index) {
            let indexDate = Math.floor(Math.random() * this._numberDialog);
            
            // Setto il testo con il numero casuale da ricordare
            this._dialogText.setText('Ricordati questo numero: ' + this.finalDate[indexDate]).setPosition(this.game.canvas.width / 2, this.game.canvas.height / 2 + 150);

            // Nascondo le opzioni di risposta
            this._firstQuestion.setText('');
            this._secondQuestion.setText('');
            this._thirdQuestion.setText('');

            // Rimuovo il numero casuale dall'array
            this.finalDate.splice(indexDate, 1);
            
            // Chiudo il dialogo dopo un certo intervallo di tempo
            setTimeout(() => {
                this.closeDialog();
            }, 3000);

        }
    }

    rettangoli(){
        
        // Creazione del rettangolo largo come lo schermo e alto 1/4 dello schermo
        const mainRect = this.add.rectangle(gameSettings.gameWidth/2 , (gameSettings.gameHeight / 8 + gameSettings.gameHeight*0.1), gameSettings.gameWidth*0.8, gameSettings.gameHeight / 3, 0xdddddd);
        mainRect.setAlpha(0.8)
        // Creazione dei rettangoli posizionati su due righe sotto di esso
        const gap = 50;
        const startY = (mainRect.y + mainRect.height / 2 + gap);
        const rectswidth = ((mainRect.width/2)*0.8)
        //const startX = mainRect.y + mainRect.height + gap;

        // Prima riga
        const rectr = this.add.rectangle(mainRect.x ,startY , 2, gameSettings.gameHeight, 0x00dd00);
        const rect1 = this.add.rectangle(mainRect.x ,startY , 0, gameSettings.gameHeight/16, 0xdddddd).setAlpha(0.5);
        rect1.width = rectswidth
        rect1.setX((mainRect.x - rectswidth/2)- gap ) //+ rect.width/2 - gap)// rect.width/2)
        
        const rect2 = this.add.rectangle(mainRect.x ,startY , 0, gameSettings.gameHeight/16, 0xdddddd).setAlpha(0.5);
        rect2.width = rectswidth
        rect2.setX(mainRect.x + rectswidth/2 + gap)

        const rect3 = this.add.rectangle(mainRect.x ,startY + rect1.height + gap  ,0, gameSettings.gameHeight/16, 0xdddddd).setAlpha(0.5);
        rect3.width = rectswidth
        rect3.setX((mainRect.x - rectswidth/2)-gap) //+ rect.width/2 - gap)// rect.width/2)
        
        const rect4 = this.add.rectangle(mainRect.x ,startY + rect1.height + gap , 0, gameSettings.gameHeight/16, 0xdddddd).setAlpha(0.5);
        rect4.width = rectswidth
        rect4.setX(mainRect.x + rectswidth/2 + gap)
        // Seconda riga
        // for (let i = 0; i < 2; i++) {
        //     const rect = this.add.rectangle(0 , startY, gameSettings.gameWidth/4-gap, gameSettings.gameHeight/20, 0xff0000);
        // }
    }
    
}