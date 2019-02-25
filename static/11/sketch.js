let flow, initR;
let particles = new Array();
const tile = 50;
let opac = 255;
let canvasWidth, canvasHeight;

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
      this.x > canvasWidth + tile ||
      this.y < -1 * tile ||
      this.y > canvasHeight + tile
    ) {
      this.live = false;
    }
  }
}

let sketch = function(p) {
  p.setup = function() {
    const displaySketch = document.getElementById("display-sketch");
    canvasWidth = displaySketch.offsetWidth;
    canvasHeight = displaySketch.offsetHeight;
    p.createCanvas(
      displaySketch.offsetWidth,
      displaySketch.offsetHeight
    ).parent("display-sketch");
    initSketch(p);
  };

  p.draw = function() {
    particles.forEach(particle => {
      if (particle.live) {
        particle.update();
        particle.isDead();
      }
    });

    if (opac <= 0) {
      particles = [];
    }

    p.noFill();
    p.stroke(255, opac);
    p.strokeWeight(0.2);
    p.beginShape();
    for (let i = 0; i < particles.length; i++) {
      p.vertex(particles[i].x, particles[i].y);
    }
    p.endShape(p.CLOSE);
    opac -= 0.3;
  };
};

function flowfield(p) {
  const xVec = Math.ceil(canvasWidth / tile) + 2;
  const yVec = Math.ceil(canvasHeight / tile) + 2;
  const step = 0.03;
  let flowF = new Array(xVec);

  for (let x = 0; x < xVec; x++) {
    flowF[x] = new Array(yVec);
    for (let y = 0; y < yVec; y++) {
      let n = p.noise(x * step, y * step);
      flowF[x][y] = p.createVector(
        Math.cos(n * 2 * Math.PI * 8),
        Math.sin(n * 2 * Math.PI * 8)
      );
    }
  }

  return flowF;
}

let s = new p5(sketch);

function addParticles(p) {
  let count = 36;
  for (let i = 0; i < count; i++) {
    let x = Math.cos((2 * Math.PI * i) / count);
    let y = Math.sin((2 * Math.PI * i) / count);
    let pX = initR * x + canvasWidth / 2;
    let pY = initR * y + canvasHeight / 2;
    let vel = p.createVector(x, y).setMag(0.6);
    particles.push(new Particle(pX, pY, vel));
  }
}

function initSketch(p) {
  initR = canvasWidth / 10;

  flow = flowfield(p);
  particles = [];
  opac = 255;
  addParticles(p);
  p.background(0);
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
