class ParticleSystem {
  constructor() {
    this.particles = [];
  }
  onHit(hx,hy) {
       
  }
  onBreak(center) {
     
  }
  onExplode(center) {
    let len = this.particles.length;
    this.particles.push(new Explosion(center, len));
  }
  updateIndices() {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].index = i; 
    }
  }
  draw() {
    for (let p of this.particles) {
      if (!this.complete) {
        p.draw();
      } else {
        this.particles.splice(p.index, 1);
        this.updateIndices();
      }
    }
  }
}

class Particle {
  constructor(pos, index) {
    this.x = pos.x;
    this.y = pos.y;
    this.index = index;
    this.complete = false;
    this.counter = 0;
  }

}
  
class Explosion extends Particle {
  constructor(pos, index) {
    super(pos, index)
  }
  draw() {
    push();
    
    fill(255,69,0);
    triangle(this.x, this.y - SL, this.x + SL, this.y - SL, this.x + SL, this.y); // up right
    triangle(this.x, this.y + SL, this.x + SL, this.y + SL, this.x + SL, this.y); // down right
    triangle(this.x, this.y - SL, this.x - SL, this.y - SL, this.x - SL, this.y); // up left
    triangle(this.x, this.y + SL, this.x - SL, this.y + SL, this.x - SL, this.y); // down left
    
    fill(255,215,0);
    ellipse(this.x, this.y, 3 * SL);
    
    // fill
    
    pop();
  }
}



