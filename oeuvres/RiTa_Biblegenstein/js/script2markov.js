// // from https://rednoise.org/rita/examples/p5/Kafgenstein/ (source: https://rednoise.org/rita/examples/p5/Kafgenstein/#source)
// let lines, markov, data1, data2, x = 160, y = 240;
//
// function preload() {
//   data1 = loadStrings('assets/data/wittgenstein.txt');
//   data2 = loadStrings('assets/data/kafka.txt');
// }
//
// function setup() {
//
//   createCanvas(500, 500);
//   textFont('helvetica', 16);
//   textLeading(21);
//   textAlign(LEFT);
//
//   lines = ["click to (re)generate"];
//
//   // create a markov model w' n=4
//   markov = RiTa.markov(4);
//
//   // load text into the model
//   markov.addText(data1.join(' '));
//   markov.addText(data2.join(' '));
//
//   drawText();
// }
//
// function drawText() {
//   background(50, 30, 40);
//   fill(220);
//   text(lines.join(' '), x, y, 420, 420);
// }
//
// function mouseClicked() {
//   lines = markov.generate(10);
//   x = y = 40;
//   drawText();
// }

// from https://rednoise.org/rita/examples/p5/Kafgenstein/ (source: https://rednoise.org/rita/examples/p5/Kafgenstein/#source)
let lines, markov, data1, data2, x = 160, y = 240;

function preload() {
  data1 = loadStrings('assets/texts/wittgenstein.txt');
  data2 = loadStrings('assets/texts/bible.txt');
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  textFont('helvetica', 18);
  textLeading(21);
  textAlign(LEFT);

  lines = ["click to (re)generate"];

  // create a markov model w' n=4
  markov = RiTa.markov(3);

  // load text into the model
  markov.addText(data1.join(' '),10);
  markov.addText(data2.join(' '));

  drawText();
}

function drawText() {
  background(50, 30, 40);
  fill(220);
  text(lines.join(' '), x, y, width - x, height - y);
  console.log(width-x);
}

function mouseClicked() {
  lines = markov.generate(10);
  x = y = 40;
  drawText();
}
