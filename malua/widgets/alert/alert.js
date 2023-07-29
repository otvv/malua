/*
*/

'use strict'

class MAlert extends HTMLElement {
  constructor() {
    // ..
    super()

    // create shadow root
    const shadow = this.attachShadow({ mode: 'open' })

    // alert box
    const alertSpan = document.createElement('span')

    // apply style
    alertSpan.setAttribute('class', 'm-alert-box')

    // alert wrapper
    const alertElement = alertSpan.appendChild(document.createElement('span'))

    // alert id (variable)
    const alertId = (this.hasAttribute('id') || this.hasAttribute('var'))

    if (alertId) {
      alertElement.id = (this.getAttribute('id') || this.getAttribute('var'))
      alertTextElement.setAttribute('for', (this.getAttribute('id') || this.getAttribute('var')))
    }

    // custom class
    alertElement.setAttribute('class', 'm-alert')

    // alert type
    const alertType = (this.hasAttribute('type'))

    // alert text
    const alertTextElement = alertElement.appendChild(document.createElement('a'))

    // alert text class
    alertTextElement.setAttribute('class', 'm-alert-text')

    // alert custom shader
    const alertShader = (this.hasAttribute('shader') || this.hasAttribute('effect'))

    // alert custom text
    const alertText = this.hasAttribute('text')

    if (alertType) {

      if (alertShader) {
        alertElement.classList.add(this.getAttribute('shader'), `m-alert-${this.getAttribute('type')}`)
      }

      alertElement.classList.add(`m-alert-${this.getAttribute('type')}`)

      if (alertText) {
        alertTextElement.text = this.getAttribute('text')
      }
    }
    else {

      if (alertText) {
        alertTextElement.text = this.getAttribute('text')
      }

      if (alertShader) {
        alertElement.classList.add(this.getAttribute('shader'))
      }

      alertElement.classList.add('m-alert-default')
    }

    // alert position
    const alertPosX = this.hasAttribute('x')
    const alertPosY = this.hasAttribute('y')

    if (alertPosX) {
      alertSpan.style.left = this.getAttribute('x')
    }

    if (alertPosY) {
      alertSpan.style.top = this.getAttribute('y')
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
    shadow.appendChild(alertSpan)

    // hide alert (notification) if the user clicks on it
    hideAlerts(alertSpan)
  }
}

const hideAlerts = (alert) => {
  // hide alerts on click
  alert.onclick = () => {

    // set the opacity of the alert (fade out animation)
    alert.style.opacity = 0
    alert.style.transition = '0.35s'

    // hide selected alert on a given time (350ms)
    setTimeout(() => {
      alert.style.visibility = 'hidden'
      alert.style.display = 'none'
      alert.remove
    }, 350)
  }
}

// define the new element
customElements.define('m-alert', MAlert)
