/*
*/

'use strict'


class MSlider extends HTMLElement {

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
          <link rel="stylesheet" href="malua/widgets/slider/slider.css">
          <label class="m-slider-label"></label>
          <div class="m-slider-box">
            <input class="m-slider" type="range">
            <output class='m-slider-output-text'/>
          </div>
        `;

    // range input wrapper and box div
    const sliderElement = shadow.querySelector('input')
    const boxDivElement = shadow.querySelector('div')

    // range input title
    const sliderLabelElement = shadow.querySelector('label')

    // range input sufix and output
    const sufix = this.getAttribute('sufix') || '';
    const sliderOutput = shadow.querySelector('output')
    
    // list of attributes to look for
    const attributesToSet = ['title', 'id', 'placeholder', 'sufix', 'value', 'min', 'max', 'padding', 'x', 'y', 'top', 'left', 'width', 'height'];
    
    // set attributes if present
    attributesToSet.forEach((attribute) => {
      this.setAttributeWhenPresent(sliderElement, attribute);
    });

    // slider title and string attribution
    sliderLabelElement.textContent = sliderElement.title;

    if (sliderElement.id.length > 0) {
      sliderLabelElement.setAttribute('for', sliderElement.id);
    }

    // set default value
    sliderOutput.innerHTML = sufix ? `${sliderElement.valueAsNumber} (${sufix})` : sliderElement.valueAsNumber;

    // update slider
    sliderElement.oninput = (event) => {
      sliderOutput.innerHTML = sufix ? `${event.target.valueAsNumber} (${sufix})` : event.target.valueAsNumber;
    }

    // set slider size
    sliderElement.style.width = this.getAttribute('width')
    sliderElement.style.height = this.getAttribute('height')

    // set a fixed box height of 35 pixels and set up padding accordingly
    // in case the slider has a sufix
    if (sufix) {
      boxDivElement.style.height = '35px'
      sliderOutput.style.paddingTop = '10px'
      sliderOutput.style.paddingBottom = '10px'
    }
    
    // set slider pos
    sliderElement.style.left = this.getAttribute('x') || this.getAttribute('left')
    sliderElement.style.top = this.getAttribute('y') || this.getAttribute('top')
  }
}

// define the new element
customElements.define('m-slider', MSlider)
