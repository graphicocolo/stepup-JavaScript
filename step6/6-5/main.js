// 見本コードを確認しながらリファクタリング

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

// 意識すべきこと
// 地域セレクタの本体を生成する場所（rootElm）を AreaSelector クラスの外から渡せるようにする
// オプションタグを生成する処理は変数名が違うだけで同様なため、共通化する（toOptionsHtml）
// インスタンス変数を定義して状態を持つようにする

class AreaSelector {
  constructor(rootElm) {
    // 地域セレクタの本体を生成する場所をインスタンス変数に代入
    this.rootElm = rootElm;
    // AJAX で取得する都道府県情報
    this.prefectures = [];
    // AJAX で取得する市区町村情報
    this.cities = [];
    // 都道府県セレクタの状態を保持するインスタンス変数
    this.preCode = null;
  }

  async init() {
    // 初期描画のために update〜() メソッドを呼んでいる
    await this.updatePref();
    await this.updateCity();
  }

  // AJAX で取得した都道府県データ（JSON）を解析、オブジェクトとして返す
  async getPrefs() {
    const prefResponse = await fetch("./prefectures.json");
    return await prefResponse.json();
  }
  // AJAX で取得した市区町村データ（JSON）を解析、オブジェクトとして返す
  async getCities(preCode) {
    const cityResponse = await fetch(`./cities/${preCode}.json`);
    return await cityResponse.json();
  }

  // サーバから取得した JSON で option タグを生成
  // セレクトボックスへ反映
  async updatePref() {
    this.prefectures = await this.getPrefs();
    this.preCode = this.prefectures[0].code;
    this.createPrefOptionsHtml();
  }
  async updateCity() {
    this.cities = await this.getCities(this.preCode)
    this.createCityOptionsHtml();
  }

  // 都道府県の option タグに生成されたデータを流し込む
  // ユーザーによって都度変更される option タグはこれなので
  // ここにイベントハンドラを仕掛ける
  // イベントハンドラを仕掛ける option タグが変更されるタイミング
  createPrefOptionsHtml() {
    const prefSelectorElm = this.rootElm.querySelector('.prefectures');
    prefSelectorElm.innerHTML = this.toOptionsHtml(this.prefectures);

    prefSelectorElm.addEventListener('change', (event) => {
      console.log(event);
      this.preCode = event.target.value;
      this.updateCity();
    });
  }
  // 市区町村の option タグに生成されたデータを流し込む
  createCityOptionsHtml() {
    const citySelectorElm = this.rootElm.querySelector('.cities');
    citySelectorElm.innerHTML = this.toOptionsHtml(this.cities);
  }

  // option タグを生成
  // map() で、元の配列の要素それぞれに同じ演算を加えてその結果の新たな配列を返す
  // 同じ演算 = 今回は records に含まれる各要素を option タグの文字列に変換している
  // 最後に join() で連結して文字列の戻り値としている
  toOptionsHtml(records) {
    return records.map((record) => {
      return `
        <option name="${record.name}" value="${record.code}">
          ${record.name}
        </option>
      `;
    }).join('');
  }
}

const areaSelector = new AreaSelector(document.getElementById('areaSelector'));
areaSelector.init();