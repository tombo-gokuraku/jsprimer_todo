// ユニークなID
let todoIdx = 0;

export class TodoItemModel {
  constructor({ title, completed }) {
    this.id = todoIdx++;
    this.title = title;
    this.completed = completed;
  }
}
