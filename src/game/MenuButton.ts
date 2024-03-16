import Phaser, { Physics } from "phaser";

// creare una classe ad hoc per sprite o oggetti di gioco complessi

import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";
import FontKeys from "../consts/FontKeys";

export default class MenuButton extends Phaser.GameObjects.Container
{
    private button :Phaser.GameObjects.Image
    private text: Phaser.GameObjects.BitmapText

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, text: string, font: string)
    {
        super(scene, x, y)

        this.button = this.scene.add.image(x, y, texture).setScale(1.3 )
        this.text = this.scene.add.bitmapText(x, y, font, text, 36).setOrigin(0.5, 0.5)

        this.add(this.button)
        this.add(this.text)
    }

    preUpdate() 
    { 

    }

    Hide(flag: boolean) : void
    {
        this.button.setVisible(!flag)
        this.text.setVisible(!flag)
    }

    Opacity(mode: number) : void
    {
        if(mode == 1)
        {
            this.button.setTint(0x808080)
            this.text.setTint(0x808080)
        }
        else if(mode == 2)
        {
            this.button.setTint(0x202020)
            this.text.setTint(0x202020)
        }
        else 
        {
            this.button.clearTint()
            this.text.clearTint()
        }
    }
}