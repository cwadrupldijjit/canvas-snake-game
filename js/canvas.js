let canRender = false;
let animationFrameId;
let speed = 750;

function createGame(selector) {
    let game = Object.create({
        start(draw) {
            canRender = true;
            paint(draw);
        },
        end() {
            canRender = false;
            cancelAnimationFrame(animationFrameId);
        },
        changeSpeed(diff = -10) {
            speed += diff;
        }
    });
    
    game.canvas = document.querySelector(selector);
    game.context = game.canvas.getContext('2d');
    
    return game;
}

function paint(draw) {
    draw();
    
    if (canRender) {
        animationFrameId = requestAnimationFrame(() => {
            setTimeout(() => paint(draw), speed);
        });
    }
}

export {
    createGame,
}