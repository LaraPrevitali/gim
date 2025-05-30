let posX, posY;
let velX, velY;
let ballSize = 20;

let paddleWidth = 15;
let paddleHeight = 100;
let leftPaddleY, rightPaddleY;
let paddleSpeed = 6;
let aiSpeed = 4;

let leftScore = 0;
let rightScore = 0;
let maxScore = 5;
let gameOver = false;

let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  resetBall();

  leftPaddleY = height / 2 - paddleHeight / 2;
  rightPaddleY = height / 2 - paddleHeight / 2;

  textFont('Roboto Mono');
  textSize(32);
}

function resetBall() {
  posX = width / 2;
  posY = height / 2;
  velX = random([-5, 5]);
  velY = random(-3, 3);
}

function draw() {
  background(0, 0, 0, 20);

  if (gameOver) {
    drawVictoryScreen();
    return;
  }

  drawScore();
  drawPaddles();
  movePaddles();
  updateBall();
  updateParticles();
}

function drawVictoryScreen() {
  background(0);
  fill(0, 0, 100);
  textAlign(CENTER, CENTER);
  textSize(48);

  let winner = leftScore >= maxScore ? "Giocatore" : "IA";
  text(`${winner} vince!`, width / 2, height / 2);

  textSize(24);
  text("Premi 'R' per ricominciare", width / 2, height / 2 + 60);
}

function drawScore() {
  fill(0, 0, 100);
  textAlign(CENTER);
  text(`${leftScore} : ${rightScore}`, width / 2, 40);
}

function drawPaddles() {
  fill(0, 0, 100);
  rect(20, leftPaddleY, paddleWidth, paddleHeight);
  rect(width - 20 - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
}

function movePaddles() {
  if (keyIsDown(87)) leftPaddleY -= paddleSpeed;
  if (keyIsDown(83)) leftPaddleY += paddleSpeed;
  leftPaddleY = constrain(leftPaddleY, 0, height - paddleHeight);

  let targetY = posY - paddleHeight / 2;
  if (rightPaddleY + paddleHeight / 2 < targetY) {
    rightPaddleY += aiSpeed;
  } else if (rightPaddleY + paddleHeight / 2 > targetY) {
    rightPaddleY -= aiSpeed;
  }
  rightPaddleY = constrain(rightPaddleY, 0, height - paddleHeight);
}

function updateBall() {
  fill(100, 100, 100);
  noStroke();
  ellipse(posX, posY, 20, 20);

  posX += velX;
  posY += velY;

  if (posY <= 0 || posY >= height) {
    velY *= -1;
  }

  // Collisione paddle sinistro
  if (
    posX - ballSize / 2 < 20 + paddleWidth &&
    posY > leftPaddleY &&
    posY < leftPaddleY + paddleHeight
  ) {
    velX *= -1;
    posX = 20 + paddleWidth + ballSize / 2;
    spawnParticles(posX, posY, color(hue, 80, 100));
  }

  // Collisione paddle destro
  if (
    posX + ballSize / 2 > width - 20 - paddleWidth &&
    posY > rightPaddleY &&
    posY < rightPaddleY + paddleHeight
  ) {
    velX *= -1;
    posX = width - 20 - paddleWidth - ballSize / 2;
    spawnParticles(posX, posY, color(hue, 80, 100));
  }

  // Punti
  if (posX < 0) {
    rightScore++;
    checkWin();
    resetBall();
  }
  if (posX > width) {
    leftScore++;
    checkWin();
    resetBall();
  }
}

function checkWin() {
  if (leftScore >= maxScore || rightScore >= maxScore) {
    gameOver = true;
  }
}

function spawnParticles(x, y, c) {
  for (let i = 0; i < 20; i++) {
    particles.push({
      x: x,
      y: y,
      vx: random(-3, 3),
      vy: random(-3, 3),
      life: 30,
      color: c,
    });
  }
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    fill(p.color);
    noStroke();
    ellipse(p.x, p.y, 5, 5);
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

function keyPressed() {
  if (gameOver && key === 'r') {
    leftScore = 0;
    rightScore = 0;
    gameOver = false;
    resetBall();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
