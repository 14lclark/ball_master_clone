class Ball {
  constructor(vel, pos) {
    this.vel = vel;
    this.pos = createVector();
    this.pos.set(pos);
    this.nHor = createVector(1, 0);
    this.nVer = createVector(0, -1);
    this.alpha = 255;
    this.hittable = true;
    this.moving = false;
    this.shot = false;
    this.dir = createVector();
    this.lastHit = -1; // index of last brick hit
  }

  setDir(dir) {
    this.dir.set(dir);
  }
  
  setBrickGrid(grid) {
    this.grid = grid;
  }

  collision(brick) {
    let pos = this.pos
    let bx = this.pos.x;
    let by = this.pos.y;
    this.dir.normalize();
    function onSeg(init, end, pt) {
      let d1 = dist(init.x, init.y, end.x, end.y);
      let d2 = dist(init.x, init.y, pt.x, pt.y) + dist(end.x, end.y, pt.x, pt.y);
      return d1 === d2;
    }
    
    for (let ca of brick.ca) {
      let a = ca[1];
      
      switch (ca[0]) {
      
        case CRNR:
          if (dist(a.x, a.y, bx, by) <= ballRad) {
            let n = p5.Vector.sub(a, pos);
            n.normalize();
            return [true, n];
          }
            break;
            
        case LINE:
          let b = ca[2];
          let n = ca[3];
          let a2b = p5.Vector.sub(b,a);
          let a2me = p5.Vector.sub(pos,a);
          let len2 = a2b.magSq();
          let dot = p5.Vector.dot(a2b,a2me);
          let s = dot / len2;
          
          let pt = createVector(a.x + a2b.x * s, a.y + a2b.y * s)
          
          if (onSeg(a,b,pt)) {
            if (dist(pt.x, pt.y, bx, by) <= ballRad) {
              return [true, n];
            }
          }
          break;

        case CRCL:
          let r = ca[2];
          if (dist(bx, by, a.x, a.y) <= r + ballRad) {
            let n = p5.Vector.sub(a, pos);
            n.normalize();
            return [true, n];
          }
          break;
          }
      }
      this.hittable = true;
      return [false];
    }

    update(x, y) { 
      angleMode(DEGREES);
      let temp = p5.Vector.sub(createVector(x, y), this.pos);
      if (temp.heading() >= -170 && temp.heading() <= -10) {   ///// not good
        this.dir.set(temp); 
      }
    }


    move(bricks) {
      let near = this.checkNeighbors(this.grid); // Check surroundings after moving this.vel times --
      for (let i = 0; i < this.vel; i++) {   // this is only fine because SL is much larger than it
        this.moveOnce(bricks,near);
      }
    }
    moveOnce(bricks,near) {
      let check;
      this.alpha = 255;
      for (let ind of near) {
        check = this.collision(bricks[ind]);
        if (check[0] && this.hittable && ind !== this.lastHit) {
          this.lastHit = ind
          if (check[1].equals(this.dir) || check[1].equals(p5.Vector.mult(this.dir,-1))) {
            this.dir.mult(-1);
          } else {
          this.dir.reflect(check[1]);
          }
          bricks[ind].hp -= 1;
          this.hittable = false;
        }
      }

      this.pos.x += cos(this.dir.heading());
      this.pos.y += sin(this.dir.heading());

      // bounce off walls
      if (this.pos.x >= W * SL - ballRad) {
        this.pos.x = W * SL - ballRad;
        this.dir.reflect(this.nHor);
        this.lastHit = -1;
      } else if (this.pos.x <= ballRad) {
        this.pos.x = ballRad;
        this.dir.reflect(this.nHor);
        this.lastHit = -1;
      }
      if (this.pos.y <= ballRad) {
        this.pos.y = ballRad;
        this.dir.reflect(this.nVer)
        this.lastHit = -1;
      }
      if (this.pos.y >= H * SL - ballRad) {
        this.moving = false;
        this.pos.y = H * SL - ballRad
        this.alpha = 20;
        this.lastHit = -1;
      }
    }
    moveTo(pos) {
      this.setPos(pos);
    }
    setPos(pos) {
      this.pos = pos
    }
    checkNeighbors() {
      let gridX = floor(map(this.pos.x, 0, W*SL, 0, W));
      let gridY = floor(map(this.pos.y, 0, H*SL, 0, H));
      return findNeighbors(this.grid,gridX,gridY);
    }
    
    draw() {
      push();
      noStroke()
      fill(255, this.alpha);
      ellipse(this.pos.x, this.pos.y, ballRad * 2);
      pop();
    }
  }