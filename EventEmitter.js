export class EvetEmitter {
  constructor() {
    // 登録するイベント名・Set(リスナー関数)を管理するMap
    // ex) ['submit', [callHoge(), callPiyo()]]
    this._listerns = new Map();
  }

  // 指定したイベントが実行された時に呼び出されるリスナー関数を登録する
  addEventListener(type, listener) {
    // 指定したイベントに対応するSetを作成しリスナー関数を登録する
    if (!this._listerns.has(type)) {
      this._listerns.set(type, new Set());
    }

    const listenerSet = this._listerns.get(type);
    listenerSet.add(listener);
  }

  // 指定したイベントを発火させる
  emit(type) {
    // 指定したイベントに対応するSetを呼び出し、全てのリスナー関数を呼び出す
    const listenerSet = this._listerns.get(type); // typeに一致しているリスナー関数のSetをlistenerSetに代入
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach(listener => {
      listener.call(this); // listener関数自身を呼び出す?
    });
  }

  removeEventListener(type, listener) {
    const listenerSet = this._listerns.get(type);
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach(ownListener => {
      if (ownListener === listener) {
        listenerSet.delete(listener);
      }
    });
  }
}
