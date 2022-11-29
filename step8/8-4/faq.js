// 指定した秒数を待ってから処理をする
function wait(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${sec}秒経ちました`);
      // もしも失敗する時には以下のように呼ぶと失敗を知らせることができる
      reject(new Error('エラーです'));
    }, sec * 1000);
  });
}

wait(3).then((msg) => {
  // ここは3秒後にコールされる
  console.log(msg); // 3秒経ちました
}).catch((err) => {
  console.log(err.message);
});

// 指定した秒数を待ってから処理をする（async／await で書き換え）
async function wait3sec() {
  const msg = await wait(3);
  console.log(msg);
}

wait3sec();

async function waitMultiple() {
  const promises = [
    wait(3), // 3秒後に実行する処理
    wait(5) // 5秒後に実行する処理
  ];

  // 処理の結果を待つ Promise を戻り値とする
  // Promise.all は Promise オブジェクトの配列を渡しておくと全ての Promise が完了してから続きの処理を行う
  const messages = await Promise.all(promises);
  console.log(messages); // 5秒たった後でこの行が呼ばれる
}

waitMultiple();