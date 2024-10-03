"use strict";

/**
 * @type {square[][]}
 */
let listSquare = [];

/**
 * @type {square[]}
 */
let rowSquare = [];

/**
 * @type {number}
 */
let level = 0;
/**
 * @type {State[]}
 */
let states = [];

/**
 * number of movement the player made.
 */
let nbMoves = 0;

document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete") {
        buildLevel(level);
    }
});

// @ts-ignore
document.getElementById("retryBtn").onclick = function() {
    buildLevel(level);
};

/**
 * Method that build the game
 * @param {number} lvl
 */
function buildLevel(lvl) {
    states = [];
    nbMoves = 0;
    document.addEventListener("keydown", move);
    $("#world").empty();
    listSquare = [];
    let x = 0;
    for (let y = 0; y < levels[lvl].map.length; y++) {
        rowSquare = [];
        x = 0;
        for (const j of levels[lvl].map[y]) {
            if (j === "#") {
                const pos = new Position(x, y);
                const box = new square(pos, "box", false);
                rowSquare.push(box);
            } else if (j === "x") {
                const pos = new Position(x, y);
                const box = new square(pos, "target", false);
                rowSquare.push(box);
            } else if (j === "@") {
                const pos = new Position(x, y);
                const box = new square(pos, "posed", false);
                rowSquare.push(box);
            } else if (j === " ") {
                const pos = new Position(x, y);
                const box = new square(pos, "nothing", false);
                rowSquare.push(box);
            } else if (j === "🧍") {
                const pos = new Position(x, y);
                const box = new square(pos, "nothing", true);
                rowSquare.push(box);
            } else {
                const pos = new Position(x, y);
                const box = new square(pos, "other", false);
                rowSquare.push(box);
            }
            x++;
        }
        listSquare.push(rowSquare);
    }
    display();
}
/**
 * Method that
 * @returns the current position of the player
 */
// eslint-disable-next-line consistent-return
function getPlayerPosition() {
    for (let i = 0; i < listSquare.length; i++) {
        for (let j = 0; j < listSquare[0].length; j++) {
            if (listSquare[i][j]._isPlayerOn === true) {
                return listSquare[i][j].getPosition;
            }
        }
    }
}

/**
 * method that return the square at the (param) position.
 * @param {Position} position
 */
// eslint-disable-next-line consistent-return
function getSquareAt(position) {
    for (let i = 0; i < listSquare.length; i++) {
        for (let j = 0; j < listSquare[0].length; j++) {
            if (listSquare[i][j]._Position.getX === position.getX &&
                listSquare[i][j]._Position.getY === position.getY) {
                return listSquare[i][j];
            }
        }
    }
}
// ***** Movement ***** \\
/**
 * @param {*} e
 */
