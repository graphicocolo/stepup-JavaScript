fetch('user.json').then(function(res) {
  return res.json();
}).then(function(user) {
  console.log(user);
}).catch(function(err) {
  console.error(err);
});

// callbackNest.js の書き直し

// 通信して json で値を取得するための共通関数
// JSON を Object に変換した後の Promise が返る
function fetchJson(url) {
  return fetch(url).then(function(res) {
    return res.json();
  });
}

// fetchJson() を利用し Promise で書き直した非同期処理
let entry;
fetchJson('user.json').then(function(user) {
  console.log(user);
  return fetchJson(`users/${user.id}/entries.json`);
}).then(function(entries) {
  console.log('エントリ一覧を取得しました');
  entry = entries[0];
  return fetchJson(`entries/${entry.id}/comments.json`);
}).then(function(comments) {
  console.log(`エントリとコメントを取得：${entry.name}`);
  for (const comment of comments) {
    console.log(`${comment.id}: ${comment.comment}`);
  }
}).catch(function(err) {
  alert(`通信に失敗しました：${err.message}`);
});