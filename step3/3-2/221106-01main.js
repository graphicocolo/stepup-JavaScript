class PhotoViewer {
  // ビューアーを埋め込む要素を示す rootElm
  // 表示する画像の配列である images
  constructor(rootElm, images) { // --- [1]
    this.rootElm = rootElm;
    this.images = images;
    // 何番目の画像が表示されるかのインデクス
    // 初期値 0 を代入しておく
    this.currentIndex = 0; // --- [2]
  }

  init() {
    const frameElm = this.rootElm.querySelector('.frame'); // --- [3]
    const image = this.images[this.currentIndex]; // --- [4]

    // テンプレートリテラルを使うことで
    // 改行を入れてわかりやすく整形
    frameElm.innerHTML = `
      <div class="currentImage">
        <img src="${image}" />
      </div>
    `;
  }
}

const images = [
  'https://fakeimg.pl/250x150/81DAF5',
  'https://fakeimg.pl/250x150/F781F3',
  'https://fakeimg.pl/250x150/81F7D8',
];

// 即 init メソッドを呼ぶ
// このように短縮して書くこともできる
new PhotoViewer(document.getElementById('photoVierwer'), images).init();