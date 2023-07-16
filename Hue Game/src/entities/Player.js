import Sprite from "../../lib/Sprite.js";
import StateMachine from "../../lib/StateMachine.js";
import Vector from "../../lib/Vector.js";
// import Direction from "../enums/Direction.js";
import ImageName from "../enums/ImageName.js";
// import SoundName from "../enums/SoundName.js";
import PlayerStateName from "../enums/PlayerStateName.js";
import { images, keys, sounds } from "../globals.js";
// import Level from "../objects/Level.js";
import PlayerIdleState from "../states/player/PlayerIdleState.js";
import PlayerWalkingState from "../states/player/PlayerWalkingState.js";
import PlayerFallingState from "../states/player/PlayerFallingState.js";
import PlayerJumpingState from "../states/player/PlayerJumpingState.js";
import PlayerPushingState from "../states/player/PlayerPushingState.js";
import PlayerPullingState from "../states/player/PlayerPullingState.js";
import GameEntity from "./GameEntity.js";
import Direction from "../enums/Direction.js";
import { context, engine } from "../globals.js";



import {
    matter
} from "../globals.js";
import Colour from "../enums/Colour.js";

export default class Player extends GameEntity {
    static WIDTH = 48;
    static HEIGHT = 48;
    static TOTAL_IDLE_SPRITES = 10;
    static TOTAL_WALKING_SPRITES = 16;
    static VELOCITY_LIMIT = 100;

    /**
     * The hero character the player controls in the map.
     * Has the ability to jump and will collide into tiles
     * that are collidable.
     *
     * @param {Vector} dimensions The height and width of the player.
     * @param {Vector} position The x and y coordinates of the player.
     * @param {Vector} velocityLimit The maximum speed of the player.
     */
    constructor(position, playState) {
        super(matter.Bodies.rectangle(position.x, position.y, Player.WIDTH, Player.HEIGHT, {
            label: "player", //make enum
            isStatic: false,
            // frictionStatic: 1,
            friction: 0.1,
            frictonAir: 0.1,
        }));

        this.direction = Direction.Right;

        this.idleSprites = Player.generateSprites(ImageName.CharacterIdle, Player.TOTAL_IDLE_SPRITES);
        this.walkingSprites = Player.generateSprites(ImageName.CharacterWalking, Player.TOTAL_WALKING_SPRITES);

        this.sprites = this.idleSprites;

        this.stateMachine = new StateMachine();
        this.stateMachine.add(PlayerStateName.Idle, new PlayerIdleState(this));
        this.stateMachine.add(PlayerStateName.Walking, new PlayerWalkingState(this));
        this.stateMachine.add(PlayerStateName.Jumping, new PlayerJumpingState(this));
        this.stateMachine.add(PlayerStateName.Falling, new PlayerFallingState(this));
        this.stateMachine.add(PlayerStateName.Pushing, new PlayerPushingState(this));
        this.stateMachine.add(PlayerStateName.Pulling, new PlayerPullingState(this));

        this.changeState(PlayerStateName.Idle);

        this.colors = [Colour.Grey, Colour.LightBlue, Colour.Purple, Colour.Red];
        this.playState = playState;

    }

    /**
     * Loops through the character sprite sheet and
     * retrieves each sprite's location in the sheet.
     *
     * @returns The array of sprite objects.
     */
    static generateSprites(imageName, numberOfSprites) {
        const sprites = [];

        for (let i = 0; i < numberOfSprites; i++) {
            sprites.push(new Sprite(
                images.get(imageName),
                i * Player.WIDTH,
                0,
                Player.WIDTH,
                Player.HEIGHT,
            ));
        }

        return sprites;
    }

    update(dt) {
        this.stateMachine.update(dt);
        this.currentAnimation.update(dt);

        this.currentFrame = this.currentAnimation.getCurrentFrame();

        this.checkColorChange();
    }

    render() {
        super.render(() => {
            context.lineWidth = 4;
            context.strokeStyle = 'blue';
            context.strokeRect(this.renderOffset.x, this.renderOffset.y, Player.WIDTH, Player.HEIGHT);
        });
    }


    checkColorChange() {
        for (let i = 0; i < this.colors.length; i++) {
            if (keys[i + 1]) {
                if (this.colors[i] !== this.playState.color) {
                    this.playState.changeColor(this.colors[i]);
                }
            }

        }
    }

    changeState(state, params) {
        this.stateMachine.change(state, params);
    }

    moveRight() {
        matter.Body.applyForce(this.body, this.body.position, { x: 0.01, y: 0 });
    }

    moveLeft() {
        matter.Body.applyForce(this.body, this.body.position, { x: -0.01, y: 0 });
    }

}
