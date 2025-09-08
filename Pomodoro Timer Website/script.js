let timer = document.getElementById("timer");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let alarm = document.getElementById("audio");
let time = parseInt(minutes.textContent) * 60;

let startBtn = document.getElementById("start");
startBtn.addEventListener("click", () => {
    alarm.play();
    alarm.pause();
    alarm.currentTime = 0;

    startTimer();
});

function startTimer() {
    setInterval(() => {
        if (time < 1) {
            alarm.play();
            clearInterval();
            return;
        }
        time--;
        minutes.textContent = Math.floor(time / 60);
        seconds.textContent = time % 60;
        console.log(time);

        if (minutes.textContent.length <= 1) minutes.textContent.length == 0 ? minutes.textContent = "00" : minutes.textContent = "0" + minutes.textContent;

        if (seconds.textContent.length <= 1) seconds.textContent.length == 0 ? seconds.textContent = "00" : seconds.textContent = "0" + seconds.textContent;

    }, 1000)
}

let pauseResumeBtn = document.getElementById("pause-resume");
pauseResumeBtn.addEventListener("click", () => {
    alert("this is demo!");
})
