const inputForm = document.getElementById('input-form');
const inputFile = document.getElementById("input-file");
let table = document.getElementById("data-table");
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    table.deleteRow(1);

    // Fetching the information related to the inputted file
    fetchInputInformation();
    inputFile.value = "";
    alert("All files data has been loaded!");
})

function fetchInputInformation() {
    const submittedImage = inputFile.files;

    let demoData = `File Name :- "${submittedImage[0].name}"`
    submittedImage.length < 1 ? alert("Please first submit file!") : null;
    // submittedImage.length < 1 ? alert("Please first submit file!") : console.log(demoData);

    addTableData(submittedImage);

}

function addTableData(fileListData) {

    console.log(fileListData);

    for (let i = 0; i < fileListData.length; i++) {
        let tableData = document.createElement('tr');

        let sNo = document.createElement('td');
        let name = document.createElement('td');
        let size = document.createElement('td');
        let type = document.createElement('td');
        let lastModifiedDate = document.createElement('td');
        let lastModifiedDay = document.createElement('td');

        sNo.textContent = (table.children[0].children.length) + ".";
        function demoFnx() {
            name.textContent = fileListData[i].name;
            size.textContent = Math.floor((fileListData[i].size)/1024);
            type.textContent = fileListData[i].type.split("/")[1].toUpperCase();
            lastModifiedDay.textContent = days[fileListData[i].lastModifiedDate.getDay()];
            lastModifiedDate.textContent = fileListData[i].lastModifiedDate.toUTCString().split(",")[1].trim().split(" ").slice(0, 3).join(" ");
        }
        demoFnx();

        tableData.appendChild(sNo);
        tableData.appendChild(name);
        tableData.appendChild(size);
        tableData.appendChild(type);
        tableData.appendChild(lastModifiedDate);
        tableData.appendChild(lastModifiedDay);


        table.children[0].appendChild(tableData);
    }

}
