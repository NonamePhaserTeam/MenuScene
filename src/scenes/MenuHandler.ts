import Phaser from "phaser";

import MenuButton from "../game/MenuButton";
import { gameSettings } from "../consts/GameSettings";

import TextureKeys from "../consts/TextureKeys";
import FontKeys from "../consts/FontKeys";

export default class MenuHandler extends Phaser.GameObjects.Container
{
    private m_texts = ['play', 'settings', 'btn2', 'btn3', 'btn4']
    private cursors :Phaser.Types.Input.Keyboard.CursorKeys
    private lastT :number
    private firstButton :boolean

    private buttons :MenuButton[]
    private btnIndex = 0
    private maxBtnIndex = 4

    constructor(scene: Phaser.Scene)
    {
        super(scene)

        this.firstButton = true
    
        this.cursors = scene.input.keyboard.createCursorKeys()

        this.buttons = [
            new MenuButton(scene, gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5 + 200, TextureKeys.MenuButton, this.m_texts[0], FontKeys.Arcade),
            new MenuButton(scene, gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5 + 300, TextureKeys.MenuButton, this.m_texts[1], FontKeys.Arcade),
            new MenuButton(scene, gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5 + 400, TextureKeys.MenuButton, this.m_texts[2], FontKeys.Arcade),
            new MenuButton(scene, gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5 + 500, TextureKeys.MenuButton, this.m_texts[3], FontKeys.Arcade),
            new MenuButton(scene, gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5 + 600, TextureKeys.MenuButton, this.m_texts[4], FontKeys.Arcade)
        ]

        for(let i = 0; i < 5; i++)
        {
            scene.add.existing(this.buttons[i])
        }
    }

    create()
    {        
        this.buttons[1].Opacity(1)
        this.buttons[2].Opacity(2)
        this.buttons[3].Hide(true)
        this.buttons[4].Hide(true)

        this.buttons[1].setScale(0.85)
        this.buttons[2].setScale(0.70)
        this.buttons[3].setScale(.70)
        this.buttons[4].setScale(.70)
    }

    update(t: number, dt: number)
    {
        if(this.cursors.down?.isDown)
        {
            if(this.firstButton || this.lastT + 150 < t)
            {
                if(this.firstButton) this.firstButton = false

                this.lastT = t

                if(this.ScrollDown()) this.btnIndex += 1
            }
        }


    }

    private ScrollDown() :boolean
    {
        if(this.btnIndex >= this.maxBtnIndex) return false
        
        // nascondo PREVIOUS siccome va sostituito
        if(this.btnIndex > 0 && this.btnIndex < 4)
        {
            this.buttons[this.btnIndex - 1].Hide(true)
        }

        this.ActualToPrevious()
        this.NextToActual()

        if(this.btnIndex < 3)
        {
            this.LastToNext()
        }

        if(this.btnIndex < 2)
        {
            this.HiddenToLast()
        }

        return true
    }

    private ScrollUp() :boolean
    {
        return true
    }

    private HiddenToPrevious() :void
    {

    }

    private ActualToPrevious() :void
    {
        this.scene.tweens.add({
            targets: this.buttons[this.btnIndex],
            y: gameSettings.gameHeight * 0.5 + 100,
            scale: 0.85,
            duration: 250,
            ease: 'Linear',
            yoyo: false,
            repeat: 0
        })
        this.buttons[this.btnIndex].Opacity(1)
    }

    private NextToActual() :void
    {
        this.scene.tweens.add({
            targets: this.buttons[this.btnIndex + 1],
            y: gameSettings.gameHeight * 0.5 + 200,
            scale: 1,
            duration: 250,
            ease: 'Linear',
            yoyo: false,
            repeat: 0
        })
        this.buttons[this.btnIndex + 1].Opacity(0)
    }

    private LastToNext() :void
    {
        this.scene.tweens.add({
            targets: this.buttons[this.btnIndex + 2],
            y: gameSettings.gameHeight * 0.5 + 300,
            scale: 1,
            duration: 250,
            ease: 'Linear',
            yoyo: false,
            repeat: 0
        })
        this.buttons[this.btnIndex + 2].Opacity(1)
    }

    private HiddenToLast() :void
    {
        this.scene.tweens.add({
            targets: this.buttons[this.btnIndex + 3],
            y: gameSettings.gameHeight * 0.5 + 400,
            scale: .70,
            duration: 250,
            ease: 'Linear',
            yoyo: false,
            repeat: 0
        })
        this.buttons[this.btnIndex + 3].Hide(false)
        this.buttons[this.btnIndex + 3].Opacity(2)
    }

}