import { EvetEmitter } from "../EvetEmitter.js";

export class TodoListModel extends EvetEmitter {
  constructor(items = []) {
    super();
    this.items = items;
  }

  getTotalCount() {
    return this.items.length;
  }

  getTodoItems() {
    return this.items;
  }

  // TodoListの状態が更新された時に呼び出されるリスナー関数を登録する
  onChange(listener) {
    this.addEventListener("change", listener);
  }

  // 状態が変更された時に呼ぶ。登録済みのリスナー関数を呼び出す
  emitChange() {
    this.emit("change");
  }

  // TodoItemを追加する
  addTodo(todoItem) {
    this.items.push(todoItem);
    this.emitChange();
  }
}
