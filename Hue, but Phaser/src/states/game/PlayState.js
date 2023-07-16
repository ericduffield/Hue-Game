import { Scene } from 'phaser';
import { images, fonts } from "../../globals.js";
import { config, game } from "../../index.js";
import ImageName from "../../enums/ImageName.js";
import PlayerAnimation from "../../enums/PlayerAnimation.js";
import Color from "../../enums/Color.js";
import LevelMaker from "../../services/LevelMaker.js";
import LevelLabel from '../../enums/LevelLabel.js';
import Object from '../../enums/Object.js';
import Doors from '../../enums/Doors.js';
import SmoothedHorizontalControls from '../../services/SmoothedHorizontalControls.js';
import Sound from '../../enums/Sound.js';
import SceneName from '../../enums/SceneName.js';
import LevelId from '../../enums/LevelId.js';
import ProgressManager from '../../services/ProgressManager.js';


// Welcome to variable hell, this. is not available because it would try to reference scene. :/

// Level

var camera; // The camera object
var level; // The level object
var background; // The level image
var color; // The rectangle in the back of the level that has the color stored in curerntColor
var targetFramerate = 60; // The target framerate
var collidableObjects = 0b0001; // Collision catergory for collidable objects
var nonCollidableObjects = 0b0010; // Collision catergory for non-collidable objects
var levelGroup = 0b0100; // Group for the level
var listOfObjects = [];
var listOfCrates = [];
var listOfLadders = [];

// Player
var player; // The player object
var canJump = false; // Bool to check if the player can jump
var lastHeight = 0; // Height to check if the player is falling

// Keybinds
var keyA; // A Key
var keyD; // D Key
var keyW; // W Key
var key1; // 1 Key
var key2; // 2 Key
var key3; // 3 Key
var key4; // 4 Key
var keyEnter; // Enter Key
var keySpace; // Space Key
var cursors; // Arrow Keys
var keyEscape; // Escape Key
var keyShift // Shift Key

// Services
var smoothedControls; // Controller for steady movement

// Door Objects
var entrance;
var exit;

var music;
var collectColorSound;
var newColorSlice;
var collectedColor;

var colorCircle;

var leftEdge;
var rightEdge;
var topEdge;
var bottomEdge;


export default class PlayState extends Scene {
    constructor() {
        super(SceneName.Play, { active: true });

        this.transition = false;

        this.minRadius = 1;

        this.radius = 0;
        this.maxRadius = config.width * 2.5;
        this.gradientPosition = { x: 0, y: 0 };

        this.colorTransitionDuration = 750;

        this.currentColor = Color.Grey;
        this.allColors = [Color.LightBlue, Color.Purple, Color.Green, Color.Red];
    }


    /**
     * Get the data from the previous scene and initialize the level
     * @param {*} data The data passed from the previous scene
     */
    init(data) {
        // Initializes the level
        level = LevelMaker.createLevel({
            level: data.level,
            levelTo: data.levelTo,
            levelFrom: data.levelFrom,
            newColor: data.newColor,
            color: data.color
        });
        listOfObjects = [];
        listOfCrates = [];
        listOfLadders = [];
        this.playerColors = data.playerColors;

    }

