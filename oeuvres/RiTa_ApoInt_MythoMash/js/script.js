// from https://rednoise.org/rita/examples/p5/Kafgenstein/ (source: https://rednoise.org/rita/examples/p5/Kafgenstein/#source)
let lines, markov, data1, data2, x = y = 40;
let button, button2;

function preload() {
  // data1 = loadStrings(`assets/texts/bible.txt`);
  // data2 = loadStrings(`assets/texts/quran.txt`);
  // data3 = loadStrings(`assets/texts/bgita.txt`);
  // data4 = loadStrings(`assets/texts/vedas.txt`);
  // data5 = loadStrings(`assets/texts/kafka.txt`);
  // data6 = loadStrings(`assets/texts/wittg.txt`);

  // data1 = loadStrings(`assets/texts/kafka.txt`);
  // data2 = loadStrings(`assets/texts/wittg.txt`);

  data1 = loadStrings(`assets/texts/bible2.txt`);
  data2 = loadStrings(`assets/texts/quran2.txt`);
  data3 = loadStrings(`assets/texts/bgita2.txt`);
  data4 = loadStrings(`assets/texts/vedas2.txt`);
  data5 = loadStrings(`assets/texts/kafka.txt`);
  data6 = loadStrings(`assets/texts/wittg.txt`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('papyrus', 30);
  textLeading(40);
  textAlign(LEFT);

  lines = ["Choose your texts!"];

  texts = [data1, data2, data3, data4, data5, data6];
  // texts = [data1, data2];

  drawText();
}

function drawText() {
  background(255);
  text(lines.join(' '), x, y, width - x, height - y);
}

function loadTexts() {
  lines = ["Loading..."];
  drawText();
  // call to another function after 1 second delay
  setTimeout(loadTexts2, 1000);
}

function loadTexts2() {
  value1 = document.getElementById("dropdown1").value;
  value2 = document.getElementById("dropdown2").value;
  console.log(value1);
  console.log(value2);

  // create a markov model w' n=4
  markov = RiTa.markov(3);

  // load text into the model
  markov.addText(texts[value1].join(' '));
  markov.addText(texts[value2].join(' '));

  document.getElementById("buttonGen").style.display = "inline-block";
  lines = ["Generate cross-over text"];
  drawText();
}

function generateText() {
  lines = markov.generate(10);
  drawText();
}