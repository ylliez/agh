/* DYNAMIC CANVAS
Creates a canvas that is dynamically resized as a function of window size
Adapted from Pippin Barr's "Automatic canvas scaling" (https://editor.p5js.org/pippinbarr/sketches/qIunNZo8j)
*/

class DynamicCanvas {

  constructor(explicitWidth, explicitHeight) {
    this.canvas = createCanvas(explicitWidth, explicitHeight);
    this.canvasRatio = height / width;
    this.width = undefined;
    this.height = undefined;
    this.update();
  }

  update() {
  this.windowRatio = windowHeight / windowWidth;
    if (this.windowRatio < this.canvasRatio) {
      this.height = windowHeight;
      this.width = windowHeight / this.canvasRatio;
    } else {
      this.width = windowWidth;
      this.height = windowWidth * this.canvasRatio;
    }
    this.canvas.elt.style.width = `${this.width}px`;
    this.canvas.elt.style.height = `${this.height}px`;
  }

}
