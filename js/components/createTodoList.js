import { listKey } from "../utils/settings.js";
import { saveToStorage } from "../utils/storage.js";
import updateList from "../utils/updateList.js";

export default function createTodoList(todoItems) {
    const todoContainer = document.querySelector("ul");

    todoContainer.innerHTML = "";

    todoItems.forEach(function (todoItem) {
        let checked = "";

        if (todoItem.isComplete) {
            checked = "checked";
        }

        todoContainer.innerHTML += `<li class="${checked}"><input type="text" value="${todoItem.name}" data-id="${todoItem.id}" /><input type="checkbox" ${checked} data-id="${todoItem.id}"/></li>`;
    });

    // add keyup event to all input[type=text]
    const textboxes = document.querySelectorAll("li input[type=text]");

    textboxes.forEach(function (textbox) {
        textbox.addEventListener("keyup", updateValue);
    });

    function updateValue(event) {
        const id = event.target.dataset.id;
        const value = event.target.value.trim();

        const updatedList = updateList(todoItems, id, value, null);
        saveToStorage(listKey, updatedList);
    }

    // add click event to all input[type=checkbox]
    const checkboxes = document.querySelectorAll("li input[type=checkbox]");

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("click", toggleComplete);
    });

    function toggleComplete(event) {
        const id = event.target.dataset.id;
        const complete = event.target.checked;

        const updatedList = updateList(todoItems, id, null, complete);
        saveToStorage(listKey, updatedList);
        createTodoList(updatedList);
    }
}
