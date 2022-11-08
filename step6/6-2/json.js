// Object に対して JSON.stringify 関数を適用
// JSON を作成
const jsonStr = JSON.stringify({
  name: "田中太郎",
  age: 25,
  interest: ["プログラミング", "料理", "読書"]
});

console.log(jsonStr); // {"name":"田中太郎","age":25,"interest":["プログラミング","料理","読書"]}
const obj = JSON.parse(jsonStr);
console.log(obj.name); // 田中太郎