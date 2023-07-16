import GameObject from './GameObject.js';

export default class Circle extends GameObject {
    constructor(parameters){
        super(parameters);

        this.radius = parameters.radius;
    }
}