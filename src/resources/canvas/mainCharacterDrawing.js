import leftArm from './images/leftArm2.png';
import legs from './images/legs2.png';
import torso from './images/torso2.png';
import rightArm from './images/rightArm2.png';
import head from './images/head2.png';
import hair from './images/hair2.png';

import leftArmCast from './images/leftArm2-cast.png';
import rightArmCast from './images/rightArm2-cast.png';

let imagesObj = {'leftArm': leftArm, 'legs': legs, 'torso': torso, 'rightArm': rightArm,'head':head,'hair':hair, 'leftArmCast': leftArmCast, 'rightArmCast': rightArmCast};

let canvas;
let context;
let images = {};
let castCorrection = 0;
let totalResources = 6;
let numResourcesLoaded = 0;
let fps = 144;
let x = 45;
let y = 185;
let breathInc = 0.05;
let breathDir = 1;
let breathAmt = 0;
let breathMax = 2;
// eslint-disable-next-line
let breathInterval = setInterval(updateBreath, 500 / fps);
let maxEyeHeight = 14;
let curEyeHeight = maxEyeHeight;
let eyeOpenTime = 0;
let timeBtwBlinks = 4000;
let blinkUpdateTime = 200;
// eslint-disable-next-line
let blinkTimer = setInterval(updateBlink, blinkUpdateTime);
// eslint-disable-next-line
let fpsInterval = setInterval(updateFPS, 1000);
let numFramesDrawn = 0;
// eslint-disable-next-line
let curFPS = 0;

document.onkeydown = function(e) {
    e = e || window.event;
    if (e.keyCode === 32) {
        blink();
    }
    return true;
};


function updateFPS() {
    curFPS = numFramesDrawn;
    numFramesDrawn = 0;
}

export function castSpell() {
    castCorrection = 30;
    images["leftArm"].src = imagesObj["leftArmCast"];
    images["rightArm"].src = imagesObj["rightArmCast"];
    setTimeout( () => {
        images["leftArm"].src = imagesObj["leftArm"];
        images["rightArm"].src = imagesObj["rightArm"];
        castCorrection = 0;
    }, 1500)

}

export function prepareCanvas(canvasDiv, canvasWidth, canvasHeight)
{
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.setAttribute('id', 'canvasPlayer');
    canvasDiv.appendChild(canvas);

    context = document.getElementById('canvasPlayer').getContext("2d");

    loadImage("leftArm");
    loadImage("legs");
    loadImage("torso");
    loadImage("rightArm");
    loadImage("head");
    loadImage("hair");
}

function loadImage(name) {
    images[name] = new Image();
    images[name].onload = function(){
        resourceLoaded();
    };
    images[name].src = imagesObj[name];//`images/${name}.png`;
}

function resourceLoaded() {
    numResourcesLoaded ++;
    if(numResourcesLoaded === totalResources) {
        setInterval(redraw, 5000 / fps);
    }
}

function redraw() {

    canvas.width = canvas.width; // clears the canvas

    drawEllipse(x + 40, y + 29, 160 - breathAmt, 6); // Shadow

    context.drawImage(images["leftArm"], x + 50, y - 32 - breathAmt - castCorrection);
    context.drawImage(images["legs"], x+10, y+10);
    context.drawImage(images["torso"], x+10, y - 40);
    context.drawImage(images["head"], x, y - 115 - breathAmt);
    context.drawImage(images["hair"], x - 27, y - 128 - breathAmt);
    context.drawImage(images["rightArm"], x - 5, y - 32 - breathAmt - castCorrection);

    drawEllipse(x + 49, y - 58 - breathAmt, 8, curEyeHeight); // Left Eye
    drawEllipse(x + 60, y - 58 - breathAmt, 8, curEyeHeight); // Right Eye
}

function drawEllipse(centerX, centerY, width, height) {

    context.beginPath();

    context.moveTo(centerX, centerY - height/2);

    context.bezierCurveTo(
        centerX + width/2, centerY - height/2,
        centerX + width/2, centerY + height/2,
        centerX, centerY + height/2);

    context.bezierCurveTo(
        centerX - width/2, centerY + height/2,
        centerX - width/2, centerY - height/2,
        centerX, centerY - height/2);

    context.fillStyle = "black";
    context.fill();
    context.closePath();
}

function updateBreath() {

    if (breathDir === 1) {  // breath in
        breathAmt -= breathInc;
        if (breathAmt < -breathMax) {
            breathDir = -1;
        }
    } else {  // breath out
        breathAmt += breathInc;
        if(breathAmt > breathMax) {
            breathDir = 1;
        }
    }
}

function updateBlink() {

    eyeOpenTime += blinkUpdateTime;

    if(eyeOpenTime >= timeBtwBlinks){
        blink();
    }
}

function blink() {

    curEyeHeight -= 1;
    if (curEyeHeight <= 0) {
        eyeOpenTime = 0;
        curEyeHeight = maxEyeHeight;
    } else {
        setTimeout(blink, 10);
    }
}