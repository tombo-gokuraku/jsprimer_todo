console.log("App.js: loaded");
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";
import { element, render } from "./view/html-util.js";
export class App {
  constructor() {
    console.log("App initialized");
    this.todoListModel = new TodoListModel();
  }
  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");

    this.todoListModel.onChange(() => {
      const todoListElement = element`<ul />`;
      const todoItems = this.todoListModel.getTodoItems();
      todoItems.forEach(item => {
        // 完了済みならchecked属性をつけ、未完了なら外す
        const todoItemElement = item.completed
          ? element`<li><input class="checkbox" type="checkbox" checked>
            <s>${item.title}</s><button class='delete'>x</button></input></li>`
          : element`<li><input class="checkbox" type="checkbox">${item.title}
          <button class='delete'>x</button></input></li>`;
        // チェックボックスがトグルした時のイベントにリスナー関数を登録
        const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
        inputCheckboxElement.addEventListener("change", () => {
          // 指定したTodoアイテムの状態を反転させる
          this.todoListModel.updateTodo({
            id: item.id,
            completed: !item.completed
          });
        });
        todoListElement.appendChild(todoItemElement);
      });
      render(todoListElement, containerElement);
      todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
    });

    formElement.addEventListener("submit", event => {
      event.preventDefault();

      this.todoListModel.addTodo(
        new TodoItemModel({
          title: inputElement.value,
          completed: false
        })
      );
      // 入力欄を空にする
      inputElement.value = "";
    });
  }
}
