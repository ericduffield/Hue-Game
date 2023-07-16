import Phaser from 'phaser';
import TitleScreenState from './states/game/TitleScreenState.js';
import PlayState from './states/game/PlayState.js';
import { images, fonts, loadJSON, sounds } from "./globals.js";
import OptionsScreenState from './states/game/OptionsScreenState.js';
import ControlsOverlay from './states/game/ControlsOverlay.js';
import EndCreditsScreenState from './states/game/EndCreditsScreenState.js';

// Fetch the asset definitions from config.json.


const {
    images: imageDefinitions,
    fonts: fontDefinitions,
    sounds: soundDefinitions,
} = loadJSON('./src/config.json');
images.load(imageDefinitions);

export const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1280,
    height: 700,
    scene: [TitleScreenState, PlayState, OptionsScreenState, ControlsOverlay, EndCreditsScreenState],
    fps: 60,
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 15 },
            enableSleep: false,
            debug: false
        }
    }
};


Phaser.Display.Align.CENTER;
var body = document.getElementsByTagName('body')[0];
body.style.backgroundColor = '#000000';
var canvas = document.getElementsByTagName('canvas')[0];

export let game;
let play = false;
window.addEventListener('click', (event) => {
    if (!play) {
        play = true;
        game = new Phaser.Game(config);
    }
});