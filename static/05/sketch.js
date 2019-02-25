let Balls = new Array();
let travelDistace, circWidth, canvasWidth, canvasWidthHalf, canvasHeight;
const ballAmount = 4;
const colors = getColors(96);

class Ball {
  constructor(color, x) {
    this.dir = Math.round(Math.random());
    this.vel = 0;
    this.x = x;
    this.y = 0;
    this.r = circWidth;
    this.c = color;
    this.rotate = Math.random() * Math.PI * 2;
  }

  display(p) {
    p.push();
    p.translate(canvasWidth / 2, canvasHeight / 2);
    p.rotate(this.rotate);
    p.fill(this.c);
    p.noStroke();
    p.ellipse(this.x, this.y, this.r);
    p.pop();
  }

  update() {
    this.rotate += this.dir == 0 ? Math.PI * 0.05 : -1 * Math.PI * 0.05;
  }
}

let sketch = function(p) {
  let x = 100;
  let y = 100;

  p.setup = function() {
    const displaySketch = document.getElementById("display-sketch");
    canvasWidth = displaySketch.offsetWidth;
    canvasHeight = displaySketch.offsetHeight;
    canvasWidthHalf = displaySketch.offsetWidth;

    let lCanvas = p.createCanvas(
      displaySketch.offsetWidth,
      displaySketch.offsetHeight
    );
    lCanvas.parent("display-sketch");

    circWidth = Math.min(canvasWidth, canvasHeight) * 0.4;
    initSketch(p);
  };

  p.draw = function() {
    p.background(colors[4]);

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
    if (i < ballAmount) {
      Balls.push(
        new Ball(p.color(colors[i]), Math.random() * canvasWidth * 0.01)
      );
    } else {
      Balls.push(
        new Ball(p.color(colors[4]), Math.random() * canvasWidth * 0.005)
      );
    }
  }
}

function ease(value, power = 2) {
  return 1 - Math.pow(1 - value, power);
}
