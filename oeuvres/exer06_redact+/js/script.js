// ^\w*\s\d+:\d+\s
// image dims: 1792*1008

"use strict";
let state = `title`;
// holders for grammar JSON & object
let grammarJSON, grammar;
const NUM_COMMANDS = 10;
const REVEAL_PROB = 0.05;
const ATTEMPT_FREQ = 500;
// holders for sound effects and info
let sfx = [];
const NUM_SOUNDS = 8;
// holder for diagetic text elements
const END_TEXT = `
And all the people saw the thunderings, and the lightnings, and the noise of the trumpet, and the mountain smoking.
The commandments have been set in stone. Would you like a printed copy to safeguard your soul?`;

function preload() {
  grammarJSON = loadJSON('assets/data/grammar.json');
  for (let i = 0; i < NUM_SOUNDS; i++) {
    sfx[i] = loadSound(`assets/audio/sfx_holy_${i}.wav`);
  }
}

function setup() {
  // set RiTa grammar rules
  grammar = RiTa.grammar(grammarJSON);
  // set click start feature
  $('body').one(`click`, startSim);
}

function startSim() {
  $('#intro').empty();
  // $('#intro').css(`opacity`, `0`);
  $('#startClk').empty();
  // generate 10 lines following the grammar
  for (let i = 0; i < NUM_COMMANDS; i++) {
    $(`#cmd${i}`).html(grammar.expand());
    // console.log($(`#cmd${i}`).html());
  }
  // start timer for intervallic command revelation
  setInterval(revelation, ATTEMPT_FREQ);
  // changes command on click
  $(`span`).on(`click`, obfuscate);
}

// reveals commands
function revelation() { $(`.esoteric`).each(attemptReveal); }

function attemptReveal() {
  if (Math.random() < REVEAL_PROB) {
    random(sfx).play();
    $(this).animate( { "opacity": 1 }, 1000, checkEnd);
    $(this).removeClass(`esoteric`);
    $(this).addClass(`revealed`);
  }
}

function obfuscate() {
  $(this).animate( { "opacity": 0 }, 1000, function() {
    let selectionPartOfSpeech = RiTa.pos($(this).html());
    if (RiTa.isPunct(selectionPartOfSpeech[selectionPartOfSpeech.length-1])) {
      $(this).html(grammar.expand("object"));
    }
    else {
    $(this).html(grammar.expand(selectionPartOfSpeech[0]));}
    $(this).animate( { "opacity": 1 }, 1000);
  });
  // $(this).removeClass(`revealed`);
  // $(this).addClass(`esoteric`);
}

function checkEnd() {
  if (!$(`.esoteric`).length) {
    if(confirm(END_TEXT)) { window.print(); }
  }
}
