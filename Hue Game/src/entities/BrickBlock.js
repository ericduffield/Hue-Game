import Sprite from "../../lib/Sprite.js";
import ImageName from "../enums/ImageName.js";
import Size from "../enums/Size.js";
import { images } from "../globals.js";
import Block from "./Block.js";

export default class BrickBlock extends Block {
	static SPRITE_MEASUREMENTS = {
		[Size.Small]: { x: 390, y: 0, width: 35, height: 70 },
		[Size.Medium]: { x: 355, y: 105, width: 35, height: 110 },
		[Size.Large]: { x: 390, y: 70, width: 35, height: 220 },
	};

	/**
	 * One BrickBlock that is used to build a pig fortress. The BrickBlock
	 * is a dynamic (i.e. non-static) Matter body meaning it is affected by the
	 * world's physics. We've set the friction high to mimic a
	 * wood BrickBlock that is not usually slippery.
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} size The size of the BrickBlock using the Size enum.
	 * @param {number} angle The angle of the BrickBlock in radians.
	 */
	constructor(x, y, size, angle, colour) {
		super(x, y, size, BrickBlock.SPRITE_MEASUREMENTS[size].width, BrickBlock.SPRITE_MEASUREMENTS[size].height, angle);
		// this.blockSprites = BrickBlock.generateBlockSprites();
		this.sprites = this.blockSprites;
		this.body.damageThreshold = this.body.mass * 5;

	}

	update(dt) {
		super.update(dt);

		if (this.shouldCleanUp) {
			this.playRandomBreakSound();
		}
	}

	// static generateBlockSprites() {
	// 	return [
	// 		new Sprite(
	// 			images.get(ImageName.Glass),
	// 			BrickBlock.SPRITE_MEASUREMENTS[Size.Small].x,
	// 			BrickBlock.SPRITE_MEASUREMENTS[Size.Small].y,
	// 			BrickBlock.SPRITE_MEASUREMENTS[Size.Small].width,
	// 			BrickBlock.SPRITE_MEASUREMENTS[Size.Small].height
	// 		),
	// 		new Sprite(
	// 			images.get(ImageName.Glass),
	// 			BrickBlock.SPRITE_MEASUREMENTS[Size.Medium].x,
	// 			BrickBlock.SPRITE_MEASUREMENTS[Size.Medium].y,
	// 			BrickBlock.SPRITE_MEASUREMENTS[Size.Medium].width,
	// 			BrickBlock.SPRITE_MEASUREMENTS[Size.Medium].height
	// 		),
	// 		new Sprite(
	// 			images.get(ImageName.Glass),
	// 			BrickBlock.SPRITE_MEASUREMENTS[Size.Large].x,
	// 			BrickBlock.SPRITE_MEASUREMENTS[Size.Large].y,
	// 			BrickBlock.SPRITE_MEASUREMENTS[Size.Large].width,
	// 			BrickBlock.SPRITE_MEASUREMENTS[Size.Large].height
	// 		),
	// 	];
	// }
}
