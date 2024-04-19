import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";
// import {TextureKeys, sprites} from "../consts/TextureKeys";
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

        this.load.image(
            TextureKeys.Logo, 
            'assets/images/logo.jpg'
        )
        
        this.loadImages()
        this.loadFonts()
    }

    create()
    {
        // creazione di tutte le animazioni
                

        this.scene.stop(SceneKeys.Preloader);
        // this.scene.start(SceneKeys.GameMazzuolo);
        //this.scene.start(SceneKeys.Game);
        //this.scene.start(SceneKeys.Menu);
        this.scene.start(SceneKeys.SelectMode);
        //this.scene.start(SceneKeys.SelezionaPersonaggi);
        //this.scene.start(SceneKeys.tmp)
    }

    private loadImages() : void
    {
        this.load.image(
            TextureKeys.MILITO, 
            'icons/MILITO.jpeg'
        )
        this.load.image(
            TextureKeys.hotdog, 
            'icons/hotdog.png'
        )
        this.load.image(
            TextureKeys.maionese, 
            'icons/maionese.jpg'
        )
        this.load.image(
            TextureKeys.Logo, 
            'images/logo.jpg'
        )
        this.load.image(
            TextureKeys.indovinello, 
            'icons/elementiDecorativi/indovinello.png'
        )
        this.load.image(
            TextureKeys.indovinelloSelect, 
            'images/indovinelloSelect.png'
        )
        this.load.image(
            TextureKeys.MenuBackground,
            'images/background/menu_bg.jpg'
        )
        // this.load.image(
        //     TextureKeys.MenuBackground2,
        //     'images/background/sfondoDef.png'
        // )
        this.load.image(
            TextureKeys.MenuBackground3,
            'images/background/br.png'
        )

        this.load.image(
            TextureKeys.MenuButton,
            'images/button.png'
        )
        // this.load.image(
        //     TextureKeys.pg1,
        //     'icons/personaggi/p1/pg1.png'
        // )
        // this.load.image(
        //     TextureKeys.pg2,
        //     'icons/personaggi/p2/pg2.png'
        // ) 
        this.load.image(
            TextureKeys.pg1,
            'icons/vincy.png'
        ) 
        this.load.image(
            TextureKeys.pg2,
            'icons/francy.png'
        ) 
        this.load.image(
            TextureKeys.pg3,
            'icons/tommy.png'
        ) 
        this.load.image(
            TextureKeys.pg4,
            'icons/falcy.png'
        ) 
        this.load.image(
            TextureKeys.pg5,
            'icons/manu.png'
        ) 
        this.load.image(
            TextureKeys.pg6,
            'icons/jeb.png'
        ) 
        this.load.image(
            TextureKeys.pg7,
            'icons/mary.png'
        )
        this.load.image(
            TextureKeys.pg8,
            'icons/simy.png'
        )  

        this.load.image(
            TextureKeys.item1,
            '/icons/items/item1.png'
        )
        this.load.image(
            TextureKeys.cavalloitem,
            '/icons/items/cavalloitem.jpg'
        )
        this.load.image(
            TextureKeys.uno,
            '/icons/items/1.png'
        )
        this.load.image(
            TextureKeys.dx1,
            '/icons/items/1+.png'
        )
        this.load.image(
            TextureKeys.r1,
            '/icons/items/1+1.png'
        )
        this.load.image(
            TextureKeys.sx1,
            '/icons/items/1+1-.png'
        )
        this.load.image(
            TextureKeys.due,
            '/icons/items/2.png'
        )

        this.load.image(
            TextureKeys.previewpg1,
            'icons/personaggi/p2/preview2.png'
        )

        this.load.image(
            TextureKeys.previewpg2,
            'icons/personaggi/p2/preview2.png'
        )

        this.load.image(
            TextureKeys.arrowScelta,
            'icons/elementiDecorativi/graffa.png'
        )
        this.load.image(
            TextureKeys.chain,
            'icons/elementiDecorativi/chain.png'
        )
        this.load.image(
            TextureKeys.itemContainer,
            'icons/elementiDecorativi/itemContainer.png'
        )
        this.load.image(
            TextureKeys.specchio,
            'icons/elementiDecorativi/specchio1.png'
        )
        this.load.image(
            TextureKeys.Button, 
            'assets/images/button.jpg'
        )
        this.load.image(
            TextureKeys.Sfondo, 
            'assets/images/sfondo.png'
        )
        this.load.image(
            TextureKeys.lineaBianca,
            'images/lineaSelectMode.png'
        )
        this.load.image(
            TextureKeys.card1,
            'images/card1.png'
        )
        this.load.image(
            TextureKeys.card2,
            'images/card2.png'
        )
        // this.load.image(
        //     TextureKeys.stats1,
        //     'icons/personaggi/p1/stats1.png'
        // )
        
        this.load.image(
            TextureKeys.descContainer,
            'icons/elementiDecorativi/descContainer.PNG'   
        )
        this.load.image(
            TextureKeys.itemSelectContainer,
            'icons/elementiDecorativi/selectItemContainer.PNG'      
        )
            
        
        this.load.image(
            TextureKeys.desc1,
            'icons/personaggi/p1/desc1.png'
        )
         
        this.load.image(
            TextureKeys.descitem1,
            '/icons/desc1item.png'
        )
        this.load.image(
            TextureKeys.stats1,
            '/icons/stats1.png'
        )
        this.load.image(
            TextureKeys.stats2,
            '/icons/stats2.png'
        )
        this.load.image(
            TextureKeys.stats3,
            '/icons/stats3.png'
        )
        this.load.image(
            TextureKeys.stats4,
            '/icons/stats4.png'
        )
        this.load.image(
            TextureKeys.stats5,
            '/icons/stats5.png'
        )
        this.load.image(
            TextureKeys.stats6,
            '/icons/stats6.png'
        )
        this.load.image(
            TextureKeys.stats7,
            '/icons/stats7.png'
        )
        this.load.image(
            TextureKeys.stats8,
            '/icons/stats8.png'
        )
        this.load.image(
            TextureKeys.stats9,
            '/icons/stats9.png'
        )
        this.load.image(
            TextureKeys.stats10,
            '/icons/stats10.png'
        )
    }

    private loadFonts() : void
    {
        this.load.bitmapFont(FontKeys.Arcade, 'fonts/arcade.png', 'fonts/arcade.xml')
    }
}