import State from "../../../lib/State.js";
import ImageName from "../../enums/ImageName.js";
import Background from "../../objects/Background.js";
import PlayState from "./PlayState.js";
import TransitionState from "./TransitionState.js";
import Colour from "../../enums/Colour.js"

import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	stateStack,
	keys,
	images,
	timer
} from "../../globals.js";

export default class TitleScreenState extends State {
	constructor() {
		super();

		this.backgroundColor = {
			r: 13,
			g: 180,
			b: 232
		}

		this.smallTextSize = 22;
		this.largeTextSize = 24;
		this.textTransitionDuration = 0.75;

		this.fontSize = this.smallTextSize;
		this.TextPosition = 400;

		this.tweenText(this.largeTextSize);

		this.colorTransitionDuration = 2;

		this.tweenColor(0);

		this.playState = new PlayState(Colour.Grey);
	}

	update() {
		if (Object.values(keys).some(x => x)) {
			this.play();
		}
	}

	render() {
		context.fillStyle = `rgb(${this.backgroundColor.r}, ${this.backgroundColor.g}, ${this.backgroundColor.b})`;
		context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		images.render(ImageName.TitleScreen, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		context.font = 'bold ' + this.fontSize + 'px Hue';
		context.fillStyle = 'white';
		context.textAlign = 'center';
		context.fillText('Press any key to start', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 90);
	}

	tweenText(size) {
		if (size == this.smallTextSize) {
			timer.tween(this, ['fontSize'], [size], this.textTransitionDuration, () => { this.tweenText(this.largeTextSize) });
		}
		else {
			timer.tween(this, ['fontSize'], [size], this.textTransitionDuration, () => { this.tweenText(this.smallTextSize) });
		}
	}

	tweenColor(index) {
		switch (index) {
			case 0:
				timer.tween(this.backgroundColor, ['r'], [156], this.colorTransitionDuration, () => { this.tweenColor(++index) });
				timer.tween(this.backgroundColor, ['g'], [9], this.colorTransitionDuration, () => { });
				timer.tween(this.backgroundColor, ['b'], [223], this.colorTransitionDuration, () => { });
				break;
			case 1:
				timer.tween(this.backgroundColor, ['r'], [242], this.colorTransitionDuration, () => { this.tweenColor(++index) });
				timer.tween(this.backgroundColor, ['g'], [24], this.colorTransitionDuration, () => { });
				timer.tween(this.backgroundColor, ['b'], [46], this.colorTransitionDuration, () => { });
				break;
			case 2:
				timer.tween(this.backgroundColor, ['r'], [13], this.colorTransitionDuration, () => { this.tweenColor(0) });
				timer.tween(this.backgroundColor, ['g'], [180], this.colorTransitionDuration, () => { });
				timer.tween(this.backgroundColor, ['b'], [232], this.colorTransitionDuration, () => { });
				break;
		}

	}

	play() {
		TransitionState.fade(() => {
			stateStack.push(this.playState);
		});
	}

}
