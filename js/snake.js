import { center, cellSize, getCell, getExactCoordinate, getExactPosition } from './board.js';
import { applyVector, areEqual } from './utils.js';

const bodyColor = '#0dcf27';
const headColor = '#17a12a';
const tailColor = '#918c51';

const NORTH = Object.freeze({
    x: 0,
    y: -1,
});
const EAST = Object.freeze({
    x: 1,
    y: 0,
});
const SOUTH = Object.freeze({
    x: 0,
    y: 1,
});
const WEST = Object.freeze({
    x: -1,
    y: 0,
});

let direction = EAST;

let snake = Array(3).fill().map((_, i) => ({
    position: {
        x: (center - 1) + i,
        y: center,
    },
}));

let interval;

/**
 * 
 * @param {CanvasRenderingContext2D} context 
 */
function drawSnake(context) {
    snake.forEach(((seg, i) => {
        if (!i) {
            return drawTail(context, seg);
        }
        
        context.beginPath();
        context.fillStyle = i != snake.length - 1 ? bodyColor : headColor;
        context.lineWidth = 0;
        context.rect(getExactPosition(seg.position.x), getExactPosition(seg.position.y), cellSize, cellSize);
        context.fill();
        context.closePath();
    }));
    
    move();
}

/**
 * 
 * @param {CanvasRenderingContext2D} context 
 * @param {*} seg 
 */
function drawTail(context, seg) {
    context.beginPath();
    context.fillStyle = tailColor;
    context.moveTo(getExactPosition(seg.position.x) + cellSize, getExactPosition(seg.position.y));
    context.lineTo(getExactPosition(seg.position.x), getExactPosition(seg.position.y) + (cellSize / 2));
    context.lineTo(getExactPosition(seg.position.x) + cellSize, getExactPosition(seg.position.y) + cellSize);
    context.fill();
    context.closePath();
}

function move() {
    const head = snake[snake.length - 1];
    const nextHead = snake[0];
    
    nextHead.position = applyVector(head.position, direction);
    
    snake = [
        ...snake.slice(1),
        nextHead,
    ];
}

function startMove() {
    interval = setInterval(move, 300);
}

function stopMove() {
    clearInterval(interval);
}

// startMove();
// setTimeout(stopMove, 10000);

function changeDirection(v) {
    direction = v || direction;
}

function canMoveDirection(v) {
    return !areEqual(applyVector(snake[snake.length - 1].position, v), snake[snake.length - 2].position);
}

export {
    drawSnake,
    startMove,
    stopMove,
    changeDirection,
    canMoveDirection,
    
    NORTH,
    EAST,
    SOUTH,
    WEST,
};