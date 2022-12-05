const stack = document.querySelector('.card-stack')

window.slider.oninput = e => {
  console.log('slider', e.target.value)
  stack.style.setProperty('--scalar', e.target.value)
}
