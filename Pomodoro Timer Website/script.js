let timer = document.getElementById("timer");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let alarm = document.getElementById("audio");
let time = 25 * 60;
let totalTime = time;
let pauseBtnCount = 0;

let psc = document.getElementById("pomodoro-session-count");
let pauseResumeBtn = document.getElementById("pause-resume");

let dataBase = {
    pomodoroComplete: 0,
}
function updatapsc() {

    let pscLocalStorage = parseInt(localStorage.getItem("pomodoro-count"));

    let finalSessionCount = pscLocalStorage;
    console.log(finalSessionCount)


    psc.textContent = pscLocalStorage == "" || null ? `${d}` : `Pomodoro Completed: ${finalSessionCount}`;
    psc.textContent = psc.textContent == null ? 0 : psc.textContent;
}

let startBtn = document.getElementById("start");
startBtn.addEventListener("click", () => {
    alarm.play();
    alarm.pause();
    alarm.currentTime = 0;

    startTimer();
});


let timeInterval = "";
function startTimer() {
    timeInterval = setInterval(() => {
        if (time < 1) {
            alarm.play();
            console.log("Database is the thing which is gonna to happen " + dataBase.pomodoroComplete)
            dataBase.pomodoroComplete++;
            // updateLocalStorage(1);
            updateLocalStorage(dataBase.pomodoroComplete);
            updatapsc();
            console.log(`This is database ${dataBase.pomodoroComplete}`);

            clearInterval(timeInterval);
            return;
        }
        time--;
        
        updateTimer(time);
        
    }, 1000);
}
pauseResumeBtn.addEventListener('click', () => {
    pauseTimer(time, totalTime);
})
let resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", () => {
    clearInterval(timeInterval);
    let confirmation = confirm("Do you really want to reset the timer?");
    console.log(confirmation)
    if (confirmation == true) {
        time = totalTime;
        updateTimer(time);
    }

})
function pauseTimer(goneTime, totalTime) {
    let remainingTime = totalTime - goneTime;
    console.log(remainingTime);
    clearInterval(timeInterval);
    pauseBtnCount++;
    startBtn.textContent = "Resume";
    startBtn.addEventListener('click', () => {
        startBtn.textContent = "Start"
    })

    return remainingTime;
}

function updateTimer(time) {
    minutes.textContent = Math.floor(time / 60);
    seconds.textContent = time % 60;
    console.log(time);
    if (minutes.textContent.length <= 1) minutes.textContent.length == 0 ? minutes.textContent = "00" : minutes.textContent = "0" + minutes.textContent;

    if (seconds.textContent.length <= 1) seconds.textContent.length == 0 ? seconds.textContent = "00" : seconds.textContent = "0" + seconds.textContent;
}

function updateLocalStorage(pomodoroCount) {
    let a = localStorage.getItem("pomodoro-count");
    a = (a == "" || null || "null") ? "0" : a;
    localStorage.setItem("pomodoro-count", JSON.stringify(pomodoroCount));
}

window.onload = () => {
    let storedPomodoroCount = localStorage.getItem("pomodoro-count") == "" ? 0 : JSON.parse(localStorage.getItem("pomodoro-count"));
    psc.textContent = ` Pomodoro Completed: ${storedPomodoroCount}`;
    dataBase.pomodoroComplete = JSON.parse(localStorage.getItem("pomodoro-count"));
}
