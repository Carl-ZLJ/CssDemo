var ParticlesBackground = /** @class */ (function () {
    function ParticlesBackground(canvas, dotCount) {
        var _this = this;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.dotsCount = dotCount;
        this.init();
        window.addEventListener('resize', function () {
            _this.reset();
        });
    }
    ParticlesBackground.prototype.init = function () {
        this.cwidth = window.innerWidth;
        this.cheight = window.innerHeight;
        this.canvas.width = this.cwidth;
        this.canvas.height = this.cheight;
        this.dots = [];
        while (this.dots.length < this.dotsCount)
            this.dots.push(new Dot(this.canvas, true));
    };
    ParticlesBackground.prototype.reset = function () {
        this.init();
    };
    ParticlesBackground.prototype.outOfRange = function (dot) {
        return dot.x > this.cwidth || dot.x < 0 || dot.y > this.cheight || dot.y < 0;
    };
    ParticlesBackground.prototype.run = function () {
        var _this = this;
        console.log(this.dots.length);
        if (this.dots.length < this.dotsCount) {
            var d = new Dot(this.canvas);
            this.dots.push(d);
        }
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.cwidth, this.cheight);
        for (var i = 0; i < this.dots.length; i++) {
            var dotI = this.dots[i];
            dotI.x += dotI.speedX;
            dotI.y += dotI.speedY;
            if (!dotI.grow || this.outOfRange(dotI)) {
                if (dotI.val > 0) {
                    dotI.val--;
                }
                else {
                    this.dots.splice(i, 1);
                    continue;
                }
            }
            else if (dotI.val < dotI.maxVal) {
                dotI.val++;
            }
            else {
                dotI.grow = false;
            }
            for (var j = i + 1; j < this.dots.length; j++) {
                var dotJ = this.dots[j];
                var dist = dotJ.distFromDot(dotI);
                if (dist > 150) {
                    continue;
                }
                var lineClr = (1 - dist / 150) * (dotI.val / dotI.maxVal) * (dotJ.val / dotJ.maxVal);
                this.ctx.beginPath();
                this.ctx.moveTo(dotI.x, dotI.y);
                this.ctx.lineTo(dotJ.x, dotJ.y);
                this.ctx.strokeStyle = "rgba(102, 153, 284, ".concat(lineClr, ")");
                this.ctx.stroke();
            }
        }
        setTimeout(function () {
            _this.run();
        }, 60);
    };
    return ParticlesBackground;
}());
var Dot = /** @class */ (function () {
    function Dot(canvas, start) {
        if (start === void 0) { start = false; }
        var width = canvas.width, height = canvas.height;
        this.x = Math.floor(Math.random() * width);
        this.y = Math.floor(Math.random() * height);
        this.speedX = (Math.random() - 0.5) * 3;
        this.speedY = (Math.random() - 0.5) * 3;
        this.grow = true;
        this.maxVal = Math.floor(Math.random() * 200);
        this.val = start ? Math.floor(Math.random() * this.maxVal) : 0;
    }
    Dot.prototype.distFromDot = function (other) {
        return Math.sqrt(Math.pow(Math.abs(this.x - other.x), 2)
            + Math.pow(Math.abs(this.y - other.y), 2));
    };
    return Dot;
}());
var canvas = document.querySelector('#canvas');
var pb = new ParticlesBackground(canvas, 150);
pb.run();
