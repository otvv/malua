/*
*/

'use strict'

class MGroupBox extends HTMLElement {
  constructor() {

    // ..
    super()

    // create shadow root
    const shadow = this.attachShadow({ mode: 'open' })

    // fieldset wrapper
    const fieldElement = document.createElement('fieldset')

    // fieldset custom shader
    const fieldShader = this.hasAttribute('shader')

    // fieldset id (variable)
    const fieldID = (this.hasAttribute('id') || this.hasAttribute('var'))

    if (fieldID) {
      fieldElement.id = (this.getAttribute('id') || this.getAttribute('var'))
    }

    // fieldset legend wrapper
    const legendElement = fieldElement.appendChild(document.createElement('legend'))

    // fieldset title
    const fieldsetLegend = this.hasAttribute('title') || 'null'

    legendElement.setAttribute('class', 'm-groupbox-label')

    if (fieldsetLegend) {
      legendElement.textContent = this.getAttribute('title');
    }

    // custom class & shaders
    // TODO: find a proper way to add more classes
    if (fieldShader) {
      fieldElement.setAttribute('class', ('m-groupbox ' + this.getAttribute('shader')))
    }
    else {
      fieldElement.setAttribute('class', 'm-groupbox')
    }

    // groupbox position
    const fieldPosX = this.hasAttribute('x')
    const fieldPosY = this.hasAttribute('y')

    if (fieldPosX) {
      fieldElement.style.left = this.getAttribute('x')
    }

    if (fieldPosY) {
      fieldElement.style.top = this.getAttribute('y')
    }

    // fieldset size
    const fieldWidth = this.hasAttribute('width') || this.hasAttribute('w')
    const fieldHeight = this.hasAttribute('height') || this.hasAttribute('h')

    if (fieldWidth) {
      fieldElement.style.width = this.getAttribute('width') || this.getAttribute('w')
    }

    if (fieldHeight) {
      fieldElement.style.height = this.getAttribute('height') || this.getAttribute('h')
    }

    // apply external styles to the shadow dom
    const globalStyleLink = document.createElement('link')
    globalStyleLink.setAttribute('rel', 'stylesheet')
    globalStyleLink.setAttribute('href', 'malua/malua.css')

    const styleLink = document.createElement('link')
    styleLink.setAttribute('rel', 'stylesheet')
    styleLink.setAttribute('href', 'malua/widgets/groupbox/groupbox.css')

    // attach our elements to the Shadow DOM
    shadow.appendChild(globalStyleLink)
    shadow.appendChild(styleLink)
    shadow.appendChild(fieldElement)

    // filter child elements
    for (let i = 1; i < this.childNodes.length; i++) {
      fieldElement.appendChild(this.childNodes[i])
    }
  }
}

// define the new element 
customElements.define('m-groupbox', MGroupBox)
