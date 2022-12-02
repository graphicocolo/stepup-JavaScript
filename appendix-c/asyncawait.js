// 通信して json で値を取得するための共通関数
// JSON を Object に変換した後の Promise が返る
function fetchJson(url) {
  return fetch(url).then(function(res) {
    return res.json();
  });
}

// Promise のコードのシンタックス・シュガー async／await
// 内部では Promise と同様の動作をするコード
async function getComments() {
  try {
    const user = await fetchJson('user.json');
    console.log(user);

    const entries = await fetchJson(`users/${user.id}/entries.json`);
    console.log('エントリー一覧を取得しました');

    const entry = entries[0];
    const comments = await fetchJson(`entries/${entry.id}/comments.json`);
    console.log(`エントリとコメントを取得：${entry.name}`);
    for (const comment of comments) {
      console.log(`${comment.id}: ${comment.comment}`);
    }
  } catch(err) {
    alert(`通信に失敗しました：${err.message}`);
  }
}

getComments();