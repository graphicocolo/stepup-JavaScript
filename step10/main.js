class WordQuiz {
  constructor(rootElm) {
    this.rootElm = rootElm;
  }

  async init() {
    await this.fetchQuizData();
    this.displayStartView();
  }

  // データ取得・格納
  async fetchQuizData() {
    try {
      const response = await fetch('quiz.json');
      // 取得してきたクイズデータをクラス内メソッドから参照できるよう quizData プロパティに格納
      this.quizData = await response.json();
    } catch (e) {
      this.rootElm.innerText = '問題の読み込みに失敗しました';
      console.log(e);
    }
  }

  // データ表示要素の生成
  // 開始画面の表示
  displayStartView() {
    const levelStrs = Object.keys(this.quizData);
    const optionStrs = [];
    for (let i = 0; levelStrs.length > i; i++) {
      optionStrs.push(`<option value="${levelStrs[i]}" name="level">レベル${i + 1}</option>`);
    }
    const html = `
      <select class="levelSelector">
        ${optionStrs.join('')}
      </select>
      <button class="startBtn">スタート</button>
    `;
    const parentElm = document.createElement('div');
    parentElm.innerHTML = html;

    const starBtnElm = parentElm.querySelector('.startBtn');
    starBtnElm.addEventListener('click', () => {
      this.displayQuestionView();
    });

    this.replaceView(parentElm);
  }

  // 問題の表示
  displayQuestionView() {
    const html = `
      <p>ゲームを開始しました</p>
      <button class="retireBtn">ゲームを終了する</button>
    `;

    const parentElm = document.createElement('div');
    parentElm.className = 'question';
    parentElm.innerHTML = html;

    const resetBtnElm = parentElm.querySelector('.retireBtn');
    resetBtnElm.addEventListener('click', () => {
      this.displayResultView();
    });

    this.replaceView(parentElm);
  }

  // 終了画面の表示
  displayResultView() {
    const html = `
      <p>ゲーム終了</p>
      <button class="resetBtn">開始画面に戻る</button>
    `;

    const parentElm = document.createElement('div');
    parentElm.className = 'results';
    parentElm.innerHTML = html;

    const resetBtnElm = parentElm.querySelector('.resetBtn');
    resetBtnElm.addEventListener('click', () => {
      this.displayStartView();
    });

    this.replaceView(parentElm);
  }

  // 画面に表示する要素の置き換え
  // 開始画面、問題、終了画面を表示させる共通の処理
  replaceView(elm) {
    this.rootElm.innerHTML = '';
    this.rootElm.appendChild(elm);
  }
}

new WordQuiz(document.getElementById('app')).init();