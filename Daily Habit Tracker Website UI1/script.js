// const inputSection = document.querySelector("#input-section");
const inputSection = document.getElementById("input-section");
const habitContainer = document.getElementById("habit-container");
let inputBox = inputSection.firstElementChild;
let submitButton = inputSection.lastElementChild;

inputBox.addEventListener("submit", function (e) {
    e.preventDefault();
    if(inputBox.value.trim()!==""){
        addHabit(inputBox.value);
    }else{
        alert("Please enter the task first");
    }
})

Array.from(document.querySelectorAll(".habit-text img")).forEach((e) => {
    e.addEventListener("click", function () {
        e.src = "Images/filled-checkbox.svg";
    });
    e.addEventListener("dblclick", () => {
        e.src = "Images/empty-checkbox.svg";
    })
})



console.log(habitContainer)

function addHabit(habitName) {
    let div = document.createElement('div');
    div.className = "habit";
    div.innerHTML = `<div class="habit-text">
                    <img src="Images/empty-checkbox.svg" draggable="false">
                    <span>${habitName}</span>
                </div>
                <div clsss="day-box-container" style="display: flex ; gap: 20px;">
                    <div class="green-box">
                        <span>M</span>
                    </div>
                    <div class="green-box">
                        <span>T</span>
                        </div>
                        <div class="green-box">
                        <span>W</span>
                        </div>
                    <div class="green-box">
                        <span>T</span>
                    </div>
                    <div class="green-box">
                        <span>F</span>
                        </div>
                    <div class="green-box">
                        <span>S</span>
                    </div>
                    <div class="yellow-box">
                        <span>S</span>
                    </div>
                    </div>`;
    habitContainer.appendChild(div);

    updateHabit();
}

function updateHabit() {
    Array.from(document.getElementsByClassName("green-box")).forEach((e) => {
        e.addEventListener("click", () => {
            console.log(e);
            e.style.backgroundColor === "white" ? e.style.backgroundColor = "#0CBB0C" : e.style.backgroundColor = "white";;
        })
    });

    Array.from(document.getElementsByClassName("yellow-box")).forEach((e) => {
        e.addEventListener("click", () => {
            console.log(e);
            e.style.backgroundColor === "white" ? e.style.backgroundColor = "yellow" : e.style.backgroundColor = "white";;
        })
    });
}

window.onload = function () {
    updateHabit();
}
