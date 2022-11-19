// 即時関数

// 挙動確認のため、あえて var を使う
var testValue = 'test'; // 1
(function() { // 2
  // この中の処理も順番に実行される
  var testValue = 'test next'; // 3
})(); // 4
// 1 で宣言された testValue と 3 で宣言された testValue は別の変数として扱われる
console.log(testValue); // test 5

// これは上記の即時関数とほぼ同じ動作
// let や const はブロックスコープなのでこれだけで OK
{
  let testValue = 'test1';
  // ...
}