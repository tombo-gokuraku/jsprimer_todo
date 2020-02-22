import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
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

  // 指定したIDのTodoItemのcompletedを更新する
  updateTodo({ id, completed }) {
    const todoItem = this.items.find(todo => todo.id === id);
    if (!todoItem) {
      return;
    }
    todoItem.completed = completed;
    this.emitChange();
  }

  //指定したIDのTodoItemを削除する
  deleteTodo({ id }) {
    //idに一致しないTodoItemだけを残すことで、idに一致するTodoItemを削除する
    this.items = this.items.filter(todo => {
      return todo.id !== id;
    });
    this.emitChange();
  }
}
