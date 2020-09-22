import createTodoList from "./components/createTodoList.js";
import { saveToStorage, getFromStorage } from "./utils/storage.js";
import { listKey } from "./utils/settings.js";

const todos = getFromStorage(listKey);
// create list on page load
createTodoList(todos);

const todoInput = document.querySelector("input");
const button = document.querySelector("button");

button.addEventListener("click", addTodo);

function addTodo() {
    const itemValue = todoInput.value.trim();

    if (itemValue.length >= 1) {
        const newTodo = { id: Date.now(), name: itemValue, isComplete: false };
        todoInput.value = "";
        todoInput.focus();
        todos.push(newTodo);

        // recreate list when new todo is added
        createTodoList(todos);
        saveToStorage(listKey, todos);
    }
}