function move(e) {
    // eslint-disable-next-line no-param-reassign
    e = e || window.event;
    const px = Number(getPlayerPosition()?.getX);
    const py = Number(getPlayerPosition()?.getY);
    if (e.keyCode === 38 && (getSquareAt(new Position(px, py - 1))?._Name === "nothing"
    || getSquareAt(new Position(px, py - 1))?._Name === "box" || getSquareAt(new Position(px, py - 1))?._Name === "target"
    || getSquareAt(new Position(px, py - 1))?._Name === "posed")) {
        //up arrow
        //---BOX---\\
        if (getSquareAt(new Position(px, py - 1))?._Name === "box" && getSquareAt(new Position(px, py - 2))?._Name === "nothing") {
            // @ts-ignore
            const state = new State(getPlayerPosition(), new Position(px, py - 1));
            states.push(state);
            getSquareAt(new Position(px, py - 1))?.setPlayerOn();
            getSquareAt(new Position(px, py - 1))?.setName("nothing");
            getSquareAt(new Position(px, py - 2))?.setName("box");
            getSquareAt(new Position(px, py))?.setPlayerOff();
            incrMoves();
        } else if (getSquareAt(new Position(px, py - 1))?._Name === "box" && getSquareAt(new Position(px, py - 2))?._Name === "target") {
            // @ts-ignore
            const state = new State(getPlayerPosition(), new Position(px, py - 1));
            states.push(state);
            getSquareAt(new Position(px, py - 1))?.setPlayerOn();
            getSquareAt(new Position(px, py - 1))?.setName("nothing");
            getSquareAt(new Position(px, py - 2))?.setName("posed");
            getSquareAt(new Position(px, py))?.setPlayerOff();
            incrMoves();
            //---POSED---\\
        } else if (getSquareAt(new Position(px, py - 1))?._Name === "posed" && getSquareAt(new Position(px, py - 2))?._Name === "target") {
            // @ts-ignore
            const state = new State(getPlayerPosition(), new Position(px, py - 1));
            states.push(state);
            getSquareAt(new Position(px, py - 1))?.setPlayerOn();
            getSquareAt(new Position(px, py - 1))?.setName("target");
            getSquareAt(new Position(px, py - 2))?.setName("posed");
            getSquareAt(new Position(px, py))?.setPlayerOff();
            incrMoves();
            //---NOTHING---\\
        } else if (getSquareAt(new Position(px, py - 1))?._Name === "posed" && getSquareAt(new Position(px, py - 2))?._Name === "nothing") {
            // @ts-ignore
            const state = new State(getPlayerPosition(), new Position(px, py - 1));
            states.push(state);
            getSquareAt(new Position(px, py - 1))?.setPlayerOn();
            getSquareAt(new Position(px, py - 1))?.setName("target");
            getSquareAt(new Position(px, py - 2))?.setName("box");
            getSquareAt(new Position(px, py))?.setPlayerOff();
            incrMoves();
        } else if (getSquareAt(new Position(px, py - 1))?._Name === "nothing") {
            // @ts-ignore
            const state = new State(getPlayerPosition());
            states.push(state);
            getSquareAt(new Position(px, py - 1))?.setPlayerOn();
            getSquareAt(new Position(px, py))?.setPlayerOff();
            incrMoves();
            //---TARGET---\\
        } else if (getSquareAt(new Position(px, py - 1))?._Name === "target") {
            // @ts-ignore
            const state = new State(getPlayerPosition());
            states.push(state);
            getSquareAt(new Position(px, py - 1))?.setPlayerOn();
            getSquareAt(new Position(px, py))?.setPlayerOff();
            incrMoves();
        }
    } else if (e.keyCode === 40 && (getSquareAt(new Position(px, py + 1))?._Name === "nothing"
     || getSquareAt(new Position(px, py + 1))?._Name === "box" || getSquareAt(new Position(px, py + 1))?._Name === "target"
     || getSquareAt(new Position(px, py + 1))?._Name === "posed")) {
        //down arrow
        if (getSquareAt(new Position(px, py + 1))?._Name === "box" && getSquareAt(new Position(px, py + 2))?._Name === "nothing") {
            // @ts-ignore
            const state = new State(getPlayerPosition(), new Position(px, py + 1));
            states.push(state);
            getSquareAt(new Position(px, py + 1))?.setPlayerOn();
            getSquareAt(new Position(px, py + 1))?.setName("nothing");
            getSquareAt(new Position(px, py + 2))?.setName("box");
            getSquareAt(new Position(px, py))?.setPlayerOff();
            incrMoves();
        } else if (getSquareAt(new Position(px, py + 1))?._Name === "box" && getSquareAt(new Position(px, py + 2))?._Name === "target") {
            // @ts-ignore
            const state = new State(getPlayerPosition(), new Position(px, py + 1));
            states.push(state);
            getSquareAt(new Position(px, py + 1))?.setPlayerOn();
            getSquareAt(new Position(px, py + 1))?.setName("nothing");
            getSquareAt(new Position(px, py + 2))?.setName("posed");
            getSquareAt(new Position(px, py))?.setPlayerOff();
            incrMoves();
        } else if (getSquareAt(new Position(px, py + 1))?._Name === "posed" && getSquareAt(new Position(px, py + 2))?._Name === "target") {
            // @ts-ignore
            const state = new State(getPlayerPosition(), new Position(px, py + 1));
            states.push(state);
            getSquareAt(new Position(px, py + 1))?.setPlayerOn();
            getSquareAt(new Position(px, py + 1))?.setName("target");
            getSquareAt(new Position(px, py + 2))?.setName("posed");
            getSquareAt(new Position(px, py))?.setPlayerOff();
            incrMoves();
        } else if (getSquareAt(new Position(px, py + 1))?._Name === "posed" && getSquareAt(new Position(px, py + 2))?._Name === "nothing") {
            // @ts-ignore
            const state = new State(getPlayerPosition(), new Position(px, py + 1));
            states.push(state);
            getSquareAt(new Position(px, py + 1))?.setPlayerOn();
            getSquareAt(new Position(px, py + 1))?.setName("target");
            getSquareAt(new Position(px, py + 2))?.setName("box");
            getSquareAt(new Position(px, py))?.setPlayerOff();
            incrMoves();
        } else if (getSquareAt(new Position(px, py + 1))?._Name === "nothing") {
            // @ts-ignore
            const state = new State(getPlayerPosition());
            states.push(state);
            getSquareAt(new Position(px, py + 1))?.setPlayerOn();
            getSquareAt(new Position(px, py))?.setPlayerOff();
            incrMoves();
        } else if (getSquareAt(new Position(px, py + 1))?._Name === "target") {
            // @ts-ignore
            const state = new State(getPlayerPosition());
            states.push(state);
            getSquareAt(new Position(px, py + 1))?.setPlayerOn();
            getSquareAt(new Position(px, py))?.setPlayerOff();
            incrMoves();
        }
    } else if (e.keyCode === 37 && (getSquareAt(new Position(px - 1, py))?._Name === "nothing"
     || getSquareAt(new Position(px - 1, py))?._Name === "box" || getSquareAt(new Position(px - 1, py))?._Name === "target"
     || getSquareAt(new Position(px - 1, py))?._Name === "posed")) {
        //left arrow
        if (getSquareAt(new Position(px - 1, py))?._Name === "box" && getSquareAt(new Position(px - 2, py))?._Name === "nothing") {
            // @ts-ignore
            const state = new State(getPlayerPosition(), new Position(px - 1, py));
            states.push(state);
            getSquareAt(new Position(px - 1, py))?.setPlayerOn();
            getSquareAt(new Position(px - 1, py))?.setName("nothing");
            getSquareAt(new Position(px - 2, py))?.setName("box");
            getSquareAt(new Position(px, py))?.setPlayerOff();
            incrMoves();
        } else if (getSquareAt(new Position(px - 1, py))?._Name === "box" && getSquareAt(new Position(px - 2, py))?._Name === "target") {
            // @ts-ignore
            const state = new State(getPlayerPosition(), new Position(px - 1, py));
            states.push(state);
            getSquareAt(new Position(px - 1, py))?.setPlayerOn();
            getSquareAt(new Position(px - 1, py))?.setName("nothing");
            getSquareAt(new Position(px - 2, py))?.setName("posed");
            getSquareAt(new Position(px, py))?.setPlayerOff();
            incrMoves();
        } else if (getSquareAt(new Position(px - 1, py))?._Name === "posed" && getSquareAt(new Position(px - 2, py))?._Name === "target") {
            // @ts-ignore
            const state = new State(getPlayerPosition(), new Position(px - 1, py));
            states.push(state);
            getSquareAt(new Position(px - 1, py))?.setPlayerOn();
            getSquareAt(new Position(px - 1, py))?.setName("target");
            getSquareAt(new Position(px - 2, py))?.setName("posed");
            getSquareAt(new Position(px, py))?.setPlayerOff();
            incrMoves();
        } else if (getSquareAt(new Position(px - 1, py))?._Name === "posed" && getSquareAt(new Position(px - 2, py))?._Name === "nothing") {
            // @ts-ignore
            const state = new State(getPlayerPosition(), new Position(px - 1, py));
            states.push(state);
            getSquareAt(new Position(px - 1, py))?.setPlayerOn();
            getSquareAt(new Position(px - 1, py))?.setName("target");
            getSquareAt(new Position(px - 2, py))?.setName("box");
            getSquareAt(new Position(px, py))?.setPlayerOff();
            incrMoves();
        } else if (getSquareAt(new Position(px - 1, py))?._Name === "nothing") {
            // @ts-ignore
            const state = new State(getPlayerPosition());
            states.push(state);
            getSquareAt(new Position(px - 1, py))?.setPlayerOn();
            getSquareAt(new Position(px, py))?.setPlayerOff();
            incrMoves();
        } else if (getSquareAt(new Position(px - 1, py))?._Name === "target") {
            // @ts-ignore
            const state = new State(getPlayerPosition());
            states.push(state);
            getSquareAt(new Position(px - 1, py))?.setPlayerOn();
            getSquareAt(new Position(px, py))?.setPlayerOff();
            incrMoves();
        }
    } else if (e.keyCode === 39 && (getSquareAt(new Position(px + 1, py))?._Name === "nothing"
     || getSquareAt(new Position(px + 1, py))?._Name === "box" || getSquareAt(new Position(px + 1, py))?._Name === "target"
     || getSquareAt(new Position(px + 1, py))?._Name === "posed")) {
        //right arrow
        if (getSquareAt(new Position(px + 1, py))?._Name === "box" && getSquareAt(new Position(px + 2, py))?._Name === "nothing") {
            // @ts-ignore
            const state = new State(getPlayerPosition(), new Position(px + 1, py));
            states.push(state);
            getSquareAt(new Position(px + 1, py))?.setPlayerOn();
            getSquareAt(new Position(px + 1, py))?.setName("nothing");
            getSquareAt(new Position(px + 2, py))?.setName("box");
            getSquareAt(new Position(px, py))?.setPlayerOff();
            incrMoves();
        } else if (getSquareAt(new Position(px + 1, py))?._Name === "box" && getSquareAt(new Position(px + 2, py))?._Name === "target") {
            // @ts-ignore
            const state = new State(getPlayerPosition(), new Position(px + 1, py));
            states.push(state);
            getSquareAt(new Position(px + 1, py))?.setPlayerOn();
            getSquareAt(new Position(px + 1, py))?.setName("nothing");
            getSquareAt(new Position(px + 2, py))?.setName("posed");
            getSquareAt(new Position(px, py))?.setPlayerOff();
            incrMoves();
        } else if (getSquareAt(new Position(px + 1, py))?._Name === "posed" && getSquareAt(new Position(px + 2, py))?._Name === "target") {
            // @ts-ignore
            const state = new State(getPlayerPosition(), new Position(px + 1, py));
            states.push(state);
            getSquareAt(new Position(px + 1, py))?.setPlayerOn();
            getSquareAt(new Position(px + 1, py))?.setName("target");
            getSquareAt(new Position(px + 2, py))?.setName("posed");
            getSquareAt(new Position(px, py))?.setPlayerOff();
            incrMoves();
        } else if (getSquareAt(new Position(px + 1, py))?._Name === "posed" && getSquareAt(new Position(px + 2, py))?._Name === "nothing") {
            // @ts-ignore
            const state = new State(getPlayerPosition(), new Position(px + 1, py));
            states.push(state);
            getSquareAt(new Position(px + 1, py))?.setPlayerOn();
            getSquareAt(new Position(px + 1, py))?.setName("target");
            getSquareAt(new Position(px + 2, py))?.setName("box");
            getSquareAt(new Position(px, py))?.setPlayerOff();
            incrMoves();
        } else if (getSquareAt(new Position(px + 1, py))?._Name === "nothing") {
            // @ts-ignore
            const state = new State(getPlayerPosition());
            states.push(state);
            getSquareAt(new Position(px + 1, py))?.setPlayerOn();
            getSquareAt(new Position(px, py))?.setPlayerOff();
            incrMoves();
        } else if (getSquareAt(new Position(px + 1, py))?._Name === "target") {
            // @ts-ignore
            const state = new State(getPlayerPosition());
            states.push(state);
            getSquareAt(new Position(px + 1, py))?.setPlayerOn();
            getSquareAt(new Position(px, py))?.setPlayerOff();
            incrMoves();
        }
    }
    display();
}
/**
 * Method that show the display of the game
 */
