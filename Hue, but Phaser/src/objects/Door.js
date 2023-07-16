import Rectangle from './Rectangle.js';

export default class Door extends Rectangle {
    constructor(parameters){
        super(parameters);
        this.label = parameters.label;
    }
}