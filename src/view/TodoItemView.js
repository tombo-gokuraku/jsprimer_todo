import { element } from "./html-util.js";

export class TodoItemView {
  /**
   * `todoItem`に対するTodoアイテムのHTML要素を作成して返す
   * @param {todoItemModel} todoItem
   * @param {function({id:string, completed:boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id:string})} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @returns {Element}
   */
  createElement(todoItem, { onUpdateTodo, onDeleteTodo }) {
    // 完了済みならchecked属性をつけ、未完了なら外す
    const todoItemElement = todoItem.completed
      ? element`<li><input class="checkbox" type="checkbox" checked>
        <s>${todoItem.title}</s><button class='delete'>x</button></input></li>`
      : element`<li><input class="checkbox" type="checkbox">${todoItem.title}
      <button class='delete'>x</button></input></li>`;
    // チェックボックスがトグルした時のイベントにリスナー関数を登録
    const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
    inputCheckboxElement.addEventListener("change", () => {
      // 指定したTodoアイテムの状態を反転させる
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed
      });
    });
    // 削除ボタン(x)がクリックされた時のTodoListModelからアイテムを削除する
    const deleteButtonElement = todoItemElement.querySelector(".delete");
    deleteButtonElement.addEventListener("click", () => {
      onDeleteTodo({
        id: todoItem.id
      });
    });
    //作成したTodoアイテムのHTML要素を返す
    return todoItemElement;
  }
}
