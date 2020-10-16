class Aimer {
  constructor(pos) {
    this.pos = pos;
    this.rad = ballRad * 0.5;
    this.aim = createVector(1,-1);
    this.length = 2 * max(height,width);
  }
  update(x, y, balls) {
    push();
    angleMode(DEGREES);
    let temp = p5.Vector.sub(createVector(x, y), this.pos);
   // let left = map(this.pos.x - width / 2 , -width / 2 + ballRad, width / 2 - ballRad, -140, -178); // fix
   // let right = map(this.pos.x - width / 2, -width / 2 + ballRad, width / 2 - ballRad, -2, -40); 
    let left  = -180 + atan(SL / this.pos.x);
    let right = -atan(SL / (width - this.pos.x)); 
    let angle = temp.heading();
    if (angle >= left && angle <= right) {
      this.aim.set(temp);
    } else if (angle > right && angle < 90) {
      this.aim.set(p5.Vector.fromAngle(radians(right)));
    } else if (angle > left || (angle < 180 && angle > 90)) {
      this.aim.set(p5.Vector.fromAngle(radians(left))); 
    }
    for (let ball of balls) {
      ball.setDir(this.aim);
    }
    this.aim.setMag(this.length);
    pop();
  }
  draw() {
    
    push();
    stroke(255, 30);
    strokeWeight(2 * ballRad);
    line(this.pos.x, this.pos.y, this.pos.x + this.aim.x, this.pos.y + this.aim.y);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.pos.x + this.aim.x, this.pos.y + this.aim.y);
    pop();
  
  }
}