"use strict";

let sentence = `The elephant took a bite!`
let input, button;

function setup() {
  // let analysis = RiTa.analyze(`The elephant took a bite!`);
  // let rhyming = RiTa.rhymes(`sentence`);
  // let sentences = RiTa.sentences("banana cake. why not? today!");
  // let words = RiTa.tokenize(`The elephant took a bite!`);
  // console.log(rhyming);
  // // to load a grammar
  // let grammar = RiTa.grammar(jsonRules);
  // console.log(grammar.expand());

  // createCanvas(500,500);
  // background(200);
  // textSize(20);
  // noStroke();
  // for (let i=0; i < words.length; i++) {
  //   text(words[i], 50, 50 + i*20);
  // }

  // input = createInput(`default text.`);
  // button = createButton(`Submit`);
  // button.mousePressed( () => {
  //   let words = RiTa.tokenize(input.value());
  //   let output = ``;
  //   for (let i = 0; i < words.length; i++) {
  //     if (!RiTa.isPunct(words[i])) { output += ` `; }
  //     output += words[i];
  //   }
  //   createP(output);
  // });

  input = createInput(`The elephant took a bite!`);
  button = createButton(`Submit`);
  button.mousePressed( () => {
    let words = RiTa.tokenize(input.value());
    let output = ``;
    for (let i = 0; i < words.length; i++) {
      if (!RiTa.isPunct(words[i])) { output += ` `; }
      let wordPOS = RiTa.pos(words[i])[0];
      if (wordPOS === `nn`) { output += RiTa.randomWord( { pos: `nn`} ); }
      else { output += words[i]; }
    }
    createP(output);
  });



}
