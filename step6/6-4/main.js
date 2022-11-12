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