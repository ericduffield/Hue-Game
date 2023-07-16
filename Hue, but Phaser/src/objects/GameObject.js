export default class GameObject {
    constructor(parameters){
        this.position = parameters.position;
        this.isStatic = parameters.isStatic;    
        this.color = parameters.color;  
        this.isCollidable = parameters.isCollidable == null ? true : false;      
        this.type = parameters.type;
        this.angle = parameters.angle == null ? 0 : parameters.angle;
    }
}