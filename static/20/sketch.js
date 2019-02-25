let Balls = new Array();
let travelDistace, offset, canvasWidth, canvasHeight;
const colors = getColors();

class Ball {
  constructor(p) {
    this.c = p.color(colors[Math.floor(Math.random() * 4)]);
    this.startX = Math.random() * canvasWidth;
    this.startY = Math.random() * canvasHeight;
    this.x = this.startX;
    this.y = this.startY;
    this.r = Math.random() * canvasWidth;
    this.currentDuration = 0;
    this.duration = Math.floor(50 + Math.random() * 200);
    this.opac = 0;

    this.dist = p.createVector(
      canvasWidth / 2 - this.x,
      canvasHeight / 2 - this.y
    );
  }

  display(p) {
    if (this.opac <= 1) {
      this.opac += 0.02;
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

  isDead(p) {
    if (this.currentDuration >= this.duration) {
      let i = Balls.indexOf(this);
      Balls.splice(i, 1);
      Balls.push(new Ball(p));
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
    initSketch(p);
  };

  p.draw = function() {
    p.background(colors[4]);

    Balls.forEach(ball => {
      ball.display(p);
      ball.update();
      ball.isDead(p);
    });
  };
};

let s = new p5(sketch);

function initSketch(p) {
  Balls = new Array();
  let ballAmount = 100;
  for (let i = 0; i < ballAmount; i++) {
    Balls.push(new Ball(p));
  }
}

function ease(value, power = 3) {
  return 1 - Math.pow(1 - value, power);
}
