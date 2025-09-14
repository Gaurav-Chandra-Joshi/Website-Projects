let timer = document.getElementById("timer");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let alarm = document.getElementById("audio");
// let time = parseInt(minutes.textContent) * 60;
let time = 1500;
let totalTime = time;

let pomodoroSessionCount = document.getElementById("pomodoro-session-count");

let dataBase = {
    pomodoroComplete: 0,
}
function updataPomodoroSessionCount(){
    a = pomodoroSessionCount.textContent.split(" ");
    a.pop();
    b = dataBase.pomodoroComplete;
    c = a.concat(b);
    d = c.join(" ");
    pomodoroSessionCount.textContent = d; 
}

let startBtn = document.getElementById("start");
startBtn.addEventListener("click", () => {
    alarm.play();
    alarm.pause();
    alarm.currentTime = 0;
    
    startTimer();
});

function startTimer() {
    let timer = setInterval(() => {
        if (time < 1) {
            alarm.play();
            dataBase.pomodoroComplete++;
            updataPomodoroSessionCount();
            clearInterval(timer);
            return;
        }
        time--;
        minutes.textContent = Math.floor(time / 60);
        seconds.textContent = time % 60;
        console.log(time);

        if (minutes.textContent.length <= 1) minutes.textContent.length == 0 ? minutes.textContent = "00" : minutes.textContent = "0" + minutes.textContent;

        if (seconds.textContent.length <= 1) seconds.textContent.length == 0 ? seconds.textContent = "00" : seconds.textContent = "0" + seconds.textContent;

    }, 1000);
}

let pauseResumeBtn = document.getElementById("pause-resume");
pauseResumeBtn.addEventListener("click", () => {
    alert("this is demo!");
})

let resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", () => {
    clearInterval();
    time = 1500;
})

/* Here I have to work on the functionality  of remaining time. So that I'll use setInterval again using the remaining time (it will help me in pausing time and when the user will restart the timer).
=> When the pause button will active then there should be a resume button as well.
=> Saving the pomodoro counts in localStorage();
*/
