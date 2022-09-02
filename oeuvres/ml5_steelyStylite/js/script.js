"use strict";

// general
let dynamicCanvas;
let state = `pre`;

// images (background, figure, extracted figure)
let imgDesierto, imgDel, imgSimon;
// offset of extracted figure from position of figure in background
let symeonX = 847;
let symeonY = 156;

// loading page
let loadString = `LOADING...`;
let loadMin = 2;
let currentCharacter = 0;
let currentString;

// instructions page
let instructionsObj;
let instructionsKey = [];
let instructions = [];
let instructionsPage = 0;
let buttonedUp = false;

// posture recognition
let video, poseNet;
let poseNetInit = false;
let poses = [];
let pose;
let balance, rotation;
let stableSymeon = true;
let fallParameter;

// load images and instructions from assets
function preload() {
  imgDesierto = loadImage(`assets/images/desierto.png`);
  imgDel = loadImage(`assets/images/del.png`);
  imgSimon = loadImage(`assets/images/simon.png`);
  instructionsObj = loadJSON("assets/data/instructions.json");
}

// setup canvas, instructions and posture recognition
function setup() {
  dynamicCanvas = new DynamicCanvas(1600, 900);

  // load instructions array
  instructionsKey = Object.keys(instructionsObj);
  for (let i = 0; i < instructionsKey.length; i++) {
    instructions[i] = instructionsObj[instructionsKey[i]];
  }

  // start webcam and hide resulting HTML element
  video = createCapture(VIDEO);
  video.hide();

  // start poseNet model and signal when loaded
  poseNet = ml5.poseNet(video, { flipHorizontal: true }, () => { poseNetInit = true; });
  // DEBUG - shortcircuit poseNet
  // setTimeout( () => { poseNetInit = true; }, 2000);

  // listen for pose events from poseNet and store the results in poses array
  poseNet.on(`pose`, (results) => { poses = results; });

  // instantiate Pose object for poseNet manipulations
  pose = new Pose();

}

// main function
function draw() {
  dynamicCanvas.update();
  image(imgDesierto, 0, 0, width, height);
  switch (state) {
    case `pre`: pre(); break;
    case `title`: title(); break;
    case `sim`: sim(); break;
    case `falling`: falling(); break;
    case `post`: post(); break;
  }
}

// wait for poseNet load
function pre() {
  // display loading text with typewriter effect
  if (!poseNetInit || loadMin > 0) { typeLoad(); }
  // display title text & instructions
  else { state = `title`; }
}

function typeLoad() {
  // set incrementally increasing substring to print
  currentString = loadString.substring(0, currentCharacter);
  push();
  // position to image element
  translate(width / 2, height);
  rotate(3*PI/2);
  textAlign(LEFT,CENTER);
  textFont(`Arial`);
  textSize(90);
  textStyle(BOLD);
  // display incrementally increasing substring
  text(currentString, 70, 50); // inside pillar
  // text(currentString, 70, -17); // left of pillar
  pop();
  // increment or wrap substring boundary
  if (currentCharacter < loadString.length) { currentCharacter += 0.1; }
  else { currentCharacter = 0; loadMin--; }
}

function title() {
// display title & foreground image
  displayTitle();
  image(imgDel, 0, 0);
  if (!buttonedUp) {
    document.getElementById("instructionsButton").style.display = "block";
    document.getElementById("startButton").style.display = "block";
    buttonedUp = true;
  }
}

function displayTitle() {
  push();
  textAlign(CENTER,CENTER);
  textFont(`cursive`);
  textSize(150);
  text(`Steely`, width / 4, height / 6);
  text(`Stylite`, 3 * width / 4, height / 6);
  pop();
}

function instructionsClicked() {
  document.getElementById("instructionsText").innerHTML = instructions[instructionsPage];
  document.getElementById("instructionsButton").style.display = "none";
  document.getElementById("startButton").style.display = "none";
  document.getElementById("instructionsText").style.display = "block";
  document.getElementById("okButton").style.display = "block";
}

function okClicked () {
  instructionsPage++;
  document.getElementById("instructionsText").innerHTML = instructions[instructionsPage];
  if (instructionsPage >= instructions.length - 1) {
    document.getElementById("okButton").style.display = "none";
    document.getElementById("startButton").style.display = "block";
  }
}

function startClicked() {
  document.getElementById("instructionsButton").style.display = "none";
  document.getElementById("startButton").style.display = "none";
  document.getElementById("instructionsText").style.display = "none";
  document.getElementById("okButton").style.display = "none";
  state = `sim`;
}

function sim() {
  // DEBUG - display webcam
  // image(ml5.flipImage(video), 0, 0, width, height);

  // check poseNet event
  assessPose();
}

function assessPose() {
  if (poses.length > 0) {
    pose.coordinates = poses[0];
    pose.update();
    pose.checkBalanceShoulders();
    drawSymeon();
    if (stableSymeon) { balanceSymeon(); }
    else { fellSymeon();  }
  }
}

function balanceSymeon() {
  if (pose.shoulders.disequilibrium) {
    fallParameter = pose.shoulders.balance - pose.shoulders.balPrev;
    // fallParameter = 0.05;
    // fallParameter = PI/4;
    stableSymeon = false;
  }
  rotation = pose.shoulders.balance;
}

function fellSymeon() {
  if (symeonY >= height + 20) { state = `post`; }
  else {
    symeonX += fallParameter * 15;
    symeonY += abs(fallParameter) * 30;
    rotation += fallParameter / 2;
  }
}

function drawSymeon() {
  push();
  translate(symeonX, symeonY);
  rotate(rotation);
  imageMode(CENTER);
  image(imgSimon, 0, 0);
  pop();
}

function post() {
  displayOver();
  document.getElementById("reButton").style.display = "block";
}

function displayOver() {
  push();
  textAlign(CENTER,CENTER);
  textFont(`cursive`);
  textSize(400);
  text(`You`, width / 4, height / 2);
  text(`fell`, 3 * width / 4, height / 2);
  pop();
}

function reClicked() {
  document.getElementById("reButton").style.display = "none";
  symeonX = 847;
  symeonY = 156;
  stableSymeon = true;
  startClicked();
}
