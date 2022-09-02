/* DYNAMIC BUTTON
Creates a canvas that is dynamically resized as a function of window size
Adapted from Pippin Barr's "Automatic canvas scaling" (https://editor.p5js.org/pippinbarr/sketches/qIunNZo8j)
*/

class DynamicButton {

  constructor(name, xPer, yPer, fctn, fontSizeFactor = 1.1, borderRadius = 30 ) {
    this.x = xPer;
    this.y = yPer;
    this.button = createButton(name);
    this.button.mousePressed(fctn);
    this.update();
    this.fontSizeFactor = fontSizeFactor;
    this.button.elt.style[`border-radius`] = `${borderRadius}px`;
  }

  update() {
    let canvasX = (windowWidth - dynamicCanvas.width) / 2;
    let canvasY = (windowHeight - dynamicCanvas.height) / 2;
    this.button.elt.style[`left`] = `${(canvasX + this.x * dynamicCanvas.width/100)}px`;
    this.button.elt.style[`top`] = `${(canvasY + this.y * dynamicCanvas.height/100)}px`;

    if ((windowHeight / windowWidth) < (dynamicCanvas.height / dynamicCanvas.width)) {
      this.button.elt.style[`font-size`] = `${this.fontSizeFactor * dynamicCanvas.height/23.8}px`;
      this.button.elt.style[`padding`] = `${dynamicCanvas.height/23.8/4}px`;
      } else {
      this.button.elt.style[`font-size`] = `${this.fontSizeFactor * dynamicCanvas.width/50}px`;
      this.button.elt.style[`padding`] = `${dynamicCanvas.width/50/4}px`;
    }

    // console.log(this.button.elt.style[`font-size`]);
  }

  hide() {
    this.button.hide();
  }

  show() {
    this.button.show();
  }

}
