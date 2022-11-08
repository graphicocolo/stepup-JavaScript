class PhotoViewer {
  // ビューアーを埋め込む要素を示す rootElm
  // 表示する画像の配列である images
  constructor(rootElm, images) {
    this.rootElm = rootElm;
    this.images = images;
    // 何番目の画像が表示されるかのインデクス
    // 初期値 0 を代入しておく
    this.currentIndex = 0;
  }

  init() {
    // イベントハンドラを仕掛ける 次へボタンの処理
    const nexButtonElm = this.rootElm.querySelector('.nextButton');
    nexButtonElm.addEventListener('click', () => {
      this.next();
    });
    // イベントハンドラを仕掛ける 前へボタンの処理
    const prevButtonElm = this.rootElm.querySelector('.prevButton');
    prevButtonElm.addEventListener('click', () => {
      this.prev();
    });
    this.renderImageUrls();
    // 初期描画のために updatePhoto() メソッドを呼んでいる
    this.updatePhoto();
  }

  // 画像描画のための処理
  updatePhoto() {
    const frameElm = this.rootElm.querySelector('.frame');
    // const image = this.images[this.currentIndex];
    const imageIndex = this.currentIndex + 1;
    // テンプレートリテラルを使うことで
    // 改行を入れてわかりやすく整形
    frameElm.innerHTML = `
      <div class="currentImage">
        <p>${imageIndex}枚目</p>
        <img src="${this.images[this.currentIndex]}" />
      </div>
    `;
    this.startTimer();
  }

  // 画像自動切り替えタイマー処理
  // もしも既にタイマーが作動していたら停止する
  // setTimeout 関数を使って5秒ごとに「次へ」ボタンを押したのと同じ操作を行う
  startTimer() {
    if (this.timerKey) {
      clearTimeout(this.timerKey);
    }

    this.timerKey = setTimeout(() => {
      this.next();
    }, 5000);
  }

  // currentIndex を変更する処理（次へ）
  // currentIndex を更新後、その内容を updatePhoto() で再描画
  next() {
    const lastIndex = this.images.length - 1;
    if (lastIndex === this.currentIndex) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
    this.updatePhoto();
  }

  // currentIndex を変更する処理（前へ）
  prev() {
    const lastIndex = this.images.length - 1;
    if (this.currentIndex === 0) {
      this.currentIndex = lastIndex;
    } else {
      this.currentIndex--;
    }
    this.updatePhoto();
  }

  // コンストラクタで与えられた画像の URL 一覧を画面に表示する
  renderImageUrls() {
    const imagesElm = this.rootElm.querySelector('.images');
    let imageUrlsHtml = '';
    for (const image of this.images) {
      imageUrlsHtml += `<li><a href="${image}" target="_blank">${image}</a></li>`;
    }
    imagesElm.innerHTML = imageUrlsHtml;
  }
 }

const images = [
  'https://fakeimg.pl/250x150/81DAF5',
  'https://fakeimg.pl/250x150/F781F3',
  'https://fakeimg.pl/250x150/81F7D8'
];
// 即 init メソッドを呼ぶ
// このように短縮して書くこともできる
// ビューアーの親要素は自由に設定できるが
// 画像を表示させる要素 frame は必須
new PhotoViewer(document.getElementById('photoViewer'), images).init();