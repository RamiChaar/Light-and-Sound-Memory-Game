const easybtn = document.querySelector("[easyButton]");
const mediumbtn = document.querySelector("[mediumButton]");
const hardbtn = document.querySelector("[hardButton]");
const crazybtn = document.querySelector("[crazyButton]");
const greenbtn = document.querySelector("[greenbtn]");
const bluebtn = document.querySelector("[bluebtn]");
const redbtn = document.querySelector("[redbtn]");
const yellowbtn = document.querySelector("[yellowbtn]");

let maxLevel = 8;

let pressTime = 500;  //how long the computer presses the buttons
let gapTime = 200;    //the gap between the presses 
let waitTime = 500;   //how long after pressing start does pattern begin

let timeouts = [];      //to clear timeouts when game is stopped

let pattern = [];       //the generated pattern by the computer
let listen = [];        //the input pattern by the user

let currLevel = 1;

let playing = false;    //if the game is playing
let reciting = true;    //if the computer is showing pattern (user cannot press)

let green = false;      //is the green button pressed down
let blue = false;       //is the blue button pressed down
let red = false;        //is the red button pressed down
let yellow = false;     //is the yellow button pressed down

let easy = false;
let medium = false;
let hard = false;
let crazy = false;

//Audio setup
let context = new AudioContext();
let gainNode = context.createGain();
let oscillator = context.createOscillator();
gainNode.gain.setValueAtTime(0, context.currentTime);   //set volume to 0

easybtn.addEventListener("click", () => {
    if(!easy){
        if(playing){
            stopGame();
        }
        easy = true;
        easybtn.classList.toggle("clicked");
        easybtn.textContent = "Stop";
        maxLevel = 8;
        pressTime = 500;
        gapTime = 200;
        waitTime = 500;
        startGame();
    } else {
        stopGame();
    }
});

mediumbtn.addEventListener("click", () => {
    if(!medium){
        if(playing){
            stopGame();
        }
        medium = true;
        mediumbtn.classList.toggle("clicked");
        mediumbtn.textContent = "Stop";
        maxLevel = 12;
        pressTime = 300;
        gapTime = 100;
        waitTime = 300;
        startGame();
    } else {
        stopGame();
    }
});

hardbtn.addEventListener("click", () => {
    if(!hard){
        if(playing){
            stopGame();
        }
        hard = true;
        hardbtn.classList.toggle("clicked");
        hardbtn.textContent = "Stop";
        maxLevel = 15;
        pressTime = 150;
        gapTime = 100;
        waitTime = 150;
        startGame();
    } else{
        stopGame();
    }
});

crazybtn.addEventListener("click", () => {
    if(!crazy){
        if(playing){
            stopGame();
        }
        crazy = true;
        crazybtn.classList.toggle("clicked");
        crazybtn.textContent = "Stop";
        maxLevel = 10;
        pressTime = 50;
        gapTime = 50;
        waitTime = 200;
        startGame();
    } else {
        stopGame();
    }
});

function startGame() {
    playing = true;

    //reset user input array
    pattern.length = 0;
    
    //reset pattern array  
    fill(pattern);
    
    //begin first level
    startSequence();
}

function stopGame() {

    //stop and reset auio
    oscillator.stop();
    context = new AudioContext();

    //clear timeouts
    for(let i = 0; i < timeouts.length; i++){
        clearTimeout(timeouts[i]);           
    }

    //unclick any pressed down buttons
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
    if(easy){
        easy = false;
        easybtn.classList.toggle("clicked");
        easybtn.textContent = "Easy";
    }
    if(medium){
        medium = false;
        mediumbtn.classList.toggle("clicked");
        mediumbtn.textContent = "Medium";
    }
    if(hard){
        hard = false;
        hardbtn.classList.toggle("clicked");
        hardbtn.textContent = "Hard";
    }
    if(crazy){
        crazy = false;
        crazybtn.classList.toggle("clicked");
        crazybtn.textContent = "Crazy";
    }

    playing = false;  
    
    //block user input
    reciting = true;

    //reset level
    currLevel = 1;
}

