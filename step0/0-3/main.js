var element = document.getElementById('innerTest');
// innerHTML のようなプロパティは、オブジェクトが持っているデータのことを示す
element.innerHTML = '<strong>JavaScript</strong> で書きました';

var buttonElm = document.getElementById('testButton');
buttonElm.addEventListener('click', function() {
  // alert('ボタンが押されました');
  var numberElm = document.getElementById('number');
  var val = numberElm.value;
  var num = parseInt(val);
  if (num % 2 == 0) {
    alert('偶数です');
  } else {
    alert('偶数ではありません');
  }
})

// データが入っている配列を用意
var fruits = ['りんご', 'もも', 'みかん'];
// 配列の値を受け取る変数 fruitsStr を用意
var fruitsStr = '';
// 配列 fruits の値を一つずつ取り出して HTML のコードと結合する
// それを fruitsStr に入れていく
// length プロパティは配列の要素数を表す
for(var i = 0; i < fruits.length; i++) {
  fruitsStr += '<li class="fruit">' + fruits[i] + '</li>';
}
// ul タグを取り出す
var arrayElmn = document.getElementById('arrayTest');
// ul タグの innerHTML プロパティに fruitsStr を代入する
arrayElmn.innerHTML = fruitsStr;

// document.getElementsByClassName を使うと指定した class 属性が適用されている要素を全て取得する
// このような仕組みなので fruitElms には、HTMLCollection という配列のような操作ができるオブジェクトに複数の要素への参照が格納されている
var fruitElms = document.getElementsByClassName('fruit');
// 最初の一つの要素を取り出す↓
// var fruitElms = document.getElementsByClassName('fruit')[0];
for(var i = 0; i < fruitElms.length; i++) {
  var fruitElm = fruitElms[i];
  console.log(fruitElm.textContent);
}

var colorsObj = {
  red: 'あか',
  green: 'みどり', // クオーテーションで囲まなくても動作する
  'blue': 'あお', // 丁寧に書く場合やキーにスペースが含まれる場合などはキーを文字列としてクオーテーションで囲む
}

console.log(colorsObj);

console.log(colorsObj['red']);
console.log(colorsObj.red); // 上記の省略記法
console.log(colorsObj.blue);

// 一度作ったオブジェクトの内容を変更したい場合には =演算子を使って代入することで可能
colorsObj['red'] = 'レッド';
console.log(colorsObj.red);
colorsObj['blue'] = 'ブルー';
console.log(colorsObj.blue);
