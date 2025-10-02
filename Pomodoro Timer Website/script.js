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
    length: (15 * 60)
}

function switchMode(modeName) {
    modeBtns.forEach((e) => {
        e.addEventListener("click", () => {

            for (let i = 0; i < modeBtns.length; i++) {
                modeBtns[i].classList.remove("active");
            }

            e.classList.add("active");
            console.log(e);

            switch (e.textContent) {
                case "Work":
                    minutes.textContent = "25"
                    seconds.textContent = "00"
                    break;
                case "Short Break":
                    minutes.textContent = "5"
                    seconds.textContent = "00"
                    break;
                case "Long Break":
                    minutes.textContent = "15"
                    seconds.textContent = "00"
                    break;
            }
        })
    })
}
switchMode("modeName")
