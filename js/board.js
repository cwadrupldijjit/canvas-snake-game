const cellSize = 16;

let size = 800;
let width;
let grid;
let left;
let top;
let right;
let bottom;
let center;

generateBoard()

function generateBoard(size = 800) {
    width = Math.floor(800 / 16);
    grid = Array(width)
        .fill()
        .map((_, x) => 
            Array(width)
                .fill()
                .map((_, y) => ({
                    borderWidth: 1,
                    contents: '',
                    coordinate: {x, y},
                    position: {
                        x: x * cellSize,
                        y: y * cellSize,
                    },
                })
            )
        );
    left = 0;
    top = 0;
    right = width;
    bottom = width;
    
    center = Math.ceil(width / 2);
}

function shrinkBoard() {
    generateBoard(size - 113);
}

function getExactPosition(n) {
    return n * cellSize;
}

function getExactCoordinate({x, y}) {
    return {x: getExactPosition(x), y: getExactPosition(y)};
}

function getCell({ x, y }) {
    return grid[x][y];
}

function getCellContents(coords) {
    return getCell(coords).contents;
}

function setCell({x, y}, c) {
    grid[x][y].contents = c;
}

function setArea({x: xa, y: ya}, {x: xb, y: yb}, c) {
    let farLeft = Math.min(xa, xb);
    const farRight = Math.max(xa, xb);
    const farTop = Math.min(ya, yb);
    const farBottom = Math.max(ya, yb);
    
    while (farLeft <= farRight) {
        let currentTop = farTop;
        
        while (currentTop <= farBottom) {
            setCell({x: farLeft, y: currentTop});
            
            currentTop++;
        }
        
        farTop = Math.min(ya, yb);
        farLeft++;
    }
}

/**
 * 
 * @param {CanvasRenderingContext2D} context 
 */
function drawBoard(context) {
    grid.forEach(col => {
        col.forEach(cell => {
            context.beginPath();
            context.lineWidth = '1';
            context.strokeStyle = '#eee';
            context.rect(cell.position.x, cell.position.y, cellSize, cellSize);
            context.stroke();
            context.closePath();
        });
    });
}

export {
    generateBoard,
    drawBoard,
    getExactPosition,
    getExactCoordinate,
    getCell,
    getCellContents,
    setCell,
    setArea,
    
    cellSize,
    center,
    width,
}