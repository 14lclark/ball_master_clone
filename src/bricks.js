/*
brick ideas:
1. shuffle area on destroy
*/

class Brick {
  constructor(hp, x, y, currentGrid) { // x and y are the grid positions
    this.hp = hp;
    this.grid = createVector(x, y);
    this.collisionPoints = []; // collision points 
    this.isAlive = true;
    this.currentGrid = currentGrid
    this.nHor = createVector(1, 0);
    this.nVer = createVector(0, -1);
    this.isBomb = false;
    this.rowBreak = false;
    
    let chance = random(0,100);
    if (chance <= 5) {
      this.isBomb = true;
    } else if (5 < chance && chance <= 10 ) {
      this.rowBreak = true
    }
    this.removed = false;
  }
  updateCurrentGrid(currentGrid) {
    this.currentGrid = currentGrid;
  }
  remove(brickmaker) {
    this.collisionPoints = [];
    if (this.isBomb && this.isAlive) { 
      this.isAlive = false;
      this.explode(brickmaker); 
    }
    this.isAlive = false;
    this.removed = true;
  }
  living() {
    return (this.hp > 0);
  }
  
  explode(brickmaker) {
    let nbrs = findNeighbors(this.currentGrid,this.grid.x,this.grid.y);
     for (let nbr of nbrs) {
      if (brickmaker.bricks[nbr].grid !== this.grid) {
        brickmaker.bricks[nbr].hp = 0;
        brickmaker.bricks[nbr].remove(brickmaker);
      }
    }
  }
    
  changeColor() {
    if (this.hp < 50) {
      this.color = color(0, 255, 0);
    } else if (this.hp < 100) {
      this.color = color(147,112,219);
    } else {
      this.color = color(255,0,0);
    }
  }
}

class Triangle extends Brick {
  constructor(hp, x, y, dir) {
    super(hp);
    this.dir = dir;
  }

  update() {
    if (this.living()) {
      
    }
  }

  draw() {


  }

}

class Square extends Brick {
  constructor(hp, x, y, currentGrid) {
    super(hp, x, y, currentGrid);
    this.update();
    this.type = squ;
  }
  
  update() {
    if (this.living()) {
      this.collisionPoints = []
      this.x = this.grid.x * SL;
      this.y = this.grid.y * SL;

      ////////// add collision areas -- can make more efficient
      ////////// by telling which side each area is on for tighter control

      let TL = createVector(this.x + blockSpace/2, this.y + blockSpace/2);
      let TR = createVector(this.x + SL - blockSpace/2, this.y + blockSpace/2);
      let BL = createVector(this.x + blockSpace/2, this.y + SL - blockSpace/2);
      let BR = createVector(this.x + SL - blockSpace/2, this.y + SL - blockSpace/2);

      // left and right 
      this.collisionPoints.push([LINE, TL, BL, this.nHor]);
      this.collisionPoints.push([LINE, TR, BR, this.nHor]);

      // top and bottom
      this.collisionPoints.push([LINE, TL, TR, this.nVer]);
      this.collisionPoints.push([LINE, BL, BR, this.nVer]);

      // corners
      this.collisionPoints.push([CRNR, TL]);
      this.collisionPoints.push([CRNR, TR]);
      this.collisionPoints.push([CRNR, BL]);
      this.collisionPoints.push([CRNR, BR]);

    }
  }

  draw(brickmaker) {
    if (this.living()) {
      push();
      if (this.isBomb) {
        fill(0);
      } else {
        fill(this.color);
      }
      noStroke();
      rect(this.x + blockSpace/2, this.y + blockSpace/2, SL - blockSpace, SL - blockSpace);
      if (this.isBomb) {
        fill(255); 
      } else {
        fill(0);
      }
      textSize(SL / 3);
      textAlign(CENTER, CENTER);
      text(this.hp, this.x + SL / 2, this.y + SL / 2);
      pop();
    } else if (!this.removed) {
      this.remove(brickmaker);
    }
  }

}

class Circle extends Brick {
  constructor(hp, gridX, gridY, currentGrid) {
    super(hp, gridX, gridY, currentGrid);
    this.update();
    this.type = circle;
  }
  update() {
    if (this.living()) {
      this.x = this.grid.x * SL;
      this.y = this.grid.y * SL
      this.center = createVector(this.x + SL/2, this.y + SL/2);
      this.radius = SL/2 - blockSpace/2;	
      this.collisionPoints = [[CRCL, this.center, this.radius]];
    }
  }
  draw(brickmaker) {
    if (this.living()) {
      push();
      if (this.isBomb) {
        fill(0);
      } else {
        fill(this.color);
      }
      noStroke();
      ellipse(this.center.x, this.center.y, 2 * this.radius);
      if (this.isBomb) {
        fill(255); 
      } else {
        fill(0);
      }
      textSize(SL / 3);
      textAlign(CENTER, CENTER);
      text(this.hp, this.x + SL / 2, this.y + SL / 2);
      pop();
    } else if (!this.removed) {
      this.remove(brickmaker);
    }
  }
}
