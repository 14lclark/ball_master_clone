class Footer {
  constructor() {
  }
  update(score) {
    this.score = score;
  }
  draw() {
    push();
    noStroke();
    fill(70);
    rect(0,height - SL, width, SL);
    fill(30);
    rect(width / 3, height - 4 * SL / 5, width / 3, 3 * SL / 5, SL / 6);     // return to hand button
    rect(width / 18, height - 4 * SL / 5, width / 6, 3 * SL / 5, SL / 6);    // help button
    rect(7 * width / 9, height - 4 * SL / 5, width / 6, 3 * SL / 5, SL / 6); // score
    fill(255);
    textSize(20);
    textAlign(CENTER,CENTER);
    text(this.score, 7 * width / 9 + width / 12, height - SL / 2); 
    text('return to hand', width / 2, height - SL / 2);
    text('help', 5 * width / 36, height - SL / 2);
    pop();
  }
  onClick(x,y) {
    let y1 = height - 4 * SL / 5;
    let y2 = height - SL / 5;
    if (x >= width / 3 && x <= 2 * width / 3 && y >= y1 && y <= y2) {
      return 'return';
    } else if (x >= width / 18 && x <= 2 * width / 9 && y >= y1 && y <= y2) {
      return 'help';
    }
  }
}