class Brick {
  constructor(hp, x, y, currentGrid) { // x and y are the grid positions
    this.hp = hp;
    this.grid = createVector(x, y);
    this.ca = []; // collision points // put corners last
    this.alive = true;
    this.currentGrid = currentGrid
    this.nHor = createVector(1, 0);
    this.nVer = createVector(0, -1);
    this.bomb = false;
    this.rowBreak = false;
    
    let chance = random(0,100);
    if (chance <= 5) {
      this.bomb = true;
    } else if (5 < chance && chance <= 10 ) {
      this.rowBreak = true
    }
    this.removed = false;
  }
  updateCurrentGrid(currentGrid) {
    this.currentGrid = currentGrid;
  }
  remove(brickmaker) {
    this.ca = [];
    if (this.bomb && this.alive) { 
      this.alive = false;
      this.explode(brickmaker); 
    }
    this.alive = false;
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
        brickmaker.bricks[nbr].remove(brickmaker);print(nbr);
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
      this.ca = []
      this.x = this.grid.x * SL;
      this.y = this.grid.y * SL;

      ////////// add collision areas -- can make more efficient
      ////////// by telling which side each area is on for tighter control

      let TL = createVector(this.x + 1, this.y + 1);
      let TR = createVector(this.x + SL - 1, this.y + 1);
      let BL = createVector(this.x + 1, this.y + SL - 1);
      let BR = createVector(this.x + SL - 1, this.y + SL - 1);

      // left and right 
      this.ca.push([LINE, TL, BL, this.nHor]);
      this.ca.push([LINE, TR, BR, this.nHor]);

      // top and bottom
      this.ca.push([LINE, TL, TR, this.nVer]);
      this.ca.push([LINE, BL, BR, this.nVer]);

      // corners
      this.ca.push([CRNR, TL]);
      this.ca.push([CRNR, TR]);
      this.ca.push([CRNR, BL]);
      this.ca.push([CRNR, BR]);

    }
  }

  draw(brickmaker) {
    if (this.living()) {
      push();
      if (this.bomb) {
        fill(0);
      } else {
        fill(this.color);
      }
      noStroke();
      rect(this.x + 1, this.y + 1, SL - 1, SL - 1);
      if (this.bomb) {
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
  constructor(hp, x, y, currentGrid) {
    super(hp, x, y, currentGrid);
    this.update();
    this.type = squ;
  }
}