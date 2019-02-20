import p5 from 'p5'

const Sketch = new p5(p => {
  p.setup = function() {
    // p.noiseSeed(29467568082);
    console.log(document.getElementById('hero-sketch'))
    p.createCanvas(window.innerWidth, 1.5 * window.innerHeight).parent(
      'hero-sketch'
    )
    p.drawCircle()
  }

  p.draw = function() {
    // p.drawCircle()
    // p.noLoop()
  }

  window.addEventListener('resize', p.windowResized)

  p.windowResized = function() {
    p.resizeCanvas(window.innerWidth, 1.5 * window.innerHeight)
    p.drawCircle()
  }

  p.drawCircle = function() {
    let colors = {
      white: '#ffffff',
      black: '#191919',
    }

    let circles = []
    let rings = Math.max(
      Math.floor(window.innerHeight / 60),
      Math.floor(window.innerWidth / 80)
    )
    let ringCount = 30

    for (let y = 5; y < rings; y++) {
      for (let x = 0; x < ringCount / 2 + 1; x++) {
        const u = x / ringCount
        circles.push(
          new Circle(
            u,
            22 * y,
            p.TWO_PI * u,
            22 * Math.abs(p.noise(2 * u, (2 * y) / rings) - 0.3)
          )
        )
      }
      ringCount += 6
    }

    console.log(window.innerWidth / 1400)
    p.noStroke()
    p.background(colors.black)

    // p.opacity(window.innerWidth / 1400)
    p.fill(255, 255, 255, 255 * (Math.abs(window.innerWidth - 100) / 800))
    p.push()
    p.translate(p.width, p.height / 2)
    circles.forEach(c => {
      c.display()
    })
    p.pop()
  }

  class Circle {
    constructor(x, y, r, radius) {
      this.x = x
      this.y = y
      this.r = r
      this.radius = radius
    }

    display() {
      p.push()
      p.rotate(this.r)
      p.ellipse(0, this.y, this.radius)
      p.pop()
    }
  }
})
