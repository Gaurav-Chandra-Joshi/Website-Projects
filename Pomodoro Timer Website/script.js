// ========> Circular Ring <========= 
const ring = document.querySelector(".progress-ring__circle");
const radius = ring.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

ring.style.strokeDasharray = `${circumference} ${circumference}`;
ring.style.strokeDashoffset = circumference;

function setCircleProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    ring.style.strokeDashoffset = offset;
}
setCircleProgress(100);

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
    work: (25),
    short: (5),
    long: (15)
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

        remainingTime = time--;

        document.title = `Remaining Time => ${(Math.floor(time / 60)).toString().padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`

        minutes.textContent = (Math.floor(time / 60)).toString().padStart(2, "0");
        seconds.textContent = (time % 60).toString().padStart(2, "0");

        let progress = (time / (durations[activeMode] * 60)) * 100;
        setCircleProgress(progress);
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
    document.title = "Pomodoro Timer";
    setCircleProgress(100);


    if (isPaused) {
        isPaused = false;
        pauseBtn.textContent = "⏸";
    }
    isRunning = false;

    updateDisplay(currentMode);
}

let isSaved = false;
window.onload = () => {
    switchMode();

    let saved = JSON.parse(localStorage.getItem("Durations") || "null");
    if (saved && typeof saved == "object") {
        isSaved = true;
        durations = saved;
    } else {
        updateLocalStorage(durations);
        isSaved = false;
    }
    console.log(`The isSaved is ${isSaved}`)

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
            minutes.textContent = String(Math.floor(workDuration.value)).padStart(2, '0');
            seconds.textContent = "00";
            ring.style.stroke = "#FF5A5F";
            break;
        case "Short Break":
            minutes.textContent = String(Math.floor(shortDuration.value)).padStart(2, '0');
            seconds.textContent = "00";
            ring.style.stroke = "#00C896";
            break;
        case "Long Break":
            minutes.textContent = String(Math.floor(longDuration.value)).padStart(2, '0');
            seconds.textContent = "00";
            ring.style.stroke = "#6C63FF";
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

    updateDurationObject(durations);
    durations = JSON.parse(localStorage.getItem("Durations"));
    settingOff();
}

function updateSettingBoxes() {
    workDuration.value = (durations.work) / 60;
    shortDuration.value = (durations.short) / 60;
    longDuration.value = (durations.long) / 60;
}
function updateSettingBoxes() {
    workDuration.value = durations.work;
    shortDuration.value = durations.short;
    longDuration.value = durations.long;
}

let firstTime = localStorage.getItem("Durations") === (null || "") ? true : false;
function updateLocalStorage(durationObject) {
    if (firstTime) {
        durationObject.work = (durations.work) / 60;
        durationObject.short = (durations.short) / 60;
        durationObject.long = (durations.long) / 60;
    }
    localStorage.setItem("Durations", JSON.stringify(durationObject));
}

let settingInputBoxDurations;
function updateDurationObject(durationObject) {
    durations.work = Number(workDuration.value);
    durations.short = Number(shortDuration.value);
    durations.long = Number(longDuration.value);

    console.log(durationObject);

    updateLocalStorage(durationObject);
}
