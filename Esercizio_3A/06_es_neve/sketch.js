let fiocco = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Creo 300 fiocchi di neve
  for (let i = 0; i < 300; i++) {
    fiocco[i] = {
      px: random(0, width),
      py: random(-100, 0),
      dim: random(10, 20),
      vel: random(1, 3)
    };
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  fill(255);
  textAlign(CENTER, CENTER);


  for (let i = 0; i < fiocco.length; i++) {
    let f = fiocco[i];

    f.px += random(-1.5, 1.5);
    f.py += f.vel;

    if (f.py > height) {
      f.py = random(-50, 0);
      f.px = random(0, width);
    }

    textSize(f.dim);
    text("*", f.px, f.py);
  }
}