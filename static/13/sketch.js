let Balls = new Array();
let travelDistace, offset, canvasWidth, canvasHeight, sideVel, centerR;
let raptors;

class Ball {
  constructor(p) {
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 3;
    this.r = Math.random() * centerR;
    this.life = 1;
    this.c = p.color(0);
    this.rotate = 2 * Math.random() * Math.PI;

    this.dir = p.createVector(
      sideVel * (Math.random() - 0.5),
      sideVel * (Math.random() - 0.5)
    );
    this.dead = false;
  }

  display(p) {
    this.c._array[3] = 1 - this.life;
    p.fill(this.c);
    p.noStroke();
    p.push();
    p.translate(this.x, this.y);
    p.rotate(this.rotate);
    // p.tint(255, this.life * 255);
    p.image(raptors, 0, 0, this.r, this.r);
    p.ellipse(this.r / 2, this.r / 2, this.r * 0.8);
    // p.rect(0, 0, this.r, this.r);
    // p.ellipse(this.x, this.y, this.r);
    p.pop();
  }

  update(p) {
    this.life -= 0.01;
    this.dir.y += 0.05;
    this.y += this.dir.y;
    this.x += this.dir.x;
    if (this.life <= 0) {
      this.isDead(p);
    }
  }

  isDead(p) {
    // if (this.y >= 2 * centerR + canvasHeight) {
    let i = Balls.indexOf(this);
    Balls.splice(i, 1);
    Balls.push(new Ball(p));
    // }
  }
}

let sketch = function(p) {
  p.setup = function() {
    const displaySketch = document.getElementById("display-sketch");
    canvasWidth = displaySketch.offsetWidth;
    canvasHeight = displaySketch.offsetHeight;
    sideVel = canvasWidth * 0.004;
    centerR = canvasHeight * 0.1;

    raptors = p.loadImage("/13/raptors.png");

    let lCanvas = p.createCanvas(
      displaySketch.offsetWidth,
      displaySketch.offsetHeight
    );
    lCanvas.parent("display-sketch");
  };

  p.draw = function() {
    p.background(0);

    if (Balls.length < 180) {
      Balls.push(new Ball(p));
    }

    Balls.forEach(ball => {
      ball.display(p);
      ball.update(p);
    });
  };
};

let s = new p5(sketch);

function ease(value, power = 3) {
  return 1 - Math.pow(1 - value, power);
}
