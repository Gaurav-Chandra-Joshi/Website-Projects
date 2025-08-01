// const inputSection = document.querySelector("#input-section");
const inputSection = document.getElementById("input-section");
let inputBox = inputSection.firstElementChild;
let submitButton = inputSection.lastElementChild;

inputBox.addEventListener("submit",function(e){
    e.preventDefault();
})

Array.from(document.querySelectorAll(".habit-text img")).forEach((e)=>{
    e.addEventListener("click",function(){
        e.src = "Images/filled-checkbox.svg";
    });
    e.addEventListener("dblclick",()=>{
        e.src = "Images/empty-checkbox.svg";
    })
})