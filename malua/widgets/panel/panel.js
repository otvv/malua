/*
*/

'use strict'

class MPanel extends HTMLElement {
  constructor() {
    // .. 
    super()

    // create shadow root
    const shadow = this.attachShadow({ mode: 'open' })

    // div wrapper
    const divElement = document.createElement('main')

    // div header
    const divHeader = divElement.appendChild(document.createElement('header'))

    // panel id (variable)
    const panelId = (this.hasAttribute('id') || this.hasAttribute('var'))

    if (panelId) {
      divElement.id = (this.getAttribute('id') || this.getAttribute('var'))
    }

    // div custom shader
    const divShader = this.hasAttribute('shader')

    // custom class & shaders
    // TODO: find a proper way to add more classes
    if (divShader) {
      divHeader.setAttribute('class', ('m-panel-header ' + this.getAttribute('shader')))
      divElement.setAttribute('class', ('m-panel ' + this.getAttribute('shader')))
    }
    else {
      divHeader.setAttribute('class', 'm-panel-header')
      divElement.setAttribute('class', 'm-panel')
    }

    // panel position
    const divPosX = this.hasAttribute('x')
    const divPosY = this.hasAttribute('y')

    if (divPosX) {
      divHeader.style.left = this.getAttribute('x')
      divElement.style.left = this.getAttribute('x')
    }

    if (divPosY) {
      divHeader.style.top = this.getAttribute('y')
      divElement.style.top = this.getAttribute('y')
    }

    // div size
    const divWidth = this.hasAttribute('width') || this.hasAttribute('w')
    const divHeight = this.hasAttribute('height') || this.hasAttribute('h')

    if (divWidth) {
      divHeader.style.width = this.getAttribute('width') || this.getAttribute('w')
      divElement.style.width = this.getAttribute('width') || this.getAttribute('w')
    }

    if (divHeight) {
      divElement.style.height = this.getAttribute('height') || this.getAttribute('h')
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
    shadow.appendChild(divElement)

    // filter child elements
    for (let i = 1; i < this.childNodes.length; i++) {
      divElement.appendChild(this.childNodes[i])
    }

    // make the panel draggable
    handleMovement(divHeader, divElement)

    // disable right clicking
    disableRightClick(divHeader, divElement)
  }
}

// TODO: move this to another file
function handleMovement(headerElement, element) {

  // TODO: clean this up
  let isMouseDown = false 
  let isMouseInside = false
  let mouseX = 0
  let mouseY = 0
  let elementX = 0
  let elementY = 0

  function onMouseEnter(event) {
    isMouseInside = true
  }

  headerElement.addEventListener('mouseenter', onMouseEnter)

  function onMouseLeave(event) {
    isMouseInside = true
  }

  headerElement.addEventListener('mouseleave', onMouseLeave)

  function onMouseDown(event) {

    // grab current cursor position
    mouseX = event.clientX
    mouseY = event.clientY

    isMouseDown = true
  }

  headerElement.addEventListener('mousedown', onMouseDown)

  function onMouseUp(event) {

    // reset states
    isMouseDown = false
    isMouseInside = false

    elementX = parseInt(element.style.left) || 0
    elementY = parseInt(element.style.top) || 0
  }

  document.addEventListener('mouseup', onMouseUp)

  function onMouseMove(event) {

    if (!isMouseDown) {
      return;
    }

    if (!isMouseInside) {
      return;
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

// TODO: move this to a nother file
function disableRightClick(headerElement, element) {

  headerElement.addEventListener('contextmenu', event => event.preventDefault());
  element.addEventListener('contextmenu', event => event.preventDefault());
}

// define the new element 
customElements.define('m-panel', MPanel)
