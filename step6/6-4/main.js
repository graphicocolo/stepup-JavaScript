// セレクトボックスを格納する要素を取得
const rootElm = document.getElementById('areaSelector');

// AJAX で取得した都道府県データ（JSON）を解析
// オブジェエクトとして返す
async function getPrefs() {
  const prefResponse = await fetch("./prefectures.json");
  return await prefResponse.json();
}

// サーバから取得した JSON で option タグを生成
// セレクトボックスへ反映
async function updatePref() {
  const prefs = await getPrefs();
  createPrefOptionsHtml(prefs);
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
}

updatePref();