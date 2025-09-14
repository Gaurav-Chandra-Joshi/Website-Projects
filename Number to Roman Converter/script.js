let numberInputBox = document.getElementById("number-input-box");
let button = document.getElementById("button");
let romanNumberInputBox = document.getElementById("roman-number-input-box");
let numberOneToNine = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
let numberTenToNinety = ["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
let numberHundredToThousand = ["C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CD"];
let roman;

button.addEventListener('click', (ev) => {
    ev.preventDefault();
    convertNumberToRoman();
})

function convertNumberToRoman(number) {

    if (numberInputBox.value.length === 1) {
        convertOneDigitNumber(numberInputBox.value);
    }

    if (numberInputBox.value.length === 2) {
        convertTwoDigitNumber(numberInputBox.value);
    }

    if (numberInputBox.value.length === 3) {
        convertThreeDigitNumber(numberInputBox.value);
    }

}

//Convetting one digits numbers into romans
function convertOneDigitNumber(number) {
    romanNumberInputBox.value = numberOneToNine[number - 1];
}

//Converting two digits numbers into romans
function convertTwoDigitNumber(number) {

    if (number.length == 2) {
        romanNumberInputBox.value = numberTenToNinety[number[0] - 1] + numberOneToNine[number[1] - 1];
        if (number[1] == 0) {
            romanNumberInputBox.value = numberTenToNinety[number[0] - 1];
        }
    }

}
function convertThreeDigitNumber(number) {

    if (number.length == 3) {
        romanNumberInputBox.value = numberHundredToThousand[number[0] - 1] + numberTenToNinety[number[1] - 1] + numberOneToNine[number[2] - 1];
        if (number[1] == 0 && number[2] >= 1) {
            romanNumberInputBox.value = numberHundredToThousand[number[0] - 1] + numberOneToNine[number[2] - 1]
        }
        if (number[1] == 0 && number[2] == 0) {
            romanNumberInputBox.value = numberHundredToThousand[number[0] - 1];
        }
        if (number[1] >= 1 && number[2] == 0) {
            romanNumberInputBox.value = numberHundredToThousand[number[0] - 1] + numberTenToNinety[number[1] - 1];
        }
    }

}