let form = document.getElementById("form");
let task = document.getElementById("task");
let listContainer = document.getElementById("list-container");
let deleteAllButton = document.getElementById("delete-all-button");

let listItemArray = new Array();

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let text = task.value.trim();
    if (text === "") {
        alert("Please enter the task first!");
        return;
    }
    task.value = "";
    listAdder(text);
    deleteParticulatItem();
});

function listAdder(task) {
    const checkbox = document.createElement("img");
    checkbox.src = "Images/empty-checkbox.svg";
    checkbox.className = "checkbox";
    checkbox.draggable = false;
    checkbox.style.cursor = "pointer";
    console.log(checkbox)

    let li = document.createElement("li");
    li.id = "list-item";
    li.appendChild(checkbox);
    li.innerHTML = li.innerHTML + task;

    const deleteButton = document.createElement("img");
    deleteButton.src = "Images/fill-delete.svg";
    deleteButton.className = "delete-button";
    deleteButton.draggable = false;

    listItemSaver(task);

    listContainer.appendChild(li);
    listContainer.appendChild(document.createElement("hr"))
    li.appendChild(deleteButton);


    let serialNumber = document.querySelectorAll("li").length - 2;
    // li.innerHTML = `${serialNumber}. ${li.innerHTML}`;

    let checkboxArray = Array.from(document.getElementsByClassName("checkbox"));
    checkboxArray.forEach((e) => {
        e.addEventListener("click",()=> e.src = "Images/filled-checkbox.svg");
        e.addEventListener("dblclick",()=> e.src = "Images/empty-checkbox.svg");
    })
}


function deleteParticulatItem() {
    const deleteButtonList = Array.from(document.querySelectorAll(".delete-button"));
    deleteButtonList.forEach((e) => {
        e.addEventListener("click", async () => {
            e.parentElement.nextSibling.outerHTML = "";
            // Here we can get the same output by both lines of code.
            // let elementToRemove = e.parentElement.firstChild.data;
            let elementToRemove = e.parentElement.textContent;
            e.parentElement.outerHTML = "";
            console.log(elementToRemove);


            let localStorageData = await getData();

            localStorageData = localStorageData.filter(item => item !== elementToRemove);
            localStorage.setItem("List Item Array", JSON.stringify(localStorageData));

            listItemArray = listItemArray.filter(item => item !== elementToRemove);

        })
    })
}

function listItemSaver(listItem) {
    listItemArray.push(listItem);

    // let savedData = getData();

    localStorage.setItem("List Item Array", JSON.stringify(listItemArray));
}

function getData() {
    let old = JSON.parse(localStorage.getItem("List Item Array"));

    if (old === null) {
        old = "";
    }
    if (old == "" || typeof old == "string") {
        old = [];
    }

    return old;
}

function localStorageItemsAdder(lsArray) {
    let localStorageArray = lsArray || [];
    if (localStorageArray.length >= listContainer.length) {
        alert("Your list has been uploaded from the local server!");
        return;
    } else {
        for (const element of localStorageArray) {
            listAdder(element);
        }
    }
}

deleteAllButton.addEventListener("click", function () {
    let answer = confirm(`Do you really want to delete all the tasks permantly?`);

    answer === true ? localStorage.clear() : alert("Ha-Ha-Ha");
    listContainer.innerHTML = "";
});


window.onload = () => {
    getData();
    const data = getData();
    localStorageItemsAdder(data);
    deleteParticulatItem();
}

// Now I have to add function of checkbox and I have to work on the ui (There I have to put the textcontent and the delete button in the div which will give better ui experience.) .
