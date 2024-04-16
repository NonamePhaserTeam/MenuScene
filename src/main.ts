import "phaser"

import Menu from "./scenes/Menu"
import Preloader from "./scenes/Preloader"

import { gameSettings } from "./consts/GameSettings"
import MainMenuMazzuolo from "./scenes/MainMenuMazzuolo"
import SelectMode from "./scenes/Selezionamodalità"
import SelezionaPersonaggi from "./scenes/SelezionaPersonaggi"
import tmp from "./scenes/tmp"

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: gameSettings.bgColor,
  parent: "my-game",
  scale: {
    mode: Phaser.Scale.FIT,
    width: gameSettings.gameWidth,
    height: gameSettings.gameHeight,
    zoom: gameSettings.zoom
  },

  physics: {
    default: "arcade",
    arcade: { 
      gravity: gameSettings.gravity,
      debug: gameSettings.debug 
    }
  },

  scene: [
    Preloader,
    MainMenuMazzuolo,
    Menu,
    SelectMode,
    SelezionaPersonaggi,
    tmp
  ],
}

export default new Phaser.Game(config)