let Balls = new Array();
let travelDistace, offset, canvasWidth, canvasHeight;
const colors = getColors();

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
  let ballAmount = 6;
  for (let i = 0; i < ballAmount; i++) {
    Balls.push(new Ball(p, i, cR));
  }
}

function ease(value, power = 3) {
  return 1 - Math.pow(1 - value, power);
}

class Ball {
  constructor(p, id, cR) {
    this.dir = true;
    this.startX =
      Math.cos((2 * Math.PI * (id + 0.5)) / 6) * cR + canvasWidth / 2;
    this.startY =
      Math.sin((2 * Math.PI * (id + 0.5)) / 6) * cR + canvasHeight / 2;

    this.dist = p.createVector(
      canvasWidth / 2 - this.startX,
      canvasHeight / 2 - this.startY
    );

    let i;
    if (id < 3) {
      i = 1;
    } else if (id < 5) {
      i = 2;
    } else {
      i = 3;
    }
    this.fill = colors[i];

    this.duration = 100;
    this.currentDuration = Math.floor((this.duration * id) / 6);

    this.x =
      this.startX + ease(this.currentDuration / this.duration) * this.dist.x;
    this.y =
      this.startY + ease(this.currentDuration / this.duration) * this.dist.y;

    this.startR = Math.min(canvasWidth * 0.1, canvasHeight * 0.1);
    this.r = this.startR;
  }

  display(p) {
    p.fill(this.fill);
    p.noStroke();
    p.ellipse(this.x, this.y, this.r);
  }

  update() {
    this.x =
      this.startX + ease(this.currentDuration / this.duration) * this.dist.x;
    this.y =
      this.startY + ease(this.currentDuration / this.duration) * this.dist.y;

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

    // update2() {
    // 	this.x = ease(this.duration / 100) * travelDistance;
    // 	this.dir ? this.duration++ : this.duration--;

    // if (this.duration >= 100) {
    // 	this.dir = false;
    // } else if (this.duration < 0) {
    // 	this.dir = true;
    // }
    // }
  }
}
