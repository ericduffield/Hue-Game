import { Scene } from 'phaser';
import { images, fonts } from "../../globals.js";
import ImageName from "../../enums/ImageName.js";
import Color from "../../enums/Color.js";
import {
    config,
    game
} from "../../index.js";
import SceneName from "../../enums/SceneName.js";

var background;
var color;
var keyEscape;
var text = [];
var paused;

export default class OptionsScreenState extends Scene {
    constructor() {
        super(SceneName.Options);

        this.text = [{
            name: "RESUME",
            drawcolor: "#707070",
            startingPoint: { x: 200, y: 250 },
            width: 180,
            height: 45,
            click: function (scene) {
                scene.stop(SceneName.Options);
                scene.resume(SceneName.Play);
            }
        },
        {
            name: "RESTART LEVEL",
            drawcolor: "#707070",
            startingPoint: { x: 200, y: 350 },
            width: 320,
            height: 45,
            click: function (scene, cameras, music, scope) {
                cameras.main.fadeOut(250, 0, 0, 0);
                scope.tweens.add({
                    targets: music,
                    volume: 0,
                    duration: 250
                });

                cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    music.stop();
                    scene.stop(SceneName.Options);
                    scene.stop(SceneName.Play);
                    scene.start(SceneName.Play);
                    var play = scene.get(SceneName.Play);
                    play.playMusic();
                })

            }
        },
        {
            name: "TITLE SCREEN",
            drawcolor: "#707070",
            startingPoint: { x: 200, y: 450 },
            width: 290,
            height: 45,
            click: function (scene, cameras, music, scope) {
                cameras.main.fadeOut(250, 0, 0, 0);
                scope.tweens.add({
                    targets: music,
                    volume: 0,
                    duration: 250
                });

                cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    music.stop();
                    scene.stop(SceneName.Options);
                    scene.stop(SceneName.Controls);
                    scene.stop(SceneName.Play);
                    scene.start(SceneName.TitleScreen);
                })
            }
        },
        ]
    }

    init(data) {
        // let tmp = Phaser.Display.Color.GetColor(data.color);
        // console.log(tmp)
        // if (data.color == Color.Grey) {
        //     this.color = Color.LightBlue;
        // }
        // else {
        //     this.color = data.color;
        // }
        this.music = data.music;
        this.color = "#17ACE0";
    }


    create() {
        this.transitioning = false;


        this.scene.bringToTop();
        var r1 = this.add.rectangle(config.width / 2, config.height / 2, config.width, config.height, 0x000000);
        r1.setAlpha(0.6);

        keyEscape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC); // Enter

        var style = { font: '80px Hue', fill: "#fff", };
        paused = this.add.text(200, 120, `PAUSED`, style);



        for (let i = 0; i < this.text.length; i++) {
            style = { font: '45px Hue', fill: this.text[i].drawcolor };
            text[i] = this.add.text(this.text[i].startingPoint.x, this.text[i].startingPoint.y, this.text[i].name, style);
        }

    }

    update() {

        for (let i = 0; i < this.text.length; i++) {
            if (this.ismouseInRectangle(game.input.mousePointer.x, game.input.mousePointer.y, this.text[i].startingPoint, this.text[i].width, this.text[i].height)) {
                // if yes, fill the shape in red
                this.text[i].drawcolor = this.color;

                if (game.input.mousePointer.isDown) {
                    if (!this.transitioning) {
                        this.transitioning = true;
                        this.text[i].click(this.scene, this.cameras, this.music, this);
                    }
                }

            } else {
                // if no, fill the shape with blue
                this.text[i].drawcolor = '#707070';
            }

        }

        for (let i = 0; i < this.text.length; i++) {
            var style = { font: '45px Hue', fill: this.text[i].drawcolor };
            text[i].setStyle(style);
        }

        if (keyEscape.isDown) {
            this.scene.stop(SceneName.Options);
            this.scene.resume(SceneName.Play);
        }
    }

    ismouseInRectangle(mouseX, mouseY, startingPoint, width, height) {
        let padding = 10;
        //AABB collision detection
        if (padding + mouseX > startingPoint.x && mouseX < startingPoint.x + width + padding &&
            padding + mouseY > startingPoint.y && mouseY < startingPoint.y + height + padding) {
            return true;
        }
    }
}