const startbtn = document.querySelector("[startbtn]");
const greenbtn = document.querySelector("[greenbtn]");
const bluebtn = document.querySelector("[bluebtn]");
const redbtn = document.querySelector("[redbtn]");
const yellowbtn = document.querySelector("[yellowbtn]");

const maxLevel = 8;

const pressTime = 500;
const gapTime = 200;
const waitTime = 500;

let timeouts = [];
let pattern = [];
let currLevel = 1;
let listen = [];
let playing = false;
let reciting = false;
let green = false;
let blue = false;
let red = false;
let yellow = false;

let context = new AudioContext();
let gainNode = context.createGain();
let oscillator = context.createOscillator();
gainNode.gain.setValueAtTime(0, context.currentTime);

startbtn.addEventListener("click", () => {
    if(playing == false){
        startGame();
    } else {
        stopGame();
    }
});

function startGame() {
    startbtn.textContent = "Stop";
    playing = true;
    pattern.length = 0;
    fill(pattern);
    console.log(pattern);
    startSequence();
}

function stopGame() {
    oscillator.stop();
    context = new AudioContext();
    for(let i = 0; i < timeouts.length; i++){
        clearTimeout(timeouts[i]);
    }
    if(green){
        greenbtn.classList.toggle("clicked");
        green = false;
    }
    if(blue){
        bluebtn.classList.toggle("clicked");
        blue = false;
    }
    if(red){
        redbtn.classList.toggle("clicked");
        red = false;
    }
    if(yellow){
        yellowbtn.classList.toggle("clicked");
        yellow = false;
    }
    startbtn.textContent = "Start";
    reciting = false;
    playing = false;
    currLevel = 1;
}

function fill(pattern) {
    for (let i = 0; i < maxLevel; i++) { 
        pattern.push(Math.floor(Math.random() * 4)+1);
    }
}

function startSequence() {
    listen.length = 0;
    let delay = waitTime;
    reciting = true;
    for(let i = 0; i < currLevel; i++){
        timeouts.push(setTimeout(pressButton, delay, i));
        timeouts.push(setTimeout(releaseButton, delay+pressTime, i));
        delay += pressTime;
        delay += gapTime;
    }
}

function pressed(k) {
    listen.push(k);
    
    for(let i = 0; i < listen.length; i++){
        if(listen[i] != pattern[i]){
            alert("You Lost, Game Over!");
            stopGame();
            return;
        }
    }
    if(currLevel == listen.length){
        if(currLevel < maxLevel){
            currLevel++;
            startSequence();
            return;
        }
        alert("Congradulations, You win!");
        stopGame();
    } 
}

function pressButton(k) {
    if(playing){
        switch(pattern[k]) {
            case 1:
                greenbtn.classList.toggle("clicked");
                green = true;
                playPress(150);
                break;
            case 2:
                bluebtn.classList.toggle("clicked");
                blue = true;
                playPress(175);
                break;
            case 3:
                redbtn.classList.toggle("clicked");
                red = true;
                playPress(200);
                break;
            default:
                yellowbtn.classList.toggle("clicked");
                yellow = true;
                playPress(225);
                break;
        }
    }
}

function releaseButton(k) {
    gainNode.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
    if(playing){
        switch(pattern[k]) {
            case 1:
                greenbtn.classList.toggle("clicked");
                green = false;
                break;
            case 2:
                bluebtn.classList.toggle("clicked");
                blue = false;
                break;
            case 3:
                redbtn.classList.toggle("clicked");
                red = false;
                break;
            default:
                yellowbtn.classList.toggle("clicked");
                yellow = false;
                break;
        }
    }
    if(k == currLevel-1){
        reciting = false;
    }
}

function playPress(frequency) {
    gainNode = context.createGain();
    oscillator = context.createOscillator();
    gainNode.gain.setTargetAtTime(.4, context.currentTime + 0.05, 0.025);
    oscillator.frequency.value = frequency;
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.start(0);
}

greenbtn.addEventListener("mousedown", () => {
    if(!reciting){
        greenbtn.classList.toggle("clicked");
        playPress(150);
    }
});
greenbtn.addEventListener("mouseup", () => {
    if(!reciting){
        greenbtn.classList.toggle("clicked");
        gainNode.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
        if(playing){
            pressed(1);
        }
        console.log(listen);
    }
});

bluebtn.addEventListener("mousedown", () => {
    if(!reciting){
        bluebtn.classList.toggle("clicked")
        playPress(175);
    }
});
bluebtn.addEventListener("mouseup", () => {
    if(!reciting){
        bluebtn.classList.toggle("clicked");
        gainNode.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
        if(playing){
            pressed(2);
        }
        console.log(listen);
    }
});

redbtn.addEventListener("mousedown", () => {
    if(!reciting){
        redbtn.classList.toggle("clicked");
        playPress(200);
    }
});
redbtn.addEventListener("mouseup", () => {
    if(!reciting){
        redbtn.classList.toggle("clicked");
        gainNode.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
        if(playing){
            pressed(3);
        }
        console.log(listen);
    }
});

yellowbtn.addEventListener("mousedown", () => {
    if(!reciting){
        yellowbtn.classList.toggle("clicked");
        playPress(225);
    }
});
yellowbtn.addEventListener("mouseup", () => {
    if(!reciting){
        yellowbtn.classList.toggle("clicked");
        gainNode.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
        if(playing){
            pressed(4);
        }
        console.log(listen);
    }
});