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
        
    }
}
