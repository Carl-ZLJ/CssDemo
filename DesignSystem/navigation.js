const nav = document.querySelector('.primary-navigation')
const navToggle = document.querySelector('.mobile-nav-toggle')

navToggle.addEventListener('click', () => {
  const visibility = nav.dataset.visible
  if (visibility == 'false') {
    nav.dataset.visible = 'true'
    navToggle.setAttribute('aria-expanded', 'true')
  } else {
    nav.dataset.visible = 'false'
    navToggle.setAttribute('aria-expanded', 'false')
  }
})