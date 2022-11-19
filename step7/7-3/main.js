// クロージャ

function createClosure() {
  const value = 'myClosureValue'; // 1
  
  function myClosure() {
    // value は myClosure の外ではあるが、myClosure と同じ createClosure の関数スコープにいるので束縛する
    console.log(value);
  }
  return myClosure; // 2
}

const closure = createClosure(); // 3
closure(); // 4

// 処理系が createClosure 関数を読み込んだ後の実行の流れは以下の通り

// 1. createClosure 関数が呼ばれる（3）
// 2. createClosure 関数では myClosure 関数の参照を返す（2）
// 3. 2 で受け取った参照を closure 変数に格納する（3）
// 4. closure 関数（実態は myClosure 関数）を呼び出す（4）

// スコープが変数の有効範囲であるが、この感覚だけで理解しようとすると、2. が終了した時点で「createClosure 内の value 変数が破棄され、4 の呼び出しでエラーになる、と感じるはずだが、上記ロジックはエラーになることなく動作する

// createClosure 関数が終了した後も value 変数にアクセスできている。これはクロージャのおかげである

// クロージャは関数を定義した場所から「自身と一緒もしくは祖先のスコープの変数や関数」を束縛して、その参照を維持する。これが上記の処理がエラーなく実行できることの仕組み

function createCounterObject() {
  return {
    value: 0,
    up: function() {
      // 値を一つ増やす関数
      this.value++;
    },
    down: function() {
      // 値を一つ減らす関数
      this.value--;
    }
  };
}

const counterObj = createCounterObject();
counterObj.up();
counterObj.up();
// このように value を直接代入できるため想定した動作が壊されることになる
// これはカプセル化が不十分な例
counterObj.value = 10;
counterObj.down();
console.log(counterObj.value); // 9

function createCounter() {
  // この値は外から変更することはできない
  let value = 0;
  return {
    up: function() {
      value++;
    },
    down: function() {
      value--;
    },
    getValue: function() {
      return value;
    }
  };
}

const counter = createCounter();
counter.up();
counter.up();
counter.down();
// value は公開されていないのでこの操作では想定の value を変更できない
counter.value = 10;
console.log(counter.getValue()); // 1