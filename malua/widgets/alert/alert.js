/*
*/

'use strict'

class MAlert extends HTMLElement {
  constructor() {
    // .. 
    super()

    // create shadow root
    const shadow = this.attachShadow({ mode: 'open' })

    // alert wrapper
    const alertElement = document.createElement('span')

    // alert id (variable)
    const alertId = (this.hasAttribute('id') || this.hasAttribute('var'))

    if (alertId) {
      alertElement.id = (this.getAttribute('id') || this.getAttribute('var'))
      alertTextElement.setAttribute('for', (this.getAttribute('id') || this.getAttribute('var')))
    }

    // custom class
    // TODO: find a proper way to add more classes dynamically
    alertElement.setAttribute('class', 'm-alert')

    // alert type
    const alertType = (this.hasAttribute('type'))

    // alert text
    const alertTextElement = alertElement.appendChild(document.createElement('a'))

    // alert text class
    alertTextElement.setAttribute('class', 'm-alert-text')

    // alert custom shader
    const alertShader = this.hasAttribute('shader')
    
    // alert custom text
    const alertText = this.hasAttribute('text')

    if (alertType) {
      
      if (alertShader) {
        alertElement.setAttribute('class', ('m-alert ' + this.getAttribute('shader') + ' m-alert-' + this.getAttribute('type')))
      }
      else {
        alertElement.setAttribute('class', 'm-alert ' + 'm-alert-' + this.getAttribute('type'))
      }

      if (alertText) {
        alertTextElement.text = this.getAttribute('text')
      }
    }
    else {
      alertElement.setAttribute('class', 'm-alert ' + this.getAttribute('shader'))
    }

    // alert position
    const alertPosX = this.hasAttribute('x')
    const alertPosY = this.hasAttribute('y')

    if (alertPosX) {
      alertElement.style.left = this.getAttribute('x')
    }

    if (alertPosY) {
      alertElement.style.top = this.getAttribute('y')
    }

    // alert size
    const alertWidth = this.hasAttribute('width') || this.hasAttribute('w')
    const alertHeight = this.hasAttribute('height') || this.hasAttribute('h')

    if (alertWidth) {
      alertElement.style.width = this.getAttribute('width') || this.getAttribute('w')
    }

    if (alertHeight) {
      alertElement.style.height = this.getAttribute('height') || this.getAttribute('h')
    }

    // apply external styles to the shadow dom
    const globalStyleLink = document.createElement('link')
    globalStyleLink.setAttribute('rel', 'stylesheet')
    globalStyleLink.setAttribute('href', 'malua/malua.css')

    const styleLink = document.createElement('link')
    styleLink.setAttribute('rel', 'stylesheet')
    styleLink.setAttribute('href', 'malua/widgets/alert/alert.css')

    // attach our elements to the Shadow DOM
    shadow.appendChild(globalStyleLink)
    shadow.appendChild(styleLink)
    shadow.appendChild(alertElement)
    
    // hide notification when the user clicks on it
    hideAlerts()
  }
}

function hideAlerts() {

  // find all alerts
  const alerts = document.getElementsByTagName('m-alert');

  // walk through all alerts
  for (let i = 0; i < alerts.length; i++) {

    // hide alerts on click
    alerts[i].onclick = function () {

      // set the opacity of the alert (fade out animation)
      alerts[i].style.opacity = 0;
      alerts[i].style.transition = 'opacity 0.8s';

      // hide selected alert on a given time (550ms) 
      setTimeout(function () { alerts[i].style.display = 'none'; }, 550);
    }
  }
}

// define the new element 
customElements.define('m-alert', MAlert)