const inputForm = document.getElementById('input-form');
const inputFile = document.getElementById("input-file");
let table = document.getElementById("data-table");

inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // alert(`Thanks for your submission "${prompt("Tell me you name?")}"!`);

    // Fetching the information related to the inputted file
    fetchInputInformation();
})

function fetchInputInformation() {
    const submittedImage = inputFile.files;
    console.log(submittedImage);

    let demoData = `File Name :- "${submittedImage[0].name}"`
    submittedImage.length < 1 ? alert("Please first submit file!") : console.log(demoData);

    addTableData(submittedImage);

    // submittedImage.length > 1 ? fetchMultipleFilesData() : fetchSingleFileData();

    // Here I have to work on the data fetching . When the submit button will be clicked then the data related to that will be shown in and table.

    // function fetchMultipleFilesData(){
    //     console.log(`Fetching multiple file data ...`);
    // }
    // function fetchSingleFileData(){
    //     console.log(`Fetching single file data ...`);
    // }
}

function addTableData(fileListData) {

    console.log(fileListData);

    
    
    
    for (let i = 0; i < fileListData.length; i++) {
        let tableData = document.createElement('tr');

        let sNo = document.createElement('td');
        let name = document.createElement('td');
        let size = document.createElement('td');
        let type = document.createElement('td');
        
        sNo.textContent = (table.children[0].children.length ) + ".";
        function demoFnx(){
            name.textContent = fileListData[i].name;
            size.textContent = fileListData[i].size;
            type.textContent = fileListData[i].name.split(".")[1];
        }
        demoFnx();
        
        tableData.appendChild(sNo);
        tableData.appendChild(name);
        tableData.appendChild(size);
        tableData.appendChild(type);
    
        console.log(tableData);
        console.log(sNo);
        console.log(name);
        console.log(size);
        console.log(type);
        
        table.children[0].appendChild(tableData);
    }
    

}
