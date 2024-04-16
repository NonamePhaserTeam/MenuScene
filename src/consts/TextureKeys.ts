// inserire qui le texture sotto forma di chiave valore per un utilizzo più veloce e ordinato nelle scene
// import {Sprite} from "../../typings/custom"
enum TextureKeys {
    Logo = 'logo',
    MILITO = 'MILITO',
    hotdog = 'hotdog',
    maionese = 'maionese',
    Button = 'button',
    cavalloitem= "cavalloitem",
    Sfondo = 'sfondo',
    MenuBackground = 'menu-background',
    MenuBackground2 = 'menu-background2',
    MenuBackground3 = 'menu-background3',
    MenuButton = 'menu-button',
    lineaBianca = 'lineaBianca',
    card1 = 'card1',
    card2 = 'card2',
    uno = "1",
    dx1 = "1dx",
    sx1 = "1sx",
    r1 = "1r",
    due = "2",
    //personaggi
    pg1 = 'pg1',
    pg2 = 'pg2',
    //item
    item1 = 'item1',
    previewpg1 = 'previewpg1',
    previewpg2 = 'previewpg2',
    //stats
    stats1 = 'stats1',
    stats = 'stats[]',
    //elementi decorativi
    arrowScelta = 'arrowScelta',//la freccia che ti fa spostare da un pg all'altro
    chain = 'chain',
    itemContainer = 'itemContainer',
    specchio = 'specchio',
    //descrizione personaggi
    desc1 = 'desc1',
    //desc items
    descitem1 = 'descitem1',
    itemSelectContainer = 'itemSelectContainer',
    descContainer = 'descContainer'  
}

// let sprites: { [key: string]:  Sprite } = {
//     chiave1: { width: 1, height: 2, startFrame: 3, path: "asd", },
//     chiave2: { width: 2, height: 2, startFrame: 3, path: "asd", },
//     chiave3: { width: 3, height: 2, startFrame: 3, path: "asd", }
// };

export default TextureKeys;
 