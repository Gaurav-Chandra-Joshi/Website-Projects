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
let durations = {
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
            startTimer(durations.work * 60);
            break;
        case "short":
            startTimer(durations.short * 60);
            break;
        case "long":
            startTimer(durations.long * 60);
            break;
    }
    isRunning = true;
})

function startTimer(time) {
    if (!timer === null) return;
    if (isRunning) return;

    timer = setInterval(() => {
        let nextMode = document.getElementsByClassName("active")[0].textContent;
        if (isRunning && (currentMode !== nextMode)) {
            resetTimer();
            clearInterval(timer);
            timer = null;
            return;
        }

        if (isPaused) {
            clearInterval(timer);
            timer = null;
            remainingTime = time;
            console.log("The remaining time is :- ", remainingTime);
            return;
        }
        if (time == 0 || time < 0) {
            alarm.play();
            setTimeout(() => updateDisplay(currentMode), 2000)
            clearInterval(timer);
            timer = null;
            isRunning = false;
            alert("Your time has reached at 0!");
            return;
        }

        // console.log(time);

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
    if (!isRunning && !isPaused) return;
    if (isPaused) {
        pauseBtn.textContent = "⏸";
        if (timer === null) startTimer(remainingTime);
        isPaused = false;
        isRunning = true;
    } else {
        pauseBtn.textContent = "⏯";
        console.log(remainingTime);
        isPaused = true;
        isRunning = false;
    }
}

// ========> Reset Button <=========
let resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", () => resetTimer())
function resetTimer() {
    clearInterval(timer);
    timer = null;
    isReseted = true;

    if (isPaused) {
        isPaused = false;
        pauseBtn.textContent = "⏸";
    }
    isRunning = false;

    updateDisplay(currentMode);
}

window.onload = () => {
    switchMode();

    let saved = JSON.parse(localStorage.getItem("Durations") || "null");
    if (saved && typeof saved == "object") {
        durations = saved;
    } else {
        updateLocalStorage(durations);
    }

    console.log(durations);
    updateSettingBoxes();
    updateDisplay("Work");
}

// Setting Button functionality
let settingBtn = document.querySelector(".modal");
let workDuration = document.querySelector("#work-duration");
let shortDuration = document.querySelector("#short-duration");
let longDuration = document.querySelector("#long-duration");

function updateDisplay(currentMode) {
    switch (currentMode) {
        case "Work":
            minutes.textContent = workDuration.value;
            seconds.textContent = "00";
            circle.style.borderColor = "#FF5A5F";
            break;
        case "Short Break":
            minutes.textContent = shortDuration.value;
            seconds.textContent = "00";
            circle.style.borderColor = "#00C896";
            break;
        case "Long Break":
            minutes.textContent = longDuration.value;
            seconds.textContent = "00";
            circle.style.borderColor = "#6C63FF";
            break;
    }
}

function settingOn() {
    settingBtn.style.display = "flex";
}

function settingOff() {
    settingBtn.style.display = "none";
    updateSettingBoxes();
}

function saveSetting() {
    alert("Setting Saved!")
    updateDisplay(currentMode);
    updateLocalStorage(durations);
    updateDurationObject();
    durations = JSON.parse(localStorage.getItem("Durations"));
    settingOff();
}

function updateSettingBoxes() {
    workDuration.value = durations.work;
    shortDuration.value = durations.short;
    longDuration.value = durations.long;
}

function updateLocalStorage(durationObject) {
    localStorage.setItem("Durations", JSON.stringify(durationObject));
}

let settingInputBoxDurations;
function updateDurationObject() {
    durations.work = Number(workDuration.value);
    durations.short = Number(shortDuration.value);
    durations.long = Number(longDuration.value);

    console.log(durations);
    updateLocalStorage(durations);
}

/*
    1. I have to work on the circular timer ring and I have to make that ring function.
*/
