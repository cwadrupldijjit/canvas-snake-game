import { createGame } from './canvas.js';
import { drawBoard, getExactPosition, width, cellSize } from './board.js';
import { drawSnake } from './snake.js';
import { registerEvents } from './events.js';

let game = createGame('#snake-game');

registerEvents(game.canvas);

game.start(() => {
    game.context.clearRect(0, 0, getExactPosition(width) + cellSize, getExactPosition(width) + cellSize);
    
    drawBoard(game.context);
    drawSnake(game.context);
});

setTimeout(game.end, 30000);