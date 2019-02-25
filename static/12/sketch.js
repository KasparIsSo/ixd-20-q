let Balls = new Array();
let centerR, travelDistace, offset, canvasWidth, canvasHeight, maxDist;

const colors = getColors();

const circCount = 36;

let time = 0;
const timeTrigger = 4;

class Ball {
  constructor(p, x, y) {
    this.startX = 0 * x + canvasWidth / 2;
    this.startY = 0 * y + canvasHeight / 2;
    this.x = this.startX;
    this.y = this.startY;
    this.r = Math.random() * 0.4 * centerR + 0.1 * centerR;
    this.dist = p
      .createVector(maxDist * x + this.r, maxDist * y + this.r)
      .mult(Math.random() * 0.8 + 0.2);
    this.currentDuration = 0;
    this.duration = Math.floor(50 + Math.random() * 500);
    this.opac = 0;
    this.c = p.color(colors[Math.floor(Math.random() * 4)]);
  }

  display(p) {
    if (this.currentDuration <= this.duration * 0.2) {
      this.opac = this.currentDuration / (this.duration * 0.2);
    } else if (this.currentDuration >= this.duration * 0.8) {
      this.opac =
        Math.abs(this.currentDuration - this.duration) / (this.duration * 0.2);
    }
    this.c._array[3] = this.opac;
    p.fill(this.c);
    p.noStroke();
    p.ellipse(this.x, this.y, this.r);
  }

  update() {
    this.x =
      this.startX + ease(this.currentDuration / this.duration) * this.dist.x;
    this.y =
      this.startY + ease(this.currentDuration / this.duration) * this.dist.y;
    this.currentDuration++;
  }

  isDead() {
    if (this.currentDuration >= this.duration) {
      let i = Balls.indexOf(this);
      Balls.splice(i, 1);
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

    maxDist =
      Math.pow(Math.pow(canvasWidth, 2) + Math.pow(canvasHeight, 2), 0.5) / 2;

    centerR = Math.min(canvasWidth, canvasHeight) * 0.1;

    // initSketch(p);
  };

  p.draw = function() {
    p.background(colors[4]);

    Balls.forEach(ball => {
      ball.display(p);
      ball.update();
      ball.isDead();
    });

    time++;
    if (time % timeTrigger == 0) {
      let k = Math.floor(Math.random() * circCount);
      let x = Math.sin((Math.PI * 2 * k) / circCount);
      let y = Math.cos((Math.PI * 2 * k) / circCount);
      Balls.push(new Ball(p, x, y));
    }
  };
};

let s = new p5(sketch);

function initSketch(p) {
  Balls = new Array();
  // let ballAmount = 100;
  for (let i = 0; i < circCount; i++) {
    let x = Math.sin((Math.PI * 2 * i) / circCount);
    let y = Math.cos((Math.PI * 2 * i) / circCount);
    Balls.push(new Ball(p, x, y));
  }
}

function ease(value, power = 3) {
  return 1 - Math.pow(1 - value, power);
}
