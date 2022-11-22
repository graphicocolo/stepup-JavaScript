// 例外

// displayName 関数には名前の引数が必要であるが入っていない場合には例外を送出
function displayName(name) {
  if(!name) {
    throw new Error('name is required');
  }
  console.log(`名前は${name}です`);
}

try {
  displayName();
} catch(e) {
  console.error(`名前表示に失敗しました：${e.message}`);
}

// サンプル

// アプリケーションとしての動き
// 入力が正の整数でない場合には「入力値は正の整数を入れてください。リロードします」というメッセージと共にリロードして再度入力を促す
// 予期しないエラーが発生したら「予期しないエラーが発生しました。終了します」というメッセージと共に console.error にエラーの内容を出力

// share 関数の仕様
// 入力が数値でなければ「入力値が不正です」のメッセージと共に InputError 例外を出す
// 計算できない数値の場合には「正の整数で入力してください」のメッセージと共に InputError 例外を出す

// 「2」を入力：正常に計算処理できる。例外は発生しない
// 「あ」を入力：share 関数内で InputError が発生する。最上位の catch に入り「入力値は正の整数を入れてください。リロードします」と表示され、リロードする
// 「0」を入力：本来 share 関数の入力チェックで処理するはずの内容だが、プログラマが誤ってしまったため divide 関数の中で Error が投げられる。Error は share では catch されないため、最上位の catch に入り予期しないエラーとして処理される

class InputError extends Error {}

function share(input) {
  const value = parseInt(input);
  if(!Number.isInteger(value)) {
    throw new InputError('入力値が不正です');
  }
  if(value < 0) {
    throw new InputError('正の整数で入力してください');
  }
  return divide(100, value);
}

function divide(lhv, rhv) {
  if(rhv === 0) {
    throw new Error('0では演算できません');
  }
  return lhv / rhv;
}

try {
  const input = prompt('100円を分ける人数を入力してください');
  const result = share(input);
  alert(`1人分は${result}円です`);
} catch(e) {
  if(e instanceof InputError) {
    alert('入力値は正の整数を入れてください。リロードします');
    location.reload();
  } else if(e instanceof Error) {
    console.error(e);
    alert('予期しないエラーが発生しました。終了します');
  }
}