function display() {
    $("#world").empty();
    for (let x = 0; x < listSquare.length; x++) {
        const row = document.createElement("div");
        row.setAttribute("class", "row");
        $("#world").append(row);
        for (let y = 0; y < listSquare[0].length; y++) {
            if (listSquare[x][y]._Name === "box") {
                const block = document.createElement("div");
                block.setAttribute("class", "square box");
                if (listSquare[x][y]._isPlayerOn === true) {
                    block.setAttribute("id", "player");
                }
                row.appendChild(block);
            } else if (listSquare[x][y]._Name === "target") {
                const block = document.createElement("div");
                block.setAttribute("class", "square target");
                if (listSquare[x][y]._isPlayerOn === true) {
                    block.setAttribute("id", "player");
                }
                row.appendChild(block);
            } else if (listSquare[x][y]._Name === "posed") {
                const block = document.createElement("div");
                block.setAttribute("class", "square posed");
                if (listSquare[x][y]._isPlayerOn === true) {
                    block.setAttribute("id", "player");
                }
                row.appendChild(block);
            } else if (listSquare[x][y]._Name === "nothing") {
                const block = document.createElement("div");
                block.setAttribute("class", "square nothing");
                if (listSquare[x][y]._isPlayerOn === true) {
                    block.setAttribute("id", "player");
                }
                row.appendChild(block);
            } else {
                const block = document.createElement("div");
                block.setAttribute("class", "square other");
                if (listSquare[x][y]._isPlayerOn === true) {
                    block.setAttribute("id", "player");
                }
                row.appendChild(block);
            }
        }
    }
    allOnTarget();
    displayDetails();
}

