// eslint-disable-next-line no-undef
registerPaint(
  "baz",
  class {
    static get inputProperties() {
      return ["--count"];
    }
    paint(ctx, size, props) {
      const { width, height } = size;
      const count = props.get("--count");
      for (let i = 0; i < count; i++) {
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
    }
  }
);

function random(min, max) {
  return min + Math.random() * (max - min);
}

function randomColor() {
  return `hsla(${random(0, 360)} 100% 75% / 0.75)`;
}
