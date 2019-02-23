let flow, initR;
let particles = [];
const tile = 50;
let opac = 255;
let canvasWidth;

function setup() {
  const displaySketch = document.getElementById("display-sketch");
  canvasWidth = displaySketch.offsetWidth;
  createCanvas(displaySketch.offsetWidth, displaySketch.offsetHeight).parent(
    "display-sketch"
  );
  initSketch();
}

function draw() {
  particles.forEach(function(p) {
    if (p.live) {
      p.update();
      p.isDead();
    }
  });

  if (opac <= 0) {
    particles = [];
  }

  noFill();
  stroke(255, opac);
  strokeWeight(0.2);
  beginShape();
  for (let i = 0; i < particles.length; i++) {
    vertex(particles[i].x, particles[i].y);
  }
  endShape(CLOSE);
  opac -= 0.3;
}

function flowfield() {
  const xVec = Math.ceil(width / tile) + 2;
  const yVec = Math.ceil(height / tile) + 2;
  const step = 0.03;
  let flowF = new Array(xVec);

  for (let x = 0; x < xVec; x++) {
    flowF[x] = new Array(yVec);
    for (let y = 0; y < yVec; y++) {
      let n = noise(x * step, y * step);
      flowF[x][y] = createVector(cos(n * TWO_PI * 8), sin(n * TWO_PI * 8));
    }
  }

  return flowF;
}

function addParticles() {
  let count = 36;
  for (let i = 0; i < count; i++) {
    let x = cos((TWO_PI * i) / count);
    let y = sin((TWO_PI * i) / count);
    let pX = initR * x + width / 2;
    let pY = initR * y + height / 2;
    let vel = createVector(x, y).setMag(0.6);
    particles.push(new Particle(pX, pY, vel));
  }
}

class Particle {
  constructor(x, y, vel) {
    this.x = x;
    this.y = y;
    this.vel = vel;
    this.live = true;
  }

  update() {
    let flowDir =
      flow[Math.floor(this.x / tile) + 1][Math.floor(this.y / tile) + 1];
    this.vel.add(flowDir.setMag(0.01)).setMag(0.6);

    this.x += this.vel.x;
    this.y += this.vel.y;
  }

  isDead() {
    if (
      this.x < -1 * tile ||
      this.x > width + tile ||
      this.y < -1 * tile ||
      this.y > height + tile
    ) {
      this.live = false;
    }
  }
}

function initSketch() {
  initR = width / 10;

  flow = flowfield();
  particles = [];
  opac = 255;
  addParticles();
  background(0);
}

windowResized = function() {
  const displaySketch = document.getElementById("display-sketch");
  if (canvasWidth != displaySketch.offsetWidth) {
    canvasWidth = displaySketch.offsetWidth;
    resizeCanvas(displaySketch.offsetWidth, displaySketch.offsetHeight);
    initSketch();
  }
};

window.addEventListener("resize", windowResized);
