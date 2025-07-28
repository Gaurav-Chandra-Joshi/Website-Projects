let codeContainer = document.getElementById("code-container");
console.log(codeContainer);

function addCode1(codeText) {
    let code = document.createElement("p");
    code.innerText = `=>  ${codeText}`;
    codeContainer.append(code);
}
// addCode();
let firstWords = ["The", "Given", "Provided", "New"];
let secondWords = ["code", "program", "instruction", "command"];
let codingWords = ["Developing", "Executing", "Implying", "Working", "functioning", "coding", "Decoding"];
let fourthWords = ["properly", "correctly", "right"]
let lastWords = ["here", "Everywhere"]


let random = Math.ceil(Math.random() * 7);
setInterval(() => {
    random = Math.ceil(Math.random() * 7);
    addCode1(`${firstWords[Math.floor(Math.random() * firstWords.length)]} ${secondWords[Math.floor(Math.random() * secondWords.length)]} is ${codingWords[Math.floor(Math.random() * codingWords.length)]} ${fourthWords[Math.floor(Math.random() * fourthWords.length)]} ${lastWords[Math.floor(Math.random() * lastWords.length)]}`);
}, random * 1000);


let commandContainer = document.getElementById("command-container");

let commands = ["Process Completed!","Now, You can go forward!","Process is being processeced!","Work done!","Wait for a while!"]
function addCommand(commandText) {
    let command = document.createElement("p");
    command.innerText = `Command =>  ${commandText} `;
    // command.innerText = `=>  ${commandText}`;
    commandContainer.append(command);
}
setInterval(() => {
    random = Math.ceil(Math.random() * 7);
    addCommand(`${commands[Math.floor(Math.random() * commands.length)]}`);
}, random * 1000);

document.addEventListener('keydown',(e)=>{
    if(e.altKey === true){
        document.body.style.color = "blue";
    }
})