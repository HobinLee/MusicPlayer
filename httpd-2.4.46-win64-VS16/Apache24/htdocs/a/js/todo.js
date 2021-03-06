const todoForm = document.querySelector(".js-toDo"),
  toDoInput = todoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function showTodo(toDoObj) {
  const li = document.createElement("li");
  const deleteBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDoObj.id;

  deleteBtn.innerText = "✖";
  deleteBtn.onclick = deleteTodo;

  span.innerText = toDoObj.text;
  
  li.appendChild(deleteBtn);
  li.appendChild(span);
  li.id = newId;

  toDoList.appendChild(li);
}

function deleteTodo(e) {
    const btn = e.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    const cleanTodo = toDos.filter(toDo=>{return toDo.id !== parseInt(li.id)});
    console.log(cleanTodo);
    toDos = cleanTodo;
    saveTodo();
}

function handleSubmit(e) {
  e.preventDefault();
  const toDo = toDoInput.value;
  const toDoObj = {
      text: toDo,
      id: toDos.length + 1
  }

  toDos.push(toDoObj);
  saveTodo();
  toDoInput.value = "";
  showTodo(toDoObj);
}

function saveTodo() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function loadToDos() {
  const currentUser = localStorage.getItem(USER_LS);
  const prevToDos = localStorage.getItem(TODOS_LS);


  if (currentUser === null) {
    todoForm.classList.add("hide");
  } else {
    todoForm.classList.remove("hide");
  }

  if (prevToDos !== null) {
      toDos = JSON.parse(prevToDos);
      toDos.forEach(toDo => showTodo(toDo));
  }
}

function init() {
    toDos = [];
    loadToDos();
    todoForm.addEventListener("submit", handleSubmit);
}

init();