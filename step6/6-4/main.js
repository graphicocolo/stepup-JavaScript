// AJAX で取得した都道府県データ（JSON）を解析
// オブジェエクトとして返す
async function getPrefs() {
  const prefResponse = await fetch("./prefectures.json");
  return await prefResponse.json();
}

async function displayPrefs() {
  const result = await getPrefs();
  console.log(result);
}

displayPrefs();