/*
*/

'use strict'

class MCheckBox extends HTMLElement {

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
          <link rel="stylesheet" href="malua/widgets/checkbox/checkbox.css">
          <div class="m-checkbox-box">
          <input class="m-checkbox" type="checkbox">
          <label class="m-checkbox-label"></label>
          </div>
        `;


    // checkbox input wrapper and box div
    const checkboxElement = shadow.querySelector('input')
    const boxDivElement = shadow.querySelector('div')

    // checkbox input title
    const checkboxLabelElement = shadow.querySelector('label')

     // list of attributes to look for
     const attributesToSet = ['title', 'id', 'placeholder', 'disabled', 'padding', 'x', 'y', 'top', 'left', 'width', 'height'];
    
     // set attributes if present
     attributesToSet.forEach((attribute) => {
       this.setAttributeWhenPresent(checkboxElement, attribute);
     });
    
    // checkbox title and string attribution
    checkboxLabelElement.textContent = checkboxElement.title;
    
    if (checkboxElement.id.length > 0) {
      checkboxLabelElement.setAttribute('for', checkboxElement.id);
    }

    // set default state
    // TODO: clean this up
    if (this.getAttribute('checked') === 'true' || this.getAttribute('checked') === 'checked' 
    || (this.getAttribute('state') === 'true' || this.getAttribute('state') === 'checked')) {
      checkboxElement.click();
      checkboxElement.checked = true;
    } else {
      checkboxElement.checked = false
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
customElements.define('m-checkbox', MCheckBox)
