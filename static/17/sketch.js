let Avatars = new Array();
let travelDistance, offset, canvasWidth, canvasWidthHalf, canvasHeight;

let images = new Array();
let avatarAmount = 3;

class Avatar {
  constructor(i, maxI) {
    this.dir = true;
    this.vel = 0;
    this.i = i;
    this.r = offset / 2;
    this.x = 0;
    this.y = ((i + 1) * canvasHeight) / 4;
    this.maxDuration = 180;
    this.duration = (this.maxDuration * i) / maxI;
  }

  display(p) {
    p.fill(255);
    p.image(
      images[this.i],
      this.x + offset - this.r / 2,
      this.y - this.r / 2,
      this.r,
      this.r
    );
  }

  update() {
    this.x = ease(this.duration / this.maxDuration) * travelDistance;
    this.dir ? this.duration++ : this.duration--;

    let scalar =
      this.duration <= this.maxDuration / 2
        ? (1.5 * this.duration) / (this.maxDuration / 2)
        : (1.5 * Math.abs(this.duration - this.maxDuration)) /
          (this.maxDuration / 2);
    this.r = ((1 + scalar) * offset) / 2;

    if (this.duration >= this.maxDuration) {
      this.dir = false;
    } else if (this.duration < 0) {
      this.dir = true;
    }
  }
}

let sketch = function(p) {
  let x = 100;
  let y = 100;

  p.setup = function() {
    const displaySketch = document.getElementById("display-sketch");
    canvasWidth = displaySketch.offsetWidth;
    canvasHeight = displaySketch.offsetHeight;
    canvasWidthHalf = displaySketch.offsetWidth * 0.5;

    let lCanvas = p.createCanvas(
      displaySketch.offsetWidth,
      displaySketch.offsetHeight
    );
    travelDistance = displaySketch.offsetWidth * 0.8;
    offset = displaySketch.offsetWidth * 0.1;
    lCanvas.parent("display-sketch");
    initSketch();

    for (let i = 0; i < avatarAmount; i++) {
      let img = p.loadImage("/17/avatar" + i + ".jpg");
      images.push(img);
    }
  };

  p.draw = function() {
    p.background(0);

    Avatars.forEach(avatar => {
      avatar.display(p);
      avatar.update();
    });
  };
};

let s = new p5(sketch);

function initSketch() {
  Avatars = new Array();
  for (let i = 0; i < avatarAmount; i++) {
    Avatars.push(new Avatar(i, avatarAmount));
  }
}

function ease(value, power = 2) {
  return value < 0.5
    ? 2 * Math.pow(value, power)
    : -1 + (4 - 2 * value) * value;
}
