import leftArm from './images/leftArm2.png';
import legs from './images/legs2.png';
import torso from './images/torso2.png';
import rightArm from './images/rightArm2.png';
import head from './images/head2.png';
import hair from './images/hair2.png';

import headBones from './images/rkU0b/head-bones.png';
import leftArmBones from './images/rkU0b/leftArm-bones.png';
import legsBones from './images/rkU0b/legs-bones.png';
import torsoBones from './images/rkU0b/torso-bones.png';
import rightArmBones from './images/rkU0b/rightArm-bones.png';

import leftArmCast from './images/leftArm2-cast.png';
import rightArmCast from './images/rightArm2-cast.png';

let imagesObj = {
    'leftArm': leftArm, 'legs': legs, 'torso': torso, 'rightArm': rightArm,
    'head':head,'hair':hair, 'leftArmCast': leftArmCast, 'rightArmCast': rightArmCast,
    'headBones': headBones, 'leftArmBones': leftArmBones, 'legsBones': legsBones,
    'torsoBones': torsoBones, 'rightArmBones': rightArmBones
};

let canvas;
let context;
let images = {};
let castCorrection = 0;
let totalResources = 6;
let numResourcesLoaded = 0;
let fps = 144;
let x = 45;
let y = 185;
let translateX = 75, translateY = 240;
let degree = 0;
let breathInc = 0.05;
let breathDir = 1;
let breathAmt = 0;
let breathMax = 2;
let bonesID;
let death = 1;
let isDying = false;
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

export function playerDrawBones() {
    context = document.getElementById('canvasPlayer').getContext("2d");

    //let name = "headBones";
    images["leftArmBones"] = new Image();
    images["legsBones"] = new Image();
    images["torsoBones"] = new Image();
    images["leftArmBones"] = new Image();
    images["rightArmBones"] = new Image();
    images["headBones"] = new Image();
    images["headBones"].onload = function(){
        bonesID = setInterval(() =>{
            context.drawImage(images["leftArmBones"], x + 100-translateX, y - 32-translateY - breathAmt);
            context.drawImage(images["legsBones"], x+60-translateX, y+10-translateY);
            context.drawImage(images["torsoBones"], x+60-translateX, y - 40-translateY);
            context.drawImage(images["rightArmBones"], x+45 -translateX, y - 32 - breathAmt-translateY);
            context.drawImage(images["headBones"], x+50 -translateX, y - 115-translateY);
            drawEllipse(x +99-translateX, y - 58 - breathAmt-translateY, 8, curEyeHeight); // Left Eye
            drawEllipse(x +110-translateX, y - 58 - breathAmt-translateY, 8, curEyeHeight); // Right Eye
        }, 5000 / fps);
    };
    images["leftArmBones"].src = imagesObj["leftArmBones"];
    images["rightArmBones"].src = imagesObj["rightArmBones"];
    images["torsoBones"].src = imagesObj["torsoBones"];
    images["legsBones"].src = imagesObj["legsBones"];
    images["headBones"].src = imagesObj["headBones"];
    setTimeout(() => {
        clearInterval(bonesID);
    }, 1500)
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

export function prepareCanvasPlayer(canvasDiv, canvasWidth, canvasHeight)
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

function rotation(deg){
    context = document.getElementById('canvasPlayer').getContext("2d");
    context.translate(translateX, translateY);
    context.rotate(deg * Math.PI / 180);
}

export function playerDying() {
    isDying === false ?  isDying = true : isDying = false;
    degree = 0;
}

function redraw() {

    canvas.width = canvas.width; // clears the canvas

    drawEllipse(x + 40, y + 29, 160 - breathAmt, 6); // Shadow

    if(isDying) {
        if (degree >= -90) {
            rotation(degree -= 2);
        }
        breathAmt = 0;
    }else{
        rotation(0);
    }

    context.drawImage(images["leftArm"], x + 100-translateX, y-translateY - 32/(Math.pow(death, 1.5)) - breathAmt - castCorrection);
    context.drawImage(images["legs"], x+60-translateX, y-translateY+10/death);
    context.drawImage(images["torso"], x+70-translateX, y-translateY - 40/death);
    context.drawImage(images["head"], x+50-translateX, y-translateY - 115/death - breathAmt);
    context.drawImage(images["hair"], x + 23-translateX, y-translateY - 128/death - breathAmt);
    context.drawImage(images["rightArm"], x + 45-translateX, y-translateY - 32 - breathAmt/(Math.pow(death, 1.5)) - castCorrection);

    drawEllipse(x-translateX + 99, y-translateY - 58 - breathAmt, 8, curEyeHeight); // Left Eye
    drawEllipse(x-translateX + 110, y-translateY - 58 - breathAmt, 8, curEyeHeight); // Right Eye
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