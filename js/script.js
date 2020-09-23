const list = document.querySelector(".list");
const input = document.querySelector(".input");
const button = document.querySelector(".button");

let todos = getFromStorage();
createTodos(todos);

// add item to list
button.addEventListener("click", addItem);
input.addEventListener("keyup", (e) => {
  (e.key === "Enter" || e.keyCode === 13) && addItem();
});

function addItem() {
  const todoValue = input.value.trim();

  if (todoValue.length >= 2) {
    const todo = { id: Date.now(), name: todoValue, isComplete: false };

    todos.push(todo);

    input.value = "";
    input.focus();

    saveToStorage(todos);
    createTodos(todos);
  }
}

function createTodos(todos) {
  let cssClass = "complete";
  let checked = "checked";

  list.innerHTML = "";
  todos.forEach((todo) => {
    todo.isComplete ? cssClass : (cssClass = "");

    list.innerHTML += `<li class="list-item ${cssClass}">
                        <input type="text" value="${todo.name}" class="item" />
                        <input type="checkbox" ${
                          todo.isComplete ? checked : null
                        } class="checkbox" data-id="${todo.id}" />
                       </li>
        `;
  });

  const checkboxes = document.querySelectorAll(
    '.list-item > input[type="checkbox"]'
  );

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", toggleComplete);
  });
}

function toggleComplete(e) {
  const id = e.target.dataset.id;

  e.target.parentElement.classList.toggle("complete");

  const updatedTodos = updatedList(todos, id);

  todos.forEach((todo) => {
    if (id === todo.id) {
      todo.isComplete = e.target.checked;
    }
  });

  saveToStorage(updatedTodos);
}

function updatedList(todos, id) {
  const itemIndex = todos.findIndex((todo) => todo.id === parseInt(id));
  todos[itemIndex].isComplete = !todos[itemIndex].isComplete;
  return todos;
}

function saveToStorage(ItemsToSave) {
  const savedTodos = localStorage.setItem("Todos", JSON.stringify(ItemsToSave));
  createTodos(ItemsToSave);
}
function getFromStorage() {
  if (
    localStorage.getItem("Todos") === null ||
    localStorage.getItem("Todos") === undefined
  ) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("Todos"));
  }
}
