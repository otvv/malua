/*
*/

'use strict'

class MFigure extends HTMLElement {

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
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
          <link rel="stylesheet" href="malua/malua.css">
          <link rel="stylesheet" href="malua/widgets/figure/figure.css">
          <img class="m-figure" />
        `;

    // figure img wrapper
    const figureElement = shadow.querySelector('img')

    // list of attributes to look for
    const attributesToSet = ['id', 'src', 'alt', 'x', 'y', 'top', 'left', 'width', 'height', 'draggable', 'radius'];
    
    // set attributes if present
    attributesToSet.forEach((attribute) => {
      this.setAttributeWhenPresent(figureElement, attribute);
    });
    
    // disable dragging by default
    figureElement.setAttribute('draggable', 'false')
    
    // set border radius
    figureElement.style.borderRadius = this.getAttribute('radius');

    // set figure pos
    figureElement.style.left = this.getAttribute('x') || this.getAttribute('left')
    figureElement.style.top = this.getAttribute('y') || this.getAttribute('top')
  }
}

// define the new element 
customElements.define('m-figure', MFigure)
