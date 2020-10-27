// shapes
const squ    = "square";
const hex    = "hexagon";
const circle = "circle";
const triUL  = "triangle up left";
const triUR  = "triangle up right";
const triDL  = "triangle down left";
const triDR  = "triangle down right";

// scaling: block scale, window width, window height, ball size
const SL         = 50;
const W          = 9;
const H          = 12;
const ballRad    = Math.floor(SL / 7);
const blockSpace = 4;

// timing
const shootDelay = 100; // ms; deprecated
const shootDelayFrames = 5; // frames btwn shots

// collision stuff
const LINE = 0
const CRNR = 1
const CRCL = 2


// useful grid functions -- move to new grid class
function validCoords(x, y, gridWidth, gridHeight) {
  return (x >= 0 && y >= 0 && x < gridWidth && y < gridHeight);
}

function findNeighbors(grid, bx, by) {
  let temp = [];
  for (let deltaX of [-1,0,1]) {
    let newX = bx + deltaX;
    for (let deltaY of [-1,0,1]) {
      let newY = by + deltaY;
      if (validCoords(newX, newY, W, H)) {
        temp = temp.concat(grid[newY][newX]);
      }
    }
  }
  let temp1 = temp.filter(ind => ind !== undefined);
  return temp1;
}
