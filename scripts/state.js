"use strict";
/**
 * Class that get the state of the game.
 */

class State {
    /**
     *
     * @param {Position} posiP : position of the player.
     * @param {Position} posiB : position of the box.
     */
    // @ts-ignore
    constructor(posiP, posiB = null) {
        this._posiP = posiP;
        this._posiB = posiB;
    }

    /**
     * method that get the position of the player.
     */
    get playerPosition() {
        const posP = {...this._posiP};
        return posP;
    }

    /**
     * method that get the position of the box.
     */
    get boxPosition() {
        const posB = {...this._posiB};
        return posB;
    }
}
