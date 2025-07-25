let inputBox = document.getElementById('input-box');
let outputBox = document.getElementById('output-box');
let button = document.getElementById('button');
let outputCopyButton = document.getElementById("output-copy-button");

function getSrc(input) {
    inputBox.value = input;
    let text = inputBox.value.trim();
    if (text.split(" ")[0] === `<iframe`) {
        console.log(`The getSrc() function is working properly!`)
        let output = text.split(`src`)[1].split(" ")[0].split(`"`)[1];
        console.log(output);
        outputBox.value = output;
    } else {
        outputBox.value = "";
        alert(`Please give the appropriate data!`);
    }
}

button.addEventListener('click', (e) => {
    e.preventDefault();
    if (inputBox.value === " " || inputBox.value === "") {
        alert(`Please enter the iframe data first!`)
    } else {
        getSrc(inputBox.value);
    }
})

outputCopyButton.addEventListener('click', (e) => {
    e.preventDefault();
    // navigator.clipboard.writeText(`The phrase "been there, done that" is an idiom used to express that someone has already experienced something that is being discussed or suggested. It can imply a sense of familiarity, boredom, or even dismissal, suggesting that the speaker has no desire to repeat the experience!`);
    if(outputBox.value.trim() == ""){
        alert(`First you will have to click on Get URL button!`);
    }else{
        navigator.clipboard.writeText(outputBox.value);
    }
})
navigator.doNotTrack;
