/*
*/

'use strict'

class MAlert extends HTMLElement {
  
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

  // @brief: this function will checks for clicks around the area of the alert
  // after a click is registered it will proceed to hide it with a little fade-out animation
  // @arguments: `alertElement` = alert element wrapper 
  hideAlerts = (element) => {
    // hide alerts on click
    element.onclick = () => {
  
      // set the opacity of the alert (fade out animation)
      element.style.opacity = 0
      element.style.transition = '0.35s'
  
      // hide selected alert on a given time (350ms)
      setTimeout(() => {
        element.style.visibility = 'hidden'
        element.style.display = 'none'
        element.remove
      }, 350)
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
    <link rel="stylesheet" href="malua/widgets/alert/alert.css">
    <div class="m-alert-box">
      <span class="m-alert">
      <a class="m-alert-label"></a>
      </span>
    </div>
  `;

    // alert span wrapper
    const alertSpanElement = shadow.querySelector('span')

    // alert text wrapper
    const alertLabelElement = shadow.querySelector('a')
    
    // list of attributes to look for
    const attributesToSet = ['text', 'id', 'shader', 'effect', 'type', 'x', 'y', 'top', 'left', 'width', 'height'];

    // set attributes if present
    attributesToSet.forEach((attribute) => {
      this.setAttributeWhenPresent(alertSpanElement, attribute);
    });
    
    // set alert size
    alertSpanElement.style.width = this.getAttribute('width')
    alertSpanElement.style.height = this.getAttribute('height')

    // set alert pos
    alertSpanElement.style.left = this.getAttribute('x') || this.getAttribute('left')
    alertSpanElement.style.top = this.getAttribute('y') || this.getAttribute('top')
    
    // handle different types of alerts
    if (this.hasAttribute('type')) {
      
      // set alert shader
      if (this.hasAttribute('shader') || this.hasAttribute('effect')) {
        alertSpanElement.classList.add(this.getAttribute('shader') || this.getAttribute('effect'), `m-alert-${this.getAttribute('type')}`)
      }
      // set alert type
      alertSpanElement.classList.add(`m-alert-${this.getAttribute('type')}`)

    } else {
      
      if (this.hasAttribute('shader') || this.hasAttribute('effect')) {
        alertSpanElement.classList.add(this.getAttribute('shader') || this.getAttribute('effect'))
      }

      alertSpanElement.classList.add('m-alert-default')
    }
    
    // set alert text
    alertLabelElement.textContent = this.getAttribute('text')
    
    // hide alert (notification) if the user clicks on it
    this.hideAlerts(alertSpanElement)

    // set alert link/href
    this.setHref(buttonElement, this.getAttribute('href'))
  }
}

// define the new element
customElements.define('m-alert', MAlert)
