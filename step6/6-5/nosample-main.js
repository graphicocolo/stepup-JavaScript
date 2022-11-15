// 見本コードを見ずにリファクタリング

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
// オプションタグを作成する処理は変数名が違うだけで同様なため、共通化する（toOptionsHtml）
// インスタンス変数を定義して状態を持つようにする

class AreaSelector {
  constructor(rootElm) {
    // 地域セレクタの本体を生成する場所をインスタンス変数に代入
    this.rootElm = rootElm;
    // 都道府県セレクタの状態を保持するインスタンス変数
    this.preCode = '001';
  }

  init() {
    const prefSelectorElm = this.rootElm.querySelector('.prefectures');
    prefSelectorElm.addEventListener('change', (event) => {
      this.updatePref();
      this.updateCity();
    });
  }

  // AJAX で取得した都道府県データデータ（JSON）を解析、オブジェクトとして返す
  async getPrefs() {
    const prefResponse = await fetch("./prefectures.json");
    return await prefResponse.json();
  }
  // AJAX で取得した市区町村データ（JSON）を解析、オブジェクトとして返す
  async getCities() {
    const cityResponse = await fetch(`./cities/${this.preCode}.json`);
    return await cityResponse.json();
  }

  // サーバから取得した JSON で option タグを生成
  // セレクトボックスへ反映
  async updatePref() {
    this.prefectures = await this.getPrefs();
    this.toOptionsHtml(this.prefectures);
  }
  async updateCity() {
    // 都道府県情報のセレクトボックスから市区町村を取得するため code 情報を取得
    const prefSelectorElm = this.rootElm.querySelector('.prefectures');
    this.cities = await this.getCities(prefSelectorElm.value)
    this.toOptionsHtml(this.cities);
  }

  // option タグを生成
  toOptionsHtml(datas) {
    const optionStrs = [];
    for(const data of datas) {
      optionStrs.push(`
        <option name="${data.name}" value="${data.code}">
          ${data.name}
        </option>
      `);
    }
  }
}

new AreaSelector(document.getElementById('areaSelector')).init();