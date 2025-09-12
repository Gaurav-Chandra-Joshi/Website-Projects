let calc = document.getElementById("calculator-input");
let buttons = Array.from(document.querySelectorAll(".btn"));
let answer = document.getElementById("answer");
calc.addEventListener('input', () => {
    answer.textContent = eval(calc.textContent);
})
console.log(buttons);
buttons.forEach((e) => {
    e.addEventListener("click", () => {
        if (e === buttons[16]) {
            calc.textContent += 0;
            // return;
        }
        if (e === buttons[18]) {
            calc.textContent = calc.textContent.split("").splice(0,calc.textContent.length-1).join("");
            answer.textContent = eval(calc.textContent);
        }
        if (e === buttons[1]) {
            // let answer = eval(calc.textContent);
            if (answer < 0) {
                calc.textContent.slice(0, calc.textContent.length - 1) + "-" + calc.textContent.at(calc.length - 1);
            } else {
                calc.textContent.slice(0, calc.textContent.length - 1) + calc.textContent.at(calc.length - 1);
            }
            // return;
        }
        else {
            calc.textContent = e.textContent == "0" ? calc.textContent = e.textContent : calc.textContent = calc.textContent == "0" ? e.textContent : calc.textContent + e.textContent;
        }
    })
})
let ac = buttons[0];
ac.addEventListener('click', function () {
    calc.textContent = "0";
})

let plusMinus = buttons[1];
plusMinus.addEventListener('click', function () {
});

let equalsTo = buttons[18];
