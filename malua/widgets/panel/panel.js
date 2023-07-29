/*
*/

'use strict'

class MPanel extends HTMLElement {
  constructor() {
    // ..
    super()

    // create shadow root
    const shadow = this.attachShadow({ mode: 'open' })

    // panel element
    const panelElement = document.createElement('main')

    // panel header
    const panelHeader = panelElement.appendChild(document.createElement('header'))

    // panel "widget area"
    const panelUsableArea = panelElement.appendChild(document.createElement('section'))

    // assign widget "usable" area class
    panelUsableArea.setAttribute('class', 'm-panel-widget-area')

    // panel id (variable)
    const panelId = (this.hasAttribute('id') || this.hasAttribute('var'))

    if (panelId) {
      panelElement.id = (this.getAttribute('id') || this.getAttribute('var'))
    }

    // custom class
    panelHeader.setAttribute('class', 'm-panel-header')
    panelElement.setAttribute('class', 'm-panel')

    // div custom shader
    const divShader = (this.hasAttribute('shader') || this.hasAttribute('effect'))

    if (divShader) {
      panelHeader.classList.add(this.getAttribute('shader'))
      panelElement.classList.add(this.getAttribute('shader'))
    }

    // panel position
    const panelPosX = this.hasAttribute('x')
    const panelPosY = this.hasAttribute('y')

    if (panelPosX) {
      panelHeader.style.left = this.getAttribute('x')
      panelElement.style.left = this.getAttribute('x')
      panelUsableArea.style.left = this.getAttribute('x')
    }

    if (panelPosY) {
      panelHeader.style.top = this.getAttribute('y')
      panelElement.style.top = this.getAttribute('y')
    }

    // panel size
    const panelWidth = this.hasAttribute('width') || this.hasAttribute('w')
    const panelHeight = this.hasAttribute('height') || this.hasAttribute('h')

    if (panelWidth) {
      panelHeader.style.width = this.getAttribute('width') || this.getAttribute('w')
      panelElement.style.width = this.getAttribute('width') || this.getAttribute('w')
    }

    if (panelHeight) {
      panelElement.style.height = this.getAttribute('height') || this.getAttribute('h')
    }

    // apply external styles to the shadow dom
    const globalStyleLink = document.createElement('link')
    globalStyleLink.setAttribute('rel', 'stylesheet')
    globalStyleLink.setAttribute('href', 'malua/malua.css')

    const styleLink = document.createElement('link')
    styleLink.setAttribute('rel', 'stylesheet')
    styleLink.setAttribute('href', 'malua/widgets/panel/panel.css')

    // attach our elements to the Shadow DOM
    shadow.appendChild(globalStyleLink)
    shadow.appendChild(styleLink)
    shadow.appendChild(panelElement)

    // filter child elements
    for (let i = 1; i < this.childNodes.length; i++) {
      panelUsableArea.appendChild(this.childNodes[i])
    }

    // TODO: fix this
    panelUsableArea.style.top = '60px'
    panelUsableArea.style.position = 'absolute'

    // make the panel draggable
    handleMovement(panelHeader, panelElement)

    // disable right clicking
    disableRightClick(panelHeader, panelElement)
  }
}

// TODO: clean this up and maybe move it to another file
const handleMovement = (headerElement, element) => {

  let isMouseDown = false
  let isMouseInside = false
  let mouseX = 0
  let mouseY = 0
  let elementX = 0
  let elementY = 0

  // set mouse status accordingly
  headerElement.addEventListener('mouseenter', () => { isMouseInside = true })
  headerElement.addEventListener('mouseleave', () => { isMouseInside = false })

  const onMouseClickDown = (event) => {

    // grab current cursor position
    mouseX = event.clientX
    mouseY = event.clientY

    // set click status
    isMouseDown = true
  }

  headerElement.addEventListener('mousedown', onMouseClickDown)

  const onMouseClickUp = () => {

    // reset states
    isMouseDown = false
    isMouseInside = false

    elementX = parseInt(element.style.left)
    elementY = parseInt(element.style.top)
  }

  document.addEventListener('mouseup', onMouseClickUp)

  const onMouseMove = (event) => {

    if (!isMouseDown || !isMouseInside) {
      return
    }

    // calcualte the delta position
    let posDeltaX = (event.clientX - mouseX)
    let posDeltaY = (event.clientY - mouseY)

    // move element
    element.style.left = (elementX + posDeltaX) + 'px'
    element.style.top = (elementY + posDeltaY) + 'px'
  }

  document.addEventListener('mousemove', onMouseMove)
}

// TODO: move this to another file?
const disableRightClick = (headerElement, element) => {
  headerElement.addEventListener('contextmenu', event => event.preventDefault())
  element.addEventListener('contextmenu', event => event.preventDefault())
}

// define the new element
customElements.define('m-panel', MPanel)
