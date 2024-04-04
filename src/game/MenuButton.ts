import Phaser, { Physics } from "phaser";
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

        this.button = scene.add.image(0, 0, texture).setScale(1.3)
        this.text = scene.add.bitmapText(0, 0, font, text, 36).setOrigin(0.5, 0.5)

        this.add(this.button)
        this.add(this.text)
    }

    preUpdate() 
    { 

    }

    Hide(flag: boolean) : MenuButton
    {
        this.button.setVisible(!flag)
        this.text.setVisible(!flag)

        return this
    }

    Opacity(mode: number) : MenuButton
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

        return this
    }
}