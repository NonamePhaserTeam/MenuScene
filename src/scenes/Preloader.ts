import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimationKeys";
import FontKeys from "../consts/FontKeys";

export default class Preloader extends Phaser.Scene
{
    constructor()
    {
        super('preloader')
    }

    preload()
    {
        // preload di tutti gli asset
        this.loadImages()
        this.loadFonts()
    }

    create()
    {
        // creazione di tutte le animazioni
                

        this.scene.stop(SceneKeys.Preloader);
        this.scene.start(SceneKeys.Menu);
    }

    private loadImages() : void
    {
        this.load.image(
            TextureKeys.Logo, 
            'images/logo.jpg'
        )

        this.load.image(
            TextureKeys.MenuBackground,
            'images/background/menu_bg.jpg'
        )

        this.load.image(
            TextureKeys.MenuButton,
            'images/button.png'
        )
    }

    private loadFonts() : void
    {
        this.load.bitmapFont(FontKeys.Arcade, 'fonts/arcade.png', 'fonts/arcade.xml')
    }
}