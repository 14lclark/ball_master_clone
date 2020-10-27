// This class was deprecated, so I think I'm going to transform it into a grid
// class that deals with all the neighbor-finding and grid maintenance stuff.
// I don't think it makes sense for the brickmaker to do that anymore.

// broad phase collision detection

class CollCell {
  constructor(col, row, bricks) {
    this.col = col;
    this.row = row;
    this.grid = [];
    for (let i = 0; i < this.row; i++) {
      this.grid.push([]);
      for (let j = 0; j < this.col; j++) {
        this.grid[i].push(undefined);
      }
    }

    this.update(bricks.bricks);
  }

  clearGrid() {
    for (let row of this.grid) {
      for (let i = 0; i < this.col; i++) {
        row[i] = undefined;
      }
    }
  }
  update(bricks) {
    this.clearGrid();
    for (let i = 0; i < bricks.length; i++) {
      let x = bricks[i].grid.x;
      let y = bricks[i].grid.y;
      if (y < this.row) {
        this.grid[y][x] = [i];
      }
    }
  }

  checkWhich(ball) {
    let bx = floor(map(ball.pos.x, 0, width, 0, this.col));
    let by = floor(map(ball.pos.y, 0, width, 0, this.row));
    let temp = []
    try {
      temp = temp.concat(this.grid[by - 1][bx]);
    } catch (err) {}
    try {
      temp = temp.concat(this.grid[by + 1][bx]);
    } catch (err) {}
    try {
      temp = temp.concat(this.grid[by][bx - 1]);
      
    } catch (err) {}
    try {
      temp = temp.concat(this.grid[by][bx + 1]);
    } catch (err) {}
    try {
      temp = temp.concat(this.grid[by - 1][bx - 1]);
    } catch (err) {}
    try {
      temp = temp.concat(this.grid[by - 1][bx + 1]);
    } catch (err) {}
    try {
      temp = temp.concat(this.grid[by + 1][bx - 1]);
    } catch (err) {}
    try {
      temp = temp.concat(this.grid[by + 1][bx + 1]);
    } catch (err) {}

    let temp1 = temp.filter(ind => ind !== undefined);
    return temp1;
  }
}