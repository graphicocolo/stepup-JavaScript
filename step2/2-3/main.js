// 自然に利用しているクラス
const str = new String('Test');

console.log(str.length);
console.log(str.toUpperCase());

// クラスの基本
class TextDecorator {
  // コンストラクタ new された時に必ず呼ばれる
  // JavaScript では名前は必ず constructor である
  constructor(name) { // コンストラクタには引数をつけることができる
    console.log('コンストラクタが呼ばれた');
    this.name = name; // 引数で渡ってきた name という変数の内容を this オブジェクトの name というプロパティ(this.name)にセットしている
  }

  // メソッド
  decorate() {
    console.log(`decorateが呼ばれた：${this.name}`);
    return `■■■${this.name}■■■`;
  }
}

// クラスのインスタンス化
// 新しいオブジェクトを作成している
const td = new TextDecorator('JS!');
console.log(td.name);
const strTrial = td.decorate();
console.log(strTrial);