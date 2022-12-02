function getJson(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function() { // 通信が終わるとこの関数がコールされる
    if (xhr.status === 200) {
      callback(null, JSON.parse(xhr.responseText));
    } else {
      callback(new Error(xhr.statusText));
    }
  };
  xhr.onerror = function() {
    callback(new Error('通信に失敗しました')); // そもそもサーバへの通信ができない場合この関数がコール
  };
  xhr.send(null); // ここで通信開始
}

// 通信が成功しても失敗しても、第二引数に指定したコールバック関数が呼び出される
// この場合は、非同期処理に順序をつけるため（まずユーザ情報を取得、その取得した情報を元にさらに別の情報を取得する必要があるため）処理がネストされている
getJson('user.json', function(err, user) { // 1. ユーザ情報を通信で取得
  if(err) {
    return alert(`ユーザが取得できません： ${err.message}`); // 通信が失敗した場合コールバック関数の第一引数の err に値が入っておりここでその情報を取得
  }

  getJson(`users/${user.id}/entries.json`, function(err, entries) { // 2. 1. で取得したユーザ情報から id を取ってきてさらに関連するエントリの情報を通信で取得
    if(err) {
      return alert(`エントリ一覧が取得できません： ${err.message}`);
    }

    console.log('エントリ一覧を取得しました');
    console.log(entries);
    const entry = entries[0];
    getJson(`entries/${entry.id}/comments.json`, function(err, comments) { // 3. 2. で取得したエントリ情報から id を取ってきてさらにコメントの情報を通信で取得
      if (err) {
        return alert(`コメント一覧が取得できません： ${err.message}`);
      }
      console.log('エントリとコメントを取得： ${entry.name}');
      for (const comment of comments) {
        console.log(`${comment.id}: ${comment.comment}`);
      }
    });
  });

  console.log('ユーザ情報取得直後に呼び出されます'); // この行は 2. で通信を開始した直後に呼び出される
});

// コールバック関数は呼び出し元の関数が終了してから実行されるため、コールバック内から例外を投げても呼び出し元の関数では捕捉できない
// 例
const fs = require('fs');

function foo() {
  try {
    fs.readFile('/no/such/file', (err, data) => {
      if (err) throw err;
      console.log(data);
    });
    console.log('foo');
  }
  catch(err) {
    console.log('caught', err);
  }
}
foo();
// 'caught'というメッセージが表示されていない。catchの中でerrの中身を表示しているなら表示されているはず。
// 'foo'が表示されている。例外処理を行えているなら表示されないはず。
// コールバック関数はfoo()が終了しないと呼ばれません。
// つまりコールバック関数が呼ばれた頃にはfoo()の処理は終わっているので、foo()内のtry-catchでは何も処理できないのです。