/**
 * Method that increment the counter for every movement the player made.
 */
function incrMoves() {
    nbMoves = nbMoves + 1;
    $("#cpt").text(`Moves : ${nbMoves}`);
}

function nbBoxe() {
    let nb = 0;
    for (let i = 0; i < listSquare.length; i++) {
        for (let j = 0; j < listSquare[0].length; j++) {
            if (listSquare[i][j]._Name === "box") {
                nb++;
            }
        }
    }
    return nb;
}
/**
 * Method that @returns if the level is finished.
 */
// eslint-disable-next-line consistent-return
function allOnTarget() {
    let nbBox = 0;
    nbBox = nbBoxe();
    if (nbBox === 0) {
        return true;
    } else {
        return false;
    }
}

document.addEventListener("keydown", finishLevel);
/**
 * Method that play the next level.
 * @param {*} e
 */
function finishLevel(e) {
    // eslint-disable-next-line no-param-reassign
    e = e || window.event;
    // @ts-ignore
    if (localStorage.getItem(`${level}`) > `${nbMoves}`) {
        localStorage.setItem(`${level}`, `${nbMoves}`);
    }
    startNext();
    if (allOnTarget() && e.keyCode === 32 && level < levels.length) {
        initLevel();
        buildLevel(level);
    } else if (level === levels.length) {
        displayEnd();
    }
}
/**
 * Method that initialise a new level.
 */
