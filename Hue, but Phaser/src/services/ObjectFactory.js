import Object from "../enums/Object.js";
import Door from "../objects/Door.js";
import Rock from "../objects/Rock.js";
import Spike from "../objects/Spike.js";
import Crate from "../objects/Crate.js";
import CrateLarge from "../objects/CrateLarge.js";
import CrateTall from "../objects/CrateTall.js";
import CrateTaller from "../objects/CrateTaller.js";
import Brick from "../objects/Brick.js";
import BrickNarrow from "../objects/BrickNarrow.js";
import Rectangle from "../objects/Rectangle.js";
import Ladder from "../objects/Ladder.js";
import { images } from "../globals.js";

export default class ObjectFactory {
    static createObject(type, parameters) {
        switch (type) {
            case Object.Rectangle:
                parameters.isStatic = true;
                parameters.type = Object.Rectangle;
                return new Rectangle(parameters);
            case Object.Door:
                parameters.isStatic = true;
                parameters.type = Object.Door;
                parameters.dimensions = images.getDimensions(Object.Door);
                return new Door(parameters);

            case Object.Rock:
                parameters.type = Object.Rock;
                parameters.dimensions = images.getDimensions(Object.Rock);
                parameters.radius = parameters.dimensions.width / 2;
                return new Rock(parameters);

            case Object.Spike:
                parameters.isStatic = true;
                parameters.type = Object.Spike;
                parameters.dimensions = images.getDimensions(Object.Spike);
                return new Spike(parameters);

            case Object.Crate:
                parameters.type = Object.Crate;
                parameters.dimensions = images.getDimensions(Object.Crate);
                return new Crate(parameters);

            case Object.CrateLarge:
                return new CrateLarge(parameters);

            case Object.CrateTall:
                return new CrateTall(parameters);

            case Object.CrateTaller:
                return new CrateTaller(parameters);

            case Object.Brick:
                parameters.isStatic = true;
                parameters.type = Object.Brick;
                parameters.dimensions = images.getDimensions(Object.Brick);
                return new Brick(parameters);

            case Object.BrickNarrow:
                parameters.isStatic = true;
                parameters.type = Object.BrickNarrow;
                parameters.dimensions = images.getDimensions(Object.BrickNarrow);
                return new BrickNarrow(parameters);

            case Object.Ladder:
                parameters.isStatic = true;
                parameters.type = Object.Ladder;
                parameters.dimensions = images.getDimensions(Object.Ladder);
                return new Ladder(parameters);
        }
    }
}