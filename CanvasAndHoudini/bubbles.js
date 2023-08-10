// eslint-disable-next-line no-undef
registerPaint(
  "bubbles",
  class {
    static get inputProperties() {
      return [
        "--bubbles-colors",
        "--bubbles-min-radius",
        "--bubbles-max-radius",
        "--bubbles-total-num",
        "--bubbles-is-dark",
      ]
    }
    parseProps(t) {
      return [
        "--bubbles-colors",
        "--bubbles-min-radius",
        "--bubbles-max-radius",
        "--bubbles-total-num",
        "--bubbles-is-dark",
      ].map((r) => {
        if (t.get(r).length)
          return "--bubbles-colors" === r
            ? t
                .get(r)
                .toString()
                .split(",")
                .map((t) => t.trim())
            : "--bubbles-is-dark" === r
            ? t.get(r).toString().trim()
            : parseInt(t.get(r).toString())
      })
    }
    paint(t, { width: r, height: e }, a) {
      let [i = ["#007C8E", "#7940c1"], l = 10, s = 60, b = 20, n = "no"] =
        this.parseProps(a)
      t.beginPath()
        t.fillStyle = "yes" === n ? "rgb(0,0,0)" : "rgb(255,255,255)"
        t.fillRect(0, 0, r, e)
        t.closePath()
        l = this._normalize(l, 10)
        s = this._normalize(s, 60)
        b = this._normalize(b, 20)
      for (let a = 0, o = b; a < o; a++)
        this.drawCircle(t, {
          x: this._rand(0, r),
          y: this._rand(0, e),
          r: this._rand(l, s),
          color: i[this._rand(0, i.length - 1)],
          isDark: n,
        })
    }
    drawCircle(t, r) {
      const { x: e, y: a, r: i } = r
      t.beginPath()
        t.arc(e, a, i, 0, 2 * Math.PI, !1)
        t.fillStyle = this.drawGradient(t, r)
        t.fill()
        t.closePath()
        t.beginPath()
        t.ellipse(
          e,
          a - i + i / 1.25,
          i / 1.15,
          i / 1.25,
          Math.PI,
          0,
          2 * Math.PI
        )
        t.fillStyle = this.drawGradient(t, r)
        t.fill()
        t.closePath()
        t.beginPath()
        t.ellipse(
          e - i / 2 - 0.05 * i,
          a - i / 2 - 0.15 * i,
          i / 20,
          i / 6,
          Math.PI / 3.5,
          0,
          2 * Math.PI
        )
        t.fillStyle = "white"
        t.fill()
        t.closePath()
    }
    drawGradient(t, { x: r, y: e, r: a, color: i, isDark: l }) {
      try {
        const s = t.createRadialGradient(r, e, 0, r, e, a)
        return (
          s.addColorStop(
            0.7,
            `rgba(${"yes" === l ? "0,0,0" : "255,255,255"},0)`
          ),
          s.addColorStop(1, i),
          s
        )
      } catch (i) {
        return this.drawGradient(t, {
          x: r,
          y: e,
          r: a,
          isDark: l,
          color: "yes" === l ? "white" : "black",
        })
      }
    }
    _rand(t, r) {
      return Math.floor(Math.random() * (r - t + 1)) + t
    }
    _normalize(t, r) {
      return isNaN(t) ? r : t
    }
  }
)
