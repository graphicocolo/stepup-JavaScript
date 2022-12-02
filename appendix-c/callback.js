// count の回数だけ callback として渡した関数の処理を繰り返す
// repeat の呼び出しに関数を渡すような書き方について「コールバック関数を渡す」という表現を用いる
// repeat がコールバック関数を呼び出すことを単に「コールバックする」と呼ぶこともある
// ポイント1：repeat は「コールバック関数をどのように扱うか」を決めている
// ポイント2：1 や 2 のようにコールバック関数を渡す側が好きな処理を書いて渡せる
// ポイント3：コールバック関数を実際に呼び出すのはrepeat関数で、コールバックの内容を書いた側ではない
function repeat(count, callback) {
  for (let i = 0; i < count; i++) {
    callback(i);
  }
}

repeat(3, function(i) {
  console.log(` 数字は ${i} です `); // --1
});

repeat(4, function(i) {
  console.log(`[${i}]`); // --2
});

// 通信処理(非同期処理)におけるコールバック
// XMLHttpRequest https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest
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
getJson('user.json', function(err, user) {
  if(err) {
    return console.error(err); // 通信が失敗した場合コールバック関数の第一引数の err に値が入っておりここでその情報を取得
  }

  console.log(user); // 通信が成功した場合コールバック関数の第一引数の user に値が入っておりここでその情報を取得
});