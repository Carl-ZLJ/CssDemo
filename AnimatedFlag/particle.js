class Particle {
  constructor(loc, fixed = false, size = 4) {
    this.size = size
    this.fixed = fixed
    this.loc = loc
    this.oldLoc = loc
  }

  update(G, W) {
    if (this.fixed) return

    const vel = subtract(this.loc, this.oldLoc)
    const newLoc = add(W, add(G, add(this.loc, vel)))
    this.oldLoc = this.loc
    this.loc = newLoc
  }

  draw(ctx) {
    const { size } = this

    ctx.fillRect(
      this.loc.x - size / 2,
      this.loc.y - size / 2,
      size,
      size,
    )
  }
}