    /**
     * Preloads assets
     */
    preload() {


        // Load player spritesheet
        this.load.spritesheet({
            key: ImageName.CharacterWalking,
            url: images.getLink(ImageName.CharacterWalking),
            frameConfig: {
                frameWidth: 650,
                frameHeight: 650
            }
        });

        this.load.spritesheet({
            key: ImageName.CharacterIdle,
            url: images.getLink(ImageName.CharacterIdle),
            frameConfig: {
                frameWidth: 650,
                frameHeight: 650
            }
        });

        // Load level backgrounds
        // Need to load all of them because of how state switching is done
        this.load.image(LevelLabel.One, images.getLink(ImageName.Level1));
        this.load.image(LevelLabel.Two, images.getLink(ImageName.Level2));
        this.load.image(LevelLabel.Three, images.getLink(ImageName.Level3));
        this.load.image(LevelLabel.Four, images.getLink(ImageName.Level4));
        this.load.image(LevelLabel.Five, images.getLink(ImageName.Level5));
        this.load.image(LevelLabel.Six, images.getLink(ImageName.Level6));
        this.load.image(LevelLabel.Seven, images.getLink(ImageName.Level7));
        this.load.image(LevelLabel.Eight, images.getLink(ImageName.Level8));
        this.load.image(LevelLabel.Nine, images.getLink(ImageName.Level9));
        this.load.image(LevelLabel.NewColor, images.getLink(ImageName.LevelNewColor));

        // Load Object images
        this.load.image(Object.Door, images.getLink(Object.Door));
        this.load.image(Object.Brick, images.getLink(Object.Brick));
        this.load.image(Object.BrickNarrow, images.getLink(Object.BrickNarrow));
        this.load.image(Object.Crate, images.getLink(Object.Crate));
        this.load.image(Object.CrateLarge, images.getLink(Object.CrateLarge));
        this.load.image(Object.CrateTall, images.getLink(Object.CrateTall));
        this.load.image(Object.CrateTaller, images.getLink(Object.CrateTaller));
        this.load.image(Object.Spike, images.getLink(Object.Spike));
        this.load.image(Object.Rock, images.getLink(Object.Rock));
        this.load.image(Object.Ladder, images.getLink(Object.Ladder));
        this.load.image(Object.ColorChunk, images.getLink(Object.ColorChunk));

        // Load level json
        this.load.json('levels', 'assets/levels.json');
    }

    playMusic() {
        music = this.sound.add(Sound.GameSoundtrack, { loop: true, volume: 0 });

        let scene = this;
        music.play();

        setTimeout(function () {
            scene.tweens.add({
                targets: music,
                volume: 0.1,
                duration: 750
            });
        }, 250);
    }

