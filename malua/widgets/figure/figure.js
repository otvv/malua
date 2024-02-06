/*
 */

"use strict";

class MFigure extends MMalua {
  // @brief: widget constructor (don't touch this unless you know what you're doing!)
  constructor() {
    // ..
    super();

    // create shadow root
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
          <link rel="stylesheet" href="malua/malua.css">
          <link rel="stylesheet" href="malua/widgets/figure/figure.css">
          <img alt="figure" class="m-figure" />
        `;

    // figure img wrapper
    const figureElement = shadow.querySelector("img");

    // list of attributes to look for
    const attributesToSet = [
      "alt",
      "id",
      "src",
      "x",
      "y",
      "top",
      "left",
      "width",
      "height",
      "draggable",
      "radius",
    ];

    // set attributes if present
    attributesToSet.forEach((attribute) => {
      this.setAttributeWhenPresent(figureElement, attribute);
    });

    // disable dragging by default
    figureElement.setAttribute("draggable", "false");

    // set figure source
    const imageSource = this.getAttribute("src");
    figureElement.setAttribute("src", imageSource); // (for some reason the "setAttributeWhenPresent" function
                                                    // is not setting the image src properly)

    // set image title and alternative text
    this.setLabel(figureElement, imageAlt);
    this.setPlaceholder(figureElement, imageAlt);

    // set border radius
    figureElement.style.borderRadius = this.getAttribute("radius");

    // set figure abs pos
    const elementPosition = [
      this.getAttribute("x") || this.getAttribute("left"),
      this.getAttribute("y") || this.getAttribute("top"),
    ];
    this.setPosition(figureElement, elementPosition);

    // set figure size
    const elementSize = [
      this.getAttribute("width") || "moz-fit-content" || "fit-content",
      this.getAttribute("height") || "moz-fit-content" || "fit-content",
    ];
    this.setSize(figureElement, elementSize);
  }
}

// define the new element
customElements.define("m-figure", MFigure);
