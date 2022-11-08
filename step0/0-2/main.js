var element = document.getElementById('innerTest');
// innerHTML のようなプロパティは、オブジェクトが持っているデータのことを示す
element.innerHTML = '<strong>JavaScript</strong> で書きました';

var buttonElm = document.getElementById('testButton');
buttonElm.addEventListener('click', function() {
  // alert('ボタンが押されました');
  var numberElm = document.getElementById('number');
  var val = numberElm.value;
  var num = parseInt(val);
  if (num % 2 == 0) {
    alert('偶数です');
  } else {
    alert('偶数ではありません');
  }
})