function fill(pattern) {
    for (let i = 0; i < maxLevel; i++) { 
        pattern.push(Math.floor(Math.random() * 4)+1);
    }
}

function startSequence() {
    //reset user input
    listen.length = 0;

    //block user input
    reciting = true;   

    //display pattern
    let delay = waitTime;
    for(let i = 0; i < currLevel; i++){
        timeouts.push(setTimeout(pressButton, delay, i));
        timeouts.push(setTimeout(releaseButton, delay+pressTime, i));
        delay += pressTime;
        delay += gapTime;
    }
}

//function called when a button is pressed while the game is playing
function pressed(k) {
    //add input to input array
    listen.push(k);
    
    //reset if any button is clicked down
    if(green){
        greenbtn.classList.toggle("clicked");
    }
    if(blue){
        bluebtn.classList.toggle("clicked");
    }
    if(red){
        redbtn.classList.toggle("clicked");
    }
    if(yellow){
        yellowbtn.classList.toggle("clicked");
    }

    //check to make sure input array matches pattern
    for(let i = 0; i < listen.length; i++){
        if(listen[i] != pattern[i]){
            alert("You Lost, Game Over!");
            stopGame();
            return;
        }
    }

    //check to see if user finished the level
    if(currLevel == listen.length){

        //check to see if there are more levels to go
        if(currLevel < maxLevel){
            currLevel++;
            startSequence();
        } else {
            alert("Congradulations, You win!");
            stopGame();
        }
    } 
}

//function to press buttons when displaying the pattern
function pressButton(k) {
    if(playing){
        switch(pattern[k]) {
            case 1:
                greenbtn.classList.toggle("clicked");   //make button dark
                green = true;                           
                playPress(150);                         //play sound
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

//function to release buttons when displaying the pattern
function releaseButton(k) {
    gainNode.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
    if(playing){
        switch(pattern[k]) {
            case 1:
                greenbtn.classList.toggle("clicked");   //revert button color
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

//function to play frequency
function playPress(frequency) {
    gainNode = context.createGain();
    oscillator = context.createOscillator();
    gainNode.gain.setTargetAtTime(.4, context.currentTime + 0.05, 0.025);   //set volume higher
    oscillator.frequency.value = frequency;
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.start(0);
}

//action listners for when the buttons are pressed down by the user
greenbtn.addEventListener("mousedown", () => {
    if(!reciting){
        greenbtn.classList.toggle("clicked");   //make button dark
        green = true;
        playPress(150);                         //play sound
    }
});
bluebtn.addEventListener("mousedown", () => {
    if(!reciting){
        bluebtn.classList.toggle("clicked");
        blue = true;
        playPress(175);
    }
});
redbtn.addEventListener("mousedown", () => {
    if(!reciting){
        redbtn.classList.toggle("clicked");
        red = true;
        playPress(200);
    }
});
yellowbtn.addEventListener("mousedown", () => {
    if(!reciting){
        yellowbtn.classList.toggle("clicked");
        yellow = true;
        playPress(225);
    }
});

/*this action listener checks which button was clicked 
down when the mouse is released anywhere on the screen*/
addEventListener("mouseup", () => {
    if(!reciting){
        if(green){
            greenbtn.classList.toggle("clicked");                                   //revert color
            gainNode.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);    //set volume to 0
            green = false

            //if the game is playing report the user input 
            if(playing){                            
                pressed(1);                                            
            }
        } else if(blue){
            bluebtn.classList.toggle("clicked");
            gainNode.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
            blue = false;
            if(playing){
                pressed(2);
            }
        } else if(red) {
            redbtn.classList.toggle("clicked");
            gainNode.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
            red = false
            if(playing){
                pressed(3);
            }
        } else if(yellow) {
            yellowbtn.classList.toggle("clicked");
            gainNode.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
            yellow = false;
            if(playing){
                pressed(4);
            }
        }
    }
});