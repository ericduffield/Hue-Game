export default class Level {
    constructor(parameters) {
        this.id = parameters.id;
        this.previousLevelId = parameters.previousLevelId;
        this.nextLevelId = parameters.nextLevelId;

        this.label = parameters.label;

        this.objects = parameters.objects;

        this.size = parameters.size;
        this.startPosition = parameters.startPosition;
        this.renderPosition = parameters.renderPosition;

        this.color = parameters.color;
        var o = parameters.origin;
        this.origin = o == null ? { x: 0.5, y: 0.5 } : o;

        this.levelTo = parameters.levelTo;
        this.levelFrom = parameters.levelFrom;

        this.newColor = parameters.newColor;
        this.newColorPosition = parameters.newColorPosition;
    }
}