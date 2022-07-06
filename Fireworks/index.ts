
class Fireworks {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  cwidth: number
  cheight: number
  shells: Shell[] = []
  passes: Pass[] = []
  lastRun: number

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')!
    // console.log('ctx', this.ctx)

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
    this.lastRun = 0
  }

  reset() {
    this.init()
  }

  newPass(shell: Shell) {
    let count = Math.ceil(Math.pow(shell.size, 2) * Math.PI)

    for (let i = 0; i < count; i++) {
      let pas = new Pass(shell)
      if (this.passes.length < 1000) this.passes.push(pas)
    }
  }

  run() {
    let dt = 1
    if (this.lastRun != 0)
      dt = Math.min(50, performance.now() - this.lastRun)
    this.lastRun = performance.now()


    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
    this.ctx.fillRect(0, 0, this.cwidth, this.cheight)

    if (this.shells.length < 10 && Math.random() > 0.95) {
      this.shells.push(new Shell(this.cwidth, this.cheight))

    }

    for (let i in this.shells) {
      let shell = this.shells[i]

      this.ctx.beginPath()
      this.ctx.arc(shell.x * this.cwidth, shell.y * this.cheight, shell.size, 0, 2 * Math.PI)
      this.ctx.fillStyle = shell.color
      this.ctx.fill()

      shell.x -= shell.offsetX
      shell.y -= shell.offsetY
      shell.offsetX -= shell.offsetX * dt * 0.001
      shell.offsetY -= (shell.offsetY + 0.2) * dt * 0.00005




      if (shell.offsetY < 0.001) {

        this.newPass(shell)
        this.shells.splice(parseInt(i), 1)

      }

    }
    for (let j in this.passes) {
      let p = this.passes[j]

      this.ctx.beginPath()
      this.ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI)
      this.ctx.fillStyle = p.color
      this.ctx.fill()

      p.x -= p.offsetX
      p.y -= p.offsetY
      p.offsetX -= (p.offsetX * dt * 0.001)
      p.offsetY -= ((p.offsetY + 5) * dt * 0.0005)
      p.size -= (dt * 0.002 * Math.random())

      if ((p.y > this.cheight) || (p.y < -50) || (p.size <= 0)) {
        this.passes.splice(parseInt(j), 1)
      }
    }

    requestAnimationFrame(() => { this.run() })
  }
}

class Shell {
  x: number
  y: number
  left: boolean
  size: number
  offsetX: number
  offsetY: number
  color: string
  width: number
  height: number

  constructor(width: number, height: number) {
    this.left = Math.random() > 0.5
    this.x = this.left ? 1 : 0
    this.y = 1
    this.offsetX = (0.01 + Math.random() * 0.007) * (this.left ? 1 : -1)
    this.offsetY = 0.01 + Math.random() * 0.007
    this.size = Math.random() * 6 + 3
    this.color = randomColor()
    this.width = width
    this.height = height
  }

}


class Pass {
  x: number
  y: number
  offsetX: number
  offsetY: number
  color: string
  size: number

  constructor(shell: Shell) {
    this.x = shell.x * shell.width
    this.y = shell.y * shell.height
    let a = Math.random() * 4
    let s = Math.random() * 10

    this.offsetX = s * Math.sin((5 - a) * (Math.PI / 2))
    this.offsetY = s * Math.sin(a * (Math.PI / 2))

    this.color = shell.color
    this.size = Math.sqrt(shell.size)
  }
}


function random(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function randomColor() {
  return `hsla(${random(0, 360)} 100% 75% / 0.75)`
}


const fireworks = new Fireworks(document.querySelector('#canvas')!)

requestAnimationFrame(() => fireworks.run())