export default class SmoothedHorizontalControls{
    constructor(speed)
    {
        this.msSpeed = speed;
        this.value = 0;
        this.vValue = 0;
    }

    moveLeft(delta)
    {
        if (this.value > 0) { this.value = 0 }
        this.value -= this.msSpeed * delta;
        if (this.value < -1) { this.value = -1; }
    }

    moveRight(delta)
    {
        if (this.value < 0) { this.value = 0 }
        this.value += this.msSpeed * delta;
        if (this.value > 1) { this.value = 1; }
    }

    jump(delta) {
        if (this.vValue < 0) { this.vValue = 0 }
        this.vValue += this.msSpeed * delta;
        if (this.vValue > 1) { this.vValue = 1; }
    }
};