import Sprite from "../../lib/Sprite.js";
import ImageName from "../enums/ImageName.js";
import Timer from "../../lib/Timer.js";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    context,
    images,
    timer
} from "../globals.js";

export default class GameEntity {

    constructor(playState) {
        this.playState = playState;

        // this.overlay = new Sprite(images.get(ImageName.Overlay), 0, 0, 1024, 683);
        // this.rain = new Sprite(images.get(ImageName.Rain), 0, 0, 512, 512);

        this.transition = false;
        this.minRadius = 1;

        this.radius = this.minRadius;
        this.maxRadius = CANVAS_WIDTH / 1.5;
    }

    update(dt) {

    }

    transitionColor(position, oldColor) {

        this.transition = true;
        this.gradientPosition = position;
        this.oldColor = oldColor;

        this.radius = this.minRadius;
        timer.tween(this, ['radius'], [this.maxRadius], 0.75, () => { this.transition = false; });
    }

    render() {
        context.fillStyle = this.playState.color;
        context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        if (this.transition) {

            var gradient = context.createRadialGradient(this.gradientPosition.x, this.gradientPosition.y, this.radius, this.gradientPosition.x, this.gradientPosition.y, (this.radius * 8) + this.maxRadius);
            gradient.addColorStop(0, "transparent");
            gradient.addColorStop(0.10, this.oldColor);
            context.fillStyle = gradient;
            context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }

        // context.save();
        // context.scale(2, 2)
        // context.globalAlpha = 0.5;
        // this.rain.render(0, 0);
        // context.restore();
    }

}
