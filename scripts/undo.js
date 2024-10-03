"use strict";

const undobutton = document.getElementById("undoBtn");
undobutton?.addEventListener("click", undo);
document.addEventListener("keydown", undoWithU);
/**
 * Method that undo the last movement of the player.
 * keycode u is 85.
 */
function undo() {
    // eslint-disable-next-line no-param-reassign
    if (states[states.length - 1]._posiP !== null) {
        const player = getPlayerPosition();
        // @ts-ignore
        getSquareAt(player)?.setPlayerOff();
        const oldP = states[states.length - 1]._posiP;
        getSquareAt(oldP)?.setPlayerOn();
    }
    if (states[states.length - 1]._posiB !== null) {
        const oldB = states[states.length - 1]._posiB;
        const bx = oldB.getX;
        const by = oldB.getY;
        if (getSquareAt(oldB)?._Name === "target") {
            if (getSquareAt(new Position(bx + 1, by))?._Name === "posed") {
                getSquareAt(new Position(bx + 1, by))?.setName("target");
            } else if (getSquareAt(new Position(bx - 1, by))?._Name === "posed") {
                getSquareAt(new Position(bx - 1, by))?.setName("target");
            } else if (getSquareAt(new Position(bx, by - 1))?._Name === "posed") {
                getSquareAt(new Position(bx, by - 1))?.setName("target");
            } else if (getSquareAt(new Position(bx, by + 1))?._Name === "posed") {
                getSquareAt(new Position(bx, by + 1))?.setName("target");
            } else if (getSquareAt(new Position(bx, by - 1))?._Name === "box") {
                getSquareAt(new Position(bx, by - 1))?.setName("nothing");
            } else if (getSquareAt(new Position(bx, by + 1))?._Name === "box") {
                getSquareAt(new Position(bx, by + 1))?.setName("nothing");
            } else if (getSquareAt(new Position(bx + 1, by))?._Name === "box") {
                getSquareAt(new Position(bx + 1, by))?.setName("nothing");
            } else if (getSquareAt(new Position(bx - 1, by))?._Name === "box") {
                getSquareAt(new Position(bx - 1, by))?.setName("nothing");
            }
            getSquareAt(oldB)?.setName("posed");
        }
        if (getSquareAt(oldB)?._Name === "nothing") {
            if (getSquareAt(new Position(bx + 1, by))?._Name === "box") {
                getSquareAt(new Position(bx + 1, by))?.setName("nothing");
            } else if (getSquareAt(new Position(bx - 1, by))?._Name === "box") {
                getSquareAt(new Position(bx - 1, by))?.setName("nothing");
            } else if (getSquareAt(new Position(bx, by - 1))?._Name === "box") {
                getSquareAt(new Position(bx, by - 1))?.setName("nothing");
            } else if (getSquareAt(new Position(bx, by + 1))?._Name === "box") {
                getSquareAt(new Position(bx, by + 1))?.setName("nothing");
            } else if (getSquareAt(new Position(bx, by - 1))?._Name === "posed") {
                getSquareAt(new Position(bx, by - 1))?.setName("target");
            } else if (getSquareAt(new Position(bx, by + 1))?._Name === "posed") {
                getSquareAt(new Position(bx, by + 1))?.setName("target");
            } else if (getSquareAt(new Position(bx + 1, by))?._Name === "posed") {
                getSquareAt(new Position(bx + 1, by))?.setName("target");
            } else if (getSquareAt(new Position(bx - 1, by))?._Name === "posed") {
                getSquareAt(new Position(bx - 1, by))?.setName("target");
            }
            getSquareAt(oldB)?.setName("box");
        }
    }
    states.pop();
    display();
    nbMoves--;
}

/**
 * @param {*} e
 */
function undoWithU(e) {
    // eslint-disable-next-line no-param-reassign
    e = e || window.event;
    startNext();
    if (e.keyCode === 85) {
        undo();
    }
}
