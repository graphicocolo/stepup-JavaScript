// 仕様のまとめ
// 都道府県と市区町村を選択可能なセレクトボックスがある
// 都道府県を選択すると、市区町村セレクトボックスも変更される
// 都道府県・市区町村のデータは JSON ファイルから取得する（AJAX 通信）

// 全体のロジックの流れ
// ルートになる要素を取得
// 初期化メソッド（updatePref()、updateCity()）
// JSON ファイルからデータを取得（都道府県・市区町村それぞれ別メソッド）
// 取得したデータを HTML 要素へ反映（都道府県・市区町村それぞれ別メソッド）（updatePref()、updateCity()）
// HTML 要素を生成（データの入れ物を作成、そこから HTML 要素へデータを追加）

// セレクトボックスを格納する要素を取得
const rootElm = document.getElementById('areaSelector');

// 初期化用メソッド
async function initAreaSelector() {
  await updatePref();
  await updateCity();
}

// AJAX で取得した都道府県データ（JSON）を解析、オブジェエクトとして返す
async function getPrefs() {
  const prefResponse = await fetch("./prefectures.json");
  return await prefResponse.json();
}

// AJAX で取得した市区町村データ（JSON）を解析、オブジェエクトとして返す
async function getCities(prefCode) {
  const cityResponse = await fetch(`./cities/${prefCode}.json`);
  return await cityResponse.json();
}

// サーバから取得した JSON で option タグを生成
// セレクトボックスへ反映
async function updatePref() {
  const prefs = await getPrefs();
  createPrefOptionsHtml(prefs);
}

async function updateCity() {
  // 都道府県情報のセレクトボックスから市区町村を取得するため code 情報を取得
  const prefSelectorElm = rootElm.querySelector('.prefectures');
  const cities = await getCities(prefSelectorElm.value)
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
  citySelectorElm.innerHTML = optionStrs.join();
}

initAreaSelector();