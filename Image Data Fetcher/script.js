const inputForm = document.getElementById('input-form');
const inputFile = document.getElementById("input-file");

inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // alert(`Thanks for your submission "${prompt("Tell me you name?")}"!`);

    // Fetching the information related to the inputted file
    fetchInputInformation();
})

function fetchInputInformation() {
    const submittedImage = inputFile.files;
    let demoData = `File Name :- "${submittedImage[0].name}"`
    submittedImage.length < 1 ? alert("Please first submit file!") : console.log(demoData);

    // submittedImage.length > 1 ? fetchMultipleFilesData() : fetchSingleFileData();

    let table = document.createElement("table");
    document.body.appendChild(table);

    const row = document.createElement('tr');
    const headerCell = document.createElement('th');
    const dataCell = document.createElement('td');

    table.appendChild(row);
    row.appendChild(headerCell);
    row.appendChild(dataCell);

    headerCell.textContent = "This is header Cell!"

    // Here I have to work on the data fetching . When the submit button will be clicked then the data related to that will be shown in and table.

    // function fetchMultipleFilesData(){
    //     console.log(`Fetching multiple file data ...`);
    // }
    // function fetchSingleFileData(){
    //     console.log(`Fetching single file data ...`);
    // }
}