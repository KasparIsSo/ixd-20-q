let Letters = new Array();
let travelDistace,
  canvasWidth,
  canvasHeight,
  innerWidth,
  innerHeight,
  letterAmount,
  margin,
  tile,
  columns,
  textSize;
const colors = getColors(85);
const intro =
  "I started off poor. My parents had separated and my mom was left raising my sister and myself, alone with no one to turn to. She worked tirelessly to get us out of welfare. From balancing three jobs and raising us to eventually getting her real estate license, my mom’s hard work was reflected in my education. I went from a public school to an art school to a private school. Through this, I was able to gather a variety of perspectives, from being extremely poor to hanging out with very well off friends.";

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

    letterAmount = intro.length;

    margin = Math.min(canvasWidth, canvasHeight) * 0.2;
    innerWidth = canvasWidth - 2 * margin;
    innerHeight = canvasHeight - 2 * margin;
    columns = 35;
    tile = innerWidth / columns;
    textSize = tile / 2.2;
    initSketch(p);
  };

  p.draw = function() {
    p.background(colors[4]);

    Letters.forEach(letter => {
      letter.display(p);
      letter.update();
    });
  };
};

let s = new p5(sketch);

function initSketch(p) {
  Letter = new Array();
  for (let i = 0; i < letterAmount; i++) {
    let x = tile * (i % (columns + 1)) + margin;
    let y = tile * Math.floor(i / (columns + 1)) + margin;
    let n = Math.floor(4 * Math.random());
    Letters.push(new Lett(p, intro[i], x, y, n));
  }
}

function ease(value, power = 2) {
  return 1 - Math.pow(1 - value, power);
}

class Lett {
  constructor(p, letter, x, y, n) {
    this.l = letter;
    this.x = x;
    this.y = y;
    this.n = p.color(colors[n]);
    this.dir = Math.random() > 0.5 ? true : false;
    this.opac = Math.floor(100 * Math.random()) / 100;
  }

  display(p) {
    p.push();
    p.translate(this.x, this.y);
    p.textAlign(p.CENTER, p.CENTER);
    p.fill(this.n);
    p.textSize(textSize);
    p.text(this.l, 0, 0);
    p.pop();
  }

  update() {
    if (this.opac >= 1) {
      this.dir = false;
    } else if (this.opac <= 0) {
      this.dir = true;
    }

    if (this.dir) {
      this.opac += 0.01;
    } else {
      this.opac -= 0.01;
    }
    this.n._array[3] = this.opac;
  }
}
