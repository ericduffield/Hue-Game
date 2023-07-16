/**
 * Game Name
 *
 * Authors
 *
 * Brief description
 *
 * Asset sources
 */

import Game from "../lib/Game.js";
import {
	canvas,
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	fonts,
	images,
	keys,
	sounds,
	stateMachine,
	timer,
	stateStack,
} from "./globals.js";
import TitleScreenState from "./states/game/TitleScreenState.js";
import PlayState from "./states/game/PlayState.js";
import Colour from "./enums/Colour.js";

// Set the dimensions of the play area.
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.setAttribute('tabindex', '1'); // Allows the canvas to receive user input.

// Now that the canvas element has been prepared, we can add it to the DOM.
document.body.appendChild(canvas);

// Fetch the asset definitions from config.json.
const {
	images: imageDefinitions,
	fonts: fontDefinitions,
	sounds: soundDefinitions,
} = await fetch('./src/config.json').then((response) => response.json());

// Load all the assets from their definitions.
images.load(imageDefinitions);
fonts.load(fontDefinitions);
sounds.load(soundDefinitions);

// stateStack.push(new TitleScreenState());
stateStack.push(new PlayState(Colour.Grey)); //Change back to title screen

// Add event listeners for player input.
canvas.addEventListener('keydown', event => {
	keys[event.key] = true;
});

canvas.addEventListener('keyup', event => {

	//Have to do this or else get glitch where if holding shift when keyup on movement it keyups capital letter.
	//This makes lowercase stay true and run forever.
	if (event.key == "a" || event.key == "A") {
		keys["a"] = false;
		keys["A"] = false;
	}
	else if (event.key == "d" || event.key == "D") {
		keys["d"] = false;
		keys["D"] = false;
	}
	else {
		keys[event.key] = false;
	}
});

const game = new Game(stateStack, context, timer, canvas.width, canvas.height);

game.start();

// Focus the canvas so that the player doesn't have to click on it.
canvas.focus();
