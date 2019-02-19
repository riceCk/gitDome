var arr = [0,1,2,3,4,5,6,7,8,9];
for (let i = 65; i < 122; i++) {
  if (i > 90 && i < 97) {
    continue;
  }
  arr.push(String.fromCharCode(i));
}
let canvasStr, value;
// 初始化验证码内容
function createCanvas() {
  canvasStr = '';
  value = '';
  for(var i = 0; i < 6; i++) {
	var a = arr[Math.floor(Math.random() * arr.length)];
	canvasStr += a + ' ';
	value += a;
  }
  var canvas = document.getElementById('canvasCaptcha'),
	  ctx = canvas.getContext('2d'),
	  x = canvas.width / 2,
	  oImg = new Image();
  oImg.src = './images/bg.jpg';

  oImg.onload = function () {
	var pattern = ctx.createPattern(oImg,'repeat');
	ctx.fillStyle = pattern;
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.textAlign = 'center';
	ctx.fillStyle = '#ccc';
	ctx.font = '46px Roboto Slab';
	ctx.setTransform (1, -0.12, 0.2, 1, 0, 12);
	ctx.fillText(canvasStr, x, 60);
  }
}
createCanvas();

// 验证用户输入的是否正确
function captcha (inputValue) {
  if (value == inputValue) {
    return true;
  } else {
    return false;
  }
}
