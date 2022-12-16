// もっと簡単に async, await, Promise
// https://qiita.com/kerupani129/items/cf4048a7d4e3aad75881
// Promise, async, await がやっていること (Promise と async は書き換え可能？)
// https://qiita.com/kerupani129/items/2619316d6ba0ccd7be6a

// https://ja.javascript.info/promise-api

// Promise.all を使用、通信を各データファイル1ファイルにつき一度ずつだけにする仕様
// prefectures のデータを元に cities のデータはイテレート
// for ではなく forEach でイテレートして市区町村データを取得

// ルートになる要素を取得
const rootElm = document.getElementById('areaSelector');

// 都道府県の情報を格納する変数（グローバル）
let _prefs;
// 市区町村の情報を格納する変数（グローバル）
let _cities;

// 初期化メソッド 都道府県・市区町村データ取得
async function initAreaSelector() {

  // 都道府県初期データ取得
  const prefs = await getPrefs();
  _prefs = prefs;
  // const _prefsCode = _prefs.map(pref => pref.code);

  const cityArray = [];
  for (let pref of _prefs) {
    cityArray.push(getCities(pref.code));
  }

  // 市区町村初期データ取得
  const [...cities] = await Promise.all(cityArray);
  _cities = {};

  cities.forEach((city, index) => {
    let serial = new String(index + 1);
    serial = `00${serial}`;
    _cities[`${serial}`] = cities[index];
  });

  // ↓動かないコード
  // cities.forEach((city, index) => {
  //   console.log(`${index}: ${city}`);
  //   ↓この行怪しい...
  //   _cities[`${city[index][].prefCode}`] = cities[index];
  // });

  // ↓動かないコード
  // let i = 0;
  // for (let city of cities) {
    // let serial = city.prefCode;
    // cities[] に値の入れようがない？
    // _cities[serial] = cities[i];
  // }

  // ↓正常に動くコード
  // for ではなく for of でスマートに記述したい
  // for (i = 0;i < _prefsCode.length;i++) {
  //   let serial = new String(i + 1);
  //   serial = `00${serial}`;
  //   _cities[`${serial}`] = cities[i];
  // }

  // 都道府県・市区町村初期データ設定
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