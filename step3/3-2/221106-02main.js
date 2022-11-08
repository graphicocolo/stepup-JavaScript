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
    // 初期描画のために updatePhoto() メソッドを呼んでいる
    this.updatePhoto();
  }

  // 画像描画のための処理
  updatePhoto() {
    const frameElm = this.rootElm.querySelector('.frame');
    const image = this.images[this.currentIndex];
    // テンプレートリテラルを使うことで
    // 改行を入れてわかりやすく整形
    frameElm.innerHTML = `
      <div class="currentImage">
        <img src="${image}" />
      </div>
    `;
  }

  // currentIndex を変更する処理
  // currentIndex を更新後、その内容を updatePhoto() で再描画
  next() {
    this.currentIndex++;
    this.updatePhoto();
  }

  prev() {
    this.currentIndex--;
    this.updatePhoto();
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