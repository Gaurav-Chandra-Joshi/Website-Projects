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

const duration = {
    work: (25 * 60),
    short: (5 * 60),
    long: (15 * 60)
}

function switchMode(modeName) {
    modeBtns.forEach((e) => {
        e.addEventListener("click", () => {

            for (let i = 0; i < modeBtns.length; i++) {
                modeBtns[i].classList.remove("active");
            }

            e.classList.add("active");
            // console.log(e);

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
}
switchMode("modeName");

// ========> Start Button <=========
let startBtn = document.getElementById("start");
let isRunning = false;
let isPaused = false;
let remainingTime;
startBtn.addEventListener("click", () => {
    // startTimer(duration.work);
    if (isRunning) return;
    // isRunning = true;
    remainingTime = startTimer(10);
})

function startTimer(time) {
    isRunning = true;
    if (!isRunning) return;

    console.log("ha ha ha!");

    let timer = setInterval(() => {
        if (time == 0 || time < 0) {
            clearInterval(timer);
            isRunning = false;
            alert("Your time has reached at 0!");
            return time;
        }
        if (isPaused) {
            clearInterval(timer);
            return time;
        }
        minutes.textContent = (Math.floor(time / 60)).toString().padStart(2, "0");
        seconds.textContent = (time % 60).toString().padStart(2, "0");
        time--;
    }, 1000);



}

// ========> Pause Button <=========
let pauseBtn = document.getElementById("pause-resume");
pauseBtn.addEventListener("click", () => {
    console.log(remainingTime);
    pauseTimer(remainingTime);
    // isRunning = false;
})
function pauseTimer(remainingTime) {
    clearInterval(timer);
    pauseBtn.textContent = "⏯";
    isPaused = true;
    console.log(isPaused);
}

// ========> Reset Button <=========
let resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", () => {
    isRunning = false;
    let currentMode = document.getElementsByClassName("active")[0].textContent;

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

    console.log(currentMode);

})

/*
    There are many bugs in pausing, starting and reseting this all. Now, I have to first work on the reset btn function.
    Then I have to work on the pause button feature.
    Later on I'll jump to the problem which comes when user click multiple timer on start button.
*/  
