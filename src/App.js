console.log("App.js: loaded");
import { element } from "./view/html-util.js";
export class App {
  constructor() {
    console.log("App initialized");
  }
  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");

    //アイテム数
    let todoItemCount = 0;

    formElement.addEventListener("submit", event => {
      // submitイベントの本来の動作を止める
      event.preventDefault();
      // console.log(`入力欄の値: ${inputElement.value}`);
      // 追加するTodoアイテムの要素を作成する
      const todoItemElement = element`<li>${inputElement.value}</li>`;
      // Todoアイテムをcontainerに追加する
      containerElement.appendChild(todoItemElement);
      // Todoアイテム数を+1、テキストを更新
      todoItemCount += 1;
      todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;
      // 入力欄を空にする
      inputElement.value = "";
    });
  }
}
