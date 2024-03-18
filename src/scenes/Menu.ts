import { globalEval } from 'jquery'
import Phaser from 'phaser'

import { gameSettings } from '../consts/GameSettings'
import SceneKeys from '../consts/SceneKeys'
import TextureKeys from '../consts/TextureKeys'
import FontKeys from '../consts/FontKeys'

import MenuButton from '../game/MenuButton'

export default class Menu extends Phaser.Scene
{
    private cursors :Phaser.Types.Input.Keyboard.CursorKeys
    private lastT :number
    private first = true

    private buttons :MenuButton[]
    private btnIndex = 0
    private maxBtnIndex = 4

    constructor()
    {
        super(SceneKeys.Menu)
    }

    create()
    {
        this.add.image(gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5, TextureKeys.MenuBackground)
            .setScale(1.7)

        this.cursors = this.input.keyboard.createCursorKeys()
        
        this.buttons = [
            new MenuButton(this, gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5 + 150, TextureKeys.MenuButton, 'Play', FontKeys.Arcade),
            new MenuButton(this, gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5 + 300, TextureKeys.MenuButton, 'Settings', FontKeys.Arcade),
            new MenuButton(this, gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5 + 450, TextureKeys.MenuButton, 'but2', FontKeys.Arcade),
            new MenuButton(this, gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5, TextureKeys.MenuButton, 'but3', FontKeys.Arcade),
            new MenuButton(this, gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5, TextureKeys.MenuButton, 'but4', FontKeys.Arcade)
        ]

        for(let i = 0; i < 5; i++)
        {
            this.add.existing(this.buttons[i])
        }

        this.buttons[1].Opacity(1)
        this.buttons[2].Opacity(2)
        this.buttons[3].Hide(true)
        this.buttons[4].Hide(true)

        this.buttons[1].setScale(0.85)
        this.buttons[2].setScale(0.70)

    }

    update(t: number, dt: number)
    {
        if(this.cursors.down?.isDown)
        {
            if(this.first || this.lastT + 150 < t)
            {
                if(this.first) this.first = false

                this.lastT = t
                
                if(this.btnIndex != this.maxBtnIndex)
                {
                    // quello in alto viene nascosto
                    if(this.btnIndex > 0 && this.btnIndex < 4)
                    {
                        this.buttons[this.btnIndex - 1].Hide(true)
                    }

                    // casi
                    //    P A S U N
                    // 0: X 1 2 3 4
                    // 1: 1 2 3 4 5
                    // 2: 2 3 4 5 X
                    // 3: 3 4 5 X X
                    // 4: 4 5 X X X

                    // attuale to precedente
                    this.buttons[this.btnIndex]
                    .setPosition(gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5)
                    .setScale(0.85)
                    .Opacity(1)
                
                    // successivo to attuale
                    this.buttons[this.btnIndex + 1]
                        .setPosition(gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5 + 150)
                        .setScale(1)
                        .Opacity(0)
                    
                    if(this.btnIndex < 3)
                    {
                        // ultimo to successivo
                        this.buttons[this.btnIndex + 2]
                        .setPosition(gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5 + 300)
                        .setScale(0.85)
                        .Opacity(1)
                    }

                    if(this.btnIndex < 2)
                    {
                        // primo dei nascosti to ultimo
                        this.buttons[this.btnIndex + 3]
                        .setPosition(gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5 + 450)
                        .setScale(0.70)
                        .Opacity(2)
                        .Hide(false)        
                    }
                    
                    this.btnIndex += 1
                    
                    
                }
            }
        }
        
        if(this.cursors.up?.isDown)
        {
            if(this.first || this.lastT + 150 < t)
            {
                if(this.first) this.first = false

                this.lastT = t
                
                if(this.btnIndex != 0)
                {
                    // casi
                    //    P A S U N
                    // 4: 3 4 X X X
                    // 3: 2 3 4 X X
                    // 2: 1 2 3 4 X
                    // 1: 0 1 2 3 4 
                    // 0: X 0 1 2 3

                    console.log(this.btnIndex, ' posso fa qualcosa')

                    // imposto nuovo precedente da 2 in poi
                    if(this.btnIndex > 1)
                    {
                        this.buttons[this.btnIndex - 2]
                        .setPosition(gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5)
                        .setScale(0.7)
                        .Opacity(2)
                        .Hide(false)
                    }

                    // precedente diventa attuale
                    this.buttons[this.btnIndex - 1]
                    .setPosition(gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5 + 150)
                    .setScale(1)
                    .Opacity(0)

                    // attuale diventa successivo
                    this.buttons[this.btnIndex]
                    .setPosition(gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5 + 300)
                    .setScale(0.85)
                    .Opacity(1)

                    if(this.btnIndex < 4)
                    {
                        // successivo diventa ultimo
                        this.buttons[this.btnIndex + 1]
                        .setPosition(gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5 + 450)
                        .setScale(0.7)
                        .Opacity(2)

                    }
                    
                    if(this.btnIndex < 3)
                    {
                        // ultimo diventa nascosto
                        this.buttons[this.btnIndex + 2]
                        .Hide(true)
                    }
                    

                    this.btnIndex -= 1
                }
                    
            }
        }
    }
}
