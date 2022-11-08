class PhotoViewer {
  init() {
    const rootElm = document.getElementById('photoViewer');
    const frameElm = rootElm.querySelector('.frame');
    const image = 'https://fakeimg.pl/250x150/81DAF5';

    // テンプレートリテラルを使うことで
    // 改行を入れてわかりやすく整形
    frameElm.innerHTML = `
      <div class="currentImage">
        <img src="${image}" />
      </div>
    `;
  }
}

// 即 init メソッドを呼ぶ
// このように短縮して書くこともできる
new PhotoViewer().init();