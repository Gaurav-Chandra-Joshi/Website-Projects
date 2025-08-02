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

  let li = document.createElement("li");
  li.id = "list-item";
  li.appendChild(checkbox);

  const deleteButton = document.createElement("img");
  deleteButton.src = "Images/fill-delete.svg";
  deleteButton.className = "delete-button";
  deleteButton.draggable = false;

  const taskBox = document.createElement("div");
  taskBox.className = "task-box";
  taskBox.innerHTML = taskBox.innerHTML + task;
  taskBox.appendChild(deleteButton);
  taskBox.style.width = "400px";
  taskBox.style.paddingLeft = "5px";

  listItemSaver(task);

  listContainer.appendChild(li);
  listContainer.appendChild(document.createElement("hr"));

  li.appendChild(taskBox);


  let serialNumber = document.querySelectorAll("li").length - 2;

  let checkboxArray = Array.from(document.getElementsByClassName("checkbox"));
  checkboxArray.forEach((e) => {
    e.addEventListener("click", () => e.src = "Images/filled-checkbox.svg");
    e.addEventListener("dblclick", () => e.src = "Images/empty-checkbox.svg");
  })
}


function deleteParticulatItem() {
  const deleteButtonList = Array.from(document.querySelectorAll(".delete-button"));
  deleteButtonList.forEach((e) => {
    e.addEventListener("click", () => {
      // e.parentElement.parentElement.nextElementSibling.remove();
      // // e.closest(".task-entry").remove();
      // e.parentElement.parentElement.outerHTML = "";

      // // Here we can get the same output by both lines of code.
      // // let elementToRemove = e.parentElement.firstChild.data;
      // let elementToRemove = e.parentElement.textContent;

      // let localStorageData = getData();

      // localStorageData = localStorageData.filter(item => item !== elementToRemove);
      // localStorage.setItem("List Item Array", JSON.stringify(localStorageData));

      // listItemArray = listItemArray.filter(item => item !== elementToRemove);

      const liElement = e.parentElement.parentElement;

      // Try to delete the <hr> that comes after it
      let next = liElement.nextSibling;
      while (next && next.nodeType !== 1) { // Skip text nodes
        next = next.nextSibling;
      }
      if (next && next.tagName === 'HR') {
        next.remove();
      }

      liElement.remove();

      let elementToRemove = e.parentElement.textContent;

      let localStorageData = getData();
      localStorageData = localStorageData.filter(item => item !== elementToRemove);
      localStorage.setItem("List Item Array", JSON.stringify(localStorageData));

      listItemArray = listItemArray.filter(item => item !== elementToRemove);

    }
    )
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
  let answer = confirm("Do you really want to delete all the tasks permantly ?");

  answer === true ? localStorage.clear() : alert("Ha-Ha-Ha");
  listContainer.innerHTML = "";
});


window.onload = () => {
  getData();
  const data = getData();
  localStorageItemsAdder(data);
  deleteParticulatItem();
}  
