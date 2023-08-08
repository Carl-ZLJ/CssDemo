const SIZE = 420
const MAX_R = Math.sqrt(SIZE * SIZE * 2 / 4)

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const osc = new OffscreenCanvas(SIZE, SIZE)
const oscctx = osc.getContext('2d')

const image = new Image()
const fileReader = new FileReader()

let data
let r = 0
let angle = 0

let rOffset = 1
let aOffset = 5
let contrast = 1


function compressedImage(image, size) {
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

function imageToData(ctx, image, size) {
    const { newW, newH, newX, newY } = compressedImage(image, size)
    ctx.drawImage(image, newX, newY, newW, newH)
    const data = ctx.getImageData(0, 0, size, size).data
    return data

}

function init() {
    canvas.width = SIZE
    canvas.height = SIZE
    ctx.fillStyle = '#fff'

    r = 0
    angle = 0

    rOffset = Number(document.querySelector('#linearOffset').value)
    aOffset = Number(document.querySelector('#radialOffset').value) * rOffset

    const tc = Number(document.querySelector('#contrast').value)
    contrast = tc < 0 ? ((tc + 3) / 3) : (tc + 1)
}

window.onload = () => {
    document.querySelector('#linearOffset').value = Math.round() * 1.5 + 0.5
    document.querySelector('#radialOffset').value = Math.round() * 19 + 1

    init()

    image.onload = () => {

        data = imageToData(oscctx, image, SIZE)
        render()
    }

    image.crossOrigin = 'anonymous'
    image.src = 'https://assets.codepen.io/1948355/logo.jpg'

    document.querySelector('#generate').addEventListener('click', () => {
        init()
        render()
    })

    const fileInput = document.querySelector('#fileInput')
    fileInput.addEventListener('change', () => {
        document.querySelector('.fileInput').innerHTML = fileInput.files[0].name

        fileReader.onload = () => {
            image.src = fileReader.result
        }
        fileReader.readAsDataURL(fileInput.files[0])
    })
}

function render() {
    let count = 1000

    while (count > 0) {
        const x = SIZE / 2 + r * Math.cos(angle)
        const y = SIZE / 2 + r * Math.sin(angle)

        const p = (Math.round(y) * SIZE + Math.round(x)) * 4

        // transform image data
        const ap = (data[p] + data[p + 1] + data[p + 2]) / 3

        const tr = Math.pow(ap / 255, contrast) * Math.PI * rOffset * contrast

        ctx.beginPath()
        ctx.arc(x, y, tr, 0, Math.PI * 2)
        ctx.fill()

        const thisAngle = Math.atan(aOffset / r)
        angle += thisAngle
        r += rOffset * thisAngle

        count--

        if (r <= MAX_R) {
            requestAnimationFrame(render)
        }
    }
}