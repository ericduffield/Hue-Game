import Animation from "../../../../lib/Animation.js";
import State from "../../../../lib/State.js";
import Player from "../../Entities/Player.js"
import Direction from "../../enums/Direction.js";
import PlayerStateName from "../../enums/PlayerStateName.js";
import { keys } from "../../globals.js";
import { matter } from "../../globals.js";

export default class PlayerPushingState extends State {
	/**
	 * In this state, the player is stationary unless
	 * a directional key or the spacebar is pressed.
	 *
	 * @param {Player} player
	 */
	constructor(player) {

		super();

		this.player = player;
		this.animation = {
			[Direction.Right]: new Animation([0, 1, 2, 3, 4], 0.1),
			[Direction.Left]: new Animation([5, 6, 7, 8, 9], 0.1),
		};
	}

	enter() {
		this.player.sprites = this.player.idleSprites;

		this.player.currentAnimation = this.animation[this.player.direction];
	}

	update(dt) {
		this.checkForMovement();
	}

	checkForMovement() {
		if (keys.d) {
			this.player.direction = Direction.Right;
			this.player.changeState(PlayerStateName.Walking);
		}
		else if (keys.a) {
			this.player.direction = Direction.Left;
			this.player.changeState(PlayerStateName.Walking);
		}
		else if (keys[' ']) {
			this.player.changeState(PlayerStateName.Jumping);
		}
	}

}