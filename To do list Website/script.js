let form = document.getElementById("form");
let task = document.getElementById("task");
let listContainer = document.getElementById("list-container");
let deleteAllButton = document.getElementById("delete-all-button");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let text = task.value.trim();
    if (text === "") {
        alert("Please enter the task first!");
        return;
    }
    task.value = "";
    listAdder(text);
})

function listAdder(task) {
    let li = document.createElement("li");
    li.id = "list-item";
    li.innerHTML = task;

    const deleteButton = document.createElement("img");
    deleteButton.src = "fill-delete.svg";
    deleteButton.className = "delete-button";
    deleteButton.draggable = false;

    listItemSaver(task);

    listContainer.appendChild(li)
    listContainer.appendChild(document.createElement("hr"))
    li.appendChild(deleteButton);

    let serialNumber = document.querySelectorAll("li").length - 2;
    li.innerHTML = `${serialNumber}. ${li.innerHTML}`;

}

function deleteParticulatItem(){
    const deleteButtonList = Array.from(document.querySelectorAll(".delete-button"));
    console.log(deleteButtonList)
    deleteButtonList.forEach((e)=>{
        e.addEventListener("click",()=>{
            console.log(e.parentElement.nextElementSibling);
            e.parentElement.nextSibling.outerHTML = "";
            e.parentElement.outerHTML = "";
        })
    })
}

let listItemArray = new Array();
function listItemSaver(listItem) {
    listItemArray.push(listItem);
    console.log(listItemArray);

    let savedData = getData();

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

// Now i have to work on that if the item is getting particularly deleted then that should also be deleted from the local storage so that the data will not fetch from the next time.