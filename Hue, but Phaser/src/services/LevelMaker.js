import Level from "../objects/Level.js";
import LevelId from "../enums/LevelId.js";
import LevelLabel from "../enums/LevelLabel.js";
import { images } from "../globals.js";
import ImageName from "../enums/ImageName.js";
import Color from "../enums/Color.js";
import ObjectFactory from "./ObjectFactory.js";
import Object from "../enums/Object.js";
import Doors from "../enums/Doors.js";
import Bricks from "../enums/Bricks.js";
import Crates from "../enums/Crates.js";

export default class LevelMaker {
    static createLevel(parameters) {
        const level = parameters.level;
        switch (level) {
            case LevelId.One:
                return LevelMaker.levelOne();
            case LevelId.Two:
                return LevelMaker.levelTwo();
            case LevelId.Three:
                return LevelMaker.levelThree();
            case LevelId.Four:
                return LevelMaker.levelFour();
            case LevelId.Five:
                return LevelMaker.levelFive();
            case LevelId.Six:
                return LevelMaker.levelSix();
            case LevelId.Seven:
                return LevelMaker.levelSeven();
            case LevelId.Eight:
                return LevelMaker.levelEight();
            case LevelId.Nine:
                return LevelMaker.levelNine();
            case LevelId.Ten:
                return LevelMaker.levelTen();
            case LevelId.NewColor:
                return LevelMaker.levelNewColor(parameters);
            case LevelId.Dialog:
                return LevelMaker.levelDialog();
        }
    }

