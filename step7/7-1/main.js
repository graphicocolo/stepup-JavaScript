// 無名関数

// 無名関数を const 宣言した定数で受け取ると
// 同名の関数を同じスコープに作成した際にエラーにできて堅牢になる
const testFunction = function() {
  console.log('testFunction');
};

testFunction();

// アロー関数は無名関数のように扱える
const testFunction2 = () => {
  console.log('testFunction2');
};

testFunction2();