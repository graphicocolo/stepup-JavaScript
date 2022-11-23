// プリミティブ型／オブジェクト型と参照

// Number 数値
const typeNum = typeof 3;
console.log(`typeof 3: ${typeNum}`); // typeof 3: number

// String 文字列
const typeStr = typeof "テスト";
console.log(`typeof テスト: ${typeStr}`); // typeof テスト: string

// Boolean 真偽
const typeBool = typeof true;
console.log(`typeof true: ${typeBool}`); // typeof true: boolean

// Undefined
const typeUndefined = typeof undefined;
console.log(`typeof undefined: ${typeUndefined}`); // typeof undefined: undefined

// Symbol シンボル
const typeSymbol = typeof Symbol('test');
console.log(`typeof Symbol('test'): ${typeSymbol}`); // typeof Symbol('test'): symbol

// Null
const typeNull = typeof null;
console.log(`typeof Null: ${typeNull}`); // typeof Null: object

// Date 日時
const typeDate = typeof new Date();
console.log(`typeof new Date(): ${typeDate}`); // typeof new Date(): object

// Immutable
let testStr1 = 'Hello';
const testStr2 = testStr1;
console.log(testStr1, testStr2); // Hello Hello
// 新しい文字列 HelloWorld が誕生して testStr1 に代入される
// String の関数群はこのように「違う文字列を作り出す時には自分とは別の新しい文字列を作る」という統一された考え方で作成されている
// その結果、作成されてから文字列自身の内容が変更されることはない。これが Immutable の考え方
testStr1 = testStr1.concat('World');
// 以下の二つは違う値を示している
console.log(testStr1, testStr2); // HelloWorld Hello

// Immutable でない Mutable なオブジェクト型の例
const testDate1 = new Date();
const testDate2 = testDate1;
// 時刻は実行したときの時刻が表示される
console.log(testDate1, testDate2); // Wed Nov 23 2022 10:20:39 GMT+0900 (日本標準時) Wed Nov 23 2022 10:20:39 GMT+0900 (日本標準時)
// 最初に testDate1 に代入された Date の情報そのものが変更される
// String のように新しい Date が生成されることはない
// つまり Mutable の場合には testDate2 のように先に参照を介して値を共有している変数があった場合、testDate1 の変更に影響を受ける
testDate1.setYear(11223);
// 以下の二つは同じ値を示している
console.log(testDate1, testDate2); // Thu Nov 23 11223 10:23:05 GMT+0900 (日本標準時) Thu Nov 23 11223 10:23:05 GMT+0900 (日本標準時)

// 関数の引数との関係
// プリミティブ型の場合
function concatWorld(str) {
  str = str.concat('World'); // str1 が 'HelloWorld' になりそうに思いがち
}
const str1 = 'Hello';
concatWorld(str1);
console.log(str1); // Hello // 変更はされない
// 関数の引数に渡される時に str1 の値のコピーが起きるため、引数 str が別のメモリを指しているため
// そのため str が指すメモリの文字列をいくら操作しても、元になった str1 へ影響を与えることはできない

// オブジェクト型の場合
function concatWorld2(custom) {
  custom.message = custom.message.concat('World');
}
const custom1 = {message: "Hello"};
concatWorld2(custom1);
console.log(custom1); // {message: 'HelloWorld'} // 変更される
// 参照を介して custom1 と 引数 custom は同じ実体のオブジェクトを指す
// custom を操作した結果は custom1 にも反映される