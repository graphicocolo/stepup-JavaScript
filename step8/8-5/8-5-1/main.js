// 仕様のまとめ
// 都道府県と市区町村を選択可能なセレクトボックスがある
// 都道府県を選択すると、市区町村セレクトボックスも変更される
// 都道府県・市区町村のデータは JSON ファイルから取得する（AJAX 通信）
// Promise を利用してAJAX 通信を行う（Promise.all 不使用のため、都道府県を変更するごとに非同期の処理が走る）

// 全体のロジックの流れ
// ルートになる要素を取得
// 初期化メソッド（updatePref()、updateCity()）
// JSON ファイルからデータを取得（都道府県・市区町村それぞれ別メソッド）
// 取得したデータを HTML 要素へ反映（都道府県・市区町村それぞれ別メソッド）（updatePref()、updateCity()）
// HTML 要素を生成（データの入れ物を作成、そこから HTML 要素へデータを追加）

// ルートになる要素を取得
const rootElm = document.getElementById('areaSelector');

// 初期化メソッド 都道府県・市区町村データ取得
function initAreaSelector() {
  updatePref().then(() => {
    updateCity();
  });
}

// AJAX で取得した都道府県データ（JSON）を解析、オブジェクトとして返す
function getPrefs() {
  return fetch('./prefectures.json').then((prefResponse) => {
    return prefResponse.json();
  });
}

// AJAX で取得した市区町村データ（JSON）を解析、オブジェクトとして返す
function getCities(prefCode) {
  return fetch(`./cities/${prefCode}.json`).then((cityResponse) => {
    return cityResponse.json();
  });
}
// const test = getCities('001');
// console.log(`${test}が表示されない`);
// console.log(typeof test);

// サーバから取得した JSON で option タグを生成
// セレクトボックスへ反映（都道府県のセレクトボックス）
function updatePref() {
  return getPrefs().then((prefs) => {
    return createPrefOptionsHtml(prefs);
  });
}
// サーバから取得した JSON で option タグを生成
// セレクトボックスへ反映（市区町村のセレクトボックス）
function updateCity() {
  // 都道府県情報のセレクトボックスから市区町村を取得するため code 情報を取得
  const prefSelectorElm = rootElm.querySelector('.prefectures');
  return getCities(prefSelectorElm.value).then((cities) => {
    return createCitiesOptionsHtml(cities);
  });
}

// option タグを生成
function createPrefOptionsHtml(prefs) {
  const optionStrs = [];
  for(const pref of prefs) {
    optionStrs.push(`
      <option name="${pref.name}" value="${pref.code}">
        ${pref.name}
      </option>
    `);
  }

  const prefSelectorElm = rootElm.querySelector('.prefectures');
  prefSelectorElm.innerHTML = optionStrs.join('');

  prefSelectorElm.addEventListener('change', (event) => {
    updateCity();
  });
}

function createCitiesOptionsHtml(cities) {
  const optionStrs = [];
  for(city of cities) {
    optionStrs.push(`
      <option name="${city.name}" value="${city.code}">
        ${city.name}
      </option>
    `);
  }

  const citySelectorElm = rootElm.querySelector('.cities');
  citySelectorElm.innerHTML = optionStrs.join('');
}

initAreaSelector();