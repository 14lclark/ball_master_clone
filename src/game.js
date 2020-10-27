class Game {
  constructor(ballsAmt) {
    this.score = 0;
    this.help = false;
    
    let start = createVector(W * SL / 2, H * SL - ballRad);
    this.balls = new Shooter(ballsAmt, SL / 3, start);
    this.bricks = new Brickmaker();
    // this.help = new HelpMenu();
    this.footer = new Footer();
    this.end = new GameOver();
    print('debug');
  }
  
  draw() {
    
    // temporary until help menu is made
    if (this.help) {
      this.help = false;
    }
    
    if (!this.help) {
      if (!this.gameOver()) {

        this.fetchScore();
        this.footer.update(this.score);
        this.bricks.updateGrid();
        let grid = this.bricks.getGrid();
        this.balls.updateGrid(grid);

        background(30);
        this.bricks.draw();
        this.balls.move(this.bricks);
        this.balls.draw();
        this.footer.draw();
      } else {

        this.end.draw(this.score);
      }
    } else {
      this.bricks.draw();
      this.balls.draw();
      this.footer.draw();
      // this.help.draw()
    }
  }
  
  onClick(x,y) {
    if (!this.help) {
      if (x <= width && x >= 0 && y <= height - SL && y >= 0) {
        this.balls.shoot(x, y, this.balls);
        return;
      }
      switch (this.footer.onClick(x,y)) {
        case 'return':
          this.returnToHand();
          break;
        case 'help':
          this.help = true;
          break;
      }
    }
  }
  
  fetchScore() {
    this.score = this.bricks.score;  
  }
  returnToHand() {
    this.balls.returnToHand(this.bricks);
  }
  gameOver() {
    return this.bricks.gameOver;
  }
}