/*
*/

'use strict'

class MButton extends HTMLElement {
  constructor() {
    // ..
    super()

    // create shadow root
    const shadow = this.attachShadow({mode: 'open'})

    // button wrapper
    const buttonElement = document.createElement('button')

    // apply button type
    buttonElement.setAttribute('type', 'button')

    // button title
    const buttonTitle = this.hasAttribute('title')

    // button custom shader
    const buttonShader = this.hasAttribute('shader')

    // custom class & shaders
    // TODO: find a proper way to add more classes
    if (buttonShader) {
      buttonElement.setAttribute('class', ('m-button ' + this.getAttribute('shader')))
    }
    else {
      buttonElement.setAttribute('class', 'm-button')
    }

    // button id (variable)
    const buttonId = (this.hasAttribute('id') || this.hasAttribute('var'))

    if (buttonId) {
      buttonElement.id = (this.getAttribute('id') || this.getAttribute('var'))
    }

    if (buttonTitle) {
      buttonElement.textContent = this.getAttribute('title')
    }

    // button position
    const buttonPosX = this.hasAttribute('x')
    const buttonPosY = this.hasAttribute('y')

    if (buttonPosX) {
      buttonElement.style.left = this.getAttribute('x')
    }

    if (buttonPosY) {
     buttonElement.style.top = this.getAttribute('y')
    }

    // button size
    const buttonWidth = this.hasAttribute('width') || this.hasAttribute('w')
    const buttonHeight = this.hasAttribute('height') || this.hasAttribute('h')

    if (buttonWidth) {
      buttonElement.style.width = this.getAttribute('width') || this.getAttribute('w')
    }

    if (buttonHeight) {
      buttonElement.style.height = this.getAttribute('height') || this.getAttribute('h')
    }

    // apply external styles to the shadow dom
    const globalStyleLink = document.createElement('link')
    globalStyleLink.setAttribute('rel', 'stylesheet')
    globalStyleLink.setAttribute('href', 'malua/malua.css')

    const styleLink = document.createElement('link')
    styleLink.setAttribute('rel', 'stylesheet')
    styleLink.setAttribute('href', 'malua/widgets/button/button.css')

    // attach our elements to the Shadow DOM
    shadow.appendChild(globalStyleLink)
    shadow.appendChild(styleLink)
    shadow.appendChild(buttonElement)
  }
}

// define the new element
customElements.define('m-button', MButton)
