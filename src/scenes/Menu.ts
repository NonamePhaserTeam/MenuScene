import { globalEval } from 'jquery'
import Phaser from 'phaser'

import { gameSettings } from '../consts/GameSettings'
import SceneKeys from '../consts/SceneKeys'
import TextureKeys from '../consts/TextureKeys'
import FontKeys from '../consts/FontKeys'

import MenuButton from '../game/MenuButton'
import MenuHandler from './MenuHandler'

export default class Menu extends Phaser.Scene
{
    private menuHandler :MenuHandler

    constructor()
    {
        super(SceneKeys.Menu)
    }

    create()
    {
        this.add.image(gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5, TextureKeys.MenuBackground)
            .setScale(1.7)

        this.menuHandler = new MenuHandler(this)
        this.menuHandler.create()
    }

    update(t: number, dt: number)
    {
        this.menuHandler.update(t, dt)
        
        // if(this.cursors.up?.isDown)
        // {
        //     if(this.first || this.lastT + 150 < t)
        //     {
        //         if(this.first) this.first = false

        //         this.lastT = t
                
        //         if(this.btnIndex != 0)
        //         {
        //             // casi
        //             //    P A S U N
        //             // 4: 3 4 X X X
        //             // 3: 2 3 4 X X
        //             // 2: 1 2 3 4 X
        //             // 1: 0 1 2 3 4 
        //             // 0: X 0 1 2 3

        //             console.log(this.btnIndex, ' posso fa qualcosa')

        //             // imposto nuovo precedente da 2 in poi
        //             if(this.btnIndex > 1)
        //             {
        //                 this.buttons[this.btnIndex - 2]
        //                 .setPosition(gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5 + 100)
        //                 .setScale(0.7)
        //                 .Opacity(2)
        //                 .Hide(false)
        //             }

        //             // precedente diventa attuale
        //             this.buttons[this.btnIndex - 1]
        //             .setPosition(gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5 + 200)
        //             .setScale(1)
        //             .Opacity(0)

        //             // attuale diventa successivo
        //             this.buttons[this.btnIndex]
        //             .setPosition(gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5 + 300)
        //             .setScale(0.85)
        //             .Opacity(1)

        //             if(this.btnIndex < 4)
        //             {
        //                 // successivo diventa ultimo
        //                 this.buttons[this.btnIndex + 1]
        //                 .setPosition(gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5 + 400)
        //                 .setScale(0.7)
        //                 .Opacity(2)

        //             }
                    
        //             if(this.btnIndex < 3)
        //             {
        //                 // ultimo diventa nascosto
        //                 this.buttons[this.btnIndex + 2]
        //                 .Hide(true)
        //             }
                    

        //             this.btnIndex -= 1
        //         }
                    
        //     }
        // }
    }
}
