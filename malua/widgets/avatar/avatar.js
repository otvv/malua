/*
*/

'use strict'

class MAvatar extends HTMLElement {
  constructor() {
    // .. 
    super()

    // create shadow root
    const shadow = this.attachShadow({ mode: 'open' })

    // img wrapper
    const imgElement = document.createElement('img')

    // avatar id (variable)
    const avatarId = (this.hasAttribute('id') || this.hasAttribute('var'))
    
    if (avatarId) {
      imgElement.id = (this.getAttribute('id') || this.getAttribute('var'))
    }
    
    // custom class
    // TODO: find a proper way to add more classes dynamically
    imgElement.setAttribute('class', 'm-avatar')
    
    // disable dragging
    imgElement.setAttribute('draggable', 'false')
    
    // img source
    const imgSource = (this.hasAttribute('src') || this.hasAttribute('img') || this.hasAttribute('link'))

    if (imgSource) {
      imgElement.src = (this.getAttribute('src') || this.getAttribute('img') || this.hasAttribute('link'))
    }

    // img position
    const imgPosX = this.hasAttribute('x')
    const imgPosY = this.hasAttribute('y')

    if (imgPosX) {
      imgElement.style.left = this.getAttribute('x')
    }

    if (imgPosY) {
      imgElement.style.top = this.getAttribute('y')
    }

    // div size
    const imgWidth = this.hasAttribute('width') || this.hasAttribute('w')
    const imgHeight = this.hasAttribute('height') || this.hasAttribute('h')

    if (imgWidth) {
      imgElement.style.width = this.getAttribute('width') || this.getAttribute('w')
    }

    if (imgHeight) {
      imgElement.style.height = this.getAttribute('height') || this.getAttribute('h')
    }

    // apply external styles to the shadow dom
    const globalStyleLink = document.createElement('link')
    globalStyleLink.setAttribute('rel', 'stylesheet')
    globalStyleLink.setAttribute('href', 'malua/malua.css')

    const styleLink = document.createElement('link')
    styleLink.setAttribute('rel', 'stylesheet')
    styleLink.setAttribute('href', 'malua/widgets/avatar/avatar.css')

    // attach our elements to the Shadow DOM
    shadow.appendChild(globalStyleLink)
    shadow.appendChild(styleLink)
    shadow.appendChild(imgElement)
  }
}

// define the new element 
customElements.define('m-avatar', MAvatar)
