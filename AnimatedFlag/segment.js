class Segment {
	constructor(particleA, particleB) {
		this.particleA = particleA
		this.particleB = particleB
		this.len = distance(this.particleA.loc, this.particleB.loc)
	}

	update() {
		const curLen = distance(this.particleA.loc, this.particleB.loc)
		const delta = curLen - this.len
		const diff = subtract(
			this.particleA.loc,
			this.particleB.loc
		)
		const norm = normalize(diff)

		this.moveParticles(norm, delta)
	}

	moveParticles(norm, delta) {
		if (this.particleA.fixed) {
			this.moveParticle(this.particleB, scale(norm, delta))
		} else if (this.particleB.fixed) {
			this.moveParticle(this.particleA, scale(norm, -delta))
		} else {
			this.moveParticle(this.particleA, scale(norm, -delta / 2))
			this.moveParticle(this.particleB, scale(norm, delta / 2))
		}
	}

	moveParticle(particle, loc) {
		particle.loc = add(
			particle.loc,
			loc,
		)
	}

	draw(ctx) {
		ctx.beginPath()
		ctx.moveTo(
			this.particleA.loc.x,
			this.particleA.loc.y,
		)
		ctx.lineTo(
			this.particleB.loc.x,
			this.particleB.loc.y,
		)
		ctx.stroke()
	}

}
