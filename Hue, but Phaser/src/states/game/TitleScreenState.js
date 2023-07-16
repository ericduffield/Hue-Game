import { Scene } from 'phaser';
import ImageName from "../../enums/ImageName.js";
import Sound from "../../enums/Sound.js";
import Color from "../../enums/Color.js";
import LevelId from "../../enums/LevelId.js";
import {
    images,
    fonts,
    resetProgress
} from "../../globals.js";

import { config } from "../../index.js";
import SceneName from "../../enums/SceneName.js";
import ProgressManager from "../../services/ProgressManager.js";

var music;
var colorbackground;
var text;

class TitleScreenState extends Scene {
    constructor() {
        super(SceneName.TitleScreen);

        this.smallTextSize = 22;
        this.largeTextSize = 24;
        this.textTransitionDuration = 750;

        this.fontSize = this.smallTextSize;

        this.backgroundColor = {
            r: 13,
            g: 180,
            b: 232
        }

        this.colorTransitionDuration = 50;


        this.index = 0;
        this.newTween;

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
    }

    preload() {
        this.load.audio(Sound.TitleSoundtrack, [Sound.TitleSoundtrack]);
        this.load.image(SceneName.TitleScreen, images.getLink(ImageName.TitleScreen));
        this.load.audio(Sound.GameSoundtrack, [Sound.GameSoundtrack]);
        this.load.audio(Sound.CollectColor, [Sound.CollectColor]);
    }

    create() {
        this.transitioning = false;

        this.newTween = true;
        music = this.sound.add(Sound.TitleSoundtrack, { loop: true, volume: 0 });

        music.play();

        var timedEvent = this.time.addEvent({
            delay: 250,
            callback: () => {
                this.tweens.add({
                    targets: music,
                    volume: 0.1,
                    duration: 75
                });
            },

        });

        this.cameras.main.fadeIn(25, 0, 0, 0)

        let levelData = ProgressManager.loadProgress();

        if (resetProgress || levelData.length === 0) {
            levelData = {
                level: LevelId.NewColor,
                levelTo: LevelId.Four,
                musicPlaying: false,
                playerColors: [],
                newColor: Color.LightBlue,
            };

            ProgressManager.saveProgress(levelData);
        }
        else {
            levelData.musicPlaying = false;
        }

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            music.stop();
            this.scene.stop(SceneName.TitleScreen);
            this.scene.start(SceneName.Play, levelData);
            var play = this.scene.get(SceneName.Play);
            play.playMusic();
        })

        this.tweens.add({
            targets: this,
            fontSize: this.largeTextSize,
            duration: this.textTransitionDuration,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        })

        this.input.on('pointerdown', () => {
            if (!this.transitioning) {
                this.transitioning = true;
                this.cameras.main.fadeOut(25, 0, 0, 0);
                this.tweens.add({
                    targets: music,
                    volume: 0,
                    duration: 25
                });
            }
        });
        this.input.keyboard.on('keydown', () => {
            if (!this.transitioning) {
                this.transitioning = true;
                this.cameras.main.fadeOut(25, 0, 0, 0);
                this.tweens.add({
                    targets: music,
                    volume: 0,
                    duration: 25
                });
            }
        });


        var color = Phaser.Display.Color.GetColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b);

        colorbackground = this.add.rectangle(config.width / 2, config.height / 2, config.width, config.height, color);

        this.add.image(0, 0, SceneName.TitleScreen)
            .setOrigin(0)
            .setScale(1);

        const style = { font: 'bold ' + this.fontSize + 'px Hue', fill: "#fff", };
        text = this.add.text(config.width / 2, config.height - 90, `Press any key to start`, style).setOrigin(0.5, 0.5);

    }

    update() {
        var color = Phaser.Display.Color.GetColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b);
        colorbackground.setFillStyle(color);

        const style = { font: 'bold ' + this.fontSize + 'px Hue', fill: "#fff", };
        text.setStyle(style);

        if (this.newTween) {
            this.newTween = false;
            switch (this.index) {
                case 0:
                    this.tweens.add({
                        targets: this.backgroundColor,
                        r: this.colors[this.index].r,
                        g: this.colors[this.index].g,
                        b: this.colors[this.index].b,
                        duration: this.colorTransitionDuration,
                        onComplete: () => { this.newTween = true; this.index++; }
                    });
                    break;
                case 1:
                    this.tweens.add({
                        targets: this.backgroundColor,
                        r: this.colors[this.index].r,
                        g: this.colors[this.index].g,
                        b: this.colors[this.index].b,
                        duration: this.colorTransitionDuration,
                        onComplete: () => { this.newTween = true; this.index++; }
                    });
                    break;
                case 2:
                    this.tweens.add({
                        targets: this.backgroundColor,
                        r: this.colors[this.index].r,
                        g: this.colors[this.index].g,
                        b: this.colors[this.index].b,
                        duration: this.colorTransitionDuration,
                        onComplete: () => { this.newTween = true; this.index++;; }
                    });
                    break;
                case 3:
                    this.tweens.add({
                        targets: this.backgroundColor,
                        r: this.colors[this.index].r,
                        g: this.colors[this.index].g,
                        b: this.colors[this.index].b,
                        duration: this.colorTransitionDuration,
                        onComplete: () => { this.newTween = true; this.index = 0; }
                    });
                    break;
            }
        }




    }
}


export default TitleScreenState;