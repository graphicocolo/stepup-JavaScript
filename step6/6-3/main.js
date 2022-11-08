// この時点では、await をつけるのは通信のような待ちが発生する処理で
// それを呼び出している関数には async をつける　という理解
async function displayMessage() {
  // ここでサーバへの通信
  // fetch がサーバへリクエストを送り、レスポンスを受けている
  const response = await fetch('./hello.json');
  // json メソッドの実行結果を代入
  // レスポンスに含まれる JSON を Object に変換
  const data = await response.json();
  const messageElm = document.getElementById('message');
  // data から message を取り出し
  messageElm.innerHTML = data.message;
}
// npx http-server だと正常に表示されない
// VS Code で試すと正常表示される
displayMessage();