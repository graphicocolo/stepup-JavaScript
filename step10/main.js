class WordQuiz {
  constructor(rootElm) {
    this.rootElm = rootElm;
    // ゲームのステータス
    this.gameStatus = {};
    this.resetGame();
  }

  // 初期化処理
  async init() {
    await this.fetchQuizData();
    this.displayStartView();
  }

  // 問題データ取得・格納
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

  // 現在表示している設問が最後の設問か否かを判定
  isLastStep() {
    const currentQuestions = this.quizData[this.gameStatus.level];
    return this.gameStatus.step === Object.keys(currentQuestions).length;
  }

  // 同レベル内の問題番号（step1）に対応した設問を表示
  nextStep() {
    if (this.isLastStep()) {
      this.displayResultView();
    } else {
      this.gameStatus.step++;
      this.displayQuestionView();
    }
  }

  resetGame() {
    this.gameStatus.level = null; // 選択されたレベル
    this.gameStatus.step = 1; // 現在表示している設問の番号
  }

  // 開始画面の表示、データ表示要素の生成
  displayStartView() {
    const levelStrs = Object.keys(this.quizData);
    // ゲームのステータスの初期化
    this.gameStatus.level = levelStrs[0];
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

    // 難易度の値の変更を gameStatus オブジェクトにセットするための処理
    const selectorElm = parentElm.querySelector('.levelSelector');
    selectorElm.addEventListener('change', (event) => {
      this.gameStatus.level = event.target.value;
    });

    const starBtnElm = parentElm.querySelector('.startBtn');
    starBtnElm.addEventListener('click', () => {
      this.displayQuestionView();
    });

    this.replaceView(parentElm);
  }

  // 問題の表示
  displayQuestionView() {
    console.log(`選択中のレベル：${this.gameStatus.level}`);
    const stepKey = `step${this.gameStatus.step}`;
    const currentQuestion = this.quizData[this.gameStatus.level][stepKey];

    const choiceStrs = [];
    for (const choice of currentQuestion.choices) {
      choiceStrs.push(`
        <label>
          <input type="radio" name="choice" value="${choice}">${choice}
        </label>
      `);
    }

    const html = `
      <p>${currentQuestion.word}</p>
      <div>${choiceStrs.join('')}</div>
      <div class="actions">
        <button class="nextBtn">解答する</button>
      </div>
    `;

    const parentElm = document.createElement('div');
    parentElm.className = 'question';
    parentElm.innerHTML = html;

    const nextBtnElm = parentElm.querySelector('.nextBtn');
    nextBtnElm.addEventListener('click', () => {
      this.nextStep();
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
      this.resetGame();
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