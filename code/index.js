const startbtn = document.querySelector("[startbtn]");
const greenbtn = document.querySelector("[greenbtn]");
const bluebtn = document.querySelector("[bluebtn]");
const redbtn = document.querySelector("[redbtn]");
const yellowbtn = document.querySelector("[yellowbtn]");
let listen = [];
let pattern = [];
let start = false;
let interval;

startbtn.addEventListener("click", () => {
    if(start == true){
        startbtn.textContent = "Start";
        start = false;
        clearInterval(interval);
        return;
    }
    start = true;
    startbtn.textContent = "Stop";
    pattern.length = 0;
    for (let i = 1; i <= 8; i++) { 
        pattern.push(Math.floor(Math.random() * 4)+1);
        
    }
    console.log(pattern);
        for(let k = 0; k<pattern.length; k++){
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
                    yellowbtn.classList.toggle("clicked");
                    break;
            }
        }
    //}
});

greenbtn.addEventListener("mousedown", () => {
    greenbtn.classList.toggle("clicked");
});
greenbtn.addEventListener("mouseup", () => {
    greenbtn.classList.toggle("clicked");
    listen.push(1);
});

bluebtn.addEventListener("mousedown", () => {
    bluebtn.classList.toggle("clicked")
});
bluebtn.addEventListener("mouseup", () => {
    bluebtn.classList.toggle("clicked");
    listen.push(2);
});

redbtn.addEventListener("mousedown", () => {
    redbtn.classList.toggle("clicked");
});
redbtn.addEventListener("mouseup", () => {
    redbtn.classList.toggle("clicked");
    listen.push(3);
});

yellowbtn.addEventListener("mousedown", () => {
    yellowbtn.classList.toggle("clicked");
});
yellowbtn.addEventListener("mouseup", () => {
    yellowbtn.classList.toggle("clicked");
    listen.push(4);
});