// from https://rednoise.org/rita/examples/p5/Kafgenstein/ (source: https://rednoise.org/rita/examples/p5/Kafgenstein/#source)
let lines, markov, data1, data2, x = 160, y = 240;

function preload() {
  data1 = loadStrings('assets/texts/wittg.txt');
  data2 = loadStrings('assets/texts/bible.txt');
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  textFont('helvetica', 18);
  textLeading(21);
  textAlign(LEFT);

  lines = ["Wittgenstein writes the Bible. Click to (re)generate"];

  // create a markov model w' n=4
  markov = RiTa.markov(3);

  // load text into the model
  markov.addText(data1.join(' '), 10);
  markov.addText(data2.join(' '));
  console.log(data2);

  drawText();
}

function drawText() {
  background(255);
  text(lines.join(' '), x, y, width - x, height - y);
  console.log(width - x);
}

function mouseClicked() {
  lines = markov.generate(10);
  x = y = 40;
  drawText();
}