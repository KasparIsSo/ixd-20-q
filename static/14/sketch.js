let Leaves = new Array();
let Leaves2 = new Array();
let travelDistace, offset, canvasWidth, canvasHeight;
const colors = getColors(67);
let leavesAmount = 12;

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
    p.background(colors[0]);

    Leaves.forEach(leaf => {
      leaf.display(p);
      leaf.update();
    });

    Leaves2.forEach(leaf => {
      leaf.display(p);
      leaf.update();
    });
  };
};

let s = new p5(sketch);

function initSketch(p) {
  Leaves = new Array();
  for (let i = 0; i < leavesAmount; i++) {
    Leaves.push(new Leaf(i, canvasWidth / 2, 0, colors[2]));
  }
  for (let i = 0; i < leavesAmount; i++) {
    Leaves2.push(new Leaf(i, canvasWidth / 2, canvasHeight, colors[3]));
  }
}

function ease(value, power = 3) {
  return 1 - Math.pow(1 - value, power);
}

class Leaf {
  constructor(id, centerX, centerY, color) {
    this.x = canvasHeight * 0.5;
    this.measure = canvasHeight * 0.1;
    this.rotate = (id * Math.PI * 2) / leavesAmount;
    this.strokeWeight = canvasHeight * 0.01;
    this.centerX = centerX;
    this.centerY = centerY;
    this.color = color;
  }

  display(p) {
    p.push();
    p.translate(this.centerX, this.centerY);
    p.rotate(this.rotate);
    p.translate(this.x, 0);
    p.beginShape();
    p.noFill();
    p.stroke(this.color);
    p.strokeWeight(this.strokeWeight);
    p.vertex(0, 0);
    p.bezierVertex(
      this.measure,
      -1.5 * this.measure,
      2 * this.measure,
      -1.5 * this.measure,
      4 * this.measure,
      0
    );
    p.bezierVertex(
      2 * this.measure,
      1.5 * this.measure,
      this.measure,
      1.5 * this.measure,
      0,
      0
    );
    p.endShape();
    p.pop();
  }

  update() {
    this.rotate += Math.PI / 360;
  }
}
