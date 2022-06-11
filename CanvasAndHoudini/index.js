const body = document.querySelector("body");
const buttonCanvas = document.querySelector(".canvas-btn");
const buttonHoudini = document.querySelector(".houdini-btn");

buttonCanvas.addEventListener("click", newCanvas);
buttonHoudini.addEventListener("click", newHoudini);

function newHoudini() {
  const div = document.createElement("div");
  div.innerText = "!houdini";
  div.classList = "houdini";
  div.style.top = random(0, window.innerHeight - 250) + "px";
  div.style.left = random(0, window.innerWidth - 250) + "px";

  body.appendChild(div);

  setTimeout(() => {
    body.removeChild(div);
  }, 3000);
}

function newCanvas() {
  const width = 600;
  const height = 600;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.classList.add("canvas");
  canvas.style.top = random(0, window.innerHeight - height) + "px";
  canvas.style.left = random(0, window.innerWidth - width) + "px";

  const ctx = canvas.getContext("2d");

  // rectangle
  for (let i = 0; i < 5; i++) {
    const size = random(20, 70);
    const x = random(50, width - 50) - size / 2;
    const y = random(50, height - 50) - size / 2;

    ctx.strokeStyle = randomColor();
    ctx.lineWidth = random(4, 8);

    ctx.save();

    ctx.translate(x, y);

    ctx.rotate(random(0, Math.PI * 0.5));

    ctx.translate(-x, -y);

    ctx.strokeRect(x, y, size, size);

    ctx.restore();

    ctx.beginPath();
    ctx.moveTo(random(0, width), random(0, height));
    ctx.lineTo(random(0, width), random(0, height));
    ctx.lineTo(random(0, width), random(0, height));
    ctx.closePath();
    ctx.strokeStyle = randomColor();
    ctx.lineWidth = random(4, 8);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(
      random(40, width - 40),
      random(40, height - 40),
      random(10, 40),
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.strokeStyle = randomColor();
    ctx.lineWidth = random(4, 8);
    ctx.stroke();
  }

  // text
  ctx.font = "100px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = 4;
  ctx.fillStyle = "white";
  ctx.fillText("hello world", width / 2, height / 2);

  ctx.strokeStyle = "black";
  ctx.strokeText("hello world", width / 2, height / 2);

  body.appendChild(canvas);

  setTimeout(() => {
    body.removeChild(canvas);
  }, 3000);
}

function random(min, max) {
  return min + Math.random() * (max - min);
}

function randomColor() {
  return `hsla(${random(0, 360)} 100% 75% / 0.75)`;
}

(async () => {
  CSS.paintWorklet.addModule("./bubbles.js");
})();
