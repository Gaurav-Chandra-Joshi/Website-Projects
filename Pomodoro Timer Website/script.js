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

let currentMode;
const duration = {
    work: (25 * 60),
    short: (5 * 60),
    long: (15 * 60)
}

function switchMode() {
    console.log("=========> Switch Mode Function <============");
    alert("Switch started!")

    modeBtns.forEach((e) => {
        e.addEventListener("click", () => {
            for (let i = 0; i < modeBtns.length; i++) {
                modeBtns[i].classList.remove("active");
            }

            e.classList.add("active");

            console.log(e);

            let circle = document.querySelector(".circle");
            switch (e.textContent) {
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
        })
    })

    alert("Switch ended!")

}

// ========> Start Button <=========
let startBtn = document.getElementById("start");
let isRunning = false;
let isPaused = false;
let isReseted = false;
let remainingTime;

startBtn.addEventListener("click", () => {
    currentMode = document.getElementsByClassName("active")[0].textContent;
    let ac = currentMode === "Work" ? "work" : currentMode === "Short Break" ? "short" : "long";

    switch (ac) {
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

    let timer = setInterval(() => {
        let nextMode = document.getElementsByClassName("active")[0].textContent;
        if (isRunning && (currentMode !== nextMode)) {
            resetTimer();
            clearInterval(timer);
            alert("The both mode are not equal to each other!");
            return;
        }

        if (isReseted) {
            clearInterval(timer);
            isReseted = true;
        }
        if (isPaused) {
            clearInterval(timer);
            remainingTime = time;
            console.log("The remaining time is :- ", remainingTime);
            return;
        }
        if (time == 0 || time < 0) {
            clearInterval(timer);
            isRunning = false;
            alert("Your time has reached at 0!");
            return;
        }

        console.log(time);

        remainingTime = time--;
        if (isReseted) time = 1500;
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
        isPaused = false;
        console.log('This is the condition of isPaused is true!')
        startTimer(remainingTime);
    } else {
        pauseBtn.textContent = "⏯";
        console.log(remainingTime);
        isRunning = false;
        isPaused = true;
    }
    console.log("The isPaused is :- ", isPaused);
    console.log("The isrunning is :- ", isRunning);
}

// ========> Reset Button <=========
let resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", () => resetTimer())
function resetTimer() {
    alert("Reset started!")
    console.log("=========> Reset Function <============");
    let currentMode = document.getElementsByClassName("active")[0].textContent;
    isRunning = false;

    switch (currentMode) {
        case "Work":
            minutes.textContent = "25";
            seconds.textContent = "00";
            break;
        case "Short Break":
            minutes.textContent = "5";
            seconds.textContent = "00";
            break;
        case "Long Break":
            minutes.textContent = "15";
            seconds.textContent = "00";
            break;
    }

    alert("Switch ended!")

    console.log(currentMode);
    return isReseted = true;
}


switchMode();

/*
    1. Now, I have to work upon when the user changes the mode while the timer is on. Then the timer should be reseted.
    2. It is resolved when we change the mode while the timer is on. But we are unable to start the timer after changing the mode.
    3. Then I have to work on the pause button feature.
    4. Later on I'll jump to the problem which comes when user click multiple timer on start button.
*/
