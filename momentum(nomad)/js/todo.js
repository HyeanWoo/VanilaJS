const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");

const TODOS_KEY = "momentum_todos";

let toDos = JSON.parse(localStorage.getItem(TODOS_KEY)) || [];

if (toDos.length !== 0) {
  toDos.forEach((todo) => paintToDo(todo));
}

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteTodo(e) {
  const li = e.target.parentElement;
  toDos = toDos.filter((todo) => todo.id !== Number(li.id));
  saveToDos();
  li.remove();
}

function paintToDo(newToDo) {
  const li = document.createElement("li");
  li.id = newToDo.id;
  const span = document.createElement("span");
  span.innerText = newToDo.text;
  const button = document.createElement("button");
  button.innerText = "❌";

  button.addEventListener("click", deleteTodo);

  li.append(span, button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(e) {
  e.preventDefault();
  const newToDo = {
    id: Date.now(),
    text: toDoInput.value,
  };
  toDoInput.value = "";
  toDos.push(newToDo);
  paintToDo(newToDo);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);
