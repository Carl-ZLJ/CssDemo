class DottedImage {
    constructor(size = 420,) {
        this.SIZE = size
        this.MAX_RADIUS = Math.sqrt(this.SIZE * this.SIZE * 2 / 4)

        this.image = new Image()
        this.fileReader = new FileReader()
        this.oscImage = new OffscreenImage(this.SIZE)

        this.data = null

        this.setRandomInputValue()
        this.setDefaultImage()
        this.init()
        this.bindEvents()
    }

    init() {
        this.initCanvas()

        this.initDrawingParams()
    }

    initDrawingParams() {
        this.r = 0
        this.angle = 0
        this.radiusOffset = Number(document.querySelector('#linearOffset').value)
        this.angleOffset = Number(document.querySelector('#radialOffset').value) * this.radiusOffset

        const tc = Number(document.querySelector('#contrast').value)
        this.contrast = tc < 0 ? ((tc + 3) / 3) : (tc + 1)
    }

    initCanvas() {
        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = this.SIZE
        this.canvas.height = this.SIZE
        this.ctx.fillStyle = '#fff'
    }

    render() {
        let count = 1000
        let { SIZE, MAX_RADIUS, ctx, data, contrast, radiusOffset, angleOffset, } = this

        while (count > 0) {
            const x = SIZE / 2 + this.r * Math.cos(this.angle)
            const y = SIZE / 2 + this.r * Math.sin(this.angle)

            const p = (Math.round(y) * SIZE + Math.round(x)) * 4

            // transform image data
            const ap = (data[p] + data[p + 1] + data[p + 2]) / 3

            const tr = Math.pow(ap / 255, contrast) * Math.PI * radiusOffset * contrast

            ctx.beginPath()
            ctx.arc(x, y, tr, 0, Math.PI * 2)
            ctx.fill()

            const thisAngle = Math.atan(angleOffset / this.r)
            this.angle += thisAngle
            this.r += radiusOffset * thisAngle

            count--

            if (this.r <= MAX_RADIUS) {
                requestAnimationFrame(this.render.bind(this))
            }
        }

    }

    setRandomInputValue() {
        document.querySelector('#linearOffset').value = Math.random() * 1.5 + 0.5
        document.querySelector('#radialOffset').value = Math.random() * 19 + 1
    }

    setDefaultImage() {
        this.image.crossOrigin = 'anonymous'
        this.image.src = 'https://assets.codepen.io/1948355/logo.jpg'
    }

    bindEvents() {
        this.onLoadImage()

        this.onLoadFile()

        this.generateOnClick()
    }

    generateOnClick() {
        document.querySelector('#generate').addEventListener('click', () => {
            this.init()
            this.render()
        })
    }

    onLoadImage() {
        this.image.onload = () => {
            this.data = this.oscImage.imageToData(this.image, this.SIZE)
            this.render()
        }
    }

    onLoadFile() {
        const fileInput = document.querySelector('#fileInput')
        fileInput.addEventListener('change', () => {
            document.querySelector('.fileInput').innerHTML = fileInput.files[0].name

            this.fileReader.onload = () => {
                this.image.src = this.fileReader.result
            }
            this.fileReader.readAsDataURL(fileInput.files[0])
        })
    }
}

class OffscreenImage {
    constructor(size) {
        this.canvas = new OffscreenCanvas(size, size)
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })
    }

    imageToData(image, size) {
        const { newW, newH, newX, newY } = this.newImageLoc(image, size)
        this.ctx.drawImage(image, newX, newY, newW, newH)
        const data = this.ctx.getImageData(0, 0, size, size).data
        return data

    }

    newImageLoc(image, size) {
        const w = image.width
        const h = image.height

        const ratio = Math.min(w, h) / size
        const newW = w / ratio
        const newH = h / ratio
        const newX = (size - newW) / 2
        const newY = (size - newH) / 2

        return {
            newW,
            newH,
            newX,
            newY,
        }
    }
}



function __main() {
    new DottedImage()
}

__main()