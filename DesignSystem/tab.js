const tabList = e('[role="tablist"]')
const tabs = es('[role="tab"]', tabList)

let tabFocus = 0
const count = tabs.length

tabList.addEventListener('keydown', changeTabFocus)

tabs.forEach(tab => {
  tab.addEventListener('click', changeTabPanel)
})

function changeTabFocus(e) {
  const leftkey = 37
  const rightkey = 39

  if (e.keyCode == leftkey || e.keyCode == rightkey) {
    tabs[tabFocus].setAttribute('tabindex', -1)
    // tabs[tabFocus].blur() 
    if (e.keyCode == rightkey) {
      tabFocus = (tabFocus + 1) % count
    } else {
      tabFocus = (tabFocus - 1 + count) % count
    }
  }
  // console.log(tabFocus)
  tabs[tabFocus].setAttribute('tabindex', 0)
  tabs[tabFocus].focus()
}

function changeTabPanel(event) {
  const tab = event.target
  const tabContainer = tab.parentNode
  const mainContainer = tabContainer.parentNode

  const tabs = es('[role="tab"]', tabContainer)
  tabs.forEach(tab => setOptions(tab, {
    'aria-selected': false,
    'tabindex': -1,
  }))
  // setOptions('[role="tab"]', {
  //   'aria-selected': false,
  //   'tabindex': -1,
  // }, tabContainer)
  tab.setAttribute('aria-selected', true)
  tab.setAttribute('tabindex', 0)


  const tabpanels = es('[role="tabpanel"]', mainContainer)
  tabpanels.forEach(p => setOptions(p, {
    'hidden': true,
    'tabindex': -1,
  }))
  // setOptions('[role="tabpanel"]', {
  //   'hidden': true,
  //   'tabindex': -1,
  // }, mainContainer)
  const tabName = tab.getAttribute('aria-controls')
  const tabpanel = e(`#${tabName}`, mainContainer)
  // mainContainer.querySelector(`#${tabName}`)
  tabpanel.removeAttribute('hidden')
  tabpanel.setAttribute('tabindex', 0)


  const pics = es('picture', mainContainer)
  pics.forEach(p => setOptions(p, {
    hidden: true,
  }))
  // setOptions('picture', {
  //   hidden: true,
  // }, mainContainer)
  const picName = tab.getAttribute('data-image')
  const pic = e(`#${picName}`, mainContainer)
  pic.removeAttribute('hidden')
}

function e(sel, parent) {
  return (parent ?? document).querySelector(sel)
}

function es(sel, parent) {
  return (parent ?? document).querySelectorAll(sel)
}

function setOptions(ele, options) {
  for (const attr in options) {
    if (Object.hasOwnProperty.call(options, attr)) {
      const value = options[attr]
      ele.setAttribute(attr, value)
    }
  }
}