import State from "../../../lib/State.js";
import ImageName from "../../enums/ImageName.js";
import Background from "../../objects/Background.js";
import Colour from "../../enums/Colour.js";
import TransitionState from "./TransitionState.js"

import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    context,
    stateStack,
    keys,
    images,
    timer,
    getMousePosition,
    getMouseClick
} from "../../globals.js";

export default class OptionsScreenState extends State {
    constructor(color) {
        super();

        if (color == Colour.Grey) {
            this.color = Colour.LightBlue;
        }
        else {
            this.color = color;
        }

        this.text = [{
            name: "RESUME",
            drawcolor: "#707070",
            startingPoint: { x: 200, y: 275 },
            width: 120,
            height: 30,
            click: function () {
                stateStack.pop();
            }
        },
        {
            name: "RESTART LEVEL",
            drawcolor: "#707070",
            startingPoint: { x: 200, y: 350 },
            width: 220,
            height: 30,
            click: function () {
            }
        },
        {
            name: "TITLE SCREEN",
            drawcolor: "#707070",
            startingPoint: { x: 200, y: 425 },
            width: 190,
            height: 30,
            click: function () {
                TransitionState.fade(() => {
                    stateStack.pop();
                    stateStack.pop();
                });
            }
        },
        ]
    }

    update() {
        if (keys.Escape) {
            keys.Escape = false;
            stateStack.pop();
        }

        let position = getMousePosition(); //need to get canvas postition instead of document position because offset because not fullscreen

        for (let i = 0; i < this.text.length; i++) {
            if (this.ismouseInRectangle(position, this.text[i].startingPoint, this.text[i].width, this.text[i].height)) {
                // if yes, fill the shape in red
                this.text[i].drawcolor = this.color;

                if (getMouseClick()) {
                    this.text[i].click();
                }
            } else {
                // if no, fill the shape with blue
                this.text[i].drawcolor = '#707070';
            }

        }



    }

    render() {
        context.save();
        context.globalAlpha = "0.8";
        context.fillStyle = 'black';
        context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        context.restore();

        context.font = '60px Hue';
        context.textAlign = 'start';
        context.fillStyle = 'white';
        context.fillText('PAUSED', 200, 200);

        context.font = '30px Hue';

        for (let i = 0; i < this.text.length; i++) {
            context.fillStyle = this.text[i].drawcolor;
            context.fillText(this.text[i].name, this.text[i].startingPoint.x, this.text[i].startingPoint.y);
        }

    }

    ismouseInRectangle(position, startingPoint, width, height) {
        let padding = 10;
        //AABB collision detection
        if (padding + position.mouseX > startingPoint.x && position.mouseX < startingPoint.x + width + padding &&
            position.mouseY < startingPoint.y + padding && padding + position.mouseY > startingPoint.y - height) {
            return true;
        }
    }
}
