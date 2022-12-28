class Flag {
  constructor({ left = 100, top = 100, xnums = 20, ynums = 15, sep = 14 } = {}) {
    this.particles = []
    this.segments = []
    this.#generateFlag({ xnums, ynums, left, sep, top })
  }

  #generateFlag({ xnums, ynums, left, sep, top }) {
    // chains = [{particles, segments}, ]
    const chains = []
    for (let i = 0; i < ynums; i++) {
      const y = top + i * sep
      const fixedParticleLines = (i === 0) || (i === ynums - 1)
      chains.push(this.#generateChain({ xnums, left, sep, top: y }, fixedParticleLines))
    }
    for (const { particles, segments } of chains) {
      this.particles = this.particles.concat(particles)
      this.segments = this.segments.concat(segments)
    }
    for (let i = 0; i < chains[0].particles.length; i++) {
      for (let j = 1; j < chains.length; j++) {
        this.segments.push(new Segment(
          chains[j - 1].particles[i],
          chains[j].particles[i],
        ))
      }
    }
  }

  #generateChain({ xnums, left, sep, top }, fixedParticleLines = false) {
    const particles = []
    const segments = []
    for (let i = 0; i < xnums; i++) {
      const x = left + i * sep
      const y = top
      const fixedParticles = (i === 0) && fixedParticleLines
      particles.push(new Particle({ x, y }, fixedParticles))
    }

    for (let i = 1; i < particles.length; i++) {
      segments.push(new Segment(particles[i - 1], particles[i]))
    }
    return {
      particles, segments
    }
  }

  update() {
    for (const particle of this.particles) {
      particle.update()
    }
    for (const segment of this.segments) {
      segment.update()
    }
  }


  draw(ctx) {
    for (const segment of this.segments) {
      segment.draw(ctx)
    }
    for (const particle of this.particles) {
      particle.draw(ctx)
    }
  }
}
