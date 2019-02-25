let Balls = new Array();
let travelDistance, offset, canvasWidth, canvasHeight;
const colors = getColors();

let ballAmount = 5;

class Ball {
  constructor(i, p) {
    this.dir = true;
    this.vel = 0;
    this.i = i;
    this.r = offset / 2;
    this.x = offset + (i * (canvasWidth - 2 * offset)) / ballAmount;
    this.c = p.lerpColor(
      p.color(colors[0]),
      p.color(colors[4]),
      i / ballAmount
    );
    this.yDistance = (travelDistance * i) / ballAmount;
    this.y = canvasHeight / 2;
    this.maxDuration = 180;
    this.duration = (this.maxDuration * i) / ballAmount;
  }

  display(p) {
    p.noStroke();
    p.fill(this.c);
    p.ellipse(this.x, this.y, this.r, this.r);
  }

  update() {
    this.y =
      (ease(this.duration / this.maxDuration) - 0.5) * this.yDistance +
      canvasHeight / 2;
    this.dir ? this.duration++ : this.duration--;

    let scalar =
      this.duration <= this.maxDuration / 2
        ? (1.5 * this.duration) / (this.maxDuration / 2)
        : (1.5 * Math.abs(this.duration - this.maxDuration)) /
          (this.maxDuration / 2);
    this.r = ((1 + scalar) * offset) / 2;

    if (this.duration >= this.maxDuration) {
      this.dir = false;
    } else if (this.duration < 0) {
      this.dir = true;
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
    offset = Math.max(canvasWidth, canvasHeight) * 0.1;
    travelDistance = canvasHeight - 2 * offset;
    lCanvas.parent("display-sketch");
    initSketch(p);
  };

  p.draw = function() {
    p.background(colors[2]);

    Balls.forEach(ball => {
      ball.display(p);
      ball.update();
    });
  };
};

let s = new p5(sketch);

function initSketch(p) {
  Balls = new Array();
  for (let i = 0; i < ballAmount + 1; i++) {
    Balls.push(new Ball(i, p));
  }
}

function ease(value, power = 2) {
  return value < 0.5
    ? 2 * Math.pow(value, power)
    : -1 + (4 - 2 * value) * value;
}
