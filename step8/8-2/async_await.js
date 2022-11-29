// async／await を理解する
// 1. await をつけて fetch 関数を呼び通信が終わるのを待つ。その結果を response に返す
// 2. await をつけて response.json 関数を呼び、変換処理を待つ。結果を data 変数に返す
// 3. DOM 操作を行う
// 4. console.log で出力する '終了'

async function displayMessage() {
  // async の中では 非同期処理の fetch や json() に await をつけると結果を待つ
  const response = await fetch('../hello.json');
  const data = await response.json();
  const messageElm = document.getElementById('message');
  messageElm.innerHTML = data.message;
  // 処理の流れを理解するための記述
  console.log('終了');
}

console.log('開始前'); // --1
displayMessage(); // --2 非同期処理が含まれた関数を実行
console.log('開始後'); // --3