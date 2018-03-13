import { NORTH,
         EAST,
         SOUTH,
         WEST,
         changeDirection, 
         canMoveDirection} from './snake.js';

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 */
function registerEvents(canvas) {
    document.addEventListener('keydown', keypressHandler);
}

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 */
function deregisterEvents(canvas) {
    document.removeEventListener('keydown', keypressHandler); 
}


/**
 * 
 * @param {KeyboardEvent} e 
 */
function keypressHandler(e) {
    let direction;
    
    if (keyIs(e, 87, 38, 104) && canMoveDirection(NORTH)) {
        direction = NORTH;
    }
    else if (keyIs(e, 37, 65, 100) && canMoveDirection(WEST)) {
        direction = WEST;
    }
    else if (keyIs(e, 83, 40, 98) && canMoveDirection(SOUTH)) {
        direction = SOUTH;
    }
    else if (keyIs(e, 39, 68, 102) && canMoveDirection(EAST)) {
        direction = EAST;
    }
    
    changeDirection(direction);
}

/**
 * 
 * @param {KeyboardEvent} e 
 * @param {number} code
 */
function keyIs(e, ...codes) {
    return codes.find(c => e.which == c || e.code == c || e.key == c || e.keyCode == c);
}

export {
    registerEvents,
};