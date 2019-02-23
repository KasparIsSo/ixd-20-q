let Balls = new Array();
let travelDistace, centerR, offset, canvasWidth, canvasHeight;
const colors = getColors(17);
let ballAmount = 12;

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

    centerR = Math.min(canvasWidth * 0.15, canvasHeight * 0.15);
    initSketch(p, centerR);
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
  for (let i = 0; i < ballAmount; i++) {
    let pulse = i % 2 == 1 ? true : false;
    let x =
      centerR * 2 * Math.sin((2 * Math.PI * i) / ballAmount) + canvasWidth / 2;
    let y =
      centerR * 2 * Math.cos((2 * Math.PI * i) / ballAmount) + canvasHeight / 2;
    Balls.push(new Ball(p, i, x, y, pulse));
  }
}

function ease(value, power = 2) {
  return 1 - Math.pow(1 - value, power);
}

class Ball {
  constructor(p, i, x, y, pulse) {
    this.dir = pulse ? true : false;
    this.r = pulse ? 0 : centerR;
    // this.x = pulse ? (canvasWidth - centerR) / 2 : (canvasWidth + centerR) / 2;
    // this.y = canvasHeight / 2;
    this.x = x;
    this.y = y;
    this.i = pulse ? 3 : 1;
    this.duration = 180;
    this.currentDuration = (i * this.duration) / ballAmount;
  }

  display(p) {
    p.noStroke();
    p.fill(colors[this.i]);
    p.ellipse(this.x, this.y, this.r);
  }

  update() {
    this.r = centerR * ease(this.currentDuration / this.duration);
    if (this.currentDuration <= this.duration / 2) {
      this.r = centerR * ease(this.currentDuration / this.duration);
    } else {
      this.r =
        centerR *
        ease(Math.abs(this.currentDuration - this.duration) / this.duration);
    }

    if (this.currentDuration >= this.duration) {
      this.currentDuration = 0;
    }
    this.currentDuration++;
    //   this.dir = false;
    // } else if (this.currentDuration <= 0) {
    //   this.dir = true;
    // }

    // if (this.dir) {
    //   this.currentDuration++;
    // } else {
    //   this.currentDuration--;
    // }

    // this.r = (1 - ease(this.currentDuration / this.duration)) * this.startR;
    // this.rotate += Math.PI / this.duration;
  }
}
