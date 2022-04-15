const startbtn = document.querySelector("[startbtn]");
const greenbtn = document.querySelector("[greenbtn]");
const bluebtn = document.querySelector("[bluebtn]");
const redbtn = document.querySelector("[redbtn]");
const yellowbtn = document.querySelector("[yellowbtn]");
let timeouts = [];
let pattern = [];
let level = 1;
let listen = [];
let playing = false;
let green = false;
let blue = false;
let red = false;
let yellow = false;

const pressTime = 1000;
const gapTime = 500;

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
    for(let i = 0; i < timeouts.length; i++){
        clearTimeout(timeouts[i]);
    }
    gainNode.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
    startbtn.textContent = "Start";
    playing = false;
}

function fill(pattern) {
    for (let i = 0; i < 8; i++) { 
        pattern.push(Math.floor(Math.random() * 4)+1);
    }
}

function startSequence() {
    let delay = 500;
    level = 8;
    for(let i = 0; i < level; i++){
        timeouts.push(setTimeout(pressButton, delay, i));
        timeouts.push(setTimeout(releaseButton, delay+pressTime, i));
        delay += pressTime;
        delay += gapTime;
    }
}

function pressButton(k) {
    if(playing){
        switch(pattern[k]) {
            case 1:
                greenbtn.classList.toggle("clicked");
                playPress(150);
                break;
            case 2:
                bluebtn.classList.toggle("clicked");
                playPress(175);
                break;
            case 3:
                redbtn.classList.toggle("clicked");
                playPress(200);
                break;
            default:
                yellowbtn.classList.toggle("clicked");
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
                break;
            case 2:
                bluebtn.classList.toggle("clicked");
                break;
            case 3:
                redbtn.classList.toggle("clicked");
                break;
            default:
                yellowbtn.classList.toggle("clicked");;
                break;
        }
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
  };

greenbtn.addEventListener("mousedown", () => {
    greenbtn.classList.toggle("clicked");
    playPress(150);
});
greenbtn.addEventListener("mouseup", () => {
    greenbtn.classList.toggle("clicked");
    gainNode.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
    listen.push(1);
});

bluebtn.addEventListener("mousedown", () => {
    bluebtn.classList.toggle("clicked")
    playPress(175);
});
bluebtn.addEventListener("mouseup", () => {
    bluebtn.classList.toggle("clicked");
    gainNode.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
    listen.push(2);
});

redbtn.addEventListener("mousedown", () => {
    redbtn.classList.toggle("clicked");
    playPress(200);
});
redbtn.addEventListener("mouseup", () => {
    redbtn.classList.toggle("clicked");
    gainNode.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
    listen.push(3);
});

yellowbtn.addEventListener("mousedown", () => {
    yellowbtn.classList.toggle("clicked");
    playPress(225);
});
yellowbtn.addEventListener("mouseup", () => {
    yellowbtn.classList.toggle("clicked");
    gainNode.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
    listen.push(4);
});

// pattern.length = 0;
// for (let i = 1; i <= 8; i++) { 
//     pattern.push(Math.floor(Math.random() * 4)+1);
    
// }
// console.log(pattern);
// for(let k = 0; k<pattern.length; k++){
//     switch(pattern[k]) {
//         case 1:
//             greenbtn.classList.toggle("clicked");
//             break;
//         case 2:
//             bluebtn.classList.toggle("clicked");
//             break;
//         case 3:
//             redbtn.classList.toggle("clicked");
//             break;
//         default:
//             yellowbtn.classList.toggle("clicked");
//             break;
//     }
// }