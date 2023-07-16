import Animation from "../../../../lib/Animation.js";
import State from "../../../../lib/State.js";
import Player from "../../Entities/Player.js"
import Direction from "../../enums/Direction.js";
import PlayerStateName from "../../enums/PlayerStateName.js";
import { keys } from "../../globals.js";
import { matter } from "../../globals.js";

export default class PlayerWalkingState extends State {
	/**
	 * In this state, the player can move around using the
	 * directional keys. From here, the player can go idle
	 * if no keys are being pressed. The player can also swing
	 * their sword if they press the spacebar.
	 *
	 * @param {Player} player
	 */
	constructor(player) {
		super();

		this.player = player;
		this.animation = {
			[Direction.Right]: new Animation([0, 1, 2, 3, 4, 5, 6, 7], 0.1),
			[Direction.Left]: new Animation([9, 10, 11, 12, 13, 14], 0.1),
		};
	}

	enter() {
		this.player.sprites = this.player.walkingSprites;
		this.player.currentAnimation = this.animation[this.player.direction];
	}

	update(dt) {
		this.handleMovement(dt);
	}

	handleMovement(dt) {
		this.player.currentAnimation = this.animation[this.player.direction];

		if (keys.d) {
			this.player.moveRight();
			this.player.direction = Direction.Right;
		}
		else if (keys.a) {
			this.player.moveLeft();
			this.player.direction = Direction.Left;
		}
		else if (keys[' ']) {
			if (this.player.body.velocity.y == 0) {
				this.player.changeState(PlayerStateName.Jumping);
			}
		}
		else {
			this.player.changeState(PlayerStateName.Idle);
		}
	}

}
