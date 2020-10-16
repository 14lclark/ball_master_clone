// shapes
const squ    = "square";
const hex    = "hexagon";
const circle = "circle";
const triUL  = "triangle up left";
const triUR  = "triangle up right";
const triDL  = "triangle down left";
const triDR  = "triangle down right";

// scaling: block scale, window width, window height, ball size
const SL      = 50;
const W       = 9;
const H       = 12;
const ballRad = Math.floor(SL / 7);

// timing
const shootDelay = 100; // ms; deprecated
const shootDelayFrames = 5; // frames btwn shots

// collision stuff
const LINE = 0
const CRNR = 1
const CRCL = 2


// useful grid function
function findNeighbors(grid, bx, by) {
  let temp = [];
  try {
    temp = temp.concat(grid[by][bx]);         // this
  } catch (err) {}
  try {
    temp = temp.concat(grid[by + 1][bx - 1]); // down left
  } catch (err) {}
  try {
    temp = temp.concat(grid[by - 1][bx - 1]); // up left
  } catch (err) {}    
  try {
    temp = temp.concat(grid[by][bx + 1]);     // right
  } catch (err) {}
  try {
    temp = temp.concat(grid[by + 1][bx + 1]); // down right
  } catch (err) {}
  try {
    temp = temp.concat(grid[by - 1][bx + 1]); // up right
  } catch (err) {}
  try {
    temp = temp.concat(grid[by - 1][bx]);     // up
  } catch (err) {}
  try {
    temp = temp.concat(grid[by][bx - 1]);     // left
  } catch (err) {}
  try {
    temp = temp.concat(grid[by + 1][bx]);     // down
  } catch (err) {}
  
  let temp1 = temp.filter(ind => ind !== undefined);
  return temp1;
}