function initLevel() {
    nbMoves = 0;
    level = level + 1;
    return level;
}

/**
 * Method that show a message when we finish a level.
 */
function startNext() {
    if (allOnTarget()) {
        $("#world").empty();
        display();
        const message = document.createElement("div");
        const h3 = document.createElement("h3");
        h3.innerHTML = ` You win this level press space for the level ${level + 1} `;
        message.setAttribute("id", "message");
        message.append(h3);
        $("#world").append(message);
        document.removeEventListener("keydown", move);
    }
}

/**
 * Method that show a display when we finish the game.
 */
function displayEnd() {
    const message = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.innerHTML = " Nice ! \n you finish the game ";
    message.setAttribute("id", "message");
    message.append(h3);
    $("#world").empty();
    $("#world").append(message);
    document.removeEventListener("keydown", move);
}

/**
 * Method that show a display of the best nbMoves.
 */
function displayDetails() {
    const mess1 = document.createElement("h3");
    mess1.innerHTML = `Minimal movement : ${levels[level].best}`;
    const mess2 = document.createElement("h3");
    const bestScore = localStorage.getItem(`${level}`);
    mess2.innerHTML = `Best Scores : ${bestScore}`;
    $("#details").empty();
    $("#details").append(mess1);
    $("#details").append(mess2);
}
