let Balls = new Array();
let travelDistace, offset, canvasWidth, canvasHeight;
const colors = getColors(16);
let ballAmount = 3;

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

    let centerR = Math.min(canvasWidth * 0.3, canvasHeight * 0.3);
    initSketch(p, centerR);
  };

  p.draw = function() {
    p.background(colors[0]);

    Balls.forEach(ball => {
      ball.display(p);
      ball.update();
    });
  };
};

let s = new p5(sketch);

function initSketch(p, cR) {
  Balls = new Array();
  for (let i = 0; i < ballAmount; i++) {
    Balls.push(new Ball(p, i, cR));
  }
}

function ease(value, power = 2) {
  return 1 - Math.pow(1 - value, power);
}

class Ball {
  constructor(p, id, cR) {
    this.dir = true;
    this.startX = cR;
    this.dist = p.createVector(1, 0);
    this.startFill = p.color(colors[4]);
    this.endFill = p.color(colors[3]);
    this.duration = 120;
    this.currentDuration = 120;

    this.x = this.startX;
    this.startR = Math.min(canvasWidth * 0.15, canvasHeight * 0.15);
    this.r = this.startR;
    // this.rotate = (Math.PI * (id + 0.5)) / ballAmount;
    this.startRotate = (2 * Math.PI * id) / ballAmount;
    this.rotate = this.startRotate;
  }

  display(p) {
    p.push();
    p.translate(canvasWidth / 2, canvasHeight / 2);
    p.rotate(this.rotate);
    // p.fill(this.fill);
    p.fill(
      p.lerpColor(
        this.startFill,
        this.endFill,
        ease(this.currentDuration / this.duration)
      )
    );
    p.noStroke();
    p.ellipse(this.x, 0, this.r);
    p.pop();
  }

  update() {
    this.x = this.startX * ease(this.currentDuration / this.duration);

    if (this.currentDuration >= this.duration) {
      this.dir = false;
    } else if (this.currentDuration <= 0) {
      this.dir = true;
    }

    if (this.dir) {
      this.currentDuration++;
    } else {
      this.currentDuration--;
    }

    this.r = (1 - ease(this.currentDuration / this.duration)) * this.startR;
    this.rotate += Math.PI / this.duration;
  }
}
