let json, grammar, result;
let lines = []
const NUM_COMMANDS = 10;

function preload() {
  json = loadJSON('assets/data/grammar.json');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(30);
  textAlign(LEFT);

  grammar = RiTa.grammar(json);
  for (let i = 0; i < NUM_COMMANDS; i++) {
    lines[i] = grammar.expand();
  }
}

function draw() {
  background(230, 240, 255);
  for (let i = 0; i < NUM_COMMANDS; i++) {
    text(lines[i], 20, (i+5)*40);
  }
}
