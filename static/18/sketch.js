let Balls = new Array();
let travelDistace, offset, canvasWidth, canvasHeight;
const colors = getColors(17);

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
      ball.update(p);
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

class Ball {
  constructor(p) {
    this.x = Math.random() * canvasWidth;
    this.y = 0;
    this.r = Math.random() * 20;
    this.currentDuration = 0;
    this.duration = 100 + Math.floor(Math.random() * 200);
    this.opac = 0;
    this.c = p.color(colors[Math.floor(4 * Math.random())]);

    this.dist = p.createVector(
      this.x,
      (0.3 + Math.random()) * (0.7 * canvasHeight)
    );
    this.dead = false;
  }

  display(p) {
    this.c._array[3] = this.opac;
    p.fill(this.c);
    p.noStroke();
    p.ellipse(this.x, this.y, this.r);
  }

  update(p) {
    if (this.dead) {
      if (this.opac <= 0) {
        this.isDead(p);
      }
      this.opac -= 0.02;
    } else {
      if (this.opac <= 1) {
        this.opac += 0.02;
      }
      this.currentDuration++;
      this.y = ease(this.currentDuration / this.duration) * this.dist.y;
      if (this.currentDuration >= this.duration) {
        this.dead = true;
      }
    }
  }

  isDead(p) {
    let i = Balls.indexOf(this);
    Balls.splice(i, 1);
    Balls.push(new Ball(p));
  }
}
