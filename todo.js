const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDos(event) {
    console.log(event.target.parentNode)
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){return toDo.id !== parseInt(li.id)});
    console.log(cleanToDos);
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDos(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "X";
    delBtn.addEventListener("click", deleteToDos);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    };

    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit() {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDos(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadToDos = localStorage.getItem(TODOS_LS);
    if (loadToDos !== null) {
        const parsedToDos = JSON.parse(loadToDos);
        parsedToDos.forEach(function(todo){paintToDos(todo.text)});
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();