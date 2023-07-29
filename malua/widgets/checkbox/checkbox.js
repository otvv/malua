/*
*/

'use strict'

class MCheckBox extends HTMLElement {
  constructor() {
    // ..
    super()

    // create shadow root
    const shadow = this.attachShadow({mode: 'open'})

    // checkbox box
    const checkboxSpan = document.createElement('span')

    // apply style
    checkboxSpan.setAttribute('class', 'm-checkbox-box')

    // create checkbox input wrapper and set its type
    const checkboxElement = checkboxSpan.appendChild(document.createElement('input'))
    checkboxElement.setAttribute('type', 'checkbox')

    // checkbox label
    const checkboxLabel = checkboxSpan.appendChild(document.createElement('label'))

    // apply checkbox classes
    checkboxElement.setAttribute('class', 'm-checkbox')
    checkboxLabel.setAttribute('class', 'm-checkbox-label')

    // checkbox title
    const checkboxTitle = this.hasAttribute('title')

    // checkbox status
    const checkboxStatus = this.getAttribute('status')

    if (checkboxStatus === 'disabled') {
        checkboxElement.disabled = true
        checkboxLabel.disabled = true
    }

    // checkbox default state
    const checkboxDefaulState = (this.hasAttribute('value') || this.hasAttribute('state') || this.hasAttribute('checked'))

    if (checkboxDefaulState) {
      checkboxElement.checked = (this.getAttribute('value') || this.getAttribute('state') || this.getAttribute('checked'))
    }

    // checkbox id (variable)
    const checkboxId = (this.hasAttribute('id') || this.hasAttribute('var'))

    if (checkboxId) {
      checkboxElement.id = (this.getAttribute('id') || this.getAttribute('var'))
      checkboxLabel.setAttribute('for', (this.getAttribute('id') || this.getAttribute('var')))
    }

    if (checkboxTitle) {
      checkboxLabel.innerText = this.getAttribute('title')
    }

    // checkbox position
    const checkboxPosX = this.hasAttribute('x')
    const checkboxPosY = this.hasAttribute('y')

    if (checkboxPosX) {
      checkboxLabel.style.left = this.getAttribute('x')
      checkboxSpan.style.left = this.getAttribute('x')
      checkboxElement.style.left = this.getAttribute('x')
    }

    if (checkboxPosY) {
      checkboxLabel.style.top = this.getAttribute('y')
      checkboxSpan.style.top = this.getAttribute('y')
      checkboxElement.style.top = this.getAttribute('y')
    }

    // padding
    const checkboxPadding = this.hasAttribute('padding')

    if (checkboxPadding) {
      checkboxLabel.style.padding = this.getAttribute('padding')
      checkboxSpan.style.padding = this.getAttribute('padding')
    }

    // checkbox size
    const checkboxWidth = this.hasAttribute('width') || this.hasAttribute('w')
    const checkboxHeight = this.hasAttribute('height') || this.hasAttribute('h')

    if (checkboxWidth) {
      checkboxSpan.style.width = this.getAttribute('width') || this.getAttribute('w')
    }

    if (checkboxHeight) {
      checkboxSpan.style.height = this.getAttribute('height') || this.getAttribute('h')
    }

    // apply external styles to the shadow dom
    const globalStyleLink = document.createElement('link')
    globalStyleLink.setAttribute('rel', 'stylesheet')
    globalStyleLink.setAttribute('href', 'malua/malua.css')

    const styleLink = document.createElement('link')
    styleLink.setAttribute('rel', 'stylesheet')
    styleLink.setAttribute('href', 'malua/widgets/checkbox/checkbox.css')

    // attach our elements to the Shadow DOM
    shadow.appendChild(globalStyleLink)
    shadow.appendChild(styleLink)
    shadow.appendChild(checkboxSpan)
  }
}

// define the new element
customElements.define('m-checkbox', MCheckBox)
