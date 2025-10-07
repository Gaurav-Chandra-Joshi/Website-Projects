// ========> Toggle Dark <========= 
let darkToggleButton = document.getElementById("dark-toggle");
darkToggleButton.addEventListener("click", () => {
    let body = document.getElementsByTagName("body")[0];
    body.classList.toggle("dark");
})


// ========> Mode Switching <=========
let modeBtns = Array.from(document.getElementsByClassName("mode-btn"));
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let circle = document.querySelector(".circle");
let alarm = document.getElementById("audio");

let currentMode;
const duration = {
    work: (25 * 60),
    short: (5 * 60),
    long: (15 * 60)
}

function switchMode() {
    modeBtns.forEach((e) => {
        e.addEventListener("click", () => {
            for (let i = 0; i < modeBtns.length; i++) {
                modeBtns[i].classList.remove("active");
            }
            e.classList.add("active");

            currentMode = e.textContent;
            if (isRunning) {
                resetTimer();
                updateDisplay(currentMode);
            }
            updateDisplay(currentMode)
        })
    })
}

// ========> Start Button <=========
let startBtn = document.getElementById("start");
let isRunning = false;
let isPaused = false;
let isReseted = false;

let remainingTime;
let activeMode;
let timer;

startBtn.addEventListener("click", () => {
    currentMode = document.getElementsByClassName("active")[0].textContent;
    activeMode = currentMode === "Work" ? "work" : currentMode === "Short Break" ? "short" : "long";

    switch (activeMode) {
        case "work":
            startTimer(duration.work);
            break;
        case "short":
            startTimer(duration.short);
            break;
        case "long":
            startTimer(duration.long);
            break;
    }
    isRunning = true;
})

function startTimer(time) {
    if (isRunning) return;

    timer = setInterval(() => {
        let nextMode = document.getElementsByClassName("active")[0].textContent;
        if (isRunning && (currentMode !== nextMode)) {
            resetTimer();
            clearInterval(timer);
            return;
        }

        if (isPaused) {
            clearInterval(timer);
            remainingTime = time;
            console.log("The remaining time is :- ", remainingTime);
            return;
        }
        if (time == 0 || time < 0) {
            alarm.play();
            setTimeout(() => updateDisplay(currentMode), 2000)
            clearInterval(timer);
            isRunning = false;
            alert("Your time has reached at 0!");
            return;
        }

        console.log(time);

        remainingTime = time--;

        minutes.textContent = (Math.floor(time / 60)).toString().padStart(2, "0");
        seconds.textContent = (time % 60).toString().padStart(2, "0");
    }, 1000);
}

// ========> Pause Button <=========
let pauseBtn = document.getElementById("pause-resume");
pauseBtn.addEventListener("click", () => {
    console.log(remainingTime);
    pauseTimer(remainingTime);
})

function pauseTimer(remainingTime) {
    if (isPaused) {
        pauseBtn.textContent = "⏸";
        startTimer(remainingTime);
        isPaused = false;
        isRunning = true;
        console.log('This is the condition of isPaused is true!')
    } else {
        pauseBtn.textContent = "⏯";
        console.log(remainingTime);
        isRunning = false;
        isPaused = true;
    }
}

// ========> Reset Button <=========
let resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", () => resetTimer())
function resetTimer() {
    clearInterval(timer);
    isReseted = true;
    isRunning = false;

    updateDisplay(currentMode);
}

function updateDisplay(currentMode) {
    switch (currentMode) {
        case "Work":
            minutes.textContent = "25";
            seconds.textContent = "00";
            circle.style.borderColor = "#FF5A5F";
            break;
        case "Short Break":
            minutes.textContent = "5";
            seconds.textContent = "00";
            circle.style.borderColor = "#00C896";
            break;
        case "Long Break":
            minutes.textContent = "15";
            seconds.textContent = "00";
            circle.style.borderColor = "#6C63FF";
            break;
    }
}

window.onload = () => {
    switchMode();
}

/*
    1. I have to work on the circular timer ring and I have to make that ring function.

    2. I have to work upon the setting feature.
*/
