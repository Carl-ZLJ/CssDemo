class ParticlesBackground {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  dots: Dot[]
  dotsCount: number
  cwidth: number
  cheight: number

  constructor(canvas: HTMLCanvasElement, dotCount: number) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')!
    this.dotsCount = dotCount
    this.init()
    window.addEventListener('resize', () => {
      this.reset()
    })
  }

  init() {
    this.cwidth = window.innerWidth
    this.cheight = window.innerHeight
    this.canvas.width = this.cwidth
    this.canvas.height = this.cheight
    this.dots = []
    while (this.dots.length < this.dotsCount) this.dots.push(new Dot(this.canvas, true))
  }

  reset() {
    this.init()
  }

  outOfRange(dot: Dot) {
    return dot.x > this.cwidth || dot.x < 0 || dot.y > this.cheight || dot.y < 0
  }

  run() {
    console.log(this.dots.length)

    if (this.dots.length < this.dotsCount) {
      const d = new Dot(this.canvas)
      this.dots.push(d)
    }

    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    this.ctx.fillRect(0, 0, this.cwidth, this.cheight)

    for (let i = 0; i < this.dots.length; i++) {
      const dotI = this.dots[i]
      dotI.x += dotI.speedX
      dotI.y += dotI.speedY

      if (!dotI.grow || this.outOfRange(dotI)) {
        if (dotI.val > 0) {
          dotI.val--
        } else {
          this.dots.splice(i, 1)
          continue
        }
      } else if (dotI.val < dotI.maxVal) {
        dotI.val++
      } else {
        dotI.grow = false
      }

      for (let j = i + 1; j < this.dots.length; j++) {
        const dotJ = this.dots[j]
        const dist = dotJ.distFromDot(dotI)

        if (dist > 150) {
          continue
        }

        const lineClr = (1 - dist / 150) * (dotI.val / dotI.maxVal) * (dotJ.val / dotJ.maxVal)

        this.ctx.beginPath()
        this.ctx.moveTo(dotI.x, dotI.y)
        this.ctx.lineTo(dotJ.x, dotJ.y)
        this.ctx.strokeStyle = `rgba(102, 153, 284, ${lineClr})`
        this.ctx.stroke()
      }

    }

    setTimeout(() => {
      this.run()
    }, 60)
  }
}

class Dot {
  x: number
  y: number
  speedX: number
  speedY: number
  grow: boolean
  maxVal: number
  val: number

  constructor(canvas: HTMLCanvasElement, start: boolean = false) {
    const { width, height } = canvas
    this.x = Math.floor(Math.random() * width)
    this.y = Math.floor(Math.random() * height)
    this.speedX = (Math.random() - 0.5) * 3
    this.speedY = (Math.random() - 0.5) * 3
    this.grow = true
    this.maxVal = Math.floor(Math.random() * 200)
    this.val = start ? Math.floor(Math.random() * this.maxVal) : 0
  }

  distFromDot(other: Dot) {
    return Math.sqrt(
      Math.pow(Math.abs(this.x - other.x), 2)
      + Math.pow(Math.abs(this.y - other.y), 2)
    )
  }
}


const canvas: HTMLCanvasElement = document.querySelector('#canvas')!
const pb = new ParticlesBackground(canvas, 150)

pb.run()
