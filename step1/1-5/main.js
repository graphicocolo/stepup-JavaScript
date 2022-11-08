function stopWatch(options) {
  // ログ表示用
  function addMessage(message) {
    var messageElm = document.createElement('div');
    var now = new Date();
    messageElm.innerText = now.getHours() + '時' + now.getMinutes() + '分' + now.getSeconds() + '秒' + message;
    // messageElm にクラスとして message を追加
    // messageElm.classList = ['message'];
    messageElm.classList.add('message');
    // 関数内部で logElm が利用できているのは
    // 関数自身と並列以上にある変数を束縛できるクロージャという概念のため
    logElm.appendChild(messageElm);
  }

  // stopWatch() 初期化時ディスプレイの色と背景色を渡せるようにする
  // 論理和 (||)
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_OR
  // 左辺の評価が偽ならば右辺で示した値を返す
  // stopWatch() に引数が与えられず options が undefined ならば空っぽの Object が options 変数に代入される
  options = options || {};
  var color = options.color || 'lightblue';
  var backgroundColor = options.backgroundColor || 'black';
  var displayElm = document.getElementsByClassName('display')[0];
  // CSS プロパティリファレンス
  // https://developer.mozilla.org/ja/docs/orphaned/Web/CSS/CSS_Properties_Reference
  displayElm.style.color = color;
  displayElm.style.backgroundColor = backgroundColor;

  // ログ表示要素の親要素を取得
  var logElm = document.querySelector('.log');

  // 経過秒数表示箇所の要素を取得
  var displayElm = document.getElementsByClassName('display')[0];

  // 秒数計測データの状態管理要素を設定
  var timer = null;

  // document.getElementByClassName('startButton') で、HTML のドキュメントから startButton というクラスがついている要素を全て取得可能
  // 取得してきた値は配列と同じように操作できるので、document.getElementByClassName('startButton')[0] で、一番初めに画面に出てきた要素を取り出す
  var startButton = document.getElementsByClassName('startButton')[0];
  startButton.addEventListener(('click'), function() {
    if(timer === null) {
      var seconds = 0;
      timer = setInterval(function() {
        seconds++;
        // バグチェックのためのログ
        // console.log(seconds);
        displayElm.innerHTML = seconds;
      }, 1000);
      // バグチェックのためのログ
      // console.log('start:' + timer);
      addMessage('開始');
    }
  });

  var stopButton = document.getElementsByClassName('stopButton')[0];
  stopButton.addEventListener(('click'), function() {
    if(timer !== null) {
      // バグチェックのためのログ
      // console.log('stop:' + timer);
      clearInterval(timer);
      timer = null;
      addMessage('終了');
    }
  });
}

var options = {
  color: 'limegreen',
  backgroundColor: '#333',
}

// stopWatch(); // これも有効
stopWatch(options);