// definire qui tipi di dati custom
// utile in particolare per le settings

interface GameSettings {
    gameWidth: number,
    gameHeight: number,
    bgColor: string,
    gravity: {x: number, y: number},
    debug: boolean,
    zoom: number
};
interface Sprite {
    width: number,
    height: number,
    startFrame: number,
    path: string,
};