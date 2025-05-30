let drops = [];
let secondHistory = [];
let minuteHistory = [];
let hourHistory = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);
  textFont('monospace');
  textSize(16);

  // Inizializza le colonne di caratteri per pioggia Matrix
  for (let i = 0; i < width / 16; i++) {
    drops[i] = random(-1000, 0);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // Sfondo semitrasparente per effetto scia pioggia
  background(0, 0.1);

  // Pioggia di caratteri Matrix
  drawMatrixRain();

  translate(width / 2, height / 2);
  let r = min(width, height) * 0.4;
  let h = hour() % 12;
  let m = minute();
  let s = second();

  // Linee radiali pulsanti
  drawRadialLines(r);

  // Quadrante circolare
  stroke(120, 100, 70);
  strokeWeight(8);
  noFill();
  ellipse(0, 0, r * 2);

  // Numeri con simboli giapponesi
  let simboli = ["シ", "ス", "ツ", "ヌ", "ネ", "ナ", "ソ", "セ", "サ", "コ", "ケ", "カ"];
  fill(120, 100, 80);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(20);
  for (let i = 0; i < 12; i++) {
    let angle = map(i, 0, 12, 0, 360) - 90;
    let x = cos(angle) * r * 0.85;
    let y = sin(angle) * r * 0.85;
    text(simboli[i], x, y);
  }

  // Scie lancetta ore
  addHistory(hourHistory, map(h + m / 60, 0, 12, 0, 360), r * 0.5);
  drawHistory(hourHistory, 6);

  // Scie lancetta minuti
  addHistory(minuteHistory, map(m + s / 60, 0, 60, 0, 360), r * 0.7);
  drawHistory(minuteHistory, 4);

  // Scia lancetta secondi
  addHistory(secondHistory, map(s, 0, 60, 0, 360), r * 0.9);
  drawHistory(secondHistory, 2);

  // Lancetta ore con glow
  let glowH = sin(frameCount * 0.05) * 20 + 80;
  push();
  rotate(map(h + m / 60, 0, 12, 0, 360));
  stroke(120, 100, glowH);
  strokeWeight(6);
  line(0, 0, 0, -r * 0.5);
  pop();

  // Lancetta minuti con glow
  let glowM = sin(frameCount * 0.07 + 50) * 20 + 80;
  push();
  rotate(map(m + s / 60, 0, 60, 0, 360));
  stroke(120, 100, glowM);
  strokeWeight(4);
  line(0, 0, 0, -r * 0.7);
  pop();

  // Lancetta secondi con glow e pallino rosso centrale lancetta
  let glowS = sin(frameCount * 0.09 + 100) * 20 + 80;
  let secondAngle = map(s, 0, 60, 0, 360);
  push();
  rotate(secondAngle);
  stroke(120, 100, glowS);
  strokeWeight(2);
  line(0, 0, 0, -r * 0.9);
  fill(0, 100, 100);
  ellipse(0, -r * 0.9, 15);
  pop();

  // Centro con glow pulsante verde
  let glowC = sin(frameCount * 0.1) * 30 + 70;
  fill(120, 100, glowC);
  noStroke();
  ellipse(0, 0, 15);

}

// Funzione per aggiungere posizioni nelle scie
function addHistory(historyArray, angle, length) {
  let x = cos(angle - 90) * length;
  let y = sin(angle - 90) * length;
  historyArray.push({ x, y });
  if (historyArray.length > 20) historyArray.shift();
}

// Disegna la scia
function drawHistory(historyArray, weight) {
  noFill();
  stroke(120, 100, 100, 0.4);
  strokeWeight(weight);
  beginShape();
  for (let p of historyArray) {
    vertex(p.x, p.y);
  }
  endShape();
}

// Linee radiali pulsanti attorno all’orologio
function drawRadialLines(radius) {
  let count = 60;
  let baseWeight = 1.5;
  for (let i = 0; i < count; i++) {
    let angle = map(i, 0, count, 0, 360) - 90;
    let len = radius * 0.05;
    let glow = sin(frameCount * 0.1 + i) * 50 + 50;

    let x1 = cos(angle) * radius * 0.95;
    let y1 = sin(angle) * radius * 0.95;
    let x2 = cos(angle) * (radius * 0.95 + len);
    let y2 = sin(angle) * (radius * 0.95 + len);

    stroke(120, 100, glow);
    strokeWeight(baseWeight);
    line(x1, y1, x2, y2);
  }
}

// Pioggia di caratteri in stile Matrix
function drawMatrixRain() {
  fill(120, 100, 100);
  textSize(16);
  for (let i = 0; i < drops.length; i++) {
    let char = String.fromCharCode(0x30A0 + floor(random(0, 96)));
    text(char, i * 16, drops[i] * 16);
    drops[i] += 0.7;
    if (drops[i] * 16 > height && random() > 0.975) {
      drops[i] = 0;
    }
  }
}
