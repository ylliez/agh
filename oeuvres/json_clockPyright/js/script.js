"use strict";

// variable for dynamic canvas object creation
let dynamicCanvas;
// object, key and array for timestamp JSON file (times.json)
let timesObj;
let timesKey = [];
let times = [];
// object, key and array for scenes JSON file (scenes.json)
let scenesObj;
let scenesKey = [];
let scenes = [];
let scene;
// variables for time information
let now, hour, minute, time;
let nowMinute = 61;
// variables for clock display
let textHour, textMinute, textTime;
let minuteHandWidth, minuteHandHeight;
let angleH, angleM, angleMH;

// load JSON files
function preload() {
  timesObj = loadJSON("assets/data/times.json");
  scenesObj = loadJSON("assets/data/scenes.json");
}

function setup() {
  // create a dynamic canvas object
  dynamicCanvas = new DynamicCanvas(1800, 1800);
  // map JSON files to corresponding arrays
  timesKey = Object.keys(timesObj);
  for (let i = 0; i < timesKey.length; i++) {
    times[i] = timesObj[timesKey[i]];
    scenes[i] = scenesObj[timesKey[i]];
  }

}

function draw() {
  // continually update dynamic canvas
  dynamicCanvas.update();
  // get current time and associated variables
  now = new Date();
  if (now.getMinutes() !== nowMinute) {
    // refresh display of schematic clock face
    background(255);
    drawFace();
    // get current time parameters
    nowMinute = now.getMinutes();
    minute = now.getMinutes();
    hour = now.getHours();
    // DEBUG - manually set time
    // minute = 9;
    // hour = 16;
    // set time as concatenated string for standardized JSON file comparison
    setTime();
    // check if current timestamp corresponds to an entry
    checkTime();
  }
}

function setTime() {
  // prefix hour with a zero if a single digit
  if (hour >= 10) { textHour = `${hour}`; }
  else { textHour = `0${hour}`; }
  // prefix minute with a zero if a single digit
  if (minute >= 10) { textMinute = `${minute}`; }
  else { textMinute = `0${minute}`; }
  // concatenate into JSON file comparison string and display string
  time = `${textHour}${textMinute}`;
  textTime = `${textHour}:${textMinute}`
  // DEBUG - set and/or print time
  // time = `956`;
  // console.log(`the time is: ${time}`);
}

function checkTime() {
  // DEBUG - print time being checked
  // console.log(`checking ${time}`);
  if (times.includes(time)) {
    // set scene to
    scene = scenes[times.indexOf(time)];
    // DEBUG - print current scene to console
    // console.log(scene);

    drawTime();
  }
  // if no match, draw clock hands with copyright text and try next closest minute after 1 second delay
  else {
    scene = undefined;
    drawTime();
    setTimeout(() => { decrementTime(); }, 1000);
  }
}

function decrementTime() {
  if (minute === 0) {
    hour = now.getHours()-1;
    minute = 59;
  }
  else {
    minute--;
  }
  setTime();
  checkTime();
}

function drawTime() {
  // background(255);
  // translate origin of clock hand drawings to the center of the canvas
  translate(width/2, height/2);
  // determine the angles of the clock hands depending on the time
  calcHandAngles();
  // draw the clock hands
  drawHands();
}

function drawFace() {
  push();
  translate(width/2, height/2);
  fill(0);
  ellipse(0, 0, width);
  pop();
}

function calcHandAngles() {
  // map 24 hours to two full revolutions, originating at -PI/2 (noon/midnight on a clock)
  angleH = map(hour,0,12,-PI/2,3*PI/2);
  // map 60 minutes to a full revolution, originating at -PI/2 (top of the hour on a clock)
  angleM = map(minute,0,60,-PI/2,3*PI/2);
  // map 60 minutes to 1/12th of a full revolution, to be added to hour hand angle
  angleMH = map(minute,0,60,0,PI/6);
  // console.log(`H: ${angleH}, ${minute} M: ${angleM}, MH: ${angleMH}`)
}

function drawHands() {
  push();
  drawHourHand();
  drawMinuteHand();
  pop();
}

function drawHourHand() {
  push();
  rotate(angleH+angleMH);
  rectMode(CENTER);
  rect(0, 0, width/10, height/23, 0, 30, 30, 0);
  writeHour();
  pop();
}

function writeHour() {
  push();
  textAlign(CENTER,CENTER);
  textSize(width/30);
  text(textTime, 0, 0);
  pop();
}

function drawMinuteHand() {
  push();
  rotate(angleM);
  translate(width/15, 0);
  minuteHandWidth = width/2.5;
  minuteHandHeight = height/13;
  rect(0, -minuteHandHeight/2, minuteHandWidth, minuteHandHeight, 0, 30, 30, 0);
  writeMinute();
  pop();
}

function writeMinute() {
  if (scene) {
    push();
    textAlign(LEFT);
    let textW = textWidth(scene);
    let textRatio =  minuteHandWidth / textW;
    // console.log(`ratio: ${textRatio}`);
    textSize(30*sqrt(textRatio));
    text(scene, 10, -minuteHandHeight/2.2, minuteHandWidth-10, minuteHandHeight);
    pop();
  }
  else {
    push();
    translate(minuteHandWidth/2, 0);
    textAlign(CENTER,CENTER);
    textSize(width/15.5);
    text("COPYRIGHT", 0, 0);
    pop();
  }
}
