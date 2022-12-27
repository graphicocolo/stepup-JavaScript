class WordQuiz {
  constructor(rootElm) {
    // console.log('インスタンスが作成された！');
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
    `;
    const parentElm = document.createElement('div');
    parentElm.innerHTML = html;

    this.rootElm.appendChild(parentElm);
  }  
}

new WordQuiz(document.getElementById('app')).init();