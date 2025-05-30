let symbolSize = 20;
let streams = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textFont('monospace');
  textSize(symbolSize);

  let x = 0;
  for (let i = 0; i <= width / symbolSize; i++) {
    let stream = new Stream(x, random(-1000, 0));
    streams.push(stream);
    x += symbolSize;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  streams = [];
  let x = 0;
  for (let i = 0; i <= width / symbolSize; i++) {
    let stream = new Stream(x, random(-1000, 0));
    streams.push(stream);
    x += symbolSize;
  }
}

function draw() {
  background(0, 150);

  streams.forEach(stream => stream.render());

  // Orologio digitale
  let h = nf(hour(), 2);
  let m = nf(minute(), 2);
  let s = nf(second(), 2);
  let ora = `${h}:${m}:${s}`;

  textAlign(CENTER, CENTER);
  textSize(min(width, height) * 0.1);
  fill(0, 255, 70);
  text(ora, width / 2, height / 2);
}

// ===== CLASSI MATRIX =====

class Symbol {
  constructor(x, y, speed, first) {
    this.x = x;
    this.y = y;
    this.value = '';
    this.speed = speed;
    this.first = first;
    this.switchInterval = round(random(4, 20));
    this.setToRandomSymbol();
  }

  setToRandomSymbol() {
    const charType = round(random(0, 2));
    if (charType === 0) {
      this.value = String.fromCharCode(0x30A0 + round(random(0, 96))); // Katakana
    } else if (charType === 1) {
      this.value = String.fromCharCode(48 + floor(random(10))); // numeri
    } else {
      this.value = String.fromCharCode(65 + floor(random(26))); // lettere
    }
  }

  update() {
    this.y = this.y >= height ? 0 : this.y + this.speed;
    if (frameCount % this.switchInterval === 0) {
      this.setToRandomSymbol();
    }
  }

  render() {
    this.update();
    if (this.first) {
      fill(180, 255, 180);
    } else {
      fill(0, 255, 70);
    }
    text(this.value, this.x, this.y);
  }
}

class Stream {
  constructor(x, y) {
    this.symbols = [];
    this.totalSymbols = round(random(5, 30));
    this.speed = random(2, 10);
    this.generateSymbols(x, y);
  }

  generateSymbols(x, y) {
    let first = true;
    for (let i = 0; i < this.totalSymbols; i++) {
      const symbol = new Symbol(x, y, this.speed, first);
      this.symbols.push(symbol);
      y -= symbolSize;
      first = false;
    }
  }

  render() {
    this.symbols.forEach(s => s.render());
  }
}
