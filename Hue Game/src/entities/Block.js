import { pickRandomElement } from "../../lib/RandomNumberHelpers.js";
import Sprite from "../../lib/Sprite.js";
import BodyType from "../enums/BodyType.js";
import ImageName from "../enums/ImageName.js";
import Size from "../enums/Size.js";
import SoundName from "../enums/SoundName.js";
import { images, sounds } from "../globals.js";
import Rectangle from "./Rectangle.js";
import IColourable from "../interfaces/IColourable.js";

export default class Block extends Rectangle {
	static ANGLE_VERTICAL = 0;
	static ANGLE_HORIZONTAL = Math.PI / 2;
	static ANGLE_RIGHT_DIAGONAL = Math.PI / 4;
	static ANGLE_LEFT_DIAGONAL = 3 * Math.PI / 4;

	/**
	 * One block that is used to build a pig fortress. The block
	 * is a dynamic (i.e. non-static) Matter body meaning it is affected by the
	 * world's physics. We've set the friction high to mimic a
	 * wood block that is not usually slippery.
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} size The size of the block using the Size enum.
	 * @param {number} angle The angle of the block in radians.
	 */
	constructor(x, y, size, width, height, angle = Block.ANGLE_VERTICAL, colour) {
		super(x, y, width, height, {
			angle: angle,
			label: BodyType.Block,
			isStatic: false,
			frictionStatic: 1,
			friction: 1
		});

		this.size = size;
		this.currentFrame = size;
		this.wasSoundPlayed = false;
        this.colour = colour;
	}

	update(dt) {
		super.update(dt);

		if (this.shouldCleanUp) {
			this.playRandomBreakSound();
		}
	}

	playRandomBreakSound() {
		if (this.wasSoundPlayed) {
			return;
		}

		const sound = pickRandomElement([
			SoundName.Break1,
			SoundName.Break2,
			SoundName.Break3,
			SoundName.Break4,
			SoundName.Break5,
		]);

		sounds.play(sound);

		this.wasSoundPlayed = true;
	}
}
