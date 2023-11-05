/*
*/

'use strict'

class MButton extends HTMLElement {

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

  // @brief: with this fucntion the user can set a href link to a widget
  // that can handle `onclick` events (in this case the button) 
  //
  // @arguments: `element` = target element that will handle the 'onclick' event
  //             `hrefLink` = hyper reference link name (with #)
  setHref = (element, hrefLink) => {
    if (element === null) {
      return;
    }

    element.onclick = () => {
      window.location.href = hrefLink;
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
          <link rel="stylesheet" href="malua/widgets/button/button.css">
          <button class="m-button" type="button">
        `;

    // button wrapper
    const buttonElement = shadow.querySelector('button')

    // list of attributes to look for
    const attributesToSet = ['title', 'id', 'shader', 'href', 'link', 'effect', 'x', 'y', 'top', 'left', 'width', 'height'];

    // set attributes if present
    attributesToSet.forEach((attribute) => {
      this.setAttributeWhenPresent(buttonElement, attribute);
    });

    // set button title
    buttonElement.textContent = this.getAttribute('title')
    
    // set button size
    buttonElement.style.width = this.getAttribute('width') || 'fit-content'
    buttonElement.style.height = this.getAttribute('height')

    // set button pos
    buttonElement.style.left = this.getAttribute('x') || this.getAttribute('left')
    buttonElement.style.top = this.getAttribute('y') || this.getAttribute('top')
    
    // set button shader
    buttonElement.classList.add(this.getAttribute('shader') || this.getAttribute('effect'))

    // set button link/href
    if (this.hasAttribute('href')) {
      this.setHref(buttonElement, this.getAttribute('href'))
    }
  }
}

// define the new element
customElements.define('m-button', MButton)
