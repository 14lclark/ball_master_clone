let game;

function setup() {
  createCanvas(W * SL, (H + 1) * SL);
  
  game = new Game(50);
}

function draw() {
  game.draw();
}

function mousePressed() {
  game.onClick(mouseX,mouseY);
}

function keyPressed() {
  if (key == 'Escape') {
    game = new Game(50); 
  }
}