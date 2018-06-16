import leftArm from './images/zombie/zombie-leftArm.png';
import legs from './images/zombie/zombie-legs.png';
import torso from './images/zombie/zombie-torso.png';
import rightArm from './images/zombie/zombie-rightArm.png';
import head from './images/zombie/zombie-head.png';
import hair from './images/zombie/zombie-hair.png';

import headBones from './images/zombie/zombie-head-bones.png';
import leftArmBones from './images/zombie/zombie-leftArm-bones.png';
import legsBones from './images/zombie/zombie-legs-bones.png';
import torsoBones from './images/zombie/zombie-torso-bones.png';
import rightArmBones from './images/zombie/zombie-rightArm-bones.png';

let imagesObj = {'leftArm': leftArm, 'legs': legs, 'torso': torso, 'rightArm': rightArm,'head':head,'hair':hair, 'headBones': headBones, 'leftArmBones': leftArmBones, 'legsBones': legsBones, 'torsoBones': torsoBones, 'rightArmBones': rightArmBones };

let canvas;
let context;
let images = {};
let totalResources = 6;
let numResourcesLoaded = 0;
let fps = 144;
let x = 45;
let y = 185;
let translateX = 75, translateY = 220;
let degree = 0;
let breathInc = 0.05;
let breathDir = 1;
let breathAmt = 0;
let breathMax = 2;
let bonesID, deathID;
let death = 1;
let isDying = false;
// eslint-disable-next-line
let breathInterval = setInterval(updateBreath, 500 / fps);
let maxEyeHeight = 14;
let curEyeHeight = maxEyeHeight;
let eyeOpenTime = 0;
let timeBtwBlinks = 4000;
let blinkUpdateTime = 1500;
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

export function enemyDying() {
    console.log('dying');
    // deathID = setInterval( () => {
    //     death+= 0.1;
    //     if (death >= 2){
    //         clearInterval(deathID);
    //     }
    // }, 150);
    isDying = true;
}

export function drawBones() {
    context = document.getElementById('canvasEnemy').getContext("2d");

    //let name = "headBones";
    images["leftArmBones"] = new Image();
    images["legsBones"] = new Image();
    images["torsoBones"] = new Image();
    images["leftArmBones"] = new Image();
    images["rightArmBones"] = new Image();
    images["headBones"] = new Image();
    images["headBones"].onload = function(){
    bonesID = setInterval(() =>{
            context.drawImage(images["leftArmBones"], x-50-translateX, y - 37-translateY - breathAmt);
            context.drawImage(images["legsBones"], x-45-translateX, y+10-translateY);
            context.drawImage(images["torsoBones"], x-20-translateX, y - 40-translateY);
            context.drawImage(images["rightArmBones"], x - 35-translateX, y - 25 - breathAmt-translateY);
            context.drawImage(images["headBones"], x - 45-translateX, y - 115-translateY);
            drawEllipse(x -19-translateX, y - 58 - breathAmt-translateY, 8, curEyeHeight); // Left Eye
            drawEllipse(x -8-translateX, y - 58 - breathAmt-translateY, 8, curEyeHeight); // Right Eye
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

export function prepareCanvas(canvasDiv, canvasWidth, canvasHeight)
{
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.setAttribute('id', 'canvasEnemy');
    canvasDiv.appendChild(canvas);

    context = document.getElementById('canvasEnemy').getContext("2d");

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
    context = document.getElementById('canvasEnemy').getContext("2d");
    context.translate(translateX, translateY);
    context.rotate(deg * Math.PI / 180);
}

function redraw() {

    canvas.width = canvas.width; // clears the canvas

    drawEllipse(x + 30, y + 45, 160 - breathAmt, 6); // Shadow

    if(isDying) {
        if (degree <= 90) {
            rotation(degree += 2);
        } else {
            rotation(90);
        }
        breathAmt = 0;
    }else{
        rotation(0);
    }

    context.drawImage(images["leftArm"], x-50-translateX, y-translateY - 37/(Math.pow(death, 1.5)) - breathAmt);
    context.drawImage(images["legs"], x-45-translateX, y-translateY+10/death);
    context.drawImage(images["torso"], x-20-translateX, y-translateY - 40/death);
    context.drawImage(images["head"], x - 45-translateX, y-translateY - 115/death - breathAmt);
    context.drawImage(images["hair"], x - 57-translateX, y-translateY - 128/death - breathAmt);
    context.drawImage(images["rightArm"], x - 35-translateX, y-translateY - 25/(Math.pow(death, 1.5)) - breathAmt);


    drawEllipse(x -19, y - 58 - breathAmt, 8, curEyeHeight); // Left Eye
    drawEllipse(x -8, y - 58 - breathAmt, 8, curEyeHeight); // Right Eye
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