    static levelOne() {
        const imgDimensions = images.getDimensions(ImageName.Level1);
        const parameters = {
            id: LevelId.One,
            previousLevelId: LevelId.NewColor,
            nextLevelId: LevelId.Two,
            label: LevelLabel.One,
            objects: [
                ObjectFactory.createObject(Object.Door, {
                    position: { x: 1000, y: 1320 },
                    color: Color.Grey,
                    label: Doors.Entrance
                }),
                ObjectFactory.createObject(Object.Door, {
                    position: { x: 2900, y: 3620 },
                    color: Color.Purple,
                    label: Doors.Exit
                }),
                // Next four blocks are horizontal layer
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1650, y: 1595 },
                    color: Color.LightBlue,
                    label: Bricks.Normal
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1875, y: 1595 },
                    color: Color.LightBlue,
                    label: Bricks.Normal
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 2100, y: 1595 },
                    color: Color.LightBlue,
                    label: Bricks.Normal
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 2325, y: 1595 },
                    color: Color.LightBlue,
                    label: Bricks.Normal
                }),
                // Next three blocks are vertical layer
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 2050, y: 2625 },
                    color: Color.Purple,
                    label: Bricks.Normal
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 2050, y: 2875 },
                    color: Color.Purple,
                    label: Bricks.Normal
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 2050, y: 3125 },
                    color: Color.Purple,
                    label: Bricks.Normal
                })
            ],
            size: imgDimensions,
            startPosition: { x: 1000, y: 1345 }, // OG: 1000 x 1345
            renderPosition: { x: imgDimensions.width / 2, y: imgDimensions.height / 2 },
            color: Color.Purple,
            levelTo: LevelId.One,
            levelFrom: LevelId.Three,
            origin: { x: 0.505, y: 0.496 }
        };
        return new Level(parameters);
    }

    static levelTwo() {
        const imgDimensions = images.getDimensions(ImageName.Level2);
        const parameters = {
            id: LevelId.Two,
            previousLevelId: LevelId.One,
            nextLevelId: LevelId.Six,
            label: LevelLabel.Two,
            objects: [
                // Doors
                ObjectFactory.createObject(Object.Door, {
                    position: { x: 3500, y: 725 },
                    color: Color.LightBlue,
                    label: Doors.Entrance
                }),
                ObjectFactory.createObject(Object.Door, {
                    position: { x: 525, y: 725 },
                    color: Color.Purple,
                    label: Doors.Exit
                }),
                // Bricks
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 2900, y: 950 },
                    color: Color.Purple
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 2440, y: 950 },
                    color: Color.LightBlue
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1980, y: 950 },
                    color: Color.Purple
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1520, y: 950 },
                    color: Color.LightBlue
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1060, y: 950 },
                    color: Color.Purple
                }),
                // Spikes
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 3072, y: 1140 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 2816, y: 1140 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 2560, y: 1140 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 2304, y: 1140 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 2048, y: 1140 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 1792, y: 1140 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 1536, y: 1140 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 1280, y: 1140 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 1024, y: 1140 },
                    color: Color.Black
                })
            ],
            size: imgDimensions,
            startPosition: { x: 3500, y: 700 }, // These have to be hardcoded
            renderPosition: { x: imgDimensions.width / 2, y: imgDimensions.height / 2 },
            color: Color.Purple,
            origin: { x: 0.468, y: 0.435 }
        };
        return new Level(parameters);
    }

    static levelThree() {
        const imgDimensions = images.getDimensions(ImageName.Level3);
        const parameters = {
            id: LevelId.Three,
            previousLevelId: LevelId.Five,
            nextLevelId: LevelId.NewColor,
            label: LevelLabel.Three,
            objects: [
                // Rectangle for floating part of level
                ObjectFactory.createObject(Object.Rectangle, {
                    position: { x: 2272, y: 1328 },
                    dimensions: { width: 750, height: 250 },
                    color: Color.Black
                }),
                // Doors
                ObjectFactory.createObject(Object.Door, {
                    position: { x: 1264, y: 2080 },
                    color: Color.DoorGrey,
                    label: Doors.Entrance
                }),
                ObjectFactory.createObject(Object.Door, {
                    position: { x: 3300, y: 1100 },
                    color: Color.DoorGrey,
                    label: Doors.Exit
                }),
                // Bricks
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 656, y: 2104 },
                    color: Color.LightBlue,
                    label: Bricks.Normal
                }),
                // Crates
                ObjectFactory.createObject(Object.Crate, {
                    position: { x: 400, y: 2104 },
                    color: Color.Black,
                    label: Crates.Normal
                }),
                ObjectFactory.createObject(Object.Crate, {
                    position: { x: 2272, y: 1528 },
                    color: Color.Black,
                    label: Crates.Normal
                }),
            ],
            size: imgDimensions,
            startPosition: { x: 1264, y: 2080 }, // These have to be hardcoded
            renderPosition: { x: imgDimensions.width / 2, y: imgDimensions.height / 2 },
            color: Color.Grey,
            levelTo: LevelId.One,
            levelFrom: LevelId.Three,
            newColor: Color.Purple,
            origin: { x: 0.499, y: 0.513 }
        };
        return new Level(parameters);
    }

    static levelFour() {
        const imgDimensions = images.getDimensions(ImageName.Level4);
        const parameters = {
            id: LevelId.Four,
            previousLevelId: LevelId.NewColor,
            nextLevelId: LevelId.Five,
            label: LevelLabel.Four,
            objects: [
                // Doors
                ObjectFactory.createObject(Object.Door, {
                    position: { x: 725, y: 1112 },
                    color: Color.DoorGrey,
                    label: Doors.Entrance
                }),
                ObjectFactory.createObject(Object.Door, {
                    position: { x: 2775, y: 1592 },
                    color: Color.DoorGrey,
                    label: Doors.Exit
                }),
                // Narrow Bricks
                // Top Row
                ObjectFactory.createObject(Object.BrickNarrow, {
                    position: { x: 550, y: 775 },
                    color: Color.LightBlue,
                    label: Bricks.Narrow
                }),
                ObjectFactory.createObject(Object.BrickNarrow, {
                    position: { x: 870, y: 775 },
                    color: Color.LightBlue,
                    label: Bricks.Narrow
                }),
                ObjectFactory.createObject(Object.BrickNarrow, {
                    position: { x: 1190, y: 775 },
                    color: Color.LightBlue,
                    label: Bricks.Narrow
                }),
                // Bottom Row
                ObjectFactory.createObject(Object.BrickNarrow, {
                    position: { x: 975, y: 1472 },
                    color: Color.LightBlue,
                    label: Bricks.Narrow
                }),
                ObjectFactory.createObject(Object.BrickNarrow, {
                    position: { x: 1295, y: 1472 },
                    color: Color.LightBlue,
                    label: Bricks.Narrow
                }),
                ObjectFactory.createObject(Object.BrickNarrow, {
                    position: { x: 1615, y: 1472 },
                    color: Color.LightBlue,
                    label: Bricks.Narrow
                }),
                ObjectFactory.createObject(Object.BrickNarrow, {
                    position: { x: 1935, y: 1472 },
                    color: Color.LightBlue,
                    label: Bricks.Narrow
                }),
                // Crates
                ObjectFactory.createObject(Object.Crate, {
                    position: { x: 1850, y: 1348 },
                    color: Color.Black,
                    label: Crates.Normal
                }),
                // Rocks
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 600, y: 700 },
                    color: Color.Black,
                }),
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 825, y: 700 },
                    color: Color.Black,
                }),
                // Spikes
                // Top Row Left (Inverted)
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 1376, y: 984 },
                    color: Color.Black,
                    angle: 180
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 1632, y: 984 },
                    color: Color.Black,
                    angle: 180
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 1888, y: 984 },
                    color: Color.Black,
                    angle: 180
                }),
                // Top Row Right (Inverted)
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 2656, y: 984 },
                    color: Color.Black,
                    angle: 180
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 2912, y: 984 },
                    color: Color.Black,
                    angle: 180
                }),
                // Bottom Spikes
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 1112, y: 2000 },
                    color: Color.Black,
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 1368, y: 2000 },
                    color: Color.Black,
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 1624, y: 2000 },
                    color: Color.Black,
                })
            ],
            size: imgDimensions,
            startPosition: { x: 800, y: 1000 }, // These have to be hardcoded
            renderPosition: { x: imgDimensions.width / 2, y: imgDimensions.height / 2 },
            color: Color.Grey,
            origin: { x: 0.51, y: 0.498 }
        };
        return new Level(parameters);
    }

    static levelFive() {
        const imgDimensions = images.getDimensions(ImageName.Level5);
        const parameters = {
            id: LevelId.Five,
            previousLevelId: LevelId.Four,
            nextLevelId: LevelId.Three,
            label: LevelLabel.Five,
            objects: [
                // Doors
                ObjectFactory.createObject(Object.Door, {
                    position: { x: 1050, y: 1550 },
                    color: Color.DoorGrey,
                    label: Doors.Entrance
                }),
                ObjectFactory.createObject(Object.Door, {
                    position: { x: 2700, y: 1725 },
                    color: Color.DoorGrey,
                    label: Doors.Exit
                }),
                // Bricks
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 768, y: 1012 },
                    color: Color.LightBlue
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 998, y: 1012 },
                    color: Color.LightBlue
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1228, y: 1012 },
                    color: Color.LightBlue
                }),
                //Rocks
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 896, y: 750 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 1162, y: 750 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 1032, y: 525 },
                    color: Color.Black
                }),
                // Spikes
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 1920, y: 2400 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 2176, y: 2400 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 2432, y: 2400 },
                    color: Color.Black
                }),

            ],
            size: imgDimensions,
            startPosition: { x: 1050, y: 1550 }, // These have to be hardcoded
            renderPosition: { x: imgDimensions.width / 2, y: imgDimensions.height / 2 },
            color: Color.Grey,
            origin: { x: 0.5, y: 0.506 }
        };
        return new Level(parameters);
    }

    static levelSix() {
        const imgDimensions = images.getDimensions(ImageName.Level6);
        const parameters = {
            id: LevelId.Six,
            previousLevelId: LevelId.Two,
            nextLevelId: LevelId.Eight,
            label: LevelLabel.Six,
            objects: [
                // Rectangles
                ObjectFactory.createObject(Object.Rectangle, {
                    position: { x: 784, y: 1544 },
                    color: Color.LightBlue,
                    dimensions: { width: 256, height: 512 }
                }),
                // Doors
                ObjectFactory.createObject(Object.Door, {
                    position: { x: 2000, y: 1920 },
                    color: Color.DoorGrey,
                    label: Doors.Entrance
                }),
                ObjectFactory.createObject(Object.Door, {
                    position: { x: 3000, y: 1152 },
                    color: Color.DoorGrey,
                    label: Doors.Exit
                }),
                // Ladders
                ObjectFactory.createObject(Object.Ladder, {
                    position: { x: 528, y: 1824 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Ladder, {
                    position: { x: 528, y: 1350 },
                    color: Color.Black
                }),
                // Crates
                ObjectFactory.createObject(Object.Crate, {
                    position: { x: 784, y: 1952 },
                    color: Color.Black
                }),
                // Bricks
                // Left Bottom
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 528, y: 1928 },
                    color: Color.LightBlue
                }),
                // Left Top
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 784, y: 1160 },
                    color: Color.Purple
                }),
                // Center (Horizontal)
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1040, y: 1416 },
                    color: Color.LightBlue
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1274, y: 1416 },
                    color: Color.LightBlue
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1508, y: 1416 },
                    color: Color.LightBlue
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1742, y: 1416 },
                    color: Color.LightBlue
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1976, y: 1416 },
                    color: Color.LightBlue
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 2210, y: 1416 },
                    color: Color.LightBlue
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 2444, y: 1416 },
                    color: Color.LightBlue
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 2678, y: 1416 },
                    color: Color.LightBlue
                }),
                // Right Top (Vertical)
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 2816, y: 1160 },
                    color: Color.Purple
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 2816, y: 910 },
                    color: Color.Purple
                }),
                // Narrow Brick
                ObjectFactory.createObject(Object.BrickNarrow, {
                    position: { x: 528, y: 1320 },
                    color: Color.LightBlue,
                }),
                // Rocks
                // Bottom layer
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 1040, y: 1280 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 1274, y: 1280 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 1508, y: 1280 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 1742, y: 1280 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 1976, y: 1280 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 2210, y: 1280 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 2444, y: 1280 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 2678, y: 1280 },
                    color: Color.Black
                }),
                // Middle layer
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 1168, y: 1024 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 1402, y: 1024 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 1636, y: 1024 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 1870, y: 1024 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 2104, y: 1024 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 2338, y: 1024 },
                    color: Color.Black
                }),
                // Top layer
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 1040, y: 768 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 1274, y: 768 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 1508, y: 768 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 1742, y: 768 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 1976, y: 768 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 2210, y: 768 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 2444, y: 768 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Rock, {
                    position: { x: 2678, y: 768 },
                    color: Color.Black
                }),
            ],
            size: imgDimensions,
            startPosition: { x: 2000, y: 2150 }, // These have to be hardcoded
            renderPosition: { x: imgDimensions.width / 2, y: imgDimensions.height / 2 },
            color: Color.Grey,
            origin: { x: 0.5273, y: 0.496 }
        };
        return new Level(parameters);
    }

    static levelSeven() {
        const imgDimensions = images.getDimensions(ImageName.Level7);
        const parameters = {
            id: LevelId.Seven,
            previousLevelId: LevelId.Six,
            nextLevelId: LevelId.Nine,
            label: LevelLabel.Seven,
            objects: [
                // Doors
                ObjectFactory.createObject(Object.Door, {
                    position: { x: 750, y: 860 },
                    color: Color.DoorGrey,
                    label: Doors.Entrance
                }),
                ObjectFactory.createObject(Object.Door, {
                    position: { x: 4600, y: 860 },
                    color: Color.DoorGrey,
                    label: Doors.Exit
                }),
                // Bricks
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1128, y: 1130 },
                    color: Color.Green
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1640, y: 1130 },
                    color: Color.Purple
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 2152, y: 1130 },
                    color: Color.LightBlue
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 2664, y: 1130 },
                    color: Color.Green
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 3174, y: 1130 },
                    color: Color.Purple
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 3688, y: 1130 },
                    color: Color.LightBlue
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 4200, y: 1130 },
                    color: Color.Green
                }),
                // Spikes
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 1128, y: 1280 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 1640, y: 1280 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 2152, y: 1280 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 2664, y: 1280 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 3176, y: 1280 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 3688, y: 1280 },
                    color: Color.Black
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 4200, y: 1280 },
                    color: Color.Black
                }),
                // Inverted Spikes
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 1128, y: 736 },
                    color: Color.Black,
                    angle: 180
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 1384, y: 736 },
                    color: Color.Black,
                    angle: 180
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 1640, y: 736 },
                    color: Color.Black,
                    angle: 180
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 1896, y: 736 },
                    color: Color.Black,
                    angle: 180
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 2152, y: 736 },
                    color: Color.Black,
                    angle: 180
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 2408, y: 736 },
                    color: Color.Black,
                    angle: 180
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 2664, y: 736 },
                    color: Color.Black,
                    angle: 180
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 2920, y: 736 },
                    color: Color.Black,
                    angle: 180
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 3176, y: 736 },
                    color: Color.Black,
                    angle: 180
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 3432, y: 736 },
                    color: Color.Black,
                    angle: 180
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 3688, y: 736 },
                    color: Color.Black,
                    angle: 180
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 3944, y: 736 },
                    color: Color.Black,
                    angle: 180
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 4200, y: 736 },
                    color: Color.Black,
                    angle: 180
                }),
            ],
            size: imgDimensions,
            startPosition: { x: 750, y: 750 }, // These have to be hardcoded
            renderPosition: { x: imgDimensions.width / 2, y: imgDimensions.height / 2 },
            levelFrom: LevelId.Level8,
            color: Color.Green,
            origin: { x: 0.504, y: 0.509 }
        };
        return new Level(parameters);
    }

    static levelEight() {
        const imgDimensions = images.getDimensions(ImageName.Level8);
        const parameters = {
            id: LevelId.Eight,
            previousLevelId: LevelId.Six,
            nextLevelId: LevelId.NewColor,
            label: LevelLabel.Eight,
            objects: [
                // Rectangles
                ObjectFactory.createObject(Object.Rectangle, {
                    position: { x: 2224, y: 1080 },
                    dimensions: { width: 256, height: 256 },
                }),
                ObjectFactory.createObject(Object.Rectangle, {
                    position: { x: 2224, y: 2616 },
                    dimensions: { width: 256, height: 256 },
                }),
                // Doors
                ObjectFactory.createObject(Object.Door, {
                    position: { x: 2860, y: 800 },
                    color: Color.LightBlue,
                    label: Doors.Entrance
                }),
                ObjectFactory.createObject(Object.Door, {
                    position: { x: 840, y: 3360 },
                    color: Color.Purple,
                    label: Doors.Exit
                }),
                // Bricks
                // Top Layer
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1968, y: 1080 },
                    color: Color.LightBlue
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 2480, y: 1080 },
                    color: Color.Purple
                }),
                // Second Layer
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 2224, y: 1592 },
                    color: Color.Purple
                }),
                // Third Layer
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1840, y: 2104 },
                    color: Color.LightBlue
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 2074, y: 2104 },
                    color: Color.LightBlue
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 2308, y: 2104 },
                    color: Color.LightBlue
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 2542, y: 2104 },
                    color: Color.LightBlue
                }),
                // Fourth Layer
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1968, y: 2616 },
                    color: Color.Purple
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 2480, y: 2616 },
                    color: Color.Purple
                }),
                // Fifth Layer
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1968, y: 3128 },
                    color: Color.LightBlue
                }),
                // Spikes
                // Second Layer
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 2480, y: 1464 },
                    color: Color.Black,
                }),
                // Fourth layer
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 2224, y: 2488 },
                    color: Color.Black,
                }),
                // Fifth layer
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 2224, y: 3000 },
                    color: Color.Black,
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 2480, y: 3000 },
                    color: Color.Black,
                }),
                // Bottom layer
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 1459, y: 3790 },
                    color: Color.Black,
                }),
                // Inverted Layer
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 1200, y: 3200 },
                    color: Color.Black,
                    angle: 180
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 1456, y: 3200 },
                    color: Color.Black,
                    angle: 180
                }),
                ObjectFactory.createObject(Object.Spike, {
                    position: { x: 1712, y: 3200 },
                    color: Color.Black,
                    angle: 180
                }),
                // Crate
                ObjectFactory.createObject(Object.Crate, {
                    position: { x: 2480, y: 3384 },
                    color: Color.Purple
                }),

            ],
            size: imgDimensions,
            startPosition: { x: 2860, y: 800 },
            renderPosition: { x: imgDimensions.width / 2, y: imgDimensions.height / 2 },
            color: Color.Grey,
            newColor: Color.Green,
            levelTo: LevelId.Seven,
            origin: { x: 0.486, y: 0.509 }
        };
        return new Level(parameters);

    }

    static levelNine() {
        const imgDimensions = images.getDimensions(ImageName.Level9);
        const parameters = {
            id: LevelId.Nine,
            previousLevelId: LevelId.Seven,
            nextLevelId: LevelId.EndCredits,
            label: LevelLabel.Nine,
            objects: [
                // Rectangles
                ObjectFactory.createObject(Object.Rectangle, {
                    position: { x: 1148, y: 3000 },
                    dimensions: { width: 256, height: 256 },
                }),
                ObjectFactory.createObject(Object.Rectangle, {
                    position: { x: 1660, y: 3000 },
                    dimensions: { width: 256, height: 256 },
                }),
                ObjectFactory.createObject(Object.Rectangle, {
                    position: { x: 1148, y: 2488 },
                    dimensions: { width: 256, height: 256 },
                }),
                // Doors
                ObjectFactory.createObject(Object.Door, {
                    position: { x: 2100, y: 3232 },
                    color: Color.DoorGrey,
                    label: Doors.Entrance
                }),
                ObjectFactory.createObject(Object.Door, {
                    position: { x: 840, y: 672 },
                    color: Color.DoorGrey,
                    label: Doors.Exit
                }),
                // Bricks
                // First layer
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1404, y: 3256 },
                    color: Color.Green
                }),
                // Second Layer
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1148, y: 2744 },
                    color: Color.Green
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1660, y: 2744 },
                    color: Color.Purple
                }),
                // Third Layer
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1660, y: 2232 },
                    color: Color.LightBlue
                }),
                // Fourth Layer
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1148, y: 1720 },
                    color: Color.Green
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1660, y: 1720 },
                    color: Color.Purple
                }),
                // Fifth Layer
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1660, y: 1464 },
                    color: Color.LightBlue
                }),
                // Sixth Layer
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1916, y: 1208 },
                    color: Color.LightBlue
                }),
                // Seventh Layer
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 1404, y: 952 },
                    color: Color.Green
                }),
                ObjectFactory.createObject(Object.Brick, {
                    position: { x: 2172, y: 952 },
                    color: Color.Purple
                })
            ],
            size: imgDimensions,
            startPosition: { x: 2100, y: 3200 },
            renderPosition: { x: imgDimensions.width / 2, y: imgDimensions.height / 2 },
            color: Color.Grey,
            origin: { x: 0.5015, y: 0.5178 }
        };
        return new Level(parameters);
    }

    static levelTen() {
    }

    static levelNewColor(params) {
        const imgDimensions = images.getDimensions(ImageName.LevelNewColor);
        const newColor = params.newColor;
        const levelFrom = params.levelFrom;
        const doNothing = levelFrom === undefined;
        const levelTo = params.levelTo;
        const parameters = {
            id: LevelId.NewColor,
            previousLevelId: levelFrom,
            nextLevelId: levelTo,
            label: LevelLabel.NewColor,
            objects: [
                ObjectFactory.createObject(Object.Door, {
                    position: { x: 1400, y: 2350 },
                    color: doNothing ? Color.Grey : Color.DoorGrey,
                    label: Doors.Entrance,
                    doNothing: doNothing
                }),
                ObjectFactory.createObject(Object.Door, {
                    position: { x: 5350, y: 2350 },
                    color: Color.Grey,
                    label: Doors.Exit
                }),
            ],
            size: imgDimensions,
            startPosition: { x: 1400, y: 2400 }, // These have to be hardcoded
            renderPosition: { x: imgDimensions.width / 2, y: imgDimensions.height / 2 },
            color: Color.Grey,
            newColorPosition: { x: 3400, y: 2350 },
            newColor: newColor,
            origin: { x: 0.4755, y: 0.51 }
        };
        return new Level(parameters);
    }

    static levelDialog() {
    }
}