"use strict";

// program outline (state, progress, instructions)
let dynamicCanvas;
let state = `title`;
let buttPlay, buttInstr, buttGo;
let introFinished = false;
let buttonedUp = false;
let instructions = `Wave your finger in front of the webcam to move the cursor.
Place it on the razor to drag it forth and back across the screen.
Keep a slow steady hand, if your cursor moves too far up or down,
                                                                                      the game will reset.`;
let isSim = false;

// movie images
const ImgFilepath = `BCBuñuel-`;
let numImages = 83;
let images = [];
let introFrame = 0;
let closeUpFrame = 32;

// loading page
let loadString = `LOADING...`;
let loadMin = false;
let currentCharacter = 0;
let currentString;

// ml5 hand recognition
let video, handpose;
let handposeLoaded = false;
let predictions = [];
let index;

// simulation action frame
let frameT, frameB, frameL, frameR;
let frameH, frameW, frameX, frameY;
let isTipInFrame, bladeCursor, bladeFrame;
let delta, tipToFrame;

function preload() {
  for (let i = 0; i < numImages; i++) {
    let loadedImage = loadImage(`assets/images/${ImgFilepath}${i}.png`);
    images.push(loadedImage);
  }
  bladeCursor = loadImage(`assets/images/blade.png`);
  bladeFrame = loadImage(`assets/images/bladeS.png`);
}

function setup() {
  dynamicCanvas = new DynamicCanvas(500, 238);
  // set background image
  image(images[0], 0, 0);
  // create buttons and display play button
  buttPlay = new DynamicButton(`PLAY`, 34, 46, playClicked);
  buttInstr = new DynamicButton(`INSTRUCTIONS`, 1, 58, instructionsClicked);
  buttGo = new DynamicButton(`GO`, 56.5, 41, goClicked, 1.6, 100);
  buttPlay.show();
  // set frame parameters
  frameT = height / 2;
  frameB = 2 * height / 3;
  frameL = 3 * width / 4;
  frameR = width;
  frameH = frameB - frameT;
  frameW = frameR - frameL;
  // instantiale handpose holder
  index = new Index();
}

// main function
function draw() {
  dynamicCanvas.update();
  buttPlay.update();
  buttInstr.update();
  buttGo.update();
  switch (state) {
    case `title`: break;
    case `instruction`: instruction(); break;
    case `sim`: sim(); break;
  }
}

function playClicked() {
  // hide start button
  buttPlay.hide();

  setInterval(() => { playIntro(); }, 55.55);

  // start & hide webcam
  video = createCapture(VIDEO);
  video.hide();

  // start Handpose model and signal when loaded
  handpose = ml5.handpose(video, { flipHorizontal: true }, () => { handposeLoaded = true; });
  handpose.on(`predict`, (results) => { predictions = results; });
}

function playIntro() {
  // display loading animation
  playFrame();
  // display loading text
  if (!handposeLoaded || !introFinished) { typeLoad(); }
  else { titleLoad(); }
}

function playFrame() {
  if (introFrame < closeUpFrame) {
    image(images[introFrame], 0, 0, width, height);
    introFrame++;
  }
  else { introFinished = true; }
}

function typeLoad() {
  // set incrementally increasing substring to print
  currentString = loadString.substring(0, currentCharacter);
  push();
  // position to image element
  translate(width / 3, height / 2);
  textAlign(LEFT,BOTTOM);
  textFont(`Arial`);
  textSize(height/10);
  textStyle(BOLD);
  fill(255 - currentCharacter / loadString.length * 255);
  // display incrementally increasing substring
  text(currentString, height / 12, width / 58);
  pop();
  // increment or wrap substring boundary
  if (currentCharacter <= loadString.length + 1) { currentCharacter += 1; }
  else { currentCharacter = 0; loadMin = true; }
}

function titleLoad() {
  // display background image
  image(images[closeUpFrame - 1], 0, 0, width, height);
  if (!buttonedUp) {
    buttGo.show();
    buttInstr.show();
    buttonedUp = true;
  }
}

function instructionsClicked() {
  buttInstr.hide();
  state = `instruction`;
}

function instruction () {
  image(images[closeUpFrame - 1], 0, 0, width, height);
  checkHand();
  // if (currentCharacter <= loadString.length + 1) {
  //   currentString = loadString.substring(0, currentCharacter);
    push();
    // position to image element
    // textAlign(LEFT,BOTTOM);
    textFont(`Arial`);
    // textSize(height/20);
    textSize(width / 50);
    textStyle(BOLD);
    fill(0);
    // display incrementally increasing substring
    text(instructions, width / 30, height * 6 / 10);
    pop();
  // }
}

function goClicked() {
  buttInstr.hide();
  buttGo.hide();
  isSim = true;
  state = `sim`;
}

function sim() {
  // DEBUG - display webcam
  // image(ml5.flipImage(video, 0, 0, width, height);

  checkHand();
}

function checkHand() {
  if (predictions.length > 0) {
    index.coordinates = predictions[0];
    index.coordinate(width,height);
    // if (isSim) {
      checkFrame();
    // }
    drawBlade();
    // DEBUG - display index tip
    // displayIndexTip();
    // DEBUG - display bounding rectangle frame and/or center
    // if (isTipInFrame) { displayRect(false, true); }
  }
  else { resetFrame(); }
}

function checkFrame() {
  isTipInFrame = index.tip.y < frameB && index.tip.y > frameT && index.tip.x > frameL && index.tip.x < frameR;
  if (isTipInFrame & isSim) { updateFrame(); }
  else { resetFrame(); }
  image(images[tipToFrame], 0, 0, width, height);
}

function updateFrame() {
  delta = round(index.tip.x - index.prev.x);
  if (abs(delta) > 1) {
    tipToFrame = floor(map(index.tip.x, width, 0, closeUpFrame, numImages));
    frameL += delta;
    frameR += delta;
    frameX = frameL + (frameR - frameL) / 2;
    frameY = frameT + (frameB - frameT) / 2;
  }
}

function resetFrame() {
  frameL = 3 * width / 4;
  frameR = width;
  tipToFrame = closeUpFrame - 1;
}

function drawBlade() {
  push();
  imageMode(CENTER);
  if (!isTipInFrame) {
    image(bladeCursor, index.tip.x, index.tip.y);
  }
  else {
    translate(-width/2, -frameH/2);
    image(bladeFrame, frameR, index.tip.y, width, height);
  }
  pop();
}

function displayIndexTip() {
  push();
  fill(255);
  noStroke();
  ellipse(index.tip.x, index.tip.y, 15, 15);
  pop();
}

function displayRect(frame, center) {
  push();
  noFill();
  stroke(0);
  if(frame) { rect(frameL, frameT, frameR - frameL, frameB - frameT); }
  if(center) { ellipse(frameX, frameY, 10, 10); }
  pop();
}
