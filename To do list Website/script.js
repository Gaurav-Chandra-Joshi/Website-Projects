let form = document.getElementById("form");
let task = document.getElementById("task");
let listContainer = document.getElementById("list-container");
let deleteAllButton = document.getElementById("delete-all-button");

let listItemArray = [];

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let text = task.value.trim();
    if (text === "") {
        alert("Please enter the task first!");
        return;
    }
    task.value = "";
    listAdder(text);
});

function listAdder(task) {
    const li = document.createElement("li");
    li.id = "list-item";

    const checkbox = document.createElement("img");
    checkbox.src = "Images/empty-checkbox.svg";
    checkbox.className = "checkbox";
    checkbox.draggable = false;
    checkbox.style.cursor = "pointer";
    li.appendChild(checkbox);

    const taskBox = document.createElement("div");
    taskBox.className = "task-box";
    taskBox.style.width = "400px";
    taskBox.style.paddingLeft = "5px";
    taskBox.textContent = task;

    const deleteButton = document.createElement("img");
    deleteButton.src = "Images/fill-delete.svg";
    deleteButton.className = "delete-button";
    deleteButton.draggable = false;
    deleteButton.style.cursor = "pointer";
    taskBox.appendChild(deleteButton);

    li.appendChild(taskBox);

    listItemSaver(task);

    listContainer.appendChild(li);

    const hr = document.createElement("hr");
    listContainer.appendChild(hr);

    checkbox.addEventListener("click", () => checkbox.src = "Images/filled-checkbox.svg");
    checkbox.addEventListener("dblclick", () => checkbox.src = "Images/empty-checkbox.svg");

    deleteButton.addEventListener("click", () => {
        li.remove();

        if (hr && hr.parentNode) {
            hr.remove();
        }

        let elementToRemove = taskBox.textContent;
        let localStorageData = getData().filter(item => item !== elementToRemove);
        localStorage.setItem("List Item Array", JSON.stringify(localStorageData));
        listItemArray = listItemArray.filter(item => item !== elementToRemove);
    });
}

function listItemSaver(listItem) {
    listItemArray.push(listItem);
    localStorage.setItem("List Item Array", JSON.stringify(listItemArray));
}

function getData() {
    let old = JSON.parse(localStorage.getItem("List Item Array"));
    return Array.isArray(old) ? old : [];
}

function localStorageItemsAdder(lsArray) {
    let localStorageArray = lsArray || [];
    for (const element of localStorageArray) {
        listAdder(element);
    }
}

deleteAllButton.addEventListener("click", function () {
    let answer = confirm(`Do you really want to delete all the tasks permanently?`);
    if (answer === true) {
        localStorage.clear();
        listContainer.innerHTML = "";
        listItemArray = [];
    } else {
        alert("Ha-Ha-Ha");
    }
});

window.onload = () => {
    const data = getData();
    listItemArray = [...data];
    localStorageItemsAdder(data);
};
