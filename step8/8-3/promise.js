// Promise の基本動作
// https://developer.mozilla.org/ja/docs/Web/API/fetch
// fetch 関数を呼ぶと通信が開始、同時に Promise オブジェクトが生成される
// Promise は 通信中、通信成功、通信失敗、の3つの状態を管理する
// then 関数を介して通信が成功したときの処理、失敗したときの処理を関連づけておくと、状態が変化した際自動で呼び出してくれる

// 1. fetchHello が呼ばれる
// 2. fetch 関数を呼び出したところで通信が開始され同時に Promise が作成される
// 3. then を使って onFullfilled 、onRejected を関連づける。もし一瞬で通信が終わったとしても、この処理のほうが先に実行されることは保証されている
// 4. fetchHello が終わり、fetchHello の続きのコードが実行される
// 5. しばらくするとレスポンスが返って通信が終了する
// 6. レスポンスの内容によって以下のどちらかが起きる
//   1. 成功なら Promise の状態が fullfilled に変化して onFullfilled が呼ばれる
//   2. 失敗なら Promise の状態が reject に変化して onRejected が呼ばれる

// 2. 3. の段階ではまだ通信中である、ということを意識する。通信が終わるまでに then 関数で通信後の処理関数を関連付けている

// 冗長な書き方
function fetchHello() {
  const promise = fetch('../hello.json');
  // 引数 data は通信のレスポンスオブジェクト
  // ここからレスポンスされた JSON などの情報を取得できる
  // console.log('通信の終わりを待たない');
  const onFullfilled = (data) => {
    console.log('通信成功しました');
  };
  
  // 引数 err は失敗の理由を示す Error オブジェクトである
  // console.log('通信の終わりを待たない');
  const onRejected = (err) => {
    console.log('通信失敗しました');
  };

  return promise.then(onFullfilled, onRejected);
}
// console.log('開始前');
fetchHello();
// console.log('開始後');

// ひとまとめにした書き方
function fetchHello2() {
  return fetch('../hello.json').then((data) => {
    console.log('通信成功しました');
  }, (err) => {
    console.log('通信失敗しました');
  });
}

fetchHello2();

// Promise の連結
// displayMessage を Promise にした例
function displayMessagePromise() {
  // fetch は Promise を返す関数 通信が完了したら次の then に渡した処理が呼ばれる
  // response は fetch の結果オブジェクト
  // json() は Promise を返す関数 response の JSON を Object へ変換したら次の then に渡した処理が呼ばれる
  return fetch('../hello.json').then((response) => {
    return response.json();
  // 引数 data は前の then で JSON から変換された結果のオブジェクト
  // この最後の then が返す Promise が displayMessagePromise の戻り値
  }).then((data) => {
    const messageElm = document.getElementById('message');
    messageElm.innerHTML = data.message;
    console.log('終了1');
  });
}

// displayMessagePromise();

// さらに then を続けてこのように書くこともできる
displayMessagePromise().then(() => {
  console.log('displayMessage が終わりました');
});

// Promise のエラー処理
function displayMessagePromiseErr() {
  return fetch('../hello.json').then((response) => {
    return response.json();
  }).then((data) => {
    const messageElm = document.getElementById('message2');
    messageElm.innerHTML = data.message;
    // 例えば以下のように例外が発生しても catch 関数で捕まえられる
    // throw new Error("テストエラー");
    console.log('終了2');
  }).catch((err) => {
    console.log(`displayMessagePromiseErr の処理中にエラーが発生しました：${err.message}`);
  });
}

displayMessagePromiseErr();

// async／await の場合
async function displayMessageAsyncawait() {
  try {
    const response = await fetch('../hello.json');
    const data = await response.json();
    const messageElm = document.getElementById('message3');
    messageElm.innerHTML = data.message;
    console.log('終了3');
  } catch(err) {
    console.log(`displayMessagePromiseErr の処理中にエラーが発生しました：${err.message}`);
  }
}

displayMessageAsyncawait().then(() => {
  console.log('displayMessageAsyncawait が終わりました');
});