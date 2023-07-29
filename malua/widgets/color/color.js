/*
*/

'use strict'

class MColor extends HTMLElement {
  constructor() {
    // ...
    super()

    // create shadow root
    const shadow = this.attachShadow({ mode: 'open' })

    // colorpicker box
    const colorButtonSpan = document.createElement('span')

    // apply box style
    colorButtonSpan.setAttribute('class', 'm-color-box')

    // create color picker input and set its type accordingly
    const colorButtonElement = colorButtonSpan.appendChild(document.createElement('input'))
    colorButtonElement.setAttribute('type', 'color')

    // color picker label (current color)
    const colorButtonLabel = colorButtonSpan.appendChild(document.createElement('label'))

    // set color picker input and label style
    colorButtonElement.setAttribute('class', 'm-color')
    colorButtonLabel.setAttribute('class', 'm-color-label')

    // color button title/placeholder
    const colorButtonTitle = this.hasAttribute('title')

    if (colorButtonTitle) {
      colorButtonLabel.innerText = this.getAttribute('title')
    }

    // color button default value/color
    const colorButtonDefaultValue = (this.hasAttribute('value') || this.hasAttribute('color'))

    if (colorButtonDefaultValue) {
      colorButtonElement.value = (this.getAttribute('value') || this.getAttribute('color'))
    }

    // color button id (variable)
    const colorButtonId = (this.hasAttribute('id') || this.hasAttribute('var'))

    if (colorButtonId) {
      colorButtonElement.id = (this.getAttribute('id') || this.getAttribute('var'))
      colorButtonLabel.setAttribute('for', (this.getAttribute('id') || this.getAttribute('var')))
    }

    // color button position
    const colorButtonPosX = this.hasAttribute('x')
    const colorButtonPosY = this.hasAttribute('y')

    if (colorButtonPosX) {
      colorButtonLabel.style.left = this.getAttribute('x')
      colorButtonSpan.style.left = this.getAttribute('x')
      colorButtonElement.style.left = this.getAttribute('x')
    }

    if (colorButtonPosY) {
      colorButtonLabel.style.top = this.getAttribute('y')
      colorButtonSpan.style.top = this.getAttribute('y')
      colorButtonElement.style.top = this.getAttribute('y')
    }

    // padding
    const colorButtonPadding = this.hasAttribute('padding')

    if (colorButtonPadding) {
      colorButtonLabel.style.padding = this.getAttribute('padding')
      colorButtonSpan.style.padding = this.getAttribute('padding')
    }

    // checkbox size
    const colorButtonWidth = this.hasAttribute('width') || this.hasAttribute('w')
    const colorButtonHeight = this.hasAttribute('height') || this.hasAttribute('h')

    if (colorButtonWidth) {
      colorButtonSpan.style.width = this.getAttribute('width') || this.getAttribute('w')
    }

    if (colorButtonHeight) {
      colorButtonSpan.style.height = this.getAttribute('height') || this.getAttribute('h')
    }

    // apply external styles to the shadow dom
    const globalStyleLink = document.createElement('link')
    globalStyleLink.setAttribute('rel', 'stylesheet')
    globalStyleLink.setAttribute('href', 'malua/malua.css')

    const styleLink = document.createElement('link')
    styleLink.setAttribute('rel', 'stylesheet')
    styleLink.setAttribute('href', 'malua/widgets/color/color.css')

    // attach our elements to the Shadow DOM
    shadow.appendChild(globalStyleLink)
    shadow.appendChild(styleLink)
    shadow.appendChild(colorButtonSpan)
  }
}

// define the new element
customElements.define('m-color', MColor)
