/*
*/

'use strict'

class MFigure extends HTMLElement {
  constructor() {
    // .. 
    super()

    // create shadow root
    const shadow = this.attachShadow({ mode: 'open' })

    // figure img wrapper
    const figureElement = document.createElement('img')

    // figure id (variable)
    const figureId = (this.hasAttribute('id') || this.hasAttribute('var'))
    
    if (figureId) {
      figureElement.id = (this.getAttribute('id') || this.getAttribute('var'))
    }
    
    // custom class
    figureElement.setAttribute('class', 'm-figure')
    
    // disable dragging
    figureElement.setAttribute('draggable', 'false')
    
    // img source
    const imgSource = (this.hasAttribute('src') || this.hasAttribute('img') || this.hasAttribute('link'))

    if (imgSource) {
      figureElement.src = (this.getAttribute('src') || this.getAttribute('img') || this.hasAttribute('link'))
    }

    // img position
    const imgPosX = this.hasAttribute('x')
    const imgPosY = this.hasAttribute('y')

    if (imgPosX) {
      figureElement.style.left = this.getAttribute('x')
    }

    if (imgPosY) {
      figureElement.style.top = this.getAttribute('y')
    }

    // div size
    const imgWidth = this.hasAttribute('width') || this.hasAttribute('w')
    const imgHeight = this.hasAttribute('height') || this.hasAttribute('h')

    if (imgWidth) {
      figureElement.style.width = this.getAttribute('width') || this.getAttribute('w')
    }

    if (imgHeight) {
      figureElement.style.height = this.getAttribute('height') || this.getAttribute('h')
    }

    // apply external styles to the shadow dom
    const globalStyleLink = document.createElement('link')
    globalStyleLink.setAttribute('rel', 'stylesheet')
    globalStyleLink.setAttribute('href', 'malua/malua.css')

    const styleLink = document.createElement('link')
    styleLink.setAttribute('rel', 'stylesheet')
    styleLink.setAttribute('href', 'malua/widgets/figure/figure.css')

    // attach our elements to the Shadow DOM
    shadow.appendChild(globalStyleLink)
    shadow.appendChild(styleLink)
    shadow.appendChild(figureElement)
  }
}

// define the new element 
customElements.define('m-figure', MFigure)
