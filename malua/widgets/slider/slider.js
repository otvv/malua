/*
*/

'use strict'

class MSlider extends HTMLElement {
  constructor() {
    // ..
    super()

    // create shadow root
    const shadow = this.attachShadow({mode: 'open'})

    // slider background
    const sliderSpan = document.createElement('span')

    // apply style
    sliderSpan.setAttribute('class', 'm-slider-box')

    // slider wrapper
    const sliderElement = sliderSpan.appendChild(document.createElement('input'))

    // apply slider class and type
    sliderElement.setAttribute('class', 'm-slider')
    sliderElement.setAttribute('type', 'range')

    // slider title
    const sliderTitle = this.hasAttribute('title')

    if (sliderTitle) {
      sliderElement.textContent = this.getAttribute( 'title' )
    }

    // slider id (variable)
    const sliderId = (this.hasAttribute('id') || this.hasAttribute('var'))

    if (sliderId) {
      sliderElement.id = (this.getAttribute('id') || this.getAttribute('var'))
    }

    // slider default value
    const sliderValue = this.hasAttribute('value')

    if (sliderValue) {
      sliderElement.value = this.getAttribute('value')
    }

    // slider min max value
    const sliderMin = this.hasAttribute('min')
    const sliderMax = this.hasAttribute('max')

    if (sliderMin) {
      sliderElement.min = this.getAttribute('min')
    }

    if (sliderMax) {
      sliderElement.max = this.getAttribute('max')
    }

    // slider position
    const sliderPosX = this.hasAttribute('x')
    const sliderPosY = this.hasAttribute('y')

    if (sliderPosX) {
      sliderSpan.style.left = this.getAttribute('x')
      sliderElement.style.left = this.getAttribute('x')
    }

    if (sliderPosY) {
      sliderSpan.style.top = this.getAttribute('y')
      sliderElement.style.top = this.getAttribute('y')
    }

    // padding
    const sliderPadding = this.hasAttribute('padding')

    if (sliderPadding) {
      sliderSpan.style.padding = this.getAttribute('padding')
    }

    // slider size
    const sliderWidth = this.hasAttribute('width') || this.hasAttribute('w')
    const sliderHeight = this.hasAttribute('height') || this.hasAttribute('h')

    if (sliderWidth) {
      sliderSpan.style.width = this.getAttribute('width') || this.getAttribute('w')
      sliderElement.style.width = this.getAttribute('width') || this.getAttribute('w')
    }

    if (sliderHeight) {
      sliderElement.style.height = this.getAttribute('height') || this.getAttribute('h')
    }

    // apply external styles to the shadow dom
    const globalStyleLink = document.createElement('link')
    globalStyleLink.setAttribute('rel', 'stylesheet')
    globalStyleLink.setAttribute('href', 'malua/malua.css')

    const styleLink = document.createElement('link')
    styleLink.setAttribute('rel', 'stylesheet')
    styleLink.setAttribute('href', 'malua/widgets/slider/slider.css')

    // attach our elements to the Shadow DOM
    shadow.appendChild(globalStyleLink)
    shadow.appendChild(styleLink)
    shadow.appendChild(sliderSpan)
  }
}

// define the new element
customElements.define('m-slider', MSlider)
