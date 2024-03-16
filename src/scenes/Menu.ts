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

        this.buttons[1].Opacity(1)
        this.buttons[2].Opacity(2)
        this.buttons[3].Hide(true)
        this.buttons[4].Hide(true)

        this.buttons[2].setScale(0.6)

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
                    // if(this.btnIndex != 0)
                    // {
                    //     this.buttons[this.btnIndex - 1].Hide(true)
                    // }
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
                    this.buttons[this.btnIndex].Hide(true)
                    this.btnIndex -= 1
                    this.buttons[this.btnIndex].Hide(false)
                }
            }
        }  
    }
}