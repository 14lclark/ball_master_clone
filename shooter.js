class Shooter {
  constructor(num, speed, pos) {
    // setup balls
    this.balls = [];
    this.amt = num;
    for (let i = 0; i < this.amt; i++) {
      this.balls.push(new Ball(speed, pos));
    }
    this.nextLevel = false;
    this.wait = false;
    this.pos = pos;
    this.aim = new Aimer(this.pos);
    
    // true if new pos has been determined
    this.down = false
    this.downCounter = 0;
    
    // shoot handling
    this.clicked = false;
    this.startFrame = 0;
    this.shootCounter = 0;
  }
  shootOld(x, y, shooter) { ////////////////////////////////////// {deprecated
    this.nextLevel = true;
    if (this.allBallsDown()) {
      for (let ball of this.balls) {
        ball.update(x, y);
        ball.shot = false;
      }
      for (let i = 0; i < this.amt; i++) {
        setTimeout(shooter.makeMove, shootDelay * i, shooter, i)
      }
    }
  } ////////////////////////////////////////////////////////////// deprecated}
  
  shoot(x,y) {
    this.startFrame = frameCount;
    this.nextLevel = true;
    let temp = this.aim;
    if (this.allBallsDown()) {
      for (let ball of this.balls) {
        ball.shot = false;
      }
    }
    

    this.clicked = true
  }
  updateGrid(grid) {
    for (let ball of this.balls) {
      ball.setBrickGrid(grid); 
    }
  }
  draw() {
    for (let i = 0; i < this.amt; i++) {
      this.balls[i].draw();
    }

    if (this.allBallsDown()) {
      this.aim.pos.set(this.pos)
      this.aim.update(mouseX, mouseY,this.balls);
      this.aim.draw();
    }
    if (this.down) {
      push();
      noStroke();
      fill(255,127,80);
      ellipse(this.pos.x,this.pos.y, 2 * ballRad);
      pop();
    }
  }

  returnToHand(bricks) {
      if (this.clicked) {
        for (let ball of this.balls) {
            ball.moving = false;
          }
        this.collectBalls();  
      }
  }
  collectBalls() {
    for (let ball of this.balls) {
      ball.pos.set(this.pos);
    }
    this.clicked = false;
    this.down = false;
    this.downCounter = 0;
    this.shootCounter = 0;
  }

  allBallsDown() {
    let acc = true;
    for (const ball of this.balls) {
      let m = ball.moving;
      acc = acc && !m;
    }
    return acc;
  }

  moveOld(bricks) {
    let counter = 0;
    for (let ball of this.balls) {
      if (ball.moving) {
        ball.move(bricks.bricks);
        counter += 1;
        if (counter == 1 && !this.down) {
          this.pos = ball.pos;
          this.down = true;
        }
      }
    }
    if (this.allBallsDown() && this.down) {
      this.collectBalls();
      if (this.nextLevel) {
        this.nextLevel = false;
        bricks.moveDown();
      }
    }
  }
  move(bricks) {
    if (this.shootCounter < this.amt && this.clicked) {
      if ((this.startFrame - frameCount) % shootDelayFrames == 0) {
        this.makeMove(this.shootCounter);
        this.shootCounter++;
      }
    }

    for (let ball of this.balls) {
      if (ball.moving) {
        ball.move(bricks.bricks);

      } else if (!ball.moving && ball.shot) {
        this.downCounter += 1;
        if (this.downCounter == 1 && !this.down) {
          this.pos.set(ball.pos);
          this.down = true;
        }
      }
    }

    if (this.allBallsDown() && this.down) {
      // this.returnToHand(bricks);
      
      this.collectBalls();
      if (this.nextLevel) {
        this.nextLevel = false;
        bricks.moveDown();
      }

    }

  }

  makeMove(i) {
    this.balls[i].moving = true;
    this.balls[i].shot = true;
  }

}