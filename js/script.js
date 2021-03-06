const list = document.querySelector(".list");
const input = document.querySelector(".input");
const button = document.querySelector(".button");

let todos = getFromStorage();
saveToStorage(todos);

button.addEventListener("click", addItem);
input.addEventListener("keyup", (e) => {
  (e.key === "Enter" || e.keyCode === 13) && addItem();
});

// add todo to list
function addItem() {
  const todoValue = input.value.trim();

  if (todoValue.length >= 2) {
    const todo = { id: Date.now(), name: todoValue, isComplete: false };

    todos.push(todo);

    input.value = "";
    input.focus();

    saveToStorage(todos);
  }
}

// Render todos
function renderTodos(todos) {
  let cssClass = "complete";
  let checked = "checked";

  list.innerHTML = "";
  todos.forEach((todo) => {
    list.innerHTML += `<li class="list-item ${
      todo.isComplete ? cssClass : null
    }">
    <input type="text" value="${todo.name}" class="item" />
    <input type="checkbox" ${
      todo.isComplete ? checked : null
    } class="checkbox" data-id="${todo.id}" />
    </li>`;
  });

  const checkboxes = document.querySelectorAll(
    '.list-item > input[type="checkbox"]'
  );

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", toggleComplete);
  });
}

// Toggle completed todo
function toggleComplete(e) {
  const id = e.target.dataset.id;

  e.target.parentElement.classList.toggle("complete");

  const updatedTodos = updatedList(todos, id);

  saveToStorage(updatedTodos);
}

// Update completed todo
function updatedList(todos, id) {
  const itemIndex = todos.findIndex((todo) => todo.id === parseInt(id));
  todos[itemIndex].isComplete = !todos[itemIndex].isComplete;
  return todos;
}

//Save to LocalStorage
function saveToStorage(ItemsToSave) {
  const savedTodos = localStorage.setItem("Todos", JSON.stringify(ItemsToSave));
  renderTodos(ItemsToSave);
}
//Save to getFromLocal
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
