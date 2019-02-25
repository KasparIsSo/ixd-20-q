let MorphingShapes = new Array();
let travelDistace, offset, canvasWidth, canvasHeight;
const colors = getColors(91);
let morphingShapeAmount = 1;

class MorphingShape {
  constructor(p) {
    this.dir = true;
    this.vel = 0;
    this.x = 0;
    this.y = canvasHeight / 2;
    this.r = offset / 2;
    this.startFill = p.color(colors[1]);
    this.endFill = p.color(colors[0]);
    this.duration = 150;
    this.currentDuration = 0;
    this.roundedEdge = this.r / 2;
  }

  display(p) {
    p.noStroke();
    let roundedEdge = Math.abs(
      (this.currentDuration / this.duration) * this.roundedEdge
    );

    p.push();
    p.translate(this.x + offset, this.y);
    p.rotate(
      this.dir
        ? ease(this.currentDuration / this.duration) * Math.PI
        : Math.PI -
            ease(
              Math.abs(this.currentDuration - this.duration) / this.duration
            ) *
              Math.PI
    );
    p.fill(
      p.lerpColor(
        this.startFill,
        this.endFill,
        this.dir
          ? ease(this.currentDuration / this.duration)
          : 1 -
              ease(
                Math.abs(this.currentDuration - this.duration) / this.duration
              )
      )
    );
    p.rect(0 - this.r / 2, 0 - this.r / 2, this.r, this.r, roundedEdge);
    p.pop();
  }

  update() {
    this.x = this.dir
      ? ease(this.currentDuration / this.duration) * travelDistance
      : travelDistance -
        ease(Math.abs(this.currentDuration - this.duration) / this.duration) *
          travelDistance;
    this.dir ? this.currentDuration++ : this.currentDuration--;

    if (this.currentDuration >= this.duration) {
      this.dir = false;
    } else if (this.currentDuration < 0) {
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
    lCanvas.parent("display-sketch");
    travelDistance = displaySketch.offsetWidth * 0.6;
    offset = displaySketch.offsetWidth * 0.2;

    let centerR = Math.min(canvasWidth * 0.3, canvasHeight * 0.3);
    initSketch(p, centerR);
  };

  p.draw = function() {
    p.background(colors[4]);

    MorphingShapes.forEach(morphingShape => {
      morphingShape.display(p);
      morphingShape.update();
    });
  };
};

let s = new p5(sketch);

function initSketch(p) {
  MorphingShapes = new Array();
  for (let i = 0; i < morphingShapeAmount; i++) {
    MorphingShapes.push(new MorphingShape(p));
  }
}

function ease(value, power = 3) {
  return 1 - Math.pow(1 - value, power);
}
