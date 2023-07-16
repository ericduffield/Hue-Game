import GameObject from './GameObject.js';

export default class Rectangle extends GameObject {
    constructor(parameters){
        super(parameters);

        this.dimensions = parameters.dimensions;
        this.angle = parameters.angle;
    }
}