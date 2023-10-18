/*
*/

'use strict'

class MColor extends HTMLElement {
  
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
    // ...
    super()

    // create shadow root
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = `
          <link rel="stylesheet" href="malua/malua.css">
          <link rel="stylesheet" href="malua/widgets/color/color.css">
          <div class="m-color-button-box">
          <input class="m-color-button" type="color">
          <label class="m-color-button-label"></label>
          </div>
        `;

        
    // color button wrapper and box div
    const colorbuttonElement = shadow.querySelector('input')
    const boxDivElement = shadow.querySelector('div')

    // color input title
    const colorbuttonLabelElement = shadow.querySelector('label')

    // list of attributes to look for
    const attributesToSet = ['title', 'id', 'placeholder', 'disabled', 'color', 'value', 'padding', 'x', 'y', 'top', 'left', 'width', 'height']

    // set attributes if present
    attributesToSet.forEach((attribute) => {
      this.setAttributeWhenPresent(colorbuttonElement, attribute);
    });

    // color button title and string attribution
    colorbuttonLabelElement.textContent = colorbuttonElement.title;
    
    if (colorbuttonElement.id.length > 0) {
      colorbuttonLabelElement.setAttribute('for', colorbuttonElement.id);
    }

    // set default color
    if (this.hasAttribute('color') || this.hasAttribute('value')) {
      colorbuttonElement.value =  (this.getAttribute('color') || this.getAttribute('value'))
    }

    // set div box size
    boxDivElement.style.width = this.getAttribute('width')
    boxDivElement.style.height = this.getAttribute('height')

    // set div box pos
    boxDivElement.style.left = this.getAttribute('x') || this.getAttribute('left')
    boxDivElement.style.top = this.getAttribute('y') || this.getAttribute('top')
  }
}

// define the new element
customElements.define('m-color', MColor)
