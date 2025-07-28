let inputBox = document.getElementById('input-box');
let outputBox = document.getElementById('output-box');
let button = document.getElementById('button');
let outputCopyButton = document.getElementById("output-copy-button");
let whatToSelect = document.getElementById('what-to-select');
let metadata = document.getElementById("meta-data");

let properties = {};
function optionFetcher() {
    let text = inputBox.value.trim();
    if (text.split(" ")[0] === `<iframe`) {
        console.log(`The getSrc() function is working properly!`)
        let output = text.split(` `);

        for (let i = 1; i < output.length; i++) {
            let option = document.createElement("option");

            if (output[i].includes(`=`)) {
                // Putting the value in an object
                properties[output[i].split(`=`)[0]] = output[i].split(`=`)[1].split(`"`)[1];

                option.innerText = output[i].split(`=`)[0];
                whatToSelect.appendChild(option);

            }

        }
        console.log(properties)
        console.log(output);
    } else {
        inputBox.value = "";
        outputBox.value = "You have not given appropriate iframe!";
        alert(`Please give the appropriate data!`);
    }
}
function getSrc(input) {
    inputBox.value = input;
}

function getTheOutput(propertyName) {
    outputBox.value = properties[`${propertyName}`];
}

inputBox.addEventListener('input', () => {
    optionFetcher();
})

button.addEventListener('click', (e) => {
    e.preventDefault();
    if (inputBox.value === " " || inputBox.value === "") {
        alert(`Please enter the iframe data first!`);
    } else {
        getSrc(inputBox.value);
    }
    getTheOutput(whatToSelect.value);

    showMetadata();
})

outputCopyButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (outputBox.value.trim() == "") {
        alert(`First you will have to click on Get URL button!`);
    } else {
        navigator.clipboard.writeText(outputBox.value);
    }
})

function showMetadata() {
    let tagName = document.getElementById("tag-name");
    let attributeWithValue = document.getElementById("attribute-with-value");

    let text = inputBox.value.trim();
    let output = text.split(` `);
    let i = 0;

    tagName.innerText = `This the the <${text.split(" ")[0].split("<")[1]}> tag.`;
    console.log(properties.length);

    attributeWithValue.innerText = `This tag has "${text.split(`="`).length - 1}" attributes with value.`
    console.log(tagName);
}