    create() {
        collectColorSound = this.sound.add(Sound.CollectColor, { loop: false, volume: 0.1 });

        this.cameras.main.fadeIn(250, 0, 0, 0)

        // Tool used to have smooth movement using delta
        // The passed value is the game speed
        smoothedControls = new SmoothedHorizontalControls(0.05);

        // Sets a background rectangle that will render the current color
        color = this.add.rectangle(level.renderPosition.x, level.renderPosition.y, level.size.width, level.size.height, level.color)
            .setOrigin(level.origin.x, level.origin.y);
        color.setDepth(-10);

        let paddingSize = 5000;
        let extraPadding = 150;
        let paddingColor = Color.Black;

        rightEdge = this.add.rectangle(level.renderPosition.x + level.size.width / 2 + paddingSize / 2 - extraPadding, level.renderPosition.y, paddingSize, level.size.height + paddingSize, paddingColor);
        rightEdge.setDepth(-4);
        leftEdge = this.add.rectangle(level.renderPosition.x - level.size.width / 2 - paddingSize / 2 + extraPadding, level.renderPosition.y, paddingSize, level.size.height + paddingSize, paddingColor);
        leftEdge.setDepth(-4);
        topEdge = this.add.rectangle(level.renderPosition.x, level.renderPosition.y - level.size.height / 2 - paddingSize / 2 + extraPadding, level.size.width + paddingSize, paddingSize, paddingColor);
        topEdge.setDepth(-4);
        bottomEdge = this.add.rectangle(level.renderPosition.x, level.renderPosition.y + level.size.height / 2 + paddingSize / 2 - extraPadding, level.size.width + paddingSize, paddingSize, paddingColor);
        bottomEdge.setDepth(-4);

        // Creates and renders the player
        this.createPlayer();

        // Creates and renders the level
        this.createLevel();


        player.setCollisionCategory(collidableObjects);

        // Creates the camera
        this.createCamera();

        // Create and binds the keys
        cursors = this.input.keyboard.createCursorKeys();
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // Go Left
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); // Go Right
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // Go through door
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE); // Color 1
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO); // Color 2
        key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE); // Color 3
        key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR); // Color 4
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // Jump
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER); // Enter
        keyEscape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC); // Enter
        keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT); // Shift

        // Collision detection for jumps
        this.matter.world.on('collisionstart', function (event) {
            //  Loop through all of the collision pairs
            var pairs = event.pairs;

            for (var i = 0; i < pairs.length; i++) {
                var bodyA = pairs[i].bodyA;
                var bodyB = pairs[i].bodyB;

                //  We only want sensor collisions
                if (pairs[i].isSensor) {
                    var blockBody;
                    var playerBody;

                    if (bodyA.isSensor) {
                        blockBody = bodyB;
                        playerBody = bodyA;
                    }
                    else if (bodyB.isSensor) {
                        blockBody = bodyA;
                        playerBody = bodyB;
                    }

                    if (playerBody.label === 'bottom' && blockBody.label !== Object.Door) {
                        if (blockBody.label === Object.Spike) {
                            player.isDead = true;
                        }

                        canJump = true;
                    }

                    if (playerBody.label == 'top') {
                        if ((blockBody.label === Object.Spike && player.body.velocity.y < 0) ||
                            (blockBody.label === Object.Rock && (blockBody.velocity.y < -5 || blockBody.velocity.x > 10))) {
                            player.isDead = true;
                        }
                    }
                }
            }

        });

        colorCircle = this.add.circle(this.gradientPosition.x, this.gradientPosition.y, this.radius, this.currentColor);
        colorCircle.setDepth(-6);

        this.scene.launch(SceneName.Controls, { playerColors: this.playerColors, fadeIn: true });
    }

    /**
     * Update logic ran every frame
     * @param {*} time ?
     * @param {*} delta delta time
     */
    update(time, delta) {
        colorCircle.x = this.gradientPosition.x;
        colorCircle.y = this.gradientPosition.y;
        colorCircle.fillColor = this.currentColor;
        colorCircle.radius = this.radius;

        // Reset so that verticality is not affected by horizontal movement    
        if (listOfCrates.length > 0) {
            listOfCrates.forEach(crate => {
                crate.setAngle(0);
            });
        }

        player.setAngle(0);

        // Reset velocity so that player doesn't keep going after letting go of movement keys
        player.setVelocityX(0);

        // Checks if the player is dead
        if (player.isDead) {
            if (!player.isDying) {
                this.cameras.main.fadeOut(100, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    this.scene.start(SceneName.Play, { level: level.id, playerColors: this.playerColors });
                })
                player.isDying = true;
            }
            return;
        }

        // Move left logic
        if (keyA.isDown) {
            // Calculates a value from 0 to 1 based on the delta         
            smoothedControls.moveLeft(delta);

            // Gets old velocity
            var oldV = player.body.velocity.x;

            // Sets the target velocity
            var targetV = -30;

            // Calculates a linear interpolation between the old and target velocity over the smoothedControls value
            var newV = Phaser.Math.Linear(oldV, targetV, -smoothedControls.value)

            // Sets the new velocity
            player.setVelocityX(newV);

            // Flips the player sprite for moving left
            player.flipX = true;

            // Plays the walk animation if the player is on the ground
            if (canJump) {
                player.play(PlayerAnimation.Walk, true);
            }
        }
        // Move right logic
        else if (keyD.isDown) {
            // Calculates a value from 0 to 1 based on the delta
            smoothedControls.moveRight(delta);

            // Gets old velocity
            var oldV = player.body.velocity.x;

            // Sets the target velocity
            var targetV = 30;

            // Calculates a linear interpolation between the old and target velocity over the smoothedControls value
            var newV = Phaser.Math.Linear(oldV, targetV, smoothedControls.value)

            // Sets the new velocity
            player.setVelocityX(newV);

            // Resets the flipped player sprite for moving right
            player.flipX = false;

            // Plays the walk animation if the player is on the ground
            if (canJump) {
                player.play(PlayerAnimation.Walk, true);
            }
        }
        // Idle logic
        else if (canJump) {
            player.play(PlayerAnimation.Idle, true);
            smoothedControls.value = 0;
        }

        let fps = delta / targetFramerate;
        if (fps < 1) {
            // console.log(fps);
        }
        // Jump logic
        if (keySpace.isDown && canJump) {
            // Plays the jump animation
            player.play(PlayerAnimation.Jump);

            // Sets the player to not be able to jump again until they hit the ground
            canJump = false;

            // Velocity is reset so that the player doesn't have a higher jump if they jump in quick succession
            player.setVelocity(0);
            smoothedControls.jump(delta);
            var oldV = player.body.velocity.y;
            var targetV = -70;
            var newV = Phaser.Math.Linear(oldV, targetV, smoothedControls.vValue);
            player.setVelocityY(newV);
        }

        // Fall logic
        if (player.body.position.y < lastHeight && !canJump) {
            player.play(PlayerAnimation.Fall);
        }
        lastHeight = player.body.position.y;

        // Door Logic
        if (keyW.isDown) {
            if (this.matter.overlap(entrance, [player])) {
                if (entrance.tintBottomLeft != this.currentColor)
                    this.previousLevel();
            }
            if (this.matter.overlap(exit, [player])) {
                if (exit.tintBottomLeft != this.currentColor)
                    this.nextLevel();
            }

            if (listOfLadders.length > 0) {
                listOfLadders.forEach(ladder => {
                    if (this.matter.overlap(ladder.body, player)) {
                        player.setVelocityY(-0);
                        player.setVelocityY(-30 * (delta / targetFramerate));
                        canJump = true;
                    }
                })
            }
        }

        // Crate logic
        if (keyShift.isDown) {
            listOfCrates.forEach(crate => {
                crate.body.parts.forEach(part => {
                    if (part.isSensor && this.matter.overlap(part, [player])) {
                        crate.setVelocityX(player.body.velocity.x);
                    }
                })
            })
        }


        // Options logic
        if (keyEscape.isDown) {
            this.scene.pause(SceneName.Play);
            this.scene.pause(SceneName.Controls);
            this.scene.launch("options", { color: this.currentColor, music: music });
        }

        // Color swapping logic
        if (key1.isDown) {
            if (this.playerColors.includes(this.allColors[0]) && this.currentColor != this.allColors[0])
                this.changeColor(this.allColors[0], player.body.position);
        }
        if (key2.isDown) {
            if (this.playerColors.includes(this.allColors[1]) && this.currentColor != this.allColors[1])
                this.changeColor(this.allColors[1], player.body.position);
        }
        if (key3.isDown) {
            if (this.playerColors.includes(this.allColors[2]) && this.currentColor != this.allColors[2])
                this.changeColor(this.allColors[2], player.body.position);
        }
        if (key4.isDown) {
            if (this.playerColors.includes(this.allColors[3]) && this.currentColor != this.allColors[3])
                this.changeColor(this.allColors[3], player.body.position);
        }

        // Temporary level swapping logic
        if (cursors.up.isDown) {
            this.nextLevel();
        }
        if (cursors.down.isDown) {
            this.previousLevel();
        }

        if (!collectedColor) {
            if (this.matter.overlap(newColorSlice, [player])) {
                collectedColor = true;
                var tween = this.tweens.add({
                    targets: newColorSlice,
                    scale: 1.5,
                    duration: 1000,
                    onComplete: () => {
                        collectColorSound.play();
                        newColorSlice.destroy();
                        if (this.playerColors.length < 4)
                            this.playerColors.push(level.newColor);
                        this.scene.stop(SceneName.Controls);
                        this.scene.launch(SceneName.Controls, { playerColors: this.playerColors, fadeIn: false });
                    }
                });
            }
        }

    }

    /**
     * Color changing logic
     * @param {*} c The new color
     */
    changeColor(c, position, enterLevel = false) {
        //can't transition if we're already transitioning
        if (this.transition)
            return;

        this.currentColor = c;
        background.setTint(this.currentColor);

        this.radius = 0;

        if (!enterLevel) {

            this.transition = true;
            this.gradientPosition = position;

            this.tweens.add({
                targets: this,
                radius: this.maxRadius,
                duration: this.colorTransitionDuration,
                onComplete: () => {
                    this.transition = false;
                    this.radius = 0;
                    color.setFillStyle(this.currentColor);
                }
            })
        }
        else {
            color.setFillStyle(this.currentColor);
        }

        // Makes objects not collidable if they have the same color as the background 
        if (listOfObjects.length !== 0) {
            listOfObjects.forEach(object => {
                if (object.tintBottomLeft === this.currentColor) {
                    object.setVisible(false);
                    object.setCollisionCategory(nonCollidableObjects);
                    object.setCollidesWith([nonCollidableObjects, levelGroup]);
                }
                else {
                    object.setVisible(true);
                    object.setCollisionCategory(collidableObjects);
                    object.setCollidesWith([collidableObjects, levelGroup]);
                }
            })
        }
    }

    /**
     * Creates the player
     */
    createPlayer() {
        // Player Animations
        const player_idle = this.anims.create({
            key: PlayerAnimation.Idle,
            frames: this.anims.generateFrameNumbers(ImageName.CharacterIdle,
                {
                    start: 0,
                    end: 11
                }),
            frameRate: 10,
            yoyo: true,
            repeat: -1
        });

        const player_walking = this.anims.create({
            key: PlayerAnimation.Walk,
            frames: this.anims.generateFrameNumbers(ImageName.CharacterWalking,
                {
                    start: 0,
                    end: 11
                }),
            frameRate: 30,
            repeat: -1,
            yoyo: true
        });
        const player_jumping = this.anims.create({
            key: PlayerAnimation.Jump,
            frames: this.anims.generateFrameNumbers(ImageName.CharacterIdle,
                {
                    start: 0,
                    end: 11
                }),
            frameRate: 10,
            repeat: -1,
            yoyo: true
        });
        const player_falling = this.anims.create({
            key: PlayerAnimation.Fall,
            frames: this.anims.generateFrameNumbers(ImageName.CharacterIdle,
                {
                    start: 0,
                    end: 11
                }),
            frameRate: 10,
            repeat: -1,
            yoyo: true
        });

        // Player Creation
        // Create a composite body with a sensor at the bottom to check for jumps
        var Bodies = Phaser.Physics.Matter.Matter.Bodies;
        var body = Bodies.rectangle(192, 192, 240, 425);
        var bottom = Bodies.rectangle(192, 405, 60, 1.2, { isSensor: true, label: 'bottom' });
        var top = Bodies.rectangle(192, 0, 240, 1.2, { isSensor: true, label: 'top' });

        // Combine the body and the sensor
        var compoundBody = Phaser.Physics.Matter.Matter.Body.create({
            parts: [body, bottom, top]
        });

        // Set the player's values
        player = this.matter.add.sprite(0, 0, ImageName.CharacterIdle, null)
            .setExistingBody(compoundBody)
            .setFixedRotation()
            .setScale(0.5)
            .setPosition(level.startPosition.x, level.startPosition.y)
            .setDepth(5)
            .setOrigin(0.5, 0.5)
            .play(PlayerAnimation.Idle);
        player.isDying = false;


    }

    createCamera() {
        // Set camera
        camera = this.cameras.main;
        camera
            .setBounds(0, 0, level.size.width, level.size.height) // This changes per level
            .startFollow(player, true, 0.5, 0.5)
            .setZoom(0.3); // Reset to 0.75
    }

    /**
     * Creates the level and the objects
     */
    createLevel() {
        // Add Objects
        level.objects.forEach(object => {
            var obj;
            // Finish the level
            if (object.type === Object.Rectangle) {
                obj = this.matter.add.rectangle(object.position.x, object.position.y, object.dimensions.width, object.dimensions.height, { isStatic: true });
            }

            // Crate logic
            if (object.type === Object.Crate) {
                // Creates the sensors for the crate
                var Bodies = Phaser.Physics.Matter.Matter.Bodies;
                var body = Bodies.rectangle(object.dimensions.width / 2, object.dimensions.height / 2, object.dimensions.width, object.dimensions.height);
                var left = Bodies.rectangle(0, object.dimensions.height / 2, 100, object.dimensions.width, { isSensor: true, label: 'left' });
                var right = Bodies.rectangle(object.dimensions.width, object.dimensions.height / 2, 100, object.dimensions.height, { isSensor: true, label: 'right' });

                // Creates the compound body
                var compoundBody = Phaser.Physics.Matter.Matter.Body.create({
                    parts: [body, left, right]
                });

                // Sets the new body to the crate
                obj = this.matter.add.image(0, 0, object.type, null)
                    .setExistingBody(compoundBody)
                    .setPosition(object.position.x, object.position.y) // Sets the position of the object
                    .setFriction(2); // Sets bigger friction so crate doesn't glide

                listOfCrates.push(obj);
            }
            else {
                // Create the object
                obj = this.matter.add.image(object.position.x, object.position.y, object.type, null);

                if (object.type === Object.Rock) {
                    obj.setCircle();
                }

                obj.body.label = object.type;

                // Door logic
                if (object.type == Object.Door) {
                    obj.setSensor(true);
                    if (object.label === Doors.Entrance) {
                        if (object.doNothing === true) {
                            this.doNothing = true;
                        }
                        entrance = obj;
                    }
                    else {
                        exit = obj;
                        if (this.doNothing) {
                            entrance = exit;
                        }
                    }
                }

                if (object.type === Object.Ladder) {
                    obj.setSensor(true);
                    listOfLadders.push(obj);
                }
            }

            obj.setTint(object.color) // Changes the white parts to the correct color
                .setAngle(object.angle) // Sets the angle
                .setStatic(object.isStatic) // Sets static || dynamic
                .setCollisionCategory(collidableObjects); // Sets collision group

            // Adds object to the list of objects
            listOfObjects.push(obj);
        });


        // Create level
        var levels = this.cache.json.get('levels');
        background = this.matter.add.image(level.renderPosition.x, level.renderPosition.y, level.label, 0, { shape: levels[level.label] })
            .setOrigin(level.origin.x, level.origin.y)
            .setStatic(true);
        background.setCollisionCategory(levelGroup);
        background.setCollidesWith([collidableObjects, nonCollidableObjects]);

        this.transition = false;
        this.changeColor(level.color, this.gradientPosition, true);

        collectedColor = true;
        if (level.id == LevelId.NewColor && level.newColor != undefined && !this.playerColors.includes(level.newColor)) {

            collectedColor = false;
            newColorSlice = this.matter.add.image(level.newColorPosition.x, level.newColorPosition.y, Object.ColorChunk);
            newColorSlice.setStatic(true);
            newColorSlice.setCollisionCategory(nonCollidableObjects);
            newColorSlice.setCollidesWith([nonCollidableObjects]);
            newColorSlice.depth = 10;
            newColorSlice.setTint(level.newColor);
            newColorSlice.setSensor(true);
        }
    }

    previousLevel() {

        //if on first level, dont do anything
        if (level.previousLevelId == undefined) {
            return;
        }

        let levelData = {
            level: level.previousLevelId,
            playerColors: this.playerColors
        };

        if (level.previousLevelId === LevelId.NewColor) {
            levelData.levelTo = level.id;
            levelData.levelFrom = level.levelFrom
            if (this.playerColors.length == 0) {
                levelData.newColor = this.allColors[this.playerColors.length];
            }
        }

        this.scene.start(SceneName.Play, levelData);
        ProgressManager.saveProgress(levelData);
    }

    nextLevel() {

        if (level.nextLevelId === LevelId.EndCredits) {
            this.cameras.main.fadeOut(250, 0, 0, 0);
            this.tweens.add({
                targets: music,
                volume: 0,
                duration: 250,
                onComplete: () => {
                    this.scene.stop(SceneName.Play);
                    this.scene.stop(SceneName.Controls);
                    this.scene.start(SceneName.EndCredits);
                    music.stop();
                }
            });

        }
        else {
            let levelData = {
                level: level.nextLevelId,
                playerColors: this.playerColors,
            };

            if (level.nextLevelId === LevelId.NewColor) {
                levelData.levelTo = level.levelTo;
                levelData.levelFrom = level.id;

                if (!this.playerColors.includes(level.newColor)) {
                    levelData.newColor = level.newColor;
                }
            }

            this.scene.start(SceneName.Play, levelData)
            ProgressManager.saveProgress(levelData);
        }
    }
}