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
		super(SceneKeys.SelezionaCarte)
	}

    init(){
        
    }
    create()
    {
    }
    update(time: number, delta: number): void {
        
    }
}