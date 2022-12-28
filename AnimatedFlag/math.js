function lerp(min, max, t) {
  return min + (max - min) * t
}

function add(v1, v2) {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y,
  }
}

function subtract(v1, v2) {
  return {
    x: v1.x - v2.x,
    y: v1.y - v2.y,
  }
}

function scale(v1, scaler) {
  return {
    x: v1.x * scaler,
    y: v1.y * scaler,
  }
}

function magnitude(v) {
  return Math.hypot(v.x, v.y)
}

function normalize(v) {
  return scale(v, 1 / magnitude(v))
}

function distance(v1, v2) {
  return magnitude(subtract(v1, v2))
}
