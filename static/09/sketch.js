let Balls = new Array();
let travelDistace, centerR, offset, canvasWidth, canvasHeight;
const colors = getColors();
let ballAmount = 3;
let colorCount = 3;

class Ball {
  constructor(i, k) {
    this.r = centerR;
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
    this.c = colors[i];
    this.duration = 100;
    this.currentDuration = this.duration * k;
  }

  display(p) {
    p.noStroke();
    p.fill(this.c);
    p.ellipse(this.x, this.y, this.r);
  }

  update() {
    if (this.currentDuration >= this.duration) {
      this.r = centerR;
    } else {
      this.r = centerR * ease(this.currentDuration / this.duration);
    }
    this.currentDuration--;
  }

  isDead() {
    if (this.currentDuration < 0) {
      Balls.push(new Ball(colorCount, 3));
      Balls.shift();
      colorCount = (colorCount + 1) % 5;
      console.log(colorCount);
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

    // centerR = 1.3 * Math.max(canvasWidth, canvasHeight);
    centerR = Math.pow(
      Math.pow(canvasWidth, 2) + Math.pow(canvasHeight, 2),
      0.5
    );
    initSketch();
  };

  p.draw = function() {
    p.background(255);
    for (let i = Balls.length - 1; i >= 0; i--) {
      Balls[i].display(p);
      Balls[i].update();
      Balls[i].isDead();
    }
  };
};

let s = new p5(sketch);

function initSketch() {
  Balls = new Array();
  for (let i = 0; i < ballAmount; i++) {
    Balls.push(new Ball(i, i + 1));
  }
}

function ease(value, power = 2) {
  return 1 - Math.pow(1 - value, power);
}
