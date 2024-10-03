"use strict";

class square {
    /**
     * Constructor of a Square
     * @param {Position} position
     * @param {string} name
     * @param {boolean} isOn
     */
    constructor(position, name, isOn) {
        this._Position = position;
        this._Name = name;
        this._isPlayerOn = isOn;
    }

    /**
     * Method that get the Position
     */
    get getPosition() {
        return this._Position;
    }

    /**
     * Method that get the name
     */
    get getName() {
        return this._Name;
    }

    /**
     * Method that see if the square have the player on.
     */
    get isPlayerOn() {
        return this._isPlayerOn;
    }

    /**
     * method that set the name.
     * @param {string} newName
     */
    setName(newName) {
        this._Name = newName;
    }

    /**
     * Method that set the player on the square.
     */
    setPlayerOn() {
        this._isPlayerOn = true;
    }

    /**
     * Method that disable the player from the square.
     */
    setPlayerOff() {
        this._isPlayerOn = false;
    }
}
