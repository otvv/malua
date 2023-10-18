/*
*/

'use strict'

class MPanel extends HTMLElement {

  // @brief: this function will check if a certain attribute exists 
  // in the widget context and if it exists, it will set that attribute accordingly
  //
  // @arguments: `element` = element to set the attribute
  //             `attributeName` = attribute to check if it exists, in case it does, apply its value
  //             (the value that will be aplied to the attribute is the same that the user provided when "declaring"
  //              the element in the html root page.)
  setAttributeWhenPresent = (element, attributeName) => {
    const attributeValue = this.getAttribute(attributeName);
    
    // only set attribute if the user has set a value to it
    if (attributeValue) {
      element.setAttribute(attributeName, attributeValue);
    }
  }

  // @brief: widget constructor (don't touch this unless you know what you're doing!)
  constructor() {
    // ..
    super()

    // create shadow root
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = `
          <link rel="stylesheet" href="malua/malua.css">
          <link rel="stylesheet" href="malua/widgets/panel/panel.css">
          <link rel="stylesheet" href="malua/widgets/figure/figure.css">
          <main class="m-panel">
          <header class="m-panel-header">
          <span class='m-panel-header-image-container'>
          <img class='m-figure'></img>
          <a class="m-panel-header-label"></a>
          </span>
          </header>
          <section class="m-panel-widget-area">
          </section>
          </main>
        `;

    // panel element and title wrapper
    const panelElement = shadow.querySelector('main')
    const panelLabelElement = shadow.querySelector('a')

    // panel header and widget area
    const panelHeaderElement = shadow.querySelector('header')
    const panelWidgetArea = shadow.querySelector('section')

    // panel image wrapper
    const panelImageElement = shadow.querySelector('img')

    // list of attributes to look for
    const attributesToSet = ['title', 'id', 'src', 'shader', 'effect', 'x', 'y', 'top', 'left', 'width', 'height'];

    // set attributes if present
    attributesToSet.forEach((attribute) => {
      this.setAttributeWhenPresent(panelElement, attribute);
    });

    // set panel title
    panelLabelElement.textContent = panelElement.title;

    // set panel size
    panelElement.style.width = this.getAttribute('width') || 'fit-content'
    panelElement.style.height = this.getAttribute('height')

    // NOTE: these are fixed values because of artistic reasons,
    // feel free to change these when creating another design
    {
      // set panel image size
      panelImageElement.style.width = '45px';
      panelImageElement.style.height = '45px';

      // set panel image radius
      panelImageElement.style.borderRadius = '50%'

      // set panel widget area initial position
      panelWidgetArea.style.top = '60px'
      panelWidgetArea.style.position = 'absolute'
    }

    // set panel image source
    panelImageElement.src = this.getAttribute('src')

    // set panel header and widget area size
    panelHeaderElement.style.width = this.getAttribute('width') || 'fit-content';

    // set panel pos
    panelElement.style.left = this.getAttribute('x') || this.getAttribute('left')
    panelElement.style.top = this.getAttribute('y') || this.getAttribute('top')

    // set panel shader
    panelElement.classList.add(this.getAttribute('shader') || this.getAttribute('effect'))


    // filter child elements
    for (let i = 1; i < this.childNodes.length; i++) {
      panelWidgetArea.appendChild(this.childNodes[i])
    }

    // make the panel draggable
    handleMovement(panelHeaderElement, panelElement)

    // disable right clicking
    disableRightClick(panelHeaderElement, panelElement)
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
