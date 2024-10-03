"use strict";

class Position {
/**
 * Constructor of Position
 * @param {number} posX
 * @param {number} posY
 */
    constructor(posX, posY) {
        this.x = posX;
        this.y = posY;
    }

    /**
     * Method that get the X
     */
    get getX() {
        return this.x;
    }

    /**
     * Method that get the Y
     */
    get getY() {
        return this.y;
    }
}
