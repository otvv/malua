/*
*/

'use strict'

class MTextBox extends HTMLElement {
  constructor() {
    // ..
    super()

    // create shadow root
    const shadow = this.attachShadow({mode: 'open'})

    // input wrapper
    const textboxElement = document.createElement('input')

    // apply textbox class and type
    textboxElement.setAttribute('class', 'm-textbox')
    textboxElement.setAttribute('type', 'text')

    // textbox id (variable)
    const textboxId = (this.hasAttribute('id') || this.hasAttribute('var'))

    // textbox title
    const textboxTitle = this.hasAttribute('title') || 'null'

    if (textboxTitle) {
      textboxElement.setAttribute('placeholder', this.getAttribute('title'))
    }

    // textbox default value
    const textboxDefaultValue = (this.hasAttribute('value') || this.hasAttribute('text'))

    if (textboxDefaultValue) {
      textboxElement.value =  (this.getAttribute('value') || this.getAttribute('text'))
    }

    if (textboxId) {
      textboxElement.id = (this.getAttribute('id') || this.getAttribute('var'))
    }

    // textbox position
    const textboxPosX = this.hasAttribute('x')
    const textboxPosY = this.hasAttribute('y')

    if (textboxPosX) {
      textboxElement.style.left = this.getAttribute('x')
    }

    if (textboxPosY) {
      textboxElement.style.top = this.getAttribute('y')
    }

    // padding
    const textboxPadding = this.hasAttribute('padding')

    if (textboxPadding) {
      textboxElement.style.padding = this.getAttribute('padding')
    }

    // checkbox size
    const textboxWidth = this.hasAttribute('width') || this.hasAttribute('w')
    const textboxHeight = this.hasAttribute('height') || this.hasAttribute('h')

    if (textboxWidth) {
      textboxElement.style.width = this.getAttribute('width') || this.getAttribute('w')
    }

    if (textboxHeight) {
      textboxElement.style.height = this.getAttribute('height') || this.getAttribute('h')
    }

    // apply external styles to the shadow dom
    const globalStyleLink = document.createElement('link')
    globalStyleLink.setAttribute('rel', 'stylesheet')
    globalStyleLink.setAttribute('href', 'malua/malua.css')

    const styleLink = document.createElement('link')
    styleLink.setAttribute('rel', 'stylesheet')
    styleLink.setAttribute('href', 'malua/widgets/textbox/textbox.css')

    // attach our elements to the Shadow DOM
    shadow.appendChild(globalStyleLink)
    shadow.appendChild(styleLink)
    shadow.appendChild(textboxElement)
  }
}

// define the new element
customElements.define('m-textbox', MTextBox)
