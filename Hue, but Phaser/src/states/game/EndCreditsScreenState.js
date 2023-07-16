import { Scene } from 'phaser';
import ImageName from "../../enums/ImageName.js";
import Color from "../../enums/Color.js";
import LevelId from "../../enums/LevelId.js";
import {
    images,
    fonts,
} from "../../globals.js";

import { config } from "../../index.js";
import SceneName from "../../enums/SceneName.js";
import ProgressManager from "../../services/ProgressManager.js";
import Sound from "../../enums/Sound.js";

var music;
var title;
var paragraph;
var createdBy;
var press;

var canLeave;

class EndCreditsScreenState extends Scene {
    constructor() {
        super(SceneName.EndCredits);

        this.colors = [
            {
                r: 13,
                g: 180,
                b: 232
            },
            {
                r: 154,
                g: 8,
                b: 233
            },
            {
                r: 125,
                g: 184,
                b: 8
            },
            {
                r: 231,
                g: 27,
                b: 42
            }];

        this.textColor = this.colors[0];

        this.colorTransitionDuration = 2000;


        this.index = 0;
    }

    preload() {
        this.load.audio(Sound.EndCredits, [Sound.EndCredits]);
    }

    create() {
        this.newTween = true;
        music = this.sound.add(Sound.EndCredits, { loop: true, volume: 0 });

        music.play();

        var timedEvent = this.time.addEvent({
            delay: 250,
            callback: () => {
                this.tweens.add({
                    targets: music,
                    volume: 0.1,
                    duration: 750
                });
            },

        });

        this.transitioning = false;
        canLeave = false;

        this.cameras.main.fadeIn(500, 0, 0, 0) // TODO: reset to 500

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            music.stop();
            ProgressManager.resetProgress();
            this.scene.stop(SceneName.EndCredits);
            this.scene.start(SceneName.TitleScreen);
        })

        let style = { font: 'Bold 90px Hue', fill: `rgb(${this.textColor.r}, ${this.textColor.g}, ${this.textColor.b})` };
        title = this.add.text(config.width / 2, 170, `Thanks for playing`, style).setOrigin(0.5, 0.5);
        style = { font: 'Bold 30px Hue', fill: `rgb(${this.textColor.r}, ${this.textColor.g}, ${this.textColor.b})`, wordWrap: { width: 800, useAdvancedWrap: true } };
        createdBy = this.add.text(config.width / 2, 270, `Created by: Liam Kopke and Eric Duffield`, style).setOrigin(0.5, 0.5);
        paragraph = this.add.text(config.width / 2, 420, `This game is a recreation of the game "HUE" by Henry Hoffman and Dan Da Rocha. This game was created for a school project and is not being used commercially. Most of the images, sounds and fonts used were taken from "HUE": huethegame.com`, style).setOrigin(0.5, 0.5);
        press = this.add.text(config.width / 2, 560, `Press any key to return to the title screen.`, style).setOrigin(0.5, 0.5);
        press.alpha = 0;

        var timedEvent = this.time.addEvent({
            delay: 2000,
            callback: () => {
                canLeave = true;
                this.tweens.add({
                    targets: press,
                    alpha: 1,
                    duration: this.colorTransitionDuration,
                    onComplete: () => { }
                });
            },

        });

    }

    update() {

        if (canLeave) {
            this.input.on('pointerdown', () => {
                if (!this.transitioning) {
                    this.transitioning = true;
                    this.cameras.main.fadeOut(250, 0, 0, 0);
                    this.tweens.add({
                        targets: music,
                        volume: 0,
                        duration: 250
                    });
                }
            });
            this.input.keyboard.on('keydown', () => {
                if (!this.transitioning) {
                    this.transitioning = true;
                    this.cameras.main.fadeOut(250, 0, 0, 0);
                    this.tweens.add({
                        targets: music,
                        volume: 0,
                        duration: 250
                    });
                }
            });

        }

        if (this.newTween) {
            this.newTween = false;

            switch (this.index) {
                case 0:
                    this.tweens.add({
                        targets: this.textColor,
                        r: this.colors[this.index].r,
                        g: this.colors[this.index].g,
                        b: this.colors[this.index].b,
                        duration: this.colorTransitionDuration,
                        onComplete: () => { this.newTween = true; this.index++; }
                    });
                    break;
                case 1:
                    this.tweens.add({
                        targets: this.textColor,
                        r: this.colors[this.index].r,
                        g: this.colors[this.index].g,
                        b: this.colors[this.index].b,
                        duration: this.colorTransitionDuration,
                        onComplete: () => { this.newTween = true; this.index++; }
                    });
                    break;
                case 2:
                    this.tweens.add({
                        targets: this.textColor,
                        r: this.colors[this.index].r,
                        g: this.colors[this.index].g,
                        b: this.colors[this.index].b,
                        duration: this.colorTransitionDuration,
                        onComplete: () => { this.newTween = true; this.index++;; }
                    });
                    break;
                case 3:
                    this.tweens.add({
                        targets: this.textColor,
                        r: this.colors[this.index].r,
                        g: this.colors[this.index].g,
                        b: this.colors[this.index].b,
                        duration: this.colorTransitionDuration,
                        onComplete: () => { this.newTween = true; this.index = 0; }
                    });
                    break;
            }
        }

        let style = { font: 'Bold 90px Hue', fill: `rgb(${this.textColor.r}, ${this.textColor.g}, ${this.textColor.b})` };
        title.setStyle(style);
        style = { font: 'Bold 30px Hue', fill: `rgb(${this.textColor.r}, ${this.textColor.g}, ${this.textColor.b})`, wordWrap: { width: 800, useAdvancedWrap: true } };
        createdBy.setStyle(style);
        paragraph.setStyle(style);
        press.setStyle(style);

    }
}


export default EndCreditsScreenState;