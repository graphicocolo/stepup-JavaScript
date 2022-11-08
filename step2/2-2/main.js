const stopWatch = (options = {}) => {
  // ログ表示用
  const addMessage = (message) => {
    const messageElm = document.createElement('div');
    const now = new Date();
    // messageElm.innerText = now.getHours() + '時' + now.getMinutes() + '分' + now.getSeconds() + '秒' + message;
    messageElm.innerText = `${now.getHours()}時 ${now.getMinutes()}分 ${now.getSeconds()}秒 ${message}`;
    // messageElm にクラスとして message を追加
    messageElm.classList = ['message'];
    // 関数内部で logElm が利用できているのは
    // 関数自身と並列以上にある変数を束縛できるクロージャという概念のため
    logElm.appendChild(messageElm);
  }

  // stopWatch() 初期化時ディスプレイの色と背景色を渡せるようにする
  // 論理和 (||)
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_OR
  // 左辺の評価が偽ならば右辺で示した値を返す
  // stopWatch() に引数が与えられず options が undefined ならば空っぽの Object が options 変数に代入される
  // options = options || {};
  // あるオブジェクトが持っているプロパティを、変数にスムーズに代入（分割代入）
  let {color, backgroundColor} = options;
  color = color || 'lightblue';
  backgroundColor = backgroundColor || 'black';
  // 経過秒数表示箇所の要素を取得
  const displayElm = document.getElementsByClassName('display')[0];
  // CSS プロパティリファレンス
  // https://developer.mozilla.org/ja/docs/orphaned/Web/CSS/CSS_Properties_Reference
  displayElm.style.color = color;
  displayElm.style.backgroundColor = backgroundColor;

  // ログ表示要素の親要素を取得
  const logElm = document.querySelector('.log');

  // 秒数計測データの状態管理要素を設定
  let timer = null;

  // document.getElementByClassName('startButton') で、HTML のドキュメントから startButton というクラスがついている要素を全て取得可能
  // 取得してきた値は配列と同じように操作できるので、document.getElementByClassName('startButton')[0] で、一番初めに画面に出てきた要素を取り出す
  const startButton = document.getElementsByClassName('startButton')[0];
  startButton.addEventListener(('click'), () => {
    if(timer === null) {
      let seconds = 0;
      timer = setInterval(() => {
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

  const stopButton = document.getElementsByClassName('stopButton')[0];
  stopButton.addEventListener(('click'), () => {
    if(timer !== null) {
      // バグチェックのためのログ
      // console.log('stop:' + timer);
      clearInterval(timer);
      timer = null;
      addMessage('終了');
    }
  });
}

const options = {
  color: 'limegreen',
  backgroundColor: '#333',
}

// stopWatch(); // これも有効
stopWatch(options);