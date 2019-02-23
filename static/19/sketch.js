let Balls = new Array();
let travelDistace, offset, canvasWidth, canvasHeight, sideVel, centerR;
const colors = getColors(20);

let sketch = function(p) {
  p.setup = function() {
    const displaySketch = document.getElementById("display-sketch");
    canvasWidth = displaySketch.offsetWidth;
    canvasHeight = displaySketch.offsetHeight;
    sideVel = canvasWidth * 0.004;
    centerR = canvasHeight * 0.02;

    let lCanvas = p.createCanvas(
      displaySketch.offsetWidth,
      displaySketch.offsetHeight
    );
    lCanvas.parent("display-sketch");
  };

  p.draw = function() {
    p.background(colors[4]);

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

class Ball {
  constructor(p) {
    this.x = p.mouseX;
    this.y = p.mouseY;
    this.r = Math.random() * 20;
    this.life = 1;
    this.c = p.color(colors[Math.floor(4 * Math.random())]);

    this.dir = p.createVector(
      sideVel * (Math.random() - 0.5),
      sideVel * (Math.random() - 0.5)
    );
    this.dead = false;
  }

  display(p) {
    this.c._array[3] = this.life;
    p.fill(this.c);
    p.noStroke();
    p.ellipse(this.x, this.y, this.r);
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
