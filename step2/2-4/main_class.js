class StopWatch {
  // コンストラクタ
  constructor(options = {}) {
    // コンストラクタでは options が渡されてくるので
    // それを this.options としてインスタンス変数に保持
    this.options = options;
  }

  // 初期化メソッド
  // これまで stopWatch 関数にあった主だった処理が入っている
  init() {
    // ---ここからストップウォッチの表示関連のインスタンス変数

    // 文字色と背景色の格納用オブジェクトにインスタンス変数 options を代入
    let {color, backgroundColor} = this.options;

    // コンストラクタで渡ってきた値を color backgroundColor にそれぞれ代入
    // もし渡ってきた値が空ならば初期値を代入
    color = color || 'lightblue';
    backgroundColor = backgroundColor || 'black';

    // 表示用要素をインスタンス変数に格納
    // 経過秒数表示箇所の要素を取得
    const display = document.getElementsByClassName('display')[0];
    // 文字色格納用インスタンス変数 color の値を display の color に代入
    display.style.color = color;
    // 背景色格納用インスタンス変数 backgroundColor の値を display の backgroundColor に代入
    display.style.backgroundColor = backgroundColor;

    // ---ここまでストップウォッチの表示関連のインスタンス変数

    // ログ表示要素の親要素を取得
    this.logElm = document.querySelector('.log');

    // 秒数計測データの状態管理要素を設定
    // 開始した繰り返し処理を識別する数値（intervalID）を格納するためのインスタンス変数
    let timer = null;
    // スタートボタン要素を用意
    // スタートボタンを押した場合の挙動
    const startButton = document.getElementsByClassName('startButton')[0];
    startButton.addEventListener('click', () => {
      if (timer === null) {
        let seconds = 0;
        display.innerText = seconds;

        timer = setInterval(() => {
          seconds++;
          display.innerText = seconds;
        }, 1000);

        this.addMessage('開始');
      }
    });

    // ストップボタン要素を用意
    // ストップボタンを押した場合の挙動
    const stopButton = document.getElementsByClassName('stopButton')[0];
    stopButton.addEventListener('click', () => {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;

        this.addMessage('終了');
      }
    });
  }

  // ログ表示用メソッド
  addMessage(message) {
    const messageElm = document.createElement('div');
    const now = new Date();
    messageElm.innerText = `${now.getHours()}時${now.getMinutes()}分${now.getSeconds()}秒 ${message}`;
    // messageElm にクラスとして message を追加
    // https://developer.mozilla.org/ja/docs/Web/API/Element/classList
    // messageElm.classList = ['message'];
    messageElm.classList.add('message');
    this.logElm.appendChild(messageElm);
  }
}

const options = {
  color: 'lightblue',
  backgroundColor: '#333',  
};
const stopWatch = new StopWatch(options);
stopWatch.init();