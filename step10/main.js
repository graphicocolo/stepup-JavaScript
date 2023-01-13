class WordQuiz {
  constructor(rootElm) {
    this.rootElm = rootElm;
    // ゲームのステータス
    this.gameStatus = {};
    // 各ステータスの初期化
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
    this.addResult();
    if (this.isLastStep()) {
      this.displayResultView();
    } else {
      this.gameStatus.step++;
      this.displayQuestionView();
    }
  }

  // 解答結果と正答のデータの情報追加
  addResult() {
    const checkedElm = this.rootElm.querySelector('input[name="choice"]:checked');
    const answer = checkedElm ? checkedElm.value : '';
    const currentQuestion = this.quizData[this.gameStatus.level][`step${this.gameStatus.step}`];

    // 配列 results に、question キーと selectedAnswer キーを保持したオブジェクトが追加されていく
    // 配列内に、オブジェクトが1つずつ追加されていく
    this.gameStatus.results.push({
      question: currentQuestion,
      selectedAnswer: answer
    });

    console.log(`解答結果：${answer}`);
    console.log(this.gameStatus.results);
  }

  // 正答率の計算
  // ユーザーがラジオボタンを選択しなかった場合、誤答として認識される
  calcScore() {
    // 正答数
    let correctNum = 0;
    // 問題数
    const results = this.gameStatus.results;

    for (const result of results) {
      const selected = result.selectedAnswer;
      const correct = result.question.answer;
      if (selected === correct) {
        correctNum++;
      }
    }
    // Math.floor を通すことで小数点以下が切り捨てられる
    return Math.floor((correctNum / results.length) * 100);
  }

  // 問題レベル・設問番号・解答結果の初期化
  resetGame() {
    this.gameStatus.level = null; // 選択されたレベル
    this.gameStatus.step = 1; // 現在表示している設問の番号
    this.gameStatus.results = []; // プレイヤーの解答結果
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
  // 開始画面に戻るをクリックするたび、問題のレベル・解答結果はリセットされる
  displayResultView() {
    const score = this.calcScore();

    const html = `
      <h2>ゲーム終了</h2>
      <p>正答率：${score}%</p>
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