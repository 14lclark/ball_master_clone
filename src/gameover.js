class GameOver {
 
  draw(score) {
    fill(0);
    rect(width/6,height/3,4*width/6,height/3);
    fill(255,0,0);
    textSize(50);
    textAlign(CENTER,CENTER);
    text('Game Over', width/2, 14 * height/32);
    textSize(25);
    text('Final score: ' + score, width/2, 18 * height/32);
  }
  
}