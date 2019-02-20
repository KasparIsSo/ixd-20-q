// // function setup() {
// //   const displaySketch = document.getElementById('display-sketch')
// //   canvasWidth = displaySketch.offsetWidth
// //   createCanvas(displaySketch.offsetWidth, displaySketch.offsetHeight).parent(
// //     'display-sketch'
// //   )
// //   initSketch()
// // }

// function draw() {}

let Balls = new Array();
let travelDistace, offset, canvasWidth, canvasWidthHalf, canvasHeight;

let leftSketch = function(p) {
	let x = 100;
	let y = 100;

	p.setup = function() {
		const displaySketch = document.getElementById("display-sketch");
		canvasWidth = displaySketch.offsetWidth;
		canvasHeight = displaySketch.offsetHeight;
		canvasWidthHalf = displaySketch.offsetWidth * 0.5;

		let lCanvas = p.createCanvas(
			displaySketch.offsetWidth * 0.5,
			displaySketch.offsetHeight
		);
		travelDistance = displaySketch.offsetWidth * 0.8;
		offset = displaySketch.offsetWidth * 0.1;
		lCanvas.parent("display-sketch");
		initSketch();
	};

	p.draw = function() {
		p.background(0);

		Balls.forEach(ball => {
			ball.display(p);
		});
	};
};

let rightSketch = function(p) {
	let x = 100;
	let y = 100;

	p.setup = function() {
		const displaySketch = document.getElementById("display-sketch");

		let rCanvas = p.createCanvas(
			displaySketch.offsetWidth * 0.5,
			displaySketch.offsetHeight
		);
		rCanvas.parent("display-sketch");
		rCanvas.position(displaySketch.offsetWidth * 0.5, 0);
	};

	p.draw = function() {
		p.background(255);

		Balls.forEach(ball => {
			ball.display(p, false);
			ball.update();
		});
	};
};

let ls = new p5(leftSketch);
let rs = new p5(rightSketch);

function initSketch() {
	Balls = new Array();
	Balls.push(new Ball());
}

function ease(value, power = 2) {
	// return 1 - Math.pow(1 - value, power);
	return value < 0.5
		? 2 * Math.pow(value, power)
		: -1 + (4 - 2 * value) * value;
}

class Ball {
	constructor() {
		this.dir = true;
		this.vel = 0;
		// this.start = performance.now();
		this.x = 0;
		this.y = canvasHeight / 2;
		this.r = offset / 2;
		this.duration = 0;
	}

	display(p, leftCanvas = true) {
		if (leftCanvas) {
			p.fill(255);
			p.ellipse(this.x + offset, this.y, this.r, this.r);
		} else {
			p.fill(0);
			p.ellipse(this.x - canvasWidthHalf + offset, this.y, this.r, this.r);
		}
	}

	update() {
		this.x = ease(this.duration / 100) * travelDistance;
		this.dir ? this.duration++ : this.duration--;

		let scalar =
			this.duration <= 50
				? this.duration / 50
				: Math.abs(this.duration - 100) / 50;
		this.r = ((1 + scalar) * offset) / 2;

		if (this.duration >= 100) {
			this.dir = false;
		} else if (this.duration < 0) {
			this.dir = true;
		}
	}
}
