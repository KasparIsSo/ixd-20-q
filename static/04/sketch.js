let Balls = new Array();
let Particles = new Array();
let travelDistace, canvasWidth, canvasHeight, forceDist, centerR;
const colors = getColors(77);
let flowDirection;

class Ball {
  constructor(p, i, x, y, cR) {
    this.r = cR;
    this.x = x;
    this.y = y;
    this.fill = colors[i];
  }

  display(p) {
    p.fill(this.fill);
    p.noStroke();
    p.ellipse(this.x, this.y, this.r);
  }
}

class Particle {
  constructor(p, x, y) {
    this.x = x;
    this.endX =
      Math.round(Math.random() * (canvasWidth * 0.5)) + canvasWidth * 0.5;
    this.originalY = y;
    this.y = this.originalY;
    this.dir = p.createVector(1, 0);

    this.originalDir = this.dir;
  }

  display(p) {
    p.noStroke();
    p.ellipse(this.x, this.y, 1);
  }

  update(p) {
    let opac = 1;
    let closeToBall = false;
    for (let j = 0; j < Balls.length; j++) {
      let distFromBall = p.dist(this.x, this.y, Balls[j].x, Balls[j].y);
      if (distFromBall <= forceDist) {
        closeToBall = true;
        if (this.x <= Balls[j].x) {
          this.dir.x += (0.004 * (this.x - Balls[j].x)) / forceDist;
          this.dir.y += (0.004 * (this.y - Balls[j].y)) / forceDist;
        } else {
          this.dir.x -= (0.004 * (this.x - Balls[j].x)) / forceDist;
          this.dir.y -= (0.006 * (this.y - Balls[j].y)) / forceDist;
        }
        opac = Math.pow(distFromBall / forceDist, 3);
      }
    }
    if (!closeToBall && this.dir.y != 0) {
      this.dir.y -= this.dir.y * 0.01;
    }
    this.dir.setMag(1);
    this.x += this.dir.x;
    this.y += this.dir.y;
    let c = p.color(colors[2]);
    c._array[3] = opac;
    p.fill(c);
    this.display(p);
  }

  isDead(p) {
    if (this.x > this.endX) {
      let i = Particles.indexOf(this);
      Particles.splice(i, 1);

      addParticle(p, centerR);
    }
  }
}

let sketch = function(p) {
  p.setup = function() {
    const displaySketch = document.getElementById("display-sketch");
    canvasWidth = displaySketch.offsetWidth;
    canvasHeight = displaySketch.offsetHeight;

    let lCanvas = p.createCanvas(
      displaySketch.offsetWidth,
      displaySketch.offsetHeight
    );
    lCanvas.parent("display-sketch");

    flowDirection = p.createVector(canvasWidth, canvasHeight).setMag(1);

    centerR = Math.min(canvasWidth * 0.2, canvasHeight * 0.2);
    forceDist = Math.min(canvasWidth * 0.2, canvasHeight * 0.2);
    initSketch(p, centerR);
    p.background(colors[0]);
  };

  p.draw = function() {
    Particles.forEach(particle => {
      particle.update(p);
      particle.isDead(p);
    });
  };
};

let s = new p5(sketch);

function initSketch(p, cR) {
  Balls = new Array();
  const ballAmount = 3;
  while (Balls.length < ballAmount) {
    let overlapping = false;

    let x = cR + Math.floor(Math.random() * (canvasWidth - 2 * cR));
    let y = cR + Math.floor(Math.random() * (canvasHeight - 2 * cR));

    for (let j = 0; j < Balls.length; j++) {
      let other = Balls[j];
      let d = p.dist(x, y, other.x, other.y);
      if (d < cR * 2) {
        overlapping = true;
      }
    }
    if (!overlapping) {
      Balls.push(new Ball(p, 2, x, y, cR));
    }
  }

  Particles = new Array();
  const particleAmount = 300;
  for (let i = 0; i < particleAmount; i++) {
    addParticle(p, cR);
  }
}

function addParticle(p, cR) {
  let x = Math.round(Math.random() * (canvasWidth * 0.5));
  let y = Math.floor(Math.random() * canvasHeight);
  Particles.push(new Particle(p, x, y));
}

function ease(value, power = 3) {
  return 1 - Math.pow(1 - value, power);
}
