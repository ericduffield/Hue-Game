import Graphic from "./Graphic.js";

export default class Images {
	constructor() {
		this.images = {};
	}

	load(imageDefinitions) {
		imageDefinitions.forEach((imageDefinition) => {
			this.images[imageDefinition.name] = new Graphic(
				imageDefinition.path,
				imageDefinition.width,
				imageDefinition.height
			);
		});
	}

	get(name) {
		return this.images[name];
	}

	getLink(name) {
		return "../../" + this.images[name].image.src.substr(22, this.images[name].image.src.length);
	}

	getDimensions(name){
		const info = {
			"width": this.images[name].width,
			"height": this.images[name].height,			
		};
		return info;
	}
}
