/*
*/

'use strict'

class MGroupBox extends HTMLElement {
  
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
          <link rel="stylesheet" href="malua/widgets/groupbox/groupbox.css">
          <fieldset class="m-groupbox">
          <legend class="m-groupbox-label"></legend>
          </fieldset>
        `;

    // fieldset wrapper
    const fieldsetElement = shadow.querySelector('fieldset')

    // fieldset title
    const fieldsetLegendElement = shadow.querySelector('legend')

    // list of attributes to look for
    const attributesToSet = ['title', 'id', 'shader', 'effect', 'x', 'y', 'top', 'left', 'width', 'height'];

    // set attributes if present
    attributesToSet.forEach((attribute) => {
      this.setAttributeWhenPresent(fieldsetElement, attribute);
    });

    // fieldset title and string attribution
    fieldsetLegendElement.textContent = fieldsetElement.title;

    if (fieldsetElement.id.length > 0) {
      fieldsetLegendElement.setAttribute('for', fieldsetElement.id);
    }

    // set fieldset size
    fieldsetElement.style.width = this.getAttribute('width') || 'fit-content'
    fieldsetElement.style.height = this.getAttribute('height')

    // set fieldset pos
    fieldsetElement.style.left = this.getAttribute('x') || this.getAttribute('left')
    fieldsetElement.style.top = this.getAttribute('y') || this.getAttribute('top')

    // set fieldset shader
    fieldsetElement.classList.add(this.getAttribute('shader') || this.getAttribute('effect'))

    // handle child elements
    for (let i = 1; i < this.childNodes.length; i++) {
      fieldsetElement.appendChild(this.childNodes[i])
    }
  }
}

// define the new element
customElements.define('m-groupbox', MGroupBox)
