class Brickmaker {
  constructor() {
    this.bricks = [];

    this.col = W;
    this.row = H;
    this.score = 0;
    this.gameOver = false;
    
    this.grid = []; 
    for (let i = 0; i < H; i++) {
      this.grid.push([]);
      for (let j = 0; j < W; j++) {
        this.grid[i].push(undefined);
      }
    }
    this.newRow();
  }
  
  
  draw() {
    for (let brick of this.bricks) {
      brick.draw(this);
    }
  }
  clearGrid() {
    for (let row of this.grid) {
      for (let i = 0; i < W; i++) {
        row[i] = undefined;
      }
    }
  }
  updateGrid() {
    this.clearGrid();
    for (let i = 0; i < this.bricks.length; i++) {
      if (this.bricks[i].living()) {
        let x = this.bricks[i].grid.x;
        let y = this.bricks[i].grid.y;
        if (y < H) {
          this.grid[y][x] = [i];
        }
      }
    }
    for (let brick of this.bricks) {
      if (brick.living()) {
        brick.updateCurrentGrid(this.grid); 
      }
    }
  }
  getGrid() {
    return this.grid;
  }
  newRow() {
    let counter = 0;
    function hp(score) {
      return floor(random(20 + 1.5 * score , 50 + 2 * score));
      
    }
    for (let i = 0; i < W; i++) {
      let r = random(0,100)
      if (r <= 25) {
        this.bricks.push(new Square(hp(this.score), i, 0, this.grid));
        counter += 1
      }
    }
    if (counter === 0) {
      this.newRow();
    }
    for (let brick of this.bricks) {
      brick.changeColor(); 
    }
    this.updateGrid();
  }
  moveDown() {
    this.score++;
    for (let brick of this.bricks) {
      brick.grid.y += 1;
      brick.update();
    }
    this.newRow();
    this.updateGrid();
    this.checkGameOver();
  }
  checkGameOver() {
    for (let brick of this.bricks) {
      if (brick.alive == true && brick.grid.y === H-1) {
        this.gameOver = true;
        return;
      }
    }
  }
}