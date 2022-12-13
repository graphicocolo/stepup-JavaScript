// もっと簡単に async, await, Promise
// https://qiita.com/kerupani129/items/cf4048a7d4e3aad75881
// Promise, async, await がやっていること (Promise と async は書き換え可能？)
// https://qiita.com/kerupani129/items/2619316d6ba0ccd7be6a
// https://ja.javascript.info/promise-api

// Promise.all を使用、通信を各データファイル1ファイルにつき一度ずつだけにする仕様

// ルートになる要素を取得
const rootElm = document.getElementById('areaSelector');

// 都道府県の情報を格納する変数
let _prefs;
// 市区町村の情報を格納する変数
let _cities;

// 初期化メソッド 都道府県・市区町村データ取得
async function initAreaSelector() {
  const [prefs, ...cities] = await Promise.all([
    // ここで手動で prefCode を入れるのではなく自動で入れられたら良い
    // 余裕があれば改善
    // 1. getPrefs() を活用して code の値を prefs に代入
    // 2. 直下の cities/〜.json のファイル名を prefs に代入
    getPrefs(), getCities('001'), getCities('002'), getCities('003')
  ]);

  _prefs = prefs;
  _cities = {};
  _cities['001'] = cities[0];
  _cities['002'] = cities[1];
  _cities['003'] = cities[2];

  // ここに await をつけるのが違和感
  // async の内部で実行される関数には全て await をつけなくてはならないのか？
  await updatePref();
  await updateCity();
}

// AJAX で取得した都道府県データ（JSON）を解析、オブジェクトとして返す
async function getPrefs() {
  const prefResponse = await fetch('./prefectures.json');
  return await prefResponse.json();
}

// AJAX で取得した市区町村データ（JSON）を解析、オブジェクトとして返す
async function getCities(cityCode) {
  const cityResponse = await fetch(`./cities/${cityCode}.json`);
  return cityResponse.json();
}

// 取得した JSON で option タグを生成
// セレクトボックスへ反映（都道府県のセレクトボックス）
// ここでは通信が発生しないため async はつけない
function updatePref() {
  createPrefOptionsHtml(_prefs);
}

// 取得した JSON で option タグを生成
// セレクトボックスへ反映（市区町村のセレクトボックス）
function updateCity() {
  // 都道府県情報のセレクトボックスから市区町村を取得するため code 情報を取得
  const prefSelectorElm = rootElm.querySelector('.prefectures');
  const cities = _cities[prefSelectorElm.value];
  createCitiesOptionsHtml(cities);
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