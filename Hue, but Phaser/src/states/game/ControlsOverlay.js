import { Scene } from 'phaser';
import ImageName from "../../enums/ImageName.js";
import SoundName from "../../enums/Sound.js";
import Color from "../../enums/Color.js";
import LevelId from "../../enums/LevelId.js";
import {
    images,
    fonts,
} from "../../globals.js";

import { config } from "../../index.js";

var text = [];
var colorBar;
var colorSquares = [];

class ControlsOverlay extends Scene {
    constructor() {
        super('controls');

    }

    /**
     * Get the data from the previous scene and initialize the level
     * @param {*} data The data passed from the previous scene
     */
    init(data) {
        this.playerColors = data.playerColors;
        this.fadeIn = data.fadeIn;
    }

    preload() {
    }

    create() {
        if (this.fadeIn)
            this.cameras.main.fadeIn(250, 0, 0, 0)

        colorBar = this.add.rectangle(config.width / 2, config.height - 40, config.width, 80, Color.Black);


        for (let i = 0; i < this.playerColors.length; i++) {
            var style = { font: '30px Hue', fill: "#fff" };
            text[i] = this.add.text(25 + (i * 140), config.height - 58, i + 1, style);
            colorSquares[i] = this.add.rectangle(90 + (i * 140), config.height - 40, 60, 40, this.playerColors[i]);

        }
    }


    update() {
    }
}


export default ControlsOverlay;