import State from "../../../lib/State.js";
import Player from "../../entities/Player.js";
import Vector from "../../../lib/Vector.js";
import Rectangle from "../../entities/Rectangle.js";
import Background from "../../objects/Background.js";
import OptionsScreenState from "./OptionsScreenState.js";
import Colour from "../../enums/Colour.js"

import {
	engine,
	matter,
	sounds,
	world,
	stateStack,
	keys
} from "../../globals.js";

const {
	Composite,
	Engine,
} = matter;

export default class PlayState extends State {
	constructor(color) {
		super();

		this.player = new Player(
			new Vector(700, 300), this);

		this.floor = new Rectangle(0, 500, 1215, 28, { isStatic: true });


		this.color = color;
		//temporary decide if were doing hex or rgba
		this.background = new Background(this);
	}

	update(dt) {
		/**
		 * Update the Matter world one step/frame. By calling it here,
		 * we can be sure that the Matter world will be updated at the
		 * same rate as our canvas animation.
		 *
		 * @see https://brm.io/matter-js/docs/classes/Engine.html#method_update
		 */
		Engine.update(engine);

		this.player.update(dt);
		this.floor.update(dt);

		if (keys.Escape) {
			keys.Escape = false;
			this.options();
		}
	}

	render() {
		this.background.render();

		this.player.render();
		this.floor.render();
	}

	changeColor(color) {
		//can't transition if we're already transitioning
		if (this.background.transition)
			return;

		this.background.transitionColor(this.player.body.position, this.color);
		this.color = color;
	}

	options() {
		stateStack.push(new OptionsScreenState(this.color));
